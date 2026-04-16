export const metadata = {
  title: 'COPPA Compliance | HomeSafe Education',
  description:
    'Children\'s Online Privacy Protection Act (COPPA) compliance information. Learn how we protect children\'s privacy.',
  openGraph: {
    title: 'COPPA Compliance | HomeSafe Education',
    description: 'Our commitment to protecting children\'s privacy under COPPA regulations.',
    url: 'https://homesafeeducation.com/coppa',
    type: 'website',
  },
};

export default function CoppaPage() {
  return (
    <main className="bg-slate-light min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-dark to-navy-dark/80 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 font-serif">COPPA Compliance</h1>
          <p className="text-xl text-slate-200">
            Children's Online Privacy Protection Act (COPPA) information and our commitment to protecting children's privacy.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* What is COPPA */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-navy-dark font-serif mb-4">What is COPPA?</h2>
            <p className="text-gray-700">
              The Children's Online Privacy Protection Act (COPPA) is a federal law that protects the privacy of children under 13 years old.
              COPPA regulates how websites and online services collect, use, and disclose personal information from children under 13.
              HomeSafe Education fully complies with COPPA and all applicable privacy laws.
            </p>
          </div>

          {/* Age Verification */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Age Verification</h2>
            <p className="text-gray-700 mb-4">
              HomeSafe Education implements age verification procedures to determine whether users are children under 13 or adults.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>Parents or guardians must verify their age and consent to data collection for children under 13</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>We use reasonable methods to verify parental consent, including credit/debit card verification</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>Users who cannot verify age are treated as potentially under 13 for maximum privacy protection</span>
              </li>
            </ul>
          </div>

          {/* Parental Consent */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Parental Consent</h2>
            <p className="text-gray-700 mb-4">
              For children under 13, we obtain verifiable parental consent before collecting personal information. Parents have the right to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Require us to disclose what personal information we have collected</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Require us to stop collecting or using personal information</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Request deletion of the child's personal information</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Opt-out of any disclosure of the child's information to third parties</span>
              </li>
            </ul>
          </div>

          {/* Information Collection */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">What Information Do We Collect?</h2>
            <p className="text-gray-700 mb-4">
              We collect only the minimum information necessary to provide our educational services and comply with legal requirements:
            </p>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Required Information</h3>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Name (first name only for children under 13 when possible)</li>
                  <li>• Email address (parent's email for children under 13)</li>
                  <li>• Username for account access</li>
                  <li>• Learning progress and course completion data</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Not Collected</h3>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Phone numbers (not required for children under 13)</li>
                  <li>• Physical addresses (except as required for shipping)</li>
                  <li>• Social media profiles or information</li>
                  <li>• Precise geolocation data</li>
                  <li>• Biometric information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Data Security & Protection</h2>
            <p className="text-gray-700 mb-4">
              We implement comprehensive security measures to protect children's personal information:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>Industry-standard SSL/TLS encryption for all data in transit</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>Encrypted storage for all personal information at rest</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>Regular security audits and penetration testing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>Strict access controls limiting employee access to children's data</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">•</span>
                <span>Secure deletion procedures when data is no longer needed</span>
              </li>
            </ul>
          </div>

          {/* Data Use & Sharing */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">How We Use & Share Information</h2>
            <p className="text-gray-700 mb-4">
              We use children's personal information only for the purposes described in this policy and as disclosed to parents.
            </p>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Permitted Uses</h3>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Providing our educational services</li>
                  <li>• Responding to parent requests</li>
                  <li>• Complying with legal obligations</li>
                  <li>• Improving our products and services</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Third-Party Sharing</h3>
                <p className="text-sm">
                  We do NOT sell children's personal information. We do not share children's data with third parties for marketing purposes.
                  We only share information with service providers who assist us in providing our services (e.g., hosting providers),
                  and only under strict data processing agreements that require COPPA compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Parental Rights */}
          <div className="bg-blue-50 rounded-lg p-8 mb-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Exercise Your Parental Rights</h2>
            <p className="text-gray-700 mb-4">
              To request access to your child's information, update information, have information deleted,
              or opt-out of future information collection, please contact us:
            </p>
            <div className="bg-white rounded p-4">
              <p className="font-semibold text-navy-dark mb-2">HomeSafe Education Privacy Team</p>
              <p className="text-gray-700 mb-1">
                Email: <a href="mailto:support@homesafeeducation.com" className="text-teal-accent hover:underline">support@homesafeeducation.com</a>
              </p>
              <p className="text-sm text-gray-600 mt-3">
                Please provide your child's name and account email, and describe your request.
                We will respond within 30 days.
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Policy Updates</h2>
            <p className="text-gray-700">
              We may update this COPPA compliance policy periodically. We will notify parents of any material changes
              by email or by posting notice on our website. Your continued use of HomeSafe Education after such notification
              constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
