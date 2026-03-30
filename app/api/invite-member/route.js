import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { PACKAGES } from '@/lib/data'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL || 'hello@thebesafegroup.com'

export async function POST(request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    const { seatId, inviteEmail, memberName } = await request.json()
    if (!seatId || !inviteEmail) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const { data: seat } = await supabase.from('seats').select('*').eq('id', seatId).eq('owner_user_id', user.id).maybeSingle()
    if (!seat) return NextResponse.json({ error: 'Seat not found' }, { status: 404 })
    if (seat.member_user_id) return NextResponse.json({ error: 'Seat already accepted' }, { status: 400 })
    const token = crypto.randomUUID().replace(/-/g, '')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebesafegroup.com'
    const inviteUrl = siteUrl + '/join/' + token
    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    await admin.from('seats').update({ invite_email: inviteEmail, invite_token: token, invite_sent_at: new Date().toISOString(), member_name: memberName || null }).eq('id', seatId)
    const pkg = PACKAGES.find(p => p.id === seat.package_id)
    const ownerName = user.user_metadata?.name || 'Someone'
    await resend.emails.send({
      from: FROM, to: inviteEmail,
      subject: ownerName + ' has given you access to ' + (pkg?.name || 'a safety course') + ' — The Be Safe Group',
      html: '<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;"><h1 style="color:#0B1F3A;font-size:24px;">You have been invited! ' + (pkg?.emoji || '') + '</h1><p style="color:#4B5563;font-size:16px;line-height:1.6;"><strong>' + ownerName + '</strong> has purchased <strong>' + (pkg?.name || 'Safety Course') + '</strong> for you.</p><a href="' + inviteUrl + '" style="display:inline-block;background:#0EA5A0;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin:24px 0;">Accept Your Invitation</a><p style="color:#6B7280;font-size:14px;">This link is personal to you and can only be used once.</p></div>'
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Invite error:', err)
    return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 })
  }
}
