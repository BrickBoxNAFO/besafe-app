import { NextResponse } from 'next/server'
import { stripe, PRICE_IDS } from '@/lib/stripe'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function POST(request) {
  try {
    const { packageId } = await request.json()

    // Verify user is authenticated
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const priceId = PRICE_IDS[packageId]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 })
    }

    // Check if already purchased
    const { data: existing } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('package_id', packageId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'Already purchased' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        package_id: packageId,
        is_bundle: packageId === 'bundle' ? 'true' : 'false',
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
