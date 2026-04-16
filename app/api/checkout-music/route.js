import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getMusicStripePriceId } from '@/lib/stripe'
import { countryToRegion } from '@/lib/pricing'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function POST(request) {
  try {
    const { userId, email, productId, productName, region } = await request.json()

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get region code
    const regionCode = region || 'US'

    // Get the Stripe price ID for this product and region
    const priceId = getMusicStripePriceId(productId, regionCode)

    if (!priceId) {
      return NextResponse.json(
        { error: `No price configured for ${productId} in ${regionCode}` },
        { status: 400 }
      )
    }

    // FIX: was NEXT_PUBLIC_APP_URL (doesn't exist) — now uses NEXT_PUBLIC_SITE_URL
    // which matches every other route in the codebase and is set in Vercel env vars
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/music-success?product=${productId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/congratulations/${productId}`,
      metadata: {
        type: 'music_download',
        user_id: userId,
        product_id: productId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
