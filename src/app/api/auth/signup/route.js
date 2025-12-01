/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: >
 *       Creates a new user in Sanity after validating input fields, enforcing rate limiting, checking for referral codes, 
 *       and sending a verification email. Returns a structured response with success status, message, and user data.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phoneNumber
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John O'Brian"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *               phoneNumber:
 *                 type: string
 *                 example: "+2348012345678"
 *               referralCode:
 *                 type: string
 *                 example: REF123
 *     responses:
 *       201:
 *         description: User successfully registered and verification email sent.
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
 *                   example: Verification email sent. Please check your inbox.
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "abc123xyz"
 *                     fullName:
 *                       type: string
 *                       example: "John O'Brian"
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     accountStatus:
 *                       type: string
 *                       example: "pending"
 *                     referralCode:
 *                       type: string
 *                       example: "JHNBRN1"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     referrer:
 *                       oneOf:
 *                         - type: string
 *                           example: "none"
 *                         - type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "ref123"
 *                             fullName:
 *                               type: string
 *                               example: "Jane Doe"
 *                             email:
 *                               type: string
 *                               example: janedoe@example.com
 *                             referralCode:
 *                               type: string
 *                               example: "REF999"
 *                             referralCount:
 *                               type: integer
 *                               example: 3
 *       400:
 *         description: Validation or input error (missing fields, invalid email, bad referral, etc.)
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
 *                   example: Invalid email format
 *       401:
 *         description: Too many signup attempts (rate limit exceeded)
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
 *         description: Internal server error (e.g., email sending failure or database issue)
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
 *                   example: Could not send verification email
 */


import { client } from "@/lib/sanity";
import { hashPassword } from "@/lib/auth";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { randomBytes, createHash } from "crypto";
import { addMinutes } from "date-fns";
import { sendVerificationEmail } from "@/lib/mailer";
import { generateReferralCode } from "@/lib/generateReferralCode";
import { rateLimiter } from "@/lib/rateLimiter";
import { validateFields } from "@/lib/validateFields";
import { asyncHandler } from "@/lib/asyncHandler";
import { findUserByEmail } from "@/lib/findUserByEmail";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import bcrypt from "bcryptjs";

export const POST = asyncHandler(async (req) => {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const { fullName, email, phoneNumber, password, referralCode } = sanitizeInput(body);
  const normalizedEmail = email?.trim().toLowerCase();

  // Validate required fields
  const validationError = validateFields(
    ["fullName", "email", "phoneNumber", "password"],
    { fullName, email: normalizedEmail, phoneNumber, password }
  );
  if (validationError) return sendResponse(false, validationError, 400);

  // Validate and format phone number
  const parsedPhone = parsePhoneNumberFromString(phoneNumber);
  if (!parsedPhone || !parsedPhone.isValid())
    return sendResponse(false, "Invalid phone number format", 400);
  const formattedPhone = parsedPhone.format("E.164");

  // Check if email already exists
  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) return sendResponse(false, "This email is already registered", 400);

  // Handle referral code logic
  let referredBy = undefined;
  let referrerInfo = null;
  if (referralCode) {
    const referrer = await client.fetch(
      `*[_type == "user" && role == "user" && referralCode == $referralCode][0]`,
      { referralCode: referralCode.toUpperCase() }
    );

    if (!referrer) return sendResponse(false, "Invalid referral code", 400);
    if (referrer.accountStatus !== "active")
      return sendResponse(false, "Referrer must have an active account", 400);

    referredBy = { _ref: referrer._id, _type: "reference" };
    referrerInfo = {
      _id: referrer._id,
      fullName: referrer.fullName,
      email: referrer.email,
      referralCode: referrer.referralCode,
      referralCount: referrer.referralCount || 0,
    };
  }

  // Generate verification token
  const token = randomBytes(32).toString("hex");
  const tokenDigest = createHash("sha256").update(token).digest("hex");
  const verificationToken = await bcrypt.hash(token, parseInt(process.env.SALT_ROUNDS) || 10);

  // Create user
  const newUser = await client.create({
    _type: "user",
    fullName,
    email: normalizedEmail,
    phoneNumber: formattedPhone,
    password: await hashPassword(password),
    referralCode: generateReferralCode(fullName),
    referredBy,
    referrerId: referralCode || null,
    emailVerified: false,
    accountStatus: "pending",
    tokenDigest,
    verificationToken,
    role: "user",
    authProvider: "email",
    isDeleted: false,
    tokenExpiresAt: addMinutes(new Date(), 10).toISOString(),
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  });

  // Send verification email
  try {
    await sendVerificationEmail({
      email: normalizedEmail,
      name: fullName.split(" ")[0],
      token,
    });
  } catch (err) {
    console.error("MAIL_ERROR:", err);
    await client.patch(newUser._id).set({ isDeleted: true }).commit();
    return sendResponse(false, "Could not send verification email", 500);
  }

  return sendResponse(true, "Verification email sent. Please check your inbox.", 201, {
    userId: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    accountStatus: newUser.accountStatus,
    referralCode: newUser.referralCode,
    role: newUser.role,
    referrer: referrerInfo,
  });
});
