import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useTheme()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email) { setError('Please enter your email'); return }
    setLoading(true)
    setError('')
    try {
      await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
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

          {!sent ? (
            <>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">
                Forgot your password?
              </h2>
              <p className="text-[#A89E96] text-sm mb-8">
                Enter your email and we'll send you a reset link.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="your@email.com"
                    className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-3 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors"
                  />
                </div>

                {error && <p className="text-[#8B1538] text-xs">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full font-medium text-sm hover:bg-[#6b0f2b] transition-all disabled:opacity-50 shadow-md"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#8B1538]/08 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ti ti-mail text-[#8B1538]" style={{ fontSize: 28 }} />
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-2">
                Check your email!
              </h2>
              <p className="text-[#6B6058] dark:text-[#C0B4AC] text-sm mb-6">
                If an account exists for <strong>{email}</strong>, you'll receive a reset link shortly.
              </p>
              <p className="text-[#A89E96] text-xs mb-6">
                The link expires in 1 hour.
              </p>
            </div>
          )}

          <button
            onClick={() => navigate('/login')}
            className="w-full text-[#A89E96] text-xs hover:text-[#8B1538] transition-colors mt-4 text-center block"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  )
}