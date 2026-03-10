import RegisterForm from '../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm bg-card border border-border rounded p-8 animate-fade-up animation-fill-both">
        <p className="text-[0.65rem] uppercase tracking-widest text-gold mb-2">Join ReelCritic</p>
        <h1 className="font-display text-4xl tracking-wide mb-1">REGISTER</h1>
        <p className="text-xs text-muted mb-8">Create an account to start reviewing films.</p>
        <RegisterForm />
      </div>
    </div>
  )
}
