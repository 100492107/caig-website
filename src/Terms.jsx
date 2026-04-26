import { Logo } from './Logo'

const COMPANY = 'Cornerstone AI Group'
const EMAIL = 'hello@cornerstoneaigroup.com'
const LAST_UPDATED = '25 April 2026'

export default function Terms() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="container">
          <a href="/" className="legal-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to site
          </a>
          <Logo size={22} sub="AI Engineering Studio" />
        </div>
      </header>

      <main className="legal-main">
        <div className="legal-inner">
          <div className="legal-meta">
            <div className="badge"><span className="badge-dot" />Legal</div>
            <h1 className="legal-title">Terms of Service</h1>
            <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="legal-body">
            <Section title="1. Definitions">
              <p>In these Terms:</p>
              <ul>
                <li><strong>"We / Us / Company"</strong> — {COMPANY}, an AI engineering studio based in Derby, England, UK.</li>
                <li><strong>"Client / You"</strong> — the individual or legal entity engaging our services.</li>
                <li><strong>"Services"</strong> — AI engineering consultancy, custom software builds, workflow automation, AI audits, monthly retainers, and associated deliverables.</li>
                <li><strong>"Deliverables"</strong> — all code, documentation, designs, and outputs produced during an engagement.</li>
                <li><strong>"Platform"</strong> — any client-facing application or dashboard we build and host on your behalf.</li>
                <li><strong>"Proposal"</strong> — the written scope of work, timeline, and fee agreed before an engagement begins.</li>
              </ul>
            </Section>

            <Section title="2. Acceptance">
              <p>
                By engaging our services — whether by signing a proposal, making a payment, or providing written instruction
                to proceed — you agree to be bound by these Terms. If you are entering these Terms on behalf of a company or
                organisation, you represent that you have authority to bind that entity.
              </p>
              <p>
                These Terms apply to all engagements unless superseded by a separately executed written agreement signed
                by both parties.
              </p>
            </Section>

            <Section title="3. Services and Proposals">
              <SubHeading>3.1 Scope of Work</SubHeading>
              <p>
                All engagements begin with a written Proposal setting out the deliverables, timeline, technology stack, and
                fees. The Proposal forms part of these Terms once accepted by the Client.
              </p>
              <SubHeading>3.2 Changes to Scope</SubHeading>
              <p>
                Any request to materially change the scope of work after the Proposal is accepted must be agreed in writing.
                Additional scope may affect the timeline and fees. We will provide a written change order before proceeding
                with out-of-scope work.
              </p>
              <SubHeading>3.3 Client Responsibilities</SubHeading>
              <p>The Client agrees to:</p>
              <ul>
                <li>Provide timely feedback and approvals at agreed review points.</li>
                <li>Supply any content, credentials, or access required to complete the work.</li>
                <li>Designate a primary point of contact with authority to make decisions.</li>
                <li>Ensure that any third-party tools, accounts, or APIs they provide access to are lawfully licensed.</li>
              </ul>
              <p>
                Delays caused by the Client's failure to meet these responsibilities do not affect our right to payment
                on the agreed schedule.
              </p>
            </Section>

            <Section title="4. Fees and Payment">
              <SubHeading>4.1 Payment Schedule</SubHeading>
              <p>
                Unless otherwise stated in the Proposal:
              </p>
              <ul>
                <li><strong>Project engagements:</strong> 50% due on commencement, 50% due on delivery.</li>
                <li><strong>Monthly retainers:</strong> Invoiced monthly in advance, due within 14 days of invoice.</li>
                <li><strong>AI Audits:</strong> 100% due prior to commencement.</li>
              </ul>
              <SubHeading>4.2 Late Payment</SubHeading>
              <p>
                Invoices unpaid beyond 14 days from the due date accrue interest at 8% per annum above the Bank of England
                base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998. We reserve the right
                to pause delivery of work until outstanding amounts are settled.
              </p>
              <SubHeading>4.3 VAT</SubHeading>
              <p>
                All fees quoted are exclusive of VAT unless stated otherwise. VAT will be added at the prevailing UK rate
                where applicable.
              </p>
              <SubHeading>4.4 Expenses</SubHeading>
              <p>
                Pre-agreed expenses (e.g., third-party API costs, software licences purchased on your behalf) will be
                invoiced at cost with supporting receipts.
              </p>
            </Section>

            <Section title="5. Intellectual Property">
              <SubHeading>5.1 Ownership of Deliverables</SubHeading>
              <p>
                Upon receipt of full payment for an engagement, all intellectual property rights in the Deliverables — including
                source code, documentation, and designs — transfer to the Client. The Client receives full ownership with no
                ongoing licence fee.
              </p>
              <SubHeading>5.2 Our Pre-existing IP</SubHeading>
              <p>
                We retain ownership of any tools, frameworks, libraries, or methodologies developed prior to or independent
                of the engagement ("<strong>Background IP</strong>"). Where Background IP is incorporated into Deliverables,
                we grant the Client a perpetual, royalty-free, non-exclusive licence to use it.
              </p>
              <SubHeading>5.3 Open Source</SubHeading>
              <p>
                Where Deliverables incorporate open-source components, those components remain subject to their respective
                licences. We will disclose any open-source dependencies.
              </p>
              <SubHeading>5.4 Portfolio Rights</SubHeading>
              <p>
                We reserve the right to reference the existence of our engagement with you in our portfolio and marketing
                materials, unless you request otherwise in writing. We will never disclose confidential or proprietary
                details of your tool without explicit written consent.
              </p>
            </Section>

            <Section title="6. Confidentiality">
              <p>
                Each party agrees to treat as confidential all non-public information received from the other party in
                connection with an engagement. This obligation survives termination of the engagement by 3 years.
              </p>
              <p>
                Confidential information does not include information that: (a) is or becomes publicly known through no
                breach by the receiving party; (b) was already known to the receiving party before disclosure; (c) is
                independently developed without use of the confidential information; or (d) must be disclosed by law or
                regulatory order.
              </p>
            </Section>

            <Section title="7. AI-Generated Outputs">
              <SubHeading>7.1 Nature of AI Outputs</SubHeading>
              <p>
                Our Services may involve AI language models (including Google Gemini, Anthropic Claude, and OpenAI models)
                to generate content, proposals, code, or other outputs. You acknowledge that:
              </p>
              <ul>
                <li>AI outputs are probabilistic and may contain inaccuracies, errors, or outdated information.</li>
                <li>AI-generated content should be reviewed by a qualified person before publication or reliance.</li>
                <li>We do not guarantee that AI outputs are factually accurate, legally compliant, or fit for any particular purpose without human review.</li>
              </ul>
              <SubHeading>7.2 Your Responsibility for AI Outputs</SubHeading>
              <p>
                Once Deliverables including AI-generated content are handed over to you, you are responsible for reviewing,
                approving, and any decisions made based on those outputs. We accept no liability for decisions made in
                reliance on un-reviewed AI outputs.
              </p>
              <SubHeading>7.3 Data Input into AI Models</SubHeading>
              <p>
                By using a Platform we build, you consent to the input data you provide being sent to the relevant AI model
                API for processing. We configure all integrations to use API terms that do not permit model training on your
                data. We recommend you do not input highly sensitive personal data (e.g., special category data under GDPR)
                into AI tools without a specific Data Processing Agreement.
              </p>
            </Section>

            <Section title="8. Warranties and Representations">
              <SubHeading>8.1 Our Warranties</SubHeading>
              <p>We warrant that:</p>
              <ul>
                <li>We have the right to enter into and perform these Terms.</li>
                <li>Services will be performed with reasonable skill and care.</li>
                <li>Deliverables will substantially conform to the agreed Proposal at the point of delivery.</li>
                <li>We hold appropriate professional indemnity insurance.</li>
              </ul>
              <SubHeading>8.2 Client Warranties</SubHeading>
              <p>The Client warrants that:</p>
              <ul>
                <li>They have the right to provide us any content, data, or access required to perform the Services.</li>
                <li>Use of the Deliverables will comply with all applicable laws and regulations.</li>
                <li>They will not use the Deliverables for unlawful, fraudulent, or harmful purposes.</li>
              </ul>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>
                To the fullest extent permitted by law:
              </p>
              <ul>
                <li>Our total aggregate liability to you in connection with any engagement shall not exceed the total fees paid by you in the 12 months preceding the claim.</li>
                <li>We exclude liability for indirect, consequential, or incidental losses, including loss of profit, loss of data, or loss of business opportunity, even if advised of the possibility of such loss.</li>
                <li>Nothing in these Terms excludes liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by English law.</li>
              </ul>
            </Section>

            <Section title="10. Termination">
              <SubHeading>10.1 Project Engagements</SubHeading>
              <p>
                Either party may terminate a project engagement by providing 14 days' written notice. On termination:
              </p>
              <ul>
                <li>All work completed to date will be invoiced and payable immediately.</li>
                <li>All work product created to the termination date transfers to the Client on full payment.</li>
                <li>The 50% commencement payment is non-refundable where work has commenced.</li>
              </ul>
              <SubHeading>10.2 Monthly Retainers</SubHeading>
              <p>
                Either party may terminate a monthly retainer with 30 days' written notice. No minimum term applies.
                Fees for the notice period are payable in full.
              </p>
              <SubHeading>10.3 Termination for Cause</SubHeading>
              <p>
                We may terminate immediately and with no refund obligation if the Client: (a) materially breaches these
                Terms and fails to remedy within 7 days of written notice; (b) becomes insolvent; (c) uses our Deliverables
                in a manner that is unlawful or causes harm to third parties.
              </p>
            </Section>

            <Section title="11. Governing Law and Disputes">
              <p>
                These Terms and any disputes arising from them are governed by the laws of England and Wales. Both parties
                submit to the exclusive jurisdiction of the courts of England and Wales.
              </p>
              <p>
                Before initiating formal proceedings, both parties agree to attempt to resolve any dispute through good-faith
                negotiation for a period of 30 days.
              </p>
            </Section>

            <Section title="12. General">
              <ul>
                <li><strong>Entire Agreement:</strong> These Terms, together with the relevant Proposal, constitute the entire agreement between the parties and supersede all prior representations.</li>
                <li><strong>Severability:</strong> If any provision is found unenforceable, the remainder of the Terms continue in full force.</li>
                <li><strong>No Waiver:</strong> Failure to enforce any right does not constitute a waiver of that right.</li>
                <li><strong>Assignment:</strong> You may not assign your rights or obligations without our written consent. We may assign to a successor entity with written notice.</li>
                <li><strong>Notices:</strong> All formal notices must be in writing and delivered by email to {EMAIL} or to your registered business address.</li>
                <li><strong>Amendments:</strong> We may update these Terms with 30 days' notice. Continued use of our Services after that period constitutes acceptance.</li>
              </ul>
            </Section>

            <Section title="13. Contact">
              <p>Questions about these Terms should be directed to:</p>
              <div className="legal-contact-block">
                <div><strong>{COMPANY}</strong></div>
                <div>Derby, England, United Kingdom</div>
                <div><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
              </div>
            </Section>
          </div>
        </div>
      </main>

      <footer className="legal-footer">
        <div className="container">
          <span>&copy; {new Date().getFullYear()} {COMPANY}. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="legal-section">
      <h2 className="legal-h2">{title}</h2>
      {children}
    </section>
  )
}

function SubHeading({ children }) {
  return <h3 className="legal-h3">{children}</h3>
}
