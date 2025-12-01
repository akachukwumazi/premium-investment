/**
 * @swagger
 * /api/investments/stocks-bonds/plans:
 *   get:
 *     summary: Retrieve all active stock and bond plans (paginated)
 *     description: |
 *       Fetches all active stock/bond investment plans with pagination support.
 *       Only authenticated users can access this endpoint.
 *     tags:
 *       - Investments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The current page number for pagination
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items to return per page
 *     responses:
 *       200:
 *         description: Successfully fetched stock/bond plans
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Stock/Bond plans fetched successfully
 *               data:
 *                 plans:
 *                   - _id: "stockBondPlan_abc123"
 *                     title: "High Yield Bond"
 *                     type: "bond"
 *                     unitHeld: 150
 *                     changePercent: 2.5
 *                     currentPrice: 105.75
 *                     imageUrl: "https://cdn.sanity.io/images/stockbond.jpg"
 *                     status: "active"
 *                     createdAt: "2025-10-01T00:00:00.000Z"
 *                     updatedAt: "2025-10-05T00:00:00.000Z"
 *                 meta:
 *                   total: 12
 *                   totalPages: 2
 *                   currentPage: 1
 *                   limit: 10
 *       400:
 *         description: Invalid query parameters
 *       401:
 *         description: Unauthorized access (token required)
 *       429:
 *         description: Too many requests (rate limit exceeded)
 *       500:
 *         description: Internal server error
 */


import { client } from "@/lib/sanity";
import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { getPaginationParams, buildPaginationMeta } from "@/lib/pagination";

const getStockBondPlansHandler = asyncHandler(async (req) => {
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  try {
    const { page, limit, start, end } = getPaginationParams(req);

    const query = `*[_type == "stockBondPlan" && status == "active"]
      | order(createdAt desc)
      [${start}...${end}]{
        _id,
        title,
        type,
        unitHeld,
        changePercent,
        currentPrice,
        "imageUrl": image.asset->url,
        status,
        createdAt,
        updatedAt
      }`;

    const plans = await client.fetch(query);

    const totalQuery = `count(*[_type == "stockBondPlan" && status == "active"])`;
    const total = await client.fetch(totalQuery);

    return sendResponse(true, "Stock/Bond plans fetched successfully", 200, {
      plans,
      meta: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    console.error("❌ GET_STOCKBOND_PLANS_ERROR:", error);
    return sendResponse(false, "Failed to fetch stock/bond plans", 500);
  }
});

export const GET = withAuth(getStockBondPlansHandler);
