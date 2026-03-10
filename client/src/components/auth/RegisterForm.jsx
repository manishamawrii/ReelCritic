import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { Input } from '../ui/Input'
import Button from '../ui/Button'

export default function RegisterForm() {
  const { register } = useAuth()
  const toast        = useToast()
  const navigate     = useNavigate()
  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      await register(form)
      toast('Account created!', 'success')
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Input label="Name" placeholder="Your name" value={form.name} onChange={set('name')} />
      <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
      <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
      {error && <p className="text-xs text-red">{error}</p>}
      <Button className="w-full mt-1" onClick={handleSubmit} loading={loading}>
        Create Account
      </Button>
      <p className="text-center text-xs text-muted">
        Have an account?{' '}
        <Link to="/login" className="text-gold underline">Sign In</Link>
      </p>
    </div>
  )
}
