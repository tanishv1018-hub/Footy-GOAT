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

/** Every trait rated 1-100. `Record<Trait, number>` forces all 7 keys to exist. */
export type PlayerRatings = Record<Trait, number>

export interface Player {
  id: string
  name: string
  nationality: string
  position: Position
  imageUrl: string
  /** e.g. "2009-2012" - the period these ratings represent, not career-long form. */
  primePeriod: string
  ratings: PlayerRatings
}

/**
 * Everything about a player except `ratings`. This is the shape draft-time
 * and result screens should consume - it makes it a type error to read
 * ratings off a player anywhere ratings aren't meant to be visible yet.
 */
export type PlayerPublicInfo = Omit<Player, 'ratings'>
