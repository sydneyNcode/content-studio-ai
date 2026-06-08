import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'Content Studio AI — Your Creative Home'
    document.body.style.background = '#0c0a09'
    document.body.style.margin = '0'
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Poppins:wght@200;300;400;500&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.title = 'Content Studio AI'
      document.body.style.background = ''
      document.body.style.margin = ''
    }
  }, [])

  return (
    <>
      <style>{`
        :root {
          --noir: #0c0a09; --espresso: #1c1714; --walnut: #2e2420;
          --crimson: #8b1a2f; --scarlet: #c02545; --blush: #e8c4cc;
          --ivory: #faf7f2; --cream: #f5f0e8; --parchment: #ede8df;
          --warm-gray: #8a8480;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background:var(--noir); color:var(--cream); font-family:'Poppins',sans-serif; overflow-x:hidden; }
        .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:80px 40px; position:relative; background:radial-gradient(ellipse at 50% 0%, rgba(139,26,47,0.2) 0%, transparent 65%), var(--noir); }
        .hero::before { content:""; position:absolute; inset:0; background-image:radial-gradient(circle, rgba(139,26,47,0.07) 1px, transparent 1px); background-size:28px 28px; pointer-events:none; }
        .logo { font-family:'Cormorant Garamond',serif; font-size:13px; font-weight:600; letter-spacing:6px; text-transform:uppercase; color:var(--warm-gray); margin-bottom:64px; opacity:0; animation:fadeUp 0.8s ease 0.1s forwards; }
        .logo span { color:var(--crimson); font-style:italic; letter-spacing:2px; }
        .hero-headline { font-family:'Cormorant Garamond',serif; font-size:clamp(52px,9vw,96px); font-weight:600; line-height:1; color:var(--ivory); margin-bottom:6px; opacity:0; animation:fadeUp 0.8s ease 0.3s forwards; }
        .hero-headline em { color:var(--crimson); font-style:italic; display:block; }
        .hero-sub { font-size:13px; font-weight:300; color:var(--warm-gray); max-width:480px; line-height:1.9; margin:24px auto 0; opacity:0; animation:fadeUp 0.8s ease 0.5s forwards; }
        .scroll-hint { position:absolute; bottom:40px; left:50%; transform:translateX(-50%); font-size:9px; letter-spacing:4px; text-transform:uppercase; color:rgba(138,132,128,0.4); opacity:0; animation:fadeUp 0.8s ease 0.9s forwards; }
        .divider { display:flex; align-items:center; gap:20px; padding:0 40px; max-width:800px; margin:0 auto; }
        .divider-line { flex:1; height:1px; background:rgba(139,26,47,0.2); }
        .divider-dot { width:4px; height:4px; border-radius:50%; background:var(--crimson); flex-shrink:0; }
        .section { padding:100px 40px; max-width:900px; margin:0 auto; }
        .section-eyebrow { font-size:9px; letter-spacing:5px; text-transform:uppercase; color:var(--crimson); margin-bottom:20px; }
        .section-title { font-family:'Cormorant Garamond',serif; font-size:clamp(36px,5vw,56px); font-weight:600; color:var(--ivory); line-height:1.1; margin-bottom:28px; }
        .section-title em { color:var(--crimson); font-style:italic; }
        .section-body { font-size:13px; line-height:2; color:var(--warm-gray); font-weight:300; max-width:640px; }
        .problem { background:var(--espresso); padding:100px 40px; }
        .problem-inner { max-width:900px; margin:0 auto; }
        .problem-list { margin-top:40px; }
        .problem-item { padding:20px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-family:'Cormorant Garamond',serif; font-size:clamp(18px,2.5vw,24px); font-weight:400; color:var(--warm-gray); font-style:italic; display:flex; gap:20px; align-items:flex-start; line-height:1.4; }
        .problem-item::before { content:""; width:6px; height:6px; border-radius:50%; background:var(--crimson); flex-shrink:0; margin-top:10px; }
        .crimson-section { background:linear-gradient(135deg, var(--espresso) 0%, var(--walnut) 100%); padding:100px 40px; position:relative; overflow:hidden; }
        .crimson-section::before { content:"CRIMSON"; position:absolute; right:-40px; top:50%; transform:translateY(-50%) rotate(90deg); font-family:'Cormorant Garamond',serif; font-size:120px; font-weight:700; color:rgba(139,26,47,0.06); letter-spacing:20px; white-space:nowrap; pointer-events:none; }
        .crimson-inner { max-width:900px; margin:0 auto; }
        .crimson-quote { font-family:'Cormorant Garamond',serif; font-size:clamp(24px,3.5vw,38px); font-style:italic; color:var(--ivory); line-height:1.5; margin-top:32px; padding-left:24px; border-left:2px solid var(--crimson); max-width:680px; }
        .rooms { padding:100px 40px; max-width:900px; margin:0 auto; }
        .rooms-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin-top:48px; }
        @media(max-width:600px){ .rooms-grid { grid-template-columns:1fr; } }
        .room { background:rgba(255,255,255,0.02); border:1px solid rgba(139,26,47,0.12); padding:40px 32px; transition:all 0.3s ease; }
        .room:hover { background:rgba(139,26,47,0.06); border-color:rgba(139,26,47,0.25); }
        .room-icon { margin-bottom:20px; }
        .room-name { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; color:var(--ivory); margin-bottom:12px; }
        .room-desc { font-size:12px; line-height:1.85; color:var(--warm-gray); font-weight:300; }
        .for-you { background:var(--espresso); padding:100px 40px; }
        .for-you-inner { max-width:900px; margin:0 auto; }
        .for-you-list { margin-top:40px; display:grid; grid-template-columns:1fr 1fr; gap:2px; }
        @media(max-width:600px){ .for-you-list { grid-template-columns:1fr; } }
        .for-you-item { padding:28px 32px; background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.04); }
        .for-you-number { font-family:'Cormorant Garamond',serif; font-size:40px; font-weight:300; color:rgba(139,26,47,0.2); line-height:1; margin-bottom:10px; }
        .for-you-text { font-size:12px; line-height:1.8; color:var(--warm-gray); font-weight:300; font-style:italic; }
        .different { padding:100px 40px; max-width:900px; margin:0 auto; }
        .different-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:48px; }
        @media(max-width:600px){ .different-grid { grid-template-columns:1fr; } }
        .different-label { font-size:9px; letter-spacing:3px; text-transform:uppercase; color:var(--crimson); margin-bottom:8px; }
        .different-text { font-size:12px; line-height:1.85; color:var(--warm-gray); font-weight:300; }
        .cta-section { padding:120px 40px; text-align:center; background:radial-gradient(ellipse at 50% 50%, rgba(139,26,47,0.1) 0%, transparent 70%); }
        .cta-title { font-family:'Cormorant Garamond',serif; font-size:clamp(40px,6vw,68px); font-weight:600; color:var(--ivory); margin-bottom:16px; line-height:1.1; }
        .cta-title em { color:var(--crimson); font-style:italic; }
        .cta-sub { font-size:13px; color:var(--warm-gray); margin-bottom:48px; font-weight:300; }
        .cta-btn { display:inline-block; background:var(--crimson); color:var(--ivory); padding:18px 56px; font-family:'Poppins',sans-serif; font-size:11px; letter-spacing:4px; text-transform:uppercase; text-decoration:none; border-radius:2px; transition:all 0.3s ease; }
        .cta-btn:hover { background:var(--scarlet); transform:translateY(-2px); box-shadow:0 12px 40px rgba(139,26,47,0.4); }
        footer { background:var(--noir); border-top:1px solid rgba(139,26,47,0.15); padding:40px; text-align:center; }
        .footer-logo { font-family:'Cormorant Garamond',serif; font-size:16px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:var(--warm-gray); margin-bottom:8px; }
        .footer-logo span { color:var(--crimson); font-style:italic; }
        .footer-url { font-size:10px; color:rgba(138,132,128,0.4); letter-spacing:2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <section className="hero">
        <div className="logo">CONTENT STUDIO <span>AI</span></div>
        <h1 className="hero-headline">Your content.<em>Your voice.</em></h1>
        <p className="hero-sub">The all-in-one content platform built for creators who are done figuring it out alone.</p>
        <div className="scroll-hint">scroll to explore</div>
      </section>

      <div className="divider"><div className="divider-line"></div><div className="divider-dot"></div><div className="divider-line"></div></div>

      <section className="problem">
        <div className="problem-inner">
          <div className="section-eyebrow">Sound familiar?</div>
          <h2 className="section-title">You are not the problem.<br/><em>You just need better tools.</em></h2>
          <div className="problem-list">
            <div className="problem-item">You spend more time planning content than actually creating it.</div>
            <div className="problem-item">Every AI tool you try sounds nothing like you.</div>
            <div className="problem-item">You have seventeen tabs open and still feel behind.</div>
            <div className="problem-item">You know what you want to say but sitting down to say it feels impossible.</div>
            <div className="problem-item">You are tired of doing all of this completely alone.</div>
          </div>
        </div>
      </section>

      <div className="divider"><div className="divider-line"></div><div className="divider-dot"></div><div className="divider-line"></div></div>

      <section className="section">
        <div className="section-eyebrow">The solution</div>
        <h2 className="section-title">Stop figuring it<br/><em>out alone.</em></h2>
        <p className="section-body">Content Studio AI brings everything a creator needs into one beautiful, intelligent workspace. Your AI content coach lives here. Your content calendar lives here. Your courses, your community, your creative home — all of it, finally in one place.</p>
      </section>

      <div className="divider"><div className="divider-line"></div><div className="divider-dot"></div><div className="divider-line"></div></div>

      <section className="crimson-section">
        <div className="crimson-inner">
          <div className="section-eyebrow">Meet your new content partner</div>
          <h2 className="section-title">Meet <em>Crimson.</em></h2>
          <p className="section-body">Crimson is not a generic chatbot. She is your personal AI content coach who learns your voice, your niche, your platforms, and your goals. She helps you write captions that sound like you, brainstorm content ideas you actually want to make, and show up consistently without the burnout.</p>
          <div className="crimson-quote">"She does not sound like AI. She sounds like me — on a really good day."</div>
        </div>
      </section>

      <div className="divider"><div className="divider-line"></div><div className="divider-dot"></div><div className="divider-line"></div></div>

      <section className="rooms">
        <div className="section-eyebrow">What is inside</div>
        <h2 className="section-title">Four spaces.<br/><em>One home.</em></h2>
        <div className="rooms-grid">
          <div className="room">
            <div className="room-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="9.5" x2="16" y2="9.5" stroke="#8B1538" strokeWidth="1.2" strokeLinecap="round"/><line x1="8" y1="13" x2="13" y2="13" stroke="#8B1538" strokeWidth="1.2" strokeLinecap="round"/></svg></div>
            <div className="room-name">Crimson</div>
            <div className="room-desc">Your personal AI content coach. Talk to her daily. She knows your voice, your goals, and your audience.</div>
          </div>
          <div className="room">
            <div className="room-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2.5" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/><line x1="3" y1="9" x2="21" y2="9" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
            <div className="room-name">The Studio</div>
            <div className="room-desc">Your content planning headquarters. Map out your calendar and never stare at a blank page again.</div>
          </div>
          <div className="room">
            <div className="room-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="4.5" height="17" rx="1" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/><rect x="9.5" y="6" width="4.5" height="15" rx="1" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/><path d="M16.5 7l3.5 14" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
            <div className="room-name">The Library</div>
            <div className="room-desc">Courses and resources built specifically for creators inside the same platform you already use.</div>
          </div>
          <div className="room">
            <div className="room-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="3" stroke="#8B1538" strokeWidth="1.4"/><path d="M2 21v-1a7 7 0 0114 0v1" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round"/><circle cx="18" cy="8" r="2.5" stroke="#8B1538" strokeWidth="1.4" opacity="0.6"/><path d="M22 20v-1a5 5 0 00-3.5-4.8" stroke="#8B1538" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/></svg></div>
            <div className="room-name">The Lounge</div>
            <div className="room-desc">A private community of real creators who get it. Ask questions, share wins, and grow together.</div>
          </div>
        </div>
      </section>

      <div className="divider"><div className="divider-line"></div><div className="divider-dot"></div><div className="divider-line"></div></div>

      <section className="for-you">
        <div className="for-you-inner">
          <div className="section-eyebrow">Built for you if</div>
          <h2 className="section-title">This was made<br/><em>for you.</em></h2>
          <div className="for-you-list">
            <div className="for-you-item"><div className="for-you-number">01</div><div className="for-you-text">You are a content creator who feels behind and overwhelmed and wants a smarter way to work.</div></div>
            <div className="for-you-item"><div className="for-you-number">02</div><div className="for-you-text">You have been using AI tools that sound nothing like you and produce content you would never post.</div></div>
            <div className="for-you-item"><div className="for-you-number">03</div><div className="for-you-text">You want a content plan but never have the time or energy to sit down and make one.</div></div>
            <div className="for-you-item"><div className="for-you-number">04</div><div className="for-you-text">You are tired of doing everything alone and want a community of creators who actually get it.</div></div>
            <div className="for-you-item"><div className="for-you-number">05</div><div className="for-you-text">You are ready for a platform that treats you like the creative professional you already are.</div></div>
            <div className="for-you-item"><div className="for-you-number">06</div><div className="for-you-text">You want one home for everything instead of seventeen tools that do not talk to each other.</div></div>
          </div>
        </div>
      </section>

      <div className="divider"><div className="divider-line"></div><div className="divider-dot"></div><div className="divider-line"></div></div>

      <section className="different">
        <div className="section-eyebrow">Why it is different</div>
        <h2 className="section-title">This is not just<br/><em>another AI tool.</em></h2>
        <p className="section-body" style={{marginBottom:'48px'}}>Built by a creator who needed it and could not find it anywhere. Every feature exists because a real creator asked for it.</p>
        <div className="different-grid">
          <div className="different-item"><div className="different-label">Crimson</div><div className="different-text">Not a one size fits all bot. A personalized coach who learns your voice and grows with you.</div></div>
          <div className="different-item"><div className="different-label">The Studio</div><div className="different-text">Not a generic calendar. Built around how creators actually think, plan, and show up.</div></div>
          <div className="different-item"><div className="different-label">The Library</div><div className="different-text">Not a course dump. Curated education that connects directly to your actual goals.</div></div>
          <div className="different-item"><div className="different-label">The Lounge</div><div className="different-text">Not just a group chat. An intentional community built around genuine connection and real growth.</div></div>
        </div>
      </section>

      <div className="divider"><div className="divider-line"></div><div className="divider-dot"></div><div className="divider-line"></div></div>

      <section className="cta-section">
        <h2 className="cta-title">Ready to find<br/><em>your home?</em></h2>
        <p className="cta-sub">Content Studio AI is currently open to a small founding group of creators. Be one of the first inside.</p>
        <a href="https://contentstudioai.app/founding" className="cta-btn">Claim Your Founding Spot</a>
      </section>

      <footer>
        <div className="footer-logo">CONTENT STUDIO <span>AI</span></div>
        <div className="footer-url">contentstudioai.app</div>
      </footer>
    </>
  )
}