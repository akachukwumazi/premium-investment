/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit a contact form
 *     description: Allows a user to submit a contact form. Sends details to the support team and also sends a confirmation email to the user.
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - question
 *               - comment
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               question:
 *                 type: string
 *                 example: "How do I reset my password?"
 *               comment:
 *                 type: string
 *                 example: "I tried resetting my password but didn't get an email. Please assist."
 *     responses:
 *       200:
 *         description: Contact form submitted successfully
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
 *                   example: Thank you for contacting us!
 *       400:
 *         description: Validation failed (e.g., missing or invalid fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation failed
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: Invalid email address
 *       500:
 *         description: Internal server error (e.g., email sending failed)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 *                 message:
 *                   type: string
 *                   example: Failed to submit form
 */

import { rateLimiter } from "@/lib/rateLimiter";
import { sendContactEmail, sendContactAcknowledgementEmail } from "@/lib/mailer";
import { sendResponse } from "@/lib/response";
import { asyncHandler } from "@/lib/asyncHandler";

export const POST = asyncHandler(async (req) => {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const { name, email, question, comment } = await req.json();

  if (!name || !email || !question || !comment)
    return sendResponse(false, "All fields are required", 400);

  await sendContactEmail({ name, email, question, comment });
  await sendContactAcknowledgementEmail({ name, email, question, comment });

  return sendResponse(true, "Thank you for contacting us!", 200);
});
