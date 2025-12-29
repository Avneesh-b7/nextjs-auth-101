/**
 * USAGE GUIDELINES:
 * - Central User schema supporting authentication, authorization, and recovery.
 * - Designed for production use with email verification and RBAC.
 * - Safe to extend with hooks and instance methods.
 */

import mongoose, { Schema, Model, Document } from "mongoose";

// -----------------------------
// 1. TypeScript Interface
// -----------------------------
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  // Email verification
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpiry?: Date;
  loginToken?: string;
  loginTokenExpiry?: Date;

  // Role-based access control (RBAC)
  role: "user" | "admin";

  // Forgot password
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;

  createdAt: Date;
  updatedAt: Date;
}

// -----------------------------
// 2. Mongoose Schema
// -----------------------------
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 5,
      select: false, // prevents accidental exposure
    },

    // -----------------------------
    // Email Verification
    // -----------------------------
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationTokenExpiry: {
      type: Date,
    },

    loginToken: {
      type: String,
    },

    loginTokenExpiry: {
      type: Date,
    },

    // -----------------------------
    // RBAC
    // -----------------------------
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // -----------------------------
    // Forgot Password
    // -----------------------------
    passwordResetToken: {
      type: String,
    },

    passwordResetTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// -----------------------------
// 3. Model Export (Hot-reload safe)
// -----------------------------
const UserModel: Model<IUser> =
  mongoose.models.users1 || mongoose.model<IUser>("users1", UserSchema);

export default UserModel;
