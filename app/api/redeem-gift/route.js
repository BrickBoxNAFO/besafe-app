import { NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'

export async function POST(request) {
  try {
    const { token, userId } = await request.json()

    if (!token || !userId) {
      return NextResponse.json({ error: 'Missing token or userId' }, { status: 400 })
    }

    const adminClient = createAdminSupabaseClient()

    // Find gift by token
    const { data: giftRows } = await adminClient
      .from('gifts')
      .select('*')
      .eq('token', token)

    if (!giftRows || giftRows.length === 0) {
      return NextResponse.json({ error: 'Invalid gift token' }, { status: 400 })
    }

    const gift = giftRows[0]

    if (gift.redeemed) {
      return NextResponse.json({ error: 'Gift already redeemed' }, { status: 400 })
    }

    // Mark gift as redeemed
    const { error: updateError } = await adminClient
      .from('gifts')
      .update({
        redeemed: true,
        redeemed_by: userId,
        redeemed_at: new Date().toISOString(),
      })
      .eq('id', gift.id)

    if (updateError) {
      console.error('Error marking gift as redeemed:', updateError)
      return NextResponse.json({ error: 'Failed to redeem gift' }, { status: 500 })
    }

    // Create purchase record for the user
    const { error: purchaseError } = await adminClient
      .from('purchases')
      .insert({
        user_id: userId,
        package_id: gift.package_id,
        purchased_at: new Date().toISOString(),
      })

    if (purchaseError) {
      console.error('Error creating purchase:', purchaseError)
      return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      packageId: gift.package_id,
    })
  } catch (err) {
    console.error('Error in redeem-gift:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
