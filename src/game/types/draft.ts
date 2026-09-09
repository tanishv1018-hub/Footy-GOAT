import type { Player, PlayerPublicInfo } from './player'
import type { Trait } from './trait'

export type GameStatus = 'not-started' | 'drafting' | 'complete'

/**
 * A committed trait -> player assignment. Deliberately holds the player's
 * public info only, not the full `Player` - the rating is carried as its own
 * field so nothing here exposes the player's other 6 hidden ratings. This is
 * the boundary that keeps draft-time state safe to pass straight into the
 * presentation layer.
 */
export interface DraftSelection {
  round: number
  trait: Trait
  player: PlayerPublicInfo
  rating: number
}

export interface GameState {
  status: GameStatus
  /** 1-indexed current round. */
  round: number
  totalRounds: number
  availableTraits: Trait[]
  /** Ids of every player drawn so far, so the pool never repeats one. */
  usedPlayerIds: string[]
  /**
   * The player drawn for the current round, awaiting a trait choice. This is
   * the one place `GameState` still carries a full `Player` (ratings
   * included) - it exists so `selectTrait` can read the chosen rating.
   * Presentation code should only ever read the non-rating fields off it.
   */
  currentPlayer: Player | null
  selections: DraftSelection[]
  /** Rerolls left this game. Consumed by `rerollPlayer`; starts at `INITIAL_REROLLS`. */
  rerollsRemaining: number
}
