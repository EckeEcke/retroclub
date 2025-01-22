import React from 'react'
import './GameTile.css'
import { gameData } from './TestData'

const GamingTile = () => {
  return (
    <div class="tile-container">
      {gameData.map((game, index) => (
        <div className="game-card" key={index}>
          <div class="image-container">
            <img src={game.image.original_url} alt={game.name} />
          </div>
          <h2>{game.name}</h2>
          <div className="release-year">veröffentlicht {game.expected_release_year || game.original_release_date}</div>
          <div className="platforms">
            {game.platforms.map(platform => (
              <span className="platform-span" key={platform.id}>{platform.name}</span>
            ))}
          </div>
          <div class="ratings">
          <h2>Bewertungen</h2>
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
