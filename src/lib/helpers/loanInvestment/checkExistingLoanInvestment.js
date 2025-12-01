import { client } from "@/lib/sanity";

export async function checkExistingLoanInvestment(userId, planId) {
  try {
    const existingInvestment = await client.fetch(
      `*[
        user._ref==$userId &&
        plan._ref==$planId &&
        planType=="loan" &&
        status in ["active", "pending"]
      ][0]`,
      { userId, planId }
    );

    if (existingInvestment) {
      return { success: false, message: "You already have an active or pending investment in this loan plan. Please wait for it to complete.", status: 400  };
    }

    return { success: true, message: "No existing investment found", status: 200  };
  } catch (err) {
    console.error("❌ checkExistingLoanInvestment error:", err);
    return {
      success: false,
      message: "Failed to check existing loan investment",
      status: 500,
      data: { details: err.message },
    };
  }
}
