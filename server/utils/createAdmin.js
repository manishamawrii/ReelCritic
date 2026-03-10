import User from "../models/User.js";

// ✅ FIX: Don't manually hash — User model pre-save hook handles it
export const createAdminIfNotExists = async () => {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (adminExists) {
      console.log("✅ Admin already exists");
      return;
    }

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // hashed by pre-save hook
      role: "admin",
    });

    console.log("🔥 Admin created automatically");
  } catch (error) {
    console.log("Admin creation error:", error.message);
  }
};
