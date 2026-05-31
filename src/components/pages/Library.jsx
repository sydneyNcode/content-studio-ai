import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { LibraryIcon, InstagramIcon, TikTokIcon } from '../ui/Icons'

const TABS = ['Reads', 'Courses', 'Templates']

function TypeBadge({ type }) {
  const styles = {
    free: 'bg-green-50 text-green-700 border border-green-200',
    pro: 'bg-[#8B1538]/08 text-[#8B1538] border border-[#8B1538]/20',
    paid: 'bg-[#C4902A]/10 text-[#C4902A] border border-[#C4902A]/30',
    coming_soon: 'bg-[#FAF8F5] dark:bg-[#18120F] text-[#A89E96] border border-[#EDE8E3] dark:border-[#3A2E28]',
  }
  const labels = {
    free: 'Free',
    pro: 'Pro',
    paid: 'Purchase',
    coming_soon: 'Coming Soon',
  }
  const key = type?.toLowerCase().replace(' ', '_') || 'coming_soon'
  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${styles[key] || styles.coming_soon}`}>
      {labels[key] || type || 'Coming Soon'}
    </span>
  )
}

function ResourceCard({ item, index, tier }) {
  const isEven = index % 2 === 0
  const isPro = tier === 'pro' || tier === 'founding'
  const canAccess = item.type === 'free' || isPro || item.type === 'paid'

  const textContent = (
    <div className="flex flex-col justify-center py-2">
      <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-2 leading-tight">
        {item.title}
      </h3>
      <p className="text-[#6B6058] dark:text-[#C0B4AC] text-sm leading-relaxed mb-4">
        {item.description}
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <TypeBadge type={item.type} />
        {item.type !== 'coming_soon' && (
          <button
            onClick={() => item.url && canAccess && window.open(item.url, '_blank')}
            className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
              canAccess && item.url
                ? 'bg-[#8B1538] text-[#FAF8F5] hover:bg-[#6b0f2b]'
                : 'bg-[#EDE8E3] dark:bg-[#3A2E28] text-[#A89E96] cursor-not-allowed'
            }`}
          >
            {item.type === 'free' ? 'Read Now →'
              : item.type === 'pro' && !isPro ? 'Unlock with Pro'
              : item.type === 'paid' ? 'Purchase'
              : 'View →'}
          </button>
        )}
      </div>
    </div>
  )

  const imageContent = (
    <div className={`rounded-2xl overflow-hidden aspect-[4/3] flex-shrink-0 w-full md:w-48 ${
      !item.image_url ? 'bg-gradient-to-br from-[#8B1538]/10 to-[#8B1538]/05 dark:from-[#8B1538]/20 dark:to-[#8B1538]/05 flex items-center justify-center' : ''
    }`}>
      {item.image_url
        ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        : <LibraryIcon size={40} active={false} />
      }
    </div>
  )

  return (
    <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-5 flex flex-col md:flex-row gap-5 hover:border-[#8B1538]/30 transition-all">
      {isEven ? (
        <>
          <div className="md:w-48 flex-shrink-0">{imageContent}</div>
          <div className="flex-1">{textContent}</div>
        </>
      ) : (
        <>
          <div className="flex-1 md:order-1 order-2">{textContent}</div>
          <div className="md:w-48 flex-shrink-0 md:order-2 order-1">{imageContent}</div>
        </>
      )}
    </div>
  )
}

export default function Library() {
  const { tier } = useAuth()
  const [tab, setTab] = useState('Reads')
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [templatePlatform, setTemplatePlatform] = useState('instagram')
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    async function fetchResources() {
      const { data } = await supabase
        .from('resources')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: true })
      if (data) setResources(data)
      setLoading(false)
    }
    fetchResources()
  }, [])

  const reads = resources.filter(r => r.category === 'read')
  const courses = resources.filter(r => r.category === 'course')
  const templates = resources.filter(r => 
    r.category === 'template' && 
    (!templatePlatform || r.platform === templatePlatform)
  )

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

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

      {loading && (
        <div className="text-center py-12 text-[#A89E96] text-sm italic">Loading...</div>
      )}

      {/* READS */}
      {!loading && tab === 'Reads' && (
        <div className="space-y-4">
          {reads.length === 0 ? (
            <div className="text-center py-12 text-[#A89E96] text-sm italic">No reads yet — check back soon!</div>
          ) : (
            reads.map((item, i) => (
              <ResourceCard key={item.id} item={item} index={i} tier={tier} />
            ))
          )}
        </div>
      )}

      {/* COURSES */}
      {!loading && tab === 'Courses' && (
        <div className="space-y-4">
          {courses.length === 0 ? (
            <div className="text-center py-12 text-[#A89E96] text-sm italic">No courses yet — check back soon!</div>
          ) : (
            courses.map((item, i) => (
              <ResourceCard key={item.id} item={item} index={i} tier={tier} />
            ))
          )}
        </div>
      )}

      {/* TEMPLATES */}
      {!loading && tab === 'Templates' && (
        <div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTemplatePlatform('instagram')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                templatePlatform === 'instagram'
                  ? 'bg-[#8B1538] text-[#FAF8F5]'
                  : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058]'
              }`}
            >
              <InstagramIcon size={13} color={templatePlatform === 'instagram' ? '#FAF8F5' : '#6B6058'} />
              Instagram
            </button>
            <button
              onClick={() => setTemplatePlatform('tiktok')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                templatePlatform === 'tiktok'
                  ? 'bg-[#8B1538] text-[#FAF8F5]'
                  : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058]'
              }`}
            >
              <TikTokIcon size={13} color={templatePlatform === 'tiktok' ? '#FAF8F5' : '#6B6058'} />
              TikTok
            </button>
          </div>

          {templates.length === 0 ? (
            <div className="text-center py-12 text-[#A89E96] text-sm italic">No templates yet — check back soon!</div>
          ) : (
            <div className="space-y-3">
              {templates.map((t) => (
                <div key={t.id} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-2xl p-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="font-['Cormorant_Garamond'] text-base font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-1">{t.title}</div>
                      <div className="text-[#6B6058] dark:text-[#C0B4AC] text-xs italic leading-relaxed">{t.description}</div>
                    </div>
                    <button
                      onClick={() => copy(t.description, t.id)}
                      className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
                        copied === t.id
                          ? 'bg-[#8B1538] text-[#FAF8F5] border-[#8B1538]'
                          : 'border-[#EDE8E3] dark:border-[#3A2E28] text-[#A89E96] hover:border-[#8B1538] hover:text-[#8B1538]'
                      }`}
                    >
                      {copied === t.id ? '✓' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}