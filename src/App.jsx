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
          <Logo size={22} sub="Content Systems" />
        </a>
        <ul className="nav-links">
          {[
            ['#problem', 'The Problem'],
            ['#services', 'Services'],
            ['#how-it-works', 'How It Works'],
            ['#testimonials', 'Results'],
            ['#faq', 'FAQ'],
          ].map(([h, l]) => (
            <li key={h}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <a href="#contact" className="btn btn-amber btn-md">Get a Free Strategy Call</a>
        </div>
      </div>
    </nav>
  )
}

/* ── HERO DASHBOARD MOCKUP ───────────────────────────────────── */
const HD_MODULES = [
  {
    id: 'content',
    label: 'Content Hub',
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
    label: 'Brand Partnerships',
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
    id: 'network',
    label: 'Network Health',
    color: '#f59e0b',
    client: 'Zara Williams · @zara.sportsgirl',
    type: 'Football · Growth Diagnosis',
    output: `NETWORK HEALTH CHECK
Zara Williams · Football · Month 3

WHAT'S WORKING
Match verdict posts — tactical breakdowns
from a female fan perspective. Outperforming
every other pillar by 3× on TikTok.

WHAT TO STOP
Behind-the-scenes content. Low views,
low saves. Drop it, reallocate to match day.

PRIMARY FOCUS: Land first brand deal
→ Target: sports apparel + stadium experience brands
→ Follower threshold: 8,200 (need 10K for priority DM)
→ Action: start gifting outreach this week`,
  },
  {
    id: 'automate',
    label: 'Creator Ops',
    color: '#fb923c',
    client: 'Nova · @nova.plays · Gaming',
    type: 'Brand Outreach Automation Plan',
    output: `CREATOR OPS PLAN
Nova (@nova.plays) · Gaming · Solo Operation

TOP PRIORITY: Brand Outreach Follow-ups

AUTOMATION STACK
→ Notion brand CRM — track every lead by stage
→ Gmass sequences — auto follow-up day 3, 7, 14
→ Calendly — brands book calls without back-forth
→ Airtable pipeline — one view, all active deals

90-DAY ROADMAP
Days 1–30: CRM live, first 20 brands contacted
Days 31–60: Add payment tracking via Stripe
Days 61–90: Full ops on 2h/week admin max

Current admin time: ~8h/week
Target: under 2h/week`,
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
  { icon: '↑', text: 'Scale past 20 creators without hiring' },
  { icon: '⚡', text: 'Content generated in under 3 minutes per creator' },
  { icon: '✓', text: 'Fully managed — we run it, you access the portal' },
  { icon: '↑', text: 'More brand deals closed, fewer falling through the cracks' },
  { icon: '★', text: 'Built on a live network we operate ourselves' },
  { icon: '⚡', text: 'Brand proposals generated in seconds, not hours' },
  { icon: '✓', text: 'Cancel with 30 days notice — no lock-in' },
  { icon: '↑', text: 'One system replaces a full content ops team' },
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="badge" style={{ display: 'inline-flex', marginBottom: '28px' }}>
              <span className="badge-dot" />We run 7 AI-powered creator personas, live right now
            </div>
          </motion.div>

          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Managing creators at scale<br />
            hits an <span className="hl">operations ceiling.</span><br />
            We remove it.
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
          >
            Most creator agencies hit an ops ceiling from 3+ creators — not because demand drops,
            but because ops can't keep up. We built an AI system to run our own creator network.
            Now we build and manage the same for agencies ready to scale past that ceiling.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="#contact" className="btn btn-amber btn-lg breathe">
              Get a Free Strategy Call
              <Icon.ArrowRight size={16} />
            </a>
            <a href="#services" className="btn btn-ghost btn-lg">
              See Pricing
            </a>
          </motion.div>

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <span style={{ color: 'var(--t3)' }}>We run it ourselves — we know it works</span>
            <span style={{ margin: '0 12px', opacity: 0.2 }}>|</span>
            Take on more creators without hiring
            <span style={{ margin: '0 12px', opacity: 0.2 }}>|</span>
            Cancel with 30 days notice
          </motion.div>
        </div>
      </div>

      {/* ── Proof stats ── */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {[
          { val: '7',    suf: ' personas', lbl: 'AI-powered UGC creator personas live in our own network right now', amber: true },
          { val: '4+',   suf: ' hrs',      lbl: 'Saved per creator per week on content, captions, briefs, and brand outreach', amber: false },
          { val: '100%', suf: '',           lbl: 'Of creator content and partnership proposals run through AI — no manual writing', amber: false },
          { val: '30',   suf: ' days',      lbl: 'Notice to cancel — no contracts, no lock-in, no penalty', amber: false },
        ].map((s, i) => (
          <div className="hero-stat" key={i}>
            <div className="hero-stat-val">
              <span style={{ color: s.amber ? 'var(--amber)' : 'var(--t0)' }}>{s.val}{s.suf}</span>
            </div>
            <div className="hero-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </motion.div>

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
          { text: '7',    suffix: ' personas', label: 'AI-powered UGC creator personas running live in our own network right now', amber: true },
          { text: '4+',   suffix: ' hrs',      label: 'Saved per creator per week on content, captions, briefs, and brand outreach admin', amber: false },
          { text: '100%', suffix: '',           label: 'Of creator content, partnership proposals, and ops run through AI — no manual writing', amber: false },
          { text: '30',   suffix: ' days',      label: 'Notice to cancel — no long-term contracts, no lock-in, no penalty', amber: false },
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
    title: "Content is being written by hand. Still.",
    body: "Every hook, every caption, every brief for every creator — written manually, one at a time, by a person. In an agency managing 10, 20, or 50 creators, that is not a content strategy. That is a content factory. And someone is paying for every hour of it.",
  },
  {
    icon: <Icon.TrendingDown />,
    title: "Brand deals take weeks to close and nobody knows why",
    body: "The pitch goes out. Then silence. Then a follow-up. Then another. Then a counter-offer buried in an email thread. There is no system — just a person holding it together with memory and goodwill. Deals get lost. Money gets left on the table.",
  },
  {
    icon: <Icon.AlertCircle />,
    title: "Growth stalls because ops can't keep up with talent",
    body: "You sign a new creator. Now someone has to onboard them, build their content pillars, write their first batch of posts, find brand fits, draft outreach, and track the pipeline. Every new creator adds another full-time workload. That is not scale. That is a ceiling.",
  },
]

function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />The Real Problem</div>
            <h2 className="section-title">The content is not the problem.<br />The operations are.</h2>
            <p className="section-sub">
              Agencies and talent managers do not fail because their creators are bad. They fail because
              the operations behind the content — the writing, the briefing, the brand outreach, the
              admin — never got a system. We built that system. For ourselves first. Now for you.
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
              Talk to us about your ops <Icon.ArrowRight />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── SOLUTION ────────────────────────────────────────────────── */
const solutions = [
  { icon: <Icon.Target size={18} />, title: 'We built this for our own network first', body: 'We run 7 AI-powered UGC creator personas right now — travel, fitness, gaming, football, wellness, luxury, parenting. Every piece of content, every brand proposal, every ops decision runs through the system we sell. We are not pitching a theory. We are running it live.' },
  { icon: <Icon.Layers size={18} />, title: 'Your creators post more. Without your team writing more.', body: 'Platform-specific content for every creator — in their voice, their niche, their format — generated in under three minutes. What currently takes a content manager a full day happens automatically. More output per creator means more reach, more brand interest, more revenue.' },
  { icon: <Icon.BarChart size={18} />, title: 'More brand deals closed. Fewer falling through the cracks.', body: 'Every deal tracked from first contact to payment — stage by stage, in a live pipeline your whole team can see. No more deals buried in email threads. No more follow-ups missed. Agencies using a structured pipeline close more deals at higher rates.' },
  { icon: <Icon.RefreshCw size={18} />, title: 'Add creators without adding ops overhead', body: 'The system scales with your roster. Add a new creator — content pillars, brand outreach, and pipeline tracking are ready in the same session. What used to add a full workload per creator now adds almost nothing. That is how you scale past 20, 30, 50.' },
  { icon: <Icon.Shield size={18} />, title: 'Fully managed. Portal access included. Nothing to maintain.', body: 'We build and run the system on your behalf. You access everything through a live portal — content queue, deal pipeline, weekly reports — included in your retainer. No tools to manage, no prompts to write, no system to maintain. Cancel with 30 days notice.' },
]

function Solution() {
  return (
    <section className="solution-section section" id="solution">
      <div className="container">
        <div className="sol-grid">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />What We Build</div>
            <h2 className="section-title">More creators. More deals.<br />No extra headcount.</h2>
            <p className="section-sub" style={{ marginBottom: '36px' }}>
              Not a ChatGPT wrapper. Not another SaaS tool to manage. A fully managed AI system —
              we build it, we run it, you access everything through a live portal. Your team focuses
              on signing talent and closing deals. We handle the rest.
            </p>
            <a href="#contact" className="btn btn-amber btn-lg">
              Get a Free Strategy Call <Icon.ArrowRight />
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
    quote: "We were writing every caption, every hook, every brief by hand. For 22 creators. CAIG built us a system where I pick the creator, pick the platform, and the content is ready in under a minute — in their voice. My content manager now works on strategy instead of typing.",
    name: 'Priya Nair',
    role: 'Founder',
    co: 'Nair Talent Management',
    av: '#7c7fff',
    initials: 'PN',
    metric: '22 creators',
    metricLbl: 'managed by one person',
  },
  {
    quote: "Brand deals were taking us three weeks from first contact to signed brief. Chasing, following up, rewriting proposals — all manual. We now send a full sponsorship deck in 10 minutes and the follow-up sequence runs itself. Our deal close rate went up and the team stopped hating their inboxes.",
    name: 'Tom Aldridge',
    role: 'Head of Partnerships',
    co: 'Aldridge Creator Group',
    av: '#34d8a4',
    initials: 'TA',
    metric: '3 weeks → 10 min',
    metricLbl: 'proposal to brand',
  },
  {
    quote: "Onboarding a new creator used to take two full days — content pillars, voice guide, first batch of posts, brand fit list. Now it takes 40 minutes. We signed four new creators last month without adding a single person to the ops team.",
    name: 'Sofia Reyes',
    role: 'Operations Director',
    co: 'Reyes Talent Co.',
    av: '#f5a623',
    initials: 'SR',
    metric: '2 days → 40 min',
    metricLbl: 'creator onboarding',
  },
]

function Testimonials() {
  return (
    <section className="section testi-section" id="testimonials">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />Client Results</div>
            <h2 className="section-title">Real agencies.<br />Specific numbers.</h2>
            <p className="section-sub">
              Not marketing copy. Direct quotes from people managing creator networks
              who can tell you exactly what changed and how fast it paid back.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="testi-featured">
            <div className="testi-mark">"</div>
            <div className="testi-quote-big">
              We manage 38 creators. Before CAIG we had three people doing nothing but writing content and chasing brand deals. Now one person runs the whole content operation. The other two moved into creator development — which is where the actual money is. The system paid for itself in the first month.
            </div>
            <div className="testi-meta">
              <div className="testi-av" style={{ background: '#5b5ef4' }}>MW</div>
              <div className="testi-who">
                <div className="testi-name">Marcus Webb</div>
                <div className="testi-role">Managing Director &middot; Webb Creator Management</div>
              </div>
              <div className="testi-result-tag">
                <div>
                  <div className="trt-val">Month 1</div>
                  <div className="trt-lbl">full cost recovered</div>
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
    title: 'More Content Staff',
    sub: 'A new hire costs £28–40K a year — and still writes everything by hand, one post at a time',
    winner: false,
    pros: [
      { yes: false, text: 'Output limited by hours in the working day' },
      { yes: false, text: 'Every new creator adds more workload' },
      { yes: false, text: 'Sick days, turnover, training — all your problem' },
      { yes: true,  text: 'Human relationships and creative instinct' },
    ],
  },
  {
    title: 'Generic AI Tools',
    sub: 'ChatGPT and off-the-shelf tools do not know your creators, their voice, or your niche',
    winner: false,
    pros: [
      { yes: false, text: 'Generic output — not in your creator\'s voice' },
      { yes: false, text: 'Still needs a person to prompt, clean, and post' },
      { yes: false, text: 'Another monthly subscription on the P&L' },
      { yes: true,  text: 'Fast to get started with' },
    ],
  },
  {
    title: 'Keep Doing It Manually',
    sub: 'Every week you wait is another week your competitors are automating the same work',
    winner: false,
    pros: [
      { yes: false, text: 'Ops cost grows with every creator you sign' },
      { yes: false, text: 'Team burns out on repetitive low-value work' },
      { yes: false, text: 'Brand deals take longer than they should' },
      { yes: false, text: 'No competitive edge in content at scale' },
    ],
  },
  {
    title: 'CAIG Content System',
    sub: 'Fully managed from week one — your creators, your workflow, your live portal.',
    winner: true,
    pros: [
      { yes: true,  text: 'Knows every creator\'s voice, niche, and brand fit' },
      { yes: true,  text: 'Content, proposals, and ops automated end to end' },
      { yes: true,  text: 'Sign more talent without adding ops headcount' },
      { yes: true,  text: 'Fully managed — we run it, portal access included in retainer' },
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
            <h2 className="section-title">What is the alternative?</h2>
            <p className="section-sub">
              Every agency has four options. Three of them scale poorly — or keep costing more the bigger you grow.
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
    name: 'Strategy Call',
    price: 'Free',
    time: '45 minutes — no obligation',
    featured: false,
    popular: false,
    feats: [
      'Full ops and content workflow review',
      'Identify your single highest-value automation',
      'Exact scope and cost estimate',
      'Delivered as a written action plan',
      'You leave with clarity — whether you hire us or not',
      'Credited toward your build if you proceed',
    ],
    cta: 'Book Strategy Call',
  },
  {
    name: 'Starter',
    price: '£3,000/mo',
    time: '£2,500 setup · up to 5 creators',
    featured: false,
    popular: false,
    feats: [
      'Full AI content system for up to 5 creators',
      'Trained on each creator\'s voice, niche, and pillars',
      'Hook, caption, brief, and hashtag generation',
      'Brand partnership proposal generator',
      'Creator ops portal — one place, everything',
      'Monthly performance reports',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '£5,000/mo',
    time: '£2,500 setup · up to 15 creators',
    featured: true,
    popular: true,
    feats: [
      'Everything in Starter',
      'Up to 15 creators on the system',
      'Brand deal pipeline tracker',
      'Priority support and monthly strategy call',
      'New personas and automations added each month',
      'Client portal for your team with live dashboards',
    ],
    cta: 'Start Growth Plan',
  },
  {
    name: 'Agency',
    price: '£8,500/mo',
    time: '£2,500 setup · unlimited creators',
    featured: false,
    popular: false,
    feats: [
      'Everything in Growth',
      'Unlimited creator roster',
      'Dedicated account manager',
      'Bespoke automation sprints each month',
      'White-label portal option',
      'Direct Slack access to the engineering team',
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
            <div className="badge"><span className="badge-dot" />Services</div>
            <h2 className="section-title">Simple, transparent<br />retainer pricing.</h2>
            <p className="section-sub">
              One setup fee. One monthly retainer. Cancel with 30 days notice.<br />
              We run the system — you access everything through a live portal.
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
    title: 'Free Strategy Call — 45 minutes',
    text: 'We look at your creator roster, your current content workflow, your brand deal pipeline, and your ops. We tell you exactly what to build first and what it will cost. No pitch. No obligation. Just a straight answer.',
  },
  {
    num: '02',
    label: 'Step Two',
    title: 'Scoped Proposal in 48 hours',
    text: 'You get a written breakdown — every deliverable, the exact tech stack, and a week-by-week build timeline. Fixed price, fixed scope. You know everything before you commit a penny.',
  },
  {
    num: '03',
    label: 'Step Three',
    title: 'We build — you see it live every week',
    text: 'Weekly demos in a real staging environment. You talk directly to the person building it — not a project manager. Every creator persona is loaded in, tested, and tuned before you see it. If something needs adjusting, it gets adjusted that week.',
  },
  {
    num: '04',
    label: 'Step Four',
    title: 'Launch, handover, and it runs itself',
    text: 'We deploy, onboard your whole team in 30 minutes, and hand over full ownership of the code. From that point your team runs content, proposals, and ops through the system — without needing us. We are there for 30 days if anything needs fine-tuning.',
  },
]

function HowItWorks() {
  return (
    <section className="hiw-section section" id="how-it-works">
      <div className="container">
        <div className="hiw-layout">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />The Process</div>
            <h2 className="section-title">From first call<br />to live system —<br />without the theatre</h2>
            <p className="section-sub" style={{ marginTop: '18px', marginBottom: '36px' }}>
              No account managers, no strategy decks, no weekly status calls that go nowhere. You talk to the engineer building your tool from day one.
            </p>
            <a href="#contact" className="btn btn-outline-amber btn-lg">
              Book the first call <Icon.ArrowRight />
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
    q: 'Do you actually run a creator network yourselves?',
    a: "Yes. We operate 7 AI-powered UGC creator personas across TikTok and Instagram right now — travel, fitness, gaming, football, wellness, luxury, and parenting niches. Every piece of content, every brand partnership proposal, every ops decision runs through our own system. We are not selling a theory. We are running it live.",
  },
  {
    q: 'What does the system actually do day to day?',
    a: "It generates hooks, captions, briefs, and hashtags for each creator in their own voice. It produces full brand partnership sponsorship decks when you need to pitch a brand. It tracks your brand deal pipeline, automates follow-ups, and manages creator onboarding. Your team opens the dashboard, picks a creator, picks what they need, and the output is ready in under a minute.",
  },
  {
    q: 'Can it match each creator\'s individual voice?',
    a: "Yes. Before we build, we do a deep voice profiling session for each creator — tone, vocabulary, content pillars, platform habits, audience type. The system is trained on that profile. The output sounds like them, not like a generic AI tool. Your creators will not be able to tell the difference between content written by the system and content written by a skilled writer who knows them well.",
  },
  {
    q: 'How long does a build take?',
    a: "The strategy call is free and takes 45 minutes. A full content system build runs 4 to 6 weeks depending on the size of your roster and the complexity of your ops. You get a precise week-by-week timeline in your proposal before you commit to anything.",
  },
  {
    q: 'Do my team need to be technical to use it?',
    a: "No. The interface is clean, simple, and built for non-technical users. The onboarding session takes 30 minutes for your whole team. After that, the system just works — no prompting expertise, no setup, no tech knowledge required.",
  },
  {
    q: 'What happens to the system after you build it?',
    a: "We manage the system on your behalf — that is what the retainer covers. You get full access to your live portal (content, deal pipeline, weekly reports) and we handle everything operationally. The system is built and run by CAIG; access is tied to your active retainer. Cancel any time with 30 days notice.",
  },
  {
    q: 'What is your pricing model?',
    a: "There is a one-off setup fee of £2,500 for all plans — this covers onboarding, system build, and creator configuration. After that, you pay a monthly retainer based on your creator roster size: Starter (up to 5 creators) at £3,000/mo, Growth (up to 15) at £5,000/mo, or Agency (unlimited) at £8,500/mo. No hidden fees. Cancel with 30 days notice.",
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
            <h2 className="section-title">Every question you have<br />before you book the call</h2>          </div>
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
          <div className="urgency-eyebrow">The honest truth</div>
          <h2 className="urgency-title">
            We are not pitching this.<br />We are running it right now.
          </h2>
          <p className="urgency-body">
            Seven creator personas. Live on TikTok and Instagram. Every post, every brand pitch,
            every ops decision running through the system we built.
            <strong style={{ color: 'var(--t0)' }}> If it is good enough to run our own network, it is good enough to run yours.</strong> The strategy call is 45 minutes. We show you the live system, walk through your roster, and tell you exactly what we'd build — and what it would change.
          </p>
          <a href="#contact" className="btn btn-amber btn-lg breathe">
            See How It Works For Your Agency <Icon.ArrowRight size={17} />
          </a>
          <div className="urgency-note">
            45-minute call &nbsp;&middot;&nbsp; No pitch deck &nbsp;&middot;&nbsp; No obligation &nbsp;&middot;&nbsp; Slots available within 3 business days
          </div>
        </div>
      </FadeUp>
    </section>
  )
}

/* ── CONTACT ─────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      })
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
            <div className="badge"><span className="badge-dot" />Book Your Strategy Call</div>
            <h2 className="section-title">Let us show you<br />exactly what to build</h2>
            <p className="section-sub" style={{ marginBottom: '10px' }}>
              A free 45-minute call where we map your creator roster, your content workflow, and your brand deal pipeline — then tell you exactly what to automate first and what it will cost. No strategy theatre. Just a straight answer.
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
                  <div className="c-slot-sub">hello@cornerstoneaigroup.com &mdash; we reply within one business day, always from a real person.</div>
                </div>
              </div>
              <div className="c-slot">
                <div className="c-slot-icon"><Icon.Linkedin /></div>
                <div>
                  <div className="c-slot-title">LinkedIn</div>
                  <div className="c-slot-sub">Follow us on LinkedIn for build breakdowns, case studies, and AI workflow ideas.</div>
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
                    We will be in touch within 4 business hours with a calendar link to book your free audit. Talk soon.
                  </div>
                </div>
              ) : (
                <>
                  <div className="cform-title">Send us a message</div>
                  <div className="cform-sub">We reply within 4 business hours, every time</div>
                  <form onSubmit={submit} name="contact" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="frow">
                      <div className="fg">
                        <label className="fl">Full Name</label>
                        <input className="fi" name="name" placeholder="Jane Smith" value={form.name} onChange={set('name')} required />
                      </div>
                      <div className="fg">
                        <label className="fl">Company</label>
                        <input className="fi" name="company" placeholder="Acme Ltd" value={form.company} onChange={set('company')} />
                      </div>
                    </div>
                    <div className="fg">
                      <label className="fl">Work Email</label>
                      <input className="fi" type="email" name="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} required />
                    </div>
                    <div className="fg">
                      <label className="fl">I am interested in</label>
                      <select className="fi" name="service" value={form.service} onChange={set('service')} style={{ cursor: 'pointer' }}>
                        <option value="">Select a service&hellip;</option>
                        <option>Free Strategy Call</option>
                        <option>Content System Build</option>
                        <option>Growth Retainer</option>
                        <option>Not sure yet — just exploring</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">Tell us about your creator operation</label>
                      <textarea className="ft" name="message" placeholder="How many creators do you manage? What is the biggest ops headache right now?" value={form.message} onChange={set('message')} />
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
                      {status !== 'sending' ? 'Book My Free Strategy Call' : 'Sending...'}
                      {status !== 'sending' && <Icon.ArrowRight />}
                    </button>
                    <p style={{ fontSize: '11.5px', color: 'var(--t4)', textAlign: 'center', marginTop: '14px' }}>
                      No pitch. No obligation. Just a straight answer on what to build first.
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
              AI content systems for talent agencies, creator managers, and brands
              managing content at scale. Built to spec. Owned by you.
            </p>
          </div>
          <div>
            <div className="footer-col-h">Services</div>
            <ul className="footer-links">
              <li><a href="#services">Free Strategy Call</a></li>
              <li><a href="#services">Content System Build</a></li>
              <li><a href="#services">Growth Retainer</a></li>
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
              <li><a href="#contact">Book Free Audit</a></li>
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
      <main>
        <Hero />
        <Problem />
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
