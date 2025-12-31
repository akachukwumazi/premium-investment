import { client } from "@/lib/sanity";

export async function validateStockBondInvestmentEligibility(
  user,
  plan,
  userId,
  planId
) {
  const unitsHeld = plan.unitHeld;
  const totalCost = unitsHeld * plan.currentPrice;

  if ((user.accountDeposit || 0) < totalCost) {
    return {
      success: false,
      message: "Insufficient balance. Please fund your wallet.",
      status: 400,
    };
  }

  const existing = await client.fetch(
    `*[_type=="userInvestment" && user._ref==$userId && plan._ref==$planId && (status=="active" || status=="pending")][0]`,
    { userId, planId }
  );

  if (existing) {
    return {
      success: false,
      message:
        "You already have an active or pending investment in this plan. Please wait for it to complete.",
      status: 400,
    };
  }

  return {
    success: true,
    message: "Investment eligibility validated",
    status: 200,
    data: { unitsHeld, totalCost },
  };
}
