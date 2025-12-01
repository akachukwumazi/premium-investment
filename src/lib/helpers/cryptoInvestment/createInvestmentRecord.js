import { client } from "@/lib/sanity";
import { v4 as uuid } from "uuid";
import { sendResponse } from "@/lib/response";

export async function createInvestmentRecord(
  userId,
  planId,
  planType,
  amount,
  contractDuration
) {
  try {
    const now = new Date();
    const contractEnd = new Date(
      now.getTime() + contractDuration * 24 * 60 * 60 * 1000
    );

    const investmentId = uuid();

    const newInvestment = {
      _id: investmentId,
      _type: "userInvestment",
      user: { _type: "reference", _ref: userId },
      plan: { _type: "reference", _ref: planId },
      planType,
      amount,
      expectedROI: 0,
      startDate: now.toISOString(),
      endDate: contractEnd.toISOString(),
      status: "active",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    // Start a transaction
    const transaction = client
      .transaction()
      .create(newInvestment)
      .patch(userId, (patch) => patch.dec({ accountBalance: amount }));

    // Commit both actions atomically
    const result = await transaction.commit();

    return sendResponse(
      true,
      "Investment record created successfully",
      201,
      result
    );
  } catch (error) {
    console.error("❌ createInvestmentRecord transaction error:", error);
    return sendResponse(false, "Failed to create investment", 500, {
      details: error.message,
    });
  }
}
