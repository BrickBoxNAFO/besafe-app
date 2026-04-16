import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendMemberInvite } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'
import { randomUUID } from 'crypto'

export async function POST(request) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { seatId, action, packageId, email } = await request.json()

    if (!seatId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get the seat
    const { data: seatRows } = await supabase
      .from('seats')
      .select('*')
      .eq('id', seatId)

    if (!seatRows || seatRows.length === 0) {
      return NextResponse.json({ error: 'Seat not found' }, { status: 404 })
    }

    const seat = seatRows[0]

    // Verify ownership
    if (seat.owner_user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    if (action === 'self-assign') {
      // Update seat with self assignment
      const { error } = await supabase
        .from('seats')
        .update({
          member_user_id: user.id,
          member_name: user.user_metadata?.name || user.email,
          accepted_at: new Date().toISOString(),
        })
        .eq('id', seatId)

      if (error) {
        return NextResponse.json({ error: 'Failed to assign seat' }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'invite') {
      if (!email || !packageId) {
        return NextResponse.json({ error: 'Missing email or packageId' }, { status: 400 })
      }

      // Generate invite token
      const inviteToken = randomUUID()

      // Update seat with invite
      const { error: updateError } = await supabase
        .from('seats')
        .update({
          invite_email: email,
          invite_token: inviteToken,
          invite_sent_at: new Date().toISOString(),
          package_id: packageId,
        })
        .eq('id', seatId)

      if (updateError) {
        return NextResponse.json({ error: 'Failed to send invite' }, { status: 500 })
      }

      // Send invite email
      const pkg = PACKAGES.find(p => p.id === packageId)
      const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'}/join/${inviteToken}`
      const senderName = user.user_metadata?.name || user.email?.split('@')[0]

      await sendMemberInvite({
        to: email,
        memberName: email.split('@')[0],
        senderName: senderName,
        packageName: pkg?.name || packageId,
        packageEmoji: pkg?.emoji || '📦',
        inviteUrl: inviteUrl,
      })

      return NextResponse.json({ success: true })
    }

    if (action === 'resend') {
      // Resend existing invite
      if (!seat.invite_email || !seat.invite_token) {
        return NextResponse.json({ error: 'No pending invite on this seat' }, { status: 400 })
      }

      const pkg = PACKAGES.find(p => p.id === seat.package_id)
      const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'}/join/${seat.invite_token}`
      const senderName = user.user_metadata?.name || user.email?.split('@')[0]

      await sendMemberInvite({
        to: seat.invite_email,
        memberName: seat.invite_email.split('@')[0],
        senderName: senderName,
        packageName: pkg?.name || seat.package_id,
        packageEmoji: pkg?.emoji || '📦',
        inviteUrl: inviteUrl,
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    console.error('Error in assign-seat:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
