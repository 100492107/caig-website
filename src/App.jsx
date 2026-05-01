import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Logo, LogoMark } from './Logo'
import Privacy from './Privacy'
import Terms from './Terms'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

/* ── PARTICLE ENGINE — init once at module level, never again ── */
const engineReady = initParticlesEngine(async engine => { await loadSlim(engine) })

const PARTICLE_OPTIONS = {
  background: { color: { value: '#02040e' } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' } },
    modes: { grab: { distance: 160, links: { opacity: 0.28 } } },
  },
  particles: {
    color: { value: ['#f7b034', '#7c7fff', '#34d8a4'] },
    links: { color: '#ffffff', distance: 130, enable: true, opacity: 0.13, width: 1 },
    move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false, outModes: { default: 'bounce' } },
    number: { value: 70, density: { enable: true, area: 1000 } },
    opacity: { value: { min: 0.4, max: 0.85 }, animation: { enable: true, speed: 0.4, sync: false } },
    shape: { type: 'circle' },
    size: { value: { min: 1.5, max: 3 } },
  },
  detectRetina: true,
}

function ParticlesHeroBg({ opacity }) {
  const [ready, setReady] = useState(false)
  useEffect(() => { engineReady.then(() => setReady(true)) }, [])
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: ready ? opacity : 0, transition: ready ? 'none' : 'opacity 0.6s ease', pointerEvents: opacity < 0.05 ? 'none' : 'auto' }}>
      {ready && (
        <Particles id="hero-particles" options={PARTICLE_OPTIONS} style={{ position: 'absolute', inset: 0 }} />
      )}
    </div>
  )
}

/* ── FRAMER HELPERS ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = (delay = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren: 0.10, delayChildren: delay } },
})

function FadeUp({ children, className, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref} className={className} style={style}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function StaggerGrid({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref} className={className}
      variants={stagger(delay)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

function FadeItem({ children, className }) {
  return <motion.div className={className} variants={fadeUp}>{children}</motion.div>
}

function Counter({ to, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1600
    const raf = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * to))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, to])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ── ICONS ───────────────────────────────────────────────────── */
const Icon = {
  Gem: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  TrendingDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Zap: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Target: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  BarChart: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  Layers: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  RefreshCw: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  Shield: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ArrowRight: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Mail: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Calendar: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Star: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  FileText: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
}

/* ── COUNT-UP HOOK ───────────────────────────────────────────── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return [count, ref]
}

/* ── STICKY CTA BAR ─────────────────────────────────────────── */
function StickyBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="sticky-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sticky-bar-inner">
            <div className="sticky-bar-text">
              <span className="sticky-bar-title">Finance content, produced and delivered. No briefing. No chasing. Just post.</span>
              <span className="sticky-bar-sub">30-min call · Real finance content examples · Live portal demo</span>
            </div>
            <a href="#contact" className="btn btn-amber btn-md breathe">
              Book Free Call <Icon.ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── PORTAL DELIVERABLES GRID ────────────────────────────────── */
const PORTAL_ITEMS = [
  { icon: <Icon.Zap size={22} />, label: 'YouTube Scripts', desc: 'Full long-form scripts covering finance topics — investing, budgeting, tax, ETFs, market breakdowns — structured for watch time, retention, and CTR.' },
  { icon: <Icon.FileText size={22} />, label: 'Hook Openers', desc: 'Pattern-interrupt hooks written specifically for finance audiences. "You\'ve been calculating compound interest wrong." Tested formats, every week.' },
  { icon: <Icon.Target size={22} />, label: 'X (Twitter) Threads', desc: 'Finance threads built for engagement and follower growth — breakdowns, contrarian takes, explainers, ranked lists. Ready to post, pre-formatted.' },
  { icon: <Icon.Layers size={22} />, label: 'Short-form Captions', desc: 'Captions for YouTube Shorts, TikTok, and Instagram Reels — platform-specific, hashtag-optimised, built to convert viewers to subscribers.' },
  { icon: <Icon.Star size={22} />, label: 'Brand Sponsorship Proposals', desc: 'Tailored outreach to fintech platforms, trading apps, insurance providers, and financial tools. Researched, written, and formatted. Ready to send.' },
  { icon: <Icon.RefreshCw size={22} />, label: 'Monthly Performance Report', desc: 'We track what landed, what didn\'t, and what to do more of. Every month\'s content is better than the last because we\'re looking at what actually worked.' },
]

function PortalGrid() {
  return (
    <section className="portal-section section" id="portal">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />What We Deliver</div>
            <h2 className="section-title">Every format. Every platform.<br />Every week. Finance-specific.</h2>
            <p className="section-sub">
              YouTube scripts, X threads, short-form hooks, captions, and brand sponsorship proposals — written for finance creators, not adapted from a template. Everything lands in your portal every Monday.
            </p>
          </div>
        </FadeUp>
        <StaggerGrid className="portal-grid">
          {PORTAL_ITEMS.map((item, i) => (
            <FadeItem key={i}>
              <div className="portal-card">
                <div className="portal-icon">{item.icon}</div>
                <div className="portal-label">{item.label}</div>
                <div className="portal-desc">{item.desc}</div>
              </div>
            </FadeItem>
          ))}
        </StaggerGrid>
        <FadeUp delay={0.15}>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="#contact" className="btn btn-amber btn-lg breathe">
              See It Built for Your Roster <Icon.ArrowRight size={15} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── NAV ─────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-eyebrow">CAIG — Finance Creator Content</div>
        <div className="nav-right">
          <a href="#contact" className="btn btn-amber btn-md breathe">See a Live Demo</a>
        </div>
      </div>
    </nav>
  )
}

/* ── HERO DASHBOARD MOCKUP ───────────────────────────────────── */
const HD_MODULES = [
  {
    id: 'content',
    label: 'Content Engine',
    color: '#34d399',
    client: 'Cara & Lila · @caraandlila · TikTok',
    type: 'Budget Travel · Hook + Caption',
    output: `HOOK
"£380. 7 days. Georgia. Here's everything we actually spent."

CAPTION
Nobody tells you about the tourist tax. Or the airport transfer that costs more than your flight. Or the resort fee they add at checkout.

We tracked every single penny for 7 days in Tbilisi.

Day 1: £23 (flight snacks + SIM card)
Day 2: £18 (hostel, dinner, two beers)
Day 3: £31 (wine tour — worth every penny)

Full breakdown in the link 👇

#budgettravel #georgia #tbilisi #travelbudget #caraandlila`,
  },
  {
    id: 'partnerships',
    label: 'Brand Proposals',
    color: '#818cf8',
    client: 'BYLT Basics · Sponsorship Deck',
    type: 'Maya Chen · Fitness · Partnership Proposal',
    output: `PARTNERSHIP PROPOSAL
Maya Chen (@maya.trains) × BYLT Basics

Maya is a Singapore-based strength training creator
with a dry, direct voice and a no-filter approach
to fitness. She documents real progress — not
highlight reels.

NICHE: Strength training & realistic nutrition
PLATFORMS: TikTok, Instagram, YouTube
BRAND FIT: Performance apparel, gym equipment,
           honest supplement brands

PROPOSED DELIVERABLES
• 2× dedicated TikTok posts (60s)
• 1× Instagram Reel + static
• Pinned link-in-bio (30 days)

INVESTMENT: £1,200 flat + 10% affiliate`,
  },
  {
    id: 'strategy',
    label: 'Content Strategy',
    color: '#f59e0b',
    client: 'Zara Williams · @zara.sportsgirl',
    type: 'Football · Monthly Content Plan',
    output: `CONTENT STRATEGY — MONTH 3
Zara Williams · Football Content Creator

WHAT'S WORKING
Match verdict posts — tactical breakdowns
from a female fan perspective. Outperforming
every other pillar by 3× on TikTok.

DOUBLE DOWN THIS MONTH
→ Post every match day by 10pm
→ Add 60s "hot take" format alongside recap
→ Test pre-match prediction format

CONTENT CALENDAR
Week 1: 4 posts (2 match day, 1 opinion, 1 behind scenes)
Week 2: 4 posts (2 match day, 1 opinion, 1 collab pitch)
Week 3: 5 posts (Champions League week)
Week 4: 3 posts + monthly wrap`,
  },
  {
    id: 'captions',
    label: 'Caption Library',
    color: '#fb923c',
    client: 'Nova · @nova.plays · Gaming',
    type: 'Weekly Caption Batch · 8 posts',
    output: `CAPTION BATCH — WEEK 14
Nova (@nova.plays) · Gaming · 8 posts ready

POST 1 — NEW GAME DROP
"Stayed up until 4am for this.
Zero regrets. Full review incoming."

POST 2 — RANKED GRIND
"Climbed 400 LP in 6 hours.
My hands are shaking. I need water."

POST 3 — COMMUNITY POLL
"Hot take incoming — drop your answer below
before I say something controversial."

POST 4 — BRAND COLLAB (Secretlab)
"Finally upgraded the setup.
The difference is actually unreal — details below."

[+ 4 more captions ready to schedule]`,
  },
]

function HeroDashboard() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [phase, setPhase] = useState('typing')
  const mod = HD_MODULES[activeIdx]

  useEffect(() => {
    setDisplayedText('')
    setPhase('typing')
  }, [activeIdx])

  useEffect(() => {
    if (phase !== 'typing') return
    if (displayedText.length >= mod.output.length) {
      setPhase('pausing')
      const t = setTimeout(() => setActiveIdx(i => (i + 1) % HD_MODULES.length), 2800)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayedText(mod.output.slice(0, displayedText.length + 4))
    }, 16)
    return () => clearTimeout(t)
  }, [displayedText, phase, mod.output])

  return (
    <motion.div
      className="hero-dashboard"
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Browser chrome */}
      <div className="hd-chrome">
        <div className="hd-dots">
          <span style={{ background: '#ff5f57' }} />
          <span style={{ background: '#febc2e' }} />
          <span style={{ background: '#28c840' }} />
        </div>
        <div className="hd-url">app.cornerstoneaigroup.com</div>
        <div style={{ width: 52 }} />
      </div>

      {/* App body */}
      <div className="hd-body">
        {/* Sidebar */}
        <div className="hd-sidebar">
          <div className="hd-sidebar-gem">
            <LogoMark size={32} />
          </div>
          <div className="hd-sidebar-div" />
          {HD_MODULES.map((m, i) => (
            <div
              key={m.id}
              className={`hd-sitem${i === activeIdx ? ' active' : ''}`}
              style={{ '--mc': m.color }}
            >
              <span className="hd-sitem-dot" />
              <span className="hd-sitem-label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="hd-main">
          <div className="hd-topbar">
            <span className="hd-module-name">{mod.label}</span>
            <span className="hd-gen-badge" style={{ '--mc': mod.color }}>
              <span className={`hd-gen-dot${phase === 'typing' ? ' pulse' : ''}`} />
              {phase === 'typing' ? 'Generating…' : 'Complete'}
            </span>
          </div>
          <div className="hd-meta-row">
            <span className="hd-mk">Client</span>
            <span className="hd-mv">{mod.client}</span>
            <span className="hd-mk">Type</span>
            <span className="hd-mv">{mod.type}</span>
          </div>
          <div className="hd-output">
            <pre className="hd-pre">
              {displayedText}
              {phase === 'typing' && <span className="hd-cursor">▋</span>}
            </pre>
          </div>
          <div className="hd-footer-bar">
            {HD_MODULES.map((m, i) => (
              <div
                key={m.id}
                className="hd-mod-chip"
                style={{ background: i === activeIdx ? `${m.color}20` : 'transparent', color: i === activeIdx ? m.color : 'var(--t4)' }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: i === activeIdx ? m.color : 'rgba(255,255,255,0.15)', display: 'inline-block', marginRight: 5 }} />
                {m.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── HERO TICKER ──────────────────────────────────────────────── */
const TICKER_ITEMS = [
  { icon: '✓', text: 'Scripts, hooks, and captions written and delivered every week' },
  { icon: '↑', text: 'Your creators post consistently — without briefing anyone' },
  { icon: '★', text: 'Brand proposals written and sent on your behalf' },
  { icon: '⚡', text: 'Content produced by AI, quality-checked by our team' },
  { icon: '✓', text: 'Cancel with 30 days notice — no lock-in ever' },
  { icon: '↑', text: 'More output. Less time spent writing.' },
  { icon: '★', text: 'Everything delivered via your private client portal' },
  { icon: '⚡', text: 'We write it. You approve it. Your creators post it.' },
]

function HeroTicker() {
  // Duplicate for seamless infinite loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="hero-ticker">
      <div className="hero-ticker-fade hero-ticker-fade-l" />
      <div className="hero-ticker-track">
        {items.map((item, i) => (
          <div key={i} className="hero-ticker-item">
            <span className="hero-ticker-icon">{item.icon}</span>
            <span className="hero-ticker-text">{item.text}</span>
            <span className="hero-ticker-sep" />
          </div>
        ))}
      </div>
      <div className="hero-ticker-fade hero-ticker-fade-r" />
    </div>
  )
}

/* ── HERO PROCESS STRIP ──────────────────────────────────────── */
function HeroProcessStrip() {
  const steps = [
    { n: '01', label: 'Onboard once', body: 'One call. We map your niche, voice, and audience.' },
    { n: '02', label: 'We write it all', body: 'Scripts, hooks, threads, captions — AI-drafted, human-reviewed.' },
    { n: '03', label: 'In your portal Monday', body: 'A full week of content, ready to approve and post.' },
    { n: '04', label: 'We track & improve', body: 'Monthly performance report. Output gets sharper every cycle.' },
  ]
  return (
    <div className="hero-process-strip">
      {steps.map((s, i) => (
        <div key={i} className="hps-item">
          <div className="hps-num">{s.n}</div>
          <div className="hps-label">{s.label}</div>
          <div className="hps-body">{s.body}</div>
        </div>
      ))}
    </div>
  )
}

/* ── HERO ─────────────────────────────────────────────────────── */
function Hero() {
  const sectionRef = useRef(null)
  const [particleOpacity, setParticleOpacity] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const h = el.offsetHeight
      const scrolled = window.scrollY
      // start fading at 60% through the hero, fully gone by the bottom
      const fadeStart = h * 0.55
      const fadeEnd   = h * 0.95
      const raw = 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart)
      setParticleOpacity(Math.min(1, Math.max(0, raw)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" ref={sectionRef}>
      <ParticlesHeroBg opacity={particleOpacity} />
      <div className="hero-overlay" />
      <div className="hero-orbs" style={{ opacity: particleOpacity, transition: 'none' }}>
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="container">
        <div className="hero-center">

          <motion.div
            className="hero-what"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            Done-for-you content for finance creators &amp; the agencies that manage them
          </motion.div>

          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Your finance creators should be<br />
            <span className="hl">posting five times a week.</span><br />
            <span className="hero-h1-sub">Most manage one or two. We fix that.</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.55 }}
          >
            CAIG produces weekly YouTube scripts, X threads, short-form hooks, captions, and brand sponsorship proposals for finance and personal finance creators — AI-generated, human-reviewed, delivered to your private portal every Monday. You approve. They post. No briefing required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="#contact" className="btn btn-amber btn-xl breathe">
              Book a Free Discovery Call
              <Icon.ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <HeroProcessStrip />
          </motion.div>

        </div>
      </div>

      <HeroTicker />
    </section>
  )
}

/* ── PROOF BAR ───────────────────────────────────────────────── */
function ProofBar() {
  return (
    <div className="proof-bar">
      <div className="container">
        <div className="proof-bar-inner">
        {[
          { text: 'Finance-specific',  label: 'Content written for the finance niche — not adapted from a generic template', amber: true },
          { text: 'Weekly',            label: 'YouTube scripts, X threads, hooks, captions, and proposals delivered every Monday', amber: false },
          { text: 'AI + human QA',     label: 'Every piece AI-generated and reviewed by our team before delivery', amber: false },
          { text: '30 days',           label: 'Notice to cancel — no contracts, no lock-in, no penalty', amber: false },
        ].map((s, i) => (
          <div className="proof-stat" key={i}>
            <div className="proof-val">
              <span className={s.amber ? 'av' : ''}>{s.text}</span>
            </div>
            <div className="proof-lbl">{s.label}</div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

/* ── PROBLEM ─────────────────────────────────────────────────── */
const problems = [
  {
    icon: <Icon.Clock />,
    title: "Finance creators know their subject. Writing about it every week is where the time goes.",
    body: "Explaining compound interest, breaking down an ETF, scripting a Roth IRA comparison — the knowledge is there. The two hours it takes to turn it into a hook, a script, and a caption set is not. So the video doesn't get made. The channel stalls. The brand deal window closes.",
  },
  {
    icon: <Icon.TrendingDown />,
    title: "Sponsorship revenue is being left on the table because the pitch never gets written.",
    body: "Finance creators command some of the highest CPMs and brand deal rates in the creator economy. Fintech, trading platforms, credit cards, insurance, tax tools — the budgets are there. But a compelling, tailored sponsorship proposal takes time nobody has. The opportunity disappears to whoever sends it first.",
  },
  {
    icon: <Icon.AlertCircle />,
    title: "Agencies managing finance creators are producing content for five — and struggling to cover two.",
    body: "One creator posting inconsistently is a missed opportunity. A roster of finance creators all posting inconsistently is a systematic problem. The scripts, the threads, the hooks — they all need writing. When nobody has time to write them, your roster plateaus and your retainer justification weakens.",
  },
]

function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />The Real Problem</div>
            <h2 className="section-title">Finance creators have the authority.<br />The content production is where it breaks down.</h2>
            <p className="section-sub">
              Your creators understand macro trends, tax efficiency, and portfolio construction better than anyone. None of that matters if they're not posting consistently. The knowledge is there. The writing infrastructure is not.
            </p>
          </div>
        </FadeUp>
        <StaggerGrid className="problem-grid">
          {problems.map((p, i) => (
            <FadeItem key={i}>
              <div className="problem-card">
                <div className="pc-icon">{p.icon}</div>
                <div className="pc-title">{p.title}</div>
                <div className="pc-body">{p.body}</div>
              </div>
            </FadeItem>
          ))}
        </StaggerGrid>
        <FadeUp delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <a href="#contact" className="btn btn-outline-amber btn-lg">
              See how we fix it <Icon.ArrowRight />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── SOLUTION ────────────────────────────────────────────────── */
const solutions = [
  { icon: <Icon.Target size={18} />, title: 'Finance content written weekly — no brief required', body: 'YouTube scripts on investing, budgeting, and market analysis. X threads. Short-form hooks. Captions. All written specifically for finance creators — their voice, their audience, their niche — and delivered every Monday. You brief us once at onboarding. After that, it just arrives.' },
  { icon: <Icon.Zap size={18} />, title: 'Sponsorship proposals to the right brands — written and ready', body: 'Fintech platforms, trading apps, robo-advisors, insurance providers, tax tools — finance creators command some of the highest brand deal rates in the industry. On Growth and Agency plans, we research the right brands, write the proposals, and have them ready for you to send. No deal falls through because nobody had time to write the pitch.' },
  { icon: <Icon.Layers size={18} />, title: 'Monthly performance reporting — content gets better over time', body: 'Each month we analyse which topics drove views, which hooks got clicks, and which formats retained audience longest. We adjust next month\'s content accordingly. Your creators\'s output improves every cycle. Generic AI tools don\'t do this. This is why the output compounds.' },
  { icon: <Icon.RefreshCw size={18} />, title: 'One portal — approve, download, post', body: 'All content lands in your private CAIG portal every Monday. You review each piece, approve what you want, and hand off or post. No email chains. No Google Docs. No chasing for drafts. One clean interface. Everything in one place.' },
  { icon: <Icon.Shield size={18} />, title: 'Fully managed. Nothing to write. Cancel with 30 days\' notice.', body: 'We handle research, drafting, QA, and delivery. You manage the creators and relationships. The entire workflow on your side is: open the portal, review, approve. That\'s it. Cancel any time with 30 days\' written notice — no penalty, no lock-in.' },
]

function Solution() {
  return (
    <section className="solution-section section" id="solution">
      <div className="container">
        <div className="sol-grid">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />What We Do</div>
            <h2 className="section-title">The content engine your finance creators are missing.</h2>
            <p className="section-sub" style={{ marginBottom: '36px' }}>
              Not a tool. Not a freelancer. A managed system that produces finance-specific content every week — scripts, threads, hooks, captions, and brand proposals — without you writing a single word.
            </p>
            <a href="#contact" className="btn btn-amber btn-lg">
              See It Working — Book a Demo <Icon.ArrowRight />
            </a>
          </FadeUp>
          <StaggerGrid className="sol-cards">
            {solutions.map((s, i) => (
              <FadeItem key={i}>
                <div className="sol-card">
                  <div className="sol-icon">{s.icon}</div>
                  <div>
                    <div className="sol-title">{s.title}</div>
                    <div className="sol-body">{s.body}</div>
                  </div>
                </div>
              </FadeItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  )
}

/* ── PROCESS CREDIBILITY ─────────────────────────────────────── */
function ProcessCredibility() {
  const pillars = [
    {
      icon: <Icon.Layers size={22} />,
      title: 'AI-generated. Human-reviewed.',
      body: 'Every piece of content starts with our AI system, trained around the creator\'s niche, platform, tone, and audience. Then our team reviews every output before it lands in your portal. You never receive raw AI. You receive edited, ready-to-post content.',
    },
    {
      icon: <Icon.RefreshCw size={22} />,
      title: 'Monday delivery. Every week. Without being briefed.',
      body: 'You do the onboarding once. After that, content appears in your portal every Monday — no check-in call, no weekly brief, no prompting required. If something changes, you tell us and we adjust. That is the entire workflow on your side.',
    },
    {
      icon: <Icon.Shield size={22} />,
      title: 'One private portal. Everything in one place.',
      body: 'All content — scripts, captions, hooks, content plans, brand proposals — is delivered through your private CAIG portal. You review, approve, and hand off. No email chains, no shared documents, no chasing for drafts.',
    },
    {
      icon: <Icon.Target size={22} />,
      title: 'Built for your niche. Not a template.',
      body: 'We build a content profile for every creator — platform, niche, audience demographics, tone, and format preferences. What gets delivered is built specifically for them. The same system cannot produce the same output for a different creator. That is by design.',
    },
    {
      icon: <Icon.Zap size={22} />,
      title: 'Brand proposals included — on higher plans.',
      body: 'On Growth and Agency plans, we write tailored brand partnership proposals for your creators. Researched, formatted, and ready to send. You approve. We deliver. The deals that used to fall through because nobody had time to write the pitch stop falling through.',
    },
    {
      icon: <Icon.Check size={22} />,
      title: 'No lock-in. Cancel with 30 days\' notice.',
      body: 'There are no long-term contracts. You can cancel any plan with 30 days\' written notice, no penalty, no questions. We keep clients because the output is good — not because we trap them in a contract.',
    },
  ]
  return (
    <section className="section cred-section" id="how-we-work">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />How We Actually Work</div>
            <h2 className="section-title">Specific claims.<br />No vague promises.</h2>
            <p className="section-sub">
              Here is exactly what CAIG produces for finance creators, how it gets produced, and what the entire process looks like on your side.
            </p>
          </div>
        </FadeUp>
        <StaggerGrid className="cred-grid">
          {pillars.map((p, i) => (
            <FadeItem key={i}>
              <div className="cred-card">
                <div className="cred-icon">{p.icon}</div>
                <div className="cred-title">{p.title}</div>
                <div className="cred-body">{p.body}</div>
              </div>
            </FadeItem>
          ))}
        </StaggerGrid>
        <FadeUp delay={0.15}>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <a href="#contact" className="btn btn-amber btn-lg">
              See it live — book a 30-min demo <Icon.ArrowRight />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── COMPARISON ──────────────────────────────────────────────── */
const compOptions = [
  {
    title: 'Hire a Finance Content Writer',
    sub: "A writer who understands finance well enough to produce accurate scripts costs £30–45K a year — and still can't cover every creator at the volume needed",
    winner: false,
    pros: [
      { yes: false, text: "Rare to find someone who knows both finance deeply and writes hooks well" },
      { yes: false, text: 'Sick days, holidays, and turnover break the production cycle' },
      { yes: false, text: 'Briefing, feedback, and revision loops eat more time than writing it yourself' },
      { yes: true,  text: 'Deep brand and voice knowledge after several months' },
    ],
  },
  {
    title: 'Use ChatGPT / AI Tools Yourself',
    sub: 'AI tools require you to prompt, review, and manage output every week — that time cost is real and it compounds',
    winner: false,
    pros: [
      { yes: false, text: 'Finance content requires accurate, specific prompting — generic outputs get things wrong' },
      { yes: false, text: 'No creator-specific voice, no platform optimisation, no performance tracking' },
      { yes: false, text: 'Every piece still needs significant editing before a finance audience will trust it' },
      { yes: true,  text: 'Low cost if you have the time and prompt engineering skills' },
    ],
  },
  {
    title: 'The Creator Writes Their Own Content',
    sub: 'Finance creators have the knowledge — but scripting, threading, and captioning eats the time they should spend on insight and delivery',
    winner: false,
    pros: [
      { yes: false, text: 'The most accurate output — but the slowest and most inconsistent' },
      { yes: false, text: 'Output drops immediately when filming, life, or other work takes priority' },
      { yes: false, text: 'Hard to maintain volume across YouTube, X, and short-form simultaneously' },
      { yes: false, text: 'The creator\'s zone of genius is finance — not content production' },
    ],
  },
  {
    title: 'CAIG — Finance-Specific, Done For You',
    sub: 'Finance content produced weekly by AI, reviewed by our team, performance-tracked monthly, delivered to your portal. You approve and post.',
    winner: true,
    pros: [
      { yes: true,  text: 'Written for the finance niche — not adapted from a generic content template' },
      { yes: true,  text: 'YouTube scripts, X threads, short-form, captions, brand proposals — all covered' },
      { yes: true,  text: 'Performance data used to improve output every month' },
      { yes: true,  text: 'Scales across a full agency roster without adding headcount' },
    ],
  },
]

function Comparison() {
  return (
    <section className="comparison-section section" id="comparison">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />The Alternatives</div>
            <h2 className="section-title">Four ways to solve the content problem.<br />Three of them still cost you time.</h2>
            <p className="section-sub">
              Every option for producing consistent finance content has a real cost. Here is what each one actually involves.
            </p>
          </div>
        </FadeUp>
        <StaggerGrid className="comparison-grid">
          {compOptions.map((c, i) => (
            <FadeItem key={i}>
              <div className={`comp-card${c.winner ? ' winner' : ''}`}>
                {c.winner && (
                  <div className="comp-winner-tag">
                    <Icon.Check size={10} /> Recommended
                  </div>
                )}
                <div className="comp-title">{c.title}</div>
                <div className="comp-sub">{c.sub}</div>
                <div className="comp-div" />
                <div className="comp-pros">
                  {c.pros.map((p, j) => (
                    <div className="comp-pro" key={j}>
                      <span className={p.yes ? 'comp-chk' : 'comp-x'}>
                        {p.yes ? <Icon.Check size={13} /> : <Icon.X size={13} />}
                      </span>
                      {p.text}
                    </div>
                  ))}
                </div>
              </div>
            </FadeItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}

/* ── SERVICES ────────────────────────────────────────────────── */
/* ── WHY CAIG ────────────────────────────────────────────────── */
const whyItems = [
  {
    num: '01',
    title: 'We know finance content. Not just content.',
    body: 'Hooks that work for a stock-picking channel are different from hooks that work for a budgeting channel. CPM-optimised YouTube titles for personal finance differ from those for crypto or macro commentary. We write for the finance niche specifically — not adapted from a generic template.',
  },
  {
    num: '02',
    title: 'We never ask you to brief us again after onboarding.',
    body: 'Most content solutions still need you to write prompts, fill in briefs, or manage a freelancer every week. We don\'t. You onboard each creator once — niche, voice, audience, platform — and content shows up every Monday. No check-ins. No forms. No follow-ups.',
  },
  {
    num: '03',
    title: 'Finance creators have unusually high brand deal potential. We help you capture it.',
    body: 'Fintech CPMs are among the highest of any creator niche. Trading platforms, robo-advisors, and credit card companies actively seek finance creators with engaged audiences. We write the sponsorship proposals that turn that potential into actual deals — researched, tailored, ready to send.',
  },
  {
    num: '04',
    title: 'The output improves every month.',
    body: 'We track performance data from your creators\' content — what hooks drove clicks, which topics retained viewers longest, what formats grew subscribers. Every month\'s content brief is informed by the previous month\'s results. Generic content services don\'t do this. It\'s why our output compounds.',
  },
  {
    num: '05',
    title: 'Your portal is a professional edge for agencies.',
    body: 'Agencies get a private portal where all creator content is queued, approved, and archived. For talent managers, it signals the kind of professional infrastructure that justifies a retainer. For creators, it means they always know exactly what to post and when.',
  },
  {
    num: '06',
    title: 'Consistent posting builds compounding authority in finance.',
    body: 'A finance creator who posts five times a week consistently builds algorithmic trust, audience loyalty, and brand deal leverage faster than one who posts sporadically. The creators who dominate personal finance on YouTube and X got there through volume and consistency. CAIG is the infrastructure that makes that possible.',
  },
]

function WhyCAIG() {
  return (
    <section className="why-section section" id="why">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />Why Finance Creators & Agencies Choose CAIG</div>
            <h2 className="section-title">The finance creators winning on YouTube and X<br />are not writing their own content.</h2>
            <p className="section-sub">
              The ones posting five times a week consistently — building subscriber counts, landing fintech deals, growing email lists — have solved the production problem. That is the only difference between them and the ones with better knowledge and smaller audiences.
            </p>
          </div>
        </FadeUp>
        <StaggerGrid className="why-grid">
          {whyItems.map((item, i) => (
            <FadeItem key={i}>
              <div className="why-card">
                <div className="why-num">{item.num}</div>
                <div className="why-title">{item.title}</div>
                <div className="why-body">{item.body}</div>
              </div>
            </FadeItem>
          ))}
        </StaggerGrid>
        <FadeUp delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <a href="#contact" className="btn btn-amber btn-xl breathe">
              Get The Advantage <Icon.ArrowRight size={17} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── HOW IT WORKS ────────────────────────────────────────────── */
const steps = [
  {
    num: '01',
    label: 'Step One',
    title: 'Discovery call — 30 minutes',
    text: 'We walk through your roster, the finance niches your creators cover, current posting frequency, and what platforms you\'re targeting. We show you the portal live and share real examples of finance content we\'ve produced. You leave knowing exactly what you\'d get and what it costs.',
  },
  {
    num: '02',
    label: 'Step Two',
    title: 'Onboarding in 48 hours',
    text: 'For each creator you share: their finance sub-niche (investing, budgeting, tax, macro, crypto), their primary platform, their tone, and any past content for voice reference. We build the content profile. No lengthy forms. No weekly briefing process. That setup call is all we need.',
  },
  {
    num: '03',
    label: 'Step Three',
    title: 'Finance content in your portal every Monday',
    text: 'YouTube scripts, X threads, short-form hooks, and captions — written for your creator\'s specific finance niche and audience — arrive every Monday. You review, approve what you want, and post or hand off. That is the entire workflow on your side.',
  },
  {
    num: '04',
    label: 'Step Four',
    title: 'Monthly performance report and content adjustment',
    text: 'Each month we analyse what performed — which topics drove views and clicks, which hooks retained audience, which formats grew subscribers. We adjust next month\'s content accordingly. On Growth and Agency plans, you also get a strategy call with your content lead.',
  },
]

function HowItWorks() {
  return (
    <section className="hiw-section section" id="how-it-works">
      <div className="container">
        <div className="hiw-layout">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />The Process</div>
            <h2 className="section-title">Live in 48 hours.<br />Finance content every week<br />from that point on.</h2>
            <p className="section-sub" style={{ marginTop: '18px', marginBottom: '36px' }}>
              No lengthy onboarding. No content briefs to fill in each week. No chasing for drafts. You share the creator details once — we handle everything from there.
            </p>
            <a href="#contact" className="btn btn-outline-amber btn-lg">
              Book the discovery call <Icon.ArrowRight />
            </a>
          </FadeUp>
          <StaggerGrid className="hiw-steps">
            {steps.map((s, i) => (
              <FadeItem key={i}>
                <div className="hiw-step">
                  <div className="hiw-num">{s.num}</div>
                  <div>
                    <div className="hiw-step-label">{s.label}</div>
                    <div className="hiw-step-title">{s.title}</div>
                    <div className="hiw-step-text">{s.text}</div>
                  </div>
                </div>
              </FadeItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ─────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Who exactly is CAIG for?',
    a: "Finance and personal finance creators on YouTube and X — and the agencies or talent managers that manage them. If you're producing content about investing, budgeting, tax, markets, crypto, or financial independence and you're not posting as consistently as you should be, CAIG is built for you.",
  },
  {
    q: 'What does CAIG actually produce?',
    a: "YouTube scripts, X (Twitter) threads, short-form hooks for Reels and Shorts, platform captions, monthly content plans, and brand sponsorship proposals — all written specifically for the finance niche. Every piece is AI-generated and then reviewed by our team before it lands in your portal. You receive a weekly batch every Monday.",
  },
  {
    q: 'How is this different from using ChatGPT ourselves?',
    a: "Finance content requires accurate, specific output — generic AI prompts produce generic financial commentary that a knowledgeable audience will notice and discount. We've built prompting systems tuned for the finance niche. We also review every piece, track performance each month, and adjust future content based on what actually worked. That feedback loop is what separates us from a tool you run yourself.",
  },
  {
    q: 'Do you need to brief you every week?',
    a: "No. You brief us once during onboarding — finance sub-niche, platforms, tone, target audience, and any brand guidelines. From that point we produce content every week without needing to ask. If something changes — new platform, new angle, a brand deal that affects messaging — you update us and we adjust.",
  },
  {
    q: 'How accurate is the finance content?',
    a: "We write at the level of a well-researched explainer, not investment advice. Every script is reviewed by our team for accuracy, clarity, and tone before delivery. For niche-specific accuracy (e.g. tax rules for a specific country, complex derivatives), you or your creator reviews and corrects — that is the approval step. Most clients find the output is accurate from week one.",
  },
  {
    q: 'What platforms do you cover?',
    a: "YouTube (long-form scripts), X (Twitter threads), YouTube Shorts / TikTok / Instagram Reels (short-form hooks and scripts), and caption copy for all platforms. We expand to additional formats based on your creators\' platform mix.",
  },
  {
    q: 'How quickly can we get started?',
    a: "Your first content batch is typically delivered within 48 hours of completing onboarding. The discovery call is 30 minutes. We can often have your first creators live the same week.",
  },
  {
    q: 'How does pricing work?',
    a: "We offer plans for individual finance creators and for agencies managing a roster. Pricing depends on the number of creators, platforms, and content volume. We don't publish rates publicly — book a free discovery call and we'll give you a specific, honest quote with no obligation.",
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq-section section" id="faq">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />FAQ</div>
            <h2 className="section-title">Every question before<br />you book the call</h2>
          </div>
        </FadeUp>
        <div className="faq-wrap">
          {faqs.map((f, i) => (
            <FadeUp key={i} delay={i * 0.03}>
              <div className={`faq-item${open === i ? ' open' : ''}`}>
                <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q">{f.q}</span>
                  <span className="faq-chev"><Icon.ChevronDown /></span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-a">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── URGENCY BANNER ──────────────────────────────────────────── */
function UrgencyBanner() {
  return (
    <section className="urgency-section">
      <FadeUp>
        <div className="urgency-inner">
          <div className="urgency-eyebrow">The cost of doing nothing</div>
          <h2 className="urgency-title">
            Every week a finance creator doesn't post<br />is a week their audience finds someone who does.
          </h2>
          <p className="urgency-body">
            The personal finance space on YouTube and X is growing. The creators building authority and landing fintech deals are the ones posting consistently — not the ones with more knowledge. Posting volume is the variable that separates them. CAIG is the infrastructure that makes that volume possible.
            <strong style={{ color: 'var(--t0)' }}> Book a 30-minute call. We show you real finance content examples, walk through the portal live, and give you an honest quote. No obligation.</strong>
          </p>
          <a href="#contact" className="btn btn-amber btn-lg breathe">
            Book the Call — 30 Minutes, No Obligation <Icon.ArrowRight size={17} />
          </a>
          <div className="urgency-note">
            Live portal demo &nbsp;&middot;&nbsp; Real content examples for your niche &nbsp;&middot;&nbsp; Slots available this week
          </div>
        </div>
      </FadeUp>
    </section>
  )
}

/* ── CONTACT ─────────────────────────────────────────────────── */
function Contact() {
   const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact-section section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />Get Started</div>
            <h2 className="section-title">Book a free<br />discovery call</h2>
            <p className="section-sub" style={{ marginBottom: '10px' }}>
              30 minutes. We show you the portal live, walk through real finance content examples from your niche, and give you a clear, honest quote. You leave knowing exactly what you'd get and what it costs.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--amber)', fontWeight: 600, marginBottom: '28px' }}>
              Completely free. No obligation whatsoever.
            </p>
            <div className="contact-slots">
              <div className="c-slot">
                <div className="c-slot-icon"><Icon.Calendar size={17} /></div>
                <div>
                  <div className="c-slot-title">Book a Call Directly</div>
                  <div className="c-slot-sub">Fill the form and we will send a calendar link within 4 business hours. Slots typically available within 3 days.</div>
                </div>
              </div>
              <div className="c-slot">
                <div className="c-slot-icon"><Icon.Mail size={17} /></div>
                <div>
                  <div className="c-slot-title">Prefer Email?</div>
                  <div className="c-slot-sub">hello@cornerstoneaigroup.com — we reply within one business day, always from a real person.</div>
                </div>
              </div>
              <div className="c-slot">
                <div className="c-slot-icon"><Icon.Linkedin /></div>
                <div>
                  <div className="c-slot-title">LinkedIn</div>
                  <div className="c-slot-sub">Follow us on LinkedIn for content examples, creator case studies, and agency growth ideas.</div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="cform">
              {status === 'success' ? (
                <div className="form-success">
                  <div className="form-success-check"><Icon.Check size={26} /></div>
                  <div className="form-success-title">You are on the list</div>
                  <div className="form-success-sub">
                    We will be in touch within 4 business hours with a calendar link to book your discovery call. Talk soon.
                  </div>
                </div>
              ) : (
                <>
              <div className="cform-title">Tell us about your creators</div>
                  <div className="cform-sub">We reply within 4 business hours, every time</div>
                  <form onSubmit={submit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="frow">
                      <div className="fg">
                        <label className="fl">Full Name</label>
                        <input className="fi" name="name" placeholder="Jane Smith" value={form.name} onChange={set('name')} />
                      </div>
                      <div className="fg">
                        <label className="fl">Agency / Company (or "Solo Creator")</label>
                        <input className="fi" name="company" placeholder="Finance Agency Ltd / Solo Creator" value={form.company} onChange={set('company')} />
                      </div>
                    </div>
                    <div className="frow">
                      <div className="fg">
                        <label className="fl">Work Email</label>
                        <input className="fi" type="email" name="email" placeholder="jane@financeagency.com" value={form.email} onChange={set('email')} />
                      </div>
                      <div className="fg">
                        <label className="fl">Phone Number</label>
                        <input className="fi" type="tel" name="phone" placeholder="+44 7700 900000" value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>
                    <div className="fg">
                      <label className="fl">How many creators do you need content for?</label>
                      <select className="fi" name="service" value={form.service} onChange={set('service')} style={{ cursor: 'pointer' }}>
                        <option value="">Select an option</option>
                        <option>Just me (solo creator)</option>
                        <option>2–5 creators</option>
                        <option>6–10 creators</option>
                        <option>11–20 creators</option>
                        <option>20+ creators</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">What is your biggest content challenge right now?</label>
                      <textarea className="ft" name="message" placeholder="E.g. finance creators not posting consistently, no time to write YouTube scripts, struggling to land fintech sponsorships..." value={form.message} onChange={set('message')} />
                    </div>
                    {status === 'error' && (
                      <p style={{ fontSize: '13px', color: 'var(--red)', marginBottom: '12px' }}>
                        Something went wrong. Please email us directly.
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-amber btn-lg"
                      style={{ width: '100%', justifyContent: 'center' }}
                      disabled={status === 'sending'}
                    >
                      {status !== 'sending' ? 'Book My Free Discovery Call' : 'Sending...'}
                      {status !== 'sending' && <Icon.ArrowRight />}
                    </button>
                    <p style={{ fontSize: '11.5px', color: 'var(--t4)', textAlign: 'center', marginTop: '14px' }}>
                      No obligation. We show you the product, you decide if it fits.
                    </p>
                  </form>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-row">
              <Logo height={28} />
            </div>
            <p className="footer-tagline">
              Done-for-you content production for finance creators, talent managers, and creator agencies.
              YouTube scripts, X threads, hooks, captions, and brand proposals — written for the finance niche and delivered every week.
            </p>
          </div>
          <div>
            <div className="footer-col-h">What We Do</div>
            <ul className="footer-links">
              <li><a href="#portal">Inside Your Portal</a></li>
              <li><a href="#solution">What We Do</a></li>
              <li><a href="#why">Why CAIG</a></li>
              <li><a href="#how-we-work">How It Works</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-h">Company</div>
            <ul className="footer-links">
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#how-we-work">How We Deliver</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-h">Contact</div>
            <ul className="footer-links">
              <li><a href="mailto:hello@cornerstoneaigroup.com">hello@cornerstoneaigroup.com</a></li>
              <li><a href="#contact">Book Free Discovery Call</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">&copy; {new Date().getFullYear()} Cornerstone AI Group. All rights reserved.</span>
          <div className="footer-bl">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── APP ─────────────────────────────────────────────────────── */
function MainSite() {
  return (
    <>
      <Nav />
      <StickyBar />
      <main>
        <Hero />
        <Problem />
        <PortalGrid />
        <Solution />
        <WhyCAIG />
        <ProcessCredibility />
        <Comparison />
        <HowItWorks />
        <FAQ />
        <UrgencyBanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}
