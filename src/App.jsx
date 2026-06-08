import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Landing from './components/landing/Landing'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Dashboard from './components/pages/Dashboard'
import Crimson from './components/pages/Crimson'
import Studio from './components/pages/Studio'
import Library from './components/pages/Library'
import Lounge from './components/pages/Lounge'
import Profile from './components/pages/Profile'
import Founding from './components/pages/Founding'
import About from './components/pages/About'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/crimson" element={<ProtectedRoute><Layout><Crimson /></Layout></ProtectedRoute>} />
      <Route path="/studio" element={<ProtectedRoute><Layout><Studio /></Layout></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><Layout><Library /></Layout></ProtectedRoute>} />
      <Route path="/lounge" element={<ProtectedRoute><Layout><Lounge /></Layout></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Layout><Lounge /></Layout></ProtectedRoute>} />
      <Route path="/founding" element={<Founding />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
