import { create } from 'zustand'

export const useThemeStore = create((set, get) => ({
  themes: [],
  selectedTheme: '',
  fetchThemes: async () => {
    const response = await fetch('https://retroclub.vercel.app/api/getThemes')
    const data = await response.json()
    set({ themes: data })
  },
  setSelectedTheme: (theme) => {
    const themes = get().themes
    const selectedThemeData = themes.find(t => t.name === theme)
    set({ selectedTheme: theme, selectedThemeGames: selectedThemeData ? selectedThemeData.games : [] })
    console.log(selectedThemeData.games)
  },
  selectedThemeGames: []
}))
