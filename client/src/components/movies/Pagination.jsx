export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <PBtn disabled={page === 1} onClick={() => onChange(page - 1)}>‹</PBtn>
      {Array.from({ length: pages }, (_, i) => (
        <PBtn key={i} active={page === i + 1} onClick={() => onChange(i + 1)}>
          {i + 1}
        </PBtn>
      ))}
      <PBtn disabled={page === pages} onClick={() => onChange(page + 1)}>›</PBtn>
    </div>
  )
}



function PBtn({ children, active, ...props }) {
  return (
    <button
      {...props}
      className={`
        w-9 h-9 flex items-center justify-center rounded text-sm
        border transition-all duration-150 cursor-pointer
        disabled:opacity-30 disabled:cursor-not-allowed
        ${active
          ? 'border-gold text-gold bg-gold-dim'
          : 'border-border text-muted bg-card hover:border-gold hover:text-gold'
        }
      `}
    >
      {children}
    </button>
  )
}
