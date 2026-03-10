import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Input } from '../ui/Input'
import Button from '../ui/Button'

export default function LoginForm() {
  const { login }  = useAuth()
  const toast      = useToast()
  const navigate   = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      await login(form)
      toast('Welcome back!', 'success')
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@email.com"
        value={form.email}
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />

      {error && <p className="text-xs text-red">{error}</p>}

      <Button className="w-full mt-1" onClick={handleSubmit} loading={loading}>
        Sign In
      </Button>

      <p className="text-center text-xs text-muted">
        No account?{' '}
        <Link to="/register" className="text-gold underline">Register</Link>
      </p>
    </div>
  )
}