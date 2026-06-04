import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { ChatIcon, SparkIcon } from '../ui/Icons'

const API_URL = import.meta.env.VITE_API_URL

const SUGGESTIONS = [
  'Give me 5 content ideas',
  'Write me a hook',
  'What should I post today?',
  'Help me plan this week',
  'Write me a caption',
]

export default function Crimson() {
  const { user, tier } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatsUsed, setChatsUsed] = useState(user?.chat_count_today || 0)
  const [limitReached, setLimitReached] = useState(false)
  const [expressMode, setExpressMode] = useState(false)
  const [pendingImage, setPendingImage] = useState(null)
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)

  const isPro = tier === 'pro' || tier === 'founding'
  const chatsRemaining = Math.max(0, 3 - chatsUsed)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`crimson_messages_${user?.id}`)
      if (saved) {
        const { messages: savedMessages, userId } = JSON.parse(saved)
        if (userId === user?.id && savedMessages.length > 0) setMessages(savedMessages)
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(`crimson_messages_${user?.id}`, JSON.stringify({
          messages, userId: user?.id, savedAt: Date.now()
        }))
      } catch {}
    }
  }, [messages])

  const handleTextareaInput = (e) => {
    setInput(e.target.value)
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = `${Math.min(ta.scrollHeight, 120)}px` }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target.result
      setPendingImage({ base64: result.split(',')[1], mediaType: file.type || 'image/jpeg', preview: result })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if ((!msg && !pendingImage) || loading || limitReached) return
    const imageToSend = pendingImage
    setInput('')
    setPendingImage(null)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setMessages(prev => [...prev, { role: 'user', content: msg, image: imageToSend?.preview }])
    setLoading(true)

    try {
      const body = { userId: user.id, message: msg }
      if (imageToSend) { body.imageBase64 = imageToSend.base64; body.imageType = imageToSend.mediaType }
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (res.status === 429) {
        setLimitReached(true)
        setMessages(prev => [...prev, { role: 'crimson', content: data.error }])
      } else if (!res.ok) {
        setMessages(prev => [...prev, { role: 'crimson', content: "I'm taking a moment — try again in a few seconds. 🌹" }])
      } else {
        setMessages(prev => [...prev, { role: 'crimson', content: data.message }])
        setChatsUsed(data.chatsUsedToday || 0)
        setExpressMode(data.modelUsed === 'haiku')
      }
    } catch {
      setMessages(prev => [...prev, { role: 'crimson', content: "Connection error. Please try again! 🌹" }])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div style={{ minHeight: '100%', paddingBottom: '130px' }}>

      {/* HEADER */}
      <div
        className="text-center px-6 pt-4 pb-3 border-b border-[#EDE8E3] dark:border-[#3A2E28] bg-[#FAF8F5] dark:bg-[#18120F]"
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      >
        <h2 className="font-['Cormorant_Garamond'] italic text-2xl text-[#8B1538] mb-0.5">Crimson</h2>
        <p className="text-[#A89E96] text-xs">Your personal content coach</p>
        <div className="mt-1.5 flex items-center justify-center gap-2">
          <span className="bg-[#8B1538]/08 text-[#8B1538] text-[10px] font-semibold px-3 py-1 rounded-full">
            {isPro ? '✦ Unlimited' : `${chatsRemaining}/3 chats today`}
          </span>
          {expressMode && <span className="text-[#A89E96] text-[10px] italic">Express mode</span>}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="px-4 pt-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center pt-8">
            <div className="flex justify-center mb-3"><ChatIcon size={28} active={true} /></div>
            <h3 className="font-['Cormorant_Garamond'] italic text-xl text-[#8B1538] mb-1">
              Hey, {user?.first_name || user?.name?.split(' ')[0]} 🌹
            </h3>
            <p className="text-[#A89E96] text-xs mb-1">I know your niche — {user?.niche || 'content creation'}</p>
            <p className="text-[#A89E96] text-xs mb-6">I'm here when you need me.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058] dark:text-[#C0B4AC] text-xs px-3 py-1.5 rounded-full hover:border-[#8B1538]/40 hover:text-[#8B1538] transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[82%]">
              {msg.image && (
                <div className={`mb-1 ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                  <img src={msg.image} alt="attachment" className="rounded-2xl max-w-[200px] max-h-[200px] object-cover" style={{ border: '1px solid rgba(139,21,56,0.2)' }} />
                </div>
              )}
              {msg.content && (
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#8B1538] text-[#FAF8F5] rounded-br-sm'
                    : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#1A1008] dark:text-[#F0EBE5] rounded-bl-sm'
                }`}>{msg.content}</div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
              {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#8B1538] rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
            </div>
          </div>
        )}

        {limitReached && !isPro && (
          <div className="mx-2 bg-[#FAF8F5] dark:bg-[#2A201A] border border-[#8B1538]/20 rounded-2xl p-4 text-center">
            <p className="font-['Cormorant_Garamond'] text-lg text-[#8B1538] mb-1">Daily limit reached 🌹</p>
            <p className="text-[#A89E96] text-xs mb-3">Upgrade to Pro for unlimited Crimson</p>
            <button className="bg-[#8B1538] text-[#FAF8F5] text-xs font-medium px-4 py-2 rounded-full">Upgrade — $19/mo</button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* HIDDEN FILE INPUT */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} style={{ display: 'none' }} />

      {/* FIXED INPUT BAR */}
      <div
        style={{ position: 'fixed', bottom: '64px', left: 0, right: 0, padding: '6px 12px 8px', zIndex: 40, background: '#FAF8F5' }}
        className="dark:bg-[#18120F]"
      >
        {pendingImage && (
          <div className="mb-2 flex items-center gap-2">
            <div className="relative">
              <img src={pendingImage.preview} alt="preview" className="h-14 w-14 rounded-xl object-cover" style={{ border: '1px solid #EDE8E3' }} />
              <button onClick={() => setPendingImage(null)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#8B1538] rounded-full flex items-center justify-center">
                <i className="ti ti-x text-white" style={{ fontSize: 10 }} />
              </button>
            </div>
            <p className="text-[#A89E96] text-xs italic">Image ready — add a message or send!</p>
          </div>
        )}
        <div className="flex items-end gap-2 bg-white dark:bg-[#2A201A] rounded-2xl px-3 py-2"
          style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)', border: '1px solid #EDE8E3' }}>
          <button onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#8B1538]/08 transition-all mb-0.5">
            <i className="ti ti-paperclip" style={{ fontSize: 16, color: pendingImage ? '#8B1538' : '#A89E96' }} />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder={pendingImage ? "Add a message (optional)..." : "Message Crimson..."}
            disabled={loading || limitReached}
            rows={1}
            className="flex-1 bg-transparent text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none disabled:opacity-50 resize-none leading-relaxed py-1.5"
            style={{ minHeight: '36px', maxHeight: '120px', fontSize: '16px' }}
          />
          <button onClick={() => sendMessage()}
            disabled={loading || (!input.trim() && !pendingImage) || limitReached}
            className="flex-shrink-0 w-8 h-8 bg-[#8B1538] rounded-full flex items-center justify-center transition-all disabled:opacity-40 mb-0.5">
            <SparkIcon size={14} color="#FAF8F5" />
          </button>
        </div>
      </div>
    </div>
  )
}