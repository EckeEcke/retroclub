import React from 'react'
import { useThemeStore } from '../store/store'
import { useState } from 'react'
import '../css/Admin.css'

function AdminPage() {
    const key = useThemeStore((state) => state.key)
    const name = useThemeStore((state) => state.name)
    const [theme, setTheme] = useState('')
    const [gameIds, setGameIds] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const gameIdsArray = gameIds.split(',').map(id => id.trim())
        const response = await fetch('/api/addgames', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ theme, ids: gameIdsArray, key })
        })
        if (response.ok) {
            console.log('Games added successfully')
        } else {
            console.error('Failed to add games')
        }
    }

    if (!key || !name) {
        return <p>Access Denied</p>
    }

    return (
        <div className="container admin-page">
            <h2>Neues Thema mit Spielen hinzufügen</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="theme">Thema:</label>
                    <input
                        type="text"
                        id="theme"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="gameIds">Game IDs:</label>
                    <input
                        type="text"
                        id="gameIds"
                        value={gameIds}
                        onChange={(e) => setGameIds(e.target.value)}
                    />
                </div>
                <button type="submit">Absenden</button>
            </form>
        </div>
    )
}

export default AdminPage
