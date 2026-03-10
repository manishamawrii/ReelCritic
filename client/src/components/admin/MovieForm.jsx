import { useState } from 'react'
import { useToast } from '../../context/ToastContext'
import { moviesAPI } from '../../api/index'
import { Input, Textarea } from '../ui/Input'
import Button from '../ui/Button'

export default function MovieForm({ movie, onSuccess, onCancel }) {
  const toast = useToast()
  const isEdit = !!movie

 // form state mein add karo
const [form, setForm] = useState({
  title:       movie?.title       || '',
  description: movie?.description || '',
  genre:       movie?.genre       || '',
  releaseYear: movie?.releaseYear || '',
  poster:      movie?.poster      || '',
  trailer:     movie?.trailer     || '', // ✅ NEW
})

// Form grid mein add karo

  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.title.trim()) return toast('Title is required', 'error')
    setLoading(true)
    try {
      const payload = { ...form, releaseYear: form.releaseYear ? Number(form.releaseYear) : undefined }
      if (isEdit) {
        await moviesAPI.update(movie._id, payload)
        toast('Movie updated!', 'success')
      } else {
        await moviesAPI.create(payload)
        toast('Movie added!', 'success')
      }
      onSuccess?.()
    } catch (e) {
      toast(e.response?.data?.message || 'Failed to save movie', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded p-6 mb-6 animate-fade-up animation-fill-both">
      <h2 className="font-serif text-xl mb-5 pb-4 border-b border-border">
        {isEdit ? `Edit — ${movie.title}` : 'Add New Movie'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input label="Title *"      placeholder="Movie title"       value={form.title}       onChange={set('title')} />
        <Input label="Genre"        placeholder="Drama, Thriller…"  value={form.genre}       onChange={set('genre')} />
        <Input label="Release Year" placeholder="2024" type="number" value={form.releaseYear} onChange={set('releaseYear')} />
        <Input label="Poster URL"   placeholder="https://…"         value={form.poster}      onChange={set('poster')} />
        <Input
  label="YouTube Trailer URL"
  placeholder="https://youtube.com/watch?v=..."
  value={form.trailer}
  onChange={set('trailer')}
/>
      </div>

      <div className="mb-5">
        <Textarea label="Description" placeholder="Brief synopsis…" value={form.description} onChange={set('description')} />
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSubmit} loading={loading}>
          {isEdit ? 'Save Changes' : 'Add Movie'}
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}
