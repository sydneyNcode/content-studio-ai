import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon, ChatIcon, StudioIcon, LibraryIcon, LoungeIcon } from '../ui/Icons'

const NAV_ITEMS = [
  { path: '/dashboard', Icon: HomeIcon, label: 'Home' },
  { path: '/crimson', Icon: ChatIcon, label: 'Crimson' },
  { path: '/studio', Icon: StudioIcon, label: 'Studio' },
  { path: '/library', Icon: LibraryIcon, label: 'Library' },
  { path: '/lounge', Icon: LoungeIcon, label: 'Lounge' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 dark:bg-[#18120F]/95 backdrop-blur border-t border-[#8B1538]/10 dark:border-[#8B1538]/20 flex shadow-lg">
      {NAV_ITEMS.map(({ path, Icon, label }) => {
        const isActive = location.pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all"
          >
            <div className={`transition-transform ${isActive ? 'scale-110' : 'scale-100'}`}>
              <Icon size={22} active={isActive} />
            </div>
            <span
              className="text-[10px] font-['Poppins'] font-medium tracking-wide transition-all"
              style={{ color: isActive ? '#8B1538' : '#A89E96' }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}