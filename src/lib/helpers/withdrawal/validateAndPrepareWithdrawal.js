import { client } from "@/lib/sanity";
import { sendResponse } from "@/lib/response";

export async function validateAndPrepareWithdrawal(req, user) {
  const userId = user?.userId;
  if (!userId) return { error: sendResponse(false, "Unauthorized", 401) };

  const body = await req.json();
  const { crypto, amount, walletAddress } = body;

  const wallet = walletAddress?.trim();
  const cryptoType = crypto?.toUpperCase();

  switch (true) {
    case !cryptoType:
      return { error: sendResponse(false, "Crypto Type is required", 400) };
    case !wallet:
      return { error: sendResponse(false, "Wallet address is required", 400) };
    case !amount:
      return { error: sendResponse(false, "Amount is required", 400) };
    case isNaN(amount):
      return {
        error: sendResponse(false, "Amount must be a valid number", 400),
      };
    case Number(amount) < 100:
      return {
        error: sendResponse(false, "Amount must be at least $100", 400),
      };
  }

  const allowedCryptos = ["USDT", "BTC", "ETH", "BNB", "TRX"];
  if (!allowedCryptos.includes(cryptoType)) {
    return {
      error: sendResponse(
        false,
        "Invalid crypto type. Allowed: USDT, BTC, ETH, BNB, TRX.",
        400
      ),
    };
  }

  const userData = await client.fetch(
    `*[_type == "user" && _id == $userId][0]{ _id, fullName, email, accountDeposit }`,
    { userId }
  );

  if (!userData) return { error: sendResponse(false, "User not found", 404) };

  const currentBalance = userData.accountDeposit || 0;
  if (currentBalance < amount) {
    return {
      error: sendResponse(
        false,
        "Insufficient balance. Please fund your account before withdrawing.",
        400
      ),
    };
  }

  return { userId, userData, cryptoType, amount: parseFloat(amount), wallet };
}
