import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'
import { getStripePriceId, getStripeCurrency } from '@/lib/stripe'
import { countryToRegion } from '@/lib/pricing'

export async function POST(request) {
  // Payments not yet active - return 503 until Stripe is live
  return NextResponse.json(
    { error: 'Payments are not yet active. Please check back soon.' },
    { status: 503 }
  )

  // The below will be activated when Stripe goes live:
  /*
  const { packageId, region: clientRegion } = await request.json()

  // Determine region from cookie or client-sent value
  const cookieRegion = request.cookies.get('pricing_region')?.value
  const regionCode = cookieRegion || clientRegion || 'US'

  const priceId = getStripePriceId(packageId, regionCode)
  if (!priceId) return NextResponse.json({ error: 'Invalid package' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const currency = getStripeCurrency(regionCode)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    currency,
    success_url: process.env.NEXT_PUBLIC_SITE_URL + '/dashboard?purchase=success',
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL + '/packages',
    customer_email: user.email,
    metadata: { userId: user.id, packageId, region: regionCode },
  })
  return NextResponse.json({ url: session.url })
  */
}
