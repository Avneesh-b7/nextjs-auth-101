This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Authentication Flow (End-to-End)

```mermaid
flowchart TD
    %% Browser
    A[User Browser] -->|Request + Cookies| B[Next.js Middleware]

    %% Middleware routing logic
    B -->|No token & protected route| C[Redirect to /login]
    B -->|Token exists OR public route| D[Server Component]

    %% Server-side auth
    D --> E[getCurrentUser()]

    %% Token checks
    E -->|Valid token & DB match| F[Authenticated User]
    E -->|Invalid / Expired / Missing| G[Unauthenticated User]

    %% UI rendering
    F --> H[Navbar shows Hello + Logout]
    G --> I[Navbar shows Login + Signup]

    %% Profile protection
    H --> J[/profile/[id]]
    J -->|id matches logged-in user| K[Show Profile Page]
    J -->|id does NOT match| L[Redirect to Own Profile]

    %% Login flow
    I --> M[Login Page]
    M -->|POST email & password| N[/api/users/login]
    N -->|Validate & create token| O[Set HTTP-only Cookie]
    O --> P[Redirect to Home]
```
