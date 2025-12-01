import { client } from "@/lib/sanity";

export async function getUserLoanPlan(planId) {
  try {
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

    if (!plan) return { success: false, message: "Loan plan not found", status: 404 };
    return { success: true, message: "Loan plan fetched successfully", status: 200, data: plan };
  } catch (err) {
    console.error("❌ getUserLoanPlan error:", err);
    return {
      success: false,
      message: "Failed to fetch loan plan",
      status: 500,
      data: { details: err.message },
    };
  }
}
