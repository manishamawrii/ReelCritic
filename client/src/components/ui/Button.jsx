const variants = {
  gold:    'bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500 active:scale-95 transition-all duration-150',
  outline: 'bg-transparent font-semibold text-yellow-500 border border-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black active:scale-95 transition-all duration-150',
  ghost:   'bg-transparent text-gray-400 px-4 py-2 rounded hover:text-white hover:bg-white/30 active:scale-95 transition-all duration-150',
  danger:  'bg-transparent text-red-400 border border-red-400 px-4 py-2 rounded hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150',
}
const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2 text-xs',
  lg: 'px-7 py-3 text-sm',
}

export default function Button({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  loading = false,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        inline-flex items-center justify-center gap-2
        uppercase tracking-widest rounded
        transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {loading
        ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin-slow" />
        : children
      }
    </button>
  )
}
