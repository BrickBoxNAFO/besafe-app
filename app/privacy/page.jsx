export const metadata = { title: 'Privacy Policy \u2013 HomeSafeEducation' }

export default function PrivacyPage() {
  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h1 className="font-serif text-5xl text-white mb-3">Privacy Policy</h1>
          <p className="text-white/60">Last updated: April 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 space-y-8">

          <p className="text-navy/70 leading-relaxed">HomeSafeEducation (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit or use homesafeeducation.com (&quot;the Site&quot;). This policy applies to visitors and users worldwide and is designed to comply with the EU General Data Protection Regulation (GDPR), the UK General Data Protection Regulation and Data Protection Act 2018 (UK GDPR), the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA/CPRA), the Children&apos;s Online Privacy Protection Act (COPPA), and other applicable data protection laws.</p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-amber-800 text-sm font-medium">Important: Our Site covers sensitive topics including child safety, abuse prevention, grooming awareness, and personal security. We take extra care to protect the privacy of all users, especially children and vulnerable individuals.</p>
          </div>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">1. Information We Collect</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">We collect the following categories of personal data:</p>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>Account and Contact Data:</strong> Name, email address, billing address, and phone number (if provided) when you register or make a purchase.</li>
              <li><strong>Payment Data:</strong> Payment card details are processed directly and securely by our payment processor (Stripe). We do not store full card numbers on our servers.</li>
              <li><strong>Course and Learning Data:</strong> Course enrolment, progress, completion status, quiz results, and certificates earned.</li>
              <li><strong>Technical and Usage Data:</strong> IP address, browser type, operating system, device identifiers, pages visited, referring URL, and interaction data.</li>
              <li><strong>Communication Data:</strong> Messages, support requests, and feedback you send us.</li>
              <li><strong>Cookie and Consent Data:</strong> Your cookie preferences and consent records. See our <a href="/cookies" className="text-teal hover:underline">Cookie Policy</a> for details.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">2. Children&apos;s Data \u2014 Special Protections</h2>
            <div className="bg-teal/5 border border-teal/20 rounded-xl p-5 space-y-3">
              <p className="text-navy/70 text-sm leading-relaxed">Because our courses are designed for families including children, we apply heightened protections to children&apos;s personal data:</p>
              <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
                <li><strong>Children under 13 (COPPA):</strong> We do not knowingly collect personal information directly from children under 13 without verifiable parental consent. Accounts for children under 13 must be created and managed by a parent or guardian. See our dedicated <a href="/coppa" className="text-teal hover:underline">COPPA Notice</a>.</li>
                <li><strong>Children under 16 (GDPR/UK GDPR):</strong> For children below the age of digital consent in their jurisdiction (typically 13\u201316 depending on the country), we require verifiable parental or guardian consent before processing their data.</li>
                <li><strong>Data minimisation:</strong> We collect only the minimum data necessary to deliver courses to children. We do not use children&apos;s data for marketing, profiling, or behavioural advertising.</li>
                <li><strong>Privacy by design:</strong> Children&apos;s accounts have enhanced privacy settings by default. Privacy notices for younger users are written in clear, age-appropriate language.</li>
                <li><strong>No third-party advertising:</strong> We never serve advertisements to children or share children&apos;s data with advertisers.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">3. How We Use Your Data</h2>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>To provide our services:</strong> Creating accounts, processing payments, delivering courses, tracking progress, and issuing certificates.</li>
              <li><strong>To communicate with you:</strong> Responding to support requests, sending purchase confirmations, and service updates.</li>
              <li><strong>To improve our services:</strong> Analysing usage patterns (using anonymised or aggregated data where possible) to improve course content and user experience.</li>
              <li><strong>To ensure security:</strong> Detecting and preventing fraud, unauthorised access, and other malicious activity.</li>
              <li><strong>To comply with legal obligations:</strong> Meeting tax, accounting, and regulatory requirements.</li>
              <li><strong>Marketing (with consent only):</strong> Sending newsletters and promotional emails, but only where you have given explicit opt-in consent. You can unsubscribe at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">4. Legal Basis for Processing (EU/UK Users)</h2>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>Performance of a contract (Article 6(1)(b)):</strong> To create accounts, process payments, and deliver courses you have purchased.</li>
              <li><strong>Legitimate interests (Article 6(1)(f)):</strong> To improve our services, prevent fraud, and ensure platform security, where these interests are not overridden by your rights.</li>
              <li><strong>Legal obligation (Article 6(1)(c)):</strong> To comply with tax, accounting, and legal requirements.</li>
              <li><strong>Consent (Article 6(1)(a)):</strong> For marketing emails and non-essential cookies. You may withdraw consent at any time without affecting the lawfulness of prior processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">5. Sharing Your Data</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">We may share your personal data with:</p>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>Payment processors</strong> (Stripe) to process transactions securely.</li>
              <li><strong>Hosting and infrastructure providers</strong> (Vercel) to deliver our website.</li>
              <li><strong>Authentication services</strong> (Supabase) to manage your account securely.</li>
              <li><strong>Email service providers</strong> (Resend) to send transactional and marketing emails.</li>
            </ul>
            <p className="text-navy/70 text-sm leading-relaxed mt-3"><strong>We do not sell, rent, or trade your personal data to any third party.</strong> This includes for purposes of targeted advertising.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">6. International Data Transfers</h2>
            <p className="text-navy/70 text-sm leading-relaxed">Some of our service providers may process data outside the European Economic Area (EEA) or the United Kingdom. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission, the UK International Data Transfer Agreement, or adequacy decisions. We take steps to ensure your data receives a level of protection consistent with GDPR and UK GDPR requirements regardless of where it is processed.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">7. Data Retention</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We retain personal data only as long as necessary for the purposes for which it was collected. Account data is kept for the duration of your account plus a reasonable period afterward. Financial and tax records are retained for 6\u20137 years as required by law. Children&apos;s data is deleted promptly upon request by a parent or guardian, or when no longer needed for the original purpose. You may request deletion of your data at any time (see &quot;Your Rights&quot; below).</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">8. Your Rights</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">Depending on your location, you may have the following rights:</p>

            <h3 className="font-semibold text-navy text-sm mt-4 mb-2">EU/UK Residents (GDPR / UK GDPR)</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Right to access', 'Right to rectification', 'Right to erasure', 'Right to restrict processing', 'Right to object to processing', 'Right to data portability', 'Right to withdraw consent', 'Right to lodge a complaint'].map(r => (
                <div key={r} className="bg-slate rounded-lg px-3 py-2 text-xs text-navy/70">{r}</div>
              ))}
            </div>

            <h3 className="font-semibold text-navy text-sm mt-4 mb-2">California Residents (CCPA/CPRA)</h3>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm mb-4">
              <li>Right to know what personal information we collect and how it is used.</li>
              <li>Right to delete personal information we hold about you.</li>
              <li>Right to correct inaccurate personal information.</li>
              <li>Right to opt out of the sale or sharing of personal information. <strong>We do not sell your personal information.</strong></li>
              <li>Right to non-discrimination for exercising your privacy rights.</li>
              <li>Right to limit the use of sensitive personal information.</li>
            </ul>

            <h3 className="font-semibold text-navy text-sm mt-4 mb-2">Other US State Privacy Laws</h3>
            <p className="text-navy/70 text-sm leading-relaxed mb-4">Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), Texas (TDPSA), Oregon (OCPA), Montana (MCDPA), and other states with consumer privacy legislation may have similar rights including access, deletion, correction, and opting out of certain data processing. We honour all applicable state privacy rights and do not discriminate against users who exercise them.</p>

            <h3 className="font-semibold text-navy text-sm mt-4 mb-2">Parents and Guardians</h3>
            <p className="text-navy/70 text-sm leading-relaxed">Parents and guardians have additional rights regarding their children&apos;s data, including the right to review, request deletion, and refuse further collection. See our <a href="/coppa" className="text-teal hover:underline">COPPA Notice</a> for details.</p>

            <p className="text-navy/70 text-sm mt-4">To exercise any of these rights, contact us at <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a>. We will respond within 30 days (or one calendar month for GDPR/UK GDPR requests).</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">9. Cookies and Tracking Technologies</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We use strictly necessary cookies to operate our website (such as authentication session cookies). We do not place non-essential cookies (analytics, marketing, or tracking) on your device without your explicit prior consent. You can manage your cookie preferences at any time using our cookie consent banner or by visiting our <a href="/cookies" className="text-teal hover:underline">Cookie Policy</a>. The Site is fully functional without non-essential cookies.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">10. Data Security</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We implement appropriate technical and organisational measures to protect your personal data, including encryption in transit (TLS/SSL), secure authentication, access controls, and regular security reviews. In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours and affected individuals without undue delay, as required by applicable law.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">11. Do Not Track Signals</h2>
            <p className="text-navy/70 text-sm leading-relaxed">Our Site honours Do Not Track (DNT) browser signals and the Global Privacy Control (GPC) signal. When we detect either signal, we treat it as a valid opt-out of non-essential tracking and do not load any non-essential tracking technologies.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">12. Third-Party Links</h2>
            <p className="text-navy/70 text-sm leading-relaxed">Our Site and blog articles may contain links to third-party websites and resources. We are not responsible for the privacy practices or content of those external sites and encourage you to read their privacy policies before providing any personal information.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">13. Changes to This Policy</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We may update this Privacy Policy from time to time. Material changes will be communicated via email to registered users or via a prominent notice on our website. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">14. Contact Us</h2>
            <div className="bg-slate rounded-xl p-5">
              <p className="text-navy font-medium">Email: <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a></p>
              <p className="text-navy/60 text-sm mt-1">HomeSafeEducation &mdash; homesafeeducation.com</p>
            </div>
            <p className="text-navy/70 text-xs mt-3">If you are unhappy with how we have handled your data, you have the right to lodge a complaint with your local data protection authority. In the EU, you can find your national authority at edpb.europa.eu. In the UK, contact the Information Commissioner&apos;s Office (ICO) at ico.org.uk.</p>
          </section>

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-navy font-semibold">HomeSafeEducation</p>
            <a href="https://homesafeeducation.com" className="text-teal text-sm hover:underline">homesafeeducation.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

