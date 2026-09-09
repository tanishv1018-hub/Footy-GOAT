import { getScoreVerdict } from '../../utils/scoreVerdict'
import './ScoreVerdict.css'

interface ScoreVerdictProps {
  totalScore: number
}

/** Tiers prestigious enough to earn a laurel flourish around the title. */
const LAURELED_TIERS = new Set(['goat', 'goat-of-goats'])

function ScoreVerdict({ totalScore }: ScoreVerdictProps) {
  const verdict = getScoreVerdict(totalScore)
  const isGoatOfGoats = verdict.id === 'goat-of-goats'
  const hasLaurel = LAURELED_TIERS.has(verdict.id)

  return (
    <div className={`score-verdict score-verdict-${verdict.id}`}>
      {isGoatOfGoats && (
        <span className="score-verdict-crown" aria-hidden="true">
          👑
        </span>
      )}
      <div className="score-verdict-title-row">
        {hasLaurel && (
          <span className="score-verdict-laurel score-verdict-laurel-left" aria-hidden="true">
            🌿
          </span>
        )}
        <h2 className="score-verdict-title">{verdict.label}</h2>
        {hasLaurel && (
          <span className="score-verdict-laurel score-verdict-laurel-right" aria-hidden="true">
            🌿
          </span>
        )}
      </div>
    </div>
  )
}

export default ScoreVerdict
