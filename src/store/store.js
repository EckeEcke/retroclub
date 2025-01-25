import { create } from 'zustand'

export const useThemeStore = create((set, get) => ({
  themes: [],
  selectedTheme: '',
  selectedThemeGames: [],
  key: localStorage.getItem('retroclub-key') || '',
  name: localStorage.getItem('retroclub-name') || '',
  fetchThemes: async () => {
    const response = await fetch('https://retroclub.vercel.app/api/getThemes')
    const data = await response.json()
    const allGames = data.map(theme => theme.games).flat()
    set({ themes: [ ...data, { name: 'Alle Games', games: allGames }] })
    const selectedTheme = get().selectedTheme
    if (selectedTheme.length > 0) {
        const selectedThemeData = data.find(theme => theme.name === selectedTheme)
        if (selectedThemeData) {
            set({ selectedThemeGames: selectedThemeData.games })
        }
    }
  },
  setSelectedTheme: (theme) => {
    const themes = get().themes
    const selectedThemeData = themes.find(t => t.name === theme)
    set({ selectedTheme: theme, selectedThemeGames: selectedThemeData ? selectedThemeData.games : [] })
  },
  setKey: (key) => set({ key }),
  setName: (name) => set({ name }),
}))
