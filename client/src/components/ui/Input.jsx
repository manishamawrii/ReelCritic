export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[0.68rem] uppercase tracking-widest text-muted">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full bg-dark border rounded px-4 py-2.5 text-sm text-white
          placeholder:text-muted outline-none
          transition-colors duration-150
          ${error ? 'border-red' : 'border-border focus:border-gold'}
          ${className}
        `}
      />
      {error && <p className="text-xs text-red">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[0.68rem] uppercase tracking-widest text-muted">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`
          w-full bg-dark border rounded px-4 py-2.5 text-sm text-white
          placeholder:text-muted outline-none resize-vertical min-h-[90px]
          transition-colors duration-150
          ${error ? 'border-red' : 'border-border focus:border-gold'}
          ${className}
        `}
      />
      {error && <p className="text-xs text-red">{error}</p>}
    </div>
  )
}
