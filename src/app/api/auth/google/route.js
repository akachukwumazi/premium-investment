/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Google Authentication
 *     description: >
 *       Authenticates a user using Google OAuth via an ID token.
 *       If the user does not exist, a new account is automatically created.
 *       Handles referral logic if a referral code is provided.
 *       Returns access and refresh tokens as secure HTTP-only cookies.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: The Google ID token obtained from client-side Google Sign-In.
 *                 example: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij..."
 *               referralCode:
 *                 type: string
 *                 description: Optional referral code from another user.
 *                 example: "SPARK123"
 *     responses:
 *       200:
 *         description: Google sign-in successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "token=jwt_token; refreshToken=jwt_refresh_token; HttpOnly; Path=/"
 *             description: HTTP-only cookies containing access and refresh tokens
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
 *                   example: Google sign-in successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "abc123-user-id"
 *                     fullName:
 *                       type: string
 *                       example: "Chinedu Freedom"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     phoneNumber:
 *                       type: string
 *                       nullable: true
 *                       example: "+2348012345678"
 *                     referralCode:
 *                       type: string
 *                       example: "SPARK123"
 *                     referralCount:
 *                       type: integer
 *                       example: 0
 *                     referredBy:
 *                       type: object
 *                       nullable: true
 *                       example: { "_id": "ref123", "fullName": "Jane Doe" }
 *                     accountStatus:
 *                       type: string
 *                       example: "incomplete"
 *                     authProvider:
 *                       type: string
 *                       enum: [google]
 *                       example: "google"
 *       400:
 *         description: Authentication failed (invalid or missing ID token)
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
 *                   example: Authentication failed
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
 *                   example: Internal server error
 */

import { client } from "@/lib/sanity";
import { OAuth2Client } from "google-auth-library";
import { generateReferralCode } from "@/lib/generateReferralCode";
import { generateToken, generateRefreshToken } from "@/lib/auth";
import { asyncHandler } from "@/lib/asyncHandler";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import { v4 as uuid } from "uuid";
import { rateLimiter } from "@/lib/rateLimiter";

const clientId = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(clientId);

export const POST = asyncHandler(async (req) => {
  // Optional: rate limit refresh attempts (e.g., 5 per minute)
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const { idToken, referralCode } = sanitizeInput(await req.json());

  if (!idToken) return sendResponse(false, "ID token is required", 400);

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    if (!email || !name)
      return sendResponse(false, "Invalid Google payload", 400);

    let user = await client.fetch(`*[_type=="user" && email==$email][0]`, {
      email,
    });

    if (!user) {
      const newReferralCode = generateReferralCode(name);

      user = await client.create({
        _type: "user",
        email,
        fullName: name,
        referralCode: newReferralCode,
        referredBy: null,
        accountDeposit: 0,
        referralCount: 0,
        referralRewards: [],
        emailVerified: true,
        accountStatus: "incomplete",
        authProvider: "google",
        _createdAt: new Date().toISOString(),
      });

      // Handle referral if provided
      if (referralCode) {
        const referrer = await client.fetch(
          `*[_type=="user" && referralCode==$referralCode][0]`,
          { referralCode }
        );

        if (referrer) {
          await client
            .patch(user._id)
            .set({ referredBy: { _type: "reference", _ref: referrer._id } })
            .commit();

          await client
            .patch(referrer._id)
            .setIfMissing({
              accountDeposit: 0,
              referralCount: 0,
              referralRewards: [],
            })
            .inc({ accountDeposit: 10, referralCount: 1 })
            .append("referralRewards", [
              {
                _key: uuid(),
                date: new Date().toISOString(),
                referredUser: { _type: "reference", _ref: user._id },
                amount: 15,
                status: "approved",
              },
            ])
            .commit();
        }
      }
    }

    // Generate tokens
    const accessToken = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role, {
      expiresIn: "7d",
    });

    // Send cookies + response
    const response = sendResponse(true, "Google sign-in successful", 200, {
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        referralCode: user.referralCode,
        phoneNumber: user.phoneNumber || null,
        referralCount: user.referralCount,
        accountStatus: user.accountStatus,
        authProvider: user.authProvider,
      },
    });

    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      priority: "high",
    });

    return response;
  } catch (err) {
    console.error("Google sign-in error:", err);
    return sendResponse(false, "Authentication failed", 400);
  }
});
