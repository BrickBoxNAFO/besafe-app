import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: seat } = await admin
      .from('seats')
      .select('package_id, owner_user_id, member_user_id')
      .eq('invite_token', token)
      .maybeSingle()

    if (!seat) {
      return NextResponse.json({ error: 'Invite not found' }, { status: 404 })
    }

    // Get owner name for display
    let ownerName = null
    if (seat.owner_user_id) {
      const { data: ownerData } = await admin.auth.admin.getUserById(seat.owner_user_id)
      ownerName = ownerData?.user?.user_metadata?.name || null
    }

    return NextResponse.json({
      packageId: seat.package_id,
      ownerName,
      alreadyAccepted: !!seat.member_user_id,
    })
  } catch (err) {
    console.error('Invite preview error:', err)
    return NextResponse.json({ error: 'Failed to load invite' }, { status: 500 })
  }
}
