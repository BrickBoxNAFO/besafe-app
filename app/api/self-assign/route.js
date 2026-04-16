import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/**
 * POST /api/self-assign
 *
 * Two modes:
 *   1. { seatId }                       — claim an existing pending seat
 *                                         (single-package "assign later" or
 *                                         a free bundle seat). Sets
 *                                         member_user_id=self and creates
 *                                         the purchases row.
 *   2. { packageId } without seatId     — bundle/complete owner creates a new
 *                                         seat and assigns themselves to it.
 */
export async function POST(request) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { seatId, packageId } = await request.json()

    // ─── Mode 1: claim an existing seat ───
    if (seatId) {
      const { data: seat } = await supabase
        .from('seats')
        .select('*')
        .eq('id', seatId)
        .eq('owner_user_id', user.id)
        .maybeSingle()

      if (!seat) return NextResponse.json({ error: 'Seat not found' }, { status: 404 })
      if (seat.member_user_id) return NextResponse.json({ error: 'Seat is already assigned' }, { status: 400 })

      const { error: updateErr } = await supabase
        .from('seats')
        .update({
          member_user_id: user.id,
          member_name: user.user_metadata?.name || user.email,
          accepted_at: new Date().toISOString(),
          invite_token: null,
          invite_email: null,
        })
        .eq('id', seatId)
      if (updateErr) {
        console.error('Seat update error:', updateErr)
        return NextResponse.json({ error: 'Failed to claim seat' }, { status: 500 })
      }

      // Create purchases row so dashboard / library unlock immediately
      const { error: purchaseErr } = await supabase
        .from('purchases')
        .upsert({
          user_id: user.id,
          package_id: seat.package_id,
          purchased_at: new Date().toISOString(),
        }, { onConflict: 'user_id,package_id' })
      if (purchaseErr) console.error('Purchase upsert error:', purchaseErr)

      return NextResponse.json({ success: true })
    }

    // ─── Mode 2: bundle/complete — create new seat ───
    if (!packageId) {
      return NextResponse.json({ error: 'Missing packageId or seatId' }, { status: 400 })
    }

    const { data: purchaseRows } = await supabase
      .from('purchases')
      .select('package_id')
      .eq('user_id', user.id)
    const purchases = purchaseRows?.map(p => p.package_id) || []
    const hasBundle = purchases.includes('bundle')
    const hasComplete = purchases.includes('complete')

    if (!hasBundle && !hasComplete) {
      return NextResponse.json({ error: 'User does not own bundle or complete' }, { status: 403 })
    }

    const { data: seatRows } = await supabase
      .from('seats').select('id').eq('owner_user_id', user.id)
    const seatLimit = calculateSeatLimit(purchases)
    if ((seatRows?.length || 0) >= seatLimit) {
      return NextResponse.json({ error: 'Seat limit exceeded' }, { status: 400 })
    }

    const { data: newSeat, error: seatError } = await supabase
      .from('seats')
      .insert({
        owner_user_id: user.id,
        member_user_id: user.id,
        member_name: user.user_metadata?.name || user.email,
        package_id: packageId,
        accepted_at: new Date().toISOString(),
      })
      .select()

    if (seatError) {
      console.error('Error creating seat:', seatError)
      return NextResponse.json({ error: 'Failed to create seat' }, { status: 500 })
    }

    const { error: purchaseError } = await supabase
      .from('purchases')
      .upsert({
        user_id: user.id,
        package_id: packageId,
        purchased_at: new Date().toISOString(),
      }, { onConflict: 'user_id,package_id' })
    if (purchaseError) console.error('Purchase upsert error:', purchaseError)

    return NextResponse.json({ success: true, seat: newSeat?.[0] })
  } catch (err) {
    console.error('Error in self-assign:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function calculateSeatLimit(purchases) {
  let total = 0
  if (purchases.includes('bundle')) total += 5
  if (purchases.includes('complete')) total += 7
  if (purchases.includes('gift_later')) total += 1
  return Math.max(total, 5)
}
