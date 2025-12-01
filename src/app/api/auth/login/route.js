/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user using email and password. Applies rate limiting, sanitizes input, validates data, and checks account/email verification before issuing JWT tokens. Sets secure HTTP-only cookies for access and refresh tokens.
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
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *               keepMeLoggedIn:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "token=jwt_token; refreshToken=jwt_refresh_token; HttpOnly; Path=/"
 *             description: Secure HTTP-only cookies containing access and refresh tokens
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
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "abc123xyz"
 *                     fullName:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     phoneNumber:
 *                       type: string
 *                       nullable: true
 *                       example: "+2348012345678"
 *                     referralCode:
 *                       type: string
 *                       example: REF123
 *                     referralCount:
 *                       type: integer
 *                       example: 5
 *                     referredBy:
 *                       type: object
 *                       nullable: true
 *                       example: { "_id": "ref123", "fullName": "Jane Doe" }
 *                     accountStatus:
 *                       type: string
 *                       example: active
 *                     authProvider:
 *                       type: string
 *                       enum: [email, google]
 *                       example: email
 *       400:
 *         description: Validation failed (invalid or missing input)
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
 *                   example: Validation failed
 *                 errors:
 *                   type: object
 *       401:
 *         description: Invalid credentials (wrong email or password)
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
 *                   example: Invalid credentials
 *       403:
 *         description: Email not verified or account not active
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
 *                   example: Please verify your email before logging in
 *       429:
 *         description: Too many requests (rate limited)
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
 *                   example: Something went wrong during login
 */



import { comparePasswords, generateToken, generateRefreshToken } from "@/lib/auth";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { rateLimiter } from "@/lib/rateLimiter";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { validateFields } from "@/lib/validateFields";
import { findUserByEmail } from "@/lib/findUserByEmail";

export const POST = asyncHandler(async (req) => {
  // Rate limiting — 5 requests per minute
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const { email, password, keepMeLoggedIn } = body || {};

  // Sanitize input
  const cleanEmail = sanitizeInput(email);
  const cleanPassword = sanitizeInput(password);

  // Validate required fields
  const validationError = validateFields(["email", "password"], {
    email: cleanEmail,
    password: cleanPassword,
  });
  if (validationError) return sendResponse(false, validationError, 400);

  // Find user by email (production-ready helper handles trim + lowercase + isDeleted)
  const user = await findUserByEmail(cleanEmail);

  // Prevent timing attacks
  const fakeHash = "$2b$10$invalidhashforconsistencysakexxxxxxxxxxxxxxxxxxxx";
  const passwordMatch = await comparePasswords(cleanPassword, user?.password || fakeHash);

  if (!user || !passwordMatch) {
    return sendResponse(false, "Invalid email or password", 401);
  }

  // Check account status
  if (user.accountStatus !== "active") {
    return sendResponse(
      false,
      `Your account is ${user.accountStatus}. Please verify your email or contact support.`,
      403
    );
  }

  // Check email verification
  if (!user.emailVerified) {
    const tokenExpired = user.tokenExpiresAt && new Date(user.tokenExpiresAt) < new Date();
    if (tokenExpired) {
      return sendResponse(false, "Your verification link has expired. Please request a new one.", 403);
    }
    return sendResponse(false, "Please verify your email before logging in", 403);
  }

  // Generate tokens
  const accessToken = generateToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role, {
    expiresIn: keepMeLoggedIn ? "7d" : "1d",
  });

  // Send response with cookies
  const response = sendResponse(true, "Login successful", 200, {
    userId: user._id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    referralCode: user.referralCode,
    referralCount: user.referralCount,
    referredBy: user.referredBy,
    accountStatus: user.accountStatus,
    authProvider: user.authProvider,
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: keepMeLoggedIn ? 60 * 60 * 24 * 7 : 60 * 60 * 24, // 7d or 1d
  });

  response.cookies.set("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
});
