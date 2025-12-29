/*
PROMPT

now i want to implement this middleware (boiler plate code attatched)

#TASK 
1. i want to run this middleware on the paths = "/", "/login","/signup","/profile/*"
2. the idea is -->
    1. if the user is logged in 
        - then redirect requestes for login and signup to "/" page
        - redirect all "/profile/*" requests to the "/profile/*" page (this is a protected route)
    2. if the user is logged out
        - redirect profile requests to "/login"
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
