import { Routes, Route } from 'react-router-dom'
import RootLayout from '../components/layout/RootLayout'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import HomePage from '../pages/HomePage'
import MovieDetailPage from '../pages/MovieDetailPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AdminPage from '../pages/AdminPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/"           element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/login"      element={<LoginPage />} />
        <Route path="/register"   element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}