export const metadata = {
  title: 'Safeguarding Policy | HomeSafe Education',
  description:
    'Our commitment to child safety and safeguarding policies. Learn about our protocols and how to report concerns.',
  openGraph: {
    title: 'Safeguarding Policy | HomeSafe Education',
    description: 'Our commitment to child safety and safeguarding policies.',
    url: 'https://homesafeeducation.com/safeguarding',
    type: 'website',
  },
};

export default function SafeguardingPage() {
  return (
    <main className="bg-slate-light min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-dark to-navy-dark/80 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 font-serif">Safeguarding Policy</h1>
          <p className="text-xl text-slate-200">
            Our commitment to protecting children and vulnerable adults.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-navy-dark font-serif mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              HomeSafe Education is committed to safeguarding and promoting the welfare of children and vulnerable adults.
              We take our responsibility seriously and have implemented comprehensive policies and procedures to ensure the safety
              and protection of all users, particularly children.
            </p>
          </div>

          {/* Core Principles */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Core Safeguarding Principles</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-teal-accent font-bold">•</span>
                <span><strong>Child-centered approach:</strong> The welfare and best interests of the child are paramount in all decisions and actions.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-accent font-bold">•</span>
                <span><strong>Transparency:</strong> We are open and honest about our safeguarding practices and welcome scrutiny.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-accent font-bold">•</span>
                <span><strong>Accountability:</strong> We take responsibility for safeguarding and are accountable to children, parents, and regulators.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-accent font-bold">•</span>
                <span><strong>Prevention:</strong> We work to prevent harm through education, awareness, and protective measures.</span>
              </li>
            </ul>
          </div>

          {/* Child Protection */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Child Protection Measures</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Age-Appropriate Content</h3>
                <p>All educational materials are reviewed and designed to be appropriate for the intended age group and developmental stage.</p>
              </div>
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Privacy Protection</h3>
                <p>We implement strict privacy controls and do not collect unnecessary personal information from children. Parental consent is required for children under 13.</p>
              </div>
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Secure Platform</h3>
                <p>Our platform uses industry-standard encryption and security measures to protect user data and prevent unauthorized access.</p>
              </div>
              <div>
                <h3 className="font-bold text-navy-dark mb-2">Monitoring & Moderation</h3>
                <p>We actively monitor user-generated content and interactions to identify and respond to any inappropriate behavior or content.</p>
              </div>
            </div>
          </div>

          {/* Reporting Procedures */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Reporting Concerns</h2>
            <p className="text-gray-700 mb-4">
              If you have concerns about the safety or welfare of a child using our platform, or if you suspect abuse or exploitation,
              please report it immediately.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <h3 className="font-bold text-navy-dark mb-2">Report to HomeSafe Education</h3>
              <p className="text-gray-700 mb-2">
                Email: <a href="mailto:support@homesafeeducation.com" className="text-teal-accent hover:underline">support@homesafeeducation.com</a>
              </p>
              <p className="text-sm text-gray-600">
                Include details about the concern and contact information so we can follow up appropriately.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="font-bold text-navy-dark mb-2">Report to Authorities</h3>
              <p className="text-gray-700 mb-2">
                For suspected child abuse or exploitation, report to:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• National Child Abuse Hotline: 1-800-4-A-CHILD (1-800-422-4453)</li>
                <li>• CyberTipline: www.cybertipline.org</li>
                <li>• Local law enforcement</li>
              </ul>
            </div>
          </div>

          {/* Staff Training */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Staff & Partner Training</h2>
            <p className="text-gray-700">
              All team members and partners working with HomeSafe Education receive comprehensive safeguarding training.
              This includes recognizing signs of abuse, proper reporting procedures, and maintaining confidentiality.
              We maintain detailed records of all training completed.
            </p>
          </div>

          {/* Parental Involvement */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Parental Involvement & Control</h2>
            <p className="text-gray-700 mb-4">
              We believe parents are essential partners in protecting children. We provide tools and information to help parents:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Monitor their child's activity and progress</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Set appropriate usage limits and boundaries</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Access educational resources and safety tips</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-accent">✓</span>
                <span>Communicate with the HomeSafe Education team</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-teal-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-dark font-serif mb-4">Questions?</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our safeguarding policies, please don't hesitate to contact us.
            </p>
            <a
              href="mailto:support@homesafeeducation.com"
              className="inline-block bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
