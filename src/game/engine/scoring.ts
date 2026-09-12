import { MAX_RATING } from '../constants'
import type { DraftSelection, GameState } from '../types/draft'
import type { FinalResult } from '../types/result'
import { isDraftComplete } from './round'

export function calculateFinalScore(selections: DraftSelection[]): number {
  return selections.reduce((sum, selection) => sum + selection.rating, 0)
}

/** Reveals ratings and totals the score. Throws if called before all traits are assigned. */
export function getFinalResult(state: GameState): FinalResult {
  if (!isDraftComplete(state)) {
    throw new Error('Cannot compute the final result before the draft is complete.')
  }

  return {
    selections: state.selections.map((selection) => ({
      trait: selection.trait,
      player: selection.player,
      rating: selection.rating,
    })),
    totalScore: calculateFinalScore(state.selections),
    maxScore: state.totalRounds * MAX_RATING,
  }
}
