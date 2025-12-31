import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = ["/auth/login", "/auth/signup", "/_next", "/api"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get the access token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No token → redirect to /auth/login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    // Verify the JWT (replace YOUR_SECRET_KEY with your actual secret)
    jwt.verify(token, process.env.JWT_SECRET || "YOUR_SECRET_KEY");
    return NextResponse.next(); // Token is valid
  } catch (err) {
    // Invalid or expired token → redirect to /auth/login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: "/((?!_next/static|favicon.ico).*)",
};
