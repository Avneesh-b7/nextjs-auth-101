"use client";

import React from "react";
import Link from "next/link";

function LoginPage() {
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

        <form>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ color: "#d4d4d4" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane.doe@example.com"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                backgroundColor: "#000000",
                border: "1px solid #262626",
                borderRadius: "6px",
                color: "#ffffff",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ color: "#d4d4d4" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                backgroundColor: "#000000",
                border: "1px solid #262626",
                borderRadius: "6px",
                color: "#ffffff",
              }}
            />
          </div>

          <button
            type="submit"
            disabled
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "not-allowed",
            }}
          >
            Log In
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

export default LoginPage;
