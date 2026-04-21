import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { PACKAGES } from '@/lib/data'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    // Use admin client to bypass RLS — unauthenticated visitors need to
    // preview the invite before they sign up / log in.
    const adminClient = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Find seat by invite_token
    const { data: seatRows } = await adminClient
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
    const { data: ownerAuth } = await adminClient.auth.admin.getUserById(seat.owner_user_id)
    const ownerName = ownerAuth?.user?.user_metadata?.name || ownerAuth?.user?.email?.split('@')[0]

    return NextResponse.json({
      packageName: pkg?.name || seat.package_id,
      packageEmoji: pkg?.emoji || '',
      ownerName: ownerName,
      inviteEmail: seat.invite_email,
    })
  } catch (err) {
    console.error('Error in invite-preview:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
