import Header from './Header.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GameTile from './GameTile.js'
library.add(fas)

function App() {
  return (
    <div className="App">
      <Header />
      <div class="container">
        <GameTile />
      </div>
    </div>
  )
}

export default App
