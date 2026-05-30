import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChatIcon, StudioIcon, LibraryIcon, LoungeIcon, SparkIcon, FlameIcon, CrownIcon } from '../ui/Icons'

const DAILY_QUOTES = [
  "Create content that scares you a little.",
  "Consistency isn't about perfection. It's about showing up.",
  "Your story is your strategy.",
  "Done is better than perfect.",
  "Your audience is waiting for you to start.",
  "One piece of content today beats ten ideas tomorrow.",
  "Every big creator was once exactly where you are now.",
  "Your niche doesn't limit you. It focuses you.",
  "You don't need to go viral. You need to be valuable.",
  "Your voice is the one thing no algorithm can copy.",
  "Be the creator you needed when you were starting out.",
  "The best time to post was yesterday. Second best is now.",
  "You're not too late. You're right on time.",
  "Build in public. Grow in community.",
  "Post it. Learn. Improve. Repeat.",
]

const CRIMSON_PICKS = [
  "Hook them in the first 3 seconds — that's all you have before someone scrolls past.",
  "Batch your content this week. Two hours now saves seven panicked mornings.",
  "Study your best post from last month. What made it work? Do more of that.",
  "Your audience follows you because of YOU — not because you're perfect.",
  "Repurpose something old. That reel from 6 months ago could be a carousel today.",
  "Engage before you post. 10 minutes of genuine comments before you broadcast.",
  "Your caption's first line is everything. Make it impossible to scroll past.",
]

const ACTIONS = [
  { path: '/crimson', Icon: ChatIcon, title: 'Crimson', desc: 'Your AI coach' },
  { path: '/studio', Icon: StudioIcon, title: 'Studio', desc: 'Plan your week' },
  { path: '/library', Icon: LibraryIcon, title: 'Library', desc: 'Templates & courses' },
  { path: '/lounge', Icon: LoungeIcon, title: 'Lounge', desc: 'Your community' },
]

function getDailyItem(arr) {
  return arr[Math.floor(Date.now() / 86400000) % arr.length]
}

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user, tier } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showUpgraded, setShowUpgraded] = useState(searchParams.get('upgraded') === 'true')

  useEffect(() => {
    if (showUpgraded) {
      setTimeout(() => setShowUpgraded(false), 5000)
    }
  }, [])

  const firstName = user?.first_name || user?.name?.split(' ')[0] || 'Creator'
  const chatsRemaining = Math.max(0, 3 - (user?.chat_count_today || 0))
  const todayQuote = getDailyItem(DAILY_QUOTES)
  const crimsonPick = getDailyItem(CRIMSON_PICKS)

  return (
    <div className="pt-4 pb-2 px-4 flex flex-col gap-4">

      {/* UPGRADE SUCCESS */}
      {showUpgraded && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <div className="flex justify-center mb-2">
            <SparkIcon size={24} color="#15803d" />
          </div>
          <div className="text-green-700 font-['Cormorant_Garamond'] italic text-xl mb-1">
            Welcome to Pro!
          </div>
          <p className="text-green-600 text-xs">
            You now have unlimited Crimson and access to everything. Let's create!
          </p>
        </div>
      )}

      {/* GREETING */}
      <div className="text-center pt-1">
        <h1 className="font-['Cormorant_Garamond'] italic text-3xl text-[#8B1538] leading-tight">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-[#A89E96] dark:text-[#8A7E78] text-[11px] italic mt-1 max-w-xs mx-auto">
          "{todayQuote}"
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        {ACTIONS.map(({ path, Icon, title, desc }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-3.5 text-left hover:border-[#8B1538]/40 hover:shadow-md transition-all group"
          >
            <div className="mb-2 group-hover:scale-110 transition-transform w-fit">
              <Icon size={20} active={false} />
            </div>
            <div className="font-['Cormorant_Garamond'] text-sm font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
              {title}
            </div>
            <div className="text-[#A89E96] text-[10px] mt-0.5">{desc}</div>
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl p-2.5 text-center">
          <div className="flex justify-center mb-1"><FlameIcon size={16} color="#8B1538" /></div>
          <div className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">0</div>
          <div className="text-[#A89E96] text-[9px] uppercase tracking-wide font-medium">Streak</div>
        </div>
        <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl p-2.5 text-center">
          <div className="flex justify-center mb-1"><SparkIcon size={16} color="#8B1538" /></div>
          <div className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
            {tier === 'pro' ? '∞' : `${chatsRemaining}/3`}
          </div>
          <div className="text-[#A89E96] text-[9px] uppercase tracking-wide font-medium">AI Chats</div>
        </div>
        <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl p-2.5 text-center">
          <div className="flex justify-center mb-1"><CrownIcon size={16} color="#C4902A" /></div>
          <div className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
            {tier === 'pro' ? 'Pro' : 'Free'}
          </div>
          <div className="text-[#A89E96] text-[9px] uppercase tracking-wide font-medium">Plan</div>
        </div>
      </div>

      {/* CRIMSON'S DAILY PICK */}
      <div className="bg-white dark:bg-[#2A201A] border border-[#8B1538]/20 border-l-[3px] border-l-[#8B1538] rounded-2xl p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <SparkIcon size={12} color="#8B1538" />
          <span className="text-[#8B1538] text-[9px] font-semibold uppercase tracking-widest">
            Crimson's Daily Pick
          </span>
        </div>
        <p className="text-[#6B6058] dark:text-[#C0B4AC] text-xs leading-relaxed italic">
          {crimsonPick}
        </p>
      </div>

    </div>
  )
}