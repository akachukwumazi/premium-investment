/**
 * @swagger
 * /api/investments/{id}:
 *   get:
 *     summary: Retrieve a single investment by ID
 *     description: |
 *       Fetches a single investment document using its unique ID.
 *       Only authenticated users can access this endpoint.
 *     tags:
 *       - Investments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the investment
 *     responses:
 *       200:
 *         description: Successfully retrieved investment details
 *       400:
 *         description: Invalid or missing investment ID
 *       404:
 *         description: Investment not found
 *       401:
 *         description: Unauthorized access (token required)
 *       500:
 *         description: Internal server error
 */

import { client } from "@/lib/sanity";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { withAuth } from "@/lib/auth/authGuard";

const fetchSingleInvestmentHandler = asyncHandler(async (req, context) => {
  const limiter = await rateLimiter(10, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const resolvedParams = await context?.params;
  const { id } = resolvedParams;

  if (!id) return sendResponse(false, "Investment ID is required", 400);

  const investment = await client.fetch(
    `*[_type == "investment" && _id == $id][0]{
      _id,
      title,
      "imageUrl": image.asset->url
    }`,
    { id }
  );

  if (!investment) return sendResponse(false, "Investment not found", 404);

  return sendResponse(true, "Investment fetched successfully", 200, investment);
});

export const GET = (req, context) =>
  withAuth(() => fetchSingleInvestmentHandler(req, context))(req, context);
