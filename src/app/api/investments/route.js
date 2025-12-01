/**
 * @swagger
 * /investments:
 *   get:
 *     summary: Retrieve all investments
 *     description: |
 *       Fetches a paginated list of all investments ordered by creation date (latest first).
 *       Each investment includes its ID, title, and image reference.
 *       
 *       Pagination parameters (`page` and `limit`) can be provided as query strings.
 *       Example: `/investments?page=1&limit=10`
 *     tags:
 *       - Investments
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
 *         description: Number of investments per page
 *     responses:
 *       200:
 *         description: Successfully retrieved investments
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
 *                   example: Investments fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: inv12345
 *                       title:
 *                         type: string
 *                         example: Real Estate Growth Plan
 *                       image:
 *                         type: object
 *                         properties:
 *                           asset:
 *                             type: object
 *                             properties:
 *                               _ref:
 *                                 type: string
 *                                 example: image-abc123
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
 *       401:
 *         description: Unauthorized access (token required)
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
 *                   example: Unauthorized access
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
 *                   example: Failed to fetch investments
 */


import { client } from "@/lib/sanity";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { getPaginationParams, buildPaginationMeta } from "@/lib/pagination";
import { withAuth } from "@/lib/auth/authGuard";

const fetchInvestmentsHandler = asyncHandler(async (req) => {
  // Rate limit: 10 requests per minute
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const { page, limit, start, end } = getPaginationParams(req);

  const totalCount = await client.fetch(`count(*[_type == "investment"])`);

  const investments = await client.fetch(
    `*[_type == "investment"] | order(createdAt desc) [${start}...${end}] {
      _id,
      title,
      image
    }`
  );

  const pagination = buildPaginationMeta(totalCount, page, limit);

  return sendResponse(true, "Investments fetched successfully", 200, {
    data: investments,
    pagination,
  });
});

export const GET = withAuth(fetchInvestmentsHandler);
