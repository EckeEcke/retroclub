import { create } from 'zustand'

export const useThemeStore = create((set, get) => ({
  themes: [],
  selectedTheme: '',
  selectedThemeGames: [],
  key: localStorage.getItem('retroclub-key') || '',
  name: localStorage.getItem('retroclub-name') || '',
  hideRatings: false,
  fetchThemes: async () => {
    const response = await fetch('https://retroclub.vercel.app/api/getThemes')
    const data = await response.json()
    const allGames = data.map(theme => theme.games).flat().sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
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
  setHideRatings: (hideRatings) => set({ hideRatings }),
  isLoggedIn: () => {
    const state = get()
    return state.key.length > 0 && state.name.length > 0
  },
  logout: () => {
    localStorage.removeItem('retroclub-key')
    localStorage.removeItem('retroclub-name')
    set({ key: '', name: '' })
  }
}))
