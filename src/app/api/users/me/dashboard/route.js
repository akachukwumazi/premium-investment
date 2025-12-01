
import { client } from "@/lib/sanity";
import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";

export const GET = withAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(10, 60 * 1000)(req); // 10 requests per minute
    if (limiter.limited) return limiter.response;

    const userId = user?.userId;
    if (!userId) return sendResponse(false, "Unauthorized: Please log in", 401);

    const userData = await client.fetch(
      `*[_type == "user" && _id == $userId][0]{accountBalance, totalProfit}`,
      { userId }
    );

    const withdrawals = await client.fetch(
      `*[_type == "withdrawal" && user._ref == $userId && status == "successful"]{amount, requestedAt}`,
      { userId }
    );

    const totalWithdrawalAmount = withdrawals.reduce((sum, w) => sum + (w.amount || 0), 0);

    const investments = await client.fetch(
      `*[_type == "userInvestment" && user._ref == $userId]{
        _id,
        amount,
        unitsHeld,
        planType,
        startDate,
        endDate,
        status,
        plan->{title, currentPrice}
      }`,
      { userId }
    );
    const totalInvestmentAmount = investments.reduce((sum, i) => sum + (i.amount || 0), 0);

    return sendResponse(true, "Dashboard statistics fetched successfully", 200, {
      data: {
        balance: userData?.accountBalance || 0,
        totalProfitAmount: userData?.totalProfit || 0,
        totalWithdrawalAmount: totalWithdrawalAmount,
        totalInvestmentAmount: totalInvestmentAmount,
      },
    });
  })
);
