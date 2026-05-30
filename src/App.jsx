import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

import Landing from './components/landing/Landing'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Dashboard from './components/pages/Dashboard'
import Crimson from './components/pages/Crimson'
import Studio from './components/pages/Studio'
import Library from './components/pages/Library'
import Lounge from './components/pages/Lounge'
import Profile from './components/pages/Profile'
import Layout from './components/layout/Layout'

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#18120F] flex items-center justify-center">
      <div className="text-[#8B1538] font-['Cormorant_Garamond'] italic text-2xl">Loading...</div>
    </div>
  )
  return isLoggedIn ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#18120F] flex items-center justify-center">
      <div className="text-[#8B1538] font-['Cormorant_Garamond'] italic text-2xl">Loading...</div>
    </div>
  )
  return isLoggedIn ? <Navigate to="/dashboard" /> : children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/crimson" element={<ProtectedRoute><Layout><Crimson /></Layout></ProtectedRoute>} />
      <Route path="/studio" element={<ProtectedRoute><Layout><Studio /></Layout></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><Layout><Library /></Layout></ProtectedRoute>} />
      <Route path="/lounge" element={<ProtectedRoute><Layout><Lounge /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}