import { client } from "@/lib/sanity";
import { withAuth } from "@/lib/auth/authGuard";
import { asyncHandler } from "@/lib/asyncHandler";
import { sendResponse } from "@/lib/response";

export const GET = withAuth(
  asyncHandler(async (_req, { user }) => {
    const userId = user && user.userId;

    if (!userId) {
      return sendResponse(false, "Unauthorized: Please log in", 401);
    }

    const kyc = await client.fetch(
      `*[_type == "kyc" && user._ref == $userId][0]{
        _id,
        fullName,
        email,
        address,
        maritalStatus,
        dob,
        idType,
        idNumber,
        "idFront": idFront.asset->url,
        "idBack": idBack.asset->url,
        status,
        rejectionReasons,
        _createdAt,
        _updatedAt
      }`,
      { userId }
    );

    if (!kyc) {
      return sendResponse(true, "No KYC submitted yet", 200, {
        status: "not_submitted"
      });
    }

    return sendResponse(
      true,
      "KYC fetched successfully",
      200,
      kyc
    );
  })
);
