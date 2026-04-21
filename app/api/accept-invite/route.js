import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendInviteAccepted } from '@/lib/resend'

export async function POST(request) {
  try {
    // Regular client — only used to identify the logged-in user
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    // Admin client bypasses RLS for seat operations
    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Find seat by invite_token (admin — RLS would block this)
    const { data: seatRows } = await adminClient
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

    // Verify the logged-in user's email matches the invite (case-insensitive)
    if (seat.invite_email && user.email?.toLowerCase() !== seat.invite_email.toLowerCase()) {
      return NextResponse.json({
        error: `This invite was sent to ${seat.invite_email}. Please log in with that email address to accept it.`
      }, { status: 403 })
    }

    // Update seat with member info (admin — RLS would block non-owner writes)
    const { error: updateError } = await adminClient
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

    // Create purchase record for the member (admin — RLS would block insert)
    const { error: purchaseError } = await adminClient
      .from('purchases')
      .upsert({
        user_id: user.id,
        package_id: seat.package_id,
        stripe_payment_intent: 'invited_' + seat.id,
      }, { onConflict: 'user_id,package_id' })

    if (purchaseError) {
      console.error('Error creating purchase:', purchaseError)
      return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 })
    }

    // Get owner info for notification email
    const { data: ownerAuth } = await adminClient.auth.admin.getUserById(seat.owner_user_id)
    const ownerName = ownerAuth?.user?.user_metadata?.name || ownerAuth?.user?.email?.split('@')[0]

    // Send notification to owner
    if (ownerAuth?.user?.email) {
      const { PACKAGES } = await import('@/lib/data')
      const pkg = PACKAGES.find(p => p.id === seat.package_id)
      await sendInviteAccepted({
        to: ownerAuth.user.email,
        ownerName: ownerName,
        memberName: user.user_metadata?.name || user.email,
        packageName: pkg?.name || seat.package_id,
      }).catch(e => console.error('Invite accepted email error:', e))
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
