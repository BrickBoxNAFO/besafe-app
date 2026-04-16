/**
 * Country code to region mapping
 */
const countryToRegionMap = {
  // North America
  'US': 'US',
  'CA': 'CA',

  // Europe
  'GB': 'GB',
  'IE': 'EU',
  'FR': 'EU',
  'DE': 'EU',
  'IT': 'EU',
  'ES': 'EU',
  'NL': 'EU',
  'BE': 'EU',
  'SE': 'EU',
  'NO': 'EU',
  'DK': 'EU',
  'FI': 'EU',
  'PL': 'EU',
  'CZ': 'EU',
  'AT': 'EU',
  'CH': 'EU',
  'PT': 'EU',
  'GR': 'EU',
  'HU': 'EU',
  'RO': 'EU',
  'BG': 'EU',
  'HR': 'EU',
  'SI': 'EU',
  'LU': 'EU',

  // Oceania
  'AU': 'AU',
  'NZ': 'NZ',
};

/**
 * Get the region from the request
 * Priority: Vercel IP header > cookie > default to US
 * @param {Request} request - Next.js request object
 * @returns {string} Region code (US, GB, EU, CA, AU, NZ)
 */
export function getRegion(request) {
  // Try to get country from Vercel IP header
  const countryCode = request.headers.get('x-vercel-ip-country');

  if (countryCode) {
    const region = countryToRegion(countryCode);
    if (region) {
      return region;
    }
  }

  // Try to get from cookie
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    if (cookies.pricing_region) {
      return cookies.pricing_region;
    }
  }

  // Default to US
  return 'US';
}

/**
 * Map country code to region
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code
 * @returns {string|null} Region code or null if not found
 */
export function countryToRegion(countryCode) {
  if (!countryCode) {
    return null;
  }

  return countryToRegionMap[countryCode.toUpperCase()] || null;
}
