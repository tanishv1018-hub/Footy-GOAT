import './RerollControl.css'

interface RerollControlProps {
  rerollsRemaining: number
  onReroll: () => void
}

/**
 * One-shot reroll button for the draft screen. Purely a control over the
 * engine's `rerollsRemaining` counter - it never reads or shows a rating.
 */
function RerollControl({ rerollsRemaining, onReroll }: RerollControlProps) {
  const available = rerollsRemaining > 0

  return (
    <button
      type="button"
      className={`reroll-control ${available ? 'reroll-control-available' : 'reroll-control-used'}`}
      onClick={onReroll}
      disabled={!available}
      aria-disabled={!available}
    >
      <span className="reroll-control-icon" aria-hidden="true">
        ⟲
      </span>
      {available ? 'REROLL PLAYER · 1 LEFT' : 'REROLL USED'}
    </button>
  )
}

export default RerollControl
