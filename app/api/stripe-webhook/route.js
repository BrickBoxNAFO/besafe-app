import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPurchaseConfirmation, sendRefundConfirmation } from '@/lib/resend'
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

  // ─── Handle refund events ─────────────────────────────────────────────────
  if (event.type === 'charge.refunded') {
    const charge = event.data.object
    const customerEmail = charge.billing_details?.email || charge.receipt_email

    if (customerEmail) {
      try {
        // Get the refund amount (most recent refund in the list)
        const latestRefund = charge.refunds?.data?.[0]
        const refundAmount = latestRefund
          ? (latestRefund.amount / 100).toFixed(2)
          : (charge.amount_refunded / 100).toFixed(2)
        const currency = (charge.currency || 'gbp').toUpperCase()
        const formattedAmount = currency === 'GBP' ? `£${refundAmount}` : currency === 'USD' ? `$${refundAmount}` : currency === 'EUR' ? `€${refundAmount}` : `${refundAmount} ${currency}`

        // Try to get user details from metadata or Supabase
        let userName = charge.billing_details?.name || ''
        let packageName = charge.metadata?.package_name || 'Your course'
        const orderId = charge.payment_intent || charge.id

        // If we have a user_id in metadata, look up their name
        if (charge.metadata?.user_id) {
          const { data: userData } = await supabase.auth.admin.getUserById(charge.metadata.user_id)
          if (userData?.user?.user_metadata?.name) {
            userName = userData.user.user_metadata.name
          }
          // Try to find package name from purchases
          if (!charge.metadata?.package_name) {
            const { data: purchase } = await supabase
              .from('purchases')
              .select('package_id')
              .eq('user_id', charge.metadata.user_id)
              .eq('stripe_payment_intent', charge.payment_intent)
              .single()
            if (purchase) {
              const pkg = PACKAGES.find(p => p.id === purchase.package_id)
              if (pkg) packageName = pkg.name
            }
          }
        }

        await sendRefundConfirmation({
          to: customerEmail,
          name: userName,
          packageName,
          orderId: orderId.slice(-8).toUpperCase(),
          amount: formattedAmount,
        })
      } catch (err) {
        console.error('Refund email error:', err)
        // Non-critical — don't fail the webhook
      }
    }
  }

  return NextResponse.json({ received: true })
}
