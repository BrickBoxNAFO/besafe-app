import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  // If payments are globally live, everyone can purchase
  if (process.env.PAYMENTS_LIVE === 'true') {
    return NextResponse.json({ purchasesEnabled: true })
  }

  // Otherwise check if the logged-in user is a test user
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ purchasesEnabled: false })
  }

  const testEmails = (process.env.TEST_USER_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)

  const isTestUser = testEmails.includes(user.email.toLowerCase())
  return NextResponse.json({ purchasesEnabled: isTestUser })
}
