export type ScoreTierId =
  | 'washed'
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
 * Thresholds are tuned for the 9-trait /900 max score.
 */
export function getScoreVerdict(totalScore: number): ScoreVerdict {
  if (totalScore >= 895) return { id: 'goat-of-goats', label: 'GOAT OF GOATS' }
  if (totalScore >= 870) return { id: 'goat', label: 'GOAT' }
  if (totalScore >= 840) return { id: 'all-time-great', label: 'ALL-TIME GREAT' }
  if (totalScore >= 800) return { id: 'world-class', label: 'WORLD CLASS' }
  if (totalScore >= 760) return { id: 'elite', label: 'ELITE' }
  if (totalScore >= 720) return { id: 'solid', label: 'SOLID' }
  if (totalScore >= 680) return { id: 'pro', label: 'PRO' }
  if (totalScore >= 640) return { id: 'amateur', label: 'AMATEUR' }
  return { id: 'washed', label: 'WASHED' }
}
