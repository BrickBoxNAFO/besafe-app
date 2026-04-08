import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { PACKAGES } from '@/lib/data'

export async function GET(request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const seatId = new URL(request.url).searchParams.get('seatId')
  if (!seatId) return NextResponse.json({ error: 'Missing seatId' }, { status: 400 })

  const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data: seat } = await admin.from('seats').select('*').eq('id', seatId).eq('owner_user_id', user.id).maybeSingle()

  if (!seat) return NextResponse.json({ error: 'Seat not found' }, { status: 404 })
  if (seat.member_user_id) return NextResponse.json({ error: 'Seat already assigned' }, { status: 400 })

  const pkg = PACKAGES.find(p => p.id === seat.package_id)

  return NextResponse.json({
    seatId: seat.id,
    packageId: seat.package_id,
    packageName: pkg?.name || seat.package_id,
    packageEmoji: pkg?.emoji || '📦',
  })
}
