import { client } from "@/lib/sanity";

export async function getUserLoans(userId) {
  try {
    const loans = await client.fetch(
      `*[_type=="userInvestment" && user._ref == $userId && planType=="loan"]{
        _id,
        amount,
        interestAmount,
        startDate,
        repaymentDate,
        status,
        plan->{
          duration
        }
      }`,
      { userId }
    );

    return {
      success: true,
      message: "Loans fetched successfully",
      status: 200,
      data: loans,
    };
  } catch (err) {
    console.error("❌ getUserLoans error:", err);
    return {
      success: false,
      message: "Failed to fetch loans",
      status: 500,
      data: { details: err.message },
    };    
  }
}
