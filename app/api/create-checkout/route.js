import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'
import { getStripePriceId } from '@/lib/stripe'
import { PACKAGES } from '@/lib/data'

export async function POST(request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  // Only allow test user(s) to purchase while payments are in testing mode
  const testEmails = (process.env.TEST_USER_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  const paymentsLive = process.env.PAYMENTS_LIVE === 'true'

  if (!paymentsLive && !testEmails.includes(user.email.toLowerCase())) {
    return NextResponse.json(
      { error: 'Payments are not yet active. Please check back soon.' },
      { status: 503 }
    )
  }

  const { packageId, region: clientRegion, purchaseType, giftRecipientName, giftRecipientEmail } = await request.json()

  // Determine region from cookie or client-sent value
  const cookieRegion = request.cookies.get('pricing_region')?.value
  const regionCode = cookieRegion || clientRegion || 'US'

  const priceId = getStripePriceId(packageId, regionCode)
  if (!priceId) return NextResponse.json({ error: 'Invalid package' }, { status: 400 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const pkg = PACKAGES.find(p => p.id === packageId)
  const packageName = pkg?.name || packageId

  const isGift = purchaseType === 'gift'
  const isGiftLater = purchaseType === 'gift_later'
  const isBundle = packageId === 'bundle' || packageId === 'complete'

  // Build success URL with confirmation params
  const successParams = new URLSearchParams({
    type: isGift ? 'gift' : isGiftLater ? 'gift_later' : isBundle ? 'bundle' : 'self',
    package: packageName,
  })
  if (isGift && giftRecipientEmail) {
    successParams.set('email', giftRecipientEmail)
  }
  const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/purchase-success?${successParams.toString()}`

  // Build Stripe metadata
  const metadata = {
    userId: user.id,
    packageId,
    region: regionCode,
    purchaseType: isGift ? 'gift' : isGiftLater ? 'gift_later' : 'self',
    is_bundle: isBundle ? 'true' : 'false',
  }
  if (isGift) {
    metadata.giftRecipientName = giftRecipientName || ''
    metadata.giftRecipientEmail = giftRecipientEmail || ''
    metadata.gifterName = user.user_metadata?.name || user.email?.split('@')[0] || 'Someone special'
  }
  if (isGiftLater) {
    metadata.gifterName = user.user_metadata?.name || user.email?.split('@')[0] || 'Someone special'
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL + '/packages',
    customer_email: user.email,
    metadata,
  })
  return NextResponse.json({ url: session.url })
}
