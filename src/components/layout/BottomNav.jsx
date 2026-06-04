import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
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
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height
        const windowHeight = window.screen.height
        setKeyboardOpen(viewportHeight < windowHeight * 0.75)
      }
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    return () => window.visualViewport?.removeEventListener('resize', handleResize)
  }, [])

  if (keyboardOpen) return null

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
      className="bg-[#FAF8F5]/95 dark:bg-[#18120F]/95 backdrop-blur border-t border-[#8B1538]/10 dark:border-[#8B1538]/20 flex"
    >
      {NAV_ITEMS.map(({ path, Icon, label }) => {
        const isActive = location.pathname === path
        const color = isActive ? '#8B1538' : '#A89E96'
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all"
          >
            <div className={`transition-transform ${isActive ? 'scale-110' : 'scale-100'}`}>
              <Icon size={22} color={color} active={isActive} />
            </div>
            <span
              className="text-[10px] font-['Poppins'] font-medium tracking-wide"
              style={{ color }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}