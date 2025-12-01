/**
 * @swagger
 * /auth/resend-verification:
 *   post:
 *     summary: Resend verification email
 *     description: |
 *       Resends a new verification email to a user whose email has **not yet been verified**.
 *       The system enforces rate limiting (e.g., 10 minutes between requests) to prevent abuse.
 *       If a valid, non-expired verification token already exists, the request will be rejected.
 *       Deleted users (`isDeleted: true`) cannot request verification emails.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Verification email resent successfully
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
 *                   example: Verification email resent successfully.
 *       400:
 *         description: Validation failed, email already verified, deleted user, or resend requested too soon.
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
 *                       example: Validation failed
 *                     errors:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Invalid email format"]
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: Email already verified
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: This account has been deleted and cannot receive verification emails.
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: A verification email was already sent. Please wait 10 minute(s) before requesting a new one.
 *       404:
 *         description: User not found
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
 *                   example: User not found
 *       500:
 *         description: Server error while resending verification email
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
 *                   example: Internal server error
 */

import { client } from "@/lib/sanity";
import { createHash, randomBytes } from "crypto";
import { addMinutes, isAfter } from "date-fns";
import { sendVerificationEmail } from "@/lib/mailer";
import { rateLimiter } from "@/lib/rateLimiter";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import { asyncHandler } from "@/lib/asyncHandler";
import { findUserByEmail } from "@/lib/findUserByEmail";
import bcrypt from "bcryptjs";

export const POST = asyncHandler(async (req) => {
  // Rate limit: 5 requests per minute
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const sanitized = sanitizeInput(body);
  const email = sanitized.email?.trim().toLowerCase();

  if (!email) return sendResponse(false, "Email is required", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return sendResponse(false, "Invalid email format", 400);

  const user = await findUserByEmail(email);
  if (!user) return sendResponse(false, "User not found", 404);
  if (user.emailVerified)
    return sendResponse(false, "Email already verified", 400);

  // Prevent frequent resends
  if (
    user.tokenExpiresAt &&
    isAfter(new Date(user.tokenExpiresAt), new Date())
  ) {
    const minutesLeft = Math.ceil(
      (new Date(user.tokenExpiresAt).getTime() - Date.now()) / 60000
    );
    return sendResponse(
      false,
      `A verification email was already sent. Please wait ${minutesLeft} minute(s) before requesting a new one.`,
      400
    );
  }

  // Generate new verification token

  const token = randomBytes(32).toString("hex");
  const tokenDigest = createHash("sha256").update(token).digest("hex");
  const verificationToken = await bcrypt.hash(
    token,
    parseInt(process.env.SALT_ROUNDS) || 10
  );
  const tokenExpiresAt = addMinutes(new Date(), 15).toISOString();

  await client
    .patch(user._id)
    .set({
      tokenDigest,
      verificationToken,
      tokenExpiresAt,
      accountStatus: "pending",
      _updatedAt: new Date().toISOString(),
    })
    .commit();

  try {
    await sendVerificationEmail({
      email: user.email,
      name: user.fullName?.split(" ")[0] || "User",
      token,
    });
  } catch (err) {
    console.error("MAIL_ERROR:", err);
    await client.patch(user._id).set({ isDeleted: true }).commit();
    return sendResponse(
      false,
      "Could not send verification email. Account deactivated.",
      500
    );
  }

  return sendResponse(true, "Verification email resent successfully.", 200);
});
