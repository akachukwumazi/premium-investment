/**
 * @swagger
 * /auth/request-otp:
 *   post:
 *     summary: Request password reset OTP
 *     description: Generates a 4-digit OTP for password reset and sends it to the user's email if the account exists. No Zod validation; uses manual checks.
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
 *         description: Generic success message (OTP may or may not be sent, for security reasons).
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
 *                   example: If the account exists, an OTP has been sent
 *       400:
 *         description: Validation error (missing or invalid email).
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
 *                   example: Email is required
 *       500:
 *         description: Server error (unexpected issue).
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
 *                   example: Server error. Please try again later.
 */

import { client } from "@/lib/sanity";
import crypto from "crypto";
import { addMinutes } from "date-fns";
import { sendPasswordResetEmail } from "@/lib/mailer";
import { hashOtp } from "@/lib/auth";
import { asyncHandler } from "@/lib/asyncHandler";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import { findUserByEmail } from "@/lib/findUserByEmail";
import { rateLimiter } from "@/lib/rateLimiter";

export const POST = asyncHandler(async (req) => {
  // Apply rate limiting: max 5 requests per minute
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const { email } = sanitizeInput(body);

  if (!email) return sendResponse(false, "Email is required", 400);

  const user = await findUserByEmail(email);

  if (!user) {
    // Generic response to prevent email enumeration
    return sendResponse(true, "If the account exists, an OTP has been sent");
  }

  const otp = crypto.randomInt(1000, 10000).toString();
  const hashedOtp = await hashOtp(otp);
  const otpExpiry = addMinutes(new Date(), 10);

  await client
    .patch(user._id)
    .set({ otp: hashedOtp, otpExpiry, otpVerified: false })
    .commit();

  sendPasswordResetEmail(user.email, user.fullName?.split(" ")[0] || "dear", otp)
    .catch((err) => console.error("Failed to send OTP email:", err));

  return sendResponse(true, "If the account exists, an OTP has been sent");
});
