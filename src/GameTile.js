import React, { useState } from 'react'
import './GameTile.css'
import { useThemeStore } from './store'
import RatingModal from './RatingModal'

const GamingTile = () => {
  const [modalGame, setModalGame] = useState(null)

  const openModal = (game) => {
    setModalGame(game)
  }

  const closeModal = () => {
    setModalGame(null)
  }

  const games = useThemeStore((state) => state.selectedThemeGames)
  const name = useThemeStore((state) => state.name)

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getPublishers = (publishers) => {
    if (!publishers) return ''
    return publishers.slice(0,2).map((publisher) => publisher.name).join(', ')
  }

  return (
    <div className="tile-container">
      {games.length > 0 ? (
        games.map((game, index) => (
          <div className="game-card" key={index}>
            <div className="image-container">
              <img src={game.image.original_url} alt={game.name} />
            </div>
            <h2 className="game-tile-headline" onClick={() => openInNewTab(game.site_detail_url)}>{game.name}</h2>
            <div className="release-year">
              veröffentlicht {game.expected_release_year ? game.expected_release_year : game.original_release_date.slice(0, 4)}
              {getPublishers(game.publishers).length > 0 ? ` | ${getPublishers(game.publishers)}` : ''}
            </div>
            <div className="platforms">
              {game.platforms.map(platform => (
                <span className="platform-span" key={platform.id} onClick={() => openInNewTab(platform.site_detail_url)}>{platform.name}</span>
              ))}
            </div>
            <div className="ratings">
              {name && !game.ratings?.[name] && (
                <button className="rating-button">Bewerten</button>
              )}
              <h3>Bewertungen</h3>
              <table>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Gesamt</th>
                    <th>Thema</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Lena</td>
                  <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.total : '?'}</td>
                  <td>{game.ratings && game.ratings.Lena ? game.ratings.Lena.theme : '?'}</td>
                </tr>
                <tr>
                  <td>Rene</td>
                  <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.total : '?'}</td>
                  <td>{game.ratings && game.ratings.Rene ? game.ratings.Rene.theme : '?'}</td>
                </tr>
                <tr>
                  <td>Chris</td>
                  <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.total : '?'}</td>
                  <td>{game.ratings && game.ratings.Chris ? game.ratings.Chris.theme : '?'}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p>Noch kein Thema ausgewählt</p>
      )}
      {modalGame && (
        <RatingModal
          game={modalGame}
          isOpen={!!modalGame}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default GamingTile
