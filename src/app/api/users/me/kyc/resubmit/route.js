import { client } from "@/lib/sanity";
import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";
import { validateKycFields } from "@/lib/helpers/kyc/validateKycFields";
import { handleKycImageUploads } from "@/lib/helpers/kyc/handleKycImageUploads";
import { rateLimiter } from "@/lib/rateLimiter";

export const PATCH = withAuth(
  asyncHandler(async (req, { user }) => {
    // Rate limiting
    const limiter = await rateLimiter(5, 60 * 1000)(req);
    if (limiter.limited) return limiter.response;

    const userId = user && user.userId;
    if (!userId) {
      return sendResponse(false, "Unauthorized: Please log in", 401);
    }

    // Fetch user's existing KYC
    const existingKyc = await client.fetch(
      `*[_type == "kyc" && user._ref == $userId][0]`,
      { userId }
    );

    if (!existingKyc) {
      return sendResponse(false, "No KYC found to resubmit", 404);
    }

    if (existingKyc.status !== "rejected") {
      return sendResponse(false, "You can only resubmit after rejection", 400);
    }

    // Parse form data
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

    // Validate fields
    const validationError = validateKycFields(kycData);
    if (validationError) {
      return sendResponse(false, validationError, 400);
    }

    // Upload new images
    const { uploadedFront, uploadedBack } = await handleKycImageUploads(
      kycData.idFront,
      kycData.idBack
    );

    // Prepare update object
    const updatedKyc = {
      fullName: kycData.fullName,
      email: kycData.email,
      address: kycData.address,
      maritalStatus: kycData.maritalStatus,
      dob: kycData.dob,
      idType: kycData.idType,
      idNumber: kycData.idNumber,
      status: "pending",
      rejectionReasons: [], // clear rejection messages
      idFront: uploadedFront || existingKyc.idFront,
      idBack: uploadedBack || existingKyc.idBack,
      _updatedAt: new Date().toISOString(),
    };

    // Perform update
    const patchedKyc = await client.patch(existingKyc._id).set(updatedKyc).commit();

    return sendResponse(true, "KYC resubmitted successfully", 200, patchedKyc);
  })
);
