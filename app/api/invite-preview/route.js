import { NextResponse } from 'next/server'
import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabase-server'
import { PACKAGES } from '@/lib/data'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    // Find seat by invite_token
    const { data: seatRows } = await supabase
      .from('seats')
      .select('*')
      .eq('invite_token', token)

    if (!seatRows || seatRows.length === 0) {
      return NextResponse.json({ error: 'Invalid invite token' }, { status: 400 })
    }

    const seat = seatRows[0]

    // Get package info
    const pkg = PACKAGES.find(p => p.id === seat.package_id)

    // Get owner name
    const adminClient = createAdminSupabaseClient()
    const { data: ownerAuth } = await adminClient.auth.admin.getUserById(seat.owner_user_id)
    const ownerName = ownerAuth?.user_metadata?.name || ownerAuth?.email?.split('@')[0]

    return NextResponse.json({
      packageName: pkg?.name || seat.package_id,
      packageEmoji: pkg?.emoji || '📦',
      ownerName: ownerName,
      inviteEmail: seat.invite_email,
    })
  } catch (err) {
    console.error('Error in invite-preview:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
