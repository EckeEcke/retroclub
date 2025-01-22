import React from 'react'
import './GameTile.css'
import { gameData } from './TestData'

const GamingTile = () => {
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div class="tile-container">
      {gameData.map((game, index) => (
        <div className="game-card" key={index}>
          <div class="image-container">
            <img src={game.image.original_url} alt={game.name} />
          </div>
          <h2 class="game-tile-headline" onClick={() => openInNewTab(game.site_detail_url)}>{game.name}</h2>
          <div className="release-year">
            veröffentlicht {game.expected_release_year ? game.expected_release_year : game.original_release_date.slice(0,4)}
          </div>
          <div className="platforms">
            {game.platforms.map(platform => (
              <span className="platform-span" key={platform.id} onClick={() => openInNewTab(platform.site_detail_url)}>{platform.name}</span>
            ))}
          </div>
          <div class="ratings">
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
      ))}
    </div>
  )
}

export default GamingTile
