import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Invalid credentials'); setLoading(false); return }
      login(data.user)
      navigate('/dashboard')
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#18120F] flex flex-col font-['Poppins']">

      <header className="flex justify-between items-center px-6 py-4 border-b border-[#8B1538]/08">
        <div
          className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#8B1538] tracking-wide cursor-pointer"
          onClick={() => navigate('/')}
        >
          Content Studio AI
        </div>
        <button onClick={toggleDarkMode} className="w-8 h-8 flex items-center justify-center text-[#6B6058] dark:text-[#C0B4AC] hover:text-[#8B1538] transition-colors">
          <i className={`ti ${darkMode ? 'ti-sun' : 'ti-moon-stars'}`} style={{ fontSize: 18 }} />
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">
            Welcome back
          </h2>
          <p className="text-[#A89E96] text-sm mb-8">Sign in to your account</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-3 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC]">Password</label>
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-[#A89E96] hover:text-[#8B1538] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-3 pr-11 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89E96] hover:text-[#8B1538] transition-colors"
                >
                  <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'}`} style={{ fontSize: 16 }} />
                </button>
              </div>
            </div>

            {error && <p className="text-[#8B1538] text-xs">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full font-medium text-sm hover:bg-[#6b0f2b] transition-all disabled:opacity-50 shadow-md mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {loading && (
              <p className="text-center text-xs text-[#A89E96] italic">
                First request may take ~30 seconds to wake the server...
              </p>
            )}
          </div>

          <p className="text-center text-xs text-[#A89E96] mt-6">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-[#8B1538] font-medium hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}