import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('dark')

  if (localStorage.getItem('theme')) {
    theme.value = localStorage.getItem('theme') as string
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'harmony' ? 'dark' : 'harmony'
    localStorage.setItem('theme', theme.value)
  }
  return { theme, toggleTheme }
})
