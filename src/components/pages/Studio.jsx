import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { StudioIcon, SparkIcon, ChatIcon } from '../ui/Icons'
import { useNavigate } from 'react-router-dom'

const PLATFORM_COLORS = {
  tiktok: { bg: '#FF005015', text: '#FF0050', label: 'TikTok' },
  instagram: { bg: '#8B5CF615', text: '#8B5CF6', label: 'Instagram' },
  youtube: { bg: '#C4902A15', text: '#C4902A', label: 'YouTube' },
}

const PLATFORMS = ['tiktok', 'instagram', 'youtube']
const PILLARS = ['Educational', 'Personal', 'Promotional', 'Entertaining']
const COLLAB_TYPES = ['Organic', 'Gifted', 'Paid Partnership']
const STATUSES = ['idea', 'draft', 'scheduled', 'posted']

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function getPlatformColor(platforms) {
  if (!platforms || platforms.length === 0) return { bg: '#8B153815', text: '#8B1538' }
  if (platforms.length > 1) return { bg: '#10B98115', text: '#10B981' }
  return PLATFORM_COLORS[platforms[0]] || { bg: '#8B153815', text: '#8B1538' }
}

function getStatusColor(status) {
  const colors = {
    idea: '#A89E96',
    draft: '#3B82F6',
    scheduled: '#8B1538',
    posted: '#10B981'
  }
  return colors[status] || '#A89E96'
}

export default function Studio() {
  const { user, tier } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('calendar')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(null)
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [showDayPanel, setShowDayPanel] = useState(false)

  const [form, setForm] = useState({
    title: '', status: 'idea', post_date: '', post_time: '',
    platforms: [], caption_tiktok: '', caption_instagram: '',
    caption_youtube: '', hashtags: '', hook: '', content_pillar: '',
    collab_type: 'organic', filming_notes: {}, notes: '', canva_url: '', media_url: ''
  })

  const isPro = tier === 'pro' || tier === 'founding'

  useEffect(() => {
    fetchPosts()
  }, [currentDate])

  const fetchPosts = async () => {
    setLoading(true)
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const start = new Date(year, month, 1).toISOString().split('T')[0]
    const end = new Date(year, month + 1, 0).toISOString().split('T')[0]

    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .gte('post_date', start)
      .lte('post_date', end)
      .order('post_time', { ascending: true })

    if (data) setPosts(data)
    setLoading(false)
  }

  const fetchAllPosts = async (status) => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', status)
      .order('created_at', { ascending: false })
    return data || []
  }

  const savePost = async () => {
    if (!form.title) return
    const postData = { ...form, user_id: user.id, updated_at: new Date().toISOString() }
    if (editingPost) {
      await supabase.from('posts').update(postData).eq('id', editingPost.id)
    } else {
      await supabase.from('posts').insert([postData])
    }
    setShowBuilder(false)
    setEditingPost(null)
    resetForm()
    fetchPosts()
  }

  const deletePost = async (id) => {
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
    setShowDayPanel(false)
  }

  const resetForm = () => {
    setForm({
      title: '', status: 'idea', post_date: selectedDay || '', post_time: '',
      platforms: [], caption_tiktok: '', caption_instagram: '',
      caption_youtube: '', hashtags: '', hook: '', content_pillar: '',
      collab_type: 'organic', filming_notes: {}, notes: '', canva_url: '', media_url: ''
    })
  }

  const openBuilder = (post = null, date = null) => {
    if (post) {
      setEditingPost(post)
      setForm({ ...post })
    } else {
      setEditingPost(null)
      resetForm()
      if (date) setForm(prev => ({ ...prev, post_date: date }))
    }
    setShowBuilder(true)
  }

  const copyPost = (post) => {
    const platform = post.platforms?.[0] || 'instagram'
    const caption = post[`caption_${platform}`] || ''
    const hashtags = post.hashtags || ''
    navigator.clipboard.writeText(`${caption}\n\n${hashtags}`)
  }

  const getDayPosts = (dateStr) => posts.filter(p => p.post_date === dateStr && p.status === 'scheduled')
  const getAllDayPosts = (dateStr) => posts.filter(p => p.post_date === dateStr)

  // Calendar grid
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  const getDateStr = (day) => {
    if (!day) return null
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const TABS = ['Calendar', 'Ideas', 'Drafts', 'Posted']

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <StudioIcon size={22} active={true} />
          <h2 className="font-['Cormorant_Garamond'] italic text-2xl text-[#8B1538]">Studio</h2>
        </div>
        <p className="text-[#A89E96] text-xs">Plan, create, and schedule your content</p>
      </div>

      {/* TOP TABS */}
      <div className="flex gap-1 px-4 mb-4 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === tab.toLowerCase()
                ? 'bg-[#8B1538] text-[#FAF8F5]'
                : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CALENDAR TAB */}
      {activeTab === 'calendar' && (
        <div className="px-4">

          {/* MONTH NAV */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#8B1538]/08 transition-all"
            >
              <i className="ti ti-chevron-left text-[#6B6058]" style={{ fontSize: 16 }} />
            </button>
            <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
              {MONTHS[month]} {year}
            </h3>
            <button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#8B1538]/08 transition-all"
            >
              <i className="ti ti-chevron-right text-[#6B6058]" style={{ fontSize: 16 }} />
            </button>
          </div>

          {/* WEEKDAY HEADERS */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-medium text-[#A89E96] uppercase tracking-wide py-1">
                {d}
              </div>
            ))}
          </div>

          {/* CALENDAR GRID */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {calendarDays.map((day, i) => {
              const dateStr = getDateStr(day)
              const dayPosts = day ? getDayPosts(dateStr) : []
              const isToday = dateStr === todayStr
              const isSelected = dateStr === selectedDay

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (!day) return
                    setSelectedDay(dateStr)
                    setShowDayPanel(true)
                  }}
                  className={`min-h-[64px] rounded-xl p-1 cursor-pointer transition-all ${
                    day ? 'hover:bg-[#8B1538]/05' : ''
                  } ${isSelected ? 'ring-2 ring-[#8B1538]/40' : ''}`}
                  style={{ background: isToday ? 'rgba(139,21,56,0.06)' : '' }}
                >
                  {day && (
                    <>
                      <div className={`text-xs font-medium text-center mb-1 w-6 h-6 flex items-center justify-center rounded-full mx-auto ${
                        isToday
                          ? 'bg-[#8B1538] text-[#FAF8F5]'
                          : 'text-[#6B6058] dark:text-[#C0B4AC]'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {dayPosts.slice(0, 2).map((post, pi) => {
                          const color = getPlatformColor(post.platforms)
                          return (
                            <div
                              key={pi}
                              className="text-[9px] px-1 py-0.5 rounded truncate font-medium"
                              style={{ background: color.bg, color: color.text }}
                            >
                              {post.title}
                            </div>
                          )
                        })}
                        {dayPosts.length > 2 && (
                          <div className="text-[9px] text-[#A89E96] text-center">
                            +{dayPosts.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* UPCOMING */}
          <div className="mb-4">
            <h4 className="font-['Cormorant_Garamond'] text-lg font-semibold text-[#1A1008] dark:text-[#F0EBE5] mb-3">Upcoming</h4>
            {posts.filter(p => p.status === 'scheduled' && p.post_date >= todayStr).slice(0, 5).length === 0 ? (
              <div className="text-center py-6 text-[#A89E96] text-sm italic">Nothing scheduled yet</div>
            ) : (
              <div className="space-y-2">
                {posts.filter(p => p.status === 'scheduled' && p.post_date >= todayStr).slice(0, 5).map(post => {
                  const color = getPlatformColor(post.platforms)
                  return (
                    <div key={post.id} onClick={() => openBuilder(post)}
                      className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-[#8B1538]/30 transition-all">
                      <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: color.text }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-[#1A1008] dark:text-[#F0EBE5] truncate">{post.title}</div>
                        <div className="text-[#A89E96] text-xs">
                          {post.post_date} {post.post_time && `· ${post.post_time}`}
                        </div>
                      </div>
                      <div className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: color.bg, color: color.text }}>
                        {post.platforms?.join(', ') || 'No platform'}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* IDEAS TAB */}
      {activeTab === 'ideas' && (
        <PostList userId={user.id} status="idea" onEdit={openBuilder} onDelete={deletePost} />
      )}

      {/* DRAFTS TAB */}
      {activeTab === 'drafts' && (
        <PostList userId={user.id} status="draft" onEdit={openBuilder} onDelete={deletePost} />
      )}

      {/* POSTED TAB */}
      {activeTab === 'posted' && (
        <PostList userId={user.id} status="posted" onEdit={openBuilder} onDelete={deletePost} />
      )}

      {/* FLOATING + BUTTON */}
      <button
        onClick={() => openBuilder(null, selectedDay)}
        className="fixed bottom-20 right-4 w-12 h-12 bg-[#8B1538] rounded-full flex items-center justify-center shadow-lg hover:bg-[#6b0f2b] transition-all z-30"
      >
        <i className="ti ti-plus text-white" style={{ fontSize: 20 }} />
      </button>

      {/* DAY PANEL */}
      {showDayPanel && selectedDay && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDayPanel(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#FAF8F5] dark:bg-[#18120F] rounded-t-2xl p-5"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
                {new Date(selectedDay + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <button onClick={() => setShowDayPanel(false)}>
                <i className="ti ti-x text-[#A89E96]" style={{ fontSize: 18 }} />
              </button>
            </div>

            {/* CHAT WITH CRIMSON */}
            <button
              onClick={() => { setShowDayPanel(false); navigate('/crimson') }}
              className="w-full flex items-center gap-2 bg-[#8B1538]/08 text-[#8B1538] rounded-xl px-4 py-3 mb-4 text-sm font-medium hover:bg-[#8B1538]/12 transition-all"
            >
              <ChatIcon size={16} active={true} />
              Chat with Crimson about this day
            </button>

            {getAllDayPosts(selectedDay).length === 0 ? (
              <p className="text-[#A89E96] text-sm italic text-center py-4">Nothing planned for this day</p>
            ) : (
              <div className="space-y-3">
                {getAllDayPosts(selectedDay).map(post => {
                  const color = getPlatformColor(post.platforms)
                  return (
                    <div key={post.id} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-sm text-[#1A1008] dark:text-[#F0EBE5]">{post.title}</div>
                          <div className="text-[10px] font-medium mt-1 px-2 py-0.5 rounded-full inline-block"
                            style={{ background: color.bg, color: color.text }}>
                            {post.platforms?.join(', ')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => copyPost(post)}
                            className="text-[10px] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#A89E96] px-2 py-1 rounded-full hover:border-[#8B1538] hover:text-[#8B1538] transition-all">
                            Copy
                          </button>
                          <button onClick={() => { setShowDayPanel(false); openBuilder(post) }}
                            className="text-[10px] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#A89E96] px-2 py-1 rounded-full hover:border-[#8B1538] hover:text-[#8B1538] transition-all">
                            Edit
                          </button>
                        </div>
                      </div>
                      {post.caption_instagram && (
                        <p className="text-xs text-[#6B6058] dark:text-[#C0B4AC] line-clamp-2">{post.caption_instagram}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <button
              onClick={() => { setShowDayPanel(false); openBuilder(null, selectedDay) }}
              className="w-full mt-4 bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full text-sm font-medium hover:bg-[#6b0f2b] transition-all"
            >
              + Add Content for This Day
            </button>
          </div>
        </div>
      )}

      {/* POST BUILDER */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setShowBuilder(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#FAF8F5] dark:bg-[#18120F] rounded-t-2xl"
            style={{ maxHeight: '92vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            {/* BUILDER HEADER */}
            <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-[#EDE8E3] dark:border-[#3A2E28] sticky top-0 bg-[#FAF8F5] dark:bg-[#18120F] z-10">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1008] dark:text-[#F0EBE5]">
                {editingPost ? 'Edit Post' : 'New Post'}
              </h3>
              <button onClick={() => setShowBuilder(false)}>
                <i className="ti ti-x text-[#A89E96]" style={{ fontSize: 18 }} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-5">

              {/* TITLE */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Title</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Internal label for this post..."
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538]"
                />
              </div>

              {/* PLATFORMS */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Platforms</label>
                <div className="flex gap-2 flex-wrap">
                  {PLATFORMS.map(p => {
                    const isSelected = form.platforms?.includes(p)
                    const color = PLATFORM_COLORS[p]
                    return (
                      <button
                        key={p}
                        onClick={() => setForm(f => ({
                          ...f,
                          platforms: isSelected
                            ? f.platforms.filter(x => x !== p)
                            : [...(f.platforms || []), p]
                        }))}
                        className="px-4 py-1.5 rounded-full text-xs font-medium transition-all border"
                        style={isSelected
                          ? { background: color.bg, color: color.text, borderColor: color.text }
                          : { background: 'transparent', color: '#A89E96', borderColor: '#EDE8E3' }
                        }
                      >
                        {color.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* STATUS + DATE */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-3 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] focus:outline-none focus:border-[#8B1538] capitalize"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Post Date</label>
                  <input
                    type="date"
                    value={form.post_date || ''}
                    onChange={e => setForm(f => ({ ...f, post_date: e.target.value }))}
                    className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-3 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] focus:outline-none focus:border-[#8B1538]"
                  />
                </div>
              </div>

              {/* BEST TIME */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Best Time to Post</label>
                <input
                  type="time"
                  value={form.post_time || ''}
                  onChange={e => setForm(f => ({ ...f, post_time: e.target.value }))}
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-3 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] focus:outline-none focus:border-[#8B1538]"
                />
              </div>

              {/* MEDIA */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Media / Canva</label>
                <input
                  value={form.media_url || ''}
                  onChange={e => setForm(f => ({ ...f, media_url: e.target.value }))}
                  placeholder="Paste image or video URL..."
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] mb-2"
                />
                <input
                  value={form.canva_url || ''}
                  onChange={e => setForm(f => ({ ...f, canva_url: e.target.value }))}
                  placeholder="Paste Canva link..."
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538]"
                />
                {isPro && (
                  <p className="text-[10px] text-[#A89E96] mt-1">✦ Pro: file upload coming soon</p>
                )}
              </div>

              {/* CAPTIONS — per platform */}
              {form.platforms?.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Caption</label>
                  <div className="flex gap-2 mb-3">
                    {form.platforms.map(p => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: PLATFORM_COLORS[p]?.bg, color: PLATFORM_COLORS[p]?.text }}>
                        {PLATFORM_COLORS[p]?.label}
                      </span>
                    ))}
                  </div>
                  {form.platforms.map(p => (
                    <div key={p} className="mb-3">
                      <div className="text-[10px] font-medium text-[#A89E96] mb-1">{PLATFORM_COLORS[p]?.label}</div>
                      <textarea
                        value={form[`caption_${p}`] || ''}
                        onChange={e => setForm(f => ({ ...f, [`caption_${p}`]: e.target.value }))}
                        placeholder={`Write your ${PLATFORM_COLORS[p]?.label} caption...`}
                        rows={4}
                        className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* HOOK */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Hook (First 3 Seconds)</label>
                <textarea
                  value={form.hook || ''}
                  onChange={e => setForm(f => ({ ...f, hook: e.target.value }))}
                  placeholder="What grabs attention in the first 3 seconds?"
                  rows={2}
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] resize-none"
                />
              </div>

              {/* HASHTAGS */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Hashtags</label>
                <textarea
                  value={form.hashtags || ''}
                  onChange={e => setForm(f => ({ ...f, hashtags: e.target.value }))}
                  placeholder="#contentcreator #creator..."
                  rows={2}
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] resize-none"
                />
              </div>

              {/* CONTENT PILLAR */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Content Pillar</label>
                <div className="flex flex-wrap gap-2">
                  {PILLARS.map(p => (
                    <button
                      key={p}
                      onClick={() => setForm(f => ({ ...f, content_pillar: f.content_pillar === p ? '' : p }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        form.content_pillar === p
                          ? 'bg-[#8B1538] text-[#FAF8F5] border-[#8B1538]'
                          : 'border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLLAB TYPE */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Collab Type</label>
                <div className="flex gap-2">
                  {COLLAB_TYPES.map(c => (
                    <button
                      key={c}
                      onClick={() => setForm(f => ({ ...f, collab_type: c.toLowerCase() }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        form.collab_type === c.toLowerCase()
                          ? 'bg-[#8B1538] text-[#FAF8F5] border-[#8B1538]'
                          : 'border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* FILMING NOTES */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Filming Notes (Private)</label>
                <textarea
                  value={form.filming_notes?.raw || ''}
                  onChange={e => setForm(f => ({ ...f, filming_notes: { ...f.filming_notes, raw: e.target.value } }))}
                  placeholder="Shot list, outfit, location, b-roll ideas, talking points..."
                  rows={3}
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] resize-none"
                />
              </div>

              {/* NOTES */}
              <div>
                <label className="block text-xs font-medium text-[#6B6058] dark:text-[#C0B4AC] mb-1.5 uppercase tracking-wide">Notes (Private — not copied)</label>
                <textarea
                  value={form.notes || ''}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Any other notes..."
                  rows={2}
                  className="w-full bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] resize-none"
                />
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="flex gap-3 pb-4">
                <button
                  onClick={() => copyPost(form)}
                  className="flex-1 border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058] py-3 rounded-full text-sm font-medium hover:border-[#8B1538] hover:text-[#8B1538] transition-all"
                >
                  Copy Post
                </button>
                <button
                  onClick={savePost}
                  className="flex-1 bg-[#8B1538] text-[#FAF8F5] py-3 rounded-full text-sm font-medium hover:bg-[#6b0f2b] transition-all"
                >
                  {form.status === 'scheduled' ? 'Schedule It ✦' : 'Save Post'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// POST LIST COMPONENT
function PostList({ userId, status, onEdit, onDelete }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .eq('status', status)
        .order('created_at', { ascending: false })
      if (data) setPosts(data)
      setLoading(false)
    }
    load()
  }, [status])

  if (loading) return <div className="text-center py-12 text-[#A89E96] text-sm italic px-4">Loading...</div>

  if (posts.length === 0) return (
    <div className="text-center py-12 px-4">
      <p className="text-[#A89E96] text-sm italic">No {status}s yet</p>
      <p className="text-[#C0B4AC] text-xs mt-1">Tap + to create one!</p>
    </div>
  )

  return (
    <div className="px-4 space-y-3">
      {posts.map(post => {
        const color = getPlatformColor(post.platforms)
        return (
          <div key={post.id} className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="font-medium text-sm text-[#1A1008] dark:text-[#F0EBE5] mb-1">{post.title}</div>
                {post.platforms?.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {post.platforms.map(p => (
                      <span key={p} className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: PLATFORM_COLORS[p]?.bg, color: PLATFORM_COLORS[p]?.text }}>
                        {PLATFORM_COLORS[p]?.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-2">
                <button onClick={() => onEdit(post)}
                  className="text-[10px] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#A89E96] px-2 py-1 rounded-full hover:border-[#8B1538] hover:text-[#8B1538] transition-all">
                  Edit
                </button>
                <button onClick={() => onDelete(post.id)}
                  className="text-[10px] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#A89E96] px-2 py-1 rounded-full hover:border-red-400 hover:text-red-400 transition-all">
                  Delete
                </button>
              </div>
            </div>
            {post.caption_instagram && (
              <p className="text-xs text-[#6B6058] dark:text-[#C0B4AC] line-clamp-2 mt-2">{post.caption_instagram}</p>
            )}
            {post.post_date && (
              <p className="text-[10px] text-[#A89E96] mt-2">{post.post_date} {post.post_time}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}