import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { SunIcon, MoonIcon } from '../ui/Icons'

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate()

  const initial = user?.first_name 
    ? user.first_name.charAt(0).toUpperCase() 
    : user?.name?.charAt(0).toUpperCase() || '?'

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 dark:bg-[#18120F]/90 backdrop-blur border-b border-[#8B1538]/10 dark:border-[#8B1538]/20 px-5 py-3 flex justify-between items-center">
      
      <div
        className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#8B1538] tracking-wide cursor-pointer select-none"
        onClick={() => navigate('/dashboard')}
      >
        Content Studio AI
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#8B1538]/10 text-[#6B6058] dark:text-[#C0B4AC] transition-all hover:text-[#8B1538]"
        >
          {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B1538] to-[#c41e3a] text-[#FAF8F5] text-sm font-semibold flex items-center justify-center hover:scale-105 transition-transform shadow-md"
        >
          {initial}
        </button>
      </div>
    </header>
  )
}