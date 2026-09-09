import { useState } from 'react'
import './PlayerAvatar.css'

interface PlayerAvatarProps {
  name: string
  imageUrl: string
  size?: 'md' | 'lg'
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/**
 * Renders `/players/<id>.jpg` when present and loadable, falling back to a
 * styled initials badge otherwise. Player photographs are licensed assets -
 * do not add any to `public/players/` until their licensing/permission for
 * public use has been explicitly verified (see `public/players/README.md`).
 * Never reads or depends on player ratings.
 */
function PlayerAvatar({ name, imageUrl, size = 'md' }: PlayerAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const [lastImageUrl, setLastImageUrl] = useState(imageUrl)

  // A new imageUrl (e.g. next round's player) deserves a fresh attempt to
  // load it, even if this component instance persists across the change.
  if (imageUrl !== lastImageUrl) {
    setLastImageUrl(imageUrl)
    setImageFailed(false)
  }

  const hasImage = Boolean(imageUrl) && !imageFailed

  return (
    <div className={`player-avatar player-avatar-${size}`}>
      {hasImage ? (
        <img
          src={imageUrl}
          alt={name}
          className="player-avatar-image"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="player-avatar-fallback">{getInitials(name)}</span>
      )}
    </div>
  )
}

export default PlayerAvatar
