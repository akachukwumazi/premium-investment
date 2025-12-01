/**
 * @swagger
 * /api/investments/crypto/plans:
 *   get:
 *     summary: Retrieve all active crypto investment plans (paginated)
 *     description: |
 *       Fetches all active cryptocurrency investment plans with optional search and pagination.
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
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search by crypto plan title or ID
 *     responses:
 *       200:
 *         description: Successfully fetched crypto investment plans
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Crypto plans fetched successfully
 *               data:
 *                 plans:
 *                   - _id: "cryptoPlan_abc123"
 *                     title: "Bitcoin Growth Plan"
 *                     minDeposit: 100
 *                     maxDeposit: 5000
 *                     dailyProfit: 2.5
 *                     contractDuration: 30
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

const getCryptoPlansHandler = asyncHandler(async (req) => {
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const { page, limit, start, end } = getPaginationParams(req);

    const filters = [`_type == "cryptoPlan" && status == "active"`];
    const params = {};

    if (search) {
      filters.push(`(title match $search || _id match $searchExact)`);
      params.search = `${search}*`;
      params.searchExact = search;
    }

    const whereClause = filters.join(" && ");

    const query = `*[
      ${whereClause}
    ] | order(createdAt desc) [$start...$end]{
      _id,
      title,
      minDeposit,
      maxDeposit,
      dailyProfit,
      contractDuration,
      status,
      createdAt,
      updatedAt
    }`;

    const plans = await client.fetch(query, { ...params, start, end });

    const countQuery = `count(*[${whereClause}])`;
    const total = await client.fetch(countQuery, params);

    return sendResponse(true, "Crypto plans fetched successfully", 200, {
      plans,
      meta: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    console.error("GET_CRYPTO_PLANS_ERROR:", error);
    return sendResponse(false, "Failed to fetch crypto plans", 500);
  }
});

export const GET = withAuth(getCryptoPlansHandler);
