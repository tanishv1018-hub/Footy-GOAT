import { ALL_TRAITS, TRAIT_LABELS } from '../../types'
import type { Trait } from '../../types'
import './TraitGrid.css'

interface TraitGridProps {
  availableTraits: Trait[]
  onSelect: (trait: Trait) => void
}

function TraitGrid({ availableTraits, onSelect }: TraitGridProps) {
  return (
    <div className="trait-grid">
      {ALL_TRAITS.map((trait) => {
        const isAvailable = availableTraits.includes(trait)

        return (
          <button
            key={trait}
            type="button"
            className={`trait-card ${isAvailable ? 'trait-card-available' : 'trait-card-locked'}`}
            onClick={() => onSelect(trait)}
            disabled={!isAvailable}
            aria-disabled={!isAvailable}
          >
            <span className="trait-card-label">{TRAIT_LABELS[trait]}</span>
            {!isAvailable && <span className="trait-card-locked-tag">USED</span>}
          </button>
        )
      })}
    </div>
  )
}

export default TraitGrid
