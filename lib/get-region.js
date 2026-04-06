import { cookies } from 'next/headers'
import { countryToRegion } from '@/lib/pricing'

/**
 * Server-side helper to get the current pricing region from the cookie.
 * Use in Server Components and API routes.
 */
export function getServerRegion() {
  try {
    const cookieStore = cookies()
    const region = cookieStore.get('pricing_region')?.value
    return region || 'US'
  } catch {
    return 'US'
  }
}
