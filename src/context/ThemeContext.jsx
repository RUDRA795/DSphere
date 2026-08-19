import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('dsphere_theme')
      if (saved === 'light' || saved === 'dark') return saved
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    } catch (e) {
      // ignore
    }
    return 'dark'
  })

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(theme)
      
      document.body.setAttribute('data-theme', theme)
      document.body.style.backgroundColor = theme === 'dark' ? '#02050D' : '#F8FAFC'
      document.body.style.color = theme === 'dark' ? '#FFFFFF' : '#0F172A'

      localStorage.setItem('dsphere_theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])


  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
