import React, { useState } from 'react'
import '../css/RatingModal.css'
import { useThemeStore } from '../store/store'

const RatingModal = ({ game, isOpen, onClose }) => {
  const selectedTheme = useThemeStore((state) => state.selectedTheme)
  const [gameplay, setGameplay] = useState('')
  const [aging, setAging] = useState('')
  const [graphics, setGraphics] = useState('')
  const [trashiness, setTrashiness] = useState('')
  const key = useThemeStore((state) => state.key)
  const fetchThemes = useThemeStore((state) => state.fetchThemes)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const rating = {
      gameplay,
      aging,
      graphics,
      trashiness
    }

    const response = await fetch('/api/addRating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        themeName: selectedTheme,
        gameId: game.id,
        key,
        rating
      })
    })

    if (response.ok) {
      console.log('Rating added successfully')
      setTimeout(() => fetchThemes(), 200)
    } else {
      console.error('Failed to add rating')
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Bewertung abgeben für {game.name}</h2>
        <img src={game.image.original_url} alt={game.name} />
        <form onSubmit={handleSubmit}>
          <div class="inputs">
            <div class="input-wrapper">
                <label>
                    Gameplay
                    <input
                      type="number"
                      value={gameplay}
                      onChange={(e) => setGameplay(e.target.value)}
                      min="0"
                      max="10"
                      required
                      placeholder="0"
                    />
                </label>
                <label>
                    Aging
                    <input
                      type="number"
                      value={aging}
                      onChange={(e) => setAging(e.target.value)}
                      min="0"
                      max="10"
                      required
                      placeholder="0"
                    />
                </label>
            </div>
            <div class="input-wrapper">
                <label>
                    Grafik
                    <input
                      type="number"
                      value={graphics}
                      onChange={(e) => setGraphics(e.target.value)}
                      min="0"
                      max="10"
                      required
                      placeholder="0"
                    />
                </label>
                <label>
                    Trashiness
                    <input
                      type="number"
                      value={trashiness}
                      onChange={(e) => setTrashiness(e.target.value)}
                      min="0"
                      max="10"
                      required
                      placeholder="0"
                    />
                </label>
            </div>
          </div>
          <button type="submit">Bewerten</button>
        </form>
      </div>
    </div>
  )
}

export default RatingModal
