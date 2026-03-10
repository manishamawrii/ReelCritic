import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title:         { type: String, required: true },
    description:   String,
    genre:         String,
    releaseYear:   Number,
    poster:        String,
    trailer:       String, // ✅ NEW — YouTube URL
    averageRating: { type: Number, default: 0 },
    numReviews:    { type: Number, default: 0 },
  },
  { timestamps: true }
)
export default mongoose.model("Movie", movieSchema);





// Schema ek structure / blueprint hota hai jo batata hai ki MongoDB collection mein data ka format kaisa hoga.

// Jaise:
// Model kya hota hai?

// Model ek class hoti hai jo:

// Database se interact karti hai

// Data create, read, update, delete karti hai