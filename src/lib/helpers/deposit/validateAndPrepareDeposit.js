import { client } from "@/lib/sanity";
import { uploadImage } from "@/lib/uploadImage";
import { sendResponse } from "@/lib/response";

export async function validateAndPrepareDeposit(req, user) {
  const userId = user?.userId;
  if (!userId) return { error: sendResponse(false, "Unauthorized", 401) };

  const userData = await client.fetch(
    `*[_type == "user" && _id == $userId][0]{ _id, email, fullName, accountStatus }`,
    { userId }
  );

  if (!userData) return { error: sendResponse(false, "User not found", 404) };
  if (userData.accountStatus !== "active")
    return { error: sendResponse(false, "Your account must be active to fund.", 403) };

  const formData = await req.formData();
  const proofOfPayment = formData.get("proofOfPayment");
  const crypto = formData.get("crypto");
  const amountRaw = formData.get("amount");

  if (!crypto) return { error: sendResponse(false, "Crypto type is required", 400) };
  if (!amountRaw) return { error: sendResponse(false, "Amount is required", 400) };

  const amount = parseFloat(amountRaw);
  if (isNaN(amount)) return { error: sendResponse(false, "Amount must be a valid number", 400) };
  if (amount < 100) return { error: sendResponse(false, "Amount must be at least $100", 400) };

  const allowedCryptos = ["USDT", "BTC", "ETH", "BNB", "TRX"];
  if (!allowedCryptos.includes(crypto)) {
    return { error: sendResponse(false, "Invalid crypto type. Allowed: USDT, BTC, ETH, BNB, TRX.", 400) };
  }

  if (!proofOfPayment || proofOfPayment.size === 0)
    return { error: sendResponse(false, "Proof of funding is required", 400) };

  const proofImageRef = await uploadImage(proofOfPayment);
  if (!proofImageRef) return { error: sendResponse(false, "Failed to upload proof of payment", 500) };

  return { userId, userData, crypto, amount, proofImageRef };
}
