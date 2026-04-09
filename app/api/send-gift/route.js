import { createAdminSupabaseClient } from '@/lib/supabase-server'
import { sendMemberInvite } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'
import { randomUUID } from 'crypto'
export async function POST(req) {
  try {
    const { recipientEmail, recipientName, gifterName, packageId, sessionId } = await req.json()
    if (!recipientEmail || !packageId || !sessionId) return Response.json({ error: 'Missing fields' }, { status: 400 })
    const supabase = createAdminSupabaseClient()
    const pkg = PACKAGES.find(p => p.id === packageId)
    if (!pkg) return Response.json({ error: 'Invalid package' }, { status: 400 })
    const token = randomUUID()
    const inviteUrl = (process.env.NEXT_PUBLIC_SITE_URL||'https://homesafeeducation.com') + '/register?gift_token=' + token + '&package=' + packageId
    await supabase.from('gift_purchases').insert({ token, package_id: packageId, recipient_email: recipientEmail, recipient_name: recipientName||null, gifter_name: gifterName||'Someone special', stripe_session_id: sessionId, redeemed: false })
    await sendMemberInvite({ to: recipientEmail, memberName: recipientName||'there', senderName: gifterName||'Someone special', packageName: pkg.name, packageEmoji: pkg.emoji||'🎓', inviteUrl })
    return Response.json({ success: true })
  } catch (err) { return Response.json({ error: 'Server error' }, { status: 500 }) }
}