

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rc_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Auth
export const authAPI = {
  register: (data)  => api.post('/auth/register', data),
  login:    (data)  => api.post('/auth/login', data),
  me:       ()      => api.get('/auth/me'),
}

// ── Movies
export const moviesAPI = {
  getAll:    (params) => api.get('/movies', { params }),
  getById:   (id)     => api.get(`/movies/${id}`),
  create:    (data)   => api.post('/movies', data),
  update:    (id, data) => api.put(`/movies/${id}`, data),
  delete:    (id)     => api.delete(`/movies/${id}`),
}

// ── Reviews
export const reviewsAPI = {
  getByMovie: (movieId) => api.get(`/reviews/${movieId}`),
  create:     (movieId, data) => api.post(`/reviews/${movieId}`, data),
}

export default api


// Token is created on backend.

// At this moment:

// Token exists inside server memory

// Then it is sent in HTTP response

// But that’s it.

// Server does NOT store it anywhere.

// API.get("/profile");

// Axios creates a request configuration object internally.

// It becomes something like:

// {
//   method: "get",
//   url: "/profile",
//   baseURL: "http://localhost:5000/api",
//   headers: {}


// Component
//    ↓
// API.get("/profile")
//    ↓
// Axios creates config
//    ↓
// Request Interceptor runs
//    ↓
// Token fetched from localStorage
//    ↓
// Authorization header added
//    ↓
// HTTP Request sent
//    ↓
// Backend verifies token
//    ↓
// Response returned
//    ↓
// Frontend receives response



// Component triggers API call
// ↓
// API.get("/profile") is executed
// ↓
// Axios creates request configuration object
// ↓
// Default configs (baseURL, headers) are merged
// ↓
// Request interceptor chain is prepared
// ↓
// Your request interceptor executes
// ↓
// Token is retrieved from localStorage
// ↓
// If token exists, Authorization header is attached
// ↓
// Modified config object is returned
// ↓
// Axios passes config to HTTP adapter
// ↓
// Browser constructs HTTP request
// ↓
// Request is sent to backend server
// ↓
// Express route matches the endpoint
// ↓
// Authentication middleware extracts Authorization header
// ↓
// JWT token is verified using secret key
// ↓
// If valid, request proceeds to controller
// ↓
// Controller processes logic and fetches data
// ↓
// Backend sends JSON response
// ↓
// Response travels back through network
// ↓
// Axios receives response
// ↓
// Promise is resolved or rejected
// ↓
// .then() or .catch() executes
// ↓
// React state updates
// ↓
// Component re-renders with new data








// Axios is used to make HTTP requests like:
// What is axios.create()?

// It creates a separate Axios instance.


// Interceptor = A function that runs:
// Before request is sent
// Or after response is received

// If you don’t return req:
// Axios won’t send the request.
// It will break.

// Step-by-step:

// API.get() called

// Request interceptor runs

// Token fetched from localStorage

// Authorization header attached

// Request sent to:

// http://localhost:5000/api/profile

// Backend checks token

// Response comes back

// 🧠 Why This Pattern Is Powerful
// Without interceptor:
// axios.get("/profile", {
//   headers: { Authorization: `Bearer ${token}` }
// });
// You would need to add headers manually in every request ❌


// ✅ Example of a Config Object

// When you write:

// API.get("/profile");

// Axios internally converts it into something like this:

// {
//   method: "get",
//   url: "/profile",
//   baseURL: "http://localhost:5000/api",
//   headers: {},
//   data: undefined,
//   timeout: 0
// }

// That entire object is called the config object.



// In your interceptor:
// API.interceptors.request.use((req) => {
// Here:
// req
// is actually the config object.

// A config object is a plain JavaScript object that describes how a request should be made.

// It exists before the HTTP request is sent.
// Config is converted into a real network request.
// That real request becomes req on backend.


