import type { Trait } from './trait'

export type Position =
  | 'GK'
  | 'CB'
  | 'LB'
  | 'RB'
  | 'LWB'
  | 'RWB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LM'
  | 'RM'
  | 'LW'
  | 'RW'
  | 'CF'
  | 'ST'

/** Every trait rated 1-100. `Record<Trait, number>` forces all 9 keys to exist. */
export type PlayerRatings = Record<Trait, number>

/**
 * The 7 core traits, stored together under `Player.ratings`. `heading` and
 * `setPieces` are excluded here because the player data file predates the
 * 9-trait system and stores them as their own top-level fields instead of
 * nesting them in `ratings` - see `getPlayerRating` for the unified lookup
 * across all 9 traits regardless of which of the two shapes backs them.
 */
export type CoreTraitRatings = Omit<PlayerRatings, 'heading' | 'setPieces'>

export interface Player {
  id: string
  name: string
  nationality: string
  position: Position
  imageUrl: string
  /** e.g. "2009-2012" - the period these ratings represent, not career-long form. */
  primePeriod: string
  ratings: CoreTraitRatings
  /** Specialist ratings (1-100), stored alongside the 7 core traits. */
  heading: number
  setPieces: number
}

/**
 * Everything about a player except its ratings (`ratings`, `heading`,
 * `setPieces`). This is the shape draft-time and result screens should
 * consume - it makes it a type error to read any rating off a player
 * anywhere ratings aren't meant to be visible yet.
 */
export type PlayerPublicInfo = Omit<Player, 'ratings' | 'heading' | 'setPieces'>

/**
 * The single place that knows how to look up a player's rating for any of
 * the 9 traits, regardless of whether it lives in `ratings` (the 7 core
 * traits) or as a top-level field (`heading`, `setPieces`). Engine code
 * should always go through this rather than reading `player.ratings[trait]`
 * directly, since that object no longer has all 9 keys.
 */
export function getPlayerRating(player: Player, trait: Trait): number {
  if (trait === 'heading') return player.heading
  if (trait === 'setPieces') return player.setPieces
  return player.ratings[trait]
}
