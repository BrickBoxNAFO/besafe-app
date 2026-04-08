import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { sendInviteAccepted } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'You must be logged in to accept an invite' }, { status: 401 })
    const { token } = await request.json()
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data: seat } = await admin.from('seats').select('*').eq('invite_token', token).maybeSingle()
    if (!seat) return NextResponse.json({ error: 'Invalid or expired invite link' }, { status: 404 })
    if (seat.member_user_id) return NextResponse.json({ error: 'This invite has already been used' }, { status: 400 })
    if (seat.owner_user_id === user.id) return NextResponse.json({ error: 'You cannot accept your own invite' }, { status: 400 })

    const memberName = user.user_metadata?.name || seat.invite_email
    await admin.from('seats').update({ member_user_id: user.id, member_name: memberName, accepted_at: new Date().toISOString() }).eq('id', seat.id)
    await admin.from('purchases').upsert({ user_id: user.id, package_id: seat.package_id, stripe_payment_intent: 'seat_invite', purchased_at: new Date().toISOString() }, { onConflict: 'user_id,package_id' })

    // Notify the seat owner that their invite has been accepted
    try {
      const { data: ownerData } = await admin.auth.admin.getUserById(seat.owner_user_id)
      if (ownerData?.user?.email) {
        const pkg = PACKAGES.find(p => p.id === seat.package_id)
        await sendInviteAccepted({
          to: ownerData.user.email,
          ownerName: ownerData.user.user_metadata?.name || ownerData.user.email.split('@')[0],
          memberName,
          packageName: pkg?.name || seat.package_id,
          packageEmoji: pkg?.emoji || '🎉',
        })
      }
    } catch (emailErr) {
      console.error('Invite accepted notification error:', emailErr)
      // Non-critical, don't fail the acceptance
    }

    return NextResponse.json({ success: true, packageId: seat.package_id })
  } catch (err) {
    console.error('Accept invite error:', err)
    return NextResponse.json({ error: 'Failed to accept invite' }, { status: 500 })
  }
}
