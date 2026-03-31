import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { PACKAGES } from '@/lib/data'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL || 'hello@homesafeeducation.com'
const SEAT_LIMIT = 5

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const { seatId, inviteEmail, memberName, packageId } = await request.json()
    if (!inviteEmail) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const token = crypto.randomUUID().replace(/-/g, '')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
    const inviteUrl = siteUrl + '/join/' + token
    let finalPackageId = packageId

    if (seatId) {
      const { data: seat } = await admin.from('seats').select('*').eq('id', seatId).eq('owner_user_id', user.id).maybeSingle()
      if (!seat) return NextResponse.json({ error: 'Seat not found' }, { status: 404 })
      if (seat.member_user_id) return NextResponse.json({ error: 'This seat has already been accepted' }, { status: 400 })
      finalPackageId = seat.package_id
      await admin.from('seats').update({ invite_email: inviteEmail, invite_token: token, invite_sent_at: new Date().toISOString(), member_name: memberName || seat.member_name || null }).eq('id', seatId)
    } else {
      if (!packageId) return NextResponse.json({ error: 'Package selection is required' }, { status: 400 })
      const { data: existingSeats } = await admin.from('seats').select('id').eq('owner_user_id', user.id)
      if ((existingSeats || []).length >= SEAT_LIMIT) return NextResponse.json({ error: 'You have reached the maximum of 5 seats' }, { status: 400 })
      const { data: bundlePurchase } = await supabase.from('purchases').select('package_id').eq('user_id', user.id).eq('package_id', 'bundle').maybeSingle()
      if (!bundlePurchase) return NextResponse.json({ error: 'Bundle purchase not found' }, { status: 403 })
      await admin.from('seats').insert({ owner_user_id: user.id, package_id: packageId, invite_email: inviteEmail, invite_token: token, invite_sent_at: new Date().toISOString(), member_name: memberName || null })
    }

    const pkg = PACKAGES.find(p => p.id === finalPackageId)
    const ownerName = user.user_metadata?.name || 'A family member'

    await resend.emails.send({
      from: FROM,
      to: inviteEmail,
      subject: ownerName + ' has given you access to ' + (pkg?.name || 'a safety course') + ' HomeSafeEducation',
      html: '<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;"><h1 style="color:#0B1F3A;font-size:26px;margin-bottom:8px;">' + (pkg?.emoji || '') + ' You have been invited!</h1><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:16px;">Hi' + (memberName ? ' ' + memberName : '') + ',</p><p style="color:#4B5563;font-size:16px;line-height:1.7;margin-bottom:24px;"><strong>' + ownerName + '</strong> has purchased the <strong>' + (pkg?.name || 'Safety Course') + '</strong> package for you through HomeSafeEducation.</p><div style="background:#F0F4F8;border-radius:12px;padding:20px;margin-bottom:28px;"><p style="color:#0B1F3A;font-size:15px;font-weight:600;margin:0 0 12px 0;">How to get started 3 simple steps:</p><p style="color:#374151;font-size:14px;margin:0 0 8px 0;"><strong>1.</strong> Click the button below to accept your invitation</p><p style="color:#374151;font-size:14px;margin:0 0 8px 0;"><strong>2.</strong> Create your free account (takes under a minute)</p><p style="color:#374151;font-size:14px;margin:0;"><strong>3.</strong> Your course unlocks immediately</p></div><div style="text-align:center;margin-bottom:28px;"><a href="' + inviteUrl + '" style="display:inline-block;background:#0EA5A0;color:white;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Accept Your Invitation &rarr;</a></div><div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:16px;margin-bottom:24px;"><p style="color:#92400E;font-size:13px;margin:0;line-height:1.6;"><strong>Important:</strong> This invite link is personal to you and can only be used once. If you did not expect this email, you can safely ignore it.</p></div><hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0;"/><p style="color:#9CA3AF;font-size:12px;margin:0;">HomeSafeEducation &middot; <a href="' + siteUrl + '" style="color:#9CA3AF;">' + siteUrl + '</a><br/>Your data is handled per our <a href="' + siteUrl + '/privacy" style="color:#9CA3AF;">Privacy Policy</a>.</p></div>'
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Invite error:', err)
    return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 })
  }
}
