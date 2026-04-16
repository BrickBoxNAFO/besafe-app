import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { seatId, packageId } = await request.json()

    if (!packageId) {
      return NextResponse.json({ error: 'Missing packageId' }, { status: 400 })
    }

    // Verify user owns bundle or complete
    const { data: purchaseRows } = await supabase
      .from('purchases')
      .select('package_id')
      .eq('user_id', user.id)

    const purchases = purchaseRows?.map(p => p.package_id) || []
    const hasBundle = purchases.includes('bundle')
    const hasComplete = purchases.includes('complete')

    if (!hasBundle && !hasComplete) {
      return NextResponse.json(
        { error: 'User does not own bundle or complete' },
        { status: 403 }
      )
    }

    // Get all seats for this user to check limit
    const { data: seatRows } = await supabase
      .from('seats')
      .select('id')
      .eq('owner_user_id', user.id)

    const seatLimit = calculateSeatLimit(purchases)
    if ((seatRows?.length || 0) >= seatLimit) {
      return NextResponse.json({ error: 'Seat limit exceeded' }, { status: 400 })
    }

    // Create seat record (owner and member are the same)
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

    // Create purchase record for the package
    const { error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        package_id: packageId,
        purchased_at: new Date().toISOString(),
      })

    if (purchaseError) {
      console.error('Error creating purchase:', purchaseError)
      return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 })
    }

    return NextResponse.json({ success: true, seat: newSeat[0] })
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
