import { client } from "@/lib/sanity";
import { v4 as uuid } from "uuid";
import { sendResponse } from "@/lib/response";


export async function createLoanInvestment(userId, plan, amount, startDate, repaymentDetails) {
  try {
    const { interestRate, interestAmount, totalRepayable, repaymentDate } = repaymentDetails;

    const newLoanInvestment = await client.create({
      _id: uuid(),
      _type: "userInvestment",
      user: { _type: "reference", _ref: userId },
      plan: { _type: "reference", _ref: plan._id },
      planType: "loan",
      amount,
      status: "pending",
      startDate,
      endDate: repaymentDate,
      interestAmount,
      repaymentDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Return only necessary fields to avoid circular data
    return sendResponse(true, "Loan request created successfully", 201, { data: newLoanInvestment });
  } catch (err) {
    console.error("createLoanInvestment error:", err);
    return sendResponse(false, "Failed to create loan request", 500, { details: err.message });
  }
}
