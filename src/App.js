import React, { useEffect } from 'react'
import Header from './Header.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GameTile from './GameTile.js'
import ThemeDropdown from './ThemeDropdown.js'
library.add(fas)

function App() {
  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => console.log(data.message))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/addgames', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: ['123'] })
      })
      const data = await response.json()
      console.log(data)
    }

    fetchData()
  }, [])
  return (
    <div className="App">
      <Header />
      <div class="container">
        <ThemeDropdown />
        <GameTile />
      </div>
    </div>
  )
}

export default App
