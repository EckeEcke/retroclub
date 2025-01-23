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
      const themeIndex = state.themes.findIndex(t => t.name === themeName)
      if (themeIndex !== -1) {
        const updatedThemes = [...state.themes]
        const gameIndex = updatedThemes[themeIndex].games.findIndex(g => g.id === gameId)
        if (gameIndex !== -1) {
          const updatedGames = [...updatedThemes[themeIndex].games]
          const game = { ...updatedGames[gameIndex] }
          if (!game.ratings) {
            game.ratings = {}
          }
          game.ratings[state.name] = rating
          updatedGames[gameIndex] = game
          updatedThemes[themeIndex] = { ...updatedThemes[themeIndex], games: updatedGames }
          return { themes: updatedThemes }
        }
      }
  })}
}))
