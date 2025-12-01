/**
 * @swagger
 * /users/me/investments:
 *   get:
 *     summary: Fetch authenticated user's investments
 *     description: |
 *       Retrieves a paginated list of all investments for the logged-in user.
 *       Each investment includes detailed information about the plan, amounts, dates, status, and optional user reference data.
 *       Supports pagination via query parameters `page` and `limit`.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of investments per page
 *     responses:
 *       200:
 *         description: Investments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User investments fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "investment_123abc"
 *                       planType:
 *                         type: string
 *                         example: "crypto"
 *                       amount:
 *                         type: number
 *                         example: 5000
 *                       unitsHeld:
 *                         type: number
 *                         example: 10
 *                       expectedROI:
 *                         type: number
 *                         example: 200
 *                       interestAmount:
 *                         type: number
 *                         example: 50
 *                       repaymentDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-01T00:00:00.000Z"
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-01T00:00:00.000Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-11-01T00:00:00.000Z"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-01T12:00:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-13T00:00:00.000Z"
 *                       plan:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "plan_456xyz"
 *                           title:
 *                             type: string
 *                             example: "Crypto Growth Plan"
 *                           duration:
 *                             type: integer
 *                             example: 30
 *                           dailyProfit:
 *                             type: number
 *                             example: 1.5
 *                           roiEstimate:
 *                             type: number
 *                             example: 45
 *                           investmentPeriod:
 *                             type: integer
 *                             example: 12
 *                           changePercent:
 *                             type: number
 *                             example: 2.5
 *                           currentPrice:
 *                             type: number
 *                             example: 150
 *                           image:
 *                             type: string
 *                             example: "https://example.com/plan-image.png"
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "user_123abc"
 *                           fullName:
 *                             type: string
 *                             example: "John Doe"
 *                           email:
 *                             type: string
 *                             example: "johndoe@example.com"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: integer
 *                       example: 25
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: Unauthorized - user not logged in or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized: No user found
 *       429:
 *         description: Too many requests - rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Rate limit exceeded. Try again later.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 details:
 *                   type: string
 *                   example: Something went wrong while fetching user investments
 */


import { client } from "@/lib/sanity";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { getPaginationParams, buildPaginationMeta } from "@/lib/pagination";
import { withAuth } from "@/lib/auth/authGuard";

const fetchUserInvestmentsHandler = asyncHandler(async (req, { user }) => {
  // Apply rate limit: 15 requests per minute per user
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const userId = user?.userId;
  if (!userId) return sendResponse(false, "Unauthorized: No user found", 401);

  // Pagination params
  const { page, limit, start, end } = getPaginationParams(req);

  // Count all investments for the user
  const totalCount = await client.fetch(
    `count(*[_type == "userInvestment" && user._ref == $userId])`,
    { userId }
  );

  // Fetch paginated user investments
  const investments = await client.fetch(
    `*[_type == "userInvestment" && user._ref == $userId] 
      | order(createdAt desc) [${start}...${end}] {
        _id,
        planType,
        amount,
        unitsHeld,
        expectedROI,
        interestAmount,
        repaymentDate,
        startDate,
        endDate,
        status,
        createdAt,
        updatedAt,
        // populate related plan info
        plan->{
          _id,
          title,
          duration,
          dailyProfit,
          roiEstimate,
          investmentPeriod,
          changePercent,
          currentPrice,
          image
        },
        // include user info for reference if needed
        user->{
          _id,
          fullName,
          email
        }
      }`,
    { userId }
  );

  const pagination = buildPaginationMeta(totalCount, page, limit);

  return sendResponse(true, "User investments fetched successfully", 200, {
    data: investments,
    pagination,
  });
});

export const GET = withAuth(fetchUserInvestmentsHandler);
