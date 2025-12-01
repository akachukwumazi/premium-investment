/**
 * @swagger
 * /api/investments/loans/plans:
 *   get:
 *     summary: Retrieve all active loan plans (paginated)
 *     description: |
 *       Fetches all active loan plans with pagination support.
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
 *         description: Successfully fetched loan plans
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Loan plans fetched successfully
 *               data:
 *                 plans:
 *                   - _id: "loanPlan_abc123"
 *                     title: "Elite Loan Plan"
 *                     minAmount: 5000
 *                     maxAmount: 50000
 *                     interest: 25
 *                     duration: 100
 *                     status: "active"
 *                     createdAt: "2025-10-01T00:00:00.000Z"
 *                     updatedAt: "2025-10-05T00:00:00.000Z"
 *                 meta:
 *                   total: 5
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

const getLoanPlansHandler = asyncHandler(async (req) => {
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  try {
    const { page, limit, start, end } = getPaginationParams(req);

    const query = `*[_type == "loanPlan" && status == "active"]
      | order(createdAt desc)
      [${start}...${end}]{
        _id,
        title,
        minAmount,
        maxAmount,
        interest,
        duration,
        status,
        createdAt,
        updatedAt
      }`;

    const plans = await client.fetch(query);

    const totalQuery = `count(*[_type == "loanPlan" && status == "active"])`;
    const total = await client.fetch(totalQuery);

    return sendResponse(true, "Loan plans fetched successfully", 200, {
      plans,
      meta: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    console.error("❌ GET_LOAN_PLANS_ERROR:", error);
    return sendResponse(false, "Failed to fetch loan plans", 500);
  }
});

export const GET = withAuth(getLoanPlansHandler);
