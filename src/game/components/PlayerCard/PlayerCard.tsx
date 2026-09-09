import type { PlayerPublicInfo } from '../../types'
import './PlayerCard.css'

interface PlayerCardProps {
  player: PlayerPublicInfo
}

function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="player-card">
      <span className="player-card-position">{player.position}</span>
      <h2 className="player-card-name">{player.name}</h2>
      <p className="player-card-nationality">{player.nationality}</p>
      <div className="player-card-divider" />
      <p className="player-card-prime">{player.primePeriod} PRIME</p>
      <p className="player-card-hidden-badge">RATINGS HIDDEN</p>
    </div>
  )
}

export default PlayerCard
