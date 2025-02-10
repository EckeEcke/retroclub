import React, { useState, useRef, useEffect } from 'react'
import { useThemeStore } from '../store/store'
import RatingModal from './RatingModal'
import RatingsTable from './RatingsTable'
import '../css/GameTile.css'
import ImageGallery from './ImageGallery'

const GameTile = ({ game }) => {
  const [modalGame, setModalGame] = useState(null)
  const name = useThemeStore((state) => state.name)
  const platformListRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const hideRatings = useThemeStore((state) => state.hideRatings)
  const shouldShowRatingsTable = !name || !hideRatings


  const checkOverflow = () => {
    const element = platformListRef.current
    if (element && element.scrollHeight > element.clientHeight) {
      setShowToggle(true)
    } else {
      setShowToggle(false)
    }
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => {
      window.removeEventListener('resize', checkOverflow)
    }
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const openModal = () => {
    setModalGame(game)
  }

  const closeModal = () => {
    setModalGame(null)
  }

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getPublishers = (publishers) => {
    if (!publishers) return ''
    return publishers.slice(0, 2).map((publisher) => publisher.name).join(', ')
  }

  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const openGallery = (images) => {
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  return (
    <div className="game-card">
      {isGalleryOpen && <ImageGallery images={game.images} onClose={closeGallery} />}
      {game ? (
        <>
          <div className="image-container">
            <img src={game.image?.original_url} alt={game.name} onClick={openGallery} />
          </div>
          <h2 className="game-tile-headline" onClick={() => openInNewTab(game.site_detail_url)}>{game.name}</h2>
          <div className="release-year">
            veröffentlicht {game.expected_release_year ? game.expected_release_year : game.original_release_date.slice(0, 4)}
            {getPublishers(game.publishers).length > 0 ? ` | ${getPublishers(game.publishers)}` : ''}
          </div>
          <div className={`platforms ${isExpanded ? 'expanded' : ''}`}  ref={platformListRef}>
            {game.platforms.map(platform => (
              <span className="platform-span" key={platform.id} onClick={() => openInNewTab(platform.site_detail_url)}>{platform.name}</span>
            ))}
          </div>
          {showToggle && (
              <button onClick={toggleExpand} className="toggle-button">
                {isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
              </button>
            )}
          <div className="ratings">
            {name && !game.ratings?.[name] && (
              <button className="rating-button" onClick={openModal}>Bewerten</button>
            )}
            <h3>Bewertungen</h3>
            {shouldShowRatingsTable && <RatingsTable game={game} />}
          </div>
          {modalGame && (
            <RatingModal
              game={modalGame}
              isOpen={!!modalGame}
              onClose={closeModal}
            />
          )}
        </>
      ) : (
        <p>Spielinformationen nicht verfügbar</p>
      )}
    </div>
  )
}

export default GameTile
