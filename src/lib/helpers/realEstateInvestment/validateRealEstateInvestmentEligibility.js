import { client } from "@/lib/sanity";

export async function validateRealEstateInvestmentEligibility(
  user,
  plan,
  amount,
  userId,
  planId
) {
  const balance = Number(user.accountBalance || 0);
  const min = Number(plan.minInvestment);
  const amt = Number(amount);

  if (balance < amt) {
    return {
      success: false,
      message: "Insufficient balance. Please fund your wallet.",
      status: 400,
    };
  }

  if (amt < min) {
    return {
      success: false,
      message: `Amount must be at least ${min}`,
      status: 400,
    };
  }

  const existing = await client.fetch(
    `*[_type=="userInvestment" && user._ref==$userId && plan._ref==$planId && status=="active"][0]`,
    { userId, planId }
  );

  if (existing) {
    return {
      success: false,
      message:
        "You already have an active investment in this plan. Please wait for it to complete.",
      status: 400,
    };
  }

  return {
    success: true,
    message: "Investment eligibility validated",
    status: 200,
  };
}
