import { StudioIcon, SparkIcon } from '../ui/Icons'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getWeekDates() {
  const today = new Date()
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(today.setDate(diff))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d.getDate()
  })
}

export default function Calendar() {
  const dates = getWeekDates()
  const today = new Date().getDay()
  const todayIndex = today === 0 ? 6 : today - 1

  return (
    <div className="px-4 pt-6 pb-4">

      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <StudioIcon size={22} active={true} />
          <h2 className="font-['Cormorant_Garamond'] italic text-2xl text-[#8B1538]">Studio</h2>
        </div>
        <p className="text-[#A89E96] text-xs">Plan and schedule your content</p>
      </div>

      {/* WEEK VIEW */}
      <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4 mb-4">
        <div className="text-xs font-semibold text-[#A89E96] uppercase tracking-widest mb-4">This Week</div>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-[#A89E96] font-medium">{day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                i === todayIndex
                  ? 'bg-[#8B1538] text-[#FAF8F5]'
                  : 'text-[#6B6058] dark:text-[#C0B4AC]'
              }`}>
                {dates[i]}
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${
                i === todayIndex ? 'bg-[#8B1538]' : 'bg-[#EDE8E3] dark:bg-[#3A2E28]'
              }`} />
            </div>
          ))}
        </div>
      </div>

      {/* COMING SOON */}
      <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <SparkIcon size={32} color="#8B1538" />
        </div>
        <h3 className="font-['Cormorant_Garamond'] italic text-xl text-[#8B1538] mb-2">
          Full Studio Coming Soon
        </h3>
        <p className="text-[#A89E96] text-sm leading-relaxed max-w-xs mx-auto">
          Schedule posts, plan your week, and let Crimson suggest the perfect content for each day.
        </p>
      </div>

    </div>
  )
}