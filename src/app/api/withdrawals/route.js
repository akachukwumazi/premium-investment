import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";
import { validateAndPrepareWithdrawal } from "@/lib/helpers/withdrawal/validateAndPrepareWithdrawal";
import { createWithdrawal } from "@/lib/helpers/withdrawal/createWithdrawal";

export const POST = withKycAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(5, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;

    const prep = await validateAndPrepareWithdrawal(req, user);
    if (prep.error) return prep.error;

    const createdWithdrawal = await createWithdrawal(prep);
    return sendResponse(
      true,
      "Withdrawal request submitted successfully and is pending approval.",
      201,
      createdWithdrawal
    );
  })
);
