/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh authentication tokens
 *     description: |
 *       Validates the refresh token stored in cookies and issues a new access token and refresh token.
 *       This endpoint helps maintain a user's session without requiring them to log in again.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         headers:
 *           Set-Cookie:
 *             description: New access and refresh tokens are set as HttpOnly cookies
 *             schema:
 *               type: string
 *               example: token=abc123; HttpOnly; Secure; SameSite=None
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
 *                   example: Tokens refreshed
 *       401:
 *         description: Refresh token missing, invalid, expired, or user inactive
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
 *                   example: Invalid or expired refresh token
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
 *                   example: Something went wrong while refreshing tokens
 */



import { client } from "@/lib/sanity";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { generateToken, generateRefreshToken, verifyRefreshToken } from "@/lib/auth";
import { rateLimiter } from "@/lib/rateLimiter";

export const POST = asyncHandler(async (req) => {
  // Optional: rate limit refresh attempts (e.g., 5 per minute)
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const cookieHeader = req.headers.get("cookie");
  const refreshToken = cookieHeader
    ?.split("; ")
    .find((c) => c.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) return sendResponse(false, "Refresh token missing", 401);

  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) return sendResponse(false, "Invalid refresh token", 401);

    const userId = decoded.userId;

    // Fetch user directly using your existing Sanity logic
    const user = await client.fetch(
      `*[_type=="user" && _id==$userId && isDeleted != true][0]`,
      { userId }
    );

    if (!user || user.accountStatus !== "active") {
      return sendResponse(false, "User not found or inactive", 401);
    }

    const keepMeLoggedIn = decoded.keepMeLoggedIn ?? false;

    const newAccessToken = generateToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id, user.role, {
      expiresIn: keepMeLoggedIn ? "7d" : "1d",
    });

    // Build response using sendResponse + cookies
    const response = sendResponse(true, "Tokens refreshed");

    response.cookies.set("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      maxAge: keepMeLoggedIn ? 60 * 60 * 24 * 7 : 60 * 60 * 24,
      priority: "high",
    });

    return response;
  } catch (err) {
    console.error("Refresh token error:", err);
    return sendResponse(false, "Invalid or expired refresh token", 401);
  }
});
