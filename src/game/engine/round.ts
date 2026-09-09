import type { DraftSelection, GameState } from '../types/draft'
import type { Player } from '../types/player'
import type { Trait } from '../types/trait'

/**
 * State-transition functions below (`lockSelection`, `advanceRound`,
 * `selectTrait`) are pure and immutable: same inputs always produce the same
 * output, and none of them mutate the `GameState` they're given.
 *
 * `drawRandomPlayer` / `drawNextPlayer` are the exception. They call
 * `Math.random()` directly, so they are intentionally nondeterministic -
 * calling them twice with identical arguments can return different players.
 * They only accept a `pool` and `usedPlayerIds`, not a random source, so
 * there is currently no way to make a draw reproducible; that would require
 * threading a seeded random source through as a parameter, which isn't
 * implemented since nothing needs it yet.
 */

/** Picks one uniformly random player from the pool, excluding any already used. */
export function drawRandomPlayer(pool: Player[], usedPlayerIds: string[]): Player {
  const available = pool.filter((player) => !usedPlayerIds.includes(player.id))

  if (available.length === 0) {
    throw new Error('No players remaining in the pool to draft.')
  }

  const index = Math.floor(Math.random() * available.length)
  return available[index]
}

/**
 * Draws a player for the current round and marks them used. Nondeterministic
 * (see note above) since it delegates to `drawRandomPlayer`. Ratings travel
 * inside `currentPlayer` but no UI should ever read `currentPlayer.ratings`
 * before the draft is complete.
 */
export function drawNextPlayer(state: GameState, pool: Player[]): GameState {
  if (state.status === 'complete') {
    throw new Error('The draft is already complete.')
  }
  if (state.currentPlayer) {
    throw new Error('A player has already been drafted for this round.')
  }

  const player = drawRandomPlayer(pool, state.usedPlayerIds)

  return {
    ...state,
    status: 'drafting',
    currentPlayer: player,
    usedPlayerIds: [...state.usedPlayerIds, player.id],
  }
}

/**
 * Swaps the current round's undrafted player for a new random one. Valid only
 * mid-round (before a trait is chosen) and only while a reroll remains.
 * Consumes the reroll and marks the new player used via `drawRandomPlayer`'s
 * exclusion list, so it can never be drawn again this game - same mechanism
 * `drawNextPlayer` relies on. Leaves `selections` and `availableTraits`
 * untouched; only `currentPlayer`, `usedPlayerIds`, and `rerollsRemaining`
 * change.
 */
export function rerollPlayer(state: GameState, pool: Player[]): GameState {
  if (state.status !== 'drafting' || !state.currentPlayer) {
    throw new Error('Can only reroll a player that is currently being drafted.')
  }
  if (state.rerollsRemaining <= 0) {
    throw new Error('No rerolls remaining.')
  }

  const player = drawRandomPlayer(pool, state.usedPlayerIds)

  return {
    ...state,
    currentPlayer: player,
    usedPlayerIds: [...state.usedPlayerIds, player.id],
    rerollsRemaining: state.rerollsRemaining - 1,
  }
}

/**
 * Builds the selection record for the trait the user picked. This does not
 * mutate `state` - committing it is a separate step (see `lockSelection`) so
 * a future reroll can discard a drawn player before a trait is ever chosen.
 *
 * This is the boundary where the full `Player` (with ratings) gets narrowed
 * down to a `DraftSelection`: only the chosen trait's rating is kept, and the
 * player is stored without its `ratings` object, so the result can be handed
 * to draft-time UI without exposing the player's other 6 hidden ratings.
 */
export function selectTrait(state: GameState, trait: Trait): DraftSelection {
  if (!state.currentPlayer) {
    throw new Error('No player has been drafted for this round yet.')
  }
  if (!state.availableTraits.includes(trait)) {
    throw new Error(`Trait "${trait}" is not available for selection.`)
  }

  const { ratings, ...publicPlayer } = state.currentPlayer

  return {
    round: state.round,
    trait,
    player: publicPlayer,
    rating: ratings[trait],
  }
}

/** Commits a selection: removes the trait from the pool and clears the round's player. */
export function lockSelection(state: GameState, selection: DraftSelection): GameState {
  return {
    ...state,
    availableTraits: state.availableTraits.filter((trait) => trait !== selection.trait),
    selections: [...state.selections, selection],
    currentPlayer: null,
  }
}

export function isDraftComplete(state: GameState): boolean {
  return state.selections.length >= state.totalRounds
}

/** Moves to the next round, or flips the game to `complete` once all traits are assigned. */
export function advanceRound(state: GameState): GameState {
  if (isDraftComplete(state)) {
    return { ...state, status: 'complete' }
  }

  return {
    ...state,
    round: state.round + 1,
    status: 'drafting',
  }
}
