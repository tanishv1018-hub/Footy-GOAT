import { useCallback, useState } from 'react'
import { PLAYERS } from '../data/players'
import {
  advanceRound,
  createInitialGame,
  drawNextPlayer,
  getFinalResult,
  isDraftComplete,
  lockSelection,
  rerollPlayer,
  selectTrait as buildDraftSelection,
} from '../engine'
import type {
  DraftSelection,
  FinalResult,
  GameState,
  GameStatus,
  PlayerPublicInfo,
  Trait,
} from '../types'

export interface UseGameResult {
  status: GameStatus
  round: number
  totalRounds: number
  /** Public info only - never carries the current player's ratings. */
  currentPlayer: PlayerPublicInfo | null
  availableTraits: Trait[]
  selections: DraftSelection[]
  rerollsRemaining: number
  isComplete: boolean
  /** Non-null only once the draft is complete - this is the reveal boundary. */
  finalResult: FinalResult | null
  startGame: () => void
  selectTrait: (trait: Trait) => void
  reroll: () => void
}

function toPublicPlayer(player: GameState['currentPlayer']): PlayerPublicInfo | null {
  if (!player) return null
  const { id, name, nationality, position, imageUrl, primePeriod } = player
  return { id, name, nationality, position, imageUrl, primePeriod }
}

/** Wraps the framework-independent game engine in React state for a GamePage to consume. */
export function useGame(): UseGameResult {
  const [state, setState] = useState<GameState>(() => createInitialGame())

  const startGame = useCallback(() => {
    setState(() => drawNextPlayer(createInitialGame(), PLAYERS))
  }, [])

  const selectTrait = useCallback((trait: Trait) => {
    setState((prev) => {
      let selection: DraftSelection
      try {
        selection = buildDraftSelection(prev, trait)
      } catch (error) {
        console.error('Rejected trait selection:', error)
        return prev
      }

      const locked = lockSelection(prev, selection)
      const advanced = advanceRound(locked)

      if (isDraftComplete(advanced)) {
        return advanced
      }

      return drawNextPlayer(advanced, PLAYERS)
    })
  }, [])

  const reroll = useCallback(() => {
    setState((prev) => {
      try {
        return rerollPlayer(prev, PLAYERS)
      } catch (error) {
        console.error('Rejected reroll:', error)
        return prev
      }
    })
  }, [])

  const isComplete = isDraftComplete(state)

  return {
    status: state.status,
    round: state.round,
    totalRounds: state.totalRounds,
    currentPlayer: toPublicPlayer(state.currentPlayer),
    availableTraits: state.availableTraits,
    selections: state.selections,
    rerollsRemaining: state.rerollsRemaining,
    isComplete,
    finalResult: isComplete ? getFinalResult(state) : null,
    startGame,
    selectTrait,
    reroll,
  }
}
