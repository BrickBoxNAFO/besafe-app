import Link from 'next/link'

export const metadata = {
  title: 'Affiliate Welcome Guide — HomeSafeEducation',
  description: 'Everything you need to understand, believe in, and share our products. The complete affiliate partner guide for HomeSafeEducation.',
}

function Callout({ title, children }) {
  return (
    <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6 my-8">
      {title && <p className="font-semibold text-navy text-sm mb-2">{title}</p>}
      <div className="text-navy/70 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function SectionHeading({ children, id }) {
  return (
    <h2 id={id} className="font-serif text-3xl lg:text-4xl text-navy mt-16 mb-6 scroll-mt-24">{children}</h2>
  )
}

function SubHeading({ children }) {
  return <h3 className="font-serif text-2xl text-navy mt-10 mb-4">{children}</h3>
}

export default function WelcomeGuidePage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5 inline-block">Affiliate Programme</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            Welcome Guide &<br />
            <span className="italic text-teal">Product Training</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to understand, believe in, and share our products.
          </p>
          <p className="text-white/40 text-sm mt-4">Confidential — For Affiliate Partners Only</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-light py-20">
        <div className="max-w-3xl mx-auto px-6">

          {/* Table of Contents */}
          <nav className="bg-slate rounded-2xl p-8 mb-16">
            <p className="font-semibold text-navy text-sm mb-4">In this guide</p>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              {[
                ['A Message From Our Founder', 'founder'],
                ['Welcome to the Team', 'welcome'],
                ['What Is HomeSafeEducation?', 'what'],
                ['Your Commission', 'commission'],
                ['The Packages', 'packages'],
                ['Package Deep Dives', 'deep-dives'],
                ['Selling in Context', 'selling'],
                ['The Gifting Opportunity', 'gifting'],
                ['About the Music', 'music'],
                ['How Your Affiliate Link Works', 'link'],
                ['How to Promote Without Getting Flagged', 'promote'],
                ['Important to Know', 'important'],
                ['Everyone Knows Someone', 'everyone'],
                ['Contact & Support', 'contact'],
              ].map(([label, id]) => (
                <a key={id} href={`#${id}`} className="text-teal hover:text-teal/80 hover:underline py-1">{label}</a>
              ))}
            </div>
          </nav>

          {/* Founder Message */}
          <SectionHeading id="founder">A Message From Our Founder</SectionHeading>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8">
            <p className="text-navy/70 text-base leading-relaxed mb-4">
              Thank you for joining us. I'm glad to be sharing this opportunity for you to earn from offering a product that genuinely helps people keep their loved ones safe. Welcome to the team — let's do something great together.
            </p>
            <p className="font-semibold text-navy">Brick <span className="font-normal text-navy/50">— Founder, HomeSafeEducation</span></p>
          </div>

          {/* Welcome */}
          <SectionHeading id="welcome">Welcome to the Team</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-4">
            By choosing to partner with us you are not just earning commission — you are helping families, young people, older adults, and travellers access the safety knowledge that could genuinely change their lives.
          </p>
          <p className="text-navy/70 text-base leading-relaxed mb-4">
            Before we go any further, there is something you should know about what drives this company: <strong className="text-navy">we do not sell through fear — we sell through love</strong>. Every course, every lesson, every song is built around a simple idea: that giving someone the knowledge to protect themselves and the people they care about is one of the greatest gifts you can give.
          </p>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            This guide will give you everything you need: a deep understanding of what we offer, who it is for, how to talk about it naturally, and how you get paid. Please read it fully — affiliates who understand the product always outperform those who simply share a link.
          </p>

          <Callout title="Your quick-start checklist">
            <p>1. Read this guide cover to cover &bull; 2. Try the free lesson example at <Link href="/example" className="text-teal hover:underline">homesafeeducation.com/example</Link> &bull; 3. Log into your Numok dashboard &bull; 4. Grab your unique affiliate link from your dashboard &bull; 5. Start sharing!</p>
          </Callout>

          {/* What Is HSE */}
          <SectionHeading id="what">What Is HomeSafeEducation?</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-4">
            HomeSafeEducation is an online learning platform offering <strong className="text-navy">expert-led safety and life-skills courses for every stage of life</strong>. From a four-year-old learning about road safety, to a seventy-five-year-old learning to spot a scam — our courses cover topics that schools, workplaces, and society consistently overlook.
          </p>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            Every package is a <strong className="text-navy">one-time purchase</strong> — no subscriptions, no hidden fees, no recurring charges. Customers buy once and have lifetime access to their courses, quizzes, progress tracking, certificates, and original music.
          </p>

          <SubHeading>What Makes Us Different</SubHeading>
          <div className="space-y-4 mb-6">
            {[
              ['Age-appropriate wording', 'Every package is written specifically for its audience. A lesson for a five-year-old reads completely differently from a lesson for a teenager or an older adult.'],
              ['No fear-based teaching', 'We educate through empowerment, not intimidation. Our founder made a promise that fear would never be used to sell or to teach.'],
              ['Original music with lyrics', '184 original songs are woven into the lessons, each one age-appropriate and designed to reinforce safety messages. Learners can sing along with the full lyrics included.'],
              ['Quizzes and certificates', 'Every lesson includes quiz questions. On completing each package, learners receive an official PDF certificate emailed directly to them.'],
              ['Built for gifting', 'Packages can be purchased and assigned to someone else. This makes every package the perfect meaningful gift.'],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-4">
                <div className="w-1.5 bg-teal/30 rounded-full flex-shrink-0 mt-1" style={{ minHeight: '1.5rem' }} />
                <div>
                  <p className="font-semibold text-navy text-sm">{title}</p>
                  <p className="text-navy/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Callout title="See It For Yourself">
            <p>Visit <Link href="/example" className="text-teal hover:underline">homesafeeducation.com/example</Link> to preview a lesson and see the quality of our content firsthand. The best affiliates are the ones who genuinely know the product.</p>
          </Callout>

          {/* Commission */}
          <SectionHeading id="commission">Your Commission</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            You earn a flat <strong className="text-navy">20% commission</strong> on every sale made through your affiliate link. Based on current pricing, here is an example of what you could earn per product:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-4 py-3 rounded-tl-xl">Product</th>
                  <th className="text-right px-4 py-3">USD</th>
                  <th className="text-right px-4 py-3">GBP</th>
                  <th className="text-right px-4 py-3 rounded-tr-xl">EUR</th>
                </tr>
              </thead>
              <tbody className="text-navy/70">
                {[
                  ['Growing Minds', '$7.00', '£4.60', '€5.60'],
                  ['Street Smart', '$8.00', '£5.60', '€7.00'],
                  ['Nest Breaking', '$10.00', '£7.00', '€8.60'],
                  ['Roaming Free', '$12.00', '£8.60', '€10.00'],
                  ['Aging Wisdom', '$8.00', '£5.60', '€7.00'],
                  ['Family Anchor', '$10.00', '£7.00', '€8.60'],
                  ['Family Bundle', '$26.00', '£18.00', '€22.00'],
                  ['Complete Library', '$44.00', '£30.00', '€36.00'],
                ].map(([name, usd, gbp, eur], i) => (
                  <tr key={name} className={i % 2 === 0 ? 'bg-slate' : 'bg-white'}>
                    <td className="px-4 py-2.5 font-medium text-navy">{name}</td>
                    <td className="text-right px-4 py-2.5">{usd}</td>
                    <td className="text-right px-4 py-2.5">{gbp}</td>
                    <td className="text-right px-4 py-2.5">{eur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-navy/50 text-xs leading-relaxed mb-8">
            The amounts above are based on current pricing at the time this guide was published and are provided as examples only. Product prices may change and promotional discounts may be offered from time to time. Your commission is always 20% of the amount actually paid by the customer, after any discount or promotion.
          </p>

          {/* Packages */}
          <SectionHeading id="packages">The Packages</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            HomeSafeEducation offers seven individual packages, a build-your-own bundle, and a complete library. All affiliate links lead customers to the <Link href="/packages" className="text-teal hover:underline">packages page</Link> where they can see every package in one place.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-3 py-3 rounded-tl-xl">Package</th>
                  <th className="text-center px-3 py-3">Ages</th>
                  <th className="text-center px-3 py-3">Courses</th>
                  <th className="text-right px-3 py-3">USD</th>
                  <th className="text-right px-3 py-3">GBP</th>
                  <th className="text-right px-3 py-3 rounded-tr-xl">EUR</th>
                </tr>
              </thead>
              <tbody className="text-navy/70">
                {[
                  ['Growing Minds', '4–11', '13', '$34.99', '£22.99', '€27.99'],
                  ['Street Smart', '12–17', '6', '$39.99', '£27.99', '€34.99'],
                  ['Nest Breaking', '18–25', '4', '$49.99', '£34.99', '€42.99'],
                  ['Roaming Free', 'All', '5', '$59.99', '£42.99', '€49.99'],
                  ['Aging Wisdom', '60+', '5', '$39.99', '£27.99', '€34.99'],
                  ['Family Anchor', 'Parents', '5', '$49.99', '£34.99', '€42.99'],
                ].map(([name, ages, courses, usd, gbp, eur], i) => (
                  <tr key={name} className={i % 2 === 0 ? 'bg-slate' : 'bg-white'}>
                    <td className="px-3 py-2.5 font-medium text-navy">{name}</td>
                    <td className="text-center px-3 py-2.5">{ages}</td>
                    <td className="text-center px-3 py-2.5">{courses}</td>
                    <td className="text-right px-3 py-2.5">{usd}</td>
                    <td className="text-right px-3 py-2.5">{gbp}</td>
                    <td className="text-right px-3 py-2.5">{eur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate rounded-2xl p-6 mb-8 space-y-3">
            <p className="text-navy text-sm"><strong>Family Safety Bundle</strong> — Choose any 5 packages. $129.99 / £89.99 / €109.99 <span className="text-teal font-semibold">(earn $26.00 / £18.00 / €22.00)</span></p>
            <p className="text-navy text-sm"><strong>Complete Library</strong> — All 7 packages included. $219.99 / £149.99 / €179.99 <span className="text-teal font-semibold">(earn $44.00 / £30.00 / €36.00)</span></p>
            <p className="text-navy/50 text-xs">Pricing is also available in CAD, AUD, and NZD. Customers see prices in their local currency at checkout.</p>
          </div>

          {/* Package Deep Dives */}
          <SectionHeading id="deep-dives">Package Deep Dives</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            Below is a closer look at each package, who it is perfect for, and how to naturally recommend it.
          </p>

          <Callout title="Always Share Your Affiliate Link">
            <p>When recommending a package, always finish by sharing your own unique affiliate link. This is the link from your dashboard — not the HomeSafeEducation website URL. Your affiliate link is how sales are tracked back to you.</p>
          </Callout>

          {/* Growing Minds */}
          <div className="border border-gray-100 rounded-2xl p-8 mb-8 bg-white">
            <p className="text-2xl mb-2">🌱</p>
            <h4 className="font-serif text-xl text-navy mb-3">Growing Minds (Ages 4–11)</h4>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">
              This is a <strong className="text-navy">2-in-1 package</strong> — customers get two full packages with this purchase. <strong className="text-navy">Early Years (Ages 4–7):</strong> 7 courses including road safety, body safety, online safety, anti-bullying, stranger danger, fire safety, and more. <strong className="text-navy">Junior (Ages 8–11):</strong> 6 courses covering the same core topics but written for older children. That is 13 courses and 59 lessons in total, with 72 original songs.
            </p>
            <p className="text-navy/60 text-sm mb-3"><strong className="text-navy">Who is this for?</strong> Parents, grandparents, aunties, uncles, godparents — anyone buying a meaningful gift for a child.</p>
            <div className="bg-slate rounded-xl p-4">
              <p className="text-navy/50 text-xs italic">"Not sure if you've come across this, but there's a package called Growing Minds that has courses for kids on things like body safety, stranger danger, online safety — all the stuff that's really hard to explain to little ones. It's written in language they actually understand, and it also includes music that's actually fun to listen to."</p>
            </div>
          </div>

          {/* Street Smart */}
          <div className="border border-gray-100 rounded-2xl p-8 mb-8 bg-white">
            <p className="text-2xl mb-2">🥷</p>
            <h4 className="font-serif text-xl text-navy mb-3">Street Smart (Ages 12–17)</h4>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">
              Six courses covering personal safety and awareness, online safety and social media, healthy relationships and boundaries, peer pressure and substance awareness, mental health and emotional wellbeing, and weapons awareness.
            </p>
            <p className="text-navy/60 text-sm mb-3"><strong className="text-navy">Who is this for?</strong> Parents of teenagers, older siblings, grandparents, anyone who knows a teenager starting secondary school.</p>
            <div className="bg-slate rounded-xl p-4">
              <p className="text-navy/50 text-xs italic">"There's a package called Street Smart that has courses for teenagers on things like online safety, peer pressure, relationships — even weapons awareness. It's done in a way that actually speaks to them rather than lecturing."</p>
            </div>
          </div>

          {/* Nest Breaking */}
          <div className="border border-gray-100 rounded-2xl p-8 mb-8 bg-white">
            <p className="text-2xl mb-2">🚀</p>
            <h4 className="font-serif text-xl text-navy mb-3">Nest Breaking (Ages 18–25)</h4>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">
              Four practical courses covering living independently, navigating social situations and nights out, spatial awareness and personal safety, and digital identity.
            </p>
            <p className="text-navy/60 text-sm mb-3"><strong className="text-navy">Who is this for?</strong> Anyone leaving home for the first time, young adults feeling uncertain, parents worried about their children going to university, a thoughtful milestone birthday gift.</p>
            <div className="bg-slate rounded-xl p-4">
              <p className="text-navy/50 text-xs italic">"There's a package called Nest Breaking that has courses on all the stuff nobody really teaches you when you leave home. Staying safe on nights out, living on your own, keeping yourself safe online."</p>
            </div>
          </div>

          {/* Roaming Free */}
          <div className="border border-gray-100 rounded-2xl p-8 mb-8 bg-white">
            <p className="text-2xl mb-2">🌍</p>
            <h4 className="font-serif text-xl text-navy mb-3">Roaming Free (All Ages)</h4>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">
              Five expert courses covering pre-trip planning, scam avoidance, health and emergencies, digital security, and high-risk situations abroad.
            </p>
            <p className="text-navy/60 text-sm mb-3"><strong className="text-navy">Who is this for?</strong> Anyone planning travel, parents preparing their child for a gap year, frequent travellers, retirees planning trips. A perfect "bon voyage" gift.</p>
            <div className="bg-slate rounded-xl p-4">
              <p className="text-navy/50 text-xs italic">"If you're heading off soon, there's a travel safety package called Roaming Free that has courses covering things like scams, staying safe in unfamiliar places, and keeping your tech secure."</p>
            </div>
          </div>

          {/* Aging Wisdom */}
          <div className="border border-gray-100 rounded-2xl p-8 mb-8 bg-white">
            <p className="text-2xl mb-2">🧠</p>
            <h4 className="font-serif text-xl text-navy mb-3">Aging Wisdom (Ages 60+)</h4>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">
              Five respectful, practical courses covering scam recognition, safe digital life, home and daily safety, financial protection, and staying well. Includes 25 original songs.
            </p>
            <p className="text-navy/60 text-sm mb-3"><strong className="text-navy">Who is this for?</strong> Adult children worried about parents being scammed, older adults wanting more tech confidence, carers, anyone who has seen a loved one nearly fall for a scam.</p>
            <div className="bg-slate rounded-xl p-4">
              <p className="text-navy/50 text-xs italic">"My nan keeps getting these scam calls and I found a package called Aging Wisdom that has courses teaching older people how to spot scams and stay safe online. It's really respectful — not patronising at all."</p>
            </div>
          </div>

          {/* Family Anchor */}
          <div className="border border-gray-100 rounded-2xl p-8 mb-8 bg-white">
            <p className="text-2xl mb-2">❤️</p>
            <h4 className="font-serif text-xl text-navy mb-3">Family Anchor (Parents & Carers)</h4>
            <p className="text-navy/70 text-sm leading-relaxed mb-3">
              Five specialist courses covering bullying, grooming and child protection, online safety for parents, drug and alcohol awareness, and mental health and eating disorders.
            </p>
            <p className="text-navy/60 text-sm mb-3"><strong className="text-navy">Who is this for?</strong> Parents at any stage, foster carers, adoptive parents, teachers, youth group leaders, anyone wanting to recognise warning signs.</p>
            <div className="bg-slate rounded-xl p-4">
              <p className="text-navy/50 text-xs italic">"I saw that you mentioned you were struggling to talk to your child about bullying — there's a package called Family Anchor that has courses on exactly that. There are also courses the children can do themselves which really helps break down those barriers."</p>
            </div>
          </div>

          {/* Selling in Context */}
          <SectionHeading id="selling">Selling in Context — Where and When to Share</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            The best promotion does not feel like promotion. It feels like <strong className="text-navy">someone sharing something genuinely helpful</strong>. The key is to share your link in places where people are already talking about the problems our courses solve.
          </p>

          <SubHeading>Respond to Real Conversations</SubHeading>
          <div className="space-y-4 mb-8">
            {[
              ['A parent in a Facebook group says they are struggling to talk to their child about body safety', 'Suggest Growing Minds for the children, or Family Anchor to help the parent.'],
              ['Someone on Reddit asks how to prepare their teenager for going out independently', 'Mention Street Smart — it covers personal awareness, peer pressure, and more.'],
              ['A YouTube video about travel safety has people asking for tips in the comments', 'Recommend Roaming Free — a full travel safety package covering scams to digital security.'],
              ['A parent mentions they are worried about their elderly mum falling for scam calls', 'Point them to Aging Wisdom — it teaches older adults to recognise scams, written with real respect.'],
              ['Someone shares a gift guide like "meaningful gifts for parents"', 'A perfect place to comment with a genuine recommendation for the relevant package.'],
            ].map(([scenario, response]) => (
              <div key={scenario} className="bg-white border border-gray-100 rounded-xl p-5">
                <p className="text-navy text-sm font-medium mb-1">{scenario}</p>
                <p className="text-navy/60 text-sm">{response}</p>
              </div>
            ))}
          </div>

          <SubHeading>Great Places to Share</SubHeading>
          <div className="space-y-3 mb-8">
            {[
              ['Facebook & Instagram', 'Parenting groups, family safety discussions, travel communities. A personal story outperforms generic promotion every time.'],
              ['TikTok & YouTube', 'Short videos discussing safety topics or "things I wish I\'d known" work really well. Comment sections on relevant videos are great.'],
              ['Reddit & Forums', 'Mumsnet, Netmums, parenting subreddits, travel forums. Contribute genuinely and share your link when relevant.'],
              ['WhatsApp & DMs', 'A personal recommendation to a friend or family member is the most powerful form of marketing there is.'],
              ['Blogs & Websites', 'Write about the topics our courses cover and mention HomeSafeEducation as a resource.'],
            ].map(([platform, desc]) => (
              <div key={platform} className="flex gap-4">
                <div className="w-1.5 bg-teal/30 rounded-full flex-shrink-0 mt-1" style={{ minHeight: '1.5rem' }} />
                <div>
                  <p className="font-semibold text-navy text-sm">{platform}</p>
                  <p className="text-navy/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Callout title="Remember: It Is Not Just the People You Post To">
            <p>When you comment on a post, share in a group, or reply in a thread, it is not just the person you are talking to who sees it. Every other person reading that thread sees your recommendation too. A single well-placed, genuine comment can reach hundreds or even thousands of people.</p>
          </Callout>

          {/* Gifting */}
          <SectionHeading id="gifting">The Gifting Opportunity</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            Every package can be purchased and assigned to someone else. The buyer does not need to be the learner. Safety education is the gift that says "I care about you enough to give you something that actually matters."
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              ["Child's birthday or Christmas", 'Growing Minds'],
              ['Teenager becoming more independent', 'Street Smart'],
              ['Leaving home or starting university', 'Nest Breaking'],
              ['Heading on a trip or gap year', 'Roaming Free'],
              ["Parent or grandparent's birthday", 'Aging Wisdom'],
              ['Parents navigating difficult stages', 'Family Anchor'],
            ].map(([occasion, pkg]) => (
              <div key={occasion} className="bg-slate rounded-xl p-4">
                <p className="text-navy/60 text-xs">{occasion}</p>
                <p className="text-navy font-semibold text-sm">{pkg}</p>
              </div>
            ))}
          </div>

          {/* Music */}
          <SectionHeading id="music">About the Music</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-4">
            Every package includes <strong className="text-navy">original songs written and produced in-house</strong>. 184 original tracks across all packages, each one designed to reinforce the safety messages from the lessons. The songs come with full lyrics so learners can sing along.
          </p>
          <div className="space-y-3 mb-6">
            {[
              ['For younger children', 'Educational nursery rhymes — catchy, fun, and memorable. Children will want to sing them again and again.'],
              ['For teenagers', 'Produced to a standard teenagers would actually want to share with their friends. Real songs with real messages.'],
              ['For older adults', 'Songs they can enjoy that gently teach awareness. Respectful, uplifting, and easy to remember.'],
            ].map(([age, desc]) => (
              <div key={age} className="flex gap-4">
                <div className="w-1.5 bg-orange/30 rounded-full flex-shrink-0 mt-1" style={{ minHeight: '1.5rem' }} />
                <div>
                  <p className="font-semibold text-navy text-sm">{age}</p>
                  <p className="text-navy/60 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-navy/70 text-sm">Check out the song examples on the <Link href="/packages" className="text-teal hover:underline">packages page</Link>.</p>

          {/* How Link Works */}
          <SectionHeading id="link">How Your Affiliate Link Works</SectionHeading>
          <div className="space-y-4 mb-6">
            {[
              ['Step 1', 'A visitor clicks your affiliate link.'],
              ['Step 2', 'A 30-day tracking cookie is placed in their browser (last-click attribution).'],
              ['Step 3', 'If they purchase within 30 days, the sale is attributed to you.'],
              ['Step 4', 'You earn a flat 20% commission on the sale.'],
              ['Step 5', 'After a 14-day clearance period (to allow for refunds), the commission is marked as payable.'],
              ['Step 6', 'Payouts are processed monthly (1st–3rd of each month) via Stripe once you reach the minimum threshold ($25 / £25 / €25).'],
            ].map(([step, desc]) => (
              <div key={step} className="flex gap-4 items-start">
                <span className="bg-teal text-white text-xs font-bold px-2.5 py-1 rounded-lg flex-shrink-0">{step}</span>
                <p className="text-navy/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <Callout title="Your Affiliate Link Never Expires">
            <p>Once you receive your affiliate link, it is yours permanently. It does not expire, and you can use it for as long as you are part of the programme. The 30-day window refers only to the tracking cookie placed in a visitor's browser.</p>
          </Callout>

          {/* Promotion Rules */}
          <SectionHeading id="promote">How to Promote Without Getting Flagged</SectionHeading>
          <Callout title="Golden Rule">
            <p>If your message looks like it was copy-and-pasted, it will be treated as spam. Every comment, post, and message should sound like it was written by a real person — because it should be.</p>
          </Callout>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <p className="font-semibold text-green-800 text-sm mb-3">Do</p>
              <div className="space-y-2 text-green-800/80 text-sm">
                <p>Write every post in your own words</p>
                <p>Vary your language across platforms</p>
                <p>Add genuine value before sharing a link</p>
                <p>Be transparent about affiliate links if you wish</p>
                <p>Match the tone of the platform</p>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <p className="font-semibold text-red-800 text-sm mb-3">Do Not</p>
              <div className="space-y-2 text-red-800/80 text-sm">
                <p>Copy-paste the same message across platforms</p>
                <p>Drop bare links with no context</p>
                <p>Post where promotion is banned</p>
                <p>Send unsolicited bulk messages</p>
                <p>Create fake accounts or fake reviews</p>
                <p>Use fear-based language like "Your child is in danger!"</p>
              </div>
            </div>
          </div>

          {/* Important */}
          <SectionHeading id="important">Important to Know</SectionHeading>
          <div className="space-y-3 mb-8">
            {[
              ['Self-referral', 'Not permitted. Purchasing through your own link will result in commission being voided and may lead to removal.'],
              ['Paid search restriction', 'You may not bid on "HomeSafeEducation" or brand name variations in paid search advertising.'],
              ['No cookie stuffing', 'Iframes, pop-unders, auto-redirects, or any method that places cookies without genuine user intent are prohibited.'],
              ['Refund window', 'Customers have a 7-day refund window. If a sale is refunded, the associated commission is reversed.'],
              ['Minimum payout', 'Commissions are paid monthly once your balance reaches $25 / £25 / €25 equivalent.'],
              ['Brand representation', 'You are representing HomeSafeEducation. All promotion must be honest, respectful, and aligned with our values.'],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white border border-gray-100 rounded-xl p-5">
                <p className="text-navy text-sm font-medium mb-1">{title}</p>
                <p className="text-navy/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-navy/70 text-sm mb-8">
            View the full <Link href="/affiliates/terms" className="text-teal hover:underline">Affiliate Terms & Conditions</Link>.
          </p>

          {/* Everyone Knows Someone */}
          <SectionHeading id="everyone">Everyone Knows Someone</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-4">
            This is the single most important thing to remember: <strong className="text-navy">everyone knows someone who could benefit from this product</strong>. Think about your own life:
          </p>
          <div className="bg-slate rounded-2xl p-6 mb-6 space-y-2">
            {[
              'Do you know a parent with young children?',
              'Do you know a teenager who spends hours on social media?',
              'Do you know someone heading off to university or their first flat?',
              'Do you know someone planning a holiday or a gap year?',
              'Do you know an older parent or grandparent who might be vulnerable to scams?',
            ].map((q) => (
              <p key={q} className="text-navy/70 text-sm">{q}</p>
            ))}
          </div>
          <p className="text-navy/70 text-base leading-relaxed mb-8">
            The answer to at least one of those is yes. <strong className="text-navy">That is your starting point.</strong> You do not need a massive audience. You need genuine conversations with real people about something that genuinely matters. You are not pushing a product — you are sharing the gift of reassurance, safety, and love.
          </p>

          {/* Contact */}
          <SectionHeading id="contact">We Are Here to Help</SectionHeading>
          <p className="text-navy/70 text-base leading-relaxed mb-6">
            If you have any questions at all — whether about the product, how to promote it, how your commission works, or anything else — please do not hesitate to reach out. We want you to feel confident and supported every step of the way.
          </p>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 space-y-3">
            <p className="text-navy text-sm"><strong>Email:</strong> <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a></p>
            <p className="text-navy text-sm"><strong>Affiliate Dashboard:</strong> <a href="https://numok-production.up.railway.app/login" className="text-teal hover:underline" target="_blank" rel="noopener noreferrer">numok-production.up.railway.app/login</a></p>
            <p className="text-navy text-sm"><strong>Website:</strong> <Link href="/" className="text-teal hover:underline">homesafeeducation.com</Link></p>
            <p className="text-navy text-sm"><strong>Free Lesson Example:</strong> <Link href="/example" className="text-teal hover:underline">homesafeeducation.com/example</Link></p>
            <p className="text-navy text-sm"><strong>Affiliate Terms:</strong> <Link href="/affiliates/terms" className="text-teal hover:underline">homesafeeducation.com/affiliates/terms</Link></p>
          </div>

          {/* Closing */}
          <div className="text-center py-12 border-t border-gray-100">
            <p className="font-serif text-2xl text-navy mb-3">Thank you for being part of this.</p>
            <p className="text-navy/60 text-base italic">Together, we are putting life-changing safety education within reach of every family.</p>
            <p className="text-navy/40 text-sm mt-4">— The HomeSafeEducation Team</p>
          </div>

          {/* Download option */}
          <div className="text-center pb-8">
            <a href="/affiliate-welcome-guide.docx" download className="text-teal text-sm hover:underline">
              Prefer a document? Download the Welcome Guide (.docx)
            </a>
          </div>

        </div>
      </section>
    </div>
  )
}
