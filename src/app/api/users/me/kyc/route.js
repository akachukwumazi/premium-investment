import { client } from "@/lib/sanity";
import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { validateKycFields } from "@/lib/helpers/kyc/validateKycFields";
import { handleKycImageUploads } from "@/lib/helpers/kyc/handleKycImageUploads";
import { checkExistingKyc } from "@/lib/helpers/kyc/checkExistingKyc";
import { rateLimiter } from "@/lib/rateLimiter";

export const POST = withAuth(
  asyncHandler(async (req, { user }) => {
     // Apply rate limiting (5 requests per minute)
      const limiter = await rateLimiter(5, 60 * 1000)(req);
      if (limiter.limited) return limiter.response;
      
    const userId = user?.userId;
    if (!userId) return sendResponse(false, "Unauthorized: Please log in", 401);

    const existingKyc = await client.fetch(
      `*[_type == "kyc" && user._ref == $userId][0]`,
      { userId }
    );

    const existingMessage = checkExistingKyc(existingKyc);
    if (existingMessage && existingKyc.status !== "rejected") {
      return sendResponse(false, existingMessage, 400);
    }

    const formData = await req.formData();
    const kycData = {
      fullName: formData.get("fullName")?.trim(),
      email: formData.get("email")?.trim(),
      address: formData.get("address")?.trim(),
      maritalStatus: formData.get("maritalStatus")?.toLowerCase(),
      dob: formData.get("dob")?.trim(),
      idType: formData.get("idType")?.toLowerCase(),
      idNumber: formData.get("idNumber")?.trim(),
      idFront: formData.get("idFront"),
      idBack: formData.get("idBack"),
    };

    const validationError = validateKycFields(kycData);
    if (validationError) return sendResponse(false, validationError, 400);

    const { uploadedFront, uploadedBack } = await handleKycImageUploads(
      kycData.idFront,
      kycData.idBack
    );

    const newKyc = {
      _type: "kyc",
      user: { _type: "reference", _ref: userId },
      ...kycData,
      idFront: uploadedFront,
      ...(uploadedBack && { idBack: uploadedBack }),
      status: "pending",
      _createdAt: new Date().toISOString(),
    };

    const createdKyc = await client.create(newKyc);

    return sendResponse(true, "KYC submitted successfully", 201, {
      ...createdKyc,
    });
  })
);
