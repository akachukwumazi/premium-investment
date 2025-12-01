/**
 * @swagger
 * /users/me/investments/crypto:
 *   post:
 *     summary: Create a new crypto investment
 *     description: Allows a KYC-verified user to invest in an active crypto investment plan.
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
 *             properties:
 *               planId:
 *                 type: string
 *                 description: The ID of the crypto investment plan.
 *                 example: "cryptoPlan123"
 *               amount:
 *                 type: number
 *                 description: Amount to invest (must be within the plan's min and max deposit limits).
 *                 example: 500
 *     responses:
 *       201:
 *         description: Crypto investment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Crypto investment created successfully
 *                 data:
 *                   type: object
 *                   description: The created investment object
 *       400:
 *         description: Validation failed or insufficient balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Insufficient balance. Please fund your wallet.
 *       401:
 *         description: Unauthorized — user not authenticated or KYC not completed
 *       404:
 *         description: Plan or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Crypto plan not found
 *       500:
 *         description: Internal server error
 */


import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { getUserAndPlan } from "@/lib/helpers/cryptoInvestment/getUserAndPlan";
import { validateInvestmentEligibility } from "@/lib/helpers/cryptoInvestment/validateInvestmentEligibility";
import { createInvestmentRecord } from "@/lib/helpers/cryptoInvestment/createInvestmentRecord";
import { validateCryptoInvestmentInput } from "@/lib/helpers/cryptoInvestment/validateCryptoInvestment";

async function cryptoInvestmentHandler(req, { user }) {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const inputValidation = validateCryptoInvestmentInput(body);
  if (!inputValidation.success) return inputValidation;

  const { planId, amount } = inputValidation.data;
  const userId = user?.userId;
  if (!userId) return sendResponse(false, "Unauthorized: Please log in", 401);

  const userPlanResponse = await getUserAndPlan(userId, planId);
  if (!userPlanResponse.success) return userPlanResponse;

  const { user: userData, plan } = userPlanResponse.data;
  const eligibilityResponse = await validateInvestmentEligibility(
    userData,
    plan,
    amount,
    userId,
    planId
  );
  // Corrected condition — no `.body` nesting now
  if (!eligibilityResponse.success)
  return sendResponse(false, eligibilityResponse.message, eligibilityResponse.status);

  return await createInvestmentRecord(
    userId,
    planId,
    "crypto",
    amount,
    plan.contractDuration
  );
}

export const POST = withKycAuth(asyncHandler(cryptoInvestmentHandler));
