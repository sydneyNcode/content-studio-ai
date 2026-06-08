import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const FEATURES = [
  { icon: 'ti-sparkles', title: 'Crimson AI', desc: 'Your personal content coach. Knows your niche, your tone, your goals.' },
  { icon: 'ti-calendar', title: 'Content Calendar', desc: 'Plan your week visually. Never run out of ideas again.' },
  { icon: 'ti-books', title: 'Resource Library', desc: 'Proven hooks, templates, and courses in one beautiful place.' },
  { icon: 'ti-flame', title: 'Streak Tracking', desc: 'Build momentum with streaks, points, and badges every day.' },
  { icon: 'ti-users', title: 'Creator Community', desc: 'Connect, grow, and join Power Hour calls with your tribe.' },
  { icon: 'ti-sun', title: 'Daily Picks', desc: 'Crimson curates a fresh content tip every single day, just for you.' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#18120F] text-[#1A1008] dark:text-[#F0EBE5] font-['Poppins']">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#8B1538]/08">
        <div className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#8B1538] tracking-wide">
          Content Studio AI
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 flex items-center justify-center text-[#6B6058] dark:text-[#C0B4AC] hover:text-[#8B1538] transition-colors"
          >
            <i className={`ti ${darkMode ? 'ti-sun' : 'ti-moon-stars'}`} style={{ fontSize: 18 }} />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-[#6B6058] dark:text-[#C0B4AC] hover:text-[#8B1538] transition-colors font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/founding')}
            className="bg-[#8B1538] text-[#FAF8F5] text-sm font-medium px-4 py-2 rounded-full hover:bg-[#6b0f2b] transition-all shadow-sm"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="font-['Cormorant_Garamond'] text-5xl font-semibold leading-tight mb-4 text-[#1A1008] dark:text-[#F0EBE5]">
          Your Creator <span className="italic text-[#8B1538]">Command Center</span>
        </h1>
        <p className="text-[#6B6058] dark:text-[#C0B4AC] text-base leading-relaxed max-w-md mx-auto mb-8">
          Content ideas, planning, and community — all in one beautiful place. Meet Crimson, your personal AI coach.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => navigate('/founding')}
            className="bg-[#8B1538] text-[#FAF8F5] px-6 py-3 rounded-full font-medium hover:bg-[#6b0f2b] transition-all shadow-md text-sm"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-[#8B1538]/30 text-[#8B1538] px-6 py-3 rounded-full font-medium hover:bg-[#8B1538]/05 transition-all text-sm"
          >
            Login
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-5 hover:border-[#8B1538]/30 transition-all">
              <i className={`ti ${f.icon} text-[#8B1538] mb-3 block`} style={{ fontSize: 22 }} />
              <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold mb-1 text-[#1A1008] dark:text-[#F0EBE5]">{f.title}</h3>
              <p className="text-[#A89E96] dark:text-[#8A7E78] text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-center mb-8 text-[#1A1008] dark:text-[#F0EBE5]">
          Simple. Powerful. <span className="italic text-[#8B1538]">Affordable.</span>
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-6">
            <div className="text-sm font-medium text-[#A89E96] mb-2">Starter</div>
            <div className="font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">Free</div>
            <div className="text-xs text-[#A89E96] mb-5">forever</div>
            <ul className="space-y-2 mb-6">
              {['3 Crimson chats/day', 'Templates & hooks', 'Community access', 'Daily picks'].map(f => (
                <li key={f} className="text-xs text-[#6B6058] dark:text-[#C0B4AC] flex items-center gap-2">
                  <i className="ti ti-check text-[#8B1538]" style={{ fontSize: 13 }} />{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/founding')}
              className="w-full border border-[#8B1538]/30 text-[#8B1538] py-2.5 rounded-full text-sm font-medium hover:bg-[#8B1538]/05 transition-all"
            >
              Get Started
            </button>
          </div>

          <div className="bg-[#8B1538] border border-[#8B1538] rounded-2xl p-6 text-[#FAF8F5]">
            <div className="text-sm font-medium text-[#FAF8F5]/70 mb-2">Creator Pro</div>
            <div className="font-['Cormorant_Garamond'] text-4xl font-semibold mb-1">$29</div>
            <div className="text-xs text-[#FAF8F5]/60 mb-5">per month</div>
            <ul className="space-y-2 mb-6">
              {['Unlimited Crimson AI', 'Priority access', 'Smart calendar', 'Advanced analytics'].map(f => (
                <li key={f} className="text-xs text-[#FAF8F5]/80 flex items-center gap-2">
                  <i className="ti ti-check" style={{ fontSize: 13 }} />{f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/founding')}
              className="w-full bg-[#FAF8F5] text-[#8B1538] py-2.5 rounded-full text-sm font-semibold hover:bg-white transition-all"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}