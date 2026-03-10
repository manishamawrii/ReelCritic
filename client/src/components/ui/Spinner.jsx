export function Spinner({ className = '' }) {
  return (
    <span className={`inline-block w-5 h-5 border-2 border-border border-t-gold rounded-full animate-spin-slow ${className}`} />
  )
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[30vh]">
      <Spinner className="w-8 h-8" />
    </div>
  )
}

export function EmptyState({ icon = '🎬', text = 'Nothing here yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted gap-3">
      <span className="text-5xl opacity-30">{icon}</span>
      <p className="text-sm">{text}</p>
    </div>
  )
}

// ✅ NEW — Movie card skeleton
export function MovieCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded overflow-hidden animate-pulse">
      <div className="w-full aspect-[2/3] bg-dark" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-4 bg-dark rounded w-3/4" />
        <div className="h-3 bg-dark rounded w-1/2" />
      </div>
    </div>
  )
}

// ✅ NEW — Full grid skeleton
export function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function TrailerSkeleton() {
  return (
    <div className="w-full aspect-video bg-dark animate-pulse rounded border border-border flex items-center justify-center">
      <span className="text-muted text-lg tracking-widest">
        Loading Trailer...
      </span>
    </div>
  )
}