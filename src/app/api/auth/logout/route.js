/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears authentication cookies (access token and refresh token) to log the user out.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logout successful
 */

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logout successful" },
    { status: 200 }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  };

  response.cookies.set("refreshToken", "", cookieOptions);
  response.cookies.set("token", "", cookieOptions);

  return response;
}
