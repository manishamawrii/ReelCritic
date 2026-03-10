import Review from "../models/Review.js";
import Movie from "../models/Movie.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.movieId;

    const movie = await Movie.findById(movieId);
    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      movie: movieId,
    });
    if (alreadyReviewed)
      return res.status(400).json({ message: "You already reviewed this movie" });

    const review = await Review.create({
      user: req.user._id,
      movie: movieId,
      rating,
      comment,
    });

    // Recalculate average rating
    const reviews = await Review.find({ movie: movieId });
    movie.numReviews = reviews.length;
    movie.averageRating =
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await movie.save();

    const populatedReview = await review.populate("user", "name");
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieReviews = async (req, res) => {
  try {
    console.log("MovieId:", req.params.movieId)

    const reviews = await Review.find({ movie: req.params.movieId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    console.log("Reviews found:", reviews)

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login karta hai
// ⬇
// System usko pehchaan leta hai
// ⬇
// System bolta hai: "Achha Manisha ji login hain"
// ⬇
// Ab req.user me Manisha ji ka data store ho jata hai

// 1️⃣ Movie database me save hoti hai
// 2️⃣ MongoDB ek _id generate karta hai
// 3️⃣ Frontend us _id ko URL me bhejta hai
// 4️⃣ Backend req.params.id se us id ko pakad leta hai



// Review.find({ movie: movieId }) isliye likhte hain kyunki:

// 👉 find() ko object chahiye
// 👉 Hume batana padta hai kis field me search karna hai

// movie: movieId ka matlab:

// Jinke movie field ki value = movieId

// Direct movieId nahi likh sakte ❌
// Kyuki database ko nahi pata hoga kis field me match karna hai.
// populate() reference ID ko real document me convert karta hai.

// 2️⃣ Jab field me sirf ObjectId stored hota hai, ye related collection se data laata hai.

// 3️⃣ Example: user: "65abc" ➝ { _id: "65abc", name: "Manisha" }

// 4️⃣ Simple: ID ki jagah full data attach kar deta hai. 💛