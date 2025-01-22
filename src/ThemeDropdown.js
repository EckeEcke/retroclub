import { useState } from 'react'
import './ThemeDropdown.css'

const themes = ["Shootemups", "Weird", "Super Mario"]

const ThemeDropdown = () => {
  const [selectedTheme, setSelectedTheme] = useState('')

  const handleChange = (event) => {
    setSelectedTheme(event.target.value)
  }

  return (
    <div class="theme-dropdown">
        <select id="theme-dropdown" value={selectedTheme} onChange={handleChange}>
            <option value="" disabled>Select a theme</option>
            {themes.map((theme, index) => (
            <option key={index} value={theme}>
                {theme}
            </option>
            ))}
        </select>
        {selectedTheme && <h2>{selectedTheme}</h2>}
    </div>
  )
}

export default ThemeDropdown
