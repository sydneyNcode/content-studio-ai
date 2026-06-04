import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('csai_darkMode')
    if (saved) setDarkMode(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', darkMode ? '#18120F' : '#FAF8F5')
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('csai_darkMode', JSON.stringify(!prev))
      return !prev
    })
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div
        className={darkMode ? 'dark' : ''}
        style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)