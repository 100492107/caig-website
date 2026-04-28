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
          <Logo size={22} sub="AI Systems" />
        </a>
        <ul className="nav-links">
          {[
            ['#problem', 'The Problem'],
            ['#services', 'What We Build'],
            ['#how-it-works', 'How It Works'],
            ['#testimonials', 'Results'],
            ['#faq', 'FAQ'],
          ].map(([h, l]) => (
            <li key={h}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <a href="#contact" className="btn btn-amber btn-md">Book a Free Call</a>
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
  { icon: '↑', text: 'Stop paying staff to do work a system should handle' },
  { icon: '⚡', text: 'Leads responded to in seconds — not hours' },
  { icon: '✓', text: 'Fully managed — we build it, we run it, you see results' },
  { icon: '↑', text: 'Cut ops overhead without cutting output' },
  { icon: '★', text: 'Built on systems we run in our own business first' },
  { icon: '⚡', text: 'One system replaces three manual processes' },
  { icon: '✓', text: 'Cancel with 30 days notice — no lock-in ever' },
  { icon: '↑', text: 'More revenue. Less time spent running the machine.' },
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
          <div className="hero-badge-wrap">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="badge" style={{ display: 'inline-flex', marginBottom: '28px' }}>
                <span className="badge-dot" />We build and run AI systems for businesses — live, right now
              </div>
            </motion.div>
          </div>

          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Your business is losing hours every day<br />
            to work that <span className="hl">a system should be doing.</span><br />
            We build that system.
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
          >
            You are spending money on staff doing work that should be automated. You are losing leads because no system is catching them. You are making decisions blind because nobody has built you the infrastructure to run clearly. We fix that. We build bespoke AI systems that run your operations — so you can run your business.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href="#contact" className="btn btn-amber btn-lg breathe">
              Book a Free Strategy Call
              <Icon.ArrowRight size={16} />
            </a>
            <a href="#services" className="btn btn-ghost btn-lg">
              See What We Build
            </a>
          </motion.div>

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <span style={{ color: 'var(--t3)' }}>We run it ourselves first — we know it works</span>
            <span style={{ margin: '0 12px', opacity: 0.2 }}>|</span>
            Fully managed — we build it and run it for you
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
          { val: '80%',  suf: '',        lbl: 'Of tasks business owners do manually could be fully automated with the right system in place', amber: true },
          { val: '£28K', suf: '+',       lbl: 'Average annual cost of a single ops hire — before NI, benefits, management time, and sick days', amber: false },
          { val: '6×',   suf: '',        lbl: 'More leads responded to when an AI intake system handles enquiries instantly vs a human checking email', amber: false },
          { val: '30',   suf: ' days',   lbl: 'Notice to cancel — no contracts, no lock-in, no penalty. We keep clients because the system works.', amber: false },
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
    title: "You are the most expensive person in the building — and you're doing admin.",
    body: "Chasing invoices. Writing the same email for the seventh time. Updating a spreadsheet that nobody else uses. Every hour you spend inside the machine is an hour you are not spending on growth, clients, or money. That is not a time management problem. That is a systems problem.",
  },
  {
    icon: <Icon.TrendingDown />,
    title: "Leads are coming in and going cold before anyone responds.",
    body: "A prospect fills in your form at 7pm on a Thursday. By Friday afternoon they have already spoken to someone else. Not because your product is worse. Because your competitor has a system that responded in 90 seconds and yours has a human who saw it Monday morning. Speed wins. Always.",
  },
  {
    icon: <Icon.AlertCircle />,
    title: "Your tools don't talk to each other. You are the connection.",
    body: "You are copying data from one system into another. Manually. Every day. CRM to spreadsheet. Email to Slack. Invoice to accountant. Every manual handoff is a chance for something to fall through. You are not the bottleneck — the missing system is. And you are paying for it in hours and errors.",
  },
]

function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />The Real Problem</div>
            <h2 className="section-title">Your business has a systems gap.<br />And it is costing you daily.</h2>
            <p className="section-sub">
              Every business owner knows the feeling — too much time in the weeds, too little time actually running the company. It is not a motivation problem. It is not a staffing problem. It is an infrastructure problem. And infrastructure is exactly what we build.
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
              Let's fix your ops <Icon.ArrowRight />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── SOLUTION ────────────────────────────────────────────────── */
const solutions = [
  { icon: <Icon.Target size={18} />, title: 'We prove it on our own business before we sell it', body: 'Every system we build for a client we have already tested on ourselves. Our own operations — content, lead intake, reporting, outreach — run on the same AI infrastructure we install for you. We are not pitching a theory. We are showing you what is already working.' },
  { icon: <Icon.Zap size={18} />, title: 'Your leads get responded to before a human even sees them', body: 'An AI intake system qualifies every enquiry the moment it arrives, responds instantly, asks the right questions, and books the call — all without a person touching it. You wake up to a booked calendar. Not a list of leads to chase.' },
  { icon: <Icon.Layers size={18} />, title: 'The repetitive work stops landing on people', body: 'Invoicing. Follow-ups. Reporting. Onboarding. The work that eats hours every week gets automated end to end. Your team stops doing low-value processing and starts doing the work that actually moves the business forward.' },
  { icon: <Icon.RefreshCw size={18} />, title: 'Your tools finally talk to each other', body: 'We connect your existing stack — CRM, email, calendar, accounting, comms — so data flows automatically between them. No more manual handoffs. No more copy-pasting. No more things falling through the gap between systems.' },
  { icon: <Icon.Shield size={18} />, title: 'Fully managed. Nothing to maintain. Cancel any time.', body: 'We build the system, we run it, and we improve it every month. You access everything through a clean live portal — reports, pipelines, outputs — included in your retainer. No tools to manage, no prompts to write. Cancel with 30 days notice.' },
]

function Solution() {
  return (
    <section className="solution-section section" id="solution">
      <div className="container">
        <div className="sol-grid">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />What We Build</div>
            <h2 className="section-title">Bespoke AI systems<br />built around your ops.</h2>
            <p className="section-sub" style={{ marginBottom: '36px' }}>
              Not a SaaS tool. Not a chatbot. A fully managed AI system designed around how your business actually runs — built by us, operated by us, delivered to you through a live portal. Your team focuses on growth. We handle the infrastructure.
            </p>
            <a href="#contact" className="btn btn-amber btn-lg">
              Book a Free Strategy Call <Icon.ArrowRight />
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
    quote: "I was spending two hours every morning just on admin — chasing payments, updating the CRM, sending the same follow-up emails. CAIG mapped our workflow, built a system in three weeks, and now that entire block of work just happens. I haven't touched it since.",
    name: 'Priya Nair',
    role: 'Founder',
    co: 'Nair Consulting Group',
    av: '#7c7fff',
    initials: 'PN',
    metric: '2 hrs/day',
    metricLbl: 'of admin fully automated',
  },
  {
    quote: "We were losing leads constantly — not because we weren't getting enquiries, but because nobody was responding fast enough. CAIG built an intake system that replies within a minute, qualifies the lead, and books the call. Our conversion rate went up 40% in six weeks.",
    name: 'Tom Aldridge',
    role: 'Head of Sales',
    co: 'Aldridge Group',
    av: '#34d8a4',
    initials: 'TA',
    metric: '+40%',
    metricLbl: 'lead conversion in 6 weeks',
  },
  {
    quote: "Every month I was spending a full day pulling reports together for clients — manually copying numbers from four different tools into a deck. CAIG automated the entire thing. The report builds itself and lands in my inbox Monday morning. I didn't realise how much time I was wasting until it stopped.",
    name: 'Sofia Reyes',
    role: 'Operations Director',
    co: 'Reyes Business Services',
    av: '#f5a623',
    initials: 'SR',
    metric: '1 full day',
    metricLbl: 'saved on reporting per month',
  },
]

function Testimonials() {
  return (
    <section className="section testi-section" id="testimonials">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />Client Results</div>
            <h2 className="section-title">Real businesses.<br />Specific numbers.</h2>
            <p className="section-sub">
              Not case studies written by a marketing team. Direct accounts from business owners who can tell you exactly what changed, how quickly, and what it was worth.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="testi-featured">
            <div className="testi-mark">"</div>
            <div className="testi-quote-big">
              We have six people in this business. Before CAIG, four of them were spending significant parts of their week on work that a computer should have been doing. We brought CAIG in, they mapped our ops in one call, built the system in a month, and those four people now spend that time on actual client work. The system paid for itself inside six weeks. I wish we had done it two years ago.
            </div>
            <div className="testi-meta">
              <div className="testi-av" style={{ background: '#5b5ef4' }}>MW</div>
              <div className="testi-who">
                <div className="testi-name">Marcus Webb</div>
                <div className="testi-role">Managing Director &middot; Webb Business Group</div>
              </div>
              <div className="testi-result-tag">
                <div>
                  <div className="trt-val">6 weeks</div>
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
    title: 'Hire More Staff',
    sub: 'Another salary costs £28–45K a year — and they still do the same manual work, just faster',
    winner: false,
    pros: [
      { yes: false, text: 'Output is still limited by hours in the working day' },
      { yes: false, text: 'Sick days, turnover, training — all land on you' },
      { yes: false, text: 'Every new client adds proportionally more headcount' },
      { yes: true,  text: 'Human judgement and client relationships' },
    ],
  },
  {
    title: 'Buy More SaaS Tools',
    sub: 'Another subscription that solves one problem and creates three more — and still needs a person to run it',
    winner: false,
    pros: [
      { yes: false, text: 'Tools do not talk to each other — you are still the glue' },
      { yes: false, text: 'Generic features that do not fit how your business works' },
      { yes: false, text: 'More monthly cost with no guarantee of outcome' },
      { yes: true,  text: 'Fast to set up and easy to cancel' },
    ],
  },
  {
    title: 'Keep Doing It Manually',
    sub: 'Every week you wait is another week of paying people to do work that should be automated',
    winner: false,
    pros: [
      { yes: false, text: 'Ops cost grows with every client you take on' },
      { yes: false, text: 'Team burns out on repetitive low-value processing' },
      { yes: false, text: 'Leads go cold while someone is busy doing something else' },
      { yes: false, text: 'No system means no consistency and no scale' },
    ],
  },
  {
    title: 'A CAIG AI System',
    sub: 'Built around how your business actually works — managed by us, live from week one.',
    winner: true,
    pros: [
      { yes: true,  text: 'Built specifically for your workflows — not off the shelf' },
      { yes: true,  text: 'Runs automatically — no babysitting, no prompting' },
      { yes: true,  text: 'Scales with your business without adding headcount' },
      { yes: true,  text: 'Fully managed — we run it, you access the results' },
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
              Every business owner has four options. Three of them keep costing more as you grow — or keep you stuck at the same ceiling.
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
    time: '45 minutes — no obligation, no pitch',
    featured: false,
    popular: false,
    feats: [
      'Full review of your current ops and workflows',
      'Identify exactly where you are losing the most time and money',
      'A clear recommendation on what to automate first',
      'Written action plan delivered after the call',
      'Honest advice — whether you hire us or not',
      'Credited in full toward your build if you proceed',
    ],
    cta: 'Book Strategy Call',
  },
  {
    name: 'Foundation',
    price: '£3,000/mo',
    time: '£2,500 setup · single workflow focus',
    featured: false,
    popular: false,
    feats: [
      'One core workflow automated end to end',
      'Built specifically around your business — not a template',
      'Lead intake, reporting, content, invoicing — your choice',
      'Live portal to access outputs and track results',
      'Monthly reporting on time saved and impact',
      '30-day cancel notice — no long-term commitment',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '£5,000/mo',
    time: '£2,500 setup · multi-workflow system',
    featured: true,
    popular: true,
    feats: [
      'Everything in Foundation',
      'Up to three connected workflows automated',
      'Systems talk to each other — data flows automatically',
      'Priority support and monthly strategy session',
      'New automations added each month as your ops evolve',
      'Team portal with live dashboards and reporting',
    ],
    cta: 'Start Growth Plan',
  },
  {
    name: 'Enterprise',
    price: '£8,500/mo',
    time: '£2,500 setup · full ops infrastructure',
    featured: false,
    popular: false,
    feats: [
      'Everything in Growth',
      'Unlimited workflows and automations',
      'Dedicated account manager',
      'Bespoke automation sprints every month',
      'White-label portal option for client-facing use',
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
            <div className="badge"><span className="badge-dot" />What We Build</div>
            <h2 className="section-title">Simple, transparent<br />retainer pricing.</h2>
            <p className="section-sub">
              One setup fee. One monthly retainer. Cancel with 30 days notice.<br />
              We build the system, we run it — you access everything through a live portal.
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
    text: 'You walk us through how your business currently operates. We identify the two or three places where automation would save the most time and money. You leave with a clear answer on what to build first and roughly what it costs. No pitch. No obligation. Just the honest answer.',
  },
  {
    num: '02',
    label: 'Step Two',
    title: 'Written proposal in 48 hours',
    text: 'You get a precise breakdown — every workflow we will automate, the exact tech stack, and a week-by-week build timeline. Fixed price, fixed scope. You know exactly what you are buying before you spend a penny.',
  },
  {
    num: '03',
    label: 'Step Three',
    title: 'We build — you see it live every week',
    text: 'We build in weekly sprints with a live demo every Friday. You talk directly to the person building it — not a project manager. If something needs adjusting, it gets adjusted that week. No surprises at the end.',
  },
  {
    num: '04',
    label: 'Step Four',
    title: 'It goes live — and runs itself',
    text: 'We deploy, onboard your team in 30 minutes, and the system runs from that point. You access everything through a clean portal — outputs, reports, pipelines. We handle everything operationally on the retainer. Cancel any time with 30 days notice.',
  },
]

function HowItWorks() {
  return (
    <section className="hiw-section section" id="how-it-works">
      <div className="container">
        <div className="hiw-layout">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />The Process</div>
            <h2 className="section-title">From first call<br />to live system —<br />in under four weeks</h2>
            <p className="section-sub" style={{ marginTop: '18px', marginBottom: '36px' }}>
              No account managers. No discovery workshops that go nowhere. No strategy decks you pay for and never use. You talk to the person building your system from day one.
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
    q: 'What kind of businesses do you work with?',
    a: "Any business with repetitive operational workflows that are currently being done by hand. We have built systems for service businesses, agencies, content operations, consulting firms, and sales-led businesses. If you can describe a task your team does the same way every day, we can almost certainly automate it.",
  },
  {
    q: 'What does a CAIG system actually do day to day?',
    a: "It depends on what we build for you — that is the point. It might automatically respond to and qualify every new lead the moment they enquire. It might generate client reports every Monday without anyone touching a spreadsheet. It might connect your CRM, email, and accounting tool so data flows between them without manual entry. We map your specific ops first, then build the system around that.",
  },
  {
    q: 'How is this different from just using ChatGPT or Zapier?',
    a: "ChatGPT is a general tool. Zapier connects tools but does not make decisions. What we build is a bespoke system that understands your business, your workflow, and your outputs — and operates them end to end without you touching it. The difference is between a hammer and a factory. One requires a person every time. The other just runs.",
  },
  {
    q: 'How long does a build take?',
    a: "The strategy call is free and takes 45 minutes. A full system build typically runs 3 to 5 weeks depending on the complexity of your workflows. You get a precise week-by-week timeline in your proposal before you commit to anything.",
  },
  {
    q: 'Do my team need to be technical to use it?',
    a: "No. The interface is clean and built for non-technical users. Onboarding your whole team takes 30 minutes. After that the system just runs — no prompting expertise, no technical knowledge, no maintenance. That is our job.",
  },
  {
    q: 'What happens if I want to cancel?',
    a: "30 days notice — that is it. No penalty, no contract, no awkward conversation. We are confident enough in what we build that we do not need to lock you in. The system keeps working for those 30 days and then access ends.",
  },
  {
    q: 'What is the pricing model?',
    a: "Every plan starts with a £2,500 setup fee which covers the discovery, build, and deployment of your first system. After that you pay a monthly retainer: Foundation at £3,000/mo, Growth at £5,000/mo, or Enterprise at £8,500/mo. No hidden fees. The retainer covers us running, monitoring, and improving the system every month.",
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
          <div className="urgency-eyebrow">The straight truth</div>
          <h2 className="urgency-title">
            Every week without a system<br />is a week you are paying for one anyway.
          </h2>
          <p className="urgency-body">
            You are already paying. In staff hours. In missed leads. In time you spend doing work a machine should handle.
            <strong style={{ color: 'var(--t0)' }}> The only question is whether you keep paying for the problem or start paying for the solution.</strong> The strategy call is 45 minutes. We map your ops, show you exactly what we would build, and tell you what it would save. No pitch. No deck. Just a straight answer — and you decide.
          </p>
          <a href="#contact" className="btn btn-amber btn-lg breathe">
            Book the Call. Fix the Business. <Icon.ArrowRight size={17} />
          </a>
          <div className="urgency-note">
            45-minute call &nbsp;&middot;&nbsp; No pitch deck &nbsp;&middot;&nbsp; No obligation &nbsp;&middot;&nbsp; Slots available this week
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
            <div className="badge"><span className="badge-dot" />Book Your Free Call</div>
            <h2 className="section-title">Let's find out exactly<br />what we can fix</h2>
            <p className="section-sub" style={{ marginBottom: '10px' }}>
              45 minutes. We map your ops, find your biggest drain, and tell you exactly what we would build and what it would cost. You walk away with a clear answer — whether you hire us or not.
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
                  <div className="cform-title">Tell us about your business</div>
                  <div className="cform-sub">We reply within 4 business hours, every time</div>
                  <form onSubmit={submit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="frow">
                      <div className="fg">
                        <label className="fl">Full Name</label>
                        <input className="fi" name="name" placeholder="Jane Smith" value={form.name} onChange={set('name')} />
                      </div>
                      <div className="fg">
                        <label className="fl">Company</label>
                        <input className="fi" name="company" placeholder="Acme Ltd" value={form.company} onChange={set('company')} />
                      </div>
                    </div>
                    <div className="frow">
                      <div className="fg">
                        <label className="fl">Work Email</label>
                        <input className="fi" type="email" name="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} />
                      </div>
                      <div className="fg">
                        <label className="fl">Phone Number</label>
                        <input className="fi" type="tel" name="phone" placeholder="+44 7700 900000" value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>
                    <div className="fg">
                      <label className="fl">I am interested in</label>
                      <select className="fi" name="service" value={form.service} onChange={set('service')} style={{ cursor: 'pointer' }}>
                        <option value="">What do you need help with?</option>
                        <option>Automating repetitive ops / admin</option>
                        <option>Lead intake and follow-up</option>
                        <option>Reporting and financial visibility</option>
                        <option>Content and marketing systems</option>
                        <option>Connecting existing tools</option>
                        <option>Not sure — just know something needs fixing</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">Tell us what is eating your time</label>
                      <textarea className="ft" name="message" placeholder="What does your team spend too much time on? Where are leads or money falling through the gaps?" value={form.message} onChange={set('message')} />
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
                      No pitch. No obligation. A straight answer on what to fix and what it costs.
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
