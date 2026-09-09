import './RoundProgress.css'

interface RoundProgressProps {
  round: number
  totalRounds: number
  completedRounds: number
}

function RoundProgress({ round, totalRounds, completedRounds }: RoundProgressProps) {
  const segments = Array.from({ length: totalRounds }, (_, index) => {
    if (index < completedRounds) return 'done'
    if (index === completedRounds) return 'active'
    return 'upcoming'
  })

  return (
    <div className="round-progress">
      <p className="round-progress-label">
        ROUND {round} / {totalRounds}
      </p>
      <div className="round-progress-track">
        {segments.map((state, index) => (
          <span key={index} className={`round-progress-segment round-progress-segment-${state}`} />
        ))}
      </div>
    </div>
  )
}

export default RoundProgress
