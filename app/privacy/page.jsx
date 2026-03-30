export default function PrivacyPage() {
  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h1 className="font-serif text-5xl text-white mb-3">Privacy Policy</h1>
          <p className="text-white/60">Last updated: March 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 space-y-8">
          <p className="text-navy/70 leading-relaxed">HomeSafeEducation is committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR) and other applicable data protection laws. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit or make purchases on homesafeeducation.com.</p>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">1. Information We Collect</h2>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>Contact and Account Data:</strong> Name, email address, billing address, phone number (if provided), username and password.</li>
              <li><strong>Payment Data:</strong> Processed securely by our payment service providers.</li>
              <li><strong>Course-Related Data:</strong> Course progress, completion status, quiz results, watch time, and downloaded materials.</li>
              <li><strong>Technical and Usage Data:</strong> IP address, browser type, device information, pages visited, cookies, and interaction logs.</li>
              <li><strong>Children's Data:</strong> For courses intended for children under 18 — child's name, age or age group, and parental/guardian contact details.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">2. How We Use Your Data and Legal Basis</h2>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>Performance of a contract (Article 6(1)(b)):</strong> To create accounts, process payments, deliver courses, and provide support.</li>
              <li><strong>Legitimate interests (Article 6(1)(f)):</strong> To improve our services, prevent fraud, and communicate service updates.</li>
              <li><strong>Legal obligation (Article 6(1)(c)):</strong> To comply with tax and legal requirements.</li>
              <li><strong>Consent (Article 6(1)(a)):</strong> For marketing emails and non-essential cookies. You can withdraw consent at any time.</li>
            </ul>
            <div className="bg-teal/5 border border-teal/20 rounded-xl p-4 mt-4 text-sm text-navy/70">For children below the age of digital consent in their EU Member State (typically 13-16), we require verifiable consent from a parent or legal guardian. We provide privacy notices in clear, age-appropriate language and apply enhanced protections including privacy by design and by default.</div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">3. Sharing Your Data</h2>
            <p className="text-navy/70 leading-relaxed text-sm">We may share your personal data with trusted third-party service providers (payment processors, hosting providers, email platforms) who are bound by strict data processing agreements. We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">4. International Data Transfers</h2>
            <p className="text-navy/70 leading-relaxed text-sm">Where service providers are located outside the EEA, we ensure appropriate safeguards such as Standard Contractual Clauses approved by the European Commission.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">5. Data Retention</h2>
            <p className="text-navy/70 leading-relaxed text-sm">We retain personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by law (accounting and tax records are typically kept for 6-7 years).</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">6. Your Rights under GDPR</h2>
            <div className="grid grid-cols-2 gap-2">
              {['Right to access','Right to rectification','Right to erasure','Right to restriction of processing','Right to object to processing','Right to data portability','Right to withdraw consent'].map(r => (
                <div key={r} className="bg-slate rounded-lg px-3 py-2 text-xs text-navy/70">{r}</div>
              ))}
            </div>
            <p className="text-navy/70 text-sm mt-4">To exercise any of these rights, contact us at <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a>. We will respond within one month.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">7. Cookies</h2>
            <p className="text-navy/70 leading-relaxed text-sm">We use essential cookies to make the website function. Non-essential cookies for analytics or marketing require your explicit consent, managed via our cookie banner.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">8. Data Security</h2>
            <p className="text-navy/70 leading-relaxed text-sm">We implement appropriate technical and organisational measures including encryption and access controls. In the event of a personal data breach posing a risk to your rights, we will notify the relevant supervisory authority without undue delay.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">9. Children's Privacy</h2>
            <p className="text-navy/70 leading-relaxed text-sm">If you believe we have collected data from a child without proper parental consent, please contact us immediately at <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a>.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">10. Changes to This Policy</h2>
            <p className="text-navy/70 leading-relaxed text-sm">We may update this Privacy Policy from time to time. We will notify you of material changes via email or a prominent notice on our website.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">11. Contact Us</h2>
            <div className="bg-slate rounded-xl p-5">
              <p className="text-navy font-medium">Email: <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a></p>
              <p className="text-navy/60 text-sm mt-1">HomeSafeEducation &mdash; homesafeeducation.com</p>
            </div>
            <p className="text-navy/70 text-xs mt-3">If you are unhappy with how we have handled your data, you have the right to lodge a complaint with your national data protection supervisory authority.</p>
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
