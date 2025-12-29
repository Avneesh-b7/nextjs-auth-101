/*
PROMPT
ok now what i want is a professional looking Navbar.
just give me the UI for now, we will later work on the functinoality.
#Task 
1. what i need is a navbar that looks professional and mathces the theme of the app 
2. i need button on the Navbar (Login , Signup and Logout) that we will later add functionality to
3. i need an icon on the right side of the navbar saying something like "Hello ! name of the user" if logged in
4. i want the buttons to change color on hover (looks professional)
5. by default i want no button to be clicked 
6. make the navbar responsive to mobile screens as well
*/

"use client";

/**
 * USAGE GUIDELINES:
 * - Navbar with UI-only interaction.
 * - Button becomes primary ONLY when clicked.
 * - No auth logic yet (simulated state only).
 */

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ActiveButton = "login" | "signup" | "logout" | null;

const Navbar = () => {
  const router = useRouter();

  // -----------------------------
  // TEMP auth + UI state
  // -----------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeButton, setActiveButton] = useState<ActiveButton>(null);

  const handleNavigate = (key: ActiveButton, path: string) => {
    console.log("[NAVBAR] Clicked:", key);

    setActiveButton(key);

    // Fade back after 600ms
    setTimeout(() => {
      setActiveButton(null);
    }, 500);

    router.push(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link href="/" className="brand">
          MyApp
        </Link>

        {/* Actions */}
        <div className="actions">
          {!isLoggedIn && (
            <>
              <NavButton
                label="Login"
                primary={activeButton === "login"}
                onClick={() => handleNavigate("login", "/login")}
              />
              <NavButton
                label="Signup"
                primary={activeButton === "signup"}
                onClick={() => handleNavigate("signup", "/signup")}
              />
            </>
          )}

          {isLoggedIn && (
            <>
              <span className="user-greeting">
                👋 Hello <strong>User</strong>
              </span>
              <NavButton
                label="Logout"
                primary={activeButton === "logout"}
                onClick={() => {
                  console.log("[NAVBAR] Logout clicked (UI only)");
                  setActiveButton("logout");
                  setIsLoggedIn(false);
                  router.push("/");
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .navbar {
          width: 100%;
          background-color: #000;
          border-bottom: 1px solid #262626;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .brand {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .user-greeting {
          color: #a3a3a3;
          font-size: 0.9rem;
        }

        .user-greeting strong {
          color: #ffffff;
        }

        @media (max-width: 640px) {
          .navbar-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </nav>
  );
};

// -----------------------------
// Button component
// -----------------------------
interface NavButtonProps {
  label: string;
  onClick: () => void;
  primary: boolean;
}

const NavButton = ({ label, onClick, primary }: NavButtonProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`nav-btn ${primary ? "primary" : ""}`}
      >
        {label}
      </button>

      <style jsx>{`
        .nav-btn {
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          background-color: #0f0f0f;
          color: #ffffff;
          border: 1px solid #262626;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-btn:hover {
          background-color: #1a1a1a;
          border-color: #404040;
        }

        .nav-btn.primary {
          background-color: #ffffff;
          color: #000000;
          border: none;
        }

        .nav-btn.primary:hover {
          background-color: #e5e5e5;
        }
      `}</style>
    </>
  );
};

export default Navbar;
