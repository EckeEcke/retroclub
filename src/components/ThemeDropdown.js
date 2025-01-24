import { useState, useEffect } from 'react'
import '../css/ThemeDropdown.css'
import { useThemeStore } from '../store/store'

const ThemeDropdown = () => {
  const themes = useThemeStore((state) => state.themes)
  const fetchThemes = useThemeStore((state) => state.fetchThemes)
  const setSelectedTheme = useThemeStore((state) => state.setSelectedTheme)

  useEffect(() => {
    fetchThemes()
  }, [fetchThemes])

  const [localSelectedTheme, setLocalSelectedTheme] = useState('')

  const handleChange = (event) => {
    const theme = event.target.value
    setLocalSelectedTheme(theme)
    setSelectedTheme(theme)
  }

  return (
    <div className="theme-dropdown">
      {themes.length === 0 ? (
        <div class="loader"></div>
      ) : (
      <select id="theme-dropdown" value={localSelectedTheme} onChange={handleChange}>
        <option value="" disabled>Wähle ein Thema</option>
        {themes.map((theme, index) => (
          <option key={index} value={theme.name}>
            {theme.name}
          </option>
        ))}
      </select>)}
      {localSelectedTheme && <h2>{localSelectedTheme}</h2>}
    </div>
  )
}

export default ThemeDropdown
