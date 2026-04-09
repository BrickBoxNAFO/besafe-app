import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

/* ────────────────────────────────────────────
   Music Download Checkout
   Creates a Stripe Checkout session for a
   one-time music collection purchase ($4.99).
   ──────────────────────────────────────────── */

// Map product IDs to Stripe price IDs (set these in your Stripe dashboard)
const MUSIC_PRICE_MAP = {
  'growing-early': process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY,
  'growing-junior': process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR,
  'street':         process.env.STRIPE_PRICE_MUSIC_STREET_SMART,
}

export async function POST(request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { productId, productName } = await request.json()

  if (!productId || !MUSIC_PRICE_MAP[productId]) {
    return NextResponse.json({ error: 'Invalid music product' }, { status: 400 })
  }

  const priceId = MUSIC_PRICE_MAP[productId]
  if (!priceId) {
    return NextResponse.json(
      { error: 'Music product not yet configured. Please check back soon.' },
      { status: 503 }
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'paypal'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/music-success?product=${encodeURIComponent(productId)}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/library`,
    customer_email: user.email,
    metadata: {
      userId: user.id,
      type: 'music_download',
      productId,
      productName: productName || productId,
    },
  })

  return NextResponse.json({ url: session.url })
}
