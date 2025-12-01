/**
 * @swagger
 * /users/me/investments/real-estate/analytics:
 *   get:
 *     summary: Get Real Estate investment analytics
 *     description: Fetches all real estate investments for the authenticated KYC-verified user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched real estate investments
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
 *                         example: "investment789"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       amount:
 *                         type: number
 *                         example: 5000
 *                       expectedROI:
 *                         type: number
 *                         example: 1200
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-10T12:00:00.000Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-01-10T12:00:00.000Z"
 *                       plan:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "plan890"
 *                           title:
 *                             type: string
 *                             example: "Luxury Apartment Investment"
 *                           roiEstimate:
 *                             type: number
 *                             example: 15
 *                           investmentPeriod:
 *                             type: number
 *                             example: 365
 *                           minInvestment:
 *                             type: number
 *                             example: 1000
 *                           maxInvestment:
 *                             type: number
 *                             example: 10000
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */

import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { getUserRealEstateInvestments } from "@/lib/helpers/realEstateInvestment/getUserRealEstateInvestments";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response"; 

const realEstateAnalyticsHandler = asyncHandler(async (req, { user }) => {
   const limiter = await rateLimiter(10, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;
  const userId = user?.userId;
  if (!userId) return sendResponse(false, "Unauthorized", 401);

  const result = await getUserRealEstateInvestments(userId);
      return sendResponse(result.success, result.message, result.status, result.data);
    
});

export const GET = withKycAuth(realEstateAnalyticsHandler);
