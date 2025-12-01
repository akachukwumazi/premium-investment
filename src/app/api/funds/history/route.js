/**
 * @swagger
 * /funds/history:
 *   get:
 *     summary: Retrieve deposit (fund) history
 *     description: |
 *       Fetches a paginated list of all deposit (fund) records ordered by creation date (latest first).
 *       Each record contains amount, status, crypto type, and creation timestamp.
 *       
 *       Pagination parameters (`page` and `limit`) can be provided as query strings.
 *       Example: `/fund/history?page=1&limit=10`
 *     tags:
 *       - Funding
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The current page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Successfully retrieved deposit history
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
 *                       amount:
 *                         type: number
 *                         example: 250.75
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       crypto:
 *                         type: string
 *                         example: "BTC"
 *                       _createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-06T12:45:30Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       example: 45
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
 *                   example: "Internal Server Error"
 *                 details:
 *                   type: string
 *                   example: "Database connection failed"
 */

import { client } from "@/lib/sanity";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { getPaginationParams, buildPaginationMeta } from "@/lib/pagination";

export const GET = asyncHandler(async (req) => {
  // Apply rate limiting (10 requests per minute)
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const { page, limit, start, end } = getPaginationParams(req);

  const totalCount = await client.fetch(`count(*[_type == "Deposit"])`);

  const deposits = await client.fetch(
    `*[_type == "Deposit"] | order(_createdAt desc) [${start}...${end}] {
        _id,
      amount,
      status,
      crypto,
      _createdAt
    }`
  );

  const pagination = buildPaginationMeta(totalCount, page, limit);

  return sendResponse(true, "Deposit history fetched successfully", 200, {
    data: deposits,
    pagination,
  });
});
