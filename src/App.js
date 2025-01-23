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
