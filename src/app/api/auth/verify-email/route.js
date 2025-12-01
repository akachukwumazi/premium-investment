/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify user email
 *     description: |
 *       Verifies a user's email using the token sent via email.
 *       If the token is valid and not expired, the user is marked as verified,
 *       their account is activated, and a **$10 welcome bonus** is credited to their deposit balance.
 *       This endpoint also includes rate limiting, input sanitization, and activity logging for security and traceability.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token received via email.
 *     responses:
 *       200:
 *         description: Email verified successfully and welcome bonus applied.
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
 *                   example: Email verified successfully!
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "abc123xyz"
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     accountBalance:
 *                       type: number
 *                       example: 10
 *       400:
 *         description: Invalid, missing, or expired verification token.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: Verification token is required
 *                     status:
 *                       type: number
 *                       example: 400
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: Invalid or expired verification token
 *                     status:
 *                       type: number
 *                       example: 400
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: Verification token has expired
 *                     status:
 *                       type: number
 *                       example: 400
 *       429:
 *         description: Rate limit exceeded — too many verification attempts.
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
 *                   example: Too many requests, please try again later.
 *                 status:
 *                   type: number
 *                   example: 429
 *       500:
 *         description: Internal server error during verification.
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
 *                   example: Something went wrong, please try again later
 *                 status:
 *                   type: number
 *                   example: 500
 */

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { client } from "@/lib/sanity";
import { logUserActivity } from "@/lib/logUserActivity";
import { rateLimiter } from "@/lib/rateLimiter";
import { asyncHandler } from "@/lib/asyncHandler";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";

export const GET = asyncHandler(async (req) => {
  // Rate limiting — 5 requests per minute
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const { searchParams } = new URL(req.url);
  const rawToken = searchParams.get("token");

  if (!rawToken) {
    return sendResponse(false, "Verification token is required", 400);
  }

  const tokenFromQuery = sanitizeInput(rawToken)?.trim();
  if (!tokenFromQuery) {
    return sendResponse(false, "Invalid verification token", 400);
  }

  // Generate digest for secure lookup
  const digestFromQuery = crypto
    .createHash("sha256")
    .update(tokenFromQuery)
    .digest("hex");

  // Fetch user using digest
  const query = `*[_type == "user" && tokenDigest == $digest && !emailVerified][0]`;
  const user = await client.fetch(query, { digest: digestFromQuery });

  if (!user) {
    return sendResponse(false, "Invalid or expired verification token", 400);
  }

  // Compare raw token against stored bcrypt hash
  const isValidToken = await bcrypt.compare(
    tokenFromQuery,
    user.verificationToken
  );
  if (!isValidToken) {
    return sendResponse(false, "Invalid or expired verification token", 400);
  }

  // Check token expiration
  if (user.tokenExpiresAt && new Date() > new Date(user.tokenExpiresAt)) {
    return sendResponse(false, "Verification token has expired", 400);
  }

  // Update user record — verify + welcome bonus
  const updatedUser = await client
    .patch(user._id)
    .set({
      emailVerified: true,
      accountStatus: "active",
      verificationToken: null,
      tokenDigest: null,
      tokenExpiresAt: null,
      _updatedAt: new Date().toISOString(),
    })
    .setIfMissing({ accountBalance: 0 })
    .inc({ accountBalance: 10 }) // welcome bonus
    .commit();

  await logUserActivity(
    updatedUser._id,
    "Welcome Bonus",
    "A welcome bonus of $10 was credited into your deposit account",
    "successful"
  );

  return sendResponse(true, "Email verified successfully!", 200, {
    userId: updatedUser._id,
    email: updatedUser.email,
    accountBalance: updatedUser.accountBalance,
  });
});
