import Movie from "../models/Movie.js";

export const getMovies = async (req, res) => {
  try {
    const page  = Number(req.query.page)  || 1;
    const limit = Number(req.query.limit) || 5; // ✅ fixed
    const skip  = (page - 1) * limit;

    const search = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};

    const movies = await Movie.find(search).skip(skip).limit(limit);
    const total  = await Movie.countDocuments(search);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    movie.title       = req.body.title       ?? movie.title;
    movie.description = req.body.description ?? movie.description;
    movie.genre       = req.body.genre       ?? movie.genre;
    movie.releaseYear = req.body.releaseYear ?? movie.releaseYear;
    movie.poster      = req.body.poster      ?? movie.poster;
    movie.trailer     = req.body.trailer     ?? movie.trailer; // ✅ add this

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    await movie.deleteOne();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*

$regex: req.query.search

$regex ka matlab:

Pattern match karo.

"i" means its not case sesitive
getMovies kya karta hai?

Ye function movies list fetch karta hai pagination + search ke saath.

Kaise?

1️⃣ page → URL se current page number leta hai
2️⃣ limit = 5 → Har page par 5 movies
3️⃣ skip → Previous page ki movies ignore karta hai
4️⃣ search → Agar search keyword hai to title ke basis par filter lagata hai
5️⃣ Movie.find(search).skip(skip).limit(limit)
→ Filtered movies me se sirf current page wali movies laata hai
6️⃣ countDocuments(search)
→ Total kitni filtered movies hain wo count karta hai
7️⃣ Response me bhejta hai:

total movies

current page

total pages

current page ki movies

👉 Simple words me:
Search + Pagination ke saath movies return karta hai.

🔹 createMovie kya karta hai?

1️⃣ Client se data leta hai (req.body)
2️⃣ Movie.create() se database me save karta hai
3️⃣ 201 status ke saath saved movie wapas bhej deta hai

👉 Simple words me:
? → query start

search=batman

& → next query parameter

page=34
*/
