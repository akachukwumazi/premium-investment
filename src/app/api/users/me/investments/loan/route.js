// import { withKycAuth } from "@/lib/auth/kycGuard";
// import { computeLoan } from "@/lib/helpers/loanInvestment/computeLoan";
// import { asyncHandler } from "@/lib/asyncHandler";
// import { sendResponse } from "@/lib/response";
// import { rateLimiter } from "@/lib/rateLimiter";

// const loanPreviewHandler = asyncHandler(async (req, { user }) => {
//   const limiter = await rateLimiter(10, 60 * 1000)(req);
//   if (limiter.limited) return limiter.response;

//   try {
//     const { planId, amount, startDate } = await req.json();

//     if (!planId || !amount || !startDate) {
//       return sendResponse(false, "planId, amount, and startDate are required", 400);
//     }

// const now = new Date();
// const start = new Date(startDate);

// if (start < now.setHours(0, 0, 0, 0)) {
//   return sendResponse(false, "Start date cannot be in the past", 400);
// }

//     const plan = await client.fetch(
//       `*[_type=="loanPlan" && _id==$planId && status=="active"][0]{
//         _id,
//         title,
//         interest,
//         duration,
//         minAmount,
//         maxAmount
//       }`,
//       { planId }
//     );

//     if (!plan) {
//       return sendResponse(false, "Loan plan not found", 404);
//     }

//     if (amount < plan.minAmount || amount > plan.maxAmount) {
//       return sendResponse(
//         false,
//         `Amount must be between ${plan.minAmount} and ${plan.maxAmount}`,
//         400
//       );
//     }


//     const loanPreview = computeLoan(amount, plan.interest, plan.duration, startDate);

//     return sendResponse(true, "Loan preview computed successfully", 200, {
//       planTitle: plan.title,
//       preview: loanPreview,
//     });
//   } catch (error) {
//     console.error("❌ Loan preview error:", error);
//     return sendResponse(false, "Failed to preview loan", 500);
//   }
// });





// loanRequest.js
import { client } from "@/lib/sanity";
import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { getUserLoanPlan } from "@/lib/helpers/loanInvestment/getUserLoanPlan";
import { checkExistingLoanInvestment } from "@/lib/helpers/loanInvestment/checkExistingLoanInvestment";
import { createLoanInvestment } from "@/lib/helpers/loanInvestment/createLoanInvestment";
import { getUserInfo } from "@/lib/helpers/loanInvestment/getUserInfo";
import { computeLoan } from "@/lib/helpers/loanInvestment/computeLoan";
// import { sendLoanApplicationEmail } from "@/lib/mailer";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";

async function loanRequestHandler(req, { user }) {
  try {
    // Rate limiting
    const limiter = await rateLimiter(5, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;

    const body = await req.json();
    const { planId, amount, startDate } = body;
    const userId = user.userId;

    // Validate inputs
    if (!planId || amount === undefined || !startDate) {
      return sendResponse(false, "planId, amount, and startDate are required", 400);
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return sendResponse(false, "Amount must be a valid positive number", 400);
    }

    const loanStart = new Date(startDate);
    if (isNaN(loanStart.getTime())) {
      return sendResponse(false, "Invalid startDate", 400);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (loanStart < today) {
      return sendResponse(false, "Start date cannot be in the past", 400);
    }

    // Existing loan check for this plan
    const existingCheck = await checkExistingLoanInvestment(userId, planId);
    if (!existingCheck.success) return sendResponse(false, existingCheck.message, existingCheck.status);

    // Check overlapping loans (pending or active)
    const existingLoans = await client.fetch(
      `*[_type=="userInvestment" && user._ref == $userId && planType=="loan" && status in ["pending","active"]]{ repaymentDate }`,
      { userId }
    );
    if (existingLoans.length > 0) {
      const latestRepayment = new Date(existingLoans[0].repaymentDate);
      if (loanStart <= latestRepayment) {
        return sendResponse(
          false,
          `You already have an ongoing loan. Please wait until after ${latestRepayment.toDateString()}.`,
          400
        );
      }
    }

    // Fetch user info
    const userInfoResponse = await getUserInfo(userId);
    if (!userInfoResponse.success) return sendResponse(false, userInfoResponse.message, userInfoResponse.status);
    const { name: userName, email: userEmail } = userInfoResponse.data;

    // Fetch loan plan info
    const planResponse = await getUserLoanPlan(planId);
    if (!planResponse.success) return sendResponse(false, planResponse.message, planResponse.status);
    const plan = planResponse.data;

    // Validate amount within plan limits
    if (numericAmount < plan.minAmount || numericAmount > plan.maxAmount) {
      return sendResponse(
        false,
        `Amount must be between ${plan.minAmount} and ${plan.maxAmount}`,
        400
      );
    }

    // Compute repayment details (recompute on backend for safety)
    const repaymentDetails = computeLoan(numericAmount, plan.interest, plan.duration, startDate);

    // Create loan investment
    const createResponse = await createLoanInvestment(userId, plan, numericAmount, startDate, repaymentDetails);
    if (!createResponse.ok) return createResponse;

    // Send confirmation email (non-blocking)
    // try {
    //   await sendLoanApplicationEmail({
    //     email: userEmail,
    //     name: userName,
    //     plan,
    //     amount: numericAmount,
    //     repaymentDetails,
    //   });
    // } catch (emailErr) {
    //   console.error("Loan email sending failed:", emailErr.message);
    // }

    return createResponse;

  } catch (err) {
    console.error("❌ Loan request error:", err);
    return sendResponse(false, "Failed to create loan request", 500, { details: err.message });
  }
}

export const POST = withKycAuth(asyncHandler(loanRequestHandler));

