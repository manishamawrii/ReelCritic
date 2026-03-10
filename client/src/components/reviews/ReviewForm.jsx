import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { reviewsAPI } from '../../api/allapi'
import { StarPicker } from '../ui/Stars'
import { Textarea } from '../ui/Input'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

export default function ReviewForm({ movieId, onSuccess }) {
  const { user } = useAuth()
  const toast    = useToast()
  const [rating, setRating]   = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <div className="border border-dashed border-gold/30 rounded p-6 text-center bg-gold-dim mb-6">
        <p className="text-sm text-muted mb-4">Sign in to share your review of this film.</p>
        <Link to="/login">
          <Button size="sm">Sign In to Review</Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (!comment.trim()) return toast('Please write a comment.', 'error')
    setLoading(true)
    try {
      await reviewsAPI.create(movieId, { rating, comment })
      toast('Review posted!', 'success')
      setComment('')
      setRating(5)
      onSuccess?.()
    } catch (e) {
      toast(e.response?.data?.message || 'Failed to post review', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded p-5 mb-6">
      <h3 className="font-serif text-lg mb-4">Write a Review</h3>
      <div className="mb-4">
        <p className="text-[0.68rem] uppercase tracking-widest text-muted mb-2">Your Rating</p>
        <StarPicker value={rating} onChange={setRating} />
      </div>
      <div className="mb-4">
        <Textarea
          label="Your Review"
          placeholder="What did you think of this film..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit} loading={loading}>
        Post Review
      </Button>
    </div>
  )
}
