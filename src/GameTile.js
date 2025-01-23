import React from 'react'
import './GameTile.css'
import { useThemeStore } from './store'

const GamingTile = () => {
  const games = useThemeStore((state) => state.selectedThemeGames)

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getPublishers = (publishers) => {
    if (!publishers) return ''
    return publishers.map(publisher => publisher.name).join(', ')
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
                    <td>10</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Rene</td>
                    <td>10</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Chris</td>
                    <td>10</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p>Noch kein Thema ausgewählt</p>
      )}
    </div>
  )
}

export default GamingTile
