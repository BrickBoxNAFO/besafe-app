import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPurchaseConfirmation } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'

// Required for Stripe webhook - disable body parsing
export const dynamic = 'force-dynamic'

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { user_id, package_id, is_bundle } = session.metadata || {}

    if (!user_id || !package_id) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    try {
      if (is_bundle === 'true') {
        const packageIds = PACKAGES.map(p => p.id)
        for (const pid of packageIds) {
          await supabase.from('purchases').upsert(
            { user_id, package_id: pid, stripe_payment_intent: session.payment_intent, purchased_at: new Date().toISOString() },
            { onConflict: 'user_id,package_id' }
          )
        }
      } else {
        await supabase.from('purchases').upsert(
          { user_id, package_id, stripe_payment_intent: session.payment_intent, purchased_at: new Date().toISOString() },
          { onConflict: 'user_id,package_id' }
        )
      }

      const { data: userData } = await supabase.auth.admin.getUserById(user_id)
      const userEmail = userData?.user?.email
      const userName = userData?.user?.user_metadata?.name
      const pkg = PACKAGES.find(p => p.id === package_id)

      if (userEmail) {
        await sendPurchaseConfirmation({
          to: userEmail,
          name: userName,
          packageName: pkg?.name || package_id,
          isBundle: is_bundle === 'true'
        })
      }
    } catch (err) {
      console.error('Webhook processing error:', err)
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
