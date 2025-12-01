/**
 * @swagger
 * /users/me/investments/loan/analytics:
 *   get:
 *     summary: Get analytics for all loan investments of the authenticated user
 *     description: Fetches all loan-type investments linked to the authenticated user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched loan investments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "abc123xyz"
 *                       amount:
 *                         type: number
 *                         example: 5000
 *                       interestAmount:
 *                         type: number
 *                         example: 750
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-01-01"
 *                       repaymentDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-12-31"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       plan:
 *                         type: object
 *                         properties:
 *                           duration:
 *                             type: number
 *                             example: 12
 *       401:
 *         description: Unauthorized – missing or invalid token / KYC not verified
 *       500:
 *         description: Server error – failed to fetch loan analytics
 */




import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { getUserLoans } from "@/lib/helpers/loanInvestment/getUserLoans";
import { sendResponse } from "@/lib/response"; 
import { rateLimiter } from "@/lib/rateLimiter";

async function loanAnalyticsHandler(req, { user }) {
     const limiter = await rateLimiter(10, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;
  const userId = user?.userId;
  if (!userId) {
    return sendResponse(false, "Unauthorized", 401);
  }

  // Fetch the loans
  const result = await getUserLoans(userId);

  // Use sendResponse to return a proper NextResponse
  return sendResponse(result.success, result.message, result.status, result.data);
}

export const GET = withKycAuth(asyncHandler(loanAnalyticsHandler));
