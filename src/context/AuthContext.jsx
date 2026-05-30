import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tier, setTier] = useState('free')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('csai_user')
    if (saved) {
      const u = JSON.parse(saved)
      setUser(u)
      setTier(u.tier || 'free')
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    setTier(userData.tier || 'free')
    setIsLoggedIn(true)
    localStorage.setItem('csai_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setTier('free')
    setIsLoggedIn(false)
    localStorage.removeItem('csai_user')
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('csai_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, tier, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)