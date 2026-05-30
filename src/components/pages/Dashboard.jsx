import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ChatIcon, StudioIcon, LibraryIcon, LoungeIcon, SparkIcon, FlameIcon, CrownIcon } from '../ui/Icons'

const DAILY_QUOTES = [
  "Create content that scares you a little. That's where the magic is.",
  "Consistency isn't about perfection. It's about showing up.",
  "Your story is your strategy.",
  "Done is better than perfect.",
  "Your audience is waiting for you to start.",
  "One piece of content today beats ten ideas tomorrow.",
  "Every big creator was once exactly where you are now.",
  "Your niche doesn't limit you. It focuses you.",
  "Post it. Learn. Improve. Repeat.",
  "You don't need to go viral. You need to be valuable.",
  "Your voice is the one thing no algorithm can copy.",
  "Be the creator you needed when you were starting out.",
  "The best time to post was yesterday. Second best is now.",
  "You're not too late. You're right on time.",
  "Build in public. Grow in community.",
]

const CRIMSON_PICKS = [
  "Hook them in the first 3 seconds. On TikTok or Instagram, you have less than a heartbeat to make someone stop scrolling. Start with your strongest line, not a warm-up.",
  "Batch your content this week. Set aside two hours and create 7 pieces at once. Your future self will thank you.",
  "Study your best-performing post from last month. What made it work? How can you recreate that energy?",
  "Your audience follows you because of YOU — not because you're perfect. Share something real this week.",
  "Repurpose something old into something new. That reel from 6 months ago could be a carousel today.",
  "Engage before you post. Spend 10 minutes commenting authentically on 5 accounts in your niche.",
  "Your caption is doing more work than you think. First line stops the scroll, body builds connection, CTA creates action.",
]

const ACTIONS = [
  { path: '/crimson', Icon: ChatIcon, title: 'Crimson', desc: 'Your AI coach is ready' },
  { path: '/studio', Icon: StudioIcon, title: 'Studio', desc: 'Plan your content week' },
  { path: '/library', Icon: LibraryIcon, title: 'Library', desc: 'Templates & courses' },
  { path: '/lounge', Icon: LoungeIcon, title: 'Lounge', desc: 'Your creator tribe' },
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

  const firstName = user?.first_name || user?.name?.split(' ')[0] || 'Creator'
  const chatsRemaining = Math.max(0, 3 - (user?.chat_count_today || 0))
  const todayQuote = getDailyItem(DAILY_QUOTES)
  const crimsonPick = getDailyItem(CRIMSON_PICKS)

  return (
    <div className="pt-6 pb-4">

      {/* GREETING */}
      <div className="text-center px-6 mb-8">
        <h1 className="font-['Cormorant_Garamond'] italic text-4xl text-[#8B1538] mb-2 leading-tight">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-[#A89E96] dark:text-[#8A7E78] text-xs italic leading-relaxed max-w-xs mx-auto">
          "{todayQuote}"
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {ACTIONS.map(({ path, Icon, title, desc }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4 text-left hover:border-[#8B1538]/40 hover:shadow-md transition-all group"
            >
              <div className="mb-3 group-hover:scale-110 transition-transform w-fit">
                <Icon size={22} active={false} />
              </div>
              <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-0.5">
                {title}
              </div>
              <div className="text-[#A89E96] text-xs">{desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-3 text-center">
            <div className="flex justify-center mb-1">
              <FlameIcon size={18} color="#8B1538" />
            </div>
            <div className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">0</div>
            <div className="text-[#A89E96] text-[10px] uppercase tracking-wide font-medium">Streak</div>
          </div>
          <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-3 text-center">
            <div className="flex justify-center mb-1">
              <SparkIcon size={18} color="#8B1538" />
            </div>
            <div className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
              {tier === 'pro' ? '∞' : `${chatsRemaining}/3`}
            </div>
            <div className="text-[#A89E96] text-[10px] uppercase tracking-wide font-medium">AI Chats</div>
          </div>
          <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-3 text-center">
            <div className="flex justify-center mb-1">
              <CrownIcon size={18} color="#C4902A" />
            </div>
            <div className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
              {tier === 'pro' ? 'Pro' : 'Free'}
            </div>
            <div className="text-[#A89E96] text-[10px] uppercase tracking-wide font-medium">Plan</div>
          </div>
        </div>
      </div>

      {/* CRIMSON'S DAILY PICK */}
      <div className="px-4">
        <div className="bg-white dark:bg-[#2A201A] border border-[#8B1538]/20 border-l-[3px] border-l-[#8B1538] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <SparkIcon size={13} color="#8B1538" />
            <span className="text-[#8B1538] text-[10px] font-semibold uppercase tracking-widest">
              Crimson's Daily Pick
            </span>
          </div>
          <p className="text-[#6B6058] dark:text-[#C0B4AC] text-sm leading-relaxed italic">
            {crimsonPick}
          </p>
        </div>
      </div>

    </div>
  )
}