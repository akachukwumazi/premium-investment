import { client } from "@/lib/sanity";
import { comparePasswords, hashPassword } from "@/lib/auth";
import { asyncHandler } from "@/lib/asyncHandler";
import { sanitizeInput } from "@/lib/sanitizeInput";
import { sendResponse } from "@/lib/response";
import { withAuth } from "@/lib/auth/authGuard";
import { sendPasswordChangeConfirmationEmail } from "@/lib/mailer";
import { rateLimiter } from "@/lib/rateLimiter";
import { validateFields } from "@/lib/validateFields";

const findUserById = async (userId) => {
  if (!userId) return null;
  const user = await client.fetch(
    `*[_type == "user" && _id == $userId && isDeleted != true][0]`,
    { userId }
  );
  return user || null;
};

const changePasswordHandler = asyncHandler(async (req, { user }) => {
  const limiter = await rateLimiter(5, 60 * 1000)(req);
  if (limiter.limited) return limiter.response;

  const userId = user.userId;
  const body = await req.json();
  const { currentPassword, newPassword } = sanitizeInput(body);

  if (!currentPassword || !newPassword)
    return sendResponse(false, "Both current and new passwords are required", 400);

  // Validate new password strength
  const validationError = validateFields(["password"], { password: newPassword });
  if (validationError) return sendResponse(false, validationError, 400);

  const dbUser = await findUserById(userId);
  if (!dbUser) return sendResponse(false, "User not found", 404);

  const isCurrentValid = await comparePasswords(currentPassword, dbUser.password);
  if (!isCurrentValid)
    return sendResponse(false, "Incorrect current password", 401);

  const isSameAsOld = await comparePasswords(newPassword, dbUser.password);
  if (isSameAsOld)
    return sendResponse(false, "New password must be different from the old password", 400);

  const hashedNewPassword = await hashPassword(newPassword);
  await client
    .patch(dbUser._id)
    .set({
      password: hashedNewPassword,
      _updatedAt: new Date().toISOString(),
    })
    .commit();

  try {
    await sendPasswordChangeConfirmationEmail(
      dbUser.email,
      dbUser.fullName?.split(" ")[0] || "dear"
    );
  } catch (err) {
    console.error("Failed to send password change email:", err);
  }

  return sendResponse(true, "Password updated successfully");
});

export const POST = withAuth(changePasswordHandler);
