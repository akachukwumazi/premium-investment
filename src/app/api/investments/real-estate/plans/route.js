/**
 * @swagger
 * /api/investments/real-estate/plans:
 *   get:
 *     summary: Retrieve all active real estate investment plans (paginated)
 *     description: |
 *       Fetches all active real estate investment plans with pagination support.
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
 *         description: Successfully fetched real estate plans
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Real estate plans fetched successfully
 *               data:
 *                 plans:
 *                   - _id: "realEstatePlan_abc123"
 *                     title: "Luxury Apartments Phase 1"
 *                     location: "Lagos, Nigeria"
 *                     roiEstimate: 15
 *                     investmentPeriod: 12
 *                     minInvestment: 2500
 *                     status: "active"
 *                     imageUrl: "https://cdn.sanity.io/images/.../luxury-apartments.jpg"
 *                     createdAt: "2025-10-01T00:00:00.000Z"
 *                     updatedAt: "2025-10-05T00:00:00.000Z"
 *                 meta:
 *                   total: 8
 *                   totalPages: 1
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

const getRealEstatePlansHandler = asyncHandler(async (req) => {
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  try {
    const { page, limit, start, end } = getPaginationParams(req);

    const query = `*[_type == "realEstatePlan" && status == "active"]
      | order(createdAt desc)
      [${start}...${end}]{
        _id,
        title,
        location,
        roiEstimate,
        investmentPeriod,
        minInvestment,
        status,
        "imageUrl": image.asset->url,
        createdAt,
        updatedAt
      }`;

    const plans = await client.fetch(query);

    const totalQuery = `count(*[_type == "realEstatePlan" && status == "active"])`;
    const total = await client.fetch(totalQuery);

    return sendResponse(true, "Real estate plans fetched successfully", 200, {
      plans,
      meta: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    console.error("GET_REAL_ESTATE_PLANS_ERROR:", error);
    return sendResponse(false, "Failed to fetch real estate plans", 500);
  }
});

export const GET = withAuth(getRealEstatePlansHandler);
