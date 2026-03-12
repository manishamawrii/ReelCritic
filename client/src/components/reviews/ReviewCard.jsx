import { useState } from 'react'
import { Stars, StarPicker } from '../ui/Stars'
import { Textarea } from '../ui/Input'
import Button from '../ui/Button'
import { formatDate } from '../../utils/helpers'
import { reviewsAPI } from '../../api/allapi'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { FiEdit2, FiTrash2 } from "react-icons/fi";
export default function ReviewCard({ review, index = 0, onSuccess }) {
  const { user }  = useAuth()
  const toast     = useToast()

  const [isEditing, setIsEditing]   = useState(false)
  const [deleting, setDeleting]     = useState(false)
  const [saving, setSaving]         = useState(false)
  const [editRating, setEditRating] = useState(review.rating)
  const [editComment, setEditComment] = useState(review.comment)

  // ✅ Check if logged-in user is the owner of this review
  const isOwner = user?._id === review.user?._id

  const delays = ['', 'animation-delay-100', 'animation-delay-200']
  const initial = review.user?.name?.charAt(0).toUpperCase() || 'A'

  // ── SAVE EDIT
  const handleSave = async () => {
    if (!editComment.trim()) return toast('Comment cannot be empty', 'error')
    setSaving(true)
    try {
      await reviewsAPI.update(review._id, {
        rating:  editRating,
        comment: editComment,
      })
      toast('Review updated!', 'success')
      setIsEditing(false)
      onSuccess?.() // refetch reviews + movie rating
    } catch (e) {
      toast(e.response?.data?.message || 'Failed to update', 'error')
    } finally {
      setSaving(false)
    }
  }

  // ── DELETE
  const handleDelete = async () => {
    if (!window.confirm('Delete your review?')) return
    setDeleting(true)
    try {
      await reviewsAPI.delete(review._id)
      toast('Review deleted', 'success')
      onSuccess?.() // refetch reviews + movie rating
    } catch (e) {
      toast(e.response?.data?.message || 'Failed to delete', 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className={`bg-card border border-border rounded p-5 animate-fade-up animation-fill-both ${delays[index % 3]}`}>

      {/* Header — Avatar, Name, Stars, Actions */}
      <div className="flex items-start justify-between mb-2 gap-3">

        {/* Left — Avatar + Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold shrink-0">
            {initial}
          </div>
          <span className="font-medium text-sm">{review.user?.name || 'Anonymous'}</span>
        </div>

        {/* Right — Stars + Owner Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {!isEditing && <Stars rating={review.rating} size="md" />}

     
          {isOwner && !isEditing && (
            <div className="flex gap-2">
  <button
    onClick={() => setIsEditing(true)}
    className="p-1.5 rounded border border-border text-muted hover:text-gold hover:border-gold transition-colors cursor-pointer bg-transparent"
  >
    <FiEdit2 size={14} />
  </button>

  <button
    onClick={handleDelete}
    disabled={deleting}
    className="p-1.5 rounded border border-border text-muted hover:text-red hover:border-red transition-colors cursor-pointer bg-transparent disabled:opacity-50"
  >
    <FiTrash2 size={14} />
  </button>
</div>
          )}
        </div>
      </div>

      {/* Date */}
      <p className="text-[0.7rem] text-muted mb-3 ml-10">
        {formatDate(review.createdAt)}
      </p>

      {/* ── EDIT MODE */}
      {isEditing ? (
        <div className="flex flex-col gap-3 mt-2">
          <StarPicker value={editRating} onChange={setEditRating} />
          <Textarea
            value={editComment}
            onChange={e => setEditComment(e.target.value)}
            placeholder="Update your review..."
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} loading={saving}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setEditRating(review.rating)    // reset to original
                setEditComment(review.comment)  // reset to original
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        /* ── VIEW MODE */
        <p className="text-sm text-white/70 leading-relaxed ml-10">
          {review.comment}
        </p>
      )}

    </div>
  )
}
