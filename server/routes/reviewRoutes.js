import express from "express";
import { createReview, getMovieReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:movieId", getMovieReviews);        // Public
router.post("/:movieId", protect, createReview); // Login required

export default router;
