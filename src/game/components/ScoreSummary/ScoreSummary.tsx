import './ScoreSummary.css'

interface ScoreSummaryProps {
  totalScore: number
  maxScore: number
}

function ScoreSummary({ totalScore, maxScore }: ScoreSummaryProps) {
  return (
    <div className="score-summary">
      <p className="score-summary-label">FINAL SCORE</p>
      <p className="score-summary-value">
        {totalScore} <span className="score-summary-max">/ {maxScore}</span>
      </p>
    </div>
  )
}

export default ScoreSummary
