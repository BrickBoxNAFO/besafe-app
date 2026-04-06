import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

const SEAT_LIMIT = 5

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

    const { packageId } = await request.json()
    if (!packageId) return NextResponse.json({ error: 'Package selection is required' }, { status: 400 })

    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Verify the user owns a bundle or complete package
    const { data: bundlePurchases } = await supabase.from('purchases').select('package_id').eq('user_id', user.id).in('package_id', ['bundle', 'complete'])
    if (!bundlePurchases || bundlePurchases.length === 0) {
      return NextResponse.json({ error: 'Bundle or Complete Library purchase not found' }, { status: 403 })
    }

    // Check seat limit
    const { data: existingSeats } = await admin.from('seats').select('id').eq('owner_user_id', user.id)
    if ((existingSeats || []).length >= SEAT_LIMIT) {
      return NextResponse.json({ error: 'You have reached the maximum of 5 seats' }, { status: 400 })
    }

    // Create seat and immediately mark it as accepted (self-assigned)
    const { error: seatError } = await admin.from('seats').insert({
      owner_user_id: user.id,
      package_id: packageId,
      invite_email: user.email,
      member_user_id: user.id,
      member_name: user.user_metadata?.name || 'You',
      accepted_at: new Date().toISOString(),
    })
    if (seatError) {
      console.error('Self-assign seat error:', seatError)
      return NextResponse.json({ error: 'Failed to assign seat' }, { status: 500 })
    }

    // Grant access to the package
    await admin.from('purchases').upsert({
      user_id: user.id,
      package_id: packageId,
      stripe_payment_intent: 'self_assign',
      purchased_at: new Date().toISOString(),
    }, { onConflict: 'user_id,package_id' })

    return NextResponse.json({ success: true, packageId })
  } catch (err) {
    console.error('Self-assign error:', err)
    return NextResponse.json({ error: 'Failed to assign package' }, { status: 500 })
  }
}
