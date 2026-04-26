import { Logo } from './Logo'

const COMPANY = 'Cornerstone AI Group'
const EMAIL = 'hello@cornerstoneaigroup.com'
const DOMAIN = 'cornerstoneaigroup.com'
const LAST_UPDATED = '25 April 2026'

export default function Privacy() {
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
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="legal-body">
            <Section title="1. Who We Are">
              <p>
                {COMPANY} ("<strong>we</strong>", "<strong>our</strong>", "<strong>us</strong>") is an AI engineering studio
                based in Derby, England, United Kingdom. We design, build, and operate custom AI automation systems for
                businesses. Our registered contact address is available on request.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit{' '}
                <strong>{DOMAIN}</strong>, use our client-facing applications, or engage with us commercially.
              </p>
              <p>
                We are committed to complying with the UK General Data Protection Regulation (UK GDPR) and the Data
                Protection Act 2018.
              </p>
            </Section>

            <Section title="2. Data We Collect">
              <p>We collect personal data in the following ways:</p>
              <SubHeading>2.1 Data you provide directly</SubHeading>
              <ul>
                <li>Name, company name, and work email address — when you submit our contact form or book an audit call.</li>
                <li>Service interest and message content — the information you type into our enquiry form.</li>
                <li>Billing and payment information — processed entirely by our payment processor (Stripe); we do not store card details.</li>
                <li>Project-related data — documents, briefs, and materials you share with us during an engagement.</li>
              </ul>
              <SubHeading>2.2 Data collected automatically</SubHeading>
              <ul>
                <li>IP address, browser type, device type, and operating system.</li>
                <li>Pages visited, time on site, referral source.</li>
                <li>Cookies — see Section 7 for details.</li>
              </ul>
              <SubHeading>2.3 Data from our client applications</SubHeading>
              <p>
                If you access a client-facing tool we have built (such as an AI content or automation dashboard), we may
                process content you input into that tool (e.g., brief text, persona information, workflow parameters) solely
                for the purpose of generating the AI output you requested. This data is not retained beyond the session
                unless explicitly agreed.
              </p>
            </Section>

            <Section title="3. How We Use Your Data">
              <p>We use your personal data for the following purposes:</p>
              <table className="legal-table">
                <thead>
                  <tr><th>Purpose</th><th>Legal Basis</th></tr>
                </thead>
                <tbody>
                  <tr><td>Responding to your enquiry or booking your audit call</td><td>Legitimate interest / contract</td></tr>
                  <tr><td>Delivering project work and services you have commissioned</td><td>Contract performance</td></tr>
                  <tr><td>Sending project updates, invoices, and proposals</td><td>Contract performance</td></tr>
                  <tr><td>Improving our website and services</td><td>Legitimate interest</td></tr>
                  <tr><td>Compliance with legal obligations</td><td>Legal obligation</td></tr>
                  <tr><td>Sending service-related communications (not marketing)</td><td>Legitimate interest</td></tr>
                  <tr><td>Marketing communications (with your consent)</td><td>Consent</td></tr>
                </tbody>
              </table>
              <p>
                We do not sell, rent, or trade your personal data to third parties for their own marketing purposes under any
                circumstances.
              </p>
            </Section>

            <Section title="4. Data Retention">
              <p>We retain your personal data only for as long as necessary:</p>
              <ul>
                <li><strong>Enquiry / contact form data:</strong> 12 months from last contact, unless an engagement begins.</li>
                <li><strong>Client project data:</strong> 6 years from project completion, in line with UK accounting and contract law requirements.</li>
                <li><strong>Financial records:</strong> 7 years, as required by HMRC.</li>
                <li><strong>AI tool session data:</strong> Session duration only, unless explicitly retained by agreement.</li>
                <li><strong>Website analytics data:</strong> 26 months in aggregated, anonymised form.</li>
              </ul>
            </Section>

            <Section title="5. Who We Share Data With">
              <p>
                We only share your data with third-party services where strictly necessary to operate our business. All
                processors are contractually bound to protect your data. Current sub-processors include:
              </p>
              <ul>
                <li><strong>Netlify</strong> — website hosting and form submissions (US; covered by Standard Contractual Clauses)</li>
                <li><strong>Google (Gemini API)</strong> — AI content generation; input data is not used to train models per our API agreement</li>
                <li><strong>Anthropic (Claude API)</strong> — AI content generation where applicable</li>
                <li><strong>Stripe</strong> — payment processing</li>
                <li><strong>Notion / Google Workspace</strong> — internal project management</li>
              </ul>
              <p>
                We may disclose data to legal authorities where required by law, court order, or regulatory obligation.
              </p>
            </Section>

            <Section title="6. International Transfers">
              <p>
                Some of our sub-processors operate outside the UK and EEA. Where this occurs, we ensure appropriate
                safeguards are in place — including Standard Contractual Clauses (SCCs) or adequacy decisions — in
                compliance with UK GDPR Chapter V.
              </p>
            </Section>

            <Section title="7. Cookies">
              <p>
                We use a minimal set of cookies to operate our website:
              </p>
              <table className="legal-table">
                <thead>
                  <tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>caig_authed_v1</td><td>Authentication state for client applications</td><td>Session / localStorage</td></tr>
                  <tr><td>Analytics cookies</td><td>Aggregate website usage (anonymised)</td><td>26 months</td></tr>
                </tbody>
              </table>
              <p>
                We do not use advertising cookies, tracking pixels, or third-party retargeting cookies.
                You can clear cookies at any time via your browser settings.
              </p>
            </Section>

            <Section title="8. Your Rights">
              <p>Under UK GDPR, you have the following rights:</p>
              <ul>
                <li><strong>Right of access</strong> — request a copy of all personal data we hold about you.</li>
                <li><strong>Right to rectification</strong> — request correction of inaccurate data.</li>
                <li><strong>Right to erasure</strong> — request deletion of your data (subject to legal retention obligations).</li>
                <li><strong>Right to restrict processing</strong> — request we pause processing in certain circumstances.</li>
                <li><strong>Right to data portability</strong> — receive your data in a structured, machine-readable format.</li>
                <li><strong>Right to object</strong> — object to processing based on legitimate interest.</li>
                <li><strong>Right to withdraw consent</strong> — where processing is based on consent, withdraw it at any time.</li>
              </ul>
              <p>
                To exercise any right, email us at <strong>{EMAIL}</strong>. We will respond within 30 days. You also have
                the right to lodge a complaint with the Information Commissioner's Office (ICO) at{' '}
                <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>.
              </p>
            </Section>

            <Section title="9. Data Security">
              <p>
                We take appropriate technical and organisational measures to protect your personal data, including:
              </p>
              <ul>
                <li>HTTPS encryption across all services</li>
                <li>Environment-variable-based secret management (no credentials in code)</li>
                <li>Access controls limiting data access to personnel who need it</li>
                <li>Regular review of third-party processor security</li>
              </ul>
              <p>
                No system is completely secure. If we become aware of a breach affecting your data, we will notify you and
                the ICO as required by law within 72 hours.
              </p>
            </Section>

            <Section title="10. Children's Data">
              <p>
                Our services are directed exclusively at businesses and professionals. We do not knowingly collect personal
                data from individuals under the age of 18. If you believe a minor has provided us data, contact us
                immediately and we will delete it.
              </p>
            </Section>

            <Section title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Material changes will be notified via email to active
                clients. The "Last updated" date at the top of this page will always reflect the most recent version.
                Continued use of our website or services after changes constitutes acceptance of the revised policy.
              </p>
            </Section>

            <Section title="12. Contact Us">
              <p>
                For any privacy-related questions, requests, or concerns:
              </p>
              <div className="legal-contact-block">
                <div><strong>{COMPANY}</strong></div>
                <div>Derby, England, United Kingdom</div>
                <div>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
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
