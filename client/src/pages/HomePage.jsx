import { useState, useEffect } from 'react'
import { useMovies } from '../hooks/useMovies'
import MovieGrid from '../components/movies/MovieGrid'
import Pagination from '../components/movies/Pagination'
import { PageSpinner } from '../components/ui/Spinner'
import { FiSearch } from "react-icons/fi"
export default function HomePage() {
  const [search, setSearch] = useState('')
  const [page,   setPage]   = useState(1)
  const [query,  setQuery]  = useState('')

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setQuery(search); setPage(1) }, 350)
    return () => clearTimeout(t)
  }, [search])

  const { movies, total, pages, loading } = useMovies({ page, search: query })

  return (
    <div>
      {/* Hero */}
      <div className="text-center px-6 pt-20 pb-14">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold mb-4">Your Cinema Universe</p>
        <h1 className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.92] tracking-wide text-white mb-6">
          EVERY FILM<br />
          <em className="font-serif italic text-gold not-italic">Deserves</em> A VOICE
        </h1>
        <p className="text-muted text-sm max-w-xs mx-auto leading-relaxed mb-8">
          Discover movies, read honest reviews, and share your take with the world.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <input
            className="w-full bg-card border border-border rounded px-5 py-3 pr-12 text-sm text-white placeholder:text-muted outline-none focus:border-gold transition-colors"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[0.62rem] uppercase tracking-[0.25em] text-muted whitespace-nowrap">
            {total > 0 ? `${total} films` : 'All Films'}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <MovieGrid movies={movies}  loading={loading} />
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>
    </div>
  )
}
