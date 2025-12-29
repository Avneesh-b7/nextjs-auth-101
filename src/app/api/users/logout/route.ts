/*
# PROMPT
now lets write the logout route 

#TASK 
1. i want you to write a function that will help me logout the user 
2. this function is a simple get request 
3. it should simply clear the http cookie on the frontend and the loginToken on the backend 
4. it should also clear the loginTokenExpiry
5. as soon as the user is logged out 

#GENERAL GUIDELINES
- Include **usage guidelines** (2–3 lines) at the top.
- Provide an **example input** and **example output** using dummy JSON.
- Include **all necessary validations**.
- Handle **all errors gracefully** using a consistent schema.
- Return proper **HTTP status codes**.
- Add structured **logging** for easier debugging.
- Ensure clean, maintainable, scalable, **production-quality code**.
- ensure appriproate imports
- my tech stack is typescript , nextjs , mongodb
*/

/**
 * USAGE GUIDELINES:
 * - Logs out the currently authenticated user.
 * - Clears authentication cookie and invalidates server-side session.
 * - Safe to call multiple times (idempotent).
 */

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "@/src/app/dbconfig/dbconfig";
import UserModel from "@/src/models/UserModel";

// -----------------------------
// GET /api/users/logout
// -----------------------------
export async function GET(req: NextRequest) {
  console.log("[LOGOUT] Logout request received");

  try {
    // -----------------------------
    // 1. Connect to DB
    // -----------------------------
    await connectToDatabase();
    console.log("[LOGOUT] Database connected");

    // -----------------------------
    // 2. Read auth cookie
    // -----------------------------
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      console.warn("[LOGOUT] No auth token found");

      return NextResponse.json(
        {
          success: true,
          message: "User already logged out",
        },
        { status: 200 }
      );
    }

    // -----------------------------
    // 3. Decode token (best-effort)
    // -----------------------------
    let decoded: any = null;
    try {
      decoded = jwt.decode(token);
    } catch {
      console.warn("[LOGOUT] Failed to decode token");
    }

    // -----------------------------
    // 4. Clear token in DB (if user found)
    // -----------------------------
    if (decoded?.id) {
      await UserModel.findByIdAndUpdate(decoded.id, {
        $unset: {
          loginToken: "",
          loginTokenExpiry: "",
        },
      });

      console.log("[LOGOUT] Cleared login token in DB", {
        userId: decoded.id,
      });
    }

    // -----------------------------
    // 5. Clear cookie
    // -----------------------------
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );

    response.cookies.set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // ⬅️ expires immediately
      path: "/",
    });

    console.log("[LOGOUT] Cookie cleared");

    return response;
  } catch (error) {
    console.error("[LOGOUT] Internal server error", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
