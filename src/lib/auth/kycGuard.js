import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { withAuth } from "./authGuard"; // reuse your existing withAuth

export function withKycAuth(handler) {
  return withAuth(async (req, context) => {
    try {
      const userId = context.user.userId;
      console.log("User ID:", userId);
      if (!userId) {
        return NextResponse.json(
          { error: "User not authenticated" },
          { status: 401 }
        );
      }
      // Fetch the KYC record for this user
      const kyc = await client.fetch(
        `*[_type=="kyc" && user._ref == $userId][0]`,
        { userId }
      );

      if (!kyc) {
        return NextResponse.json(
          { error: "KYC not submitted. Please complete KYC before investing." },
          { status: 403 }
        );
      }

      if (kyc.status === "pending") {
        return NextResponse.json(
          { error: "Your KYC is still pending approval, Please check back later." },
          { status: 403 }
        );
      }
      if (kyc.status === "rejected") {
        return NextResponse.json(
          { error: "Your KYC was rejected. Please resubmit." },
          { status: 403 }
        );
      }
      if (kyc.status !== "approved") {
        return NextResponse.json(
          { error: "KYC not approved. Please complete verification." },
          { status: 403 }
        );
      }

      // KYC approved → continue to your route handler
      return handler(req, context);
    } catch (err) {
      console.error("KYC auth error:", err);
      return NextResponse.json(
        { error: "Server error during KYC validation" },
        { status: 500 }
      );
    }
  });
}
