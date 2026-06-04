import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { SparkIcon } from '../ui/Icons'

const API_URL = import.meta.env.VITE_API_URL

export default function Profile() {
  const { user, logout, updateUser, tier } = useAuth()
  const navigate = useNavigate()
  const [bio, setBio] = useState(user?.bio || '')
  const [saved, setSaved] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)

  const firstName = user?.first_name || user?.name?.split(' ')[0] || ''
  const lastName = user?.last_name || user?.name?.split(' ').slice(1).join(' ') || ''
  const initial = firstName.charAt(0).toUpperCase()

  const saveBio = () => {
    updateUser({ bio })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleUpgrade = async () => {
    setCheckingOut(true)
    try {
      const res = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          priceId: import.meta.env.VITE_ACTIVE_PRICE === 'founding'
            ? import.meta.env.VITE_STRIPE_FOUNDING_PRICE
            : import.meta.env.VITE_STRIPE_PRO_PRICE
        })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
    }
    setCheckingOut(false)
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div className="px-4 pt-6 pb-8">

        {/* PROFILE HERO */}
        <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-6 mb-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B1538] to-[#c41e3a] flex items-center justify-center text-[#FAF8F5] text-3xl font-semibold font-['Cormorant_Garamond'] mx-auto mb-4 shadow-lg">
            {initial}
          </div>
          <div className="font-['Cormorant_Garamond'] italic text-2xl text-[#1A1008] dark:text-[#F0EBE5] mb-1">
            {firstName} {lastName}
          </div>
          <div className="text-[#A89E96] text-xs mb-2">@{user?.username}</div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] bg-[#8B1538]/08 text-[#8B1538] px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
              {tier === 'pro' ? '✦ Pro' : tier === 'founding' ? '✦ Founding' : 'Starter'}
            </span>
            <span className="text-[10px] text-[#A89E96]">{user?.niche}</span>
          </div>
        </div>

        {/* BIO */}
        <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-5 mb-4">
          <div className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-3">Your Bio</div>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell your audience about yourself..."
            rows={4}
            className="w-full bg-[#FAF8F5] dark:bg-[#18120F] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-3 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors resize-none mb-3"
            style={{ fontSize: '16px' }}
          />
          <button
            onClick={saveBio}
            className={`w-full py-2.5 rounded-full text-sm font-medium transition-all ${
              saved ? 'bg-green-500 text-white' : 'bg-[#8B1538] text-[#FAF8F5] hover:bg-[#6b0f2b]'
            }`}
          >
            {saved ? '✓ Saved!' : 'Save Bio'}
          </button>
        </div>

        {/* ACCOUNT DETAILS */}
        <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-5 mb-4">
          <div className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-4">Account</div>
          <div className="space-y-3">
            {[
              { label: 'Email', value: user?.email },
              { label: 'Username', value: `@${user?.username}` },
              { label: 'Niche', value: user?.niche },
              { label: 'Tone', value: user?.tone },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-[#EDE8E3] dark:border-[#3A2E28] last:border-0">
                <span className="text-xs text-[#A89E96] font-medium uppercase tracking-wide">{label}</span>
                <span className="text-sm text-[#6B6058] dark:text-[#C0B4AC]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* UPGRADE */}
        {tier !== 'pro' && tier !== 'founding' && (
          <div className="bg-[#8B1538] rounded-2xl p-5 mb-4 text-[#FAF8F5]">
            <div className="flex items-center gap-2 mb-2">
              <SparkIcon size={16} color="#FAF8F5" />
              <span className="font-['Cormorant_Garamond'] italic text-lg">Upgrade to Pro</span>
            </div>
            <p className="text-[#FAF8F5]/70 text-xs mb-4">Unlimited Crimson, premium content, priority access and more.</p>
            <button
              onClick={handleUpgrade}
              disabled={checkingOut}
              className="w-full bg-[#FAF8F5] text-[#8B1538] py-2.5 rounded-full text-sm font-semibold hover:bg-white transition-all disabled:opacity-50"
            >
              {checkingOut ? 'Loading...' : 'Upgrade — $19/mo (Founding Member)'}
            </button>
          </div>
        )}

        {/* SIGN OUT */}
        <button
          onClick={handleLogout}
          className="w-full border border-[#EDE8E3] dark:border-[#3A2E28] text-[#A89E96] py-3 rounded-full text-sm font-medium hover:border-[#8B1538] hover:text-[#8B1538] transition-all"
        >
          Sign Out
        </button>

      </div>
    </div>
  )
}