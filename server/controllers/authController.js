import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ── REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // ✅ No manual hashing — User model pre-save hook handles it
    const user = await User.create({ name, email, password });

    res.status(201).json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET ME (returns logged-in user's data)
// protect middleware already attaches req.user
export const getMe = (req, res) => {
  res.json(req.user);
};



























    
// 🔥 Ek Line Me Final Answer

// findOne({ email }) email se search karta hai,
// lekin return poora user document karta hai.


    // We generate token in both register and login because in both cases the user is successfully authenticated and needs a token to access protected routes.
// Method	Kaam	Filter	Return
// findOne()	Condition se search	Any field	Full document
// findById()	ID se search	Only _id	Full document
// select()	Fields control	N/A	Specific fields