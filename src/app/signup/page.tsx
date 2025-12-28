"use client";

/**
 * USAGE GUIDELINES:
 * - Presentational signup UI only (dark-mode optimized).
 * - No business logic or API integration.
 * - Designed to be extended without refactoring.
 */

import React from "react";
import Link from "next/link";

function SignupPage() {
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
          Create an account
        </h1>
        <p style={{ color: "#a3a3a3", marginBottom: "1.5rem" }}>
          Get started in just a few steps
        </p>

        <form>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name" style={{ color: "#d4d4d4" }}>
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
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
            Sign Up
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
  );
}

export default SignupPage;
