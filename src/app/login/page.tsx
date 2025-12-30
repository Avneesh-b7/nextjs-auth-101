/*
//PROMPT

// ok now since we have done the login route lets move on to the front end login page

// # task
// 1. i want you to grab the values email and pass from this peice of code
// 2. i want you to change button colors (make it look very professional) on hover
// 3. make sure we have validation in place (e.g. name should be minimum 2 letters , email should be valid , password should be min 5 chars ..etc)
// 4. make the login button non clickalble when the feilds are not complete
// 5. route to user profile page /src/app/profile/[id] (here id can be user id , but on this page i want you to display the name of the user)- show me additional code snippet of what shall be done on the profile page
// 6. display toast using react-toastify when sign up sucessfule
// 7. complete the login function (axios sends a req. to the backend on login button click)
//8. make sure we are logging all importatn things which could help us debug the application


/**
 * USAGE GUIDELINES:
 * - Handles login UI + API integration.
 * - Validates inputs, disables submit until valid.
 * - Shows toast feedback and routes on success.
 */

/**
 * USAGE GUIDELINES:
 * - Handles login UI + API integration.
 * - Validates inputs and disables submit until valid.
 * - Shows toast feedback and revalidates auth state on success.
 */

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

function LoginPage() {
  const router = useRouter();

  // -----------------------------
  // State
  // -----------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Validation
  // -----------------------------
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 5;

  const isFormValid = useMemo(
    () => isEmailValid && isPasswordValid,
    [isEmailValid, isPasswordValid]
  );

  // -----------------------------
  // Login handler
  // -----------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    console.log("[LOGIN_FE] Attempting login", { email });

    try {
      setLoading(true);

      const res = await axios.post("/api/users/login", {
        email,
        password,
      });

      console.log("[LOGIN_FE] Login success", res.data);

      toast.success("Login successful 👋");

      // 🔑 IMPORTANT:
      // Navigate + refresh so layout re-runs getCurrentUser()
      router.push("/");
      router.refresh();
    } catch (err: any) {
      console.error("[LOGIN_FE] Login failed", err);

      toast.error(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2rem",
          backgroundColor: "#0f0f0f",
          border: "1px solid #262626",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ color: "#ffffff", marginBottom: "0.5rem" }}>
          Welcome back
        </h1>
        <p style={{ color: "#a3a3a3", marginBottom: "1.5rem" }}>
          Log in to continue
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#d4d4d4" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane.doe@example.com"
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "#d4d4d4" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              fontWeight: 600,
              backgroundColor: isFormValid ? "#ffffff" : "#404040",
              color: isFormValid ? "#000000" : "#a3a3a3",
              cursor: isFormValid ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (isFormValid)
                e.currentTarget.style.backgroundColor = "#e5e5e5";
            }}
            onMouseLeave={(e) => {
              if (isFormValid)
                e.currentTarget.style.backgroundColor = "#ffffff";
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p
          style={{
            marginTop: "1.25rem",
            textAlign: "center",
            color: "#a3a3a3",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#ffffff" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

// -----------------------------
// Shared input style
// -----------------------------
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  backgroundColor: "#000000",
  border: "1px solid #262626",
  borderRadius: "6px",
  color: "#ffffff",
};

export default LoginPage;
