import { client } from "@/lib/sanity";
import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";

export function computeLoan(amount, interestRate, duration, startDate) {
  // Ensure amount and interestRate are numbers
  amount = Number(amount);
  interestRate = Number(interestRate);
  duration = Number(duration);

  const interestAmount = +(amount * interestRate / 100).toFixed(2);
  const totalRepayable = +(amount + interestAmount).toFixed(2);

  const start = new Date(startDate);
  const repaymentDate = new Date(start.getTime() + duration * 24 * 60 * 60 * 1000);

  return {
    amount,
    interestRate,
    duration,
    interestAmount,
    totalRepayable,
    startDate: start.toISOString(),
    repaymentDate: repaymentDate.toISOString(),
  };
}

const loanPreviewHandler = asyncHandler(async (req, { user }) => {
  // Rate limiter
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  try {
    const { planId, amount, startDate } = await req.json();

    // Basic validation
    if (!planId || amount === undefined || !startDate) {
      return sendResponse(false, "planId, amount, and startDate are required", 400);
    }

    if (typeof amount !== "number" || isNaN(amount)) {
      return sendResponse(false, "Amount must be a valid number", 400);
    }

    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      return sendResponse(false, "Invalid startDate", 400);
    }

    // Start date cannot be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      return sendResponse(false, "Start date cannot be in the past", 400);
    }

    // Fetch loan plan
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

    if (!plan) {
      return sendResponse(false, "Loan plan not found", 404);
    }

    // Amount check
    if (amount < plan.minAmount || amount > plan.maxAmount) {
      return sendResponse(
        false,
        `Amount must be between ${plan.minAmount} and ${plan.maxAmount}`,
        400
      );
    }

    // Compute loan
    const loanPreview = computeLoan(amount, plan.interest, plan.duration, startDate);

    return sendResponse(true, "Loan preview computed successfully", 200, {
      planTitle: plan.title,
      preview: loanPreview,
    });

  } catch (error) {
    console.error("❌ Loan preview error:", error);
    return sendResponse(false, "Failed to preview loan", 500);
  }
});

export const POST = withKycAuth(loanPreviewHandler);
