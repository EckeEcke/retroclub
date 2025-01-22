import './Header.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
    const [isOpen, setIsOpen] = useState(false)
  
    const openModal = () => {
      setIsOpen(true)
    }
  
    const closeModal = () => {
      setIsOpen(false)
    }
  return (
    <header>
      <div class="container container-header">
        <div class="logo-wrapper">
          <FontAwesomeIcon icon="fa-solid fa-gamepad" />
          <h1>Retroclub</h1>
        </div>
        <button>
          <FontAwesomeIcon icon="fa-solid fa-user" onClick={openModal} />
        </button>
      </div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Anmelden</h2>
            <form>
              <input placeholder="Passwort eingeben" type="text" />
              <button type="submit">Senden</button>
            </form>
            
          </div>
        </div>
      )}
    </header>
  )
}

export default Header