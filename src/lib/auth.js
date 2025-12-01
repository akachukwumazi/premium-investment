import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
// const SALT_ROUNDS = 10;

if (!JWT_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_SECRET and REFRESH_SECRET must be set");
}

// Hash otp
export async function hashOtp(otp) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(otp, salt);
}

// Verify otp
export async function verifyOtp(plainOtp, hashedOtp) {
  return await bcrypt.compare(plainOtp, hashedOtp);
}

// Hash a plain password
export async function hashPassword(password) {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);
}

// Compare a plain password with a hashed password
export async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Access token (short-lived)
export function generateToken(userId, role = "user", options = {}) {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: "1hr", ...options } // default 1 hour
  );
}

// Refresh token (long-lived)
export function generateRefreshToken(userId, role = "user", options = {}) {
  return jwt.sign(
    { userId, role },
    REFRESH_SECRET,
    { expiresIn: "7d", ...options } // default 7 days
  );
}

// Verify token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return null;
  }
}
