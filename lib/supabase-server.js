import { createClient as createServerClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { createClient as createAdminClient } from '@supabase/supabase-js'

// Convenience wrapper matches the pattern used in pages
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(cookieStore)
}

// Admin client bypasses RLS, server-only, never expose to client
export function createAdminSupabaseClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}
