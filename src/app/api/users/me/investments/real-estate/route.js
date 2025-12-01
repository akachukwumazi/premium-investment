

import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { validateRealEstateInvestmentInput } from "@/lib/helpers/realEstateInvestment/validateRealEstateInvestmentInput";
import { getUserAndRealEstatePlan } from "@/lib/helpers/realEstateInvestment/getUserAndRealEstatePlan";
import { validateRealEstateInvestmentEligibility } from "@/lib/helpers/realEstateInvestment/validateRealEstateInvestmentEligibility";
import { createRealEstateInvestmentRecord } from "@/lib/helpers/realEstateInvestment/createRealEstateInvestmentRecord";

async function realEstateInvestmentHandler(req, { user }) {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();

  const inputValidation = validateRealEstateInvestmentInput(body);
  if (!inputValidation.success)
    return sendResponse(false, inputValidation.message, inputValidation.status);

  const { planId, amount } = inputValidation.data;
  const userId = user?.userId;
  if (!userId) return sendResponse(false, "Unauthorized", 401);

  const userPlanResponse = await getUserAndRealEstatePlan(userId, planId);
  if (!userPlanResponse.success)
    return sendResponse(false, userPlanResponse.message, userPlanResponse.status);

  const { user: userData, plan } = userPlanResponse.data;

  const eligibilityResponse = await validateRealEstateInvestmentEligibility(
    userData,
    plan,
    amount,
    userId,
    planId
  );
  if (!eligibilityResponse.success)
    return sendResponse(false, eligibilityResponse.message, eligibilityResponse.status);

  const investmentResponse = await createRealEstateInvestmentRecord(
    userId,
    planId,
    amount,
    plan
  );

  return sendResponse(
    investmentResponse.success,
    investmentResponse.message,
    investmentResponse.status,
    investmentResponse.data
  );
}

export const POST = withKycAuth(asyncHandler(realEstateInvestmentHandler));
