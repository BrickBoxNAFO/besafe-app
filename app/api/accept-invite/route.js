import { NextResponse } from 'next/server'
import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabase-server'
import { sendInviteAccepted } from '@/lib/resend'

export async function POST(request) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    // Find seat by invite_token
    const { data: seatRows } = await supabase
      .from('seats')
      .select('*')
      .eq('invite_token', token)

    if (!seatRows || seatRows.length === 0) {
      return NextResponse.json({ error: 'Invalid invite token' }, { status: 400 })
    }

    const seat = seatRows[0]

    if (seat.member_user_id) {
      return NextResponse.json({ error: 'Invite already accepted' }, { status: 400 })
    }

    // Update seat with member info
    const { error: updateError } = await supabase
      .from('seats')
      .update({
        member_user_id: user.id,
        member_name: user.user_metadata?.name || user.email,
        accepted_at: new Date().toISOString(),
        invite_token: null,
        invite_email: null,
      })
      .eq('id', seat.id)

    if (updateError) {
      console.error('Error updating seat:', updateError)
      return NextResponse.json({ error: 'Failed to accept invite' }, { status: 500 })
    }

    // Create purchase record for the member
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        package_id: seat.package_id,
        purchased_at: new Date().toISOString(),
      })

    if (purchaseError) {
      console.error('Error creating purchase:', purchaseError)
      return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 })
    }

    // Get owner info for notification email
    const adminClient = createAdminSupabaseClient()
    const { data: ownerAuth } = await adminClient.auth.admin.getUserById(seat.owner_user_id)
    const ownerName = ownerAuth?.user_metadata?.name || ownerAuth?.email?.split('@')[0]

    // Send notification to owner
    if (ownerAuth?.email) {
      await sendInviteAccepted({
        to: ownerAuth.email,
        ownerName: ownerName,
        memberName: user.user_metadata?.name || user.email,
        packageName: seat.package_id,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Invite accepted',
      redirectUrl: '/dashboard',
    })
  } catch (err) {
    console.error('Error in accept-invite:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
