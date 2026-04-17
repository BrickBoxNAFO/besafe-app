export const metadata = { title: 'Terms & Conditions — HomeSafeEducation' }

export default function TermsPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-navy mb-2">Terms & Conditions</h1>
      <p className="text-navy/40 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="prose text-navy/70 leading-relaxed space-y-8">
        {[
          { h: '1. Acceptance of Terms', p: 'By creating an account or purchasing a package from HomeSafeEducation, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.' },
          { h: '2. Products and Access', p: 'Each package purchase grants you lifetime access to the course content within that package for personal use only. Access is tied to your individual account and may not be shared, transferred, or resold. Single packages, Family Safety Bundles, and the Complete Library may all be purchased as a gift for someone else; in that case the recipient receives access through our invite flow.' },
          { h: '3. Payment', p: 'All payments are processed securely through Stripe. Prices are displayed in your local currency where supported (USD, GBP, EUR, CAD, AUD, NZD). By completing a purchase, you authorise the charge to your payment method. All purchases are one-time payments with no subscriptions or recurring charges.' },
          { h: '4. Refund Policy (Summary)', p: 'We offer a full refund within 7 days of purchase, provided that less than 20% of the overall package has been completed. Once package progress exceeds 20%, the purchase is considered fulfilled and a refund is no longer available. Approved refunds are returned to the original payment method within 10 business days (your bank or card provider may take longer to post the funds). To request a refund within the eligibility window, contact us at Support@HomeSafeEducation.com. EU/EEA/UK customers may have additional statutory rights under the Consumer Rights Directive, including a 14-day cooling-off period for distance contracts, which may expire once you give express consent to immediate supply of digital content and begin accessing the course. Your statutory rights take priority where they provide greater protection. See our full Refund Policy for complete details.' },
          { h: '5. Digital Content Consent', p: 'By starting any lesson, downloading any course material, or accessing any bonus content, you expressly consent to the immediate supply of digital content. You acknowledge that, as a consequence, your statutory right of withdrawal for digital content may expire earlier than the standard 14-day cooling-off period in some jurisdictions.' },
          { h: '6. Intellectual Property', p: 'All course content, audio, videos, materials, certificates, and resources provided by HomeSafeEducation are protected by copyright. You may not copy, reproduce, distribute, re-upload, or create derivative works from our content without prior written permission. Bonus downloads (including song ZIPs) are for personal family use only; redistribution is prohibited.' },
          { h: '7. Acceptable Use', p: 'You agree to use our services for lawful personal purposes only. You must not attempt to gain unauthorised access to any part of our systems, share your account credentials, use our content for commercial purposes without a licence, or attempt to scrape or systematically extract course material.' },
          { h: '8. Certificates', p: 'Certificates of Completion are generated automatically once the full package is completed (that is, every lesson in every course in the package is passed). If the package was purchased as a gift, a courtesy copy of the certificate is also sent to the original purchaser.' },
          { h: '9. Disclaimer', p: 'Our courses provide general safety education and awareness. The content is not a substitute for professional legal, medical, or emergency advice. In any emergency, contact the relevant emergency services in your country immediately.' },
          { h: '10. Limitation of Liability', p: 'To the maximum extent permitted by law, HomeSafeEducation shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or reliance on our content.' },
          { h: '11. Changes to Terms', p: 'We reserve the right to update these Terms & Conditions at any time. Continued use of our services following notification of changes constitutes your acceptance of the updated terms.' },
          { h: '12. Contact', p: 'For any questions regarding these terms, contact us at Support@HomeSafeEducation.com.' },
        ].map(s => (
          <div key={s.h}>
            <h2 className="font-semibold text-navy text-lg mb-2">{s.h}</h2>
            <p>{s.p}</p>
          </div>
        ))}

        <div className="mt-4 rounded-xl border border-teal/30 bg-teal/5 p-6">
          <h2 className="font-semibold text-navy text-lg mb-2">Affiliate Programme Terms</h2>
          <p>
            If you are a HomeSafeEducation affiliate partner, your participation in the affiliate programme is governed by a separate set of terms and conditions covering commission rates, payout schedules, pricing changes, attribution, and your obligations as a promoter.
          </p>
          <p className="mt-3">
            <a href="/affiliates/terms" className="text-teal font-semibold underline hover:text-teal/80">
              View the Affiliate Terms &amp; Conditions &rarr;
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
