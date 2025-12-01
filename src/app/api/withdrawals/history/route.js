/**
 * @swagger
 * /withdrawals/history:
 *   get:
 *     summary: Get paginated withdrawal history
 *     description: Retrieve the authenticated user's withdrawal history with pagination (requires JWT or KYC authentication).
 *     tags:
 *       - Withdrawals
 *     security:
 *       - bearerAuth: []   # JWT/KYC token required
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
 *           maximum: 100
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Successfully retrieved withdrawal history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 withdrawals:
 *                   type: array
 *                   description: List of withdrawal records
 *                   items:
 *                     type: object
 *                     properties:
 *                       requestedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-04T14:25:36Z"
 *                       amount:
 *                         type: number
 *                         example: 500.75
 *                       status:
 *                         type: string
 *                         enum: [pending, approved, rejected]
 *                         example: "approved"
 *                       crypto:
 *                         type: string
 *                         example: "BTC"
 *                 pagination:
 *                   type: object
 *                   description: Pagination metadata
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 42
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     currentPage:
 *                       type: integer
 *                       example: 2
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *       401:
 *         description: Unauthorized (missing or invalid token / KYC not completed)
 *       500:
 *         description: Internal server error
 */


import { client } from "@/lib/sanity";
import { getPaginationParams, buildPaginationMeta } from "@/lib/pagination";
import { asyncHandler } from "@/lib/asyncHandler";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";

export const GET = asyncHandler(async (req) => {
  // Rate limit to prevent abuse
  const limiter = await rateLimiter(10, 60 * 1000)(req); // 10 requests per minute
  if (limiter.limited) return limiter.response;

  // Pagination
  const { page, limit, start, end } = getPaginationParams(req);

  // Total count
  const totalCount = await client.fetch(`count(*[_type == "withdrawal"])`);

  // Withdrawals query
  const withdrawals = await client.fetch(
    `*[_type == "withdrawal"] | order(requestedAt desc) [${start}...${end}] {
    _id,
      requestedAt,
      amount,
      user -> {
      _id
      },
      status,
      crypto
    }`
  );

  // Build pagination meta
  const pagination = buildPaginationMeta(totalCount, page, limit);

  return sendResponse(true, "Withdrawals fetched successfully", 200, {
    withdrawals,
    pagination,
  });
});
