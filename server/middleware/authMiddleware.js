import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Verifies JWT and attaches user to req
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

// ✅ Role-based access control
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(" or ")}`,
      });
    }
    next();
  };
};


// What exactly jwt.verify() returns?
// Function structure:
// jwt.verify(token, secret)
// decoded = token ke payload ka object
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Return karta hai:
// {
//   id: "userId",
//   iat: 1719239393,
//   exp: 1719242993
// }



// User.findById(decoded.id)
// {
//   _id: "65f123",
//   name: "Manisha",
//   email: "abc@gmail.com",
//   password: "$2b$10$kdjfhskjdf"
// }
// .select("-password")

// Iska matlab:

// Password field remove karo.
// {
//   _id: "65f123",
//   name: "Manisha",
//   email: "abc@gmail.com"
// }

// Token = Encoded Header + Encoded Payload + Signature
// Client isko har request me bhejta hai.
// 👉 Signature ek cryptographic hash output hoti hai.
// Header + Payload ko
// 👉 Secret key se hash karne ka result




// Token ko todta hai
// Header + Payload leta hai
// Secret se dubara signature generate karta hai
// Compare karta hai

// ✅ JWT Working in 8 Points

// 1️⃣ jwt.sign(payload, secret) call hota hai jab user login karta hai.

// 2️⃣ Library automatically Header banata hai:
// { alg: "HS256", typ: "JWT" }

// 3️⃣ Aapka diya hua data Payload me add hota hai
// (jaise { id: user._id }) + iat time automatically add hota hai.

// 4️⃣ Header aur Payload dono ko Base64Url encode kiya jata hai.

// 5️⃣ EncodedHeader + "." + EncodedPayload ko secret key se HMACSHA256 karke Signature banayi jati hai.

// 6️⃣ Final Token banta hai:

// header.payload.signature

// 7️⃣ jwt.verify(token, secret) me token ko "." se split kiya jata hai → header, payload, signature.

// 8️⃣ Header+Payload ko fir se secret se hash karke signature compare ki jati hai.
// ✔ Match → Valid
// ❌ Not match → Invalid



// req.user = await User.findById(decoded.id).select("-password");
// req.user = {
//   _id: "abc123",
//   name: "Manisha",
//   email: "...",
//   role: "admin"
// }
// 🎯 What Happens If We DON’T Extract req.user?

// Then inside controller:

// ❌ You won’t know user ID
// ❌ You can’t check role
// ❌ You can’t prevent duplicate reviews
// ❌ You can’t restrict admin routes


// ig Concept: Authentication vs Authorization

// Authentication = Who are you?
// Authorization = What are you allowed to do?

// req.user solves BOTH.