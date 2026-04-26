import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
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
          <Logo size={22} sub="AI Engineering Studio" />
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
          <a href="#contact" className="btn btn-amber btn-md">Book Free Audit</a>
        </div>
      </div>
    </nav>
  )
}

/* ── HERO DASHBOARD MOCKUP ───────────────────────────────────── */
const HD_MODULES = [
  {
    id: 'proposals', label: 'Proposals', color: '#818cf8',
    client: 'Meridian Consulting Ltd', type: 'Executive Project Proposal',
    output: `EXECUTIVE SUMMARY

This proposal outlines a bespoke AI automation framework for Meridian's quarterly client reporting process.

The system will eliminate 14+ hours of manual data compilation per week, replacing it with a single-click AI-generated report — formatted to your brand, delivered in under 90 seconds.

PROJECTED OUTCOMES
• 14 hrs/week reclaimed per analyst
• 6-week payback period
• Full IP ownership on delivery`,
  },
  {
    id: 'content', label: 'Content', color: '#34d399',
    client: '@MeridianGroup · LinkedIn', type: 'B2B Thought Leadership',
    output: `"The companies winning in 2026 aren't working harder.

They automated the work.

Last quarter, one of our clients reclaimed 14 hours per analyst per week — by replacing their manual reporting with a custom AI system.

It took 6 weeks to build. It paid for itself in 5.

The question isn't whether AI can do this for your business. The question is how long you'll keep paying humans to do it manually."`,
  },
  {
    id: 'outreach', label: 'Outreach', color: '#f59e0b',
    client: 'TechFlow Solutions · Sequence 1/3', type: 'Cold Email — Initial Touch',
    output: `Subject: Quick question about TechFlow

Hi Sarah,

I came across TechFlow while researching B2B SaaS companies scaling in the Midlands — specifically around how teams handle client reporting at volume.

We recently built a system for a comparable firm that cut their reporting time from 6 hours to 18 minutes per client. Happy to send over the case study if useful.

Worth a quick call this week?`,
  },
  {
    id: 'onboarding', label: 'Onboarding', color: '#fb923c',
    client: 'Nova Digital Agency', type: 'Client Welcome Pack',
    output: `WELCOME TO YOUR AI SYSTEM
Nova Digital — Onboarding Guide
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 1 — Discovery & Environment
Credentials, API keys, and environment configured. First demo call on Day 5.

WEEK 2 — Core Build & Integration
Primary automation pipeline built and connected to your existing tools.

WEEK 3 — Testing & Iteration
You test with real data. We refine. Second review call.

WEEK 4 — Launch & Handover
Go live. 30-min team onboarding. 30 days support begins.`,
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
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M3 3 L15 3 L21 9 L21 21 L3 21 Z" fill="#F59E0B"/>
              <path d="M15 3 L21 9 L15 9 Z" fill="rgba(0,0,0,0.22)"/>
            </svg>
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

/* ── HERO ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="container">
        <div className="hero-center">
          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            The AI systems your<br />
            <span className="hl">competitors wish</span><br />
            they had first
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
          >
            We build custom AI that eliminates your most expensive manual workflows —
            designed around your business, owned by you.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
          >
            <a href="#contact" className="btn btn-amber btn-lg breathe">
              Book a Free AI Audit
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
            <span style={{ color: 'var(--t3)' }}>Trusted by operations teams across the UK</span>
            <span style={{ margin: '0 12px', opacity: 0.2 }}>|</span>
            No lock-in contracts
            <span style={{ margin: '0 12px', opacity: 0.2 }}>|</span>
            You own everything we build
          </motion.div>
        </div>
      </div>
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
          { to: 18, suffix: ' hrs', label: 'Avg. hours saved per week, per client', amber: true },
          { to: 5,  suffix: ' wks', label: 'Average payback period from go-live',  amber: true },
          { to: 6,  suffix: ' wks', label: 'From first call to live in production', amber: false },
          { to: 0,  suffix: '',     label: 'Lock-in contracts — cancel any retainer anytime', amber: false, text: 'Zero' },
        ].map((s, i) => (
          <div className="proof-stat" key={i}>
            <div className="proof-val">
              <span className={s.amber ? 'av' : ''}>
                {s.text ? s.text : <Counter to={s.to} suffix={s.suffix} />}
              </span>
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
    title: "You're paying salaries to do a machine's job",
    body: "The average 10-person team spends 8,000 to 15,000 pounds a month on tasks that can be automated — content creation, proposal writing, data entry, reporting. That is not overhead. That is waste. And it compounds every single month you do not act.",
  },
  {
    icon: <Icon.TrendingDown />,
    title: "Your competitors already made the move",
    body: "Right now, businesses like yours are quietly automating their most expensive workflows. The ones who moved first are operating on 40% less overhead. The ones who wait are playing catch-up — at twice the cost, because the gap between you widens every week.",
  },
  {
    icon: <Icon.AlertCircle />,
    title: "Every 'we'll look at it later' costs you money today",
    body: "You already know which tasks are eating your team alive. You have probably said 'we should automate this' at least twice. Every month you delay is another month of salary costs, tired staff doing repetitive work, and ROI compounding against you.",
  },
]

function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />The Real Cost</div>
            <h2 className="section-title">You already know something<br />needs to change</h2>
            <p className="section-sub">
              Manual workflows do not just waste time. They drain morale, cap your growth, and hand your competitors an advantage they will not give back.
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
              Find out what it is costing you <Icon.ArrowRight />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ── SOLUTION ────────────────────────────────────────────────── */
const solutions = [
  { icon: <Icon.Target size={18} />, title: 'Free audit — identify the highest-value target', body: 'Before you spend a penny, we map your workflow and pinpoint the single automation that will pay for itself fastest. Most clients are shocked by how obvious it is once someone looks.' },
  { icon: <Icon.Layers size={18} />, title: 'Built from scratch around your workflow', body: 'Not ChatGPT with a custom prompt. Not a Zapier chain dressed up as AI. Your tool is engineered specifically for how your business operates — your language, your edge cases, your standards.' },
  { icon: <Icon.BarChart size={18} />, title: 'You will have the numbers to prove it', body: 'We baseline your current time cost before we start. After launch, we track savings week by week. You will have clear ROI data to justify the spend internally and plan the next build.' },
  { icon: <Icon.RefreshCw size={18} />, title: 'Delivered in weeks — not a six-month project', body: 'No waterfall. No committee sign-offs. No slide decks. A lean engineer-led process that gets working software into your hands in 6 weeks or less — then keeps improving it.' },
  { icon: <Icon.Shield size={18} />, title: 'You own everything. No subscriptions. No lock-in.', body: 'Full IP transfer on completion. The code is yours. You can take it in-house, modify it, or run it forever without paying us another penny. We earn repeat business by being worth it.' },
]

function Solution() {
  return (
    <section className="solution-section section" id="solution">
      <div className="container">
        <div className="sol-grid">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />How We Solve It</div>
            <h2 className="section-title">The specific AI system<br />your business actually needs</h2>
            <p className="section-sub" style={{ marginBottom: '36px' }}>
              Not generic AI. Not off-the-shelf SaaS. A custom-built tool engineered around your exact workflow — scoped and delivered before you have time to second-guess it.
            </p>
            <a href="#contact" className="btn btn-amber btn-lg">
              Start with a Free Audit <Icon.ArrowRight />
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
    quote: "I had been burned by AI agencies before. Lots of strategy slides, zero working software. CAIG had a prototype in our hands on day 8. Full production launch by week 5. It now runs our entire client onboarding workflow — untouched. I do not think about it anymore. It just works.",
    name: 'Priya Nair',
    role: 'Head of Operations',
    co: 'Nair Digital',
    av: '#7c7fff',
    initials: 'PN',
    metric: '8 days',
    metricLbl: 'to prototype',
  },
  {
    quote: "The maths was embarrassing once someone laid it out. We were spending 4,200 pounds a month in staff time on tasks that now run on autopilot. We paid 6,500 for the build. Break-even in 7 weeks. This is the highest-ROI decision we have made in three years of trading.",
    name: 'Tom Aldridge',
    role: 'Operations Director',
    co: 'Aldridge Group',
    av: '#34d8a4',
    initials: 'TA',
    metric: '7 wks',
    metricLbl: 'to break-even',
  },
  {
    quote: "Our content manager was spending three days a week producing material that is now done in 40 minutes. She now runs strategy and client relationships — which is what we hired her for. The tool paid for itself. Her happiness paid for itself twice over.",
    name: 'Sofia Reyes',
    role: 'Managing Director',
    co: 'Reyes & Partners',
    av: '#f5a623',
    initials: 'SR',
    metric: '40 min',
    metricLbl: 'was 3 days',
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
              Not case studies written by a marketing team. Direct quotes from clients who can tell you exactly how fast they got their money back.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="testi-featured">
            <div className="testi-mark">"</div>
            <div className="testi-quote-big">
              We were spending 18 hours a week writing proposals, case studies, and social content across three people. CAIG built us one system that does all three in under an hour. We recovered the cost in 5 weeks and have not looked back. I genuinely cannot imagine running the business without it now.
            </div>
            <div className="testi-meta">
              <div className="testi-av" style={{ background: '#5b5ef4' }}>MW</div>
              <div className="testi-who">
                <div className="testi-name">Marcus Webb</div>
                <div className="testi-role">Managing Director &middot; Webb &amp; Partners Consulting</div>
              </div>
              <div className="testi-result-tag">
                <div>
                  <div className="trt-val">5 weeks</div>
                  <div className="trt-lbl">full ROI payback</div>
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
              I want results like this <Icon.ArrowRight />
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
    title: 'Hire Someone',
    sub: 'Salary, NI, benefits, training, notice periods, sick leave, and management overhead — all for work that could be automated',
    winner: false,
    pros: [
      { yes: false, text: 'Still does the same manual work, just faster' },
      { yes: false, text: 'Needs managing, training, and replacing' },
      { yes: false, text: 'Scales linearly — more work means more hires' },
      { yes: true,  text: 'Human judgment and relationship skills' },
    ],
  },
  {
    title: 'Off-the-Shelf SaaS',
    sub: 'Recurring monthly cost, forever — and it still does not fit your workflow or match your brand',
    winner: false,
    pros: [
      { yes: false, text: 'Generic output everyone else also gets' },
      { yes: false, text: "Does not understand your clients, tone, or process" },
      { yes: false, text: 'Another subscription eating margin every month' },
      { yes: true,  text: 'Fast to set up initially' },
    ],
  },
  {
    title: 'Do Nothing',
    sub: 'Hidden labour costs compound every month — plus the compounding advantage your competitors are building',
    winner: false,
    pros: [
      { yes: false, text: 'Costs grow as the business grows' },
      { yes: false, text: 'Staff burn out on repetitive work' },
      { yes: false, text: 'Competitors widen the gap every month' },
      { yes: false, text: 'No competitive differentiation' },
    ],
  },
  {
    title: 'Custom AI System',
    sub: 'Built once for your exact workflow — owned forever, ROI proven from week one',
    winner: true,
    pros: [
      { yes: true,  text: 'Built around your exact workflow and brand' },
      { yes: true,  text: 'Full IP ownership — no ongoing cost' },
      { yes: true,  text: 'Scales with zero additional overhead' },
      { yes: true,  text: 'ROI tracked and proven from week one' },
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
              Every business has four options when it comes to repetitive workflows. Three of them keep costing you money indefinitely.
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
    name: 'AI Audit',
    time: '5–7 business days',
    featured: false,
    popular: false,
    feats: [
      'Deep-dive workflow analysis session',
      'Automation opportunity map',
      'Tool recommendation & tech stack report',
      'Full build roadmap with scoped estimates',
      'Delivered as working prototype',
      'Full IP handover on completion',
    ],
    cta: 'Book Audit Call',
  },
  {
    name: 'Custom AI Build',
    time: '4–6 weeks',
    featured: true,
    popular: true,
    feats: [
      'Everything in the AI Audit',
      'Full custom tool development',
      'Gemini 2.5 Pro / GPT-4o / Claude integration',
      'Internal dashboard and team controls',
      '30 days of post-launch support',
      'Team onboarding and handover session',
    ],
    cta: 'Start Your Build',
  },
  {
    name: 'Monthly Retainer',
    time: 'Ongoing — cancel anytime',
    featured: false,
    popular: false,
    feats: [
      'Dedicated monthly engineering hours',
      'Continuous tool iteration and new features',
      'New automations added each sprint',
      'Priority support via direct Slack access',
      'Monthly ROI and usage reporting',
      'No minimum term — cancel with 30 days notice',
    ],
    cta: 'Discuss Retainer',
  },
]

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <FadeUp>
          <div className="sh c">
            <div className="badge"><span className="badge-dot" />Services</div>
            <h2 className="section-title">Structured delivery.<br />No surprises. No lock-in.</h2>
            <p className="section-sub">
              Every engagement is scoped upfront. You will know the exact timeline and deliverables before you commit to anything — no hourly billing, no scope creep.
            </p>
          </div>
        </FadeUp>
        <StaggerGrid className="svc-grid">
          {tiers.map((t, i) => (
            <FadeItem key={i}>
              <div className={`svc-card${t.featured ? ' feat' : ''}`}>
                {t.popular && <div className="svc-popular">Most Popular</div>}
                <div className="svc-name">{t.name}</div>
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
    title: 'Free AI Audit Call — 45 minutes',
    text: 'We map your workflow together, identify the single highest-value automation target, and give you a straight answer on what it would cost and how long it would take. No pitch deck. No obligation.',
  },
  {
    num: '02',
    label: 'Step Two',
    title: 'Scoped Proposal in 48 hours',
    text: 'You receive a written proposal: exact deliverables, the tech stack we will use, and a week-by-week timeline. You know everything before you commit. No hourly rates. No surprises.',
  },
  {
    num: '03',
    label: 'Step Three',
    title: 'We Build — with you in the loop',
    text: 'Weekly demos in a live staging environment. A direct line to the engineer — not a project manager. You see progress every week. If something needs adjusting, we adjust it that week.',
  },
  {
    num: '04',
    label: 'Step Four',
    title: 'Launch, Handover, and Proven ROI',
    text: 'We deploy, onboard your team in a 30-minute session, and hand over full ownership of the code. Then we track time saved and cost recovered for 30 days together, so you have the numbers to prove the ROI internally.',
  },
]

function HowItWorks() {
  return (
    <section className="hiw-section section" id="how-it-works">
      <div className="container">
        <div className="hiw-layout">
          <FadeUp>
            <div className="badge"><span className="badge-dot" />The Process</div>
            <h2 className="section-title">From first call<br />to live tool<br />in 6 weeks</h2>
            <p className="section-sub" style={{ marginTop: '18px', marginBottom: '36px' }}>
              A lean, engineer-led process with no fluff in the middle. You talk to the person building your tool from day one to go-live.
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
    q: 'How is this different from just using ChatGPT or an off-the-shelf AI tool?',
    a: "ChatGPT is a general-purpose tool that does not know your business. Off-the-shelf AI products are built for the average company — which means they fit no company perfectly. We build a specific system engineered around your workflow, your brand voice, your clients, and your edge cases. The output is something your team uses every day without thinking about it — not a tab they have to constantly prompt and clean up.",
  },
  {
    q: 'What kinds of workflows do you automate?',
    a: "Content generation (social, blog, proposals), client onboarding and qualification, internal reporting, data extraction from documents, customer support triage, email drafting — anything where a human is repeatedly doing the same type of cognitive work with similar inputs. If you can describe the task in a repeatable way, we can almost certainly automate it.",
  },
  {
    q: 'Do I need a technical team to use what you build?',
    a: "No. We build for non-technical end users. Your tool will have a clean, simple interface your whole team can use on day one. The onboarding session takes 30 minutes. After that, it just works — no prompting, no setup, no technical knowledge required.",
  },
  {
    q: 'How long does a typical project take?',
    a: "The AI Audit takes 5 to 7 business days. A full custom build runs 4 to 6 weeks depending on complexity. You will get a precise week-by-week timeline in your scoped proposal before you commit to anything.",
  },
  {
    q: 'What happens after the project is delivered?',
    a: "You own 100% of the code and IP from day one. We include 30 days of post-launch support in every build. After that, you can move to a monthly retainer for ongoing development, take the codebase in-house, or simply use what we built and never pay us again. There is no lock-in. We earn repeat business by being worth it.",
  },
  {
    q: 'What if I am not sure what to automate?',
    a: "That is exactly what the free audit call is for. Most clients come to us knowing something feels expensive or slow, but not knowing exactly what to build. In 45 minutes we usually identify two or three high-value targets and rank them by ROI. You will leave with a clear picture of what to do first — whether you hire us or not.",
  },
  {
    q: 'What is your pricing model?',
    a: "All projects are scoped upfront with a fixed deliverable and timeline. You pay 50% to start and 50% on delivery — never by the hour. Retainer clients pay monthly and can cancel with 30 days notice. There are no hidden fees, no scope creep charges, and no surprise invoices.",
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
            <h2 className="section-title">Every question you have<br />before you book the call</h2>
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
          <div className="urgency-eyebrow">The honest truth</div>
          <h2 className="urgency-title">
            If you have read this far,<br />you already know you need this
          </h2>
          <p className="urgency-body">
            The only question is whether you act on it this week — or in six months, after
            <strong style={{ color: 'var(--t0)' }}> months more of avoidable labour costs</strong> and
            watching a competitor launch the system you kept putting off.
            The audit is free. The call is 45 minutes. The ROI is documented.
          </p>
          <a href="#contact" className="btn btn-amber btn-lg breathe">
            Book My Free Audit Now <Icon.ArrowRight size={17} />
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
            <div className="badge"><span className="badge-dot" />Book Your Audit</div>
            <h2 className="section-title">Let us show you<br />exactly what to build</h2>
            <p className="section-sub" style={{ marginBottom: '10px' }}>
              A 45-minute call where we map your workflow, identify the highest-value automation, and give you a clear scope for building it. No strategy theatre. Just a straight answer.
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
                  <div className="c-slot-sub">hello@yourdomain.com &mdash; we reply within one business day, always from a real person.</div>
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
                        <option>AI Audit</option>
                        <option>Custom AI Build</option>
                        <option>Monthly Retainer</option>
                        <option>Not sure yet — just exploring</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">Which task is eating your team alive?</label>
                      <textarea className="ft" name="message" placeholder="Describe the repetitive workflow you most want to eliminate..." value={form.message} onChange={set('message')} />
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
                      {status === 'sending' ? 'Sending...' : 'Book My Free Audit'}
                      {status !== 'sending' && <Icon.ArrowRight />}
                    </button>
                    <p style={{ fontSize: '11.5px', color: 'var(--t4)', textAlign: 'center', marginTop: '14px' }}>
                      No pitch. No obligation. Just a straight answer on what to build.
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
              UK-based AI engineering studio. Custom automation tools that eliminate your most expensive manual workflows.
            </p>
          </div>
          <div>
            <div className="footer-col-h">Services</div>
            <ul className="footer-links">
              <li><a href="#services">AI Audit</a></li>
              <li><a href="#services">Custom AI Build</a></li>
              <li><a href="#services">Monthly Retainer</a></li>
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
        <ProofBar />
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
