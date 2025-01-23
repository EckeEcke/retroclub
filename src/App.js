import React, { useEffect } from 'react'
import Header from './Header.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GameTile from './GameTile.js'
import ThemeDropdown from './ThemeDropdown.js'
import FetchThemes from './FetchThemes.js'
library.add(fas)

function App() {
  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => console.log(data.message))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://retroclub.vercel.app/api/addgames', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'Qw7VcR2j', theme: 'Super Mario', ids: ['3030-311','3030-19726','3030-15544','3030-7406','3030-10299','3030-25744','3030-1334','3030-7638','3030-19834','3030-14425'] })
      })
    }

    fetchData()
  }, [])
  return (
    <div className="App">
      <Header />
      <div class="container">
        <FetchThemes />
        <ThemeDropdown />
        <GameTile />
      </div>
    </div>
  )
}

export default App
