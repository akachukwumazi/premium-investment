/**
 * @swagger
 * /users/me/investments/loan:
 *   post:
 *     summary: Submit a loan request
 *     description: Allows an authenticated and KYC-verified user to request a loan under a specific loan plan.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *               - amount
 *               - startDate
 *             properties:
 *               planId:
 *                 type: string
 *                 description: ID of the loan plan
 *                 example: "loanPlan_12345"
 *               amount:
 *                 type: number
 *                 description: Loan amount requested
 *                 minimum: 100
 *                 example: 5000
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: ISO datetime when the loan should start
 *                 example: "2025-10-05T00:00:00.000Z"
 *     responses:
 *       201:
 *         description: Loan request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Loan request submitted successfully. Awaiting admin approval.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "uuid-generated-id"
 *                     planType:
 *                       type: string
 *                       example: "loan"
 *                     amount:
 *                       type: number
 *                       example: 5000
 *                     status:
 *                       type: string
 *                       example: pending
 *                     repaymentDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-05T00:00:00.000Z"
 *       400:
 *         description: Validation error or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation failed
 *                 details:
 *                   type: object
 *                   description: Validation errors from Zod
 *       404:
 *         description: Loan plan or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Loan plan not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */


import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { getUserLoanPlan } from "@/lib/helpers/loanInvestment/getUserLoanPlan";
import { checkExistingLoanInvestment } from "@/lib/helpers/loanInvestment/checkExistingLoanInvestment";
import { createLoanInvestment } from "@/lib/helpers/loanInvestment/createLoanInvestment";
import { getUserInfo } from "@/lib/helpers/loanInvestment/getUserInfo";
import { computeLoan } from "@/lib/helpers/loanInvestment/computeLoan";
import { sendLoanApplicationEmail } from "@/lib/mailer";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";
import { client } from "@/lib/sanity"; 

async function loanRequestHandler(req, { user }) {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const { planId, amount, startDate } = body;
  const userId = user.userId;

  // Existing loan check 
  const existingCheck = await checkExistingLoanInvestment(userId, planId);
  if (!existingCheck.success)
    return sendResponse(false, existingCheck.message, existingCheck.status);

  // Prevent past start dates
  const today = new Date();
  const loanStart = new Date(startDate);
  if (loanStart < today.setHours(0, 0, 0, 0)) {
    return sendResponse(false, "Start date cannot be in the past", 400);
  }

  // Prevent overlapping loans (pending or active)
  const existingLoans = await client.fetch(
    `*[_type=="userInvestment" && user._ref == $userId && planType=="loan" && status in ["pending", "active"]]{
      repaymentDate
    }`,
    { userId }
  );

  if (existingLoans.length > 0) {
    const latestRepayment = new Date(existingLoans[0].repaymentDate);
    if (loanStart <= latestRepayment) {
      return sendResponse(
        false,
        `You already have an ongoing loan. Please wait until after ${latestRepayment.toDateString()}.`,
        400
      );
    }
  }

  // Get user info
  const userInfoResponse = await getUserInfo(userId);
  if (!userInfoResponse.success)
    return sendResponse(false, userInfoResponse.message, userInfoResponse.status);
  const { name: userName, email: userEmail } = userInfoResponse.data;

  // Get plan info
  const planResponse = await getUserLoanPlan(planId);
  if (!planResponse.success)
    return sendResponse(false, planResponse.message, planResponse.status);
  const plan = planResponse.data;

  // Validate amount range
  if (amount < plan.minAmount || amount > plan.maxAmount) {
    return sendResponse(
      false,
      `Amount must be between ${plan.minAmount} and ${plan.maxAmount}`,
      400
    );
  }

  // Compute repayment
  const repaymentDetails = computeLoan(amount, plan.interest, plan.duration, startDate);

  // Create loan investment
  const createResponse = await createLoanInvestment(
    userId,
    plan,
    amount,
    startDate,
    repaymentDetails
  );

  if (!createResponse.ok) return createResponse;

  try {
    await sendLoanApplicationEmail({
      email: userEmail,
      name: userName,
      plan,
      amount,
      repaymentDetails,
    });
  } catch (emailErr) {
    console.error("Loan email sending failed:", emailErr.message);
  }

  return createResponse; 
}

export const POST = withKycAuth(asyncHandler(loanRequestHandler));
