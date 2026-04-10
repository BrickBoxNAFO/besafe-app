export const metadata = { title: 'Cookie Policy \u2013 HomeSafeEducation', alternates: { canonical: '/cookies' } }

export default function CookiesPage() {
  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h1 className="font-serif text-5xl text-white mb-3">Cookie Policy</h1>
          <p className="text-white/60">Last updated: April 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 space-y-8">

          <p className="text-navy/70 leading-relaxed text-sm">This Cookie Policy explains what cookies are, how HomeSafeEducation (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses them on homesafeeducation.com (&quot;the Site&quot;), your choices regarding cookies, and how our Site functions when non-essential cookies are declined. This policy is designed to comply with the EU ePrivacy Directive, the UK Privacy and Electronic Communications Regulations (PECR), the General Data Protection Regulation (GDPR), the UK GDPR, and applicable US state privacy laws.</p>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">1. What Are Cookies?</h2>
            <p className="text-navy/70 text-sm leading-relaxed">Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites function properly, remember your preferences, and provide analytics data to site owners. Cookies may be &quot;session&quot; cookies (deleted when you close your browser) or &quot;persistent&quot; cookies (remaining on your device for a set period or until you delete them).</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">2. How We Use Cookies</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-4">We categorise cookies into the following types:</p>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-semibold text-green-800 text-sm mb-2">Strictly Necessary Cookies (Always Active)</h3>
                <p className="text-green-700 text-sm mb-3">These cookies are essential for the Site to function. They cannot be switched off. They are set only in response to actions you take, such as logging in, setting your privacy preferences, or filling in forms. The Site cannot function properly without these cookies.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead><tr className="border-b border-green-200">
                      <th className="py-2 pr-4 text-green-800">Cookie</th>
                      <th className="py-2 pr-4 text-green-800">Purpose</th>
                      <th className="py-2 text-green-800">Duration</th>
                    </tr></thead>
                    <tbody className="text-green-700">
                      <tr className="border-b border-green-100"><td className="py-2 pr-4 font-mono">sb-*-auth-token</td><td className="py-2 pr-4">Authentication session (Supabase)</td><td className="py-2">Session</td></tr>
                      <tr className="border-b border-green-100"><td className="py-2 pr-4 font-mono">cookie_consent</td><td className="py-2 pr-4">Stores your cookie preferences</td><td className="py-2">365 days</td></tr>
                      <tr><td className="py-2 pr-4 font-mono">__stripe_mid / __stripe_sid</td><td className="py-2 pr-4">Stripe payment fraud prevention</td><td className="py-2">Session / 30 min</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-blue-800 text-sm mb-2">Analytics Cookies (Require Consent)</h3>
                <p className="text-blue-700 text-sm mb-3">These cookies help us understand how visitors interact with the Site by collecting anonymous, aggregated data. They are only set if you give explicit consent via our cookie banner.</p>
                <p className="text-blue-600 text-xs italic">We currently do not use any analytics cookies. If we add analytics in the future, this section will be updated and your consent will be requested before any analytics cookies are placed.</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                <h3 className="font-semibold text-purple-800 text-sm mb-2">Marketing / Advertising Cookies (Require Consent)</h3>
                <p className="text-purple-700 text-sm">We do not use marketing or advertising cookies. We do not serve ads on our Site and do not share your data with advertising networks. If this changes in the future, we will update this policy and obtain your consent.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">3. Your Cookie Choices</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">You have full control over which non-essential cookies you accept:</p>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>Cookie consent banner:</strong> When you first visit our Site, a cookie consent banner will appear allowing you to accept all cookies, reject all non-essential cookies, or customise your preferences. You can change your preferences at any time by clicking the &quot;Cookie Settings&quot; link in our website footer.</li>
              <li><strong>Browser settings:</strong> You can also control and delete cookies through your browser settings. Please note that blocking strictly necessary cookies may prevent the Site from functioning correctly (for example, you will not be able to stay logged in).</li>
              <li><strong>Do Not Track / Global Privacy Control:</strong> We honour DNT and GPC browser signals. If either is detected, we treat it as a rejection of non-essential cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">4. Site Functionality Without Non-Essential Cookies</h2>
            <div className="bg-teal/5 border border-teal/20 rounded-xl p-5">
              <p className="text-navy/70 text-sm leading-relaxed mb-3">Our Site is designed to be fully functional even if you decline all non-essential cookies. Specifically:</p>
              <ul className="text-navy/70 space-y-1 list-disc list-inside text-sm">
                <li>You can browse all pages and blog articles.</li>
                <li>You can create an account and log in.</li>
                <li>You can purchase and access courses.</li>
                <li>You can track your course progress.</li>
                <li>You can contact us and use all forms.</li>
                <li>All payment processing works normally.</li>
              </ul>
              <p className="text-navy/70 text-sm leading-relaxed mt-3">Declining non-essential cookies will not limit your experience in any way.</p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">5. Third-Party Cookies</h2>
            <p className="text-navy/70 text-sm leading-relaxed">Some strictly necessary cookies are set by our trusted service providers (Stripe for payments, Supabase for authentication). These providers may set their own cookies in accordance with their own privacy policies. We do not allow any other third parties to set cookies on our Site.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">6. Cookie Compliance by Region</h2>
            <ul className="text-navy/70 space-y-2 list-disc list-inside text-sm">
              <li><strong>EU/EEA (GDPR / ePrivacy Directive):</strong> No non-essential cookies are placed until you give explicit, informed, freely-given consent. Refusing consent is as easy as accepting. You can withdraw consent at any time.</li>
              <li><strong>United Kingdom (UK GDPR / PECR):</strong> Same approach as EU \u2014 non-essential cookies require your explicit prior consent.</li>
              <li><strong>United States (CCPA/CPRA and state laws):</strong> You have the right to know about cookies used on our Site and to opt out of non-essential cookies. We do not sell personal information collected through cookies. California residents can exercise their rights under the CCPA/CPRA. Residents of other states with applicable privacy laws (Virginia, Colorado, Connecticut, etc.) are afforded equivalent protections.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">7. Children and Cookies</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We are mindful that our Site may be accessed by families and children. We do not use cookies to profile, track, or serve advertisements to children. Only strictly necessary cookies are used, and no behavioural data is collected from children for commercial purposes.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">8. Changes to This Policy</h2>
            <p className="text-navy/70 text-sm leading-relaxed">We may update this Cookie Policy from time to time. If we add new categories of cookies, we will update this page and request your consent before placing them. The &quot;Last updated&quot; date at the top reflects the most recent revision.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-navy mb-3">9. Contact Us</h2>
            <div className="bg-slate rounded-xl p-5">
              <p className="text-navy font-medium">Email: <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a></p>
              <p className="text-navy/60 text-sm mt-1">HomeSafeEducation &mdash; homesafeeducation.com</p>
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

