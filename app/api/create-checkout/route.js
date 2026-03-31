import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const PRICE_MAP = {
  growing: process.env.STRIPE_PRICE_GROWING_MINDS,
  nest: process.env.STRIPE_PRICE_NEST_BREAKING,
  roaming: process.env.STRIPE_PRICE_ROAMING_FREE,
  aging: process.env.STRIPE_PRICE_AGING_WISDOM,
  parents: process.env.STRIPE_PRICE_FAMILY_ANCHOR,
  street: process.env.STRIPE_PRICE_STREET_SMART,
  bundle: process.env.STRIPE_PRICE_BUNDLE,
}

export async function POST(request) {
  // Payments not yet active - return 503 until Stripe is live
  return NextResponse.json(
    { error: 'Payments are not yet active. Please check back soon.' },
    { status: 503 }
  )

  // The below will be activated when Stripe goes live:
  /*
  const { packageId } = await request.json()
  const priceId = PRICE_MAP[packageId]
  if (!priceId) return NextResponse.json({ error: 'Invalid package' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: process.env.NEXT_PUBLIC_SITE_URL + '/dashboard?purchase=success',
    cancel_url: process.env.NEXT_PUBLIC_SITE_URL + '/packages',
    customer_email: user.email,
    metadata: { userId: user.id, packageId },
  })
  return NextResponse.json({ url: session.url })
  */
}
