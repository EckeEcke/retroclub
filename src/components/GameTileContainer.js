import React from 'react'
import { useThemeStore } from '../store/store'
import GameTile from './GameTile'
import '../css/GameTile.css'

const GameTileContainer = () => {
  const games = useThemeStore((state) => state.selectedThemeGames)

  return (
    <div className="tile-container">
      {games.length > 0 ? (
        games.map((game, index) => (
          <GameTile 
            key={index + game.id} 
            game={game}
          />
        ))
      ) : (
        <p>Noch kein Thema ausgewählt</p>
      )}
    </div>
  )
}

export default GameTileContainer
