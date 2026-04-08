import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPurchaseConfirmation, sendRefundConfirmation, sendMemberInvite } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'
import { randomUUID } from 'crypto'

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
    const meta = session.metadata || {}
    const { userId, packageId, is_bundle, purchaseType, giftRecipientEmail, giftRecipientName, gifterName } = meta
    // Support both old key (user_id) and new key (userId)
    const user_id = userId || meta.user_id
    const package_id = packageId || meta.package_id

    if (!user_id || !package_id) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    try {
      const isGift = purchaseType === 'gift' && giftRecipientEmail

      const isGiftLater = purchaseType === 'gift_later'

      if (isGift) {
        // ─── Gift purchase: create gift record and send invite ─────────────
        const pkg = PACKAGES.find(p => p.id === package_id)
        const token = randomUUID()
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
        const inviteUrl = `${siteUrl}/register?gift_token=${token}&package=${package_id}`

        // Store gift purchase in database
        await supabase.from('gift_purchases').insert({
          token,
          package_id,
          recipient_email: giftRecipientEmail,
          recipient_name: giftRecipientName || null,
          gifter_name: gifterName || 'Someone special',
          stripe_session_id: session.id,
          redeemed: false,
        })

        // Also record the purchase against the buyer (for receipts/refund tracking)
        await supabase.from('purchases').upsert(
          { user_id, package_id: package_id + '_gift_' + token.slice(0, 8), stripe_payment_intent: session.payment_intent, purchased_at: new Date().toISOString() },
          { onConflict: 'user_id,package_id' }
        )

        // Send invite email to recipient
        await sendMemberInvite({
          to: giftRecipientEmail,
          memberName: giftRecipientName || 'there',
          senderName: gifterName || 'Someone special',
          packageName: pkg?.name || package_id,
          packageEmoji: pkg?.emoji || '🎓',
          inviteUrl,
        })

        // Send confirmation email to the buyer
        const { data: userData } = await supabase.auth.admin.getUserById(user_id)
        const buyerEmail = userData?.user?.email
        const buyerName = userData?.user?.user_metadata?.name
        if (buyerEmail) {
          await sendPurchaseConfirmation({
            to: buyerEmail,
            name: buyerName,
            packageName: (pkg?.name || package_id) + ' (Gift)',
            isBundle: false,
            orderId: session.payment_intent?.slice(-8)?.toUpperCase() || 'N/A',
            amount: session.amount_total ? (session.amount_total / 100).toFixed(2) : 'See receipt',
          })
        }
      } else if (isGiftLater) {
        // ─── Assign-later purchase: create unassigned seat on buyer's dashboard ──
        const pkg = PACKAGES.find(p => p.id === package_id)

        // Create an unassigned seat in the seats table
        await supabase.from('seats').insert({
          owner_user_id: user_id,
          package_id,
          invite_token: randomUUID(),
          // No invite_email, invite_sent_at, member_user_id — seat is unassigned
        })

        // Record the purchase for receipts/refund tracking
        await supabase.from('purchases').upsert(
          { user_id, package_id: package_id + '_seat_' + randomUUID().slice(0, 8), stripe_payment_intent: session.payment_intent, purchased_at: new Date().toISOString() },
          { onConflict: 'user_id,package_id' }
        )

        // Send confirmation email to buyer
        const { data: userData } = await supabase.auth.admin.getUserById(user_id)
        const buyerEmail = userData?.user?.email
        const buyerName = userData?.user?.user_metadata?.name
        if (buyerEmail) {
          await sendPurchaseConfirmation({
            to: buyerEmail,
            name: buyerName,
            packageName: (pkg?.name || package_id) + ' (Assign Later)',
            isBundle: false,
            orderId: session.payment_intent?.slice(-8)?.toUpperCase() || 'N/A',
            amount: session.amount_total ? (session.amount_total / 100).toFixed(2) : 'See receipt',
          })
        }
      } else if (is_bundle === 'true') {
        // ─── Bundle purchase: grant all packages ────────────────────────────
        const packageIds = PACKAGES.map(p => p.id)
        for (const pid of packageIds) {
          await supabase.from('purchases').upsert(
            { user_id, package_id: pid, stripe_payment_intent: session.payment_intent, purchased_at: new Date().toISOString() },
            { onConflict: 'user_id,package_id' }
          )
        }

        const { data: userData } = await supabase.auth.admin.getUserById(user_id)
        const userEmail = userData?.user?.email
        const userName = userData?.user?.user_metadata?.name

        if (userEmail) {
          await sendPurchaseConfirmation({
            to: userEmail,
            name: userName,
            packageName: package_id,
            isBundle: true,
          })
        }
      } else {
        // ─── Self purchase: grant the package ───────────────────────────────
        await supabase.from('purchases').upsert(
          { user_id, package_id, stripe_payment_intent: session.payment_intent, purchased_at: new Date().toISOString() },
          { onConflict: 'user_id,package_id' }
        )

        const { data: userData } = await supabase.auth.admin.getUserById(user_id)
        const userEmail = userData?.user?.email
        const userName = userData?.user?.user_metadata?.name
        const pkg = PACKAGES.find(p => p.id === package_id)

        if (userEmail) {
          await sendPurchaseConfirmation({
            to: userEmail,
            name: userName,
            packageName: pkg?.name || package_id,
            isBundle: false,
            orderId: session.payment_intent?.slice(-8)?.toUpperCase() || 'N/A',
            amount: session.amount_total ? (session.amount_total / 100).toFixed(2) : 'See receipt',
          })
        }
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
