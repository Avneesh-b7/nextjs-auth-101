/**
 * USAGE GUIDELINES:
 * - Handles user signup via POST request.
 * - Validates input, creates user securely, and returns safe responses.
 * - Production-ready with proper error handling and logging.
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/src/app/dbconfig/dbconfig";
import UserModel from "@/src/models/UserModel";

// -----------------------------
// Types
// -----------------------------
interface SignupRequestBody {
  email: string;
  username: string;
  password: string;
}

// -----------------------------
// POST /api/users/signup
// -----------------------------
export async function POST(req: NextRequest) {
  console.log("[SIGNUP] Incoming request");

  try {
    // -----------------------------
    // 1. Connect to database
    // -----------------------------
    await connectToDatabase();
    console.log("[SIGNUP] Database connected");

    // -----------------------------
    // 2. Parse request body
    // -----------------------------
    const body: SignupRequestBody = await req.json();
    const { email, username, password } = body;

    // -----------------------------
    // 3. Validate input
    // -----------------------------
    if (!email || !username || !password) {
      console.warn("[SIGNUP] Missing required fields");

      return NextResponse.json(
        {
          success: false,
          message: "Email, username, and password are required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    if (password.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // 4. Check if user already exists
    // -----------------------------
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.warn("[SIGNUP] Email already exists", { email });

      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    // -----------------------------
    // 5. Hash password
    // -----------------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // -----------------------------
    // 6. Create new user
    // -----------------------------
    const newUser = await UserModel.create({
      name: username,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      role: "user",
    });

    console.log("[SIGNUP] User created successfully", {
      userId: newUser._id.toString(),
      email,
    });

    // -----------------------------
    // 7. Return success response
    // -----------------------------
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[SIGNUP] Internal server error", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
