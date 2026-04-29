import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Logo, LogoMark } from './Logo'
import Privacy from './Privacy'
import Terms from './Terms'

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
              <span className="sticky-bar-title">Ready to stop being the bottleneck?</span>
              <span className="sticky-bar-sub">30-min call · Live portal demo · No obligation</span>
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
  { icon: <Icon.Zap size={22} />, label: 'Hook Scripts', desc: 'Pattern-interrupt openers written for your creator\'s exact niche and platform. Ready to record.' },
  { icon: <Icon.FileText size={22} />, label: 'Long-form Scripts', desc: 'Full video scripts with intro, body, and CTA. Structured. On-brand. Delivered every week.' },
  { icon: <Icon.Target size={22} />, label: 'Captions & Copy', desc: 'Platform-specific captions for every post. Hooks, hashtags, and calls-to-action included.' },
  { icon: <Icon.Layers size={22} />, label: 'Content Plans', desc: 'Monthly content calendar per creator — topics, formats, and posting schedule mapped out.' },
  { icon: <Icon.Star size={22} />, label: 'Brand Proposals', desc: 'Tailored partnership decks for Growth and Enterprise clients. Written, formatted, ready to send.' },
  { icon: <Icon.RefreshCw size={22} />, label: 'Weekly Delivery', desc: 'Every Monday. No briefing from you. No chasing for drafts. Just open the portal and approve.' },
]

function PortalGrid() {
  return (
    <section className="portal-section section" id="portal">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />Inside Your Portal</div>
            <h2 className="section-title">Everything your creators need<br />to post — produced every week.</h2>
            <p className="section-sub">
              No templates. No prompts to fill in. Every piece is written specifically for each creator on your roster and waiting in your portal every Monday.
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
        <a href="/" className="nav-logo">
          <Logo size={22} sub="Content Group" />
        </a>
        <div className="nav-right">
          <a href="#contact" className="btn btn-amber btn-md breathe">Book a Free Call</a>
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
            <LogoMark size={22} />
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

/* ── HERO STATS (count-up) ───────────────────────────────────── */
function StatItem({ target, prefix = '', suffix = '', label, amber }) {
  const [count, ref] = useCountUp(target)
  return (
    <div className="hero-stat" ref={ref}>
      <div className="hero-stat-val">
        <span style={{ color: amber ? 'var(--amber)' : 'var(--t0)' }}>
          {prefix}{count}{suffix}
        </span>
      </div>
      <div className="hero-stat-lbl">{label}</div>
    </div>
  )
}

function HeroStats() {
  return (
    <motion.div
      className="hero-stats"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
    >
      <StatItem target={4}   suffix="+ hrs"  label="Saved per creator per week — no briefing, no chasing, no rewriting" amber />
      <StatItem target={20}  suffix="+"       label="Pieces of content per creator per month on Foundation — scripts, hooks, captions" />
      <StatItem target={100} suffix="%"       label="Written and delivered by CAIG — you review, approve, your creators post" />
      <StatItem target={30}  suffix=" days"   label="Notice to cancel — no contracts, no lock-in, no penalty. Ever." />
    </motion.div>
  )
}

/* ── HERO ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="container">
        <div className="hero-center">

          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            CORNERSTONE AI GROUP
          </motion.div>

          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Your Creators.<br />
            <span className="hl">Posting Every Week.</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
          >
            We write the content. You manage the talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="#contact" className="btn btn-amber btn-xl breathe">
              Book a Free Call
              <Icon.ArrowRight size={18} />
            </a>
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
          { text: '20+',  suffix: ' pieces',  label: 'Of content produced per creator per month on Foundation — scripts, hooks, captions', amber: true },
          { text: '4+',   suffix: ' hrs',     label: 'Saved per creator per week — no more briefing writers or chasing copy', amber: false },
          { text: '100%', suffix: '',          label: 'Of content written by our team and delivered to your portal — ready to approve and post', amber: false },
          { text: '30',   suffix: ' days',    label: 'Notice to cancel — no long-term contracts, no lock-in, no penalty', amber: false },
        ].map((s, i) => (
          <div className="proof-stat" key={i}>
            <div className="proof-val">
              <span className={s.amber ? 'av' : ''}>{s.text}{s.suffix}</span>
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
    title: "Your creators go quiet — not because they lack ideas, but because content takes time.",
    body: "Scripts don't write themselves. Captions need thinking. Hooks need testing. For every creator on your roster, there are hours of writing work sitting between the idea and the post. When that work isn't done, they don't post. When they don't post, they don't grow. And your agency stalls with them.",
  },
  {
    icon: <Icon.TrendingDown />,
    title: "Brand deals are being missed because the outreach never gets written.",
    body: "You know which creators should be landing partnerships. You know which brands are the right fit. But writing a compelling, tailored proposal for every opportunity takes time nobody has. So the pitch never gets sent. The deal never happens. And the creator stays monetisation-stuck.",
  },
  {
    icon: <Icon.AlertCircle />,
    title: "You are managing relationships, not producing content — but content is what drives everything.",
    body: "Creator agencies are built on talent relationships. But the output that makes those relationships valuable — the content — requires a production system. Without one, you are paying for strategy without delivery. Your clients want results. Results come from consistent, quality content.",
  },
]

function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />The Real Problem</div>
            <h2 className="section-title">You already know what the problem is.<br />You just haven't fixed it yet.</h2>
            <p className="section-sub">
              Your creators have the audience, the niche, the potential. The only thing stopping them from growing — and stopping your agency from scaling with them — is consistent content. Not ideas. Not strategy. Just someone to actually write it.
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
  { icon: <Icon.Target size={18} />, title: 'We write the content — every week, without being briefed', body: 'Scripts, hooks, captions, and content plans produced by AI and reviewed by our team. Delivered to your portal every week. Your creators get a queue of ready-to-post content without you writing a word.' },
  { icon: <Icon.Zap size={18} />, title: 'Brand proposals written and sent on your behalf', body: 'On Growth and Enterprise plans, we write tailored brand partnership proposals for your creators — researched, formatted, and ready to send. You approve, we deliver. No more deals falling through because nobody had time to write the pitch.' },
  { icon: <Icon.Layers size={18} />, title: 'A content strategy built around each creator', body: 'Every creator on your roster gets a content plan built around their niche, platform, and audience. We track what is working, adjust each month, and keep production aligned with what actually grows the account.' },
  { icon: <Icon.RefreshCw size={18} />, title: 'Everything in one portal — approve, download, post', body: 'All content is delivered through your private CAIG portal. You review, approve, and hand off to your creators. No email chains. No shared docs. No chasing for drafts. One clean interface, updated every week.' },
  { icon: <Icon.Shield size={18} />, title: 'Fully managed. Nothing to write. Cancel any time.', body: 'You do not brief us each week, chase for drafts, or manage a writing team. We take care of production end to end. You access everything through your portal and manage your creator relationships. That is the split. Cancel with 30 days notice.' },
]

function Solution() {
  return (
    <section className="solution-section section" id="solution">
      <div className="container">
        <div className="sol-grid">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />What We Do</div>
            <h2 className="section-title">Done-for-you content.<br />Delivered every week.</h2>
            <p className="section-sub" style={{ marginBottom: '36px' }}>
              Not a tool you log into. Not a template you fill in. A team — powered by AI — that produces content for your creators every single week. You manage the talent. We produce the output.
            </p>
            <a href="#contact" className="btn btn-amber btn-lg">
              Get Started <Icon.ArrowRight />
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

/* ── TESTIMONIALS ────────────────────────────────────────────── */
const stars = ['★', '★', '★', '★', '★']

const smallTestis = [
  {
    quote: "Before CAIG, getting content out of our creators was like pulling teeth. They had the ideas but not the time to write it all up. CAIG changed that completely — every Monday our portal has a fresh batch of scripts and captions ready. The creators just review, approve, and post. Consistency went from two posts a week to five.",
    name: 'Priya Nair',
    role: 'Founder',
    co: 'Nair Talent Management',
    av: '#7c7fff',
    initials: 'PN',
    metric: '5×/week',
    metricLbl: 'avg posting frequency per creator',
  },
  {
    quote: "We were managing twelve creators but the content output looked like we had three. CAIG set up the content engine in two weeks. Now every creator has a weekly batch of hooks, captions, and scripts waiting for them. The quality is genuinely better than what we were producing in-house — and it costs less.",
    name: 'Tom Aldridge',
    role: 'Head of Talent',
    co: 'Aldridge Creative',
    av: '#34d8a4',
    initials: 'TA',
    metric: '12 creators',
    metricLbl: 'fully content-serviced every week',
  },
  {
    quote: "The brand proposals alone have paid for the retainer three times over. CAIG writes them, we send them, brands sign. Before, we were leaving deals on the table because nobody had bandwidth to write a proper pitch. Now we pitch every opportunity.",
    name: 'Sofia Reyes',
    role: 'Partnerships Director',
    co: 'Reyes Creator Agency',
    av: '#f5a623',
    initials: 'SR',
    metric: '3×',
    metricLbl: 'retainer ROI from brand deals alone',
  },
]

function Testimonials() {
  return (
    <section className="section testi-section" id="testimonials">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />Client Results</div>
            <h2 className="section-title">Real agencies.<br />Real content output.</h2>
            <p className="section-sub">
              From creator managers tired of chasing copy to talent agencies scaling their roster without scaling their headcount — here is what CAIG looks like in practice.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="testi-featured">
            <div className="testi-mark">"</div>
            <div className="testi-quote-big">
              We went from six creators posting sporadically to all six posting five times a week — consistently, on-brand, with hooks that actually work. I thought that would require a full content team. CAIG replaced what would have been three full-time hires. The content comes into the portal every Monday, the creators pick it up, and it goes out. That is genuinely all we do now.
            </div>
            <div className="testi-meta">
              <div className="testi-av" style={{ background: '#5b5ef4' }}>MW</div>
              <div className="testi-who">
                <div className="testi-name">Marcus Webb</div>
                <div className="testi-role">Managing Director &middot; Webb Talent Group</div>
              </div>
              <div className="testi-result-tag">
                <div>
                  <div className="trt-val">6 creators</div>
                  <div className="trt-lbl">posting 5×/week consistently</div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        <StaggerGrid className="testi-grid" delay={0.1}>
          {smallTestis.map((t, i) => (
            <FadeItem key={i}>
              <div className="testi-card">
                <div className="testi-stars">
                  {stars.map((s, j) => <span key={j} className="testi-star">{s}</span>)}
                </div>
                <div className="testi-quote">"{t.quote}"</div>
                <div className="testi-div" />
                <div className="testi-person">
                  <div className="testi-av-sm" style={{ background: t.av }}>{t.initials}</div>
                  <div>
                    <div className="testi-name-sm">{t.name}</div>
                    <div className="testi-role-sm">{t.role} &middot; {t.co}</div>
                  </div>
                  <div className="testi-metric">
                    <div className="testi-metric-val">{t.metric}</div>
                    <div className="testi-metric-lbl">{t.metricLbl}</div>
                  </div>
                </div>
              </div>
            </FadeItem>
          ))}
        </StaggerGrid>

        <FadeUp delay={0.15}>
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <a href="#contact" className="btn btn-amber btn-lg">
              Get results like this <Icon.ArrowRight />
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
    title: 'Hire an In-House Content Writer',
    sub: "A full-time content hire costs £28–40K a year — and still can't cover every creator at the volume you need",
    winner: false,
    pros: [
      { yes: false, text: "One person can't scale across a growing roster" },
      { yes: false, text: 'Sick days, holidays, and turnover break the production cycle' },
      { yes: false, text: 'Briefing, feedback, and revision loops eat more time' },
      { yes: true,  text: 'Deep brand knowledge after time' },
    ],
  },
  {
    title: 'Use an AI Writing Tool Yourself',
    sub: 'ChatGPT and similar tools require you to prompt, edit, and manage output — that is still your time',
    winner: false,
    pros: [
      { yes: false, text: 'You still have to write every prompt and review every output' },
      { yes: false, text: 'No consistency or creator-specific voice without heavy setup' },
      { yes: false, text: 'Generic outputs that need significant editing before use' },
      { yes: true,  text: 'Low cost if you have time to manage it yourself' },
    ],
  },
  {
    title: 'Brief Creators to Write Their Own Content',
    sub: 'Creators are talent — not copywriters. Writing their own content is often what slows them down most',
    winner: false,
    pros: [
      { yes: false, text: 'Most creators find writing the hardest part of the job' },
      { yes: false, text: 'Inconsistent output — some weeks nothing gets posted' },
      { yes: false, text: 'Quality varies widely and is hard to maintain at scale' },
      { yes: false, text: 'Puts the burden back on the people you are supposed to be supporting' },
    ],
  },
  {
    title: 'CAIG — Done For You',
    sub: 'Content produced weekly by AI, reviewed by our team, delivered to your portal. Your creators just post.',
    winner: true,
    pros: [
      { yes: true,  text: 'Scales across your entire roster without adding headcount' },
      { yes: true,  text: 'Consistent weekly delivery — every creator, every week' },
      { yes: true,  text: 'Built around each creator\'s voice, niche, and platform' },
      { yes: true,  text: 'You review and approve — we handle all production' },
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
            <h2 className="section-title">Every content production option — compared.</h2>
            <p className="section-sub">
              There are four ways to solve the content production problem. Three of them still rely on someone's time. One of them doesn't.
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
const tiers = [
  {
    name: 'Discovery Call',
    price: 'Free',
    time: '30 minutes — no obligation',
    featured: false,
    popular: false,
    feats: [
      'Walk us through your roster and current content process',
      'We show you exactly what CAIG would produce for your creators',
      'Live demo of the portal and content output',
      'Clear recommendation on which plan fits your agency',
      'No pitch. No obligation. Just the honest answer.',
      'Setup fee credited in full if you proceed',
    ],
    cta: 'Book Discovery Call',
  },
  {
    name: 'Foundation',
    price: '£3,000/mo',
    time: '£2,500 setup · up to 2 creators',
    featured: false,
    popular: false,
    feats: [
      '20 pieces of content per creator per month',
      'Scripts, hooks, and captions — platform-specific',
      'Monthly content strategy per creator',
      'Private portal — review, approve, and download',
      'Monthly performance report',
      '30-day cancel notice — no long-term commitment',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '£5,000/mo',
    time: '£2,500 setup · up to 5 creators',
    featured: true,
    popular: true,
    feats: [
      '50 pieces of content per creator per month',
      'Scripts, hooks, captions — short and long-form',
      'Brand partnership proposals written and formatted',
      'Weekly content strategy updates per creator',
      'Dedicated content strategist',
      'Priority turnaround — 48hrs on urgent requests',
    ],
    cta: 'Start Growth Plan',
  },
  {
    name: 'Enterprise',
    price: '£8,500/mo',
    time: '£2,500 setup · unlimited creators',
    featured: false,
    popular: false,
    feats: [
      'Unlimited content across your entire roster',
      'All content types — scripts, captions, threads, briefs',
      'Brand proposal writing and outreach copy included',
      'Bespoke content formats built around each creator',
      'Dedicated account manager',
      'Daily publishing queue management',
    ],
    cta: 'Talk to Us',
  },
]

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />Pricing</div>
            <h2 className="section-title">Simple, transparent<br />monthly pricing.</h2>
            <p className="section-sub">
              One setup fee. One monthly retainer. Cancel with 30 days notice.<br />
              We produce the content, you manage the talent.
            </p>
          </div>
        </FadeUp>
        <StaggerGrid className="svc-grid">
          {tiers.map((t, i) => (
            <FadeItem key={i}>
              <div className={`svc-card${t.featured ? ' feat' : ''}`}>
                {t.popular && <div className="svc-popular">Most Popular</div>}
                <div className="svc-name">{t.name}</div>
                <div className="svc-price">{t.price}</div>
                <div className="svc-time">
                  <span className="svc-time-dot" />{t.time}
                </div>
                <div className="svc-div" />
                <ul className="svc-feats">
                  {t.feats.map((f, j) => (
                    <li className="svc-feat" key={j}>
                      <span className="svc-check"><Icon.Check /></span>{f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn btn-lg ${t.featured ? 'btn-amber' : 'btn-outline-amber'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {t.cta}
                </a>
              </div>
            </FadeItem>
          ))}
        </StaggerGrid>
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
    text: 'You walk us through your roster, your current content process, and what good looks like for you. We show you a live demo of the portal and what content output looks like in practice. You leave knowing exactly what you would get and what it costs.',
  },
  {
    num: '02',
    label: 'Step Two',
    title: 'We onboard your creators in 48 hours',
    text: 'You share basic details for each creator — niche, platform, tone, and any existing content. We set up the content engine for each one, configured around their voice and audience. No lengthy briefing process. No forms to fill in.',
  },
  {
    num: '03',
    label: 'Step Three',
    title: 'Content lands in your portal every week',
    text: 'Every Monday, a fresh batch of scripts, hooks, captions, and content plans is ready in your portal — one batch per creator. You review, approve, and hand off. Your creators post. That is the entire workflow on your side.',
  },
  {
    num: '04',
    label: 'Step Four',
    title: 'We improve it every month',
    text: 'We track what is performing, adjust the content strategy each month, and refine the output based on what is working for each creator. On Growth and Enterprise, you get a monthly strategy session with your dedicated content strategist.',
  },
]

function HowItWorks() {
  return (
    <section className="hiw-section section" id="how-it-works">
      <div className="container">
        <div className="hiw-layout">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />The Process</div>
            <h2 className="section-title">Live in 48 hours.<br />Content every week<br />from that point on.</h2>
            <p className="section-sub" style={{ marginTop: '18px', marginBottom: '36px' }}>
              No lengthy onboarding. No content briefs to fill in each week. No chasing for drafts. You share the creator details once — we handle production from there.
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
    q: 'What kind of agencies do you work with?',
    a: "Creator management agencies, talent agencies, and brand-side teams managing content across multiple creators or accounts. If you have a roster of creators who need to post consistently and you are responsible for making that happen, CAIG is built for you.",
  },
  {
    q: 'What does CAIG actually produce?',
    a: "Scripts, hooks, captions, content plans, and brand partnership proposals — written by AI and reviewed by our team before delivery. Every piece is tailored to the specific creator: their niche, platform, tone, and audience. You receive a weekly batch in your portal, ready to review and hand off.",
  },
  {
    q: 'How is this different from just using ChatGPT ourselves?',
    a: "ChatGPT requires you to prompt it, review the output, edit it, and manage the whole process — that is still your time. CAIG takes all of that off your plate. We handle the prompting, the quality review, the formatting, and the delivery. You just approve and post.",
  },
  {
    q: 'Do we need to brief you every week?',
    a: "No. You brief us once when you onboard a creator — niche, platform, tone, audience, and any brand guidelines. From there we produce content weekly without needing to ask. If something changes, you update us and we adjust.",
  },
  {
    q: 'How quickly can we get started?',
    a: "Your first content batch is typically delivered within 48 hours of onboarding. The discovery call is 30 minutes — we can often have your first creators live the same week.",
  },
  {
      q: "What if the content doesn't sound like the creator?",
    a: "We refine the voice profile during onboarding and adjust based on your feedback in the first two weeks. Most agencies find the output is accurate from week one. If something isn't right, you tell us and we fix it — that is part of the retainer.",
  },
  {
    q: 'What is the pricing model?',
    a: "Every plan starts with a £2,500 setup fee which covers onboarding, creator profiling, and your first content batch. After that: Foundation at £3,000/mo (up to 2 creators, 20 pieces each), Growth at £5,000/mo (up to 5 creators, 50 pieces each, proposals included), or Enterprise at £8,500/mo (unlimited creators, unlimited content). Cancel with 30 days notice — no lock-in.",
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
            Every week your creators don't post<br />is a week someone else's do.
          </h2>
          <p className="urgency-body">
            Algorithms reward creators who show up. Brands sign the ones with consistent output. Audiences forget the ones who go quiet. Right now, somewhere on your roster, a creator hasn't posted in two weeks. Not because they don't want to — because nobody wrote the content.
            <strong style={{ color: 'var(--t0)' }}> That is a solvable problem. Book a 30-minute call and we will show you exactly what CAIG produces for creators like yours — and what it costs.</strong>
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
              30 minutes. We show you the portal, walk through what content would look like for your creators, and give you a clear answer on which plan fits. You walk away knowing exactly what you would get.
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
                  <div className="cform-title">Tell us about your agency</div>
                  <div className="cform-sub">We reply within 4 business hours, every time</div>
                  <form onSubmit={submit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="frow">
                      <div className="fg">
                        <label className="fl">Full Name</label>
                        <input className="fi" name="name" placeholder="Jane Smith" value={form.name} onChange={set('name')} />
                      </div>
                      <div className="fg">
                        <label className="fl">Agency / Company</label>
                        <input className="fi" name="company" placeholder="Talent Agency Ltd" value={form.company} onChange={set('company')} />
                      </div>
                    </div>
                    <div className="frow">
                      <div className="fg">
                        <label className="fl">Work Email</label>
                        <input className="fi" type="email" name="email" placeholder="jane@agency.com" value={form.email} onChange={set('email')} />
                      </div>
                      <div className="fg">
                        <label className="fl">Phone Number</label>
                        <input className="fi" type="tel" name="phone" placeholder="+44 7700 900000" value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>
                    <div className="fg">
                      <label className="fl">How many creators are on your roster?</label>
                      <select className="fi" name="service" value={form.service} onChange={set('service')} style={{ cursor: 'pointer' }}>
                        <option value="">Select roster size</option>
                        <option>1–2 creators</option>
                        <option>3–5 creators</option>
                        <option>6–10 creators</option>
                        <option>11–20 creators</option>
                        <option>20+ creators</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">What is your biggest content challenge right now?</label>
                      <textarea className="ft" name="message" placeholder="E.g. creators not posting consistently, no time to write content, struggling to get brand proposals out..." value={form.message} onChange={set('message')} />
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
              <Logo size={20} sub={null} />
            </div>
            <p className="footer-tagline">
              Done-for-you AI content creation for creator agencies and talent managers.
              Scripts, captions, and proposals — produced weekly, delivered to your portal.
            </p>
          </div>
          <div>
            <div className="footer-col-h">Services</div>
            <ul className="footer-links">
              <li><a href="#services">Free Discovery Call</a></li>
              <li><a href="#services">Foundation Plan</a></li>
              <li><a href="#services">Growth Plan</a></li>
              <li><a href="#services">Enterprise Plan</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-h">Company</div>
            <ul className="footer-links">
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Client Results</a></li>
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
        <Testimonials />
        <Comparison />
        <Services />
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
