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
  const bottomRef = useRef(null)

  const isPro = tier === 'pro'
  const chatsRemaining = Math.max(0, 3 - chatsUsed)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading || limitReached) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, message: msg })
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

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">

      {/* HEADER */}
      <div className="text-center px-6 pt-5 pb-4 border-b border-[#EDE8E3] dark:border-[#3A2E28]">
        <h2 className="font-['Cormorant_Garamond'] italic text-2xl text-[#8B1538] mb-1">Crimson</h2>
        <p className="text-[#A89E96] text-xs">Your personal content coach</p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="bg-[#8B1538]/08 text-[#8B1538] text-[10px] font-semibold px-3 py-1 rounded-full">
            {isPro ? '✦ Unlimited' : `${chatsRemaining}/3 chats today`}
          </span>
          {expressMode && (
            <span className="text-[#A89E96] text-[10px] italic">💫 Express mode</span>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center pt-8">
            <div className="flex justify-center mb-4">
              <ChatIcon size={32} active={true} />
            </div>
            <h3 className="font-['Cormorant_Garamond'] italic text-xl text-[#8B1538] mb-1">
              Hey, {user?.first_name || user?.name?.split(' ')[0]} 🌹
            </h3>
            <p className="text-[#A89E96] text-xs mb-1">I know your niche — {user?.niche}</p>
            <p className="text-[#A89E96] text-xs mb-6">I'm here when you need me.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#6B6058] dark:text-[#C0B4AC] text-xs px-3 py-1.5 rounded-full hover:border-[#8B1538]/40 hover:text-[#8B1538] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#8B1538] text-[#FAF8F5] rounded-br-sm'
                  : 'bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] text-[#1A1008] dark:text-[#F0EBE5] rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 bg-[#8B1538] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {limitReached && !isPro && (
          <div className="mx-2 bg-[#FAF8F5] dark:bg-[#2A201A] border border-[#8B1538]/20 rounded-2xl p-4 text-center">
            <p className="font-['Cormorant_Garamond'] text-lg text-[#8B1538] mb-1">Daily limit reached 🌹</p>
            <p className="text-[#A89E96] text-xs mb-3">Upgrade to Pro for unlimited Crimson</p>
            <button className="bg-[#8B1538] text-[#FAF8F5] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#6b0f2b] transition-all">
              Upgrade to Pro — $29/mo
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="px-4 pb-4 pt-2 border-t border-[#EDE8E3] dark:border-[#3A2E28]">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Crimson anything..."
            disabled={loading || limitReached}
            className="flex-1 bg-white dark:bg-[#2A201A] border border-[#EDE8E3] dark:border-[#3A2E28] rounded-full px-4 py-2.5 text-sm text-[#1A1008] dark:text-[#F0EBE5] placeholder-[#C0B4AC] focus:outline-none focus:border-[#8B1538] transition-colors disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim() || limitReached}
            className="w-10 h-10 bg-[#8B1538] rounded-full flex items-center justify-center hover:bg-[#6b0f2b] transition-all disabled:opacity-40 flex-shrink-0"
          >
            <SparkIcon size={16} color="#FAF8F5" />
          </button>
        </div>
      </div>
    </div>
  )
}