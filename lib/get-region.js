import { cookies, headers } from 'next/headers'
import { countryToRegion } from '@/lib/pricing'

/**
 * Server-side helper to get the current pricing region.
 * Reads the x-vercel-ip-country header directly (most reliable),
 * falls back to the pricing_region cookie set by middleware.
 */
export function getServerRegion() {
  try {
    // Primary: read Vercel's geo header directly — always present on Vercel
    const headerStore = headers()
    const country = headerStore.get('x-vercel-ip-country') || ''
    if (country) {
      return countryToRegion(country)
    }

    // Fallback: check the cookie set by middleware
    const cookieStore = cookies()
    const region = cookieStore.get('pricing_region')?.value
    if (region) return region

    return 'US'
  } catch {
    return 'US'
  }
}
