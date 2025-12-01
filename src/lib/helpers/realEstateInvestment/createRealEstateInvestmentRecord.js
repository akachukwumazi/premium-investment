import { client } from "@/lib/sanity";
import { v4 as uuid } from "uuid";

export async function createRealEstateInvestmentRecord(
  userId,
  planId,
  amount,
  plan
) {
  try {
    const now = new Date();
    const contractEnd = new Date(
      now.getTime() + plan.investmentPeriod * 30 * 24 * 60 * 60 * 1000
    );
    const expectedROI = (amount * plan.roiEstimate) / 100;

    const newInvestment = await client.create({
      _id: uuid(),
      _type: "userInvestment",
      user: { _type: "reference", _ref: userId },
      plan: { _type: "reference", _ref: planId },
      planType: "realEstate",
      amount,
      expectedROI,
      startDate: now.toISOString(),
      endDate: contractEnd.toISOString(),
      status: "active",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });

    await client.patch(userId).dec({ accountBalance: amount }).commit();

    return {
      success: true,
      message: "Investment created successfully",
      status: 201,
      data: newInvestment,
    };
  } catch (err) {
    console.error("❌ createRealEstateInvestmentRecord error:", err);
    return {
      success: false,
      message: "Failed to create investment",
      status: 500,
    };
  }
}
