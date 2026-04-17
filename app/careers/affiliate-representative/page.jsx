export const metadata = {
  title: 'Commission-Based Sales Representative - Remote | HomeSafeEducation',
  description: 'Earn 20% commission promoting family safety and life-skills courses. Fully remote, flexible hours, independent contractor opportunity.',
  canonical: '/careers/affiliate-representative',
};

export default function AffiliateRepresentativePage() {
  const registerUrl = 'https://numok-production.up.railway.app/register';
  const currentYear = new Date().getFullYear();

  // SVG Icons as components
  const GlobeIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
      <path strokeWidth="1.5" d="M12 2a8 8 0 018 10H4a8 8 0 018-10M2 12h20M12 2c-1.65 1.66-2.6 4-2.6 10s.95 8.34 2.6 10m0-20c1.65 1.66 2.6 4 2.6 10s-.95 8.34-2.6 10" />
    </svg>
  );

  const DollarIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="1.5" d="M12 2v20m8-5H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2z" />
    </svg>
  );

  const ChartIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="1.5" d="M3 3v18h18" />
      <path strokeWidth="1.5" d="M7 16l3-4 2 2 5-6 4 4" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="1.5" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const ArrowIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .blur-orb-1 {
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(14, 165, 160, 0.15);
          border-radius: 50%;
          filter: blur(80px);
          top: -100px;
          right: -100px;
          animation: float 6s ease-in-out infinite;
        }

        .blur-orb-2 {
          position: absolute;
          width: 250px;
          height: 250px;
          background: rgba(232, 112, 58, 0.1);
          border-radius: 50%;
          filter: blur(70px);
          bottom: 50px;
          left: -80px;
          animation: float 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .button-primary {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(14, 165, 160, 0.3);
        }

        .button-primary:active {
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(135deg, #0B1F3A 0%, #0EA5A0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pill-badge {
          display: inline-block;
          background: rgba(14, 165, 160, 0.1);
          color: #0EA5A0;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid rgba(14, 165, 160, 0.3);
          animation: fadeInUp 0.6s ease-out;
        }

        .section-title {
          position: relative;
          padding-bottom: 0.5rem;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #0EA5A0, #E8703A);
          border-radius: 2px;
        }

        .icon-card {
          position: relative;
          overflow: hidden;
        }

        .icon-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(14, 165, 160, 0.5), transparent);
        }

        .list-item {
          display: flex;
          gap: 1rem;
          animation: slideInRight 0.6s ease-out forwards;
        }

        .list-item:nth-child(2) { animation-delay: 0.1s; }
        .list-item:nth-child(3) { animation-delay: 0.2s; }
        .list-item:nth-child(4) { animation-delay: 0.3s; }
        .list-item:nth-child(5) { animation-delay: 0.4s; }
      `}</style>

      <main className="bg-slate-50">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A]">
          <div className="blur-orb-1" />
          <div className="blur-orb-2" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-center">
            <div className="mb-4 animate-fadeInUp">
              <span className="pill-badge">Remote - Independent Contractor</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              Commission-Based Sales Representative
            </h1>

            <p className="text-xl text-white mb-3 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Family Safety Education
            </p>

            <p className="text-lg text-white mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              HomeSafeEducation
            </p>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-white/80 text-sm mb-2">Location</p>
                <p className="text-white font-semibold text-lg">Remote (Worldwide)</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-white/80 text-sm mb-2">Employment Type</p>
                <p className="text-white font-semibold text-lg">1099 Contractor</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-white/80 text-sm mb-2">Compensation</p>
                <p className="text-white font-semibold text-lg">20% Commission</p>
              </div>
            </div>

          </div>
        </section>

        {/* About Section */}
        <section className="py-10 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title font-serif text-4xl sm:text-5xl font-bold text-[#0B1F3A] mb-8">
                About HomeSafeEducation
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                We provide online family safety and life-skills courses designed for every stage of life, from young children to older adults. Our programmes cover personal safety, travel preparedness, and practical life skills that help families stay informed and protected.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our mission is to empower families with knowledge and practical skills to navigate the modern world safely and confidently.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5A0] to-[#E8703A] rounded-2xl opacity-10 blur-2xl" />
              <div className="relative bg-white rounded-2xl ring-1 ring-slate-300 p-8 shadow">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#0EA5A0] to-[#0d8f8b] text-white mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" d="M12 6.253v13m0-13C6.5 6.253 2 10.253 2 15.253s4.5 9 10 9 10-4 10-9-4.5-9-10-9z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] mb-3">Our Impact</h3>
                <p className="text-slate-600">
                  Thousands of families trust HomeSafeEducation courses to build essential safety and life skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Role Overview */}
        <section className="py-10 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
          <h2 className="section-title font-serif text-4xl sm:text-5xl font-bold text-[#0B1F3A] mb-8">
            Role Overview
          </h2>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl ring-1 ring-slate-300 p-8 md:p-12">
            <p className="text-lg text-slate-700 leading-relaxed">
              We are seeking motivated, self-directed sales representatives to promote our family safety course packages through our affiliate programme. This is a fully remote, commission-based opportunity, ideal for professionals who excel at consultative selling, digital marketing, or relationship-based outreach.
            </p>
          </div>
        </section>

        {/* What You Will Do */}
        <section className="py-10 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
          <h2 className="section-title font-serif text-4xl sm:text-5xl font-bold text-[#0B1F3A] mb-12">
            What You Will Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: GlobeIcon,
                title: 'Promote Our Courses',
                description: 'Share HomeSafeEducation course packages ($34.99-$219.99) through your own channels and networks',
              },
              {
                icon: ChartIcon,
                title: 'Track Your Performance',
                description: 'Monitor your earnings and conversions through our comprehensive affiliate dashboard',
              },
              {
                icon: DollarIcon,
                title: 'Earn Commission',
                description: 'Receive 20% commission on every completed sale attributed to your referral link',
              },
              {
                icon: UserIcon,
                title: 'Build Your Network',
                description: 'Share your unique affiliate link via social media, content marketing, email campaigns, or direct outreach',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-hover bg-white rounded-2xl ring-1 ring-slate-300 p-8 shadow"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#0EA5A0] to-[#0d8f8b] text-white flex items-center justify-center">
                    <item.icon />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ideal Candidate */}
        <section className="py-10 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
          <h2 className="section-title font-serif text-4xl sm:text-5xl font-bold text-[#0B1F3A] mb-12">
            Ideal Candidate
          </h2>

          <div className="space-y-4">
            {[
              'Experience in sales, digital marketing, content creation, or affiliate marketing',
              'Self-motivated with an entrepreneurial mindset',
              'Comfortable working independently with no fixed hours',
              'Interest in family safety, education, or wellness is a plus',
            ].map((item, idx) => (
              <div key={idx} className="list-item">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0EA5A0] text-white flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckIcon />
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Compensation Details */}
        <section className="py-10 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
          <h2 className="section-title font-serif text-4xl sm:text-5xl font-bold text-[#0B1F3A] mb-12">
            Compensation Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                label: 'Commission Rate',
                value: '20%',
                description: 'On every sale through your referral link',
              },
              {
                label: 'Course Range',
                value: '$34.99 - $219.99',
                description: 'Multiple packages to match customer needs',
              },
              {
                label: 'Per Conversion',
                value: '$7 - $44',
                description: 'Earnings depend on course purchased',
              },
              {
                label: 'Earning Potential',
                value: 'Unlimited',
                description: 'Scale your income based on your effort',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-hover bg-white rounded-2xl ring-1 ring-slate-300 p-8 shadow"
              >
                <p className="text-sm font-semibold text-[#0EA5A0] uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                <p className="font-serif text-4xl font-bold text-[#0B1F3A] mb-3">
                  {item.value}
                </p>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-10 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B1F3A] mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Join our affiliate programme and start earning commission on every sale. Apply now and get access to your personalized dashboard, marketing resources, and dedicated support.
          </p>

          <a
            href={registerUrl}
            className="button-primary inline-flex items-center gap-2 bg-gradient-to-r from-[#0EA5A0] to-[#0d8f8b] text-white px-8 py-4 rounded-lg font-semibold text-lg mb-8"
          >
            Apply Now
            <ArrowIcon />
          </a>

          <p className="text-slate-600 text-sm italic">
            This is a 1099/independent contractor opportunity. No base salary is provided.
          </p>
        </section>

        {/* Spacer */}
        <div className="h-12" />
      </main>

      {/* JSON-LD Structured Data */}
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'JobPosting',
              title:
                'Commission-Based Sales Representative - Family Safety Education (Remote)',
              description:
                '<p><strong>HomeSafeEducation</strong> is seeking motivated, self-directed sales representatives to promote our family safety and life-skills online courses through our affiliate programme.</p><p><strong>What You Will Do:</strong></p><ul><li>Promote HomeSafeEducation course packages ($34.99-$219.99) through your own channels and networks</li><li>Share your unique affiliate referral link via social media, content marketing, email campaigns, or direct outreach</li><li>Earn 20% commission on every completed sale attributed to your link</li><li>Track performance through our affiliate dashboard</li></ul><p><strong>Compensation:</strong> 100% commission-based. You earn 20% of every sale - $7 to $44 per conversion depending on the course package purchased. There is no cap on earnings. This is a 1099/independent contractor opportunity with no base salary.</p>',
              identifier: {
                '@type': 'PropertyValue',
                name: 'HomeSafeEducation',
                value: 'HSE-AFFILIATE-REP-2026',
              },
              datePosted: '2026-04-17',
              validThrough: '2026-10-17',
              employmentType: 'CONTRACTOR',
              hiringOrganization: {
                '@type': 'Organization',
                name: 'HomeSafeEducation',
                sameAs: 'https://homesafeeducation.com',
                logo: 'https://homesafeeducation.com/logo.png',
              },
              jobLocation: {
                '@type': 'Place',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'US',
                },
              },
              jobLocationType: 'TELECOMMUTE',
              applicantLocationRequirements: {
                '@type': 'Country',
                name: 'US',
              },
              baseSalary: {
                '@type': 'MonetaryAmount',
                currency: 'USD',
                value: {
                  '@type': 'QuantitativeValue',
                  minValue: 0,
                  maxValue: 44,
                  unitText: 'UNIT',
                },
              },
              directApply: true,
            }),
          }}
        />
      </>
    </>
  );
}
