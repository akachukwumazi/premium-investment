/**
 * @swagger
 * /auth/complete-profile:
 *   post:
 *     summary: Complete user profile by adding phone number
 *     description: Allows an authenticated user with an incomplete account to add their phone number and activate their account.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []   # JWT auth required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number in international format
 *                 example: "+2348012345678"
 *     responses:
 *       200:
 *         description: Profile completed successfully
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
 *                   example: Profile completed successfully
 *                 data:
 *                   type: object
 *                   description: The updated user document from Sanity
 *       400:
 *         description: Invalid phone number format or account already active
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
 *                   example: "Phone number is required" or "Account is already active"
 *       401:
 *         description: Unauthorized (missing or invalid token)
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
 *                   example: Unauthorized
 *       500:
 *         description: Server error while updating phone number
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
 *                   example: Something went wrong
 */




import { client } from "@/lib/sanity";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";

async function completeProfileHandler(req, { user }) {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  try {
    if (user.accountStatus === "active") {
      return sendResponse(false, "Account is already active", 400);
    }

    const body = await req.json();
    const { phoneNumber } = sanitizeInput(body);

    if (!phoneNumber) {
      return sendResponse(false, "Phone number is required", 400);
    }

    const parsedPhone = parsePhoneNumberFromString(phoneNumber);
    if (!parsedPhone || !parsedPhone.isValid()) {
      return sendResponse(false, "Invalid phone number format", 400);
    }

    const formattedPhone = parsedPhone.format("E.164");

    const updatedUser = await client
      .patch(user.userId)
      .set({
        phoneNumber: formattedPhone,
        accountStatus: "active",
        _updatedAt: new Date().toISOString(),
      })
      .commit();

    return sendResponse(true, "Profile completed successfully", 200, updatedUser);
  } catch (err) {
    console.error("Complete profile error:", err);
    return sendResponse(false, "Something went wrong", 500);
  }
}

export const POST = withAuth(asyncHandler(completeProfileHandler));
