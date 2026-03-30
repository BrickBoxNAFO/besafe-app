export default function CoppaPage() {
  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h1 className="font-serif text-5xl text-white mb-3">COPPA Privacy Notice</h1>
          <p className="text-white/60">Last updated: March 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 space-y-8">
          <p className="text-navy/70 leading-relaxed text-sm">The Be Safe Group is committed to complying with the Children's Online Privacy Protection Act (COPPA), a U.S. federal law protecting the personal information of children under 13. This Notice supplements our general <a href="/privacy" className="text-teal hover:underline">Privacy Policy</a>.</p>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">1. Our Practices Regarding Children Under 13</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We do not knowingly collect personal information directly from children under 13 without first obtaining verifiable parental consent. We strongly encourage parents and guardians to supervise their children's use of our website.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">2. What We May Collect</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-2">With verifiable parental consent, we may collect:</p>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
              <li>Name and email address (or parent's email)</li>
              <li>Age or age group for content tailoring</li>
              <li>Course progress and completion data</li>
              <li>Limited technical data (IP address, device information)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">3. How We Use Children's Information</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-2">We use this information only to:</p>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
              <li>Provide access to and deliver purchased safety courses</li>
              <li>Track progress within the course</li>
              <li>Provide customer support</li>
              <li>Ensure the safety and appropriateness of the learning experience</li>
            </ul>
            <p className="text-navy/70 text-sm mt-3">We do not use children's personal information for behavioural advertising or profiling.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">4. Sharing Children's Information</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We share a child's personal information only with service providers who help deliver courses, under strict data agreements. We do not sell children's personal information.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">5. Verifiable Parental Consent</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-2">Before collecting information from a child under 13, we obtain verifiable parental consent via:</p>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
              <li>Signed consent form returned via email or mail</li>
              <li>Credit card verification in connection with a purchase</li>
              <li>Video or telephone call with trained personnel</li>
              <li>Other FTC-approved methods</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">6. Parental Rights</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-2">As a parent or legal guardian, you have the right to:</p>
            <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
              <li>Review the personal information we have collected from your child</li>
              <li>Request that we delete your child's personal information</li>
              <li>Refuse to allow further collection or use of your child's information</li>
              <li>Opt out of any future collection</li>
            </ul>
            <p className="text-navy/70 text-sm mt-3">To exercise these rights, contact us at <a href="mailto:Support@TheBeSafeGroup.com" className="text-teal hover:underline">Support@TheBeSafeGroup.com</a>.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">7. Security and Retention</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We take reasonable steps to protect children's personal information including encryption and access controls. We retain this information only as long as necessary and securely delete it when no longer needed.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">8. Contact Us</h2>
            <div className="bg-slate rounded-xl p-5">
              <p className="text-navy font-medium">Email: <a href="mailto:Support@TheBeSafeGroup.com" className="text-teal hover:underline">Support@TheBeSafeGroup.com</a></p>
              <p className="text-navy/60 text-sm mt-1">The Be Safe Group — TheBeSafeGroup.com</p>
            </div>
            <p className="text-navy/70 text-xs mt-3">We handle all COPPA-related inquiries with priority and confidentiality.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">9. Changes to This Notice</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We may update this notice from time to time. Material changes will be notified via email to parents or posted prominently on our website.</p>
          </section>

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-navy font-semibold">The Be Safe Group</p>
            <a href="https://thebesafegroup.com" className="text-teal text-sm hover:underline">TheBeSafeGroup.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}
