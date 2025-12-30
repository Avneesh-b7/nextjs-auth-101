/*
how does the flow work actually 

CASE 1 - TOKEN EXISTS IN THE http cookie 
1. user sends request (with http cookie) 
2. req goes to middle ware - middle ware performs basics checks ONLY like - if token exists 
3. if token exists then routes like ("/", profile/* are allowed)
4. now before it hits the "/" or profile/* route we need to check if the token is valid 
    and perform other validations/checks/verification, this is done by the function called get current user
5. if token is invalid we send the req back with an approprite error and logout the 
    user (remove token from db and http cookie) and redirect him to the login again page
6. if token is valid we get the details from the token (getCurrentUser function)
    and then we actually pass those as a part of req to the go to the profile/* route function/controller

CASE 2 - TOKEN DOES NOT EXISTS
1. req comes without the token and we direct it to the middleware
2. middleware directly sends the user to the login page saying pls login again
-- this may have some problems -- re check while revising ----
*/

/*
PROMPT

now i want to implement this middleware (boiler plate code attatched)

#TASK 
1. i want to run this middleware on all the paths = "/", "/login","/signup","/profile/*"
2. the idea is -->
    1. if the token exists allow on all routes 
    2. if token does not exist only allow on login + signup + "/"  routes -- not the profile/* route(the profile route is protected)
        ; that means any request to profile should be redirected to "/login" route when token is absent
3. to check if the uer is logged in or logged out we need to look for the authToken in httponly cookie

# GENERAL REQUIREMENTS
- Include **usage guidelines** (2–3 lines) at the top.
- Provide an **example input** and **example output** using dummy JSON.
- Include **all necessary validations**.
- Handle **all errors gracefully** using a consistent schema.
- Return proper **HTTP status codes**.
- Add structured **logging** for easier debugging.
- Ensure clean, maintainable, scalable, **production-quality code**.
- ensure appriproate imports


here is the boiler plate code -->
*/

/**
 * USAGE GUIDELINES:
 * - Global auth gatekeeper.
 * - Redirects users based on auth token presence.
 * - Prevents logged-in users from accessing auth pages.
 */

import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/signup"];
const PROTECTED_ROUTE_PREFIX = "/profile";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("[MIDDLEWARE] Incoming:", pathname);

  const authToken = request.cookies.get("authToken")?.value;
  const tokenExists = Boolean(authToken);

  // -----------------------------
  // Case 1: Logged-IN user
  // -----------------------------
  if (tokenExists) {
    // Block access to login/signup
    if (AUTH_PAGES.includes(pathname)) {
      console.log(
        "[MIDDLEWARE] Logged-in user accessing auth page. Redirecting to /"
      );
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow everything else
    return NextResponse.next();
  }

  // -----------------------------
  // Case 2: Logged-OUT user
  // -----------------------------
  if (!tokenExists) {
    // Block protected routes
    if (pathname.startsWith(PROTECTED_ROUTE_PREFIX)) {
      console.log(
        "[MIDDLEWARE] Unauthenticated access to protected route. Redirecting to /login"
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow public routes
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile/:path*"],
};
