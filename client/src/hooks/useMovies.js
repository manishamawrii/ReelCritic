import { useState, useEffect, useCallback } from 'react'
import { moviesAPI } from '../api'

export function useMovies(params = {}) {
  const [movies, setMovies]   = useState([])
  const [total, setTotal]     = useState(0)
  const [pages, setPages]     = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await moviesAPI.getAll(params)
      setMovies(res.data.movies)
      setTotal(res.data.total)
      setPages(res.data.pages)
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load movies')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(params)])

  useEffect(() => { fetch() }, [fetch])

  return { movies, total, pages, loading, error, refetch: fetch }
}

export function useMovie(id) {
  const [movie, setMovie]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fetch = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      const res = await moviesAPI.getById(id)
      setMovie(res.data)
    } catch (e) {
      setError(e.response?.data?.message || 'Movie not found')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { fetch() }, [fetch])

  return { movie, loading, error, refetch: fetch }
}


// res {
//   data: {
//     results: [...movies],
//     page: 1
//   },
//   status: 200
// }


// React Component
//       │
//       │ useMovies({ page:1, limit:10 })
//       ▼
// Custom Hook (useMovies)
//       │
//       │ params = { page:1, limit:10 }
//       │
//       │ fetch()
//       ▼
// moviesAPI.getAll(params)
//       │
//       ▼
// Axios Request
// GET /movies?page=1&limit=10
//       │
//       ▼
// Backend (Express)
// req.query = { page:1, limit:10 }
//       │
//       ▼
// Database Query
// Movie.find().skip().limit()
//       │
//       ▼
// Backend Response
// {
//   movies: [...],
//   total:120,
//   pages:12
// }
//       │
//       ▼
// Axios receives response
//       │
//       ▼
// React Hook
// setMovies()
// setTotal()
// setPages()
//       │
//       ▼
// Component Re-renders
//       │
//       ▼
// Movies Displayed on UI