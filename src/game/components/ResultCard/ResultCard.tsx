import { TRAIT_LABELS } from '../../types'
import type { FinalSelectionResult } from '../../types'
import PlayerAvatar from '../PlayerAvatar/PlayerAvatar'
import './ResultCard.css'

interface ResultCardProps {
  selection: FinalSelectionResult
  /** Position in the reveal sequence - staggers the entrance animation. */
  index?: number
}

type RatingTier = 'red' | 'yellow' | 'green'

/**
 * Presentational-only classification of a single revealed rating into the
 * three brand colors. Thresholds per spec: <75 red, 75-89 yellow, >=90 green.
 * Never derived from or used for the actual score calculation.
 */
function getRatingTier(rating: number): RatingTier {
  if (rating < 75) return 'red'
  if (rating < 90) return 'yellow'
  return 'green'
}

function ResultCard({ selection, index = 0 }: ResultCardProps) {
  const tier = getRatingTier(selection.rating)
  const isPerfect = selection.rating === 100

  const cardClasses = ['result-card', `result-card-${tier}`, isPerfect ? 'result-card-perfect' : '']
    .filter(Boolean)
    .join(' ')

  const ratingClasses = [
    'result-card-rating',
    `result-card-rating-${tier}`,
    isPerfect ? 'result-card-rating-perfect' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClasses} style={{ animationDelay: `${index * 90}ms` }}>
      {isPerfect && <span className="result-card-perfect-tag">PERFECT</span>}
      <div className="result-card-identity">
        <PlayerAvatar name={selection.player.name} imageUrl={selection.player.imageUrl} size="md" />
        <div className="result-card-identity-text">
          <p className="result-card-eyebrow">PLAYER</p>
          <p className="result-card-name">{selection.player.name}</p>
        </div>
      </div>

      <div className="result-card-trait-row">
        <p className="result-card-eyebrow">TRAIT</p>
        <p className="result-card-trait">{TRAIT_LABELS[selection.trait]}</p>
      </div>

      <div className="result-card-rating-row">
        <p className="result-card-eyebrow">RATING</p>
        <p className={ratingClasses}>{selection.rating}</p>
      </div>
    </div>
  )
}

export default ResultCard
