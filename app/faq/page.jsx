'use client'
import { useState } from 'react'
import Link from 'next/link'
import NewsletterBanner from '@/components/NewsletterBanner'

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate/50 transition-colors"
      >
        <span className="font-semibold text-navy text-[15px] pr-4">{question}</span>
        <span className={`text-teal text-xl flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 -mt-1">
          <p className="text-navy/60 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

const faqSections = [
  {
    title: 'Purchases & Payments',
    emoji: '💳',
    items: [
      {
        q: 'How do I purchase a package?',
        a: 'Choose your package on the Packages page and proceed to our secure checkout powered by Stripe. All packages are a one-time payment with no subscriptions or recurring charges. When purchasing a single package you have three options: assign it to yourself for instant access, gift it now by entering the recipient\'s email address, or buy it now and assign it later from your dashboard when you are ready.'
      },
      {
        q: 'Can I buy a single package as a gift?',
        a: 'Yes. Every one of our 7 individual packages can be purchased as a one-off gift. At checkout, choose "Gift to someone else", enter their email, and we will send them a personal invitation to create a free account and claim the package. The package will also appear on your own dashboard as "Packages you bought for others" so you can see it is claimed, and you will receive a copy of their certificate when they complete the package.'
      },
      {
        q: 'What is the "Assign Later" option?',
        a: 'When you buy a single package you can choose "Assign Later" instead of giving it to yourself or someone specific. This creates a seat on your dashboard that you can assign whenever you are ready — either to yourself with one click, or to someone else via email invite. There is no time limit. The seat is yours until you assign it.'
      },
      {
        q: 'Can I purchase a package as a gift for someone else?',
        a: 'Yes. You have two options. You can gift it now by entering the recipient\'s email address during checkout (they will receive a personal invitation with a unique link to create their free account and access the course immediately). Or you can choose "Assign Later" to purchase now and send the invite whenever you are ready from your dashboard.'
      },
      {
        q: 'What is the Family Safety Bundle?',
        a: 'The Family Safety Bundle gives you 5 flexible seats to share with family members. Each seat can be assigned to yourself (to unlock a package instantly) or to a friend or family member via email invite. You can assign the same package to multiple seats if you want all your family members to take the same course. Each person gets their own account, login, and individual progress tracking. Visit our Packages page for current pricing.'
      },
      {
        q: 'How do I assign packages to family members after buying the bundle?',
        a: 'After purchase, go to your Family Dashboard where you\'ll see your 5 seats. For each seat, you can either assign it to yourself (pick a package and get instant access) or assign it to a family member. To invite a family member, click on an empty seat, choose which package to assign, enter their name and email address, and send the invite. They\'ll receive a personal email invitation with a unique link.'
      },
      {
        q: 'Can I assign the same package to more than one family member?',
        a: 'Yes. Each of the 5 seats in the bundle can be assigned any package, including the same one. For example, you could assign Street Smart to two different teenagers.'
      },
      {
        q: 'What happens after I purchase a package or bundle?',
        a: 'If you purchased for yourself, the course unlocks on your dashboard immediately. If you gifted it, the recipient receives an email invite and it shows on your dashboard as an outstanding gift. If you chose "Assign Later", a seat is created on your dashboard that you can assign to yourself or send to someone else whenever you are ready. If you purchased the Family Safety Bundle, you will be redirected to your Family Dashboard where you can assign your 5 seats. You can return to your dashboard anytime from your account menu.'
      },
      {
        q: 'What is the Complete Library?',
        a: 'The Complete Library gives you access to all 7 packages at a significantly reduced price compared to buying them individually. It works the same way as the Family Safety Bundle but gives you 7 flexible seats to share, one for each package. Visit our Packages page for current pricing.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as Apple Pay, Google Pay, and PayPal. Apple Pay and Google Pay are available when you check out on a supported device. All payments are processed securely through Stripe. Prices are shown in your local currency where supported (USD, GBP, EUR, CAD, AUD, NZD).'
      },
      {
        q: 'Will I be charged again after purchasing?',
        a: 'No. All purchases are one-time payments. There are no subscriptions, hidden fees, or recurring charges.'
      },
    ]
  },
  {
    title: 'Course Access & Progress',
    emoji: '📚',
    items: [
      {
        q: 'How do the lessons actually work?',
        a: <span>Each lesson includes written content tailored to the age group, key takeaways, quiz questions to reinforce learning, and for selected packages, original music with full lyrics. You can <Link href="/example" className="text-teal font-semibold hover:underline">try a lesson for free</Link> to see exactly how it works before you buy.</span>
      },
      {
        q: 'How do I access my courses after purchasing?',
        a: 'Log in to your account and go to your Dashboard. Your purchased courses will appear in your Course Library, ready to start.'
      },
      {
        q: 'Can I retake a course after completing it?',
        a: 'Yes. Your courses remain available to you after completion. You can revisit any lesson or retake the full course at any time from your Dashboard.'
      },
      {
        q: 'How does progress tracking work?',
        a: 'The system tracks which lessons you have completed and your quiz results. You can see your overall completion percentage on your Dashboard. For Family Bundle owners, you can also view the progress of each family member from the Family Dashboard.'
      },
      {
        q: 'Do the courses have tests or quizzes?',
        a: 'Yes. Each lesson includes quiz questions to check your understanding of the material. These are designed to reinforce what you have learned, not to catch you out.'
      },
      {
        q: 'Can I complete courses at my own pace?',
        a: 'Absolutely. There are no time limits or deadlines. You can work through the lessons whenever it suits you and pick up where you left off.'
      },
      {
        q: 'What devices can I use to access the courses?',
        a: 'The courses work on any device with a modern web browser, including phones, tablets, laptops, and desktop computers. No installs are required.'
      },
    ]
  },
  {
    title: 'Certificates',
    emoji: '🎓',
    items: [
      {
        q: 'Do I get a certificate for completing a package?',
        a: 'Yes. Once every lesson in every course in the package has been passed, we automatically generate a personalised Certificate of Completion as a PDF, email it to you, and store a copy on our system. You receive exactly one certificate per package — not one per course.'
      },
      {
        q: 'If I bought a package as a gift, does the buyer also get the certificate?',
        a: 'Yes. When the recipient finishes the package, they receive the certificate directly, and we also send a courtesy copy to the person who purchased the package. This works for one-off single-package gifts as well as gifts given through the Family Safety Bundle or Complete Library.'
      },
      {
        q: 'Is my name printed on the certificate?',
        a: 'Yes. Your full name (from your account) and the package name are both printed on the certificate along with the completion date. If you need to update how your name appears, edit it in your account settings before finishing the package.'
      },
      {
        q: 'Can I re-download an old certificate?',
        a: 'The certificate PDF is emailed to you when it is issued. If you need a fresh copy, email Support@HomeSafeEducation.com with the package name and we will resend it.'
      },
    ]
  },
  {
    title: 'Family Bundle & Sharing',
    emoji: 'family_bundle',
    items: [
      {
        q: 'How does the Family Bundle work?',
        a: 'After purchasing the Family Safety Bundle, you get access to your Family Dashboard where you manage 5 flexible seats. For each seat, you can assign yourself a package (and unlock it instantly) or assign a family member a package via email invite. When you invite someone, they create a free account and get instant access to their assigned package. Each person gets their own login, their own dashboard, and their own progress tracking. You can see all seats and everyone\'s progress on the Family Dashboard.'
      },
      {
        q: 'What happens when I send a family member an invite?',
        a: 'They receive an email with a personal invitation link. This link is unique and single-use. When they click it, they are taken to a page where they create their free account using their email address. Once they complete registration, the package you assigned to that seat appears on their dashboard immediately with full access. They do not need to pay anything. Everything is covered by your original Family Bundle purchase.'
      },
      {
        q: 'Can I change which package is assigned to a family member?',
        a: 'Seat assignments are made when you invite a family member. If you need to make changes, contact our support team at Support@HomeSafeEducation.com and we will help you.'
      },
      {
        q: 'Does each family member need their own email address?',
        a: 'Yes. Each family member needs a unique email address to create their account and receive their invitation.'
      },
      {
        q: 'Do family members get their own dashboard and progress tracking?',
        a: 'Yes. Each family member has their own personal dashboard where they can see their assigned course(s) and track their own progress independently. As the bundle owner, you can see everyone\'s progress from your Family Dashboard. Each person\'s progress is kept separate and private to their account.'
      },
      {
        q: 'Do family members have to pay anything?',
        a: 'No. All family members invited through the Family Safety Bundle or Complete Library get free access to their assigned course(s). There are no additional charges. Everything is covered by your original purchase.'
      },
    ]
  },
  {
    title: 'Songs, Downloads & Bonus Content',
    emoji: '🎵',
    items: [
      {
        q: 'Which packages include songs?',
        a: 'Every package includes original songs written specifically for the learner group. Packages with bonus song ZIPs available for download are Growing Minds, Street Smart, Nest Breaking, Roaming Free, Forever Family (older adults) and Family Anchor (for parents).'
      },
      {
        q: 'How do I download the song pack?',
        a: 'Once you complete the final course in a package, you will see a download link on the Congratulations page and in your completion email. Click the link and the ZIP file is delivered from our Cloudflare storage.'
      },
      {
        q: 'Can I share the song ZIPs with other people?',
        a: 'The song packs are for personal and family use only. Redistribution, re-uploading, or sharing the files outside your household is not permitted under our Terms.'
      },
      {
        q: 'Can I preview the songs before buying?',
        a: 'Yes. Visit the Buy Music page or our Blog from the footer to hear previews of songs from several packages.'
      },
    ]
  },
  {
    title: 'Refunds & Billing',
    emoji: '🧾',
    items: [
      {
        q: 'Can I get a refund?',
        a: 'Yes. We offer a full refund within 7 days of purchase, provided less than 20 percent of the overall package has been completed. Package progress is tracked across every course in the package, not each course individually. To request a refund, email Support@HomeSafeEducation.com with your order number and a brief reason (optional). Approved refunds are returned to your original payment method within 10 business days (your bank may take longer to post the funds).'
      },
      {
        q: 'What counts as 20% completion for the refund policy?',
        a: 'It is 20% of the overall package you purchased, not 20% of a single course. For example, a package with 10 lessons across 3 courses would hit the 20% threshold after 2 lessons passed, regardless of which course they were in. Once overall package progress exceeds 20%, the purchase is considered fulfilled and a refund is no longer available.'
      },
      {
        q: 'Do EU, EEA, or UK customers have extra refund rights?',
        a: 'You may benefit from additional statutory rights under the Consumer Rights Directive, including a 14-day cooling-off period for distance contracts. However, for digital content and online courses your right of withdrawal may expire once you give express consent to immediate supply and begin accessing the material. Your statutory rights take priority where they provide greater protection.'
      },
      {
        q: 'What happens to my access if a refund is approved?',
        a: 'Access to the refunded package is revoked shortly after the refund is processed, and you will no longer be able to view lessons or download bonus materials (including song ZIPs) from that package. Any bonus downloads already saved should be deleted in line with our Terms.'
      },
      {
        q: 'Do discounted or promotional purchases qualify for a refund?',
        a: 'Promotional or discounted purchases are not refundable unless otherwise stated at checkout. All other conditions (7-day window, 20% package completion) continue to apply.'
      },
    ]
  },
  {
    title: 'Privacy, Children & Safeguarding',
    emoji: '🛡️',
    items: [
      {
        q: 'Is my data kept private?',
        a: 'Yes. We only store the personal information we need to deliver the courses (your name, email, progress, and purchase history). See our Privacy Policy for the full details.'
      },
      {
        q: 'Are the children\'s courses appropriate for young learners?',
        a: 'Yes. Our Growing Minds package is written specifically for children aged 4 to 11, split into Early Years (4-7) and Junior (8-11). We recommend younger children complete lessons alongside a parent or carer. We comply with COPPA where applicable and age-gate sensitive content.'
      },
      {
        q: 'Do you hold sensitive personal data on children?',
        a: 'We keep child-account data to the minimum required to deliver progress and certificates. See our Safeguarding page and Privacy Policy for details on how we handle children\'s accounts.'
      },
      {
        q: 'How do I request my data or delete my account?',
        a: 'Email Support@HomeSafeEducation.com with "Data Access Request" or "Account Deletion" in the subject line and we will action your request within the statutory response window.'
      },
    ]
  },
  {
    title: 'Account & Technical',
    emoji: '⚙️',
    items: [
      {
        q: 'How do I reset my password?',
        a: 'On the login page, click "Forgot password?" and enter your email address. You will receive a link to create a new password. The reset link expires after 24 hours for your security.'
      },
      {
        q: 'I did not receive my confirmation email. What should I do?',
        a: 'Check your spam or junk folder first. If it is not there, email Support@HomeSafeEducation.com and we will resend it.'
      },
      {
        q: 'Can I change the email address on my account?',
        a: 'Yes. Go to Account Settings, enter the new email address, and confirm the change from the verification email we send to it.'
      },
      {
        q: 'How do I contact support?',
        a: 'Email us at Support@HomeSafeEducation.com. We respond within 1 to 2 business days, Monday to Friday.'
      },
      {
        q: 'What if something goes wrong during checkout?',
        a: 'If your card is declined or checkout fails, no charge is taken. If a payment shows as pending for more than a few minutes, email Support@HomeSafeEducation.com with the time of the attempt and we will investigate.'
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">FAQ</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            Frequently Asked<br />
            <span className="italic text-teal">Questions.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Everything you need to know about our courses, packages, family sharing, and more.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      {faqSections.map((section) => (
        <section key={section.title} className="py-16 odd:bg-white even:bg-slate/30">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">{section.emoji === 'family_bundle' ? <><span className="hidden sm:inline">👨‍👩‍👧‍👦</span><span className="sm:hidden">🏠</span></> : section.emoji}</span>
              <h2 className="font-serif text-3xl text-navy">{section.title}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Try a lesson CTA */}
      <section className="py-16 bg-gradient-to-r from-teal/10 to-teal2/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-4xl mb-4 block">📖</span>
          <h2 className="font-serif text-3xl text-navy mb-3">Still not sure? See it for yourself.</h2>
          <p className="text-navy/60 text-base leading-relaxed mb-6 max-w-xl mx-auto">
            The best way to understand what we offer is to experience it. Try a complete lesson for free - no account needed.
          </p>
          <Link href="/example" className="btn-primary text-base px-8 py-3">Try a Free Lesson</Link>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterBanner />

      {/* Bottom Navigation Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-navy mb-4">Explore More</h2>
            <p className="text-navy/60 text-lg">Find what you need across our site.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/packages" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">📦</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">Our Packages</p>
              <p className="text-navy/40 text-xs leading-relaxed">Browse all 7 packages and find the right course for you or your family.</p>
            </Link>
            <Link href="/about" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">🏠</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">About Us</p>
              <p className="text-navy/40 text-xs leading-relaxed">Learn about our mission and the team behind HomeSafeEducation.</p>
            </Link>
            <Link href="/contact" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">💬</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">Contact Us</p>
              <p className="text-navy/40 text-xs leading-relaxed">Have a question we have not covered? Our support team is here to help.</p>
            </Link>
            <Link href="/refunds" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">📋</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">Refund Policy</p>
              <p className="text-navy/40 text-xs leading-relaxed">Read the full details of our 7-day refund policy.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
