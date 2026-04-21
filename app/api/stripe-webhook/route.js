import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPurchaseConfirmation, sendMusicPurchaseConfirmation, sendRefundConfirmation } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'

// Music product metadata for confirmation emails
const MUSIC_META = {
  'growing-early': { name: 'Growing Minds: Early Years', emoji: '🌱', songs: 37 },
  'growing-junior': { name: 'Growing Minds: Junior', emoji: '🌿', songs: 35 },
  'street': { name: 'Street Smart', emoji: '🥷', songs: 30 },
  'nest': { name: 'Nest Breaking', emoji: '🚀', songs: 17 },
  'roaming': { name: 'Roaming Free', emoji: '✈️', songs: 20 },
  'aging': { name: 'Aging Wisdom', emoji: '💐', songs: 25 },
  'parents': { name: 'Family Anchor', emoji: '❤️', songs: 20 },
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
    const { type, user_id, package_id, is_bundle, is_complete, product_id, assign_mode, recipient_email, recipient_name } = session.metadata || {}

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
       COURSE PACKAGE PURCHASE — handles self / gift / later
       ──────────────────────────────────────────── */
    if (!user_id || !package_id) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const isAggregate = is_bundle === 'true'
    const seatCount = is_complete === 'true' ? 7 : 5  // Complete = 7 seats, Bundle = 5 seats

    const { data: { user } } = await supabase.auth.admin.getUserById(user_id)

    if (isAggregate) {
      /* ────────────────────────────────────────────
         BUNDLE / COMPLETE LIBRARY
         - Record a single purchase ('bundle' or 'complete')
         - Create N empty seats (no package assigned yet)
         - Owner picks packages per seat from the Family Dashboard
         ──────────────────────────────────────────── */
      const { error } = await supabase.from('purchases').upsert({
        user_id,
        package_id: package_id,   // 'bundle' or 'complete'
        stripe_payment_intent: session.payment_intent,
      }, { onConflict: 'user_id,package_id' })
      if (error) console.error('DB insert error:', error)

      for (let i = 0; i < seatCount; i++) {
        const { error: seatErr } = await supabase.from('seats').insert({
          owner_user_id: user_id,
          package_id: null,       // Owner picks the package later
          member_name: null,
        })
        if (seatErr) console.error('Seat insert error (aggregate):', seatErr)
      }

      if (user?.email) {
        const label = is_complete === 'true' ? 'Complete Library' : 'Family Safety Bundle'
        await sendPurchaseConfirmation({
          to: user.email,
          name: user.user_metadata?.name,
          packageName: label + ' (' + seatCount + ' seats — assign from your Family Dashboard)',
          isBundle: true,
        }).catch(e => console.error('Email error:', e))
      }
      console.log('Aggregate purchase: ' + seatCount + ' empty seats created')

    } else {
      /* ────────────────────────────────────────────
         SINGLE PACKAGE — handles self / gift / later
         ──────────────────────────────────────────── */
      const mode = assign_mode || 'self'

      // Record the purchase under the buyer
      const { error } = await supabase.from('purchases').upsert({
        user_id,
        package_id: package_id,
        stripe_payment_intent: session.payment_intent,
      }, { onConflict: 'user_id,package_id' })
      if (error) console.error('DB insert error:', error)

      if (mode === 'gift' && recipient_email) {
        /* ── GIFT: create a seat with invite token, send invite email ── */
        const crypto = await import('crypto')
        const token = crypto.randomUUID().replace(/-/g, '')
        const inviteUrl = siteUrl + '/join/' + token

        const { error: seatErr } = await supabase.from('seats').insert({
          owner_user_id: user_id,
          package_id: package_id,
          invite_email: recipient_email.toLowerCase(),
          invite_token: token,
          invite_sent_at: new Date().toISOString(),
          member_name: recipient_name || null,
        })
        if (seatErr) console.error('Seat insert error (gift):', seatErr)

        // Send invite email to the recipient
        const pkg = PACKAGES.find(p => p.id === package_id)
        const ownerName = user?.user_metadata?.name || 'Someone special'
        try {
          const { Resend } = await import('resend')
          const resend = new Resend(process.env.RESEND_API_KEY)
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'hello@homesafeeducation.com',
            to: recipient_email,
            subject: ownerName + ' has given you access to ' + (pkg?.name || 'a safety course') + ' — HomeSafeEducation',
            html: '<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;"><h1 style="color:#0B1F3A;font-size:26px;margin-bottom:8px;">' + (pkg?.emoji || '') + ' You have been invited!</h1><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:16px;">Hi' + (recipient_name ? ' ' + recipient_name : '') + ',</p><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:24px;"><strong>' + ownerName + '</strong> has purchased the <strong>' + (pkg?.name || 'Safety Course') + '</strong> package for you through HomeSafeEducation.</p><div style="background:#F0F4F8;border-radius:12px;padding:20px;margin-bottom:28px;"><p style="color:#0B1F3A;font-size:15px;font-weight:600;margin:0 0 12px 0;">How to get started — 3 simple steps:</p><p style="color:#374151;font-size:14px;margin:0 0 8px 0;"><strong>1.</strong> Click the button below to accept your invitation</p><p style="color:#374151;font-size:14px;margin:0 0 8px 0;"><strong>2.</strong> Create your free account (takes under a minute)</p><p style="color:#374151;font-size:14px;margin:0;"><strong>3.</strong> Your courses unlock immediately</p></div><div style="text-align:center;margin-bottom:28px;"><a href="' + inviteUrl + '" style="display:inline-block;background:#0EA5A0;color:white;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Accept Your Invitation &rarr;</a></div><div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:16px;margin-bottom:24px;"><p style="color:#92400E;font-size:13px;margin:0;line-height:1.6;"><strong>Important:</strong> This invite link is personal to you and can only be used once.</p></div><hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0;"/><p style="color:#9CA3AF;font-size:12px;margin:0;">HomeSafeEducation &middot; <a href="' + siteUrl + '" style="color:#9CA3AF;">' + siteUrl + '</a></p></div>'
          })
        } catch (e) { console.error('Gift invite email error:', e) }

        // Also confirm to the buyer
        if (user?.email) {
          await sendPurchaseConfirmation({
            to: user.email,
            name: user.user_metadata?.name,
            packageName: (pkg?.name || package_id) + ' (gifted to ' + recipient_email + ')',
            isBundle: false,
          }).catch(e => console.error('Email error:', e))
        }
        console.log('Gift seat created for ' + recipient_email + ', invite sent')

      } else if (mode === 'later') {
        /* ── LATER: create a seat with no member, buyer assigns from dashboard ── */
        const { error: seatErr } = await supabase.from('seats').insert({
          owner_user_id: user_id,
          package_id: package_id,
          member_name: null,
        })
        if (seatErr) console.error('Seat insert error (later):', seatErr)

        if (user?.email) {
          const pkg = PACKAGES.find(p => p.id === package_id)
          await sendPurchaseConfirmation({
            to: user.email,
            name: user.user_metadata?.name,
            packageName: (pkg?.name || package_id) + ' (ready to assign)',
            isBundle: false,
          }).catch(e => console.error('Email error:', e))
        }
        console.log('Unassigned seat created for later assignment')

      } else {
        /* ── SELF (default): create seat with buyer as both owner and member ── */
        const { error: seatErr } = await supabase.from('seats').insert({
          owner_user_id: user_id,
          package_id: package_id,
          member_user_id: user_id,
          member_name: user?.user_metadata?.name || null,
        })
        if (seatErr) console.error('Seat insert error (self):', seatErr)

        if (user?.email) {
          const pkg = PACKAGES.find(p => p.id === package_id)
          await sendPurchaseConfirmation({
            to: user.email,
            name: user.user_metadata?.name,
            packageName: pkg?.name || package_id,
            isBundle: false,
          }).catch(e => console.error('Email error:', e))
        }
      }
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
