/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subscribe to PrimeChain newsletter
 *     description: Creates a new subscriber entry if the email is valid and not already subscribed. Sends a welcome email upon success.
 *     tags:
 *       - Subscription
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
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: Subscription successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subscription successful
 *       400:
 *         description: Email already subscribed
 *       422:
 *         description: Validation failed (invalid email format)
 *       500:
 *         description: Internal server error
 */

import { client } from "@/lib/sanity";
import { rateLimiter } from "@/lib/rateLimiter";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { validateFields } from "@/lib/validateFields";
import { sendSubscriptionEmail } from "@/lib/mailer";

export const POST = asyncHandler(async (req) => {
  // Apply rate limiting (5 requests per minute)
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const body = await req.json();
  const { email } = sanitizeInput(body);

  // Validate required fields
  const validationError = validateFields(["email"], { email });
  if (validationError) return sendResponse(false, validationError, 400);

  // Basic email format validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) return sendResponse(false, "Invalid email format", 400);

  // Check if already subscribed
  const existingSubscriber = await client.fetch(
    `*[_type == "subscriber" && email == $email][0]`,
    { email }
  );

  if (existingSubscriber) {
    return sendResponse(false, "Email already subscribed", 400);
  }

  // Create subscriber in Sanity
  const newSubscriber = await client.create({
    _type: "subscriber",
    email,
    subscribedAt: new Date().toISOString(),
  });

  // Send welcome email (non-blocking)
  try {
    await sendSubscriptionEmail({ email });
  } catch (err) {
    console.error("MAIL_ERROR:", err);
  }

  // Return success
  return sendResponse(true, "Subscription successful", 201, {
    subscriberId: newSubscriber._id,
    email: newSubscriber.email,
    subscribedAt: newSubscriber.subscribedAt,
  });
});
