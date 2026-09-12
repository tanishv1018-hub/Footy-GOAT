/** Canonical trait identifiers. Order here has no effect on scoring. */
export const ALL_TRAITS = [
  'pace',
  'shooting',
  'passing',
  'defending',
  'physical',
  'dribbling',
  'iq',
  'heading',
  'setPieces',
] as const

export type Trait = (typeof ALL_TRAITS)[number]

/** Display labels for UI consumption, kept out of the type itself. */
export const TRAIT_LABELS: Record<Trait, string> = {
  pace: 'PACE',
  shooting: 'SHOOTING',
  passing: 'PASSING',
  defending: 'DEFENDING',
  physical: 'PHYSICAL',
  dribbling: 'DRIBBLING',
  iq: 'IQ',
  heading: 'HEADING',
  setPieces: 'SET PIECES',
}
