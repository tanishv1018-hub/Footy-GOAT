import Button from '../../components/Button/Button'
import PlayerCard from '../../game/components/PlayerCard/PlayerCard'
import RerollControl from '../../game/components/RerollControl/RerollControl'
import ResultCard from '../../game/components/ResultCard/ResultCard'
import RoundProgress from '../../game/components/RoundProgress/RoundProgress'
import ScoreSummary from '../../game/components/ScoreSummary/ScoreSummary'
import ScoreVerdict from '../../game/components/ScoreVerdict/ScoreVerdict'
import TraitGrid from '../../game/components/TraitGrid/TraitGrid'
import { useGame } from '../../game/hooks/useGame'
import './GamePage.css'

function GamePage() {
  const {
    status,
    round,
    totalRounds,
    currentPlayer,
    availableTraits,
    selections,
    rerollsRemaining,
    finalResult,
    startGame,
    selectTrait,
    reroll,
  } = useGame()

  if (status === 'not-started') {
    return (
      <main className="game-page game-page-start">
        <div className="game-page-start-content">
          <p className="game-page-eyebrow">
            {totalRounds} Rounds. {totalRounds} Traits. Zero Ratings.
          </p>
          <h1 className="game-page-title">
            FOOTY <span className="game-page-title-accent">GOAT</span>
          </h1>
          <h2 className="game-page-subtitle">PERFECT FOOTBALLER</h2>
          <p className="game-page-explainer">
            Each round drafts one random footballer. You'll see who they are - never how good
            they are. Assign every player exactly one unused trait, blind. Once all {totalRounds}{' '}
            traits are locked in, every rating is revealed and added up into your final score.
          </p>
          <Button onClick={startGame}>START GAME</Button>
        </div>
      </main>
    )
  }

  if (status === 'complete') {
    if (!finalResult) return null

    return (
      <main className="game-page game-page-reveal">
        <div className="game-page-reveal-header">
          <p className="game-page-reveal-tag">RATINGS REVEALED</p>
          <h1 className="game-page-complete-title">DRAFT COMPLETE</h1>
          <ScoreSummary totalScore={finalResult.totalScore} maxScore={finalResult.maxScore} />
          <ScoreVerdict totalScore={finalResult.totalScore} />
        </div>

        <div className="result-grid">
          {finalResult.selections.map((selection, index) => (
            <ResultCard key={selection.trait} selection={selection} index={index} />
          ))}
        </div>

        <Button onClick={startGame} className="game-page-play-again">
          PLAY AGAIN
        </Button>
      </main>
    )
  }

  if (!currentPlayer) {
    return null
  }

  return (
    <main className="game-page game-page-drafting">
      <p className="game-page-brand">
        FOOTY <span className="game-page-brand-accent">GOAT</span>
      </p>
      <div className="game-page-round" key={currentPlayer.id}>
        <RoundProgress round={round} totalRounds={totalRounds} completedRounds={selections.length} />
        <PlayerCard player={currentPlayer} />
        <RerollControl rerollsRemaining={rerollsRemaining} onReroll={reroll} />
        <section className="game-page-trait-section">
          <p className="game-page-trait-prompt">Choose a trait for this player</p>
          <TraitGrid availableTraits={availableTraits} onSelect={selectTrait} />
        </section>
      </div>
    </main>
  )
}

export default GamePage
