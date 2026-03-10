import { Link } from 'react-router-dom'
import { Stars } from '../ui/Stars'

export default function MovieCard({ movie, index = 0 }) {
  const delays = ['', 'animation-delay-100', 'animation-delay-200', 'animation-delay-300', 'animation-delay-400']
  const delay = delays[index % delays.length]

  return (
    <Link
      to={`/movies/${movie._id}`}
      className={`
        group block bg-card border border-border rounded overflow-hidden
        hover:border-gold hover:shadow-[0_12px_40px_rgba(232,184,75,0.1)]
        transition-all duration-200 hover:-translate-y-1
        animate-fade-up animation-fill-both ${delay}
        no-underline
      `}
    >
      {/* Poster */}
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover block"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gradient-to-br from-dark to-black flex items-center justify-center text-4xl text-border">
          🎬
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <h3 className="font-serif text-base leading-tight mb-2 truncate group-hover:text-gold transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          {movie.genre && (
            <span className="text-[0.6rem] uppercase tracking-widest bg-gold-dim text-gold px-2 py-0.5 rounded-sm">
              {movie.genre}
            </span>
          )}
          <div className="flex items-center gap-1 ml-auto">
            {movie.numReviews > 0 ? (
              <>
                <Stars rating={movie.averageRating} />
                <span className="text-[0.7rem] text-muted">{movie.averageRating?.toFixed(1)}</span>
              </>
            ) : (
              <span className="text-[0.68rem] text-muted">No reviews</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
