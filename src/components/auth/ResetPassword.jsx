import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { darkMode, toggleDarkMode } = useTheme()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new one.')
    }
  }, [token])

  const handleReset = async () => {
    if (!password || !confirmPassword) { setError('Please fill in all fields'); return }
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
      setSuccess(true)
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-3 pr-11 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors"

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

          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ti ti-check text-green-600" style={{ fontSize: 28 }} />
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-2">
                Password updated!
              </h2>
              <p className="text-[#6B6058] dark:text-[#C0B4AC] text-sm mb-6">
                Your password has been reset successfully.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full font-medium text-sm hover:bg-[#6b0f2b] transition-all shadow-md"
              >
                Sign In
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">
                Set new password
              </h2>
              <p className="text-[#A89E96] text-sm mb-8">
                Choose a strong password for your account.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputClass}
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

                <div>
                  <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleReset()}
                      placeholder="••••••••"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89E96] hover:text-[#8B1538] transition-colors"
                    >
                      <i className={`ti ${showConfirmPassword ? 'ti-eye-off' : 'ti-eye'}`} style={{ fontSize: 16 }} />
                    </button>
                  </div>
                </div>

                {error && <p className="text-[#8B1538] text-xs">{error}</p>}

                <button
                  onClick={handleReset}
                  disabled={loading || !token}
                  className="w-full bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full font-medium text-sm hover:bg-[#6b0f2b] transition-all disabled:opacity-50 shadow-md"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}