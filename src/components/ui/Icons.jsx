// HOME ICON
export function HomeIcon({ size = 22, active = false }) {
  const main = active ? '#8B1538' : '#6B6058'
  const accent = active ? '#A89E96' : '#8B1538'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z" stroke={main} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="9" y="14" width="6" height="8" rx="0.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// CHAT ICON — for Crimson
export function ChatIcon({ size = 22, active = false }) {
  const main = active ? '#8B1538' : '#6B6058'
  const accent = active ? '#A89E96' : '#8B1538'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={main} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="8" y1="9.5" x2="16" y2="9.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="13" x2="13" y2="13" stroke={accent} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// STUDIO ICON — calendar
export function StudioIcon({ size = 22, active = false }) {
  const main = active ? '#8B1538' : '#6B6058'
  const accent = active ? '#A89E96' : '#8B1538'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2.5" stroke={main} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="3" y1="9" x2="21" y2="9" stroke={main} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke={main} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke={main} strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="8" cy="14" r="1" fill={accent}/>
      <circle cx="12" cy="14" r="1" fill={accent}/>
      <circle cx="16" cy="14" r="1" fill={main} opacity="0.4"/>
      <circle cx="8" cy="18" r="1" fill={main} opacity="0.4"/>
      <circle cx="12" cy="18" r="1" fill={main} opacity="0.4"/>
    </svg>
  )
}

// LIBRARY ICON — books
export function LibraryIcon({ size = 22, active = false }) {
  const main = active ? '#8B1538' : '#6B6058'
  const accent = active ? '#A89E96' : '#8B1538'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="4.5" height="17" rx="1" stroke={main} strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="9.5" y="6" width="4.5" height="15" rx="1" stroke={main} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M16.5 7l3.5 14" stroke={main} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11.75 6v4l1.5-1.5 1.5 1.5V6" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// LOUNGE ICON — people
export function LoungeIcon({ size = 22, active = false }) {
  const main = active ? '#8B1538' : '#6B6058'
  const accent = active ? '#A89E96' : '#8B1538'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="18" cy="8" r="2.5" stroke={main} strokeWidth="1.4" opacity="0.6"/>
      <path d="M22 20v-1a5 5 0 00-3.5-4.8" stroke={main} strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
      <circle cx="9" cy="7" r="3" stroke={accent} strokeWidth="1.4"/>
      <path d="M2 21v-1a7 7 0 0114 0v1" stroke={accent} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

// SPARK ICON
export function SparkIcon({ size = 22, color = '#8B1538' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="19" cy="5" r="1.2" fill={color} opacity="0.6"/>
    </svg>
  )
}

// FLAME ICON
export function FlameIcon({ size = 22, color = '#8B1538' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2c0 6-6 8-6 13a6 6 0 0012 0c0-5-6-7-6-13z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12c0 3-2 4-2 6a2 2 0 004 0c0-2-2-3-2-6z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// CROWN ICON
export function CrownIcon({ size = 18, color = '#C4902A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2 18l3-9 4 5 3-8 3 8 4-5 3 9H2z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="2" y1="21" x2="22" y2="21" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

// SUN ICON
export function SunIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.4"/>
      <line x1="12" y1="2" x2="12" y2="4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="12" y1="20" x2="12" y2="22" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="4" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="20" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

// MOON ICON
export function MoonIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}// BOOK ICON — for reads
export function BookIcon({ size = 22, color = '#8B1538' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="7" x2="15" y2="7" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="9" y1="11" x2="15" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

// INSTAGRAM ICON
export function InstagramIcon({ size = 18, color = '#6B6058' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.4"/>
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.4"/>
      <circle cx="17.5" cy="6.5" r="1" fill={color}/>
    </svg>
  )
}

// TIKTOK ICON
export function TikTokIcon({ size = 18, color = '#6B6058' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ROCKET ICON
export function RocketIcon({ size = 22, color = '#8B1538' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 7 6 7 13l5 2 5-2c0-7-5-11-5-11z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 13l-2 4 4-1" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 13l2 4-4-1" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="11" r="1.5" stroke={color} strokeWidth="1.2"/>
    </svg>
  )
}

// CHART ICON
export function ChartIcon({ size = 22, color = '#8B1538' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="3" y1="21" x2="21" y2="21" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="5" y="14" width="3" height="7" rx="0.5" stroke={color} strokeWidth="1.4"/>
      <rect x="10.5" y="9" width="3" height="12" rx="0.5" stroke={color} strokeWidth="1.4"/>
      <rect x="16" y="4" width="3" height="17" rx="0.5" stroke={color} strokeWidth="1.4"/>
    </svg>
  )
}

// COIN/MONEY ICON
export function CoinIcon({ size = 22, color = '#C4902A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.4"/>
      <path d="M12 7v1m0 8v1m-3-5h4a1 1 0 010 2h-2a1 1 0 000 2h4m-4-4h-1" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

// PEN ICON
export function PenIcon({ size = 22, color = '#8B1538' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 20h9" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// STAR ICON — for spotlights
export function StarIcon({ size = 22, color = '#8B1538' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}