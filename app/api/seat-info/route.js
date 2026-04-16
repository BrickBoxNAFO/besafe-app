import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { PACKAGES } from '@/lib/data'

export async function GET(request) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const seatId = searchParams.get('seatId')

    if (!seatId) {
      return NextResponse.json({ error: 'Missing seatId' }, { status: 400 })
    }

    // Get seat
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

    // Get package info
    const pkg = PACKAGES.find(p => p.id === seat.package_id)

    return NextResponse.json({
      seat: seat,
      package: pkg || null,
    })
  } catch (err) {
    console.error('Error in seat-info:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
