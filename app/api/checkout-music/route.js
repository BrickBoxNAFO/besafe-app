import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'
import { getMusicStripePriceId } from '@/lib/stripe'

/* ────────────────────────────────────────────
   Music Download Checkout
   Creates a Stripe Checkout session for a
   one-time music collection purchase.
   Region-aware pricing (USD, GBP, EUR, etc.)
   ──────────────────────────────────────────── */

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const { productId, productName, region: clientRegion } = await request.json()

    // Determine region from cookie or client-sent value
    const cookieRegion = request.cookies.get('pricing_region')?.value
    const regionCode = cookieRegion || clientRegion || 'US'

    const priceId = getMusicStripePriceId(productId, regionCode)
    if (!priceId) {
      console.error('No music price ID found for', productId, regionCode)
      return NextResponse.json(
        { error: 'Music product not yet configured. Please check back soon.' },
        { status: 503 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
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
        region: regionCode,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Music checkout error:', err.message || err)
    return NextResponse.json({ error: err.message || 'Checkout failed' }, { status: 500 })
  }
}
