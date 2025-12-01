/**
 * @swagger
 * /users/me/investments/loans/preview:
 *   post:
 *     summary: Preview loan repayment details
 *     description: Calculate a preview of loan repayment details before submitting a loan request. Requires authentication and KYC verification.
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
 *                 description: Loan plan ID
 *                 example: "loanPlan_abc123"
 *               amount:
 *                 type: number
 *                 description: Loan amount to preview
 *                 example: 5000
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date for the loan in ISO datetime format
 *                 example: "2025-10-10T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Loan preview calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 planTitle:
 *                   type: string
 *                   example: "Personal Loan Plan A"
 *                 preview:
 *                   type: object
 *                   properties:
 *                     interestRate:
 *                       type: number
 *                       example: 12
 *                     interestAmount:
 *                       type: number
 *                       example: 600
 *                     totalRepayable:
 *                       type: number
 *                       example: 5600
 *                     repaymentDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-12-10T00:00:00.000Z"
 *       400:
 *         description: Missing fields or invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "planId, amount, and startDate are required"
 *       404:
 *         description: Loan plan not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Loan plan not found"
 *       500:
 *         description: Failed to calculate loan preview
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to preview loan"
 */


import { client } from "@/lib/sanity";
import { withKycAuth } from "@/lib/auth/kycGuard";
import { computeLoan } from "@/lib/helpers/loanInvestment/computeLoan";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";

const loanPreviewHandler = asyncHandler(async (req, { user }) => {
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  try {
    const { planId, amount, startDate } = await req.json();

    if (!planId || !amount || !startDate) {
      return sendResponse(false, "planId, amount, and startDate are required", 400);
    }

const now = new Date();
const start = new Date(startDate);

if (start < now.setHours(0, 0, 0, 0)) {
  return sendResponse(false, "Start date cannot be in the past", 400);
}

    const plan = await client.fetch(
      `*[_type=="loanPlan" && _id==$planId && status=="active"][0]{
        _id,
        title,
        interest,
        duration,
        minAmount,
        maxAmount
      }`,
      { planId }
    );

    if (!plan) {
      return sendResponse(false, "Loan plan not found", 404);
    }

    if (amount < plan.minAmount || amount > plan.maxAmount) {
      return sendResponse(
        false,
        `Amount must be between ${plan.minAmount} and ${plan.maxAmount}`,
        400
      );
    }


    const loanPreview = computeLoan(amount, plan.interest, plan.duration, startDate);

    return sendResponse(true, "Loan preview computed successfully", 200, {
      planTitle: plan.title,
      preview: loanPreview,
    });
  } catch (error) {
    console.error("❌ Loan preview error:", error);
    return sendResponse(false, "Failed to preview loan", 500);
  }
});

export const POST = withKycAuth(loanPreviewHandler);
