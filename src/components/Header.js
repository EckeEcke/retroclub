import '../css/Header.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useThemeStore } from '../store/store'

  function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const setKey = useThemeStore((state) => state.setKey)
    const setName = useThemeStore((state) => state.setName)
    const key = useThemeStore((state) => state.key)
  
    const openModal = () => {
      setIsOpen(true)
    }
  
    const closeModal = () => {
      setIsOpen(false)
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
      setTimeout(() => closeModal(), 1000)
    } else {
      setMessage(`Fehler: ${data.error}`)
    }
  }

  return (
    <header>
      <div class="container container-header">
        <div class="logo-wrapper">
          <FontAwesomeIcon icon="fa-solid fa-gamepad" />
          <h1>Retroclub</h1>
        </div>
        <button onClick={openModal} className={key.length > 0 ? 'authenticated' : ''}>
          <FontAwesomeIcon icon="fa-solid fa-user" />
        </button>
      </div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
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
        </div>
      )}
    </header>
  )
}

export default Header