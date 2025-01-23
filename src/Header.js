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
      setMessage(`Key: ${data.key}`)
    } else {
      setMessage(`Error: ${data.error}`)
    }
  }

  return (
    <header>
      <div class="container container-header">
        <div class="logo-wrapper">
          <FontAwesomeIcon icon="fa-solid fa-gamepad" />
          <h1>Retroclub</h1>
        </div>
        <button onClick={openModal}>
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