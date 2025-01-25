import React, { useState } from 'react'
import '../css/RatingModal.css'
import { useThemeStore } from '../store/store'

const RatingModal = ({ game, isOpen, onClose }) => {
  const selectedTheme = useThemeStore((state) => state.selectedTheme)
  const [gesamt, setGesamt] = useState(null)
  const [thema, setThema] = useState(null)
  const key = useThemeStore((state) => state.key)
  const fetchThemes = useThemeStore((state) => state.fetchThemes)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const rating = {
      total: gesamt,
      theme: thema
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
      fetchThemes()
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
            <div class="input-wrapper">
                <label>
                    Gesamt:
                    <input
                      type="number"
                      value={gesamt}
                      onChange={(e) => setGesamt(e.target.value)}
                      min="0"
                      max="10"
                      required
                      placeholder="0"
                    />
                </label>
                <label>
                    Thema:
                    <input
                      type="number"
                      value={thema}
                      onChange={(e) => setThema(e.target.value)}
                      min="0"
                      max="10"
                      required
                      placeholder="0"
                    />
                </label>
            </div>
          <button type="submit">Bewerten</button>
        </form>
      </div>
    </div>
  )
}

export default RatingModal
