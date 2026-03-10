import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
