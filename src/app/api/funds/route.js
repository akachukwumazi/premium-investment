
import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";
import { validateAndPrepareDeposit } from "@/lib/helpers/deposit/validateAndPrepareDeposit";
import { createDeposit } from "@/lib/helpers/deposit/createDeposit";

export const POST = withKycAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(5, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;

    const prep = await validateAndPrepareDeposit(req, user);
    if (prep.error) return prep.error;

    const createdFund = await createDeposit(prep);
    return sendResponse(true, "Deposit created successfully", 201, createdFund);
  })
);
