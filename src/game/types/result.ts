import type { PlayerPublicInfo } from './player'
import type { Trait } from './trait'

/**
 * One revealed trait -> player -> rating line in the post-draft breakdown.
 * `rating` is the single number being revealed for this trait/player pair -
 * `player` stays `PlayerPublicInfo` since the game only ever reveals the
 * rating for the trait that was actually selected, not a player's other 6.
 */
export interface FinalSelectionResult {
  trait: Trait
  player: PlayerPublicInfo
  rating: number
}

export interface FinalResult {
  selections: FinalSelectionResult[]
  totalScore: number
  maxScore: number
}
