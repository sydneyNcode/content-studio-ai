import { useState } from 'react'
import { LibraryIcon } from '../ui/Icons'

const INSTAGRAM = [
  { title: 'Hook Formula #1', content: '"I used to... until I discovered..."' },
  { title: 'Story Starter', content: '"Nobody talks about how..."' },
  { title: 'Question Hook', content: '"What if I told you..."' },
  { title: 'Bold Statement', content: '"This changed everything."' },
  { title: 'Curiosity Hook', content: '"This is not what you think..."' },
  { title: 'Benefit Hook', content: '"Here\'s how to... in 3 steps"' },
]

const TIKTOK = [
  { title: 'Story Time', content: '"Let me tell you about the time..."' },
  { title: 'POV Hook', content: '"POV: You\'re learning..."' },
  { title: 'Before/After', content: 'Visual transformation with text overlay' },
  { title: 'Duet Bait', content: 'Controversial or relatable statement' },
  { title: 'Educational Tip', content: '1 valuable tip in 15 seconds' },
  { title: 'Trending Format', content: 'Use trending audio + quick cuts' },
]

const COURSES = [
  { icon: '🚀', title: 'SWC 2.0', desc: 'The complete creator growth course' },
  { icon: '📈', title: 'Algorithm Mastery', desc: 'TikTok & Instagram in 2025' },
  { icon: '💰', title: 'Monetize Your Content', desc: 'Turn followers into income' },
]

export default function Resources() {
  const [copied, setCopied] = useState(null)
  const [tab, setTab] = useState('instagram')

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const templates = tab === 'instagram' ? INSTAGRAM : TIKTOK

  return (
    <div className="px-4 pt-6 pb-4">

      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <LibraryIcon size={22} active={true} />
          <h2 className="font-['Cormorant_Garamond'] italic text-2xl text-[#8B1538]">Library</h2>
        </div>
        <p className="text-[#A89E96] text-xs">Templates, tools & learning</p>
      </div>

      {/* TEMPLATES */}
      <div className="mb-6">
        <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-3">Content Hooks</h3>

        {/* TABS */}
        <div className="flex gap-2 mb-4">
          {['instagram', 'tiktok'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                tab === t
                  ? 'bg-[#8B1538] text-[#FAF8F5]'
                  : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058] dark:text-[#C0B4AC]'
              }`}
            >
              {t === 'instagram' ? '📸 Instagram' : '🎬 TikTok'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {templates.map((t, i) => (
            <div key={i} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">{t.title}</div>
                  <div className="text-[#6B6058] dark:text-[#C0B4AC] text-xs italic leading-relaxed">{t.content}</div>
                </div>
                <button
                  onClick={() => copy(t.content, i)}
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
                    copied === i
                      ? 'bg-[#8B1538] text-[#FAF8F5] border-[#8B1538]'
                      : 'border-[#EDE8E3] dark:border-[#3A2E28] text-[#A89E96] hover:border-[#8B1538] hover:text-[#8B1538]'
                  }`}
                >
                  {copied === i ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COURSES */}
      <div>
        <h3 className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-3">Courses</h3>
        <div className="space-y-3">
          {COURSES.map((c, i) => (
            <div key={i} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4 flex items-center gap-4">
              <div className="text-2xl">{c.icon}</div>
              <div className="flex-1">
                <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#1A1008] dark:text-[#F0EBE5]">{c.title}</div>
                <div className="text-[#A89E96] text-xs">{c.desc}</div>
              </div>
              <span className="text-[10px] bg-[#8B1538]/08 text-[#8B1538] px-2.5 py-1 rounded-full font-medium">Soon</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}