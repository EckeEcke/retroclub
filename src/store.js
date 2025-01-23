import { create } from 'zustand'

export const useThemeStore = create((set, get) => ({
  themes: [],
  selectedTheme: '',
  selectedThemeGames: [],
  key: '',
  name: '',
  fetchThemes: async () => {
    const response = await fetch('https://retroclub.vercel.app/api/getThemes')
    const data = await response.json()
    set({ themes: data })
  },
  setSelectedTheme: (theme) => {
    const themes = get().themes
    const selectedThemeData = themes.find(t => t.name === theme)
    set({ selectedTheme: theme, selectedThemeGames: selectedThemeData ? selectedThemeData.games : [] })
  },
  setKey: (key) => set({ key }),
  setName: (name) => set({ name }),
  updateGameRating: (themeName, gameId, rating) => {
    set(state => {
      const theme = state.themes.find(t => t.name === themeName)
      if (theme) {
        const game = theme.games.find(g => g.id === gameId)
        if (game) {
          if (!game.ratings) {
            game.ratings = {}
          }
          game.ratings[state.name] = rating
        }
      }
    })
  }
}))
