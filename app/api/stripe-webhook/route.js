import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendPurchaseConfirmation, sendMemberInvite } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'
import { randomUUID } from 'crypto'

/**
 * Stripe webhook.
 *
 * Single-package purchases now also write a `seats` row (in addition to the
 * existing `purchases` row) so that:
 *   - self-assigned purchases appear in the dashboard both via purchases AND
 *     via the seats-backed views, and
 *   - gift-mode purchases link the buyer (owner_user_id) to the recipient
 *     (member_user_id, set on redemption) so generate-certificate can fire
 *     sendCertificateToPurchaser to the buyer when the recipient completes
 *     the package.
 *
 * Assign modes (from create-checkout metadata):
 *   - self:  purchases row + seats row (owner==member==buyer, accepted_at=now)
 *   - gift:  seats row only (owner=buyer, invite_token+invite_email set),
 *            invite email fired via sendMemberInvite; no purchases row for the
 *            buyer yet — they're giving this away.
 *   - later: seats row only (owner=buyer, no member, no invite). Buyer can
 *            later "Assign to me" or "Invite someone" from the dashboard.
 *
 * Bundle / Complete Library continue to use the existing multi-package
 * purchases insert plus the Family Dashboard for assignment.
 */
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
    const {
      user_id,
      package_id,
      is_bundle,
      assign_mode,
      recipient_email,
      recipient_name,
    } = session.metadata || {}

    if (!user_id || !package_id) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const isBundle = is_bundle === 'true'
    const mode = assign_mode || 'self'

    if (isBundle) {
      // ─── Bundle / Complete Library: keep existing multi-package flow ──
      const packageIds = ['growing', 'nest', 'roaming', 'aging', 'parents']
      for (const pkgId of packageIds) {
        const { error } = await supabase.from('purchases').upsert({
          user_id,
          package_id: pkgId,
          stripe_payment_intent: session.payment_intent,
        }, { onConflict: 'user_id,package_id' })
        if (error) console.error('DB insert error:', error)
      }
      // Also record the bundle itself so family/page.jsx gates unlock.
      await supabase.from('purchases').upsert({
        user_id,
        package_id,
        stripe_payment_intent: session.payment_intent,
      }, { onConflict: 'user_id,package_id' }).then(({ error }) => {
        if (error) console.error('Bundle tag insert error:', error)
      })
    } else {
      // ─── Single package: self / gift / later ──
      if (mode === 'self') {
        // 1. purchases row (so dashboard sees it)
        const { error: purchErr } = await supabase.from('purchases').upsert({
          user_id,
          package_id,
          stripe_payment_intent: session.payment_intent,
        }, { onConflict: 'user_id,package_id' })
        if (purchErr) console.error('DB insert error:', purchErr)

        // 2. seats row (so certificate-to-purchaser logic has a stable record
        //    even when the buyer is also the completer).
        const { data: existingSeat } = await supabase
          .from('seats')
          .select('id')
          .eq('owner_user_id', user_id)
          .eq('member_user_id', user_id)
          .eq('package_id', package_id)
          .maybeSingle()
        if (!existingSeat) {
          const { error: seatErr } = await supabase.from('seats').insert({
            owner_user_id: user_id,
            member_user_id: user_id,
            package_id,
            accepted_at: new Date().toISOString(),
          })
          if (seatErr) console.error('Seat insert error (self):', seatErr)
        }
      } else if (mode === 'gift') {
        // Create a pending seat with an invite token. Recipient claims it via
        // /join/<token>. When they accept, accept-invite sets member_user_id
        // and creates their purchases row.
        const token = randomUUID().replace(/-/g, '')
        const { error: seatErr } = await supabase.from('seats').insert({
          owner_user_id: user_id,
          package_id,
          invite_email: recipient_email || null,
          invite_token: token,
          invite_sent_at: new Date().toISOString(),
          member_name: recipient_name || null,
        })
        if (seatErr) console.error('Seat insert error (gift):', seatErr)

        // Fire the invite email
        try {
          const { data: { user: buyer } } = await supabase.auth.admin.getUserById(user_id)
          const pkg = PACKAGES.find(p => p.id === package_id)
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
          const inviteUrl = `${siteUrl}/join/${token}`
          await sendMemberInvite({
            to: recipient_email,
            memberName: recipient_name || recipient_email.split('@')[0],
            senderName: buyer?.user_metadata?.name || buyer?.email?.split('@')[0] || 'A friend',
            packageName: pkg?.name || package_id,
            packageEmoji: pkg?.emoji || '🎁',
            inviteUrl,
          })
        } catch (e) {
          console.error('Gift invite email error:', e)
        }
      } else if (mode === 'later') {
        // Create a pending seat with no member and no invite. Shows on
        // dashboard as "Unassigned - Assign or Gift".
        const { error: seatErr } = await supabase.from('seats').insert({
          owner_user_id: user_id,
          package_id,
          invite_email: null,
          invite_token: null,
          invite_sent_at: null,
          member_name: null,
        })
        if (seatErr) console.error('Seat insert error (later):', seatErr)
      }
    }

    // Purchase confirmation email to buyer (all modes)
    const { data: { user } } = await supabase.auth.admin.getUserById(user_id)
    if (user?.email) {
      const pkg = PACKAGES.find(p => p.id === package_id)
      await sendPurchaseConfirmation({
        to: user.email,
        name: user.user_metadata?.name,
        packageName: pkg?.name || package_id,
        isBundle,
      }).catch(e => console.error('Email error:', e))
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    console.log('Payment failed:', event.data.object.id)
  }

  return NextResponse.json({ received: true })
}
