// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export function withAuth(handler) {
//   return async (req, ...args) => {
//     try {
//       const token =
//         req.cookies.get("token")?.value ||
//         req.headers.get("authorization")?.replace("Bearer ", "");

//     //   console.log("Cookies:", req.cookies.get("token")?.value);
//     //   console.log("Header:", req.headers.get("authorization"));
//     //   console.log("Token resolved:", token);

//       if (!token) {
//         return NextResponse.json(
//           { error: "Unauthorized: Please log in" },
//           { status: 401 }
//         );
//       }

//       const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//       const { payload } = await jwtVerify(token, secret);

//     //   console.log("JWT payload:", payload);

//       // Instead of mutating req, pass payload to handler
//       return handler(req, { ...args, user: payload });
//     } catch (err) {
//       console.error("Auth error:", err.message);
//       return NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 401 }
//       );
//     }
//   };
// }


import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { client } from "@/lib/sanity";

export function withAuth(handler) {
  return async (req, ...args) => {
    try {
      const token =
        req.cookies.get("token")?.value ||
        req.headers.get("authorization")?.replace("Bearer ", "");

      if (!token) {
        return NextResponse.json(
          { success: false, message: "Unauthorized: Please log in" },
          { status: 401 }
        );
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // Fetch user account status from DB
      const currentUser = await client.fetch(
        `*[_type == "user" && _id == $userId][0]{ accountStatus }`,
        { userId: payload.userId }
      );

      if (!currentUser) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }

      if (currentUser.accountStatus !== "active") {
        return NextResponse.json(
          { success: false, message: "Complete your account to access this feature." },
          { status: 403 }
        );
      }

      return handler(req, { ...args, user: payload });
    } catch (err) {
      console.error("Auth error:", err.message);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  };
}
