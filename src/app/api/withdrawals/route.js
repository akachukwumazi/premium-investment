/**
 * @swagger
 * /withdrawals:
 *   post:
 *     summary: Request a crypto withdrawal
 *     description: >
 *       Allows an authenticated and KYC-approved user to create a new withdrawal request.
 *       The crypto type must be one of **USDT**, **BTC**, **ETH**, **BNB**, or **TRX**,
 *       and the minimum withdrawal amount is **$100**.
 *     tags:
 *       - Withdrawals
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - crypto
 *               - amount
 *               - walletAddress
 *             properties:
 *               crypto:
 *                 type: string
 *                 description: The cryptocurrency type to withdraw. Must be one of: USDT, BTC, ETH, BNB, TRX.
 *                 example: "USDT"
 *               amount:
 *                 type: number
 *                 description: The withdrawal amount (must be a valid number and at least $100).
 *                 example: 150.75
 *               walletAddress:
 *                 type: string
 *                 description: The user's wallet address to send the crypto to.
 *                 example: "0xAbC123EfG456hIJ789KLmNopQrStUvWxYz"
 *     responses:
 *       201:
 *         description: Withdrawal request submitted successfully and pending admin approval.
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
 *                   example: Withdrawal request submitted successfully and is pending approval.
 *                 data:
 *                   type: object
 *                   description: The created withdrawal record.
 *       400:
 *         description: Invalid or missing input fields.
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
 *                   example: Amount must be at least $100.
 *       401:
 *         description: Unauthorized (missing/invalid token or KYC not completed).
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
 *       404:
 *         description: User not found.
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
 *         description: Internal server error.
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
 *                   example: Something went wrong while processing your withdrawal request.
 */

// import { v4 as uuidv4 } from "uuid";
// import { client } from "@/lib/sanity";
// import { withKycAuth } from "@/lib/auth/kycGuard";
// import { sendResponse } from "@/lib/response";
// import { asyncHandler } from "@/lib/asyncHandler";
// import { sendWithdrawalNotificationEmail } from "@/lib/mailer";
// import { rateLimiter } from "@/lib/rateLimiter";

// export const POST = withKycAuth(
//   asyncHandler(async (req, { user }) => {
//     // Apply rate limiting: max 5 deposits per minute per IP
//     const limiter = await rateLimiter(5, 60 * 1000)(req);
//     if (limiter.limited) return limiter.response;

//     const userId = user?.userId;
//     if (!userId) return sendResponse(false, "Unauthorized", 401);

//     const body = await req.json();
//     const { crypto, amount, walletAddress } = body;

//     const wallet = walletAddress?.trim();
//     const cryptoType = crypto?.toUpperCase();

//     // Validation using switch
//     switch (true) {
//       case !cryptoType:
//         return sendResponse(false, "Crypto is required", 400);
//       case !wallet:
//         return sendResponse(false, "Wallet address is required", 400);
//       case !amount:
//         return sendResponse(false, "Amount is required", 400);
//       case isNaN(amount):
//         return sendResponse(false, "Amount must be a valid number", 400);
//       case Number(amount) < 100:
//         return sendResponse(false, "Amount must be at least $100", 400);
//     }

//     const allowedCryptos = ["USDT", "BTC", "ETH", "BNB", "TRX"];
//     if (!allowedCryptos.includes(cryptoType)) {
//       return sendResponse(
//         false,
//         "Invalid crypto type. Allowed: USDT, BTC, ETH, BNB, TRX.",
//         400
//       );
//     }

//     // Fetch user info
//     const userData = await client.fetch(
//       `*[_type == "user" && _id == $userId][0]{ _id, fullName, email, accountBalance }`,
//       { userId }
//     );

//     if (!userData) return sendResponse(false, "User not found", 404);

//     const currentBalance = userData.accountBalance || 0;
//     if (currentBalance < amount) {
//       return sendResponse(
//         false,
//         "Insufficient balance. Please fund your account before withdrawing.",
//         400
//       );
//     }

//     // Create withdrawal record
//     const newWithdrawal = {
//       _id: uuidv4(),
//       _type: "withdrawal",
//       user: { _type: "reference", _ref: userId },
//       crypto: cryptoType,
//       amount: parseFloat(amount),
//       walletAddress: wallet,
//       status: "pending",
//       requestedAt: new Date().toISOString(),
//     };

//     const createdWithdrawal = await client.create(newWithdrawal);

//     // Notify user
//     await sendWithdrawalNotificationEmail({
//       email: userData.email,
//       name: userData.fullName,
//       crypto: cryptoType,
//       amount,
//       walletAddress: wallet,
//       status: "Pending",
//       date: new Date(),
//       isAdmin: false,
//     });

//     // Notify admin
//     await sendWithdrawalNotificationEmail({
//       email: process.env.ADMIN_EMAIL,
//       name: "Admin",
//       crypto: cryptoType,
//       amount,
//       walletAddress: wallet,
//       status: "Pending",
//       date: new Date(),
//       isAdmin: true,
//       userName: userData.fullName,
//       userEmail: userData.email,
//     });

//     return sendResponse(
//       true,
//       "Withdrawal request submitted successfully and is pending approval.",
//       201,
//       createdWithdrawal
//     );
//   })
// );

import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";
import { validateAndPrepareWithdrawal } from "@/lib/helpers/withdrawal/validateAndPrepareWithdrawal";
import { createWithdrawal } from "@/lib/helpers/withdrawal/createWithdrawal";

export const POST = withKycAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(5, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;

    const prep = await validateAndPrepareWithdrawal(req, user);
    if (prep.error) return prep.error;

    const createdWithdrawal = await createWithdrawal(prep);
    return sendResponse(
      true,
      "Withdrawal request submitted successfully and is pending approval.",
      201,
      createdWithdrawal
    );
  })
);
