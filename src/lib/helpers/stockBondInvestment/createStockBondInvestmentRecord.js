import { client } from "@/lib/sanity";
import { v4 as uuid } from "uuid";
import { sendResponse } from "@/lib/response";

export async function createStockBondInvestmentRecord(
  userId,
  planId,
  unitsHeld,
  totalCost
) {
  try {
    const now = new Date();

    const newInvestment = await client.create({
      _id: uuid(),
      _type: "userInvestment",
      user: { _type: "reference", _ref: userId },
      plan: { _type: "reference", _ref: planId },
      planType: "stockBond",
      unitsHeld,
      amount: totalCost,
      startDate: now.toISOString(),
      status: "active",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });

    await client.patch(userId).dec({ accountBalance: totalCost }).commit();

    return {
      success: true,
      message: "Stock/Bond investment created successfully",
      status: 201,
      data: newInvestment,
    };
  } catch (error) {
    console.error("❌ createStockBondInvestmentRecord error:", error);
    return sendResponse(false, "Failed to create investment", 500, {
      details: error.message,
    });
  }
}
