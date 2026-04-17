'use server';

import React from 'react';

const AffiliateCreatorPage = () => {
  const colors = {
    navy: '#0B1F3A',
    teal: '#0EA5A0',
    orange: '#E8703A',
  };

  return (
    <>
      {/* Metadata */}
      <head>
        <title>Content Creator Partner - Family Safety Education | HomeSafeEducation</title>
        <meta
          name="description"
          content="Partner with HomeSafeEducation and earn 20% commission sharing family safety courses with your audience. No restrictions on platform."
        />
        <link rel="canonical" href="/careers/affiliate-influencer" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'JobPosting',
              title: 'Content Creator Partner - Family Safety Education (Remote)',
              description:
                '<p>Partner with <strong>HomeSafeEducation</strong> and earn 20% commission sharing family safety and life-skills courses with your audience.</p><p>We create online courses covering child safety, teen preparedness, travel safety, and more. Join our affiliate programme, share your unique link, and earn $7-$44 per conversion.</p><p>No exclusivity, no upfront cost, no restrictions on platform. Share on any platform you like.</p><p>Apply at: <a href="https://homesafeeducation.com/affiliates">https://homesafeeducation.com/affiliates</a></p>',
              identifier: {
                '@type': 'PropertyValue',
                name: 'HomeSafeEducation',
                value: 'HSE-AFFILIATE-CREATOR-2026',
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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Merriweather', serif;
          }

          .hero-section {
            background: linear-gradient(135deg, ${colors.navy} 0%, #122a4d 50%, ${colors.navy} 100%);
            position: relative;
            overflow: hidden;
            padding: 120px 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero-blur-orb-1 {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(14, 165, 160, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            filter: blur(80px);
            top: -200px;
            left: -200px;
            animation: float 8s ease-in-out infinite;
          }

          .hero-blur-orb-2 {
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(232, 112, 58, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            filter: blur(80px);
            bottom: -150px;
            right: -150px;
            animation: float 10s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(30px); }
          }

          .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
          }

          .pill-badge {
            display: inline-block;
            background-color: rgba(14, 165, 160, 0.2);
            color: #0EA5A0;
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 30px;
            border: 1px solid rgba(14, 165, 160, 0.3);
            animation: fadeInUp 0.6s ease-out;
          }

          .hero-h1 {
            font-size: 56px;
            font-weight: 700;
            color: white;
            line-height: 1.2;
            margin-bottom: 20px;
            animation: fadeInUp 0.8s ease-out 0.1s both;
          }

          .hero-subtitle {
            font-size: 22px;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 50px;
            line-height: 1.5;
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }

          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, ${colors.teal} 0%, #0d9e99 100%);
            color: white;
            padding: 16px 48px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(14, 165, 160, 0.3);
            animation: fadeInUp 0.8s ease-out 0.3s both;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(14, 165, 160, 0.4);
          }

          .cta-button:active {
            transform: translateY(0px);
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

          .section {
            padding: 120px 20px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .section-title {
            font-size: 44px;
            font-weight: 700;
            margin-bottom: 20px;
            color: ${colors.navy};
            text-align: center;
          }

          .section-subtitle {
            font-size: 18px;
            color: #64748b;
            text-align: center;
            margin-bottom: 60px;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .partner-section-text {
            font-size: 18px;
            line-height: 1.8;
            color: #475569;
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }

          .how-it-works-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-top: 60px;
          }

          .step-card {
            text-align: center;
            animation: fadeInUp 0.8s ease-out backwards;
          }

          .step-card:nth-child(1) { animation-delay: 0.1s; }
          .step-card:nth-child(2) { animation-delay: 0.2s; }
          .step-card:nth-child(3) { animation-delay: 0.3s; }
          .step-card:nth-child(4) { animation-delay: 0.4s; }

          .step-icon-wrapper {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, rgba(14, 165, 160, 0.15) 0%, rgba(232, 112, 58, 0.1) 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            border: 2px solid rgba(14, 165, 160, 0.2);
            transition: all 0.3s ease;
          }

          .step-card:hover .step-icon-wrapper {
            background: linear-gradient(135deg, rgba(14, 165, 160, 0.25) 0%, rgba(232, 112, 58, 0.15) 100%);
            border-color: rgba(14, 165, 160, 0.4);
            transform: translateY(-5px);
          }

          .step-number {
            font-size: 32px;
            font-weight: 700;
            color: ${colors.teal};
          }

          .step-title {
            font-size: 20px;
            font-weight: 700;
            color: ${colors.navy};
            margin-bottom: 12px;
            font-family: 'Merriweather', serif;
          }

          .step-description {
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 60px;
          }

          .feature-card {
            background: white;
            border-radius: 24px;
            padding: 40px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.3s ease;
            animation: fadeInUp 0.8s ease-out backwards;
          }

          .feature-card:nth-child(1) { animation-delay: 0.1s; }
          .feature-card:nth-child(2) { animation-delay: 0.2s; }
          .feature-card:nth-child(3) { animation-delay: 0.3s; }
          .feature-card:nth-child(4) { animation-delay: 0.4s; }
          .feature-card:nth-child(5) { animation-delay: 0.5s; }

          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
            border-color: ${colors.teal};
          }

          .feature-icon {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, ${colors.teal} 0%, #0d9e99 100%);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: white;
            font-size: 32px;
          }

          .feature-card:hover .feature-icon {
            background: linear-gradient(135deg, ${colors.orange} 0%, #d65c24 100%);
          }

          .feature-title {
            font-size: 18px;
            font-weight: 700;
            color: ${colors.navy};
            margin-bottom: 12px;
            font-family: 'Merriweather', serif;
          }

          .feature-description {
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
          }

          .ideal-for-section {
            text-align: center;
          }

          .tags-container {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin-top: 50px;
          }

          .tag {
            display: inline-block;
            background: linear-gradient(135deg, rgba(14, 165, 160, 0.1) 0%, rgba(232, 112, 58, 0.05) 100%);
            border: 1px solid rgba(14, 165, 160, 0.2);
            color: ${colors.navy};
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            animation: fadeInUp 0.6s ease-out backwards;
          }

          .tag:nth-child(1) { animation-delay: 0.05s; }
          .tag:nth-child(2) { animation-delay: 0.1s; }
          .tag:nth-child(3) { animation-delay: 0.15s; }
          .tag:nth-child(4) { animation-delay: 0.2s; }
          .tag:nth-child(5) { animation-delay: 0.25s; }
          .tag:nth-child(6) { animation-delay: 0.3s; }
          .tag:nth-child(7) { animation-delay: 0.35s; }
          .tag:nth-child(8) { animation-delay: 0.4s; }
          .tag:nth-child(9) { animation-delay: 0.45s; }

          .tag:hover {
            background: linear-gradient(135deg, rgba(14, 165, 160, 0.2) 0%, rgba(232, 112, 58, 0.1) 100%);
            border-color: ${colors.teal};
            transform: translateY(-3px);
          }

          .final-cta-section {
            background: linear-gradient(135deg, ${colors.navy} 0%, #122a4d 100%);
            padding: 80px 20px;
            text-align: center;
            border-radius: 32px;
            margin: 0 20px;
            animation: fadeInUp 0.8s ease-out;
          }

          .final-cta-section h2 {
            font-size: 40px;
            color: white;
            margin-bottom: 24px;
          }

          .final-cta-description {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 40px;
            line-height: 1.6;
          }

          .final-cta-button {
            display: inline-block;
            background: linear-gradient(135deg, ${colors.teal} 0%, #0d9e99 100%);
            color: white;
            padding: 16px 48px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(14, 165, 160, 0.3);
            margin-bottom: 20px;
          }

          .final-cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(14, 165, 160, 0.4);
          }

          .final-cta-link {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.75);
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .hero-h1 {
              font-size: 36px;
            }

            .hero-subtitle {
              font-size: 18px;
            }

            .section-title {
              font-size: 32px;
            }

            .hero-section {
              padding: 80px 20px;
              min-height: auto;
            }

            .how-it-works-grid {
              grid-template-columns: 1fr;
              gap: 30px;
            }

            .features-grid {
              grid-template-columns: 1fr;
            }

            .final-cta-section {
              margin: 0 20px;
            }
          }
        `}</style>
      </head>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-blur-orb-1"></div>
          <div className="hero-blur-orb-2"></div>
          <div className="hero-content">
            <div className="pill-badge">Creator Partnership</div>
            <h1 className="hero-h1">Content Creator Partner - Family Safety Education</h1>
            <p className="hero-subtitle">Earn 20% commission sharing courses your audience actually needs</p>
            <a href="https://numok-production.up.railway.app/register" className="cta-button">
              Join the Programme
            </a>
          </div>
        </section>

        {/* Partner with HomeSafeEducation Section */}
        <section className="section">
          <h2 className="section-title">Partner with HomeSafeEducation</h2>
          <p className="partner-section-text">
            We create online courses covering family safety and life skills, including child safety, teen preparedness, travel safety, young adult independence, and more. It is practical, genuinely useful content that families actually need. We are looking for content creators to join our affiliate programme and share our courses with their audiences. You earn 20% commission on every sale made through your unique referral link.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="section">
          <h2 className="section-title">How It Works</h2>
          <div className="how-it-works-grid">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="step-title">Sign up for free</h3>
              <p className="step-description">No application process, no approval wait</p>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="step-title">Get your unique referral link</h3>
              <p className="step-description">A personalised URL ready to share instantly</p>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm5 5.5H5V5h14v12.5z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="step-title">Share with your audience</h3>
              <p className="step-description">Integrate it into your content naturally</p>
            </div>

            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="step-title">Earn 20% per sale</h3>
              <p className="step-description">Course packages range from $34.99 to $219.99, so you earn $7-$44 per conversion</p>
            </div>
          </div>
        </section>

        {/* Why This Works for Creators Section */}
        <section className="section">
          <h2 className="section-title">Why This Works for Creators</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="white"/>
                </svg>
              </div>
              <h3 className="feature-title">Evergreen content angle</h3>
              <p className="feature-description">Safety tips, parenting advice, and life-skills content performs well year-round</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
                </svg>
              </div>
              <h3 className="feature-title">Authentic recommendation</h3>
              <p className="feature-description">Family safety is something people genuinely care about, which makes it easy to promote</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.44-.53-1.25-.53-1.69 0-.44.53-.44 1.39 0 1.92l3 3.69c.44.53 1.25.53 1.69 0l4-5.16c.44-.53.44-1.39 0-1.92-.44-.54-1.25-.54-1.69-.01z" fill="white"/>
                </svg>
              </div>
              <h3 className="feature-title">No exclusivity</h3>
              <p className="feature-description">Promote alongside your other partnerships without restrictions</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 20c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="white"/>
                </svg>
              </div>
              <h3 className="feature-title">No upfront cost</h3>
              <p className="feature-description">Sign up, get your link, start sharing with zero investment</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="white"/>
                </svg>
              </div>
              <h3 className="feature-title">Share on any platform</h3>
              <p className="feature-description">No restrictions on where or how you promote our courses</p>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="section ideal-for-section">
          <h2 className="section-title">Ideal For Creators In</h2>
          <div className="tags-container">
            <span className="tag">Family</span>
            <span className="tag">Parenting</span>
            <span className="tag">Education</span>
            <span className="tag">Teaching</span>
            <span className="tag">Lifestyle</span>
            <span className="tag">Mommy/Daddy Content</span>
            <span className="tag">Travel</span>
            <span className="tag">Homeschooling</span>
            <span className="tag">Wellness</span>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section">
          <div className="final-cta-section">
            <h2>Get Started</h2>
            <p className="final-cta-description">Join the programme at homesafeeducation.com/affiliates - it takes less than two minutes.</p>
            <a href="https://numok-production.up.railway.app/register" className="final-cta-button">
              Join the Programme
            </a>
            <p className="final-cta-link">No credit card required. No approval wait. Start earning today.</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default AffiliateCreatorPage;
