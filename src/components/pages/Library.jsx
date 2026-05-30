import { useState } from 'react'
import { LibraryIcon, BookIcon, InstagramIcon, TikTokIcon, RocketIcon, ChartIcon, CoinIcon, PenIcon } from '../ui/Icons'

const TABS = ['Reads', 'Courses', 'Templates']

const READS = [
  { title: "The Creator's Starter Guide", desc: 'Everything you need to go from zero to posting confidently', tag: 'Free' },
  { title: 'Algorithm Secrets 2025', desc: 'How TikTok and Instagram actually decide who sees your content', tag: 'Pro' },
  { title: 'Content Batching Blueprint', desc: 'Create a month of content in one afternoon', tag: 'Pro' },
  { title: 'Hook Writing Handbook', desc: 'Stop the scroll every single time with proven formulas', tag: 'Soon' },
  { title: 'Monetization Roadmap', desc: 'Your step-by-step guide from creator to business owner', tag: 'Soon' },
]

const COURSES = [
  { Icon: RocketIcon, title: 'SWC 2.0', desc: 'The complete creator growth course — from zero to thriving', tag: 'Soon' },
  { Icon: ChartIcon, title: 'Algorithm Mastery', desc: 'Work with TikTok & Instagram algorithms, not against them', tag: 'Soon' },
  { Icon: CoinIcon, title: 'Monetize Your Content', desc: 'Brand deals, digital products, and passive income', tag: 'Soon' },
  { Icon: PenIcon, title: 'Caption Copywriting', desc: 'Write captions that convert scrollers into followers', tag: 'Soon' },
]

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

function TagBadge({ tag }) {
  const styles = {
    'Free': 'bg-green-50 text-green-700 border-green-200',
    'Pro': 'bg-[#8B1538]/08 text-[#8B1538] border-[#8B1538]/20',
    'Soon': 'bg-[#FAF8F5] dark:bg-[#18120F] text-[#A89E96] border-[#EDE8E3] dark:border-[#3A2E28]',
  }
  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${styles[tag]}`}>
      {tag}
    </span>
  )
}

export default function Library() {
  const [tab, setTab] = useState('Reads')
  const [templateTab, setTemplateTab] = useState('instagram')
  const [copied, setCopied] = useState(null)

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const templates = templateTab === 'instagram' ? INSTAGRAM : TIKTOK

  return (
    <div className="px-4 pt-6 pb-4">

      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <LibraryIcon size={22} active={true} />
          <h2 className="font-['Cormorant_Garamond'] italic text-2xl text-[#8B1538]">Library</h2>
        </div>
        <p className="text-[#A89E96] text-xs">Reads, courses & templates</p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-full text-xs font-medium transition-all ${
              tab === t
                ? 'bg-[#8B1538] text-[#FAF8F5]'
                : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058] dark:text-[#C0B4AC]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* READS */}
      {tab === 'Reads' && (
        <div className="space-y-3">
          {READS.map((r, i) => (
            <div key={i} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-12 bg-[#8B1538]/08 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookIcon size={20} color="#8B1538" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-0.5">{r.title}</div>
                <div className="text-[#A89E96] text-xs leading-relaxed">{r.desc}</div>
              </div>
              <TagBadge tag={r.tag} />
            </div>
          ))}
        </div>
      )}

      {/* COURSES */}
      {tab === 'Courses' && (
        <div className="space-y-3">
          {COURSES.map(({ Icon, title, desc, tag }, i) => (
            <div key={i} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#8B1538]/08 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={20} color="#8B1538" />
              </div>
              <div className="flex-1">
                <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-0.5">{title}</div>
                <div className="text-[#A89E96] text-xs leading-relaxed">{desc}</div>
              </div>
              <TagBadge tag={tag} />
            </div>
          ))}
        </div>
      )}

      {/* TEMPLATES */}
      {tab === 'Templates' && (
        <div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTemplateTab('instagram')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                templateTab === 'instagram'
                  ? 'bg-[#8B1538] text-[#FAF8F5]'
                  : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058] dark:text-[#C0B4AC]'
              }`}
            >
              <InstagramIcon size={13} color={templateTab === 'instagram' ? '#FAF8F5' : '#6B6058'} />
              Instagram
            </button>
            <button
              onClick={() => setTemplateTab('tiktok')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                templateTab === 'tiktok'
                  ? 'bg-[#8B1538] text-[#FAF8F5]'
                  : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058] dark:text-[#C0B4AC]'
              }`}
            >
              <TikTokIcon size={13} color={templateTab === 'tiktok' ? '#FAF8F5' : '#6B6058'} />
              TikTok
            </button>
          </div>
          <div className="space-y-3">
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
      )}
    </div>
  )
}