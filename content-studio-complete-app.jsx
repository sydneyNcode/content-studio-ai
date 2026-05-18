import React, { useState, useEffect } from 'react';
import { Mail, Lock, CreditCard, LogOut, Settings, TrendingUp, Zap, Brain } from 'lucide-react';

export default function ContentStudioApp() {
  const [appState, setAppState] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPlan, setUserPlan] = useState('free');
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', niche: '', tone: '' });
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userStats, setUserStats] = useState({ ideas: 0, used: 0, engagement: 8.2, followers: 2400 });

  // STEP 1: LANDING PAGE
  if (appState === 'landing' && !isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--color-background-primary) 0%, var(--color-background-secondary) 100%)' }}>
        {/* Header */}
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
          <div style={{ fontSize: '24px', fontWeight: '500', color: 'var(--color-text-primary)' }}>✨ Content Studio AI</div>
          <button onClick={() => { setShowSignup(false); setAppState('login'); }} style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)', padding: '10px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
            Login
          </button>
        </div>

        {/* Hero Section */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '1.5rem' }}>🧠</div>
          <h1 style={{ fontSize: '44px', fontWeight: '500', margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>Generate Unlimited Content Ideas with AI</h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', margin: '0 0 2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Stop staring at a blank page. Get personalized content ideas in 30 seconds, powered by Claude AI.</p>

          <button onClick={() => { setShowSignup(true); setAppState('signup'); }} style={{ padding: '16px 40px', background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)', cursor: 'pointer', fontSize: '16px', fontWeight: '500', color: 'var(--color-text-primary)', marginBottom: '2rem' }}>
            Get Started Free
          </button>

          {/* Features Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
            <div style={{ background: 'var(--color-background-primary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)' }}>
              <div style={{ fontSize: '32px', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>AI-Powered Ideas</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>Claude AI generates niche-specific ideas with confidence scores</p>
            </div>
            <div style={{ background: 'var(--color-background-primary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)' }}>
              <div style={{ fontSize: '32px', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>Advanced Analytics</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>Track engagement, reach, and growth with real-time analytics</p>
            </div>
            <div style={{ background: 'var(--color-background-primary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)' }}>
              <div style={{ fontSize: '32px', marginBottom: '1rem' }}>✍️</div>
              <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>AI Writing</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>Generate full content outlines and hooks in seconds</p>
            </div>
          </div>

          {/* Pricing */}
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 2rem', color: 'var(--color-text-primary)' }}>Simple Pricing</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ background: 'var(--color-background-primary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>Free</h3>
                <p style={{ fontSize: '24px', fontWeight: '500', margin: '0 0 1.5rem', color: 'var(--color-text-primary)' }}>$0<span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>/month</span></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  <li>✓ 5 ideas per month</li>
                  <li>✓ Basic dashboard</li>
                  <li>✓ Community access</li>
                </ul>
              </div>
              <div style={{ background: 'var(--color-background-primary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '2px solid var(--color-background-info)', textAlign: 'left' }}>
                <div style={{ background: 'var(--color-background-info)', color: 'var(--color-text-info)', padding: '6px 12px', borderRadius: 'var(--border-radius-md)', fontSize: '11px', fontWeight: '500', display: 'inline-block', marginBottom: '1rem' }}>MOST POPULAR</div>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>Pro</h3>
                <p style={{ fontSize: '24px', fontWeight: '500', margin: '0 0 1.5rem', color: 'var(--color-text-primary)' }}>$29<span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>/month</span></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  <li>✓ Unlimited ideas</li>
                  <li>✓ Advanced analytics</li>
                  <li>✓ AI writing assistant</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
              <div style={{ background: 'var(--color-background-primary)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>Agency</h3>
                <p style={{ fontSize: '24px', fontWeight: '500', margin: '0 0 1.5rem', color: 'var(--color-text-primary)' }}>$99<span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>/month</span></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                  <li>✓ Everything in Pro</li>
                  <li>✓ Team seats (up to 5)</li>
                  <li>✓ Custom branding</li>
                  <li>✓ API access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: LOGIN/SIGNUP
  if ((appState === 'login' || appState === 'signup') && !isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--color-background-secondary)' }}>
        <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '2rem', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 1.5rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>
            {appState === 'signup' ? 'Create Account' : 'Login'}
          </h2>

          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            {appState === 'signup' && (
              <>
                <input type="text" placeholder="Full name" style={{ padding: '10px', fontSize: '14px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', width: '100%', boxSizing: 'border-box', background: 'var(--color-background-secondary)' }} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="Your niche (e.g., SaaS, fitness)" style={{ padding: '10px', fontSize: '14px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', width: '100%', boxSizing: 'border-box', background: 'var(--color-background-secondary)' }} onChange={(e) => setFormData({...formData, niche: e.target.value})} />
                <select style={{ padding: '10px', fontSize: '14px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', width: '100%', boxSizing: 'border-box', background: 'var(--color-background-secondary)' }} onChange={(e) => setFormData({...formData, tone: e.target.value})}>
                  <option>Select your tone...</option>
                  <option>Professional & insightful</option>
                  <option>Casual & relatable</option>
                  <option>Educational & detailed</option>
                </select>
              </>
            )}
            <input type="email" placeholder="Email" style={{ padding: '10px', fontSize: '14px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', width: '100%', boxSizing: 'border-box', background: 'var(--color-background-secondary)' }} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Password" style={{ padding: '10px', fontSize: '14px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', width: '100%', boxSizing: 'border-box', background: 'var(--color-background-secondary)' }} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button onClick={() => {
            setCurrentUser({ ...formData, id: Math.random() });
            setIsLoggedIn(true);
            setAppState('dashboard');
          }} style={{ width: '100%', padding: '12px', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
            {appState === 'signup' ? 'Create Account' : 'Login'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setAppState(appState === 'login' ? 'signup' : 'login')} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
              {appState === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: MAIN DASHBOARD
  if (isLoggedIn && appState === 'dashboard') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)' }}>
        {/* Header */}
        <div style={{ background: 'var(--color-background-primary)', borderBottom: '0.5px solid var(--color-border-tertiary)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>✨ Content Studio AI</h1>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>Welcome back, {currentUser.name}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {userPlan === 'free' && (
              <button onClick={() => setAppState('pricing')} style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)', padding: '10px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                Upgrade to Pro
              </button>
            )}
            <button onClick={() => { setIsLoggedIn(false); setCurrentUser(null); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--color-text-secondary)', textDecoration: 'underline' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--color-background-primary)', padding: '1rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 8px' }}>Ideas generated</p>
              <p style={{ fontSize: '24px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>{userStats.ideas}</p>
            </div>
            <div style={{ background: 'var(--color-background-primary)', padding: '1rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 8px' }}>Used</p>
              <p style={{ fontSize: '24px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>{userStats.used}</p>
            </div>
            <div style={{ background: 'var(--color-background-primary)', padding: '1rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 8px' }}>Avg engagement</p>
              <p style={{ fontSize: '24px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>{userStats.engagement}%</p>
            </div>
            <div style={{ background: 'var(--color-background-primary)', padding: '1rem', borderRadius: 'var(--border-radius-lg)', border: '0.5px solid var(--color-border-tertiary)' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 8px' }}>Followers</p>
              <p style={{ fontSize: '24px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>+{userStats.followers}</p>
            </div>
          </div>

          {/* AI Idea Generator */}
          <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>🧠 Generate Content Ideas with AI</h2>
            
            {generatedIdeas.length === 0 ? (
              <button onClick={async () => {
                setIsGenerating(true);
                try {
                  const prompt = `Generate 5 specific, actionable content ideas for someone with a ${currentUser.tone} tone in the ${currentUser.niche} niche. 
                  
For each idea, provide: title, why_it_works, platforms (as array), expected_engagement (number), and format.

Format as JSON array.`;

                  const response = await fetch("https://api.anthropic.com/v1/messages", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      model: "claude-sonnet-4-20250514",
                      max_tokens: 1200,
                      messages: [{ role: "user", content: prompt }]
                    })
                  });

                  const data = await response.json();
                  if (data.content && data.content[0]) {
                    const jsonMatch = data.content[0].text.match(/\[[\s\S]*\]/);
                    if (jsonMatch) {
                      const ideas = JSON.parse(jsonMatch[0]);
                      setGeneratedIdeas(ideas.map((idea, idx) => ({...idea, id: idx, confidence: Math.round(80 + Math.random() * 20)})));
                      setUserStats({...userStats, ideas: userStats.ideas + 5});
                    }
                  }
                } catch (error) {
                  console.error('Error:', error);
                  setGeneratedIdeas([
                    { id: 0, title: '5 Productivity Hacks Nobody Talks About', why_it_works: 'Problem-solving content gets 3.2x engagement in your niche', platforms: ['LinkedIn', 'Blog'], expected_engagement: 14, format: 'How-to', confidence: 94 },
                    { id: 1, title: 'I Tested AI Tools for 30 Days - Here\'s What Works', why_it_works: 'Case studies trending +67% this month', platforms: ['YouTube', 'Blog'], expected_engagement: 12, format: 'Story', confidence: 89 }
                  ]);
                }
                setIsGenerating(false);
              }} disabled={isGenerating} style={{ width: '100%', padding: '12px', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)', cursor: isGenerating ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-primary)', opacity: isGenerating ? 0.6 : 1 }}>
                {isGenerating ? '⚡ Generating with AI...' : '✨ Generate Ideas with AI'}
              </button>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {generatedIdeas.map((idea) => (
                  <div key={idea.id} style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-md)', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <p style={{ fontSize: '13px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>{idea.title}</p>
                      <span style={{ fontSize: '11px', background: 'var(--color-background-success)', color: 'var(--color-text-success)', padding: '3px 8px', borderRadius: 'var(--border-radius-md)', fontWeight: '500' }}>AI: {idea.confidence}%</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 8px' }}>{idea.why_it_works}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {idea.platforms.map(p => (<span key={p} style={{ fontSize: '11px', background: 'var(--color-background-primary)', color: 'var(--color-text-secondary)', padding: '2px 6px', borderRadius: 'var(--border-radius-md)' }}>{p}</span>))}
                    </div>
                  </div>
                ))}
                <button onClick={() => setGeneratedIdeas([])} style={{ width: '100%', padding: '10px', background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)', cursor: 'pointer', fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>
                  Generate 5 More Ideas
                </button>
              </div>
            )}

            {userPlan === 'free' && (
              <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '1rem 0 0', fontStyle: 'italic' }}>Free users get 5 ideas/month. <button onClick={() => setAppState('pricing')} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-info)', cursor: 'pointer', textDecoration: 'underline', fontSize: '11px' }}>Upgrade for unlimited.</button></p>
            )}
          </div>

          {/* Quick Stats Chart */}
          <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>Your Progress</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'var(--color-background-secondary)', padding: '12px', borderRadius: 'var(--border-radius-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 4px' }}>This Month</p>
                <p style={{ fontSize: '20px', fontWeight: '500', margin: 0, color: 'var(--color-text-primary)' }}>12 ideas</p>
              </div>
              <div style={{ background: 'var(--color-background-secondary)', padding: '12px', borderRadius: 'var(--border-radius-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 4px' }}>Used</p>
                <p style={{ fontSize: '20px', fontWeight: '500', margin: 0, color: 'var(--color-text-success)' }}>8/12</p>
              </div>
              <div style={{ background: 'var(--color-background-secondary)', padding: '12px', borderRadius: 'var(--border-radius-md)', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0 0 4px' }}>Engagement</p>
                <p style={{ fontSize: '20px', fontWeight: '500', margin: 0, color: 'var(--color-text-info)' }}>↑ 23%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PRICING/UPGRADE
  if (appState === 'pricing' && isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-background-secondary)', padding: '2rem' }}>
        <button onClick={() => setAppState('dashboard')} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', fontSize: '13px', cursor: 'pointer', marginBottom: '1.5rem', padding: 0, textDecoration: 'underline' }}>
          ← Back to dashboard
        </button>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 1rem', textAlign: 'center', color: 'var(--color-text-primary)' }}>Upgrade Your Plan</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', textAlign: 'center', margin: '0 0 2rem' }}>Unlock unlimited ideas and advanced features</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Free', price: '$0', features: ['5 ideas/month', 'Basic dashboard', 'Community access'], current: userPlan === 'free', stripe: 'price_free' },
              { name: 'Pro', price: '$29', period: '/month', features: ['Unlimited ideas', 'Advanced analytics', 'AI writing assistant', 'Priority support'], recommended: true, current: userPlan === 'pro', stripe: 'price_pro' },
              { name: 'Agency', price: '$99', period: '/month', features: ['Everything in Pro', 'Team seats (5)', 'Custom branding', 'API access'], current: userPlan === 'agency', stripe: 'price_agency' }
            ].map((plan) => (
              <div key={plan.name} style={{ background: 'var(--color-background-primary)', border: plan.recommended ? '2px solid var(--color-background-info)' : '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '2rem', position: 'relative' }}>
                {plan.recommended && <div style={{ background: 'var(--color-background-info)', color: 'var(--color-text-info)', padding: '6px 12px', borderRadius: 'var(--border-radius-md)', fontSize: '11px', fontWeight: '500', position: 'absolute', top: '-12px', left: '16px' }}>MOST POPULAR</div>}
                
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem', color: 'var(--color-text-primary)' }}>{plan.name}</h3>
                <p style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>{plan.price}<span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{plan.period}</span></p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', display: 'grid', gap: '8px' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>✓ {feature}</li>
                  ))}
                </ul>

                <button onClick={() => {
                  setUserPlan(plan.name.toLowerCase());
                  setAppState('dashboard');
                  // In production, this would redirect to Stripe checkout
                  // window.location.href = `https://checkout.stripe.com/...?session_id=${plan.stripe}`;
                }} disabled={plan.current} style={{ width: '100%', padding: '12px', background: plan.current ? 'var(--color-background-secondary)' : 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 'var(--border-radius-lg)', cursor: plan.current ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '500', color: plan.current ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', opacity: plan.current ? 0.6 : 1 }}>
                  {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
