import { useState } from 'react'
import { getRatingLabel } from '../../utils/helpers'

export function Stars({ rating = 0, max = 5, size = 'sm' }) {
  const filled = Math.round(rating)
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }
  return (
    <span className={`${sizes[size]} tracking-tight`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < filled ? 'text-yellow-500' : 'text-yellow-500/30'}>
          {i < filled ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

export function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0)
  const display = hover || value

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(s => (
          <button
            key={s}
            type="button"
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(s)}
            className={`text-2xl transition-transform duration-100 hover:scale-110 cursor-pointer bg-transparent border-none p-0 leading-none ${
              s <= display ? 'text-yellow-500' : 'text-yellow-500/30'
            }`}
          >
            {s <= display ? '★' : '☆'}
          </button>
        ))}
      </div>
      <span className="text-xs text-gray-400 tracking-wide">
        {getRatingLabel(display)}
      </span>
    </div>
  )
}