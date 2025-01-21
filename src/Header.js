import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
  return (
    <header>
      <div class="container">
        <div class="logo-wrapper">
          <FontAwesomeIcon icon="fa-solid fa-gamepad" />
          <h1>Retroklub</h1>
        </div>
        <button>
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </button>
      </div>
    </header>
  )
}

export default Header