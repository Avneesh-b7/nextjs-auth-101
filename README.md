## Why This Project Exists

This project was built to better understand how authentication (basics) works in modern
web applications and to demonstrate those concepts clearly in code

## Authentication Flow

```mermaid

flowchart TD
    %% Browser
    A[User Browser] -->|Request + Cookies| B[Next.js Middleware]

    %% Middleware routing logic
    B -->|No token & protected route| C[Redirect to /login]
    B -->|Token exists OR public route| D[Server Component]

    %% Server-side auth
    D --> E[getCurrentUser]

    %% Token checks
    E -->|Valid token & DB match| F[Authenticated User]
    E -->|Invalid / Expired / Missing| G[Unauthenticated User]

    %% UI rendering
    F --> H[Navbar shows user's name + Logout button]
    G --> I[Navbar shows Login + Signup]

    %% Profile protection
    H --> J["/profile/id"]
    J -->|id matches logged-in user| K[Show Profile Page]
    J -->|id does NOT match| L[Redirect to Own Profile]

    %% Login flow
    I --> M[Login Page OR Signup Page]
    M -->|POST email + password+ username| N["/api/users/login OR api/users/signup"]
    N -->|Validate & create token| O[Set HTTP-only Cookie]
    O --> P[Redirect to Home]

```

## what more can be done ?

- Add refresh tokens for longer-lived sessions
- Support multiple active sessions per user
- Add role-based access control for admin users
- Add rate limiting for auth-related endpoints

## A getting started section ... WIP
