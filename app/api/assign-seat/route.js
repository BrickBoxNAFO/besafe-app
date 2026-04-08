import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendMemberInvite } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

    const { seatId, assignType, inviteEmail, memberName } = await request.json()
    // assignType: 'self' | 'invite'

    if (!seatId) return NextResponse.json({ error: 'Seat ID is required' }, { status: 400 })

    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Verify seat belongs to this user and is unassigned
    const { data: seat } = await admin.from('seats').select('*').eq('id', seatId).eq('owner_user_id', user.id).maybeSingle()
    if (!seat) return NextResponse.json({ error: 'Seat not found' }, { status: 404 })
    if (seat.member_user_id) return NextResponse.json({ error: 'This seat has already been assigned' }, { status: 400 })

    const pkg = PACKAGES.find(p => p.id === seat.package_id)

    if (assignType === 'self') {
      // Self-assign: update seat and grant course access
      await admin.from('seats').update({
        invite_email: user.email,
        member_user_id: user.id,
        member_name: user.user_metadata?.name || 'You',
        accepted_at: new Date().toISOString(),
      }).eq('id', seatId)

      // Grant access to the package
      await admin.from('purchases').upsert({
        user_id: user.id,
        package_id: seat.package_id,
        stripe_payment_intent: 'seat_assign_' + seatId,
        purchased_at: new Date().toISOString(),
      }, { onConflict: 'user_id,package_id' })

      return NextResponse.json({ success: true, packageId: seat.package_id })

    } else if (assignType === 'invite') {
      if (!inviteEmail) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

      // Prevent inviting yourself
      if (inviteEmail.toLowerCase() === user.email?.toLowerCase()) {
        return NextResponse.json({ error: 'You cannot invite yourself. Use "Assign to Myself" instead.' }, { status: 400 })
      }

      const token = crypto.randomUUID().replace(/-/g, '')
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
      const inviteUrl = siteUrl + '/join/' + token

      // Update seat with invite details
      await admin.from('seats').update({
        invite_email: inviteEmail,
        invite_token: token,
        invite_sent_at: new Date().toISOString(),
        member_name: memberName || null,
      }).eq('id', seatId)

      // Send invite email
      const ownerName = user.user_metadata?.name || 'Someone special'
      await sendMemberInvite({
        to: inviteEmail,
        memberName: memberName || 'there',
        senderName: ownerName,
        packageName: pkg?.name || seat.package_id,
        packageEmoji: pkg?.emoji || '🎓',
        inviteUrl,
      })

      return NextResponse.json({ success: true })

    } else {
      return NextResponse.json({ error: 'Invalid assign type' }, { status: 400 })
    }
  } catch (err) {
    console.error('Assign seat error:', err)
    return NextResponse.json({ error: 'Failed to assign seat' }, { status: 500 })
  }
}
