export default function TermsPage() {
  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h1 className="font-serif text-5xl text-white mb-3">Terms and Conditions</h1>
          <p className="text-white/60">Last updated: March 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 space-y-8">

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">1. Agreement to Terms</h2>
            <p className="text-navy/70 text-sm leading-relaxed">By accessing or purchasing courses on homesafeeducation.com, operated by HomeSafeEducation, you agree to these Terms and Conditions. If you do not agree, do not purchase or access any courses.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">2. Our Services</h2>
            <p className="text-navy/70 text-sm leading-relaxed">HomeSafeEducation sells online safety courses as digital products. The courses are for informational and educational purposes only. They do not constitute professional safety advice, official certification, or a substitute for legal or regulatory requirements in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">3. User Accounts</h2>
            <p className="text-navy/70 text-sm leading-relaxed">You need to create an account to access purchased courses. You are responsible for keeping your login credentials secure. We may suspend or terminate accounts for violations of our Terms.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">4. Payments and Refunds</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">Payments are processed securely through Stripe. All prices are in USD and include applicable taxes unless stated otherwise. For full details, see our <a href="/refunds" className="text-teal hover:underline font-medium">Refund Policy</a>. In summary:</p>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
              <li>A full refund is available if requested within 7 days of purchase.</li>
              <li>No refund will be issued if more than 20% of a purchased course has been completed.</li>
              <li>Approved refunds will be processed to the original payment method within 10 business days.</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4 text-xs text-amber-800"><strong>EU/EEA/UK customers:</strong> You may have additional statutory rights including a 14-day cooling-off period. For digital content, the right of withdrawal can be lost once you give express consent to immediate delivery and start accessing the course. Where statutory rights provide stronger protection, they take precedence.</div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">5. Intellectual Property</h2>
            <p className="text-navy/70 text-sm leading-relaxed">All course materials are the property of HomeSafeEducation. Upon purchase, you receive a limited, non-exclusive, non-transferable, revocable licence to access and use the courses for personal or internal business training only. You may not share, resell, copy, modify, distribute, or publicly display any materials without prior written permission.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">6. User Conduct</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-2">You agree not to:</p>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
              <li>Use the courses for any unlawful purpose or to encourage unsafe practices.</li>
              <li>Share login details or course access with third parties.</li>
              <li>Attempt to bypass technical protections or security features.</li>
              <li>Reverse-engineer, decompile, or extract source materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">7. Disclaimers and Limitation of Liability</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-2">Courses are provided "as is" without warranties. To the maximum extent permitted by law:</p>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
              <li>We disclaim all liability for any loss, injury, damage, or expense arising from your use of the courses.</li>
              <li>Our total liability shall not exceed the amount you paid for the specific course in question.</li>
              <li>We are not liable for indirect, consequential, incidental, or punitive damages.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">8. Children's Privacy and Data Protection</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We comply with GDPR Article 8. For children below the age of digital consent in their EU Member State (typically 13-16), we require verifiable consent from a parent or legal guardian before collecting or processing their personal data. Privacy notices aimed at children are written in clear, age-appropriate language.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">9. Termination</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We may terminate or suspend your access at any time for breach of these Terms or other reasonable cause. Refunds, if any, will follow the Refund Policy.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">10. Governing Law</h2>
            <p className="text-navy/70 text-sm leading-relaxed">These Terms are governed by the laws of the United States, the laws of England and Wales, and the laws of the European Union. Mandatory consumer protections under EU law continue to apply where relevant.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">11. Changes to Terms</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We may update these Terms from time to time. Continued use of the Site after changes constitutes acceptance. We will post the new version with an updated date.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">12. Contact Us</h2>
            <div className="bg-slate rounded-xl p-5">
              <p className="text-navy font-medium">Email: <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a></p>
              <p className="text-navy/60 text-sm mt-1">HomeSafeEducation homesafeeducation.com</p>
            </div>
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
