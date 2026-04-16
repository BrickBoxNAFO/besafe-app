import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    return NextResponse.json({
      authenticated: !!user,
      user: user ? { id: user.id, email: user.email } : null,
    })
  } catch (err) {
    return NextResponse.json({
      authenticated: false,
      user: null,
    })
  }
}
