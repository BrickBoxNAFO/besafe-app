import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function POST(request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'You must be logged in to accept an invite' }, { status: 401 })
    const { token } = await request.json()
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data: seat } = await admin.from('seats').select('*').eq('invite_token', token).maybeSingle()
    if (!seat) return NextResponse.json({ error: 'Invalid or expired invite link' }, { status: 404 })
    if (seat.member_user_id) return NextResponse.json({ error: 'This invite has already been used' }, { status: 400 })
    if (seat.owner_user_id === user.id) return NextResponse.json({ error: 'You cannot accept your own invite' }, { status: 400 })
    await admin.from('seats').update({ member_user_id: user.id, member_name: user.user_metadata?.name || seat.invite_email, accepted_at: new Date().toISOString() }).eq('id', seat.id)
    await admin.from('purchases').upsert({ user_id: user.id, package_id: seat.package_id, stripe_payment_intent: 'seat_invite', purchased_at: new Date().toISOString() }, { onConflict: 'user_id,package_id' })
    return NextResponse.json({ success: true, packageId: seat.package_id })
  } catch (err) {
    console.error('Accept invite error:', err)
    return NextResponse.json({ error: 'Failed to accept invite' }, { status: 500 })
  }
}
