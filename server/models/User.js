import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// ✅ Single place for hashing — only runs on password change
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);

// Schema.prototype.pre = function(eventName, callback) {
   // middleware register karta hai
// }
// this.isModified("password")Ye Mongoose ka built-in method hai.
// Ye true ya false return karta hai.
// 👉 bcrypt.hash() ek function hai jo password ko hash (encrypt jaisa secure format) mein convert karta hai.
// bcrypt.compare(enteredPassword, storedHashedPassword)