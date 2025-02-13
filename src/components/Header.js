import '../css/Header.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useThemeStore } from '../store/store'

  function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const setKey = useThemeStore((state) => state.setKey)
    const setName = useThemeStore((state) => state.setName)
    const isLoggedIn = useThemeStore((state) => state.isLoggedIn)
    const logout = useThemeStore((state) => state.logout)
    const name = useThemeStore((state) => state.name)
    const setHideRatings = useThemeStore(state => state.setHideRatings)
    const hideRatings = useThemeStore(state => state.hideRatings)

    const navigate = useNavigate()

  const handleEditButtonClick = () => {
    navigate('/edit')
    closeModal()
  }

  const handleLogoClick = () => {
    navigate('/')
  }
  
    const openModal = () => {
      setIsOpen(true)
    }
  
    const closeModal = () => {
      setIsOpen(false)
    }

    const handleLogout = () => {
      logout()
      setMessage('')
      closeModal()
    }

    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/authentication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    const data = await response.json()
    if (response.ok) {
      setMessage(`Moin ${data.name}!`)
      setKey(data.key)
      setName(data.name)
      localStorage.setItem('retroclub-key', data.key)
      localStorage.setItem('retroclub-name', data.name)
      closeModal()
    } else {
      setMessage(`Fehler: ${data.error}`)
    }
  }

  const handleCheckboxChange = (event) => {
    console.log(event.target.checked)
    setHideRatings(event.target.checked)
  }

  return (
    <header>
      <div class="container container-header">
        <div class="logo-wrapper" onClick={handleLogoClick}>
          <FontAwesomeIcon icon="fa-solid fa-gamepad" />
          <h1>Retroclub</h1>
        </div>
        <button onClick={openModal} className={isLoggedIn() ? 'authenticated' : ''}>
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </button>
      </div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {isLoggedIn() ? (
              <div>
                <h2>Moin {name}!</h2>
                <div class="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={hideRatings}
                    onChange={handleCheckboxChange}
                  />
                  <div>Bewertungen ausblenden</div>
                </div>
                <button class="edit-button" onClick={handleEditButtonClick}>Bewertungen bearbeiten</button>
                <button class="logout-button" onClick={handleLogout}>Abmelden</button>
              </div>
            ) : (
              <div>
                <h2>Anmelden</h2>
                <form onSubmit={handleSubmit}>
                  <input 
                    placeholder="Passwort eingeben" 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                  <button type="submit">Senden</button>
                  {message && <p>{message}</p>}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header