import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Only dashboard routes require authentication
const PROTECTED_PATHS = ["/dashboard"];

function isProtectedPath(pathname) {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow everything that isn't a dashboard route
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  // From here on — only dashboard routes
  console.log("🔵 Protected route hit:", pathname);

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    console.log("🔴 No token — redirecting to login");
    return logout(req);
  }

  try {
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);

    // Wrong role
    if (payload.role && payload.role !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Suspended account
    if (payload.accountStatus !== "active") {
      return NextResponse.redirect(new URL("/account-suspended", req.url));
    }

    // Email not verified
    if (!payload.emailVerified) {
      return NextResponse.redirect(new URL("/auth/verify-email", req.url));
    }

    console.log("✅ Token valid — allowing access");
    return NextResponse.next();

  } catch (error) {
    console.log("🔴 Token invalid/expired — logging out");
    return logout(req);
  }
}

function logout(req) {
  const res = NextResponse.redirect(new URL("/auth/login", req.url));
  res.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};