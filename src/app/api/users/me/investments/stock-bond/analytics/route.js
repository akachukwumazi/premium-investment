/**
 * @swagger
 * /users/me/investments/stock-bond/analytics:
 *   get:
 *     summary: Get Stock/Bond investment analytics
 *     description: Returns all Stock & Bond investments for the authenticated KYC-verified user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched stock/bond investments
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
 *                         example: "investment123"
 *                       unitsHeld:
 *                         type: number
 *                         example: 10
 *                       amount:
 *                         type: number
 *                         example: 1500
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-15T12:00:00.000Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-15T12:00:00.000Z"
 *                       plan:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "plan456"
 *                           title:
 *                             type: string
 *                             example: "Tech Growth Stock"
 *                           type:
 *                             type: string
 *                             example: "stock"
 *                           currentPrice:
 *                             type: number
 *                             example: 150
 *                           changePercent:
 *                             type: number
 *                             example: 2.5
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */


import { client } from "@/lib/sanity";
import { withKycAuth } from "@/lib/auth/kycGuard";
import { sendResponse } from "@/lib/response";
import { asyncHandler } from "@/lib/asyncHandler";
import { rateLimiter } from "@/lib/rateLimiter";

const stockBondAnalyticsHandler = asyncHandler(async (req, { user }) => {
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const userId = user.userId;

  const investments = await client.fetch(
    `*[_type == "userInvestment" && user._ref == $userId && planType == "stockBond"]{
      _id,
      unitsHeld,
      amount,
      status,
      startDate,
      endDate,
      plan->{
        _id,
        title,
        type,
        currentPrice,
        changePercent
      }
    }`,
    { userId }
  );

  return sendResponse(true, "Stock & Bond analytics fetched successfully", 200, investments);
});

export const GET = withKycAuth(stockBondAnalyticsHandler);
