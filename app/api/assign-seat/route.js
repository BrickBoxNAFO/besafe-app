import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { PACKAGES } from '@/lib/data'
import { randomUUID } from 'crypto'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request) {
  try {
    // Regular client for auth only
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Admin client for seat operations (bypasses RLS)
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { seatId, action, packageId, email } = await request.json()

    if (!seatId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get the seat
    const { data: seat } = await admin
      .from('seats')
      .select('*')
      .eq('id', seatId)
      .maybeSingle()

    if (!seat) {
      return NextResponse.json({ error: 'Seat not found' }, { status: 404 })
    }

    // Verify ownership
    if (seat.owner_user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    if (action === 'self-assign') {
      if (!packageId) {
        return NextResponse.json({ error: 'Please select a package' }, { status: 400 })
      }

      // Update seat with self-assignment and chosen package
      const { error } = await admin
        .from('seats')
        .update({
          package_id: packageId,
          member_user_id: user.id,
          member_name: user.user_metadata?.name || user.email,
          accepted_at: new Date().toISOString(),
        })
        .eq('id', seatId)

      if (error) {
        console.error('Self-assign error:', error)
        return NextResponse.json({ error: 'Failed to assign seat' }, { status: 500 })
      }

      // Create purchase record so courses unlock
      await admin.from('purchases').upsert({
        user_id: user.id,
        package_id: packageId,
        stripe_payment_intent: 'seat_' + seatId,
      }, { onConflict: 'user_id,package_id' })

      return NextResponse.json({ success: true })
    }

    if (action === 'invite') {
      if (!email || !packageId) {
        return NextResponse.json({ error: 'Missing email or package' }, { status: 400 })
      }
      if (!isValidEmail(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
      }

      // Generate invite token
      const inviteToken = randomUUID().replace(/-/g, '')

      // Update seat with invite details and chosen package
      const { error: updateError } = await admin
        .from('seats')
        .update({
          package_id: packageId,
          invite_email: email.toLowerCase(),
          invite_token: inviteToken,
          invite_sent_at: new Date().toISOString(),
        })
        .eq('id', seatId)

      if (updateError) {
        console.error('Invite error:', updateError)
        return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 })
      }

      // Send invite email
      const pkg = PACKAGES.find(p => p.id === packageId)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
      const inviteUrl = siteUrl + '/join/' + inviteToken
      const senderName = user.user_metadata?.name || user.email?.split('@')[0]

      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'hello@homesafeeducation.com',
          to: email,
          subject: senderName + ' has given you access to ' + (pkg?.name || 'a safety course') + ' — HomeSafeEducation',
          html: '<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;"><h1 style="color:#0B1F3A;font-size:26px;margin-bottom:8px;">' + (pkg?.emoji || '') + ' You have been invited!</h1><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:16px;">Hi ' + email.split('@')[0] + ',</p><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:24px;"><strong>' + senderName + '</strong> has given you access to the <strong>' + (pkg?.name || 'Safety Course') + '</strong> package through HomeSafeEducation.</p><div style="background:#F0F4F8;border-radius:12px;padding:20px;margin-bottom:28px;"><p style="color:#0B1F3A;font-size:15px;font-weight:600;margin:0 0 12px 0;">How to get started — 3 simple steps:</p><p style="color:#374151;font-size:14px;margin:0 0 8px 0;"><strong>1.</strong> Click the button below to accept your invitation</p><p style="color:#374151;font-size:14px;margin:0 0 8px 0;"><strong>2.</strong> Create your free account (takes under a minute)</p><p style="color:#374151;font-size:14px;margin:0;"><strong>3.</strong> Your courses unlock immediately</p></div><div style="text-align:center;margin-bottom:28px;"><a href="' + inviteUrl + '" style="display:inline-block;background:#0EA5A0;color:white;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Accept Your Invitation &rarr;</a></div><div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:16px;margin-bottom:24px;"><p style="color:#92400E;font-size:13px;margin:0;line-height:1.6;"><strong>Important:</strong> This invite link is personal to you and can only be used once.</p></div><hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0;"/><p style="color:#9CA3AF;font-size:12px;margin:0;">HomeSafeEducation &middot; <a href="' + siteUrl + '" style="color:#9CA3AF;">' + siteUrl + '</a></p></div>'
        })
      } catch (e) { console.error('Invite email error:', e) }

      return NextResponse.json({ success: true })
    }

    if (action === 'resend') {
      // Resend existing invite
      if (!seat.invite_email || !seat.invite_token) {
        return NextResponse.json({ error: 'No pending invite on this seat' }, { status: 400 })
      }

      const pkg = PACKAGES.find(p => p.id === seat.package_id)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
      const inviteUrl = siteUrl + '/join/' + seat.invite_token
      const senderName = user.user_metadata?.name || user.email?.split('@')[0]

      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'hello@homesafeeducation.com',
          to: seat.invite_email,
          subject: senderName + ' has given you access to ' + (pkg?.name || 'a safety course') + ' — HomeSafeEducation',
          html: '<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;"><h1 style="color:#0B1F3A;font-size:26px;margin-bottom:8px;">' + (pkg?.emoji || '') + ' Reminder: You have been invited!</h1><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:16px;">Hi ' + seat.invite_email.split('@')[0] + ',</p><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:24px;">This is a reminder that <strong>' + senderName + '</strong> has given you access to <strong>' + (pkg?.name || 'Safety Course') + '</strong> through HomeSafeEducation.</p><div style="text-align:center;margin-bottom:28px;"><a href="' + inviteUrl + '" style="display:inline-block;background:#0EA5A0;color:white;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Accept Your Invitation &rarr;</a></div><hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0;"/><p style="color:#9CA3AF;font-size:12px;margin:0;">HomeSafeEducation &middot; <a href="' + siteUrl + '" style="color:#9CA3AF;">' + siteUrl + '</a></p></div>'
        })
      } catch (e) { console.error('Resend invite email error:', e) }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Error in assign-seat:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
