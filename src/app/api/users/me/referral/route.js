
/**
 * @swagger
 * /users/me/referral:
 *   get:
 *     summary: Get referrals by user
 *     description: Retrieves all users who were referred by the specified user.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose referrals you want to fetch
 *         example: "abc123xyz"
 *     responses:
 *       200:
 *         description: List of referrals retrieved successfully
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
 *                       _id:
 *                         type: string
 *                         example: "ref456def"
 *                       fullName:
 *                         type: string
 *                         example: Jane Doe
 *                       email:
 *                         type: string
 *                         example: janedoe@example.com
 *                       accountStatus:
 *                         type: string
 *                         example: active
 *                       emailVerified:
 *                         type: boolean
 *                         example: true
 *                       referralCode:
 *                         type: string
 *                         example: REF456
 *                       referredBy:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "abc123xyz"
 *                           fullName:
 *                             type: string
 *                             example: John Doe
 *                       _createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-09-01T12:34:56Z"
 *       400:
 *         description: Missing or invalid user ID
 *       500:
 *         description: Internal server error
 */


import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { getReferralsByUser } from "@/lib/getReferralsByUser";
import { rateLimiter } from "@/lib/rateLimiter";

export const GET = withAuth(
  asyncHandler(async (req, { user }) => {
      // Apply rate limiting (10 requests per minute)
      const limiter = await rateLimiter(10, 60 * 1000)(req);
      if (limiter.limited) return limiter.response;
    const userId = user?.userId;
    if (!userId) {
      return sendResponse(false, "Unauthorized: Please log in", 401);
    }

    const referrals = await getReferralsByUser(userId);

    return sendResponse(true, "Referrals fetched successfully", 200, referrals);
  })
);
