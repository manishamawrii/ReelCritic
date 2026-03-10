import MovieCard from './MovieCard'
import { EmptyState, MovieGridSkeleton } from '../ui/Spinner'

export default function MovieGrid({ movies, loading }) {
  // ✅ Loading state mein skeleton dikhao
  if (loading) return <MovieGridSkeleton />

  if (!movies?.length) {
    return <EmptyState icon="🎭" text="No movies found." />
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie, i) => (
        <MovieCard key={movie._id} movie={movie} index={i} />
      ))}
    </div>
  )
}