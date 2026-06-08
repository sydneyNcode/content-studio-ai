import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function Founding() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!name || !email) { setError('Please fill in both fields'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/join-waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'founding' })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
      setSuccess(true)
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-['Poppins'] flex flex-col">

      {/* HEADER */}
      <div className="text-center pt-12 pb-6 px-6">
        <h1 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#8B1538] tracking-wide mb-1">
          Content Studio AI
        </h1>
        <div className="w-8 h-px bg-[#8B1538]/30 mx-auto" />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm">

          {!success ? (
            <>
              {/* HERO */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-[#8B1538]/08 text-[#8B1538] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                  ✦ Founding Members
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1008] leading-tight mb-4">
                  Your content deserves a real partner.
                </h2>
                <p className="text-[#6B6058] text-sm leading-relaxed">
                  Join the founding group and be first through the doors. Founding members get early access, a locked-in rate, and a direct line to shape what we build next.
                </p>
              </div>

              {/* FORM */}
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-white border border-[#EDE8E3] rounded-xl px-4 py-3.5 text-sm text-[#1A1008] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors"
                  style={{ fontSize: '16px' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  className="w-full bg-white border border-[#EDE8E3] rounded-xl px-4 py-3.5 text-sm text-[#1A1008] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors"
                  style={{ fontSize: '16px' }}
                />

                {error && <p className="text-[#8B1538] text-xs text-center">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-[#8B1538] text-[#FAF8F5] py-4 rounded-full font-medium text-sm hover:bg-[#6b0f2b] transition-all disabled:opacity-50 shadow-lg"
                >
                  {loading ? 'Saving your spot...' : 'Join the Founding Group 🌹'}
                </button>
              </div>

              <p className="text-center text-[#A89E96] text-xs">
                Founding spots are limited. No spam, ever.
              </p>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#8B1538]/08 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌹</span>
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#1A1008] mb-3">
                You're in!
              </h2>
              <p className="text-[#6B6058] text-sm leading-relaxed mb-2">
                Welcome to the founding group, {name}!
              </p>
              <p className="text-[#6B6058] text-sm leading-relaxed mb-6">
                Check your inbox — we just sent you a welcome email. We'll be in touch soon with everything you need to get started.
              </p>
              <div className="bg-[#FAF8F5] border border-[#EDE8E3] rounded-2xl p-4">
                <p className="text-[#8B1538] text-xs font-semibold uppercase tracking-widest mb-2">While you wait</p>
                <p className="text-[#6B6058] text-xs leading-relaxed">
                  Tell a creator friend — founding spots are limited and we'd love to have people you know in the community! 🌹
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center pb-8">
        <p className="text-[#C0B4AC] text-xs">
          © Content Studio AI · contentstudioai.app
        </p>
      </div>

    </div>
  )
}