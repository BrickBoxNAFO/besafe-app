import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPurchaseConfirmation } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'

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
    const { type, user_id, package_id, is_bundle, product_id } = session.metadata || {}

    /* ────────────────────────────────────────────
       MUSIC PURCHASE — metadata.type === 'music_download'
       Record in music_purchases table so /api/music-download
       can verify ownership before serving the ZIP.
       ──────────────────────────────────────────── */
    if (type === 'music_download') {
      if (!user_id || !product_id) {
        console.error('Music purchase missing metadata:', session.metadata)
        return NextResponse.json({ received: true })
      }

      const { error } = await supabase.from('music_purchases').upsert({
        user_id,
        product_id,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent,
      }, { onConflict: 'user_id,product_id' })

      if (error) console.error('Music purchase DB insert error:', error)
      else console.log(`Music purchase recorded: user=${user_id} product=${product_id}`)

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

  return NextResponse.json({ received: true })
}
