import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

// Reliable auth check endpoint — uses getUser() which sends cookies to Supabase
// for validation. Works even when chunked cookies can't be reassembled locally.
export async function GET() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ user: null }, { status: 200 })

  const { data: purchases } = await supabase
    .from('purchases')
    .select('package_id')
    .eq('user_id', user.id)

  return NextResponse.json({
    user: { id: user.id, email: user.email },
    purchases: (purchases || []).map(p => p.package_id),
  }, { status: 200 })
}

export const dynamic = 'force-dynamic'
