import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import { FiSettings } from "react-icons/fi"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-border h-[60px] flex items-center px-6 text-white">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-display text-2xl tracking-widest text-gold no-underline">
          REEL<span className="text-white">CRITIC</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
             
{user.role === 'admin' && (
  <Link to="/admin">
    <Button variant="ghost" size="sm">
     ADMIN <FiSettings size={16} />
    </Button>
  </Link>
)}
              <span className="text-xs text-muted hidden sm:block">
                Hi, <span className="text-white font-medium">{user.name}</span>
              </span>
              <Button variant="outline" size="md" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" variant='gold' className='text-white' >Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
