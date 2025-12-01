/**
 * @swagger
 * /funds:
 *   post:
 *     summary: Create a deposit (fund) request
 *     description: |
 *       This endpoint allows a **KYC-verified** user to create a new deposit request.
 *       
 *       The user must upload a **proof of payment** (such as a screenshot or receipt) along with:
 *       - the **cryptocurrency type** (`USDT`, `BTC`, `ETH`, `BNB`, or `TRX`),
 *       - and a **funding amount** in USD (minimum of **$100**).
 *       
 *       The proof of payment is securely uploaded to Sanity, and notifications are automatically sent to both the **admin** and the **user** upon successful submission.
 *     tags:
 *       - Funding
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - crypto
 *               - amount
 *               - proofOfPayment
 *             properties:
 *               crypto:
 *                 type: string
 *                 enum: [USDT, BTC, ETH, BNB, TRX]
 *                 example: USDT
 *                 description: Cryptocurrency to use for funding
 *               amount:
 *                 type: number
 *                 minimum: 100
 *                 example: 150
 *                 description: Deposit amount in USD (minimum of $100)
 *               proofOfPayment:
 *                 type: string
 *                 format: binary
 *                 description: Screenshot or receipt of payment as proof
 *     responses:
 *       201:
 *         description: Deposit request created successfully
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
 *                   example: "Deposit request submitted successfully."
 *                 data:
 *                   type: object
 *                   description: Newly created deposit record
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "fund_abc123xyz"
 *                     crypto:
 *                       type: string
 *                       example: "USDT"
 *                     amount:
 *                       type: number
 *                       example: 150
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     proofUrl:
 *                       type: string
 *                       example: "https://cdn.sanity.io/images/projectId/proof.png"
 *       400:
 *         description: Invalid request — bad input or unsupported crypto type
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
 *                   example: "Invalid crypto type. Allowed values are: USDT, BTC, ETH, BNB, TRX."
 *       401:
 *         description: Unauthorized — missing or invalid authentication token
 *       403:
 *         description: Forbidden — user has not completed KYC verification
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error — unexpected issue while processing request
 */




// import { v4 as uuidv4 } from "uuid";
// import { client } from "@/lib/sanity";
// import { uploadImage } from "@/lib/uploadImage";
// import { sendDepositNotificationEmail } from "@/lib/mailer";
// import { withKycAuth } from "@/lib/auth/kycGuard";
// import { sendResponse } from "@/lib/response";
// import { asyncHandler } from "@/lib/asyncHandler";
// import { rateLimiter } from "@/lib/rateLimiter";

// export const POST = withKycAuth(
//   asyncHandler(async (req, { user }) => {
//     // Apply rate limiting: max 5 deposits per minute per IP
//     const limiter = await rateLimiter(5, 60 * 1000)(req);
//     if (limiter.limited) return limiter.response;

//     const userId = user?.userId;
//     if (!userId) return sendResponse(false, "Unauthorized", 401);

//     // Fetch the user to include email + name in notifications
//     const userData = await client.fetch(
//       `*[_type == "user" && _id == $userId][0]{ _id, email, fullName, accountStatus }`,
//       { userId }
//     );

//     if (!userData) return sendResponse(false, "User not found", 404);
//     if (userData.accountStatus !== "active")
//       return sendResponse(false, "Your account must be active to fund.", 403);

//     const formData = await req.formData();
//     const proofOfPayment = formData.get("proofOfPayment");
//     const crypto = formData.get("crypto");
//     const amountRaw = formData.get("amount");

//     // Field validation
//     if (!crypto) return sendResponse(false, "Crypto type is required", 400);
//     if (!amountRaw) return sendResponse(false, "Amount is required", 400);

//     const amount = parseFloat(amountRaw);
//     if (isNaN(amount)) return sendResponse(false, "Amount must be a valid number", 400);
//     if (amount < 100) return sendResponse(false, "Amount must be at least $100", 400);

//     const allowedCryptos = ["USDT", "BTC", "ETH", "BNB", "TRX"];
//     if (!allowedCryptos.includes(crypto)) {
//       return sendResponse(
//         false,
//         "Invalid crypto type. Allowed: USDT, BTC, ETH, BNB, TRX.",
//         400
//       );
//     }

//     if (!proofOfPayment || proofOfPayment.size === 0)
//       return sendResponse(false, "Proof of funding is required", 400);

//     const proofImageRef = await uploadImage(proofOfPayment);
//     if (!proofImageRef)
//       return sendResponse(false, "Failed to upload proof of payment", 500);

//     const newFund = {
//       _id: uuidv4(),
//       _type: "Deposit",
//       user: { _type: "reference", _ref: userId },
//       crypto,
//       amount,
//       status: "pending",
//       fundedAt: new Date().toISOString(),
//       proofOfPayment: proofImageRef,
//     };

//     const createdFund = await client.create(newFund);

//     // Notify admin
//     await sendDepositNotificationEmail({
//       email: process.env.ADMIN_EMAIL,
//       name: "Admin",
//       crypto,
//       amount,
//       status: "pending",
//       date: new Date().toISOString(),
//       isAdmin: true,
//       userName: userData.fullName,
//       userEmail: userData.email,
//     });

//     // Notify user
//     await sendDepositNotificationEmail({
//       email: userData.email,
//       name: userData.fullName,
//       crypto,
//       amount,
//       status: "pending",
//       date: new Date().toISOString(),
//     });

//     return sendResponse(true, "Deposit created successfully", 201, createdFund);
//   })
// );
import { withKycAuth } from "@/lib/auth/kycGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { rateLimiter } from "@/lib/rateLimiter";
import { sendResponse } from "@/lib/response";
import { validateAndPrepareDeposit } from "@/lib/helpers/deposit/validateAndPrepareDeposit";
import { createDeposit } from "@/lib/helpers/deposit/createDeposit";

export const POST = withKycAuth(
  asyncHandler(async (req, { user }) => {
    const limiter = await rateLimiter(5, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;

    const prep = await validateAndPrepareDeposit(req, user);
    if (prep.error) return prep.error;

    const createdFund = await createDeposit(prep);
    return sendResponse(true, "Deposit created successfully", 201, createdFund);
  })
);
