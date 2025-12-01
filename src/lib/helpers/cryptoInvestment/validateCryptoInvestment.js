import { sendResponse } from "@/lib/response";

export function validateCryptoInvestmentInput(body) {
  const { planId, amount } = body || {};

  if (!planId || typeof planId !== "string") {
    return sendResponse(false, "Plan ID is required and must be a valid string", 400);
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    return sendResponse(false, "Amount must be greater than 0", 400);
  }

  // On success, just return data, not a full response
  return {
    success: true,
    data: {
      planId,
      amount: Number(amount),
    },
  };
}
