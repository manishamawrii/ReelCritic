import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

// Ensures one review per user per movie at the DB level
reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);




// 3️⃣ user: ObjectId + ref: "User"
// → Review kis user ne diya hai, uska ID store hoga (User model se linked).

// 4️⃣ movie: ObjectId + ref: "Movie"
// → Review kis movie ke liye hai, us movie ka ID store hoga.

// 5️⃣ rating: Number (min:1, max:5)
// → User sirf 1 se 5 tak rating de sakta hai.

// 6️⃣ required: true (user, movie, rating)
// → In fields ke bina review create nahi hoga.

// 7️⃣ comment: String
// → Optional text feedback store karega.

// 8️⃣ { timestamps: true }
// → Automatically createdAt aur updatedAt fields add ho jayenge.

// 9️⃣ reviewSchema.index({ movie:1, user:1 }, { unique:true })
// → Ek user ek movie par sirf 1 hi review de sakta hai (duplicate block karega).

// 🔟 mongoose.model("Review", reviewSchema)
// → Review model create karke export kar diya, jisse database operations (create, find, delete) kar sakte hain.