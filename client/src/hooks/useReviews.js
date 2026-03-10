import { reviewsAPI } from '../api' // ✅ add this - adjust path as needed
import { useEffect, useCallback, useState } from 'react'

export function useReviews(movieId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchReviews = useCallback(async () => {
    if (!movieId) return
    setLoading(true)
    try {
      const res = await reviewsAPI.getByMovie(movieId)
      setReviews(res.data)
    } catch (e) {
      setError(e.response?.data?.message || 'failed to load reviews')
    } finally {
      setLoading(false)
    }
  }, [movieId])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  return { reviews, loading, error, refetch: fetchReviews }
}