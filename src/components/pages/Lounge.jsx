import { LoungeIcon, SparkIcon } from '../ui/Icons'

export default function Community() {
  return (
    <div className="px-4 pt-6 pb-4">

      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <LoungeIcon size={22} active={true} />
          <h2 className="font-['Cormorant_Garamond'] italic text-2xl text-[#8B1538]">Lounge</h2>
        </div>
        <p className="text-[#A89E96] text-xs">Your creator community</p>
      </div>

      {/* POWER HOUR */}
      <div className="bg-[#8B1538] rounded-2xl p-5 mb-4 text-[#FAF8F5]">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-[#FAF8F5]/60 mb-2">Next Power Hour</div>
        <div className="font-['Cormorant_Garamond'] italic text-2xl mb-1">Coming Soon</div>
        <p className="text-[#FAF8F5]/70 text-xs leading-relaxed">
          Monthly group coaching calls with the community. Stay tuned for the first session!
        </p>
      </div>

      {/* COMMUNITY FEATURES */}
      <div className="space-y-3 mb-6">
        {[
          { icon: '🌹', title: 'Creator Spotlights', desc: 'Featured creators from our community' },
          { icon: '🔥', title: 'Leaderboard', desc: 'Top creators by streak and engagement' },
          { icon: '💬', title: 'Community Chat', desc: 'Connect with creators in your niche' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4 flex items-center gap-4">
            <div className="text-2xl">{item.icon}</div>
            <div className="flex-1">
              <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#1A1008] dark:text-[#F0EBE5]">{item.title}</div>
              <div className="text-[#A89E96] text-xs">{item.desc}</div>
            </div>
            <span className="text-[10px] bg-[#8B1538]/08 text-[#8B1538] px-2.5 py-1 rounded-full font-medium flex-shrink-0">Soon</span>
          </div>
        ))}
      </div>

      {/* COMING SOON */}
      <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <SparkIcon size={32} color="#8B1538" />
        </div>
        <h3 className="font-['Cormorant_Garamond'] italic text-xl text-[#8B1538] mb-2">
          The Lounge is Opening Soon
        </h3>
        <p className="text-[#A89E96] text-sm leading-relaxed max-w-xs mx-auto">
          A beautiful space to connect, share wins, and grow alongside creators who get it.
        </p>
      </div>

    </div>
  )
}