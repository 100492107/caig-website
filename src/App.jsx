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
            We spend two weeks inside your business, find the admin that's quietly eating your payroll, and hand you a costed plan to fix it. No jargon. No sales pitch. Just the answer.
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
              £2,500 fixed. Nothing else.
            </span>
            <span className="hero-trust-item">
              <span className="hero-trust-icon"><Icon.Check /></span>
              Done in 2 weeks
            </span>
            <span className="hero-trust-item">
              <span className="hero-trust-icon"><Icon.Check /></span>
              No tech knowledge required
            </span>
          </div>
        </div>

        <div className="hero-card">
          <div className="hc-label">The AI Workflow Audit</div>
          <div className="hc-title">Stop guessing which parts of your business to automate.</div>
          <div className="hc-price">£2,500</div>
          <div className="hc-price-note">Fixed fee. Delivered in 2 weeks.</div>
          <ul className="hc-items">
            {[
              'A map of where your time is actually going',
              '3–5 specific automations, ranked by payback period',
              'The maths — hours saved, cost to build, time to break even',
              'Exact tools to use and what each one costs to run',
              'A report your whole team can understand and act on',
            ].map((t, i) => (
              <li key={i} className="hc-item">
                <span className="hc-tick"><Icon.Check /></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="hc-divider" />
          <div className="hc-note">
            Most clients earn the fee back within the first month of implementation. We show you the maths before you spend a penny.
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── PROOF STRIP ────────────────────────────────────────────── */
function ProofStrip() {
  const items = [
    { val: '15+', accent: false, lbl: 'hours handed back per week, on average' },
    { val: '2', accent: false, lbl: 'weeks start to finish, every time' },
    { val: '£2,500', accent: true, lbl: 'flat fee — the number never changes' },
    { val: '3–5', accent: false, lbl: 'concrete fixes found in every audit' },
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
      title: 'Someone on your team does the same thing every single week',
      body: 'Pulling the same report. Copying data from one system into another. Chasing the same email thread. It keeps happening because nobody\'s ever sat down and asked whether it needs to happen at all.',
    },
    {
      title: 'You know it\'s a problem. It\'s just never urgent enough to fix.',
      body: 'The people who would solve it are the same ones too busy doing the work. So it stays on the list. Month after month. Meanwhile the hours keep disappearing.',
    },
    {
      title: 'The AI tool market is a mess and everyone\'s selling something',
      body: 'ChatGPT, Zapier, Make, n8n, custom-built — the options are endless and the pitches are identical. Picking the wrong one doesn\'t just waste money. It wastes the six months you spend finding out it doesn\'t work.',
    },
    {
      title: 'You don\'t have an AI problem. You have a diagnosis problem.',
      body: 'Before you buy anything, you need to know which processes are actually worth fixing, which order to tackle them in, and what each one is costing you right now. That\'s the part nobody sells you.',
    },
    {
      title: 'Bad automation is worse than no automation',
      body: 'A broken workflow that staff don\'t trust is harder to unpick than the manual process it replaced. We think through the failure modes before anything gets built — not after.',
    },
    {
      title: 'You should know the payback period before you spend anything',
      body: 'Every recommendation we make comes with a time-saving estimate and a break-even date. If it doesn\'t stack up on paper, we won\'t recommend it. Simple as that.',
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
          <p className="section-sub">Most owners can point to where the pain is. Almost none have put a number on it.</p>
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

/* ── COST OF INACTION ───────────────────────────────────────── */
function CostOfInaction() {
  return (
    <section className="coi-section">
      <div className="container">
        <div className="coi-inner">
          <div className="coi-left">
            <div className="label" style={{ color: 'var(--red)' }}>
              <span className="label-dot" style={{ background: 'var(--red)' }} />
              The Maths of Doing Nothing
            </div>
            <h2 className="section-title" style={{ maxWidth: 480 }}>
              Waiting isn't free.<br/>It has a monthly invoice.
            </h2>
            <p className="section-sub">
              Most owners think of the audit as a £2,500 spend. The better question is: what is the current situation costing you, right now, every month you leave it alone?
            </p>
          </div>
          <div className="coi-right">
            <div className="coi-calc">
              <div className="coi-calc-row">
                <div className="coi-calc-label">3 staff × 5 hrs/week on manual admin</div>
                <div className="coi-calc-val">60 hrs/month</div>
              </div>
              <div className="coi-calc-row">
                <div className="coi-calc-label">At £25/hr fully-loaded staff cost</div>
                <div className="coi-calc-val">£1,500/month</div>
              </div>
              <div className="coi-calc-divider" />
              <div className="coi-calc-row coi-calc-total">
                <div className="coi-calc-label">Annual cost of leaving it as-is</div>
                <div className="coi-calc-val coi-calc-red">£18,000/yr</div>
              </div>
              <div className="coi-calc-note">
                That's a conservative example with modest numbers. The £2,500 audit fee isn't a cost — it's the thing that stops you spending £18,000 on a problem that doesn't need to exist.
              </div>
            </div>
          </div>
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
              Two weeks. We go into the business, talk to the people doing the work, and come back with a written report that tells you exactly what to automate, in what order, and what it'll cost.
            </p>
            <div className="offer-deliverables">
              {[
                {
                  title: 'Process Map',
                  body: 'A clear picture of your 10–15 most time-intensive manual processes — where time is lost, where handoffs break, and where the same mistakes keep happening.',
                },
                {
                  title: 'Automation Shortlist',
                  body: '3–5 specific fixes ranked by how quickly they pay for themselves. Not a list of everything that\'s technically possible — the ones that actually make sense for your business.',
                },
                {
                  title: 'The Maths',
                  body: 'For each recommendation: hours saved per week, what that\'s worth annually, what it costs to build, and when you break even. Figures based on your numbers, not industry benchmarks.',
                },
                {
                  title: 'Tool Recommendations',
                  body: 'The exact software or build approach for each fix — with setup costs, monthly running costs, and honest trade-offs between the options.',
                },
                {
                  title: 'The Report',
                  body: 'A written document your team, your accountant, or your board can read and understand. No acronyms, no technical assumptions. Just the findings and the plan.',
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
              <div className="opb-label">One price. No hourly billing. No surprises.</div>
              <ul className="opb-items">
                {[
                  'Kick-off call booked within 5 working days',
                  'Two working sessions with your team',
                  'Draft report for your review before we finalise',
                  'Final report and a call to walk through it together',
                  'Any follow-up questions answered for 30 days',
                ].map((t, i) => (
                  <li key={i} className="opb-item">
                    <span className="opb-tick"><Icon.Check /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="offer-next">
              <div className="offer-next-title">What comes after?</div>
              <div className="offer-next-body">
                Nothing you don't choose. The report is yours — take it to any developer or agency you like. Most clients ask us to handle the build, which we do on a monthly retainer from £2,500. There's no pitch at the end and no pressure to continue.
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
      body: 'Consultants should be on the phone, not reformatting CVs. Most agencies we talk to have 10–20 hours a week quietly vanishing into admin that nobody\'s ever questioned.',
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
      body: 'The work is deadline-driven and unforgiving of errors. It\'s also deeply repetitive — which makes it one of the highest-ROI sectors for workflow automation, if you pick the right things to fix.',
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
      body: 'High transaction volumes, lots of document handling, communication threads that go cold. The problems here are unglamorous, visible, and fixable faster than most people expect.',
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
            Not because the problems are unique to them — but because we know them well enough to find the answers quickly.
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

        <div className="case-study">
          <div className="cs-tag">A typical example from our audit process — Recruitment</div>
          <div className="cs-grid">
            <div>
              <div className="cs-eyebrow">The CV Black Hole</div>
              <h3 className="cs-title">25 hours a week lost to copy-pasting.</h3>
              <div className="cs-body">
                A 12-person recruitment firm was manually downloading CVs from job boards, reading them, reformatting them into the agency's branded template, and uploading them to their ATS. 15 minutes per candidate. At 100 candidates a week, that's 25 hours of consultant time spent on copy-pasting instead of making placements.
              </div>
            </div>
            <div className="cs-right">
              <div className="cs-block cs-block-fix">
                <div className="cs-block-label">The Fix</div>
                <div className="cs-block-text">A workflow using Make.com and an AI document parser. When a candidate applies, the AI reads the PDF, extracts the structured data, populates the branded template, and creates the ATS record — automatically, without a human touching it.</div>
              </div>
              <div className="cs-block cs-block-roi">
                <div className="cs-block-label">The ROI</div>
                <div className="cs-block-text">£1,200 one-off build cost. 25 hours a week handed back to the consultants to get on the phone and close placements. Payback period: under 3 weeks.</div>
              </div>
            </div>
          </div>
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
      title: 'Tell us what\'s broken',
      text: 'Fill in the form below. Describe the process that costs you the most time. Takes two minutes. We read every submission ourselves.',
    },
    {
      num: '02',
      title: 'We tell you whether we can help',
      text: 'If the audit makes sense for your situation, we confirm and get a kick-off call in the diary within 5 working days. If we don\'t think it\'ll pay for itself, we\'ll say so before you spend anything.',
    },
    {
      num: '03',
      title: 'We talk to the people doing the work',
      text: 'Two sessions with your team — not a survey, an actual conversation. What do they do, how long does it take, where does it go wrong. We come prepared so your team\'s time isn\'t wasted.',
    },
    {
      num: '04',
      title: 'We build the report',
      text: 'We take everything we\'ve learned, identify the highest-payback fixes, and write it up. Every recommendation includes the maths — what it costs, what it saves, when it breaks even.',
    },
    {
      num: '05',
      title: 'You see the draft before we finalise',
      text: 'We share the draft for your comments. Then we incorporate your feedback, finalise the report, and walk through it together on a call.',
    },
    {
      num: '06',
      title: 'You do whatever you want with it',
      text: 'Build it yourself, hand it to another supplier, or ask us to implement. The report is yours. We don\'t follow up with a pitch.',
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
              We do the heavy lifting. You show up to two sessions and answer questions honestly. That's about it.
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
      a: 'ChatGPT is a tool, not a plan. The question isn\'t whether to use AI — it\'s which of your processes are worth automating, in what order, and with what. That\'s the actual work. The audit does it so you don\'t have to figure it out by trial and error.',
    },
    {
      q: '"We already have someone who handles this."',
      a: 'That\'s the most common thing we hear. That person exists because the process exists — not because a human is necessarily the right way to run it. The audit tells you which parts of their job shouldn\'t be their job.',
    },
    {
      q: '"We\'ve tried automation before and it didn\'t stick."',
      a: 'Usually because the tool was chosen before the problem was properly understood. The software wasn\'t wrong — it was applied to the wrong process, or the process wasn\'t ready for it. That\'s the thing the audit is designed to prevent.',
    },
    {
      q: '"Is this just Zapier and some ChatGPT prompts?"',
      a: 'Sometimes, honestly, yes. And when that\'s the right answer, we\'ll tell you — because a £50/month Zapier workflow that works is better than a £10,000 custom build that does the same thing. We don\'t have any reason to oversell.',
    },
    {
      q: '"What if you don\'t find anything worth fixing?"',
      a: 'It hasn\'t happened. But if we genuinely can\'t identify opportunities that pay back the audit fee within a year, we\'ll refund it. We\'ll say this explicitly before you commit.',
    },
    {
      q: '"We\'re too small / too busy / too niche for this."',
      a: 'The businesses we work with typically have between 5 and 30 people. The smaller you are, the more each wasted hour costs — because it\'s usually someone senior doing the work. Busy is exactly the reason to look at this, not a reason to wait.',
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
      a: 'No. We write everything in plain language and explain every recommendation as if you\'ve never thought about automation before. You don\'t need to know how any of it works — just whether it\'s worth doing.',
    },
    {
      q: 'How much of my team\'s time does this take up?',
      a: 'Two sessions of about 90 minutes each. We come prepared with specific questions, so there\'s no rambling and no wasted time. Most teams tell us they found the sessions useful in themselves — just putting words to the problems they\'ve been sitting with.',
    },
    {
      q: 'Do you work with businesses outside those three industries?',
      a: 'Yes, occasionally — particularly in professional services. If you\'re not sure whether we\'re a fit, fill in the form and describe your situation. We\'ll give you an honest answer rather than a sales pitch.',
    },
    {
      q: 'How long does implementation take once we have the report?',
      a: 'Depends entirely on what we find. A Zapier workflow can be live in a week. A more complex integration typically takes four to ten weeks. The report will give you realistic timelines for each specific fix.',
    },
    {
      q: 'Do you sign NDAs?',
      a: 'Yes. A mutual NDA is signed before the first session. Everything your team tells us is confidential and used only for the audit.',
    },
    {
      q: 'If we don\'t use you for implementation, do we still keep the report?',
      a: 'Completely. It\'s yours. No strings, no licensing, no "you can only act on this with us." Take it to whoever you want.',
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
  const [form, setForm] = useState({ name: '', email: '', company: '', process: '', hours: '', alternative: '' })
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
          message: `Company: ${form.company}\n\nBiggest time-wasting process:\n${form.process}\n\nHours wasted per week: ${form.hours}\n\nWhat the team would do instead:\n${form.alternative}`,
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
          <h2 className="intake-title">Tell us what's costing you the most time.</h2>
          <p className="intake-sub">
            Three questions. Two minutes. We read every submission personally and come back to you within one working day.
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
              <div className="form-success-title">Got it. We'll be in touch.</div>
              <div className="form-success-sub">
                We read every submission ourselves and respond within one working day. If you want to move faster, book a 30-minute call now and we'll work out whether the audit makes sense for you.
              </div>
              <a
                href="https://calendly.com/hello-cornerstoneaigroup/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-blue btn-lg"
                style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
              >
                Book a 30-minute call <Icon.ArrowRight />
              </a>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--t3)', textAlign: 'center' }}>
                No rush — we'll email you either way.
              </div>
            </div>
          ) : (
            <>
              <div className="iform-title">Apply for an Audit</div>
              <div className="iform-sub">3 quick questions. No commitment required.</div>
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
                  <label className="fl">Which process makes you want to pull your hair out?</label>
                  <textarea className="ft" required placeholder="e.g. Every Monday we manually pull data from three systems to build a client report. Two people. Three hours each. Every single week." value={form.process} onChange={set('process')} />
                </div>
                <div className="fg">
                  <label className="fl">Roughly how many hours a week does your team lose to this?</label>
                  <select className="fi" required value={form.hours} onChange={set('hours')}>
                    <option value="" disabled>Select a range…</option>
                    <option value="5–10 hours">5–10 hours</option>
                    <option value="10–20 hours">10–20 hours</option>
                    <option value="20+ hours">20+ hours</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="fl">What would your team be doing with that time instead?</label>
                  <input className="fi" type="text" required placeholder="e.g. Calling candidates, closing deals, onboarding new clients…" value={form.alternative} onChange={set('alternative')} />
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
        <div className="sticky-bar-title">AI Workflow Audit — £2,500 flat fee</div>
        <div className="sticky-bar-sub">Two weeks. A report that tells you exactly what to fix and what it's worth.</div>
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
              We go into recruitment agencies, accountants, and property businesses, find the admin that's eating their payroll, and show them exactly what to do about it.
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
      <CostOfInaction />
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
