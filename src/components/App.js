import Header from './Header.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GameTileContainer from './GameTileContainer.js'
import ThemeDropdown from './ThemeDropdown.js'

library.add(fas)

function App() {
  return (
    <div className="App">
      <Header />
      <div class="container">
        <ThemeDropdown />
        <GameTileContainer />
      </div>
    </div>
  )
}

export default App
