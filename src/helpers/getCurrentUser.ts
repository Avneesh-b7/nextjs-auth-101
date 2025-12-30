/*
PROMPT

This function is a **server-side helper** that derives the currently
authenticated user (if any) from the HTTP-only auth token cookie.

# TASK
1. Write a server-only helper function called `getCurrentUser()`.
2. The function should NOT depend on middleware output; it should
   independently read the `authToken` from HTTP-only cookies.
3. If the auth token does not exist, return `null` (user is unauthenticated).
4. If the auth token exists:
   a. Verify and decode the JWT using `TOKEN_SECRET`.
   b. Extract user identity information from the token payload.
   c. Validate the token against the database (match stored token and expiry).
5. If any validation fails (missing token, invalid JWT, expired token,
   revoked session, or missing user), return `null`.
6. If all validations succeed, return the authenticated user object.
7. The function should NOT:
   - Redirect users
   - Modify cookies
   - Return HTTP responses or status codes
   - Pass data via URL params or query strings

# EXPECTED BEHAVIOR
- Returns `User | null`
- Safe to call from:
  - Server layouts
  - Server pages
  - API routes
- Handles all errors gracefully and logs useful debug information.

# GENERAL REQUIREMENTS
- Include **usage guidelines** (2–3 lines) at the top.
- Include structured logging for observability.
- Ensure clean, maintainable, production-quality TypeScript code.
- Use appropriate imports for Next.js, JWT, and database access.
- Must be server-only (no `"use client"`).

Example usage:

const user = await getCurrentUser();
*/

/**
 * USAGE GUIDELINES:
 * - Server-only helper to derive authenticated user from authToken cookie.
 * - Performs JWT verification and DB session validation.
 * - Returns user object or null (never throws to caller).
 *
 * Example:
 * const user = await getCurrentUser();
 * if (!user) redirect("/login");
 */

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/src/app/dbconfig/dbconfig";
import UserModel, { IUser } from "@/src/models/UserModel";

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export async function getCurrentUser(): Promise<{
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
} | null> {
  try {
    console.log("[AUTH] getCurrentUser invoked");

    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      console.log("[AUTH] No auth token found");
      return null;
    }

    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      console.error("[AUTH] TOKEN_SECRET missing");
      return null;
    }

    let decoded: TokenPayload;

    try {
      decoded = jwt.verify(token, secret) as TokenPayload;
    } catch {
      console.warn("[AUTH] Invalid or expired JWT");
      return null;
    }

    await connectToDatabase();

    const user = await UserModel.findById(decoded.id).select(
      "name email role loginToken loginTokenExpiry"
    );

    if (!user) {
      console.warn("[AUTH] User not found in DB");
      return null;
    }

    if (user.loginToken !== token) {
      console.warn("[AUTH] Token mismatch (session revoked)");
      return null;
    }

    if (user.loginTokenExpiry && user.loginTokenExpiry < new Date()) {
      console.warn("[AUTH] Token expired in DB");
      return null;
    }

    // ✅ CONVERT TO PLAIN OBJECT (THIS IS THE FIX)
    const plainUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("[AUTH] User authenticated:", plainUser.email);

    return plainUser;
  } catch (error) {
    console.error("[AUTH] Unexpected error in getCurrentUser", error);
    return null;
  }
}

export default getCurrentUser;
