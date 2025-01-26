import React from 'react'
import { useThemeStore } from '../store/store'
import { useState } from 'react'
import '../css/Admin.css'

function AdminPage() {
    const key = useThemeStore((state) => state.key)
    const name = useThemeStore((state) => state.name)
    const [theme, setTheme] = useState('')
    const [gameIds, setGameIds] = useState('')
    const [deleteTheme, setDeleteTheme] = useState('')

    const handleAddSubmit = async (e) => {
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
            alert('Thema und Games erfolgreich hinzugefügt')
        } else {
            alert('Hinzufügen fehlgeschlagen')
        }
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('https://retroclub.vercel.app/api/deleteTheme', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ theme: deleteTheme, key })
        })
        if (response.ok) {
            alert('Thema erfolgreich gelöscht')
        } else {
            alert('Löschen fehlgeschlagen')
        }
    }

    if (!key || !name) {
        return <p>Zugriff verweigert!</p>
    }

    return (
        <div className="container admin-page">
            <div>
                <h2>Neues Thema mit Spielen hinzufügen</h2>
                <form onSubmit={handleAddSubmit}>
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
            <div>
                <h2>Thema löschen</h2>
                <form onSubmit={handleDeleteSubmit}>
                    <div>
                        <label htmlFor="deleteTheme">Thema:</label>
                        <input
                            type="text"
                            id="deleteTheme"
                            value={deleteTheme}
                            onChange={(e) => setDeleteTheme(e.target.value)}
                        />
                    </div>
                    <button type="submit">Löschen</button>
                </form>
            </div>  
        </div>
    )
}

export default AdminPage
