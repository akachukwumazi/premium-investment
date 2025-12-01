/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password after verifying OTP. Requires the email and new password. Returns a success message even if email sending fails.
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
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: MyNewStrongPassword123!
 *     responses:
 *       200:
 *         description: Password reset successful
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
 *                   example: Password reset successful
 *       400:
 *         description: Invalid input (missing email/newPassword or OTP not verified)
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
 *                   example: Invalid email or OTP not verified
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
 *                   example: Something went wrong. Please try again later.
 */

import { client } from "@/lib/sanity";
import { comparePasswords, hashPassword } from "@/lib/auth";
import { asyncHandler } from "@/lib/asyncHandler";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import { findUserByEmail } from "@/lib/findUserByEmail";
import { sendPasswordResetConfirmationEmail } from "@/lib/mailer";
import { rateLimiter } from "@/lib/rateLimiter";
import { validateFields } from "@/lib/validateFields";

export const POST = asyncHandler(async (req) => {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const { email, newPassword } = sanitizeInput(body);

  if (!email || !newPassword)
    return sendResponse(false, "Email and new password are required", 400);

  // Validate password strength
  const validationError = validateFields(["password"], { password: newPassword });
  if (validationError) return sendResponse(false, validationError, 400);

  const user = await findUserByEmail(email);
  if (!user || !user.otpVerified)
    return sendResponse(false, "Invalid email or OTP not verified", 400);

  const isSamePassword = await comparePasswords(newPassword, user.password);
  if (isSamePassword)
    return sendResponse(false, "New password must be different from the current password", 400);

  const hashedPassword = await hashPassword(newPassword);

  await client
    .patch(user._id)
    .set({
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
      otpVerified: false,
    })
    .commit();

  try {
    await sendPasswordResetConfirmationEmail(
      user.email,
      user.fullName?.split(" ")[0] || "dear"
    );
  } catch (err) {
    console.error("Failed to send reset confirmation email:", err);
  }

  return sendResponse(true, "Password reset successful");
});
