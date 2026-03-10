import { Stars } from '../ui/Stars'
import { formatDate } from '../../utils/helpers'
import { FiUser } from 'react-icons/fi'

export default function ReviewCard({ review, index = 0 }) {
    const initial = review.user?.name?.charAt(0).toUpperCase() || 'A'

  const delays = ['', 'animation-delay-100', 'animation-delay-200']
  return (
    <div className={`bg-card border border-border rounded p-5 animate-fade-up animation-fill-both ${delays[index % 3]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
            <FiUser size={14} className="text-yellow-500" >
              
            </FiUser>
          </div>
          <span className="font-medium text-md">{review.user?.name || 'Anonymous'}</span>
        </div>
        <Stars rating={review.rating} size='md' />
      </div>
      <p className="text-[0.7rem] text-white mb-3">{formatDate(review.createdAt)}</p>
      <p className="text-sm text-white/71 leading-relaxed">{review.comment}</p>
    </div>
  )
}