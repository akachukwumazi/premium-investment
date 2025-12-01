import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";
import { getUserAndStockBondPlan } from "@/lib/helpers/stockBondInvestment/getUserAndStockBondPlan";
import { validateStockBondInvestmentEligibility } from "@/lib/helpers/stockBondInvestment/validateStockBondInvestmentEligibility";
import { createStockBondInvestmentRecord } from "@/lib/helpers/stockBondInvestment/createStockBondInvestmentRecord";
import { validateStockBondInvestmentInput } from "@/lib/helpers/stockBondInvestment/validateStockBondInvestmentInput";

const stockBondInvestmentHandler = asyncHandler(async (req, { user }) => {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const inputValidation = validateStockBondInvestmentInput(body);
  if (!inputValidation.success)
    return sendResponse(false, inputValidation.message, inputValidation.status);

  const { planId } = inputValidation.data;
  const userId = user?.userId;
  if (!userId) return sendResponse(false, "Unauthorized: Please log in", 401);

  const userPlanResponse = await getUserAndStockBondPlan(userId, planId);
  if (!userPlanResponse.success)
    return sendResponse(false, userPlanResponse.message, userPlanResponse.status);

  const { user: userData, plan } = userPlanResponse.data;
  const eligibilityResponse = await validateStockBondInvestmentEligibility(userData, plan, userId, planId);
  if (!eligibilityResponse.success)
    return sendResponse(false, eligibilityResponse.message, eligibilityResponse.status);

  const { unitsHeld, totalCost } = eligibilityResponse.data;
  return await createStockBondInvestmentRecord(userId, planId, unitsHeld, totalCost);
});

export const POST = withKycAuth(stockBondInvestmentHandler);
