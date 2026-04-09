import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
  title: 'Purchase Successful',
  description: 'Thank you for your purchase! Your safety education courses are now available.',
}

export default async function PurchaseSuccessPage({ searchParams }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const params = await searchParams
  const purchaseType = params?.type || 'self'
  const packageName = params?.package || 'your package'
  const recipientEmail = params?.email || ''
  const isGift = purchaseType === 'gift'
  const isGiftLater = purchaseType === 'gift_later'
  const isBundle = purchaseType === 'bundle'

  const heroEmoji = isGift ? '🎁' : isGiftLater ? '🕐' : '🎉'
  const heroTitle = isGift ? 'Gift Sent Successfully!' : isGiftLater ? 'Payment Successful!' : 'Payment Successful!'
  const heroSubtitle = isGift
    ? `Your gift of ${packageName} is on its way.`
    : isGiftLater
    ? `Your seat for ${packageName} is ready to assign.`
    : `You now have access to ${packageName}.`

  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-14 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-4">{heroEmoji}</div>
          <h1 className="font-serif text-4xl lg:text-5xl text-white mb-3">
            {heroTitle}
          </h1>
          <p className="text-white/60 text-lg">
            {heroSubtitle}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-6 relative z-10 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Confirmation icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {isGiftLater ? (
              <>
                <h2 className="font-serif text-2xl text-navy text-center mb-4">Your seat is ready to assign</h2>
                <div className="bg-navy/5 rounded-xl p-5 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-navy/50">Package</span>
                      <span className="font-semibold text-navy">{packageName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy/50">Status</span>
                      <span className="font-semibold text-purple-600">Ready to assign</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-navy text-sm">What happens next?</h3>
                  <div className="space-y-3">
                    {[
                      ['1', 'A seat has been created on your dashboard for this package.'],
                      ['2', 'When you\'re ready, visit your dashboard and assign it — either to yourself or send an invite to someone else.'],
                      ['3', 'There\'s no time limit. The seat is yours until you assign it.'],
                    ].map(([num, text]) => (
                      <div key={num} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{num}</span>
                        </div>
                        <p className="text-navy/60 text-sm leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-navy/50 text-sm text-center mb-6">
                  We've sent a confirmation email to <strong>{user.email}</strong> with your order details.
                </p>
              </>
            ) : isGift ? (
              <>
                <h2 className="font-serif text-2xl text-navy text-center mb-4">Your gift has been sent</h2>
                <div className="bg-navy/5 rounded-xl p-5 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-navy/50">Package</span>
                      <span className="font-semibold text-navy">{packageName}</span>
                    </div>
                    {recipientEmail && (
                      <div className="flex justify-between">
                        <span className="text-navy/50">Sent to</span>
                        <span className="font-semibold text-navy">{recipientEmail}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-navy/50">Status</span>
                      <span className="font-semibold text-green-600">Invite email sent</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-navy text-sm">What happens next?</h3>
                  <div className="space-y-3">
                    {[
                      ['1', 'We\'ve sent an invite email to the recipient with a personal link to claim their course.'],
                      ['2', 'They\'ll create a free account (or log into their existing one) and the course unlocks instantly.'],
                      ['3', 'It\'s completely free for them — your payment covers everything.'],
                    ].map(([num, text]) => (
                      <div key={num} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{num}</span>
                        </div>
                        <p className="text-navy/60 text-sm leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 mb-6">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Important:</strong> Please let the recipient know to check their spam or junk folder if they don't see the email within a few minutes. The email is sent from <strong>hello@homesafeeducation.com</strong>.
                  </p>
                </div>

                <p className="text-navy/50 text-sm text-center mb-6">
                  You'll also receive a confirmation email with your order details and receipt.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-serif text-2xl text-navy text-center mb-4">Your course is ready</h2>
                <div className="bg-navy/5 rounded-xl p-5 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-navy/50">Package</span>
                      <span className="font-semibold text-navy">{packageName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy/50">Status</span>
                      <span className="font-semibold text-green-600">Unlocked</span>
                    </div>
                  </div>
                </div>

                <p className="text-navy/60 text-sm text-center mb-4 leading-relaxed">
                  Your course has been unlocked and is ready to start. Head to your dashboard to begin learning at your own pace.
                </p>

                <p className="text-navy/50 text-sm text-center mb-6">
                  We've also sent a confirmation email to <strong>{user.email}</strong> with your order details.
                </p>
              </>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {isGiftLater ? (
                <>
                  <Link href="/family" className="flex-1 btn-primary text-center py-3">
                    Go to My Dashboard
                  </Link>
                  <Link href="/packages" className="flex-1 bg-navy/10 hover:bg-navy/15 text-navy font-semibold rounded-xl py-3 text-center transition-colors text-sm">
                    Browse More Packages
                  </Link>
                </>
              ) : isGift ? (
                <>
                  <Link href="/packages" className="flex-1 btn-primary text-center py-3">
                    Back to Packages
                  </Link>
                  <Link href="/dashboard" className="flex-1 bg-navy/10 hover:bg-navy/15 text-navy font-semibold rounded-xl py-3 text-center transition-colors text-sm">
                    Go to My Dashboard
                  </Link>
                </>
              ) : isBundle ? (
                <>
                  <Link href="/family" className="flex-1 btn-primary text-center py-3">
                    Go to Family Dashboard
                  </Link>
                  <Link href="/dashboard" className="flex-1 bg-navy/10 hover:bg-navy/15 text-navy font-semibold rounded-xl py-3 text-center transition-colors text-sm">
                    Go to My Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="flex-1 btn-primary text-center py-3">
                    Go to My Dashboard
                  </Link>
                  <Link href="/packages" className="flex-1 bg-navy/10 hover:bg-navy/15 text-navy font-semibold rounded-xl py-3 text-center transition-colors text-sm">
                    Browse More Packages
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
