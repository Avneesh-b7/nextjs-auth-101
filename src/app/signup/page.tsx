//PROMPT

// ok now since we have done the signup route lets move on to the front end (GPT 5.2)

// # task
// 1. i want you to grab the values username , email and pass from this peice of code
// 2. i want you to change button colors (make it look very professional) on hover
// 3. make sure we have validation in place (e.g. name should be minimum 2 letters , email should be valid , password shoudl be min 5 chars ..etc)
// 4. make the signup button non clickalble when the feilds are not complete
// 5. route to the login page as soon as signup sucessful
// 6. display toast using react-toastify when sign up sucessfule
// 7. complete the signup function (axios sends a req. to the backend on signup button click) # current signup page code -->

"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function SignupPage() {
  const router = useRouter();

  // -----------------------------
  // State
  // -----------------------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Validation
  // -----------------------------
  const isUsernameValid = username.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 5;

  const isFormValid = useMemo(
    () => isUsernameValid && isEmailValid && isPasswordValid,
    [isUsernameValid, isEmailValid, isPasswordValid]
  );

  // -----------------------------
  // Signup handler
  // -----------------------------
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    try {
      setLoading(true);

      await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });

      toast.success("Signup successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <>
      <ToastContainer />

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
            Create an account
          </h1>
          <p style={{ color: "#a3a3a3", marginBottom: "1.5rem" }}>
            Get started in just a few steps
          </p>

          <form onSubmit={handleSignup}>
            {/* Name */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#d4d4d4" }}>Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Jane Doe"
                style={inputStyle}
              />
            </div>

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
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p
            style={{
              marginTop: "1.25rem",
              textAlign: "center",
              color: "#a3a3a3",
            }}
          >
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#ffffff" }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
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

export default SignupPage;
