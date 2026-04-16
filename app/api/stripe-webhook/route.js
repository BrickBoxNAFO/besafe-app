import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPurchaseConfirmation, sendMusicPurchaseConfirmation, sendRefundConfirmation } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'

// Music product metadata for confirmation emails
const MUSIC_META = {
  'growing-early': { name: 'Growing Minds: Early Years', emoji: '🌱', songs: 31 },
  'growing-junior': { name: 'Growing Minds: Junior', emoji: '🌿', songs: 28 },
  'street': { name: 'Street Smart', emoji: '🥷', songs: 24 },
  'nest': { name: 'Nest Breaking', emoji: '🦅', songs: 20 },
  'roaming': { name: 'Roaming Free', emoji: '✈️', songs: 24 },
  'aging': { name: 'Aging Wisdom', emoji: '💐', songs: 20 },
  'parents': { name: 'Family Anchor', emoji: '⚓', songs: 24 },
}

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { type, user_id, package_id, is_bundle, product_id } = session.metadata || {}

    /* ────────────────────────────────────────────
       MUSIC PURCHASE — metadata.type === 'music_download'
       1. Record in music_purchases table
       2. Send confirmation email with download link
       ──────────────────────────────────────────── */
    if (type === 'music_download') {
      if (!user_id || !product_id) {
        console.error('Music purchase missing metadata:', session.metadata)
        return NextResponse.json({ received: true })
      }

      // Record purchase
      const { error } = await supabase.from('music_purchases').upsert({
        user_id,
        product_id,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
      }, { onConflict: 'user_id,product_id' })

      if (error) console.error('Music purchase DB insert error:', error)
      else console.log(`Music purchase recorded: user=${user_id} product=${product_id}`)

      // Send confirmation email with download link
      const meta = MUSIC_META[product_id]
      if (meta) {
        const { data: { user } } = await supabase.auth.admin.getUserById(user_id)
        if (user?.email) {
          const downloadUrl = `${siteUrl}/api/music-download?product=${product_id}&session_id=${session.id}`
          await sendMusicPurchaseConfirmation({
            to: user.email,
            name: user.user_metadata?.name,
            productName: meta.name,
            productEmoji: meta.emoji,
            songCount: meta.songs,
            downloadUrl,
          }).catch(e => console.error('Music email error:', e))
        }
      }

      return NextResponse.json({ received: true })
    }

    /* ────────────────────────────────────────────
       COURSE PACKAGE PURCHASE — original handler
       ──────────────────────────────────────────── */
    if (!user_id || !package_id) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const packageIds = is_bundle === 'true'
      ? ['growing', 'nest', 'roaming', 'aging', 'parents']
      : [package_id]

    for (const pkgId of packageIds) {
      const { error } = await supabase.from('purchases').upsert({
        user_id,
        package_id: pkgId,
        stripe_payment_intent: session.payment_intent,
      }, { onConflict: 'user_id,package_id' })
      if (error) console.error('DB insert error:', error)
    }

    const { data: { user } } = await supabase.auth.admin.getUserById(user_id)
    if (user?.email) {
      const pkg = PACKAGES.find(p => p.id === package_id)
      await sendPurchaseConfirmation({
        to: user.email,
        name: user.user_metadata?.name,
        packageName: pkg?.name || package_id,
        isBundle: is_bundle === 'true',
      }).catch(e => console.error('Email error:', e))
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    console.log('Payment failed:', event.data.object.id)
  }

  /* ────────────────────────────────────────────
     REFUND — charge.refunded
     Send refund confirmation email to the customer.
     ──────────────────────────────────────────── */
  if (event.type === 'charge.refunded') {
    const charge = event.data.object
    const refundAmount = (charge.amount_refunded / 100).toFixed(2)
    const currency = (charge.currency || 'usd').toUpperCase()
    const symbol = { USD: '$', GBP: '\u00A3', EUR: '\u20AC', CAD: 'CA$', AUD: 'A$', NZD: 'NZ$' }[currency] || '$'
    const customerEmail = charge.billing_details?.email || charge.receipt_email

    if (customerEmail) {
      // Try to find the package from the payment intent metadata
      let packageName = 'your course'
      try {
        const pi = await stripe.paymentIntents.retrieve(charge.payment_intent)
        const pkgId = pi.metadata?.package_id
        if (pkgId) {
          const pkg = PACKAGES.find(p => p.id === pkgId)
          if (pkg) packageName = pkg.name
        }
      } catch (_) {}

      await sendRefundConfirmation({
        to: customerEmail,
        name: charge.billing_details?.name,
        packageName,
        orderId: charge.payment_intent?.slice(-8) || 'N/A',
        amount: `${symbol}${refundAmount}`,
      }).catch(e => console.error('Refund email error:', e))
    }
  }

  return NextResponse.json({ received: true })
}
