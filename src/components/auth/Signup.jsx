import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const API_URL = import.meta.env.VITE_API_URL

export default function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '',
    email: '', password: '', confirm_password: '',
    niche: '', tone: 'Professional', bio: ''
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSignup = async () => {
    setError('')
    if (form.password !== form.confirm_password) { setError('Passwords do not match'); return }
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.first_name} ${form.last_name}`,
          first_name: form.first_name,
          last_name: form.last_name,
          username: form.username,
          email: form.email,
          password: form.password,
          niche: form.niche,
          tone: form.tone,
          bio: form.bio
        })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Signup failed'); setLoading(false); return }
      login(data.user)
      navigate('/dashboard')
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  const inputClass = "w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-3 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors"
  const labelClass = "block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5"

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#18120F] flex flex-col font-['Poppins']">

      {/* HEADER */}
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

          {/* STEP INDICATOR */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all ${step >= s ? 'bg-[#8B1538]' : 'bg-[#EDE8E3] dark:bg-[#3A2E28]'}`} />
            ))}
          </div>

          {step === 1 && (
            <>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">
                Create your account
              </h2>
              <p className="text-[#A89E96] text-sm mb-8">Tell us about yourself</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input type="text" value={form.first_name} onChange={e => update('first_name', e.target.value)} placeholder="First Name" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" value={form.last_name} onChange={e => update('last_name', e.target.value)} placeholder="Last Name" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Username</label>
                  <input type="text" value={form.username} onChange={e => update('username', e.target.value)} placeholder="sydney_creates" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Your Niche</label>
                  <input type="text" value={form.niche} onChange={e => update('niche', e.target.value)} placeholder="e.g. Fitness, SAHM, Lifestyle..." className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Content Tone</label>
                  <select value={form.tone} onChange={e => update('tone', e.target.value)} className={inputClass}>
                    <option value="Professional">Professional</option>
                    <option value="Casual">Casual</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    if (!form.first_name || !form.last_name || !form.username || !form.niche) {
                      setError('Please fill in all fields')
                      return
                    }
                    setError('')
                    setStep(2)
                  }}
                  className="w-full bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full font-medium text-sm hover:bg-[#6b0f2b] transition-all shadow-md"
                >
                  Continue
                </button>

                {error && <p className="text-[#8B1538] text-xs text-center">{error}</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">
                Almost there
              </h2>
              <p className="text-[#A89E96] text-sm mb-8">Set up your login details</p>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Password</label>
                  <input type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <input type="password" value={form.confirm_password} onChange={e => update('confirm_password', e.target.value)} placeholder="••••••••" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Bio <span className="text-[#C0B4AC]">(optional)</span></label>
                  <textarea value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="Tell your audience about yourself..." rows={3} className={`${inputClass} resize-none`} />
                </div>

                {error && <p className="text-[#8B1538] text-xs">{error}</p>}

                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full font-medium text-sm hover:bg-[#6b0f2b] transition-all disabled:opacity-50 shadow-md"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-[#A89E96] text-xs hover:text-[#8B1538] transition-colors"
                >
                  ← Back
                </button>

                {loading && (
                  <p className="text-center text-xs text-[#A89E96] italic">
                    First request may take ~30 seconds...
                  </p>
                )}
              </div>
            </>
          )}

          <p className="text-center text-xs text-[#A89E96] mt-6">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-[#8B1538] font-medium hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}