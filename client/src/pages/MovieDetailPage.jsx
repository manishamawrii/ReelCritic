import { useParams, useNavigate } from 'react-router-dom'
import { useMovie } from '../hooks/useMovies'
import { useReviews } from '../hooks/useReviews'
import { Stars } from '../components/ui/Stars'
import ReviewForm from '../components/reviews/ReviewForm'
import ReviewCard from '../components/reviews/ReviewCard'
import { PageSpinner, EmptyState, TrailerSkeleton } from '../components/ui/Spinner'
import { useState } from 'react'
// YouTube URL se embed URL banata hai
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export default function MovieDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()


  const [trailerLoading, setTrailerLoading] = useState(true)

  const { movie, loading: mLoading }        = useMovie(id)
  const { reviews, loading: rLoading, refetch } = useReviews(id)

  if (mLoading) return <PageSpinner />

  if (!movie) return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-center text-muted">
      Movie not found.
    </div>
  )

  const embedUrl = getYouTubeEmbedUrl(movie.trailer)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-gold transition-colors mb-10 bg-transparent border-none cursor-pointer"
      >
        ← Back to Films
      </button>

      {/* Movie Hero */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 mb-14">

        {/* Poster */}
        <div className="md:sticky md:top-20 self-start">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded border border-border aspect-[2/3] object-cover"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-gradient-to-br from-dark to-black border border-border rounded flex items-center justify-center text-6xl text-border">
              🎬
            </div>
          )}
        </div>

        {/* Info */}
        <div className="animate-fade-up animation-fill-both">

          {/* Genre + Year */}
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold mb-3">
            {movie.genre || 'Film'}{movie.releaseYear ? ` · ${movie.releaseYear}` : ''}
          </p>

          {/* Title */}
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.92] tracking-wide mb-5">
            {movie.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <Stars rating={movie.averageRating || 0} size="lg" />
            {movie.numReviews > 0 ? (
              <>
                <span className="font-display text-2xl text-gold">
                  {movie.averageRating?.toFixed(1)}
                </span>
                <span className="text-xs text-muted">
                  {movie.numReviews} review{movie.numReviews !== 1 ? 's' : ''}
                </span>
              </>
            ) : (
              <span className="text-xs text-muted">No reviews yet</span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genre && (
              <span className="text-[0.65rem] uppercase tracking-widest border border-border rounded-sm px-3 py-1 text-muted">
                {movie.genre}
              </span>
            )}
            {movie.releaseYear && (
              <span className="text-[0.65rem] uppercase tracking-widest border border-border rounded-sm px-3 py-1 text-muted">
                {movie.releaseYear}
              </span>
            )}
          </div>

          {/* Description */}
          {movie.description && (
            <p className="text-sm leading-relaxed text-white/60 max-w-xl mb-6">
              {movie.description}
            </p>
          )}

          {/* ✅ Trailer — description ke neeche */}
          {embedUrl && (
            <div className="mt-2">
              <p className="text-[0.65rem] uppercase tracking-widest text-gold mb-3">
                Trailer
              </p>
            <div className="relative w-full aspect-video rounded border border-border overflow-hidden">

  {/* jab tak trailer load ho */}
  {trailerLoading && (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <TrailerSkeleton />
    </div>
  )}

  <iframe
    src={embedUrl}
    title={`${movie.title} Trailer`}
    className="w-full h-full"
    onLoad={() => setTrailerLoading(false)}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />

</div>
            </div>
          )}

        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[0.62rem] uppercase tracking-[0.25em] text-muted whitespace-nowrap">
            Reviews {reviews.length > 0 && `(${reviews.length})`}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <ReviewForm movieId={id} onSuccess={refetch} />

        {rLoading ? (
          <PageSpinner />
        ) : reviews.length === 0 ? (
          <EmptyState icon="💬" text="No reviews yet. Be the first!" />
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((r, i) => (
              <ReviewCard key={r._id} review={r} index={i} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

/*
MongoDB
  ↓
movie._id
  ↓
Movie List Page
  ↓
<Link to={`/movies/${movie._id}`}>
  ↓
URL change → /movies/65f21a9c1c3a2d8f
  ↓
useParams() → id
  ↓
useMovie(id) → Movie Detail Page
*/
