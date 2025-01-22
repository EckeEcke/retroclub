import './GameTile.css'
import { gameData } from './TestData'

const GamingTile = () => {
  return (
    <div class="game-card">
      <img src={gameData.image.original_url} alt="" />
      <h2>{gameData.name}</h2>
      <div class="platforms">
        {gameData.platforms.map(platform => (
          <span class="platform-span" key={platform.id}>{platform.name}</span>
        ))}
      </div>
    </div>
  )
}

export default GamingTile