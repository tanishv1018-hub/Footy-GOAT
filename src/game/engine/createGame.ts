import { INITIAL_REROLLS, TOTAL_ROUNDS } from '../constants'
import { ALL_TRAITS } from '../types/trait'
import type { GameState } from '../types/draft'

export function createInitialGame(): GameState {
  return {
    status: 'not-started',
    round: 1,
    totalRounds: TOTAL_ROUNDS,
    availableTraits: [...ALL_TRAITS],
    usedPlayerIds: [],
    currentPlayer: null,
    selections: [],
    rerollsRemaining: INITIAL_REROLLS,
  }
}
