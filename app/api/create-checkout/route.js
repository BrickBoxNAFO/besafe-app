import { NextResponse } from 'next/server'
import { stripe, PRICE_IDS, getStripePriceId } from '@/lib/stripe'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

/**
 * POST /api/create-checkout
 *
 * Body:
 *   {
 *     packageId: string,
 *     assignMode?: 'self' | 'gift' | 'later',   // default 'self'
 *     recipientEmail?: string,                  // required if assignMode==='gift'
 *     recipientName?: string,
 *   }
 *
 * For the Family Safety Bundle and Complete Library (packageId === 'bundle' |
 * 'complete'), assignMode is ignored — those packages are always assignable
 * seats via the Family Dashboard. For any other (single) package, the three
 * intent values map to the webhook behaviour:
 *
 *   self   — create a purchases row + a seats row where owner == member == buyer.
 *   gift   — create a seats row with owner = buyer, invite_token set, invite
 *            email fired to the recipient so they can claim the seat.
 *   later  — create a seats row with owner = buyer, no member, no invite. Shows
 *            up in the dashboard as a pending seat the buyer can assign or gift
 *            at any time.
 */
export async function POST(request) {
  try {
    const {
      packageId,
      regionCode,
      assignMode,
      recipientEmail,
      recipientName,
    } = await request.json()

    // Verify user is authenticated
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const priceId = regionCode ? getStripePriceId(packageId, regionCode) : PRICE_IDS[packageId]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 })
    }

    const isAggregate = packageId === 'bundle' || packageId === 'complete'
    const mode = isAggregate ? 'self' : (assignMode || 'self')

    if (!['self', 'gift', 'later'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid assignMode' }, { status: 400 })
    }
    if (mode === 'gift' && !recipientEmail) {
      return NextResponse.json({ error: 'Recipient email required for gift' }, { status: 400 })
    }
    if (mode === 'gift' && recipientEmail?.toLowerCase() === user.email?.toLowerCase()) {
      return NextResponse.json({ error: 'You cannot gift to yourself. Choose "Assign to myself" instead.' }, { status: 400 })
    }

    // Check if already purchased (only block for self-assign — gifts & laters
    // can stack a second seat).
    if (mode === 'self') {
      const { data: existing } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('package_id', packageId)
        .maybeSingle()

      if (existing) {
        return NextResponse.json({ error: 'Already purchased' }, { status: 400 })
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    const session = await stripe.checkout.sessions.create({
      // Let Stripe show all payment methods enabled in your Dashboard
      // (Apple Pay, Google Pay, PayPal, Klarna, etc.)
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        package_id: packageId,
        is_bundle: (packageId === 'bundle' || packageId === 'complete') ? 'true' : 'false',
        is_complete: packageId === 'complete' ? 'true' : 'false',
        assign_mode: mode,
        recipient_email: mode === 'gift' ? (recipientEmail || '') : '',
        recipient_name: mode === 'gift' ? (recipientName || '') : '',
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
