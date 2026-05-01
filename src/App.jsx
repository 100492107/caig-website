import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Logo } from './Logo'
import Privacy from './Privacy'
import Terms from './Terms'

/* ── ICONS ──────────────────────────────────────────────────── */
const Icon = {
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2.5 7.5L6 11L12.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Clock: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7.5 4.5V7.5L9.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Shield: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1.5L13 3.5V8C13 11 10 13.5 7.5 14C5 13.5 2 11 2 8V3.5L7.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  FileText: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 5H9M5 8H9M5 11H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 1V4H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Zap: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M8.5 1.5L3 8.5H7.5L6.5 13.5L13 6.5H8.5L8.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="8" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="6" y="5" width="3" height="9" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Map: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M1 3L5 1.5L10 3.5L14 2V12L10 13.5L5 11.5L1 13V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M5 1.5V11.5M10 3.5V13.5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M3 7.5H12M9 4.5L12 7.5L9 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

/* ── NAV ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="/" className="nav-wordmark">
          Cornerstone<span>AI</span> Group
        </a>
        <div className="nav-right">
          <a href="#intake" className="btn btn-blue btn-md breathe">
            Apply for an Audit
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ── HERO ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow">AI Workflow Consulting</div>
          <h1 className="hero-h1">
            Your team is doing work<br/>
            <em>software should be doing.</em>
          </h1>
          <p className="hero-sub">
            We audit your business, find the repetitive processes costing you the most time, and show you exactly what to automate — in plain English, with a clear return on investment.
          </p>
          <div className="hero-ctas">
            <a href="#intake" className="btn btn-blue btn-xl">
              Apply for an Audit <Icon.ArrowRight />
            </a>
            <a href="#how" className="btn btn-outline btn-xl">
              How it works
            </a>
          </div>
          <div className="hero-trust">
            <span className="hero-trust-item">
              <span className="hero-trust-icon"><Icon.Check /></span>
              Fixed fee. No surprises.
            </span>
            <span className="hero-trust-item">
              <span className="hero-trust-icon"><Icon.Check /></span>
              Results in 2 weeks
            </span>
            <span className="hero-trust-item">
              <span className="hero-trust-icon"><Icon.Check /></span>
              No technical knowledge needed
            </span>
          </div>
        </div>

        <div className="hero-card">
          <div className="hc-label">The AI Workflow Audit</div>
          <div className="hc-title">Find out exactly what to automate — and what it's worth.</div>
          <div className="hc-price">£2,500</div>
          <div className="hc-price-note">Fixed fee. Delivered in 2 weeks.</div>
          <ul className="hc-items">
            {[
              'Full map of your highest-cost manual processes',
              '3–5 automation opportunities ranked by ROI',
              'Plain-English report — no jargon, no fluff',
              'Vendor recommendations with setup costs',
              'Optional: we implement it for you',
            ].map((t, i) => (
              <li key={i} className="hc-item">
                <span className="hc-tick"><Icon.Check /></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="hc-divider" />
          <div className="hc-note">
            Most clients recover the audit fee within the first month of implementation. We'll show you the maths before you commit.
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── PROOF STRIP ────────────────────────────────────────────── */
function ProofStrip() {
  const items = [
    { val: '15+', accent: false, lbl: 'hours saved per week, on average' },
    { val: '2', accent: false, lbl: 'weeks from intake to final report' },
    { val: '£2,500', accent: true, lbl: 'fixed fee — no scope creep' },
    { val: '3–5', accent: false, lbl: 'automation wins identified per audit' },
  ]
  return (
    <div className="proof-strip">
      <div className="proof-strip-inner">
        {items.map((it, i) => (
          <div key={i} className="proof-item">
            <div className="proof-val">
              {it.accent ? <span className="accent">{it.val}</span> : it.val}
            </div>
            <div className="proof-lbl">{it.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── PROBLEM ────────────────────────────────────────────────── */
function Problem() {
  const cards = [
    {
      title: 'Your staff are doing the same things, over and over',
      body: 'Copying data between systems. Chasing the same documents. Compiling the same weekly reports. None of it requires human judgement — it just requires a human to be there.',
    },
    {
      title: 'You know it\'s a problem. Nobody\'s had time to fix it.',
      body: 'It\'s not that you haven\'t thought about it. It\'s that the people who would solve it are the same ones too busy doing the work. That\'s the trap.',
    },
    {
      title: 'AI tools are everywhere. The right ones for you aren\'t obvious.',
      body: 'ChatGPT, Zapier, Make, n8n, custom code — the options are endless and the sales pitches are identical. Picking wrong costs more time than doing nothing.',
    },
    {
      title: 'You don\'t need another tool. You need a diagnosis.',
      body: 'Before you spend a pound on software, you need to know which processes to fix first, in what order, and what each one is actually costing you. That\'s what we do.',
    },
    {
      title: 'Implementation risk is real — and often underestimated',
      body: 'Bad automation is worse than no automation. Broken workflows, lost data, staff who don\'t trust the system. We plan around the failure modes before we build anything.',
    },
    {
      title: 'The ROI should be calculable before you commit',
      body: 'Every recommendation we make comes with a time-saving estimate and a payback period. If it doesn\'t stack up, we\'ll tell you — and we won\'t build it.',
    },
  ]

  const icons = [
    <Icon.Clock />, <Icon.Zap />, <Icon.BarChart />,
    <Icon.Map />, <Icon.Shield />, <Icon.FileText />,
  ]

  return (
    <section className="section problem-section">
      <div className="container">
        <div className="sh">
          <div className="label"><span className="label-dot" />The Problem</div>
          <h2 className="section-title">Manual work is the most expensive line<br/>item you're not tracking.</h2>
          <p className="section-sub">Most business owners can point to where the pain is. Almost none have quantified it.</p>
        </div>
        <div className="problem-grid">
          {cards.map((c, i) => (
            <div key={i} className="prob-card">
              <div className="prob-icon">{icons[i]}</div>
              <div className="prob-title">{c.title}</div>
              <div className="prob-body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── AUDIT OFFER ────────────────────────────────────────────── */
function AuditOffer() {
  return (
    <section className="section offer-section" id="offer">
      <div className="container">
        <div className="offer-grid">
          <div>
            <div className="label"><span className="label-dot" />The Service</div>
            <h2 className="section-title">The AI Workflow Audit</h2>
            <p className="section-sub">
              A structured, two-week engagement. We go into your business, map what's actually happening, and come back with a prioritised plan — costed, sequenced, and ready to act on.
            </p>
            <div className="offer-deliverables">
              {[
                {
                  title: 'Process Map',
                  body: 'A clear diagram of your 10–15 highest-cost manual processes, showing where time is lost and where handoffs break down.',
                },
                {
                  title: 'Automation Shortlist',
                  body: '3–5 specific opportunities ranked by time saved, cost to implement, and implementation risk. Not every idea — the right ones.',
                },
                {
                  title: 'ROI Estimate',
                  body: 'For each opportunity: hours saved per week, annualised cost saving, estimated payback period. Built from your actual numbers, not industry averages.',
                },
                {
                  title: 'Tool Recommendations',
                  body: 'Specific software or custom build options for each opportunity, with setup costs, ongoing costs, and honest trade-offs.',
                },
                {
                  title: 'Plain-English Report',
                  body: 'A written report you can share with your team, your accountant, or your board — with zero technical jargon.',
                },
              ].map((d, i) => (
                <div key={i} className="od-item">
                  <div className="od-icon">{[<Icon.Map />, <Icon.Zap />, <Icon.BarChart />, <Icon.Shield />, <Icon.FileText />][i]}</div>
                  <div>
                    <div className="od-title">{d.title}</div>
                    <div className="od-body">{d.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="offer-right">
            <div className="offer-price-block">
              <div className="opb-price">£2,500</div>
              <div className="opb-label">Fixed fee. No hourly billing. No scope creep.</div>
              <ul className="opb-items">
                {[
                  'Kick-off call within 5 working days',
                  'Two structured discovery sessions with your team',
                  'Draft report shared for comment',
                  'Final report and debrief call',
                  'Follow-on questions answered for 30 days',
                ].map((t, i) => (
                  <li key={i} className="opb-item">
                    <span className="opb-tick"><Icon.Check /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="offer-next">
              <div className="offer-next-title">What happens after the audit?</div>
              <div className="offer-next-body">
                Nothing, if you want. The report is yours — take it to any developer or agency. Most clients choose to work with us on implementation, which we run as a monthly retainer starting from £2,500/month. There's no obligation and no hard sell.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── INDUSTRIES ─────────────────────────────────────────────── */
function Industries() {
  const inds = [
    {
      icon: '📋',
      title: 'Recruitment Agencies',
      body: 'High-volume, deadline-driven, and drowning in admin. The gap between a great candidate experience and a mediocre one is almost always a process gap.',
      examples: [
        'CV screening and candidate shortlisting',
        'Data entry between ATS and CRM systems',
        'Compliance document collection and chasing',
        'Client update emails and interview scheduling',
        'Timesheet processing and payroll exports',
      ],
    },
    {
      icon: '🧾',
      title: 'Accountants & Bookkeepers',
      body: 'The work is precise, deadline-sensitive, and highly repetitive. Most firms are leaving significant capacity on the table in their practice management workflows.',
      examples: [
        'Invoice chasing and payment reconciliation',
        'Client onboarding document collection',
        'Report compilation from multiple data sources',
        'VAT return data pulling and formatting',
        'Engagement letter generation and tracking',
      ],
    },
    {
      icon: '🏠',
      title: 'Estate Agents & Property Managers',
      body: 'A high volume of similar transactions, lots of document management, and communication chains that fall through the cracks. Automation impact here is fast and visible.',
      examples: [
        'Tenancy renewal tracking and notice generation',
        'Maintenance request logging and contractor routing',
        'Landlord statement and reporting packs',
        'Applicant follow-up and viewing confirmation',
        'Right-to-rent document verification workflows',
      ],
    },
  ]

  return (
    <section className="section industries-section" id="industries">
      <div className="container">
        <div className="sh c">
          <div className="label"><span className="label-dot" />Who We Work With</div>
          <h2 className="section-title">We focus on three industries.</h2>
          <p className="section-sub">
            Not because the problems are unique to them — but because we know them well enough to find the right answers fast.
          </p>
        </div>
        <div className="ind-grid">
          {inds.map((ind, i) => (
            <div key={i} className="ind-card">
              <span className="ind-icon">{ind.icon}</span>
              <div className="ind-title">{ind.title}</div>
              <div className="ind-body">{ind.body}</div>
              <ul className="ind-examples">
                {ind.examples.map((ex, j) => (
                  <li key={j} className="ind-example">
                    <span className="ind-bullet">→</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── HOW IT WORKS ───────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'You fill in a short intake form',
      text: 'Name, company, and a brief description of the process you find most painful. Takes two minutes. We review every submission personally.',
    },
    {
      num: '02',
      title: 'We confirm fit and book a kick-off call',
      text: 'If we think we can help, we\'ll confirm the engagement and schedule the kick-off within 5 working days. If we don\'t think the audit will pay for itself, we\'ll tell you before you spend anything.',
    },
    {
      num: '03',
      title: 'Two discovery sessions with your team',
      text: 'We run structured interviews with the people doing the work. Not a survey — a real conversation about what they do, how long it takes, and where it breaks.',
    },
    {
      num: '04',
      title: 'We map, analyse, and build the report',
      text: 'We process everything we\'ve learned, identify the highest-ROI opportunities, and write up the full report with our recommendations and the maths behind each one.',
    },
    {
      num: '05',
      title: 'Draft review, then final debrief',
      text: 'You see the draft first. We incorporate your feedback. Then we run a final call to walk through the report and answer every question your team has.',
    },
    {
      num: '06',
      title: 'You decide what to do next',
      text: 'Implement it yourself, take it to another supplier, or engage us for the build. The report is yours. There\'s no pressure and no follow-up sales process.',
    },
  ]

  return (
    <section className="section hiw-section" id="how">
      <div className="container">
        <div className="hiw-grid">
          <div>
            <div className="label"><span className="label-dot" />How It Works</div>
            <h2 className="section-title">Six steps. Two weeks. One clear answer.</h2>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              The process is designed to be low-effort for you and high-signal for us. We do the heavy lifting. You answer questions honestly.
            </p>
          </div>
          <div className="hiw-steps">
            {steps.map((s, i) => (
              <div key={i} className="hiw-step">
                <div className="hiw-num">{s.num}</div>
                <div>
                  <div className="hiw-step-title">{s.title}</div>
                  <div className="hiw-step-text">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── OBJECTIONS ─────────────────────────────────────────────── */
function Objections() {
  const objs = [
    {
      q: '"Can\'t I just use ChatGPT for this?"',
      a: 'ChatGPT is a tool, not a strategy. It\'s excellent at certain tasks and useless at others. The question isn\'t whether to use AI — it\'s which processes are worth automating, in what order, and with which tools. That\'s the work the audit does.',
    },
    {
      q: '"We already have a member of staff who handles this."',
      a: 'That\'s the most common situation we find. The staff member exists because the process exists — not because a human is the best person for the job. The audit shows you whether that\'s true for your specific workflows.',
    },
    {
      q: '"We\'ve tried automation before and it didn\'t work."',
      a: 'Usually because it was picked based on a sales demo rather than a proper diagnosis. The tool was fine. The process it was applied to wasn\'t suitable, or wasn\'t ready. That\'s exactly what we\'re designed to prevent.',
    },
    {
      q: '"Is this just Zapier and some prompts?"',
      a: 'Sometimes, yes — and that\'s a good thing, not a bad one. If the right answer is a £50/month Zapier workflow, we\'ll tell you. We have no financial interest in recommending expensive custom builds.',
    },
    {
      q: '"What if the audit doesn\'t find anything useful?"',
      a: 'It hasn\'t happened yet. But if we genuinely cannot identify opportunities that cover the audit fee in time savings within a year, we\'ll refund it. We\'ll tell you this before you book.',
    },
    {
      q: '"We\'re too small / too niche / too busy for this."',
      a: 'The busy part is exactly why you need it. Most of the businesses we work with have 5–30 staff. The smaller you are, the more each wasted hour costs — because it\'s usually a senior person doing the work.',
    },
  ]

  return (
    <section className="section obj-section">
      <div className="container">
        <div className="sh c">
          <div className="label"><span className="label-dot" />Common Questions</div>
          <h2 className="section-title">Things people ask before they book.</h2>
        </div>
        <div className="obj-grid">
          {objs.map((o, i) => (
            <div key={i} className="obj-card">
              <div className="obj-q">{o.q}</div>
              <div className="obj-a">{o.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null)
  const items = [
    {
      q: 'Do I need to know anything about AI or technology?',
      a: 'No. The audit is designed for business owners and managers, not technical staff. We translate everything into plain language and explain our reasoning at every step. You don\'t need to understand how the automation works — just whether it\'s worth doing.',
    },
    {
      q: 'How disruptive is the process for my team?',
      a: 'Minimal. The two discovery sessions typically take 90 minutes each. We schedule them around your team\'s workload and prepare structured questions in advance so there\'s no wasted time. Most teams find the sessions useful even before the report arrives.',
    },
    {
      q: 'What industries do you work with outside your three focus areas?',
      a: 'We do take on work outside recruitment, accountancy, and property — particularly in professional services more broadly. If you\'re unsure, fill in the intake form and describe your situation. We\'ll tell you honestly whether we can add value.',
    },
    {
      q: 'How long does implementation take after the audit?',
      a: 'It depends on what we find. Simple workflow automations (Zapier, Make) can be live within a week. More complex integrations or custom builds take 4–10 weeks. The report will give you realistic timelines for each opportunity.',
    },
    {
      q: 'Do you sign NDAs?',
      a: 'Yes. We sign a mutual NDA before the first discovery session. Everything your team shares with us is treated as confidential and used only for the purposes of the audit.',
    },
    {
      q: 'What happens to the report if we don\'t proceed with implementation?',
      a: 'It\'s yours, unconditionally. We don\'t retain any rights to it, and we don\'t share findings with third parties. You\'re free to take the recommendations to any developer or agency you choose.',
    },
  ]

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="sh c">
          <div className="label"><span className="label-dot" />FAQ</div>
          <h2 className="section-title">More questions, answered.</h2>
        </div>
        <div className="faq-wrap">
          {items.map((it, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                <span className="faq-q">{it.q}</span>
                <span className="faq-chev"><Icon.ChevronDown /></span>
              </button>
              {open === i && <div className="faq-a">{it.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── INTAKE FORM ────────────────────────────────────────────── */
function IntakeForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Audit enquiry — ${form.company}`,
          message: `Company: ${form.company}\n\n${form.message}`,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="intake-section" id="intake">
      <div className="intake-inner">
        <div>
          <h2 className="intake-title">Ready to find out what you're missing?</h2>
          <p className="intake-sub">
            Fill in the form and tell us about the process that costs you the most time. We review every submission personally and respond within one working day.
          </p>
          <div className="intake-trust">
            {[
              [<Icon.Clock />, 'Response within one working day'],
              [<Icon.Shield />, 'NDA signed before any discovery session'],
              [<Icon.Check />, 'No obligation until you confirm the engagement'],
            ].map(([icon, label], i) => (
              <div key={i} className="it-item">
                <span className="it-icon">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="iform">
          {status === 'success' ? (
            <div className="form-success">
              <div className="form-success-icon"><Icon.CheckCircle /></div>
              <div className="form-success-title">We'll be in touch shortly.</div>
              <div className="form-success-sub">
                We've received your enquiry and will respond within one working day. In the meantime, if you have anything to add, email us at <strong>hello@cornerstoneaigroup.com</strong>.
              </div>
            </div>
          ) : (
            <>
              <div className="iform-title">Apply for an Audit</div>
              <div className="iform-sub">Takes 2 minutes. No commitment required.</div>
              <form onSubmit={submit}>
                <div className="fg">
                  <label className="fl">Your name</label>
                  <input className="fi" type="text" required placeholder="Jane Smith" value={form.name} onChange={set('name')} />
                </div>
                <div className="fg">
                  <label className="fl">Work email</label>
                  <input className="fi" type="email" required placeholder="jane@yourfirm.co.uk" value={form.email} onChange={set('email')} />
                </div>
                <div className="fg">
                  <label className="fl">Company name</label>
                  <input className="fi" type="text" required placeholder="Smith & Co Recruitment" value={form.company} onChange={set('company')} />
                </div>
                <div className="fg">
                  <label className="fl">What's your biggest time-wasting process?</label>
                  <textarea className="ft" required placeholder="e.g. Every Monday morning we manually pull data from three different systems to build a client report. It takes two people about 3 hours each..." value={form.message} onChange={set('message')} />
                </div>
                {status === 'error' && (
                  <div style={{ fontSize: 13, color: 'var(--red)', marginBottom: 12 }}>
                    Something went wrong. Please email us directly at hello@cornerstoneaigroup.com.
                  </div>
                )}
                <button type="submit" className="btn btn-blue btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── STICKY BAR ─────────────────────────────────────────────── */
function StickyBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  if (!show) return null
  return (
    <div className="sticky-bar">
      <div className="sticky-bar-text">
        <div className="sticky-bar-title">The AI Workflow Audit — £2,500 fixed fee</div>
        <div className="sticky-bar-sub">Find out exactly what to automate, and what it's worth.</div>
      </div>
      <a href="#intake" className="btn btn-blue btn-md">Apply now</a>
    </div>
  )
}

/* ── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="/" className="footer-wordmark">Cornerstone<span>AI</span> Group</a>
            <div className="footer-tagline">
              AI workflow consulting for recruitment agencies, accountants, and property managers. We find the automation that pays for itself.
            </div>
          </div>
          <div>
            <div className="footer-col-h">Services</div>
            <ul className="footer-links">
              <li><a href="#offer">AI Workflow Audit</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#intake">Apply for an Audit</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-h">Company</div>
            <ul className="footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="mailto:hello@cornerstoneaigroup.com">hello@cornerstoneaigroup.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Cornerstone AI Group Ltd. All rights reserved.</div>
          <div className="footer-bl">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── HOME PAGE ──────────────────────────────────────────────── */
function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Problem />
      <AuditOffer />
      <Industries />
      <HowItWorks />
      <Objections />
      <FAQ />
      <IntakeForm />
      <Footer />
    </>
  )
}

/* ── APP ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <StickyBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  )
}
