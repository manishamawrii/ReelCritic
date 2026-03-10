
export const loginUser=(data)=>{
    API.post("/auth/login", data);

}



export const RegisterUser = (data)=>{
    API.post("/auth/register",data)
}











// 🟢 1️⃣ First Time User (Register Flow)

// User fills register form.

// Frontend sends POST /register.

// Backend checks if user already exists.

// If not → password hashed.

// User saved in database.

// Backend generates JWT using jwt.sign().

// Backend sends { token } in response.

// Frontend receives token.

// Frontend stores token in localStorage.

// Interceptor now attaches token to every request.

// User is logged in.

// 🟢 2️⃣ Returning User (Login Flow)

// User already exists in DB.

// Token may be expired / deleted / new device.

// User enters email + password.

// Frontend sends POST /login.

// Backend finds user.

// Backend compares password using bcrypt.compare.

// If correct → backend generates new JWT.

// Backend sends { token }.

// Frontend stores token in localStorage.

// Interceptor attaches token.

// User logged in again.


// 🟢 3️⃣ Protected Route Access

// Frontend calls protected API (e.g. /profile).

// Interceptor runs before request.

// Reads token from localStorage.

// Adds Authorization: Bearer <token>.

// Backend middleware runs.

// Backend verifies token using jwt.verify().

// If valid → request allowed.

// If invalid/expired → 401.


// .

// 🟢 4️⃣ Logout Flow

// Frontend removes token from localStorage.

// Interceptor finds no token.

// Protected routes fail (401).

// User is logged out.

// Server does nothing during logout.
// ✅ No need to click login.
// Before login:

// Interceptor runs

// But no token to attach

// So protected routes fail

// After login:

// Token exists

// Interceptor attaches it

// Backend middleware verifies it

// Protected routes succeed


// Middleware (interceptor + backend auth middleware) works properly only after token is received and stored.




// Component (Login Form)
//         ↓
// loginUser()  (service layer)
//         ↓
// API.post()  (axios instance)
//         ↓
// Request Interceptor (attach token if exists)
//         ↓
// Backend (/auth/login)
//         ↓
// Response (token)
//         ↓
// Component stores token
//         ↓
// Future requests auto-attach token