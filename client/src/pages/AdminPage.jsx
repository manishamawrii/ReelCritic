import { useState } from 'react'
import { useMovies } from '../hooks/useMovies'
import MovieForm from '../components/admin/MovieForm'
import MovieRow from '../components/admin/MovieRow'
import { PageSpinner, EmptyState } from '../components/ui/Spinner'
import Button from '../components/ui/Button'

export default function AdminPage() {
  const [showForm, setShowForm]     = useState(false)
  const [editMovie, setEditMovie]   = useState(null)
  const { movies, loading, refetch } = useMovies({ limit: 100 })

  const handleEdit = (movie) => { setEditMovie(movie); setShowForm(true) }
  const handleNew  = ()      => { setEditMovie(null);  setShowForm(true) }
  const handleDone = ()      => { setShowForm(false); setEditMovie(null); refetch() }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-widest text-gold mb-1">Dashboard</p>
          <h1 className="font-display text-4xl tracking-wide">ADMIN PANEL</h1>
        </div>
        <Button onClick={handleNew}>+ Add Movie</Button>
      </div>

      {/* Stats bar */}
      <div className="bg-gold-dim border border-gold/20 rounded px-5 py-3 mb-8 flex items-center gap-6 flex-wrap">
        <div>
          <p className="text-[0.6rem] uppercase tracking-widest text-muted">Total Films</p>
          <p className="font-display text-2xl text-gold">{movies.length}</p>
        </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-widest text-muted">Total Reviews</p>
          <p className="font-display text-2xl text-gold">
            {movies.reduce((acc, m) => acc + (m.numReviews || 0), 0)}
          </p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <MovieForm
          movie={editMovie}
          onSuccess={handleDone}
          onCancel={() => { setShowForm(false); setEditMovie(null) }}
        />
      )}

      {/* List */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[0.62rem] uppercase tracking-widest text-muted">All Movies</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {loading ? (
        <PageSpinner />
      ) : movies.length === 0 ? (
        <EmptyState text="No movies yet. Add one!" />
      ) : (
        <div className="flex flex-col gap-2">
          {movies.map(m => (
            <MovieRow key={m._id} movie={m} onEdit={handleEdit} onDelete={refetch} />
          ))}
        </div>
      )}
    </div>
  )
}
