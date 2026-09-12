import { ALL_TRAITS } from './types/trait'

export const TOTAL_ROUNDS = ALL_TRAITS.length
export const MIN_RATING = 1
export const MAX_RATING = 100
export const MAX_SCORE = TOTAL_ROUNDS * MAX_RATING

/** Two rerolls per game. */
export const INITIAL_REROLLS = 2
