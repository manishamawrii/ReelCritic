import express from "express";
import {
  createReview,
  getMovieReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Movie ke reviews — /api/reviews/movie/:movieId
router.get("/movie/:movieId",  getMovieReviews);
router.post("/movie/:movieId", protect, createReview);

// Single review edit/delete — /api/reviews/:reviewId
router.put("/:reviewId",    protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);

export default router;