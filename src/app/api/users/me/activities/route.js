/**
 * @swagger
 * /users/me/activities:
 *   get:
 *     summary: Get logged-in user's activities
 *     description: Returns a list of activities performed by the currently authenticated user.  
 *       This endpoint requires authentication and automatically fetches the activities of the logged-in user using their token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user activities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 activities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "activity_1"
 *                       action:
 *                         type: string
 *                         example: "LOGIN"
 *                       details:
 *                         type: string
 *                         example: "User logged into the system"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-04T12:34:56Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Failed to fetch activities
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
 *                   example: "Failed to fetch activities."
 */

import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { getUserActivities } from "@/lib/getUserActivities";
import { rateLimiter } from "@/lib/rateLimiter";

export const GET = withAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(10, 60 * 1000)(req); // 10 requests per minute
    if (limiter.limited) return limiter.response;

    const userId = user?.userId;
    if (!userId) {
      return sendResponse(false, "Unauthorized: Please log in", 401);
    }

    const activities = await getUserActivities(userId);

    return sendResponse(true, "User activities fetched successfully", 200, activities);
  })
);
