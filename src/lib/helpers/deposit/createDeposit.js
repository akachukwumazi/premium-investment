import { v4 as uuidv4 } from "uuid";
import { client } from "@/lib/sanity";
import { sendDepositNotificationEmail } from "@/lib/mailer";

export async function createDeposit({ userId, userData, crypto, amount, proofImageRef }) {
  const newFund = {
    _id: uuidv4(),
    _type: "deposit",
    user: { _type: "reference", _ref: userId },
    crypto,
    amount,
    status: "pending",
    fundedAt: new Date().toISOString(),
    proofOfPayment: proofImageRef,
  };

  const createdFund = await client.create(newFund);

  await sendDepositNotificationEmail({
    email: process.env.ADMIN_EMAIL,
    name: "Admin",
    crypto,
    amount,
    status: "pending",
    date: new Date().toISOString(),
    isAdmin: true,
    userName: userData.fullName,
    userEmail: userData.email,
  });

  await sendDepositNotificationEmail({
    email: userData.email,
    name: userData.fullName,
    crypto,
    amount,
    status: "pending",
    date: new Date().toISOString(),
  });

  return createdFund;
}
