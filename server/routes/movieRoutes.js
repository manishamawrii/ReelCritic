import express from "express";
import {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
// ✅ FIX: authorize now lives in authMiddleware, not a separate roleMiddleware file
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", protect, authorize("admin"), createMovie);
router.get("/:id", getMovieById);
router.put("/:id", protect, authorize("admin"), updateMovie);
router.delete("/:id", protect, authorize("admin"), deleteMovie);

export default router;
