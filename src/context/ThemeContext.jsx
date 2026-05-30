import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('csai_darkMode')
    if (saved) setDarkMode(JSON.parse(saved))
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('csai_darkMode', JSON.stringify(!prev))
      return !prev
    })
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? 'dark' : ''} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)