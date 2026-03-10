import { useState } from 'react'
import { moviesAPI } from '../../api'
import { useToast } from '../../context/ToastContext'
import { Stars } from '../ui/Stars'
import Button from '../ui/Button'

export default function MovieRow({ movie, onEdit, onDelete }) {
  const toast = useToast()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${movie.title}"?`)) return
    setDeleting(true)
    try {
      await moviesAPI.delete(movie._id)
      toast('Movie deleted', 'success')
      onDelete?.()
    } catch (e) {
      toast(e.response?.data?.message || 'Failed to delete', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 bg-card border border-border rounded px-4 py-3 flex-wrap">
      <div className="flex items-center gap-4 min-w-0">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} className="w-10 h-14 object-cover rounded shrink-0" />
        ) : (
          <div className="w-10 h-14 bg-dark rounded flex items-center justify-center text-border shrink-0">🎬</div>
        )}
        <div className="min-w-0">
          <p className="font-serif truncate">{movie.title}</p>
          <p className="text-xs text-muted mt-0.5">
            {movie.genre && `${movie.genre} · `}
            {movie.releaseYear && `${movie.releaseYear} · `}
            {movie.numReviews} review{movie.numReviews !== 1 ? 's' : ''}
            {movie.numReviews > 0 && <span className="ml-1 text-gold">★ {movie.averageRating?.toFixed(1)}</span>}
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <Button variant="outline" size="sm" onClick={() => onEdit(movie)}>Edit</Button>
        <Button variant="danger"  size="sm" onClick={handleDelete} loading={deleting}>Delete</Button>
      </div>
    </div>
  )
}
