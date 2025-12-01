import { client } from "@/lib/sanity";

export async function getUserRealEstateInvestments(userId) {
  try {
    const investments = await client.fetch(
      `*[_type=="userInvestment" && user._ref==$userId && planType=="realEstate"]{
        _id,
        status,
        amount,
        expectedROI,
        startDate,
        endDate,
        plan->{
          _id,
          title,
          roiEstimate,
          investmentPeriod,
          minInvestment
        }
      }`,
      { userId }
    );

    return {
      success: true,
      message: "Real estate investments fetched successfully",
      status: 200,
      data: investments,
    };
  } catch (error) {
    console.error("❌ getUserRealEstateInvestments error:", error);
    return {
      success: false,
      message: "Failed to fetch real estate investments",
      status: 500,
      data: { details: error.message },
    };
  }
}
