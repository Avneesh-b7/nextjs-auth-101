/*
# PROMPT 
nnow lets write the login route in route.ts in next js

#TASK 
1. write a login function 
2. the function takes email and password of the user from the frontend and connects to the db (connectToDatabase())
3. it checks if the email exits sends an error if does not 
4. if email exits then it checks for the password (compares using brcypt)
5.if password correct it generates a JWT token (using email and TOKEN_SECRET in .env file)
6. one token is stored in the db (loginToken feild) and the other is sent to the user in http cookie 



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

#here is the updated UserModel just in case (send the user model)
*/

/*
follow up prompts -
1. give 2 seperate feild name and _id in the response
2. keep name as the name of the user and _id as the id 
3 .the token shouleexpire in 5min (do accordingly what is needed with the cookie)

*/

/**
 * USAGE GUIDELINES:
 * - Authenticates user credentials.
 * - Issues a short-lived JWT (5 minutes).
 * - Stores token metadata securely and sets HTTP-only cookie.
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "@/src/app/dbconfig/dbconfig";
import UserModel from "@/src/models/UserModel";

// -----------------------------
// Types
// -----------------------------
interface LoginRequestBody {
  email: string;
  password: string;
}

// -----------------------------
// POST /api/users/login
// -----------------------------
export async function POST(req: NextRequest) {
  console.log("[LOGIN] Request received");

  try {
    // 1. Connect DB
    await connectToDatabase();

    // 2. Parse body
    const { email, password }: LoginRequestBody = await req.json();

    // 3. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 4. Find user
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist" },
        { status: 404 }
      );
    }

    // 5. Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 6. Generate JWT (5 minutes)
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
      return NextResponse.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const TOKEN_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      tokenSecret,
      { expiresIn: "5m" }
    );

    // 7. Store token in DB
    user.loginToken = token;
    user.loginTokenExpiry = new Date(Date.now() + TOKEN_EXPIRY_MS);
    await user.save();

    // 8. Create response + cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        id: user._id.toString(),
        name: user.name,
      },
      { status: 200 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 60, // 5 minutes (in seconds)
      //   path: "/",
    });

    console.log("[LOGIN] Success", {
      userId: user._id.toString(),
      email: user.email,
    });

    return response;
  } catch (error) {
    console.error("[LOGIN] Error", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
