/**
 * @swagger
 * /users/me/investments:
 *   get:
 *     summary: Get paginated list of user's investments
 *     description: |
 *       Fetches the authenticated user's investments with pagination.
 *       Each investment includes details like amount, units held, ROI, repayment date,
 *       status, and linked plan information. Pagination metadata is included in the response.
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
 *         description: User investments fetched successfully
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
 *                         example: inv_123abc
 *                       planType:
 *                         type: string
 *                         example: "fixed"
 *                       amount:
 *                         type: number
 *                         example: 5000
 *                       unitsHeld:
 *                         type: number
 *                         example: 10
 *                       expectedROI:
 *                         type: number
 *                         example: 750
 *                       interestAmount:
 *                         type: number
 *                         example: 1000
 *                       repaymentDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-31T00:00:00Z"
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-01T00:00:00Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-31T00:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-01T00:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-01T12:00:00Z"
 *                       plan:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: plan_456def
 *                           title:
 *                             type: string
 *                             example: "Premium Plan"
 *                           duration:
 *                             type: string
 *                             example: "12 months"
 *                           dailyProfit:
 *                             type: number
 *                             example: 25
 *                           roiEstimate:
 *                             type: number
 *                             example: 15
 *                           investmentPeriod:
 *                             type: string
 *                             example: "long-term"
 *                           changePercent:
 *                             type: number
 *                             example: 5
 *                           currentPrice:
 *                             type: number
 *                             example: 500
 *                           image:
 *                             type: string
 *                             example: "https://example.com/images/plan.png"
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: user_789ghi
 *                           fullName:
 *                             type: string
 *                             example: "John Doe"
 *                           email:
 *                             type: string
 *                             example: "johndoe@example.com"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 3
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
 *         description: Too Many Requests - rate limit exceeded
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
 *                   example: Rate limit exceeded. Please try again later.
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
import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { rateLimiter } from "@/lib/rateLimiter";

// GET - Fetch logged-in user's details
export const GET = withAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(10, 60 * 1000)(req); // 10 requests per minute
    if (limiter.limited) return limiter.response;

    const userId = user?.userId;
    if (!userId) return sendResponse(false, "Unauthorized: Please log in", 401);

    const query = `*[_type == "user" && role == "user" && _id == $userId][0]{
      _id,
      fullName,
      email,
      country,
      state,
      city,
      address,
      referralCode,
      referralCount,
      phoneNumber,
      accountStatus,
      accountBalance,
      accountProfit,
      emailVerified,
      authProvider,
      _createdAt
    }`;

    const currentUser = await client.fetch(query, { userId });

    if (!currentUser) return sendResponse(false, "User not found", 404);

    return sendResponse(
      true,
      "User details fetched successfully",
      200,
      currentUser
    );
  })
);

// PATCH - Update user profile info
export const PATCH = withAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(5, 60 * 1000)(req); // 5 requests per minute
    if (limiter.limited) return limiter.response;

    const userId = user?.userId;
    if (!userId) return sendResponse(false, "Unauthorized: Please log in", 401);

    const body = await req.json();
    const { country, state, city, address } = sanitizeInput(body);

    // Ensure at least one field is provided
    if (!country && !state && !city && !address)
      return sendResponse(false, "No fields provided to update", 400);

    await client
      .patch(userId)
      .set({
        ...(country && { country }),
        ...(state && { state }),
        ...(city && { city }),
        ...(address && { address }),
        _updatedAt: new Date().toISOString(),
      })
      .commit();

    return sendResponse(true, "Profile updated successfully", 200);
  })
);
