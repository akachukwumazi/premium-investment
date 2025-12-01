import { v4 as uuidv4 } from "uuid";
import { client } from "@/lib/sanity";
import { sendWithdrawalNotificationEmail } from "@/lib/mailer";

export async function createWithdrawal({ userId, userData, cryptoType, amount, wallet }) {
  const newWithdrawal = {
    _id: uuidv4(),
    _type: "withdrawal",
    user: { _type: "reference", _ref: userId },
    crypto: cryptoType,
    amount,
    walletAddress: wallet,
    status: "pending",
    requestedAt: new Date().toISOString(),
  };

  const createdWithdrawal = await client.create(newWithdrawal);

  // Notify user
  await sendWithdrawalNotificationEmail({
    email: userData.email,
    name: userData.fullName,
    crypto: cryptoType,
    amount,
    walletAddress: wallet,
    status: "Pending",
    date: new Date(),
    isAdmin: false,
  });

  // Notify admin
  await sendWithdrawalNotificationEmail({
    email: process.env.ADMIN_EMAIL,
    name: "Admin",
    crypto: cryptoType,
    amount,
    walletAddress: wallet,
    status: "Pending",
    date: new Date(),
    isAdmin: true,
    userName: userData.fullName,
    userEmail: userData.email,
  });

  return createdWithdrawal;
}
