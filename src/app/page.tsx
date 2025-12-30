/*
#PROMPT

##Task
1. i want you to redesign the home page i.e. the "/" page for me 
2. give me everything that we have done in this simple auth app such that it can be a portfolio project of mine on basic auth 
3. feel free to use diagrams and be creative in showing what we have done 
4. It is IMPORTANT to show the data flow here 
5. imagine this is something a recruiter may look at
6. add anything that you feel relevant as well (but make sure to ask me first - i will validate it) 


this is the code right now -->
*/

/**
 * USAGE GUIDELINES:
 * - Public landing page for the authentication system.
 * - Server-rendered and auth-aware.
 * - Designed to act as a visual README for recruiters.
 */

import { getCurrentUser } from "@/src/helpers/getCurrentUser";
import Link from "next/link";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "4rem 1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "960px", width: "100%" }}>
        {/* -------------------------------------------------
            HERO
        ------------------------------------------------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h1 style={heroTitle}>Basic Authentication System</h1>

          <p style={heroSubtitle}>
            A simple and secure authentication system built with Next.js. This
            project shows how users can sign up, log in, stay authenticated, and
            access protected pages
          </p>

          {user ? (
            <p style={{ marginTop: "1.5rem", color: "#22c55e" }}>
              Logged in as <strong>{user.name}</strong>
            </p>
          ) : (
            <p style={{ marginTop: "1.5rem", color: "#f97316" }}>
              You are currently browsing as a <strong>guest</strong>
            </p>
          )}
        </section>

        {/* -------------------------------------------------
            WHAT THIS PROJECT SHOWS
        ------------------------------------------------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={sectionTitle}>What This Project Demonstrates</h2>

          <ul style={listStyle}>
            <li>Secure login and signup using email and password</li>
            <li>Authentication using JWT stored in HTTP-only cookies</li>
            <li>Route protection using Next.js Middleware</li>
            <li>Server-side user verification</li>
            <li>
              Protected profile pages (users cannot see each other’s data)
            </li>
            <li>
              Clean separation between UI, routing, and authentication logic
            </li>
          </ul>
        </section>

        {/* -------------------------------------------------
            GET CURRENT USER EXPLANATION
        ------------------------------------------------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={sectionTitle}>How Authentication Works Here</h2>

          <p style={paragraphStyle}>
            At the core of this app is a helper function called{" "}
            <code style={inlineCode}>getCurrentUser()</code>.
          </p>

          <p style={paragraphStyle}>
            This function identifies the currently logged-in user on the server.
            It reads the authentication token from an HTTP-only cookie(that
            comes in the request), verifies it, and returns basic user
            information - ofc only if the token is valid
          </p>

          <ul style={listStyle}>
            <li>getCurrentUser working - </li>
            <li>Reads the auth token from a http only cookie</li>
            <li>
              Verifies that the token is valid and not expired (using bcrypt)
            </li>
            <li>Checks the token against the database</li>
            <li>Returns safe user data (id, name, email, role)</li>
            <li>
              Returns <code style={inlineCode}>null</code> if not authenticated
            </li>
          </ul>
        </section>

        {/* -------------------------------------------------
            AUTH FLOW DIAGRAM
        ------------------------------------------------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={sectionTitle}>Complete Authentication Flow</h2>

          <pre style={diagramStyle}>
            {`
LOGIN FLOW
----------
User enters email & password
        ↓
Login API validates credentials
        ↓
Server creates a secure token (JWT)
        ↓
Token is stored in an HTTP-only cookie on browser and in the db as well
        ↓
User is redirected to home page
        ↓
Server checks who the user is (using getCurrentUser)
        ↓
Navbar updates to logged-in state


GLOBAL REQUEST FLOW
-------------------
Browser sends request
        ↓
Middleware checks if token exists
        ↓
If route is allowed → continue
If not allowed → redirect
        ↓
Server verifies token & user
        ↓
Page renders based on auth state (user logged in or logged out)


PROFILE PAGE FLOW
-----------------
User goes to /profile/[id] OR user cliks on the "go to profile" button
        ↓
Only logged-in users are allowed (if not logged in then user is redirected to /login)
        ↓
Server verifies token and user
        ↓
Server checks URL id matches user id
        ↓
Profile page is shown
`}
          </pre>
        </section>

        {/* -------------------------------------------------
            ROUTE ACCESS RULES
        ------------------------------------------------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={sectionTitle}>Route Access Rules</h2>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Route</th>
                <th>Logged Out</th>
                <th>Logged In</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>/</td>
                <td>✅ Allowed</td>
                <td>✅ Allowed</td>
              </tr>
              <tr>
                <td>/login</td>
                <td>✅ Allowed</td>
                <td>❌ Redirect → /</td>
              </tr>
              <tr>
                <td>/signup</td>
                <td>✅ Allowed</td>
                <td>❌ Redirect → /</td>
              </tr>
              <tr>
                <td>/profile/[id]</td>
                <td>❌ Redirect → /login</td>
                <td>✅ Allowed</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* -------------------------------------------------
            CTA
        ------------------------------------------------- */}
        <section>
          <h2 style={sectionTitle}>Explore the App</h2>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {!user && (
              <>
                <Link href="/login" style={buttonPrimary}>
                  Log In
                </Link>
                <Link href="/signup" style={buttonSecondary}>
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <Link href={`/profile/${user.id}`} style={buttonPrimary}>
                View Profile
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------
   STYLES
------------------------------------------------- */

const heroTitle = {
  fontSize: "2.5rem",
  fontWeight: 700,
  marginBottom: "1rem",
};

const heroSubtitle = {
  color: "#a3a3a3",
  fontSize: "1.1rem",
  lineHeight: 1.7,
};

const sectionTitle = {
  fontSize: "1.5rem",
  fontWeight: 600,
  marginBottom: "1rem",
};

const paragraphStyle = {
  color: "#d4d4d4",
  lineHeight: 1.7,
  marginBottom: "1rem",
};

const listStyle = {
  color: "#d4d4d4",
  paddingLeft: "1.2rem",
  lineHeight: 1.8,
};

const inlineCode = {
  backgroundColor: "#1a1a1a",
  padding: "2px 6px",
  borderRadius: "4px",
  fontSize: "0.9rem",
};

const diagramStyle = {
  backgroundColor: "#0f0f0f",
  padding: "1.5rem",
  borderRadius: "8px",
  border: "1px solid #262626",
  color: "#a3a3a3",
  fontSize: "0.9rem",
  whiteSpace: "pre-wrap" as const,
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  border: "1px solid #262626",
};

const buttonPrimary = {
  padding: "10px 16px",
  backgroundColor: "#ffffff",
  color: "#000000",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: 600,
};

const buttonSecondary = {
  padding: "10px 16px",
  border: "1px solid #262626",
  borderRadius: "6px",
  textDecoration: "none",
  color: "#ffffff",
};
