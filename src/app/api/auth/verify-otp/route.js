/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     description: Validates a one-time password (OTP) sent to the user's email and marks the user as OTP-verified if valid.
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
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 description: 4-digit OTP sent to the user's email
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: OTP verified successfully
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
 *                   example: OTP verified successfully
 *       400:
 *         description: Invalid, expired OTP, or missing fields
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
 *                   example: Invalid or expired OTP
 *       500:
 *         description: Server error
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
import { asyncHandler } from "@/lib/asyncHandler";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import { findUserByEmail } from "@/lib/findUserByEmail";
import { verifyOtp } from "@/lib/auth";
import { rateLimiter } from "@/lib/rateLimiter";

export const POST = asyncHandler(async (req) => {
  // Limit to max 5 OTP verification attempts per minute
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const { email, otp } = sanitizeInput(body);

  if (!email || !otp) return sendResponse(false, "Email and OTP are required", 400);

  const user = await findUserByEmail(email);

  if (!user || !user.otp) return sendResponse(false, "Invalid OTP or email", 400);

  const isOtpValid = await verifyOtp(otp, user.otp);

  if (!isOtpValid || !user.otpExpiry || new Date(user.otpExpiry) < new Date()) {
    return sendResponse(false, "Invalid or expired OTP", 400);
  }

  await client.patch(user._id).set({ otpVerified: true }).commit();

  return sendResponse(true, "OTP verified successfully");
});
