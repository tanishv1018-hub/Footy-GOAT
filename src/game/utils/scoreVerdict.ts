export type ScoreTierId =
  | 'amateur'
  | 'pro'
  | 'solid'
  | 'elite'
  | 'world-class'
  | 'all-time-great'
  | 'goat'
  | 'goat-of-goats'

export interface ScoreVerdict {
  id: ScoreTierId
  label: string
}

/**
 * Maps a final score to its verdict tier for the reveal screen. Pure
 * presentation-layer lookup off `finalResult.totalScore` - it never feeds
 * back into the engine or affects scoring, and reads no ratings itself.
 */
export function getScoreVerdict(totalScore: number): ScoreVerdict {
  if (totalScore >= 700) return { id: 'goat-of-goats', label: 'GOAT OF GOATS' }
  if (totalScore >= 680) return { id: 'goat', label: 'GOAT' }
  if (totalScore >= 650) return { id: 'all-time-great', label: 'ALL-TIME GREAT' }
  if (totalScore >= 600) return { id: 'world-class', label: 'WORLD CLASS' }
  if (totalScore >= 550) return { id: 'elite', label: 'ELITE' }
  if (totalScore >= 500) return { id: 'solid', label: 'SOLID' }
  if (totalScore >= 400) return { id: 'pro', label: 'PRO' }
  return { id: 'amateur', label: 'AMATEUR' }
}
