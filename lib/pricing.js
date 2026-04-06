/**
 * Centralized pricing configuration for all regions.
 * Prices are market-adjusted per region (not simple currency conversions).
 * US is the premium market with the highest prices.
 */

export const REGIONS = {
  US: {
    code: 'US',
    currency: 'USD',
    symbol: '$',
    label: 'United States',
    locale: 'en-US',
  },
  GB: {
    code: 'GB',
    currency: 'GBP',
    symbol: '\u00a3',
    label: 'United Kingdom',
    locale: 'en-GB',
  },
  EU: {
    code: 'EU',
    currency: 'EUR',
    symbol: '\u20ac',
    label: 'Europe',
    locale: 'en-IE',
  },
  CA: {
    code: 'CA',
    currency: 'CAD',
    symbol: 'CA$',
    label: 'Canada',
    locale: 'en-CA',
  },
  AU: {
    code: 'AU',
    currency: 'AUD',
    symbol: 'A$',
    label: 'Australia',
    locale: 'en-AU',
  },
  NZ: {
    code: 'NZ',
    currency: 'NZD',
    symbol: 'NZ$',
    label: 'New Zealand',
    locale: 'en-NZ',
  },
}

// EU member country codes -> map to EU region
const EU_COUNTRIES = [
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU',
  'IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE',
  // Also include EEA + CH for simplicity
  'IS','LI','NO','CH',
]

/**
 * Package prices per region.
 * Keys match the package IDs used across the site.
 */
export const PRICES = {
  US: {
    growing:  29.99,
    street:   39.99,
    nest:     49.99,
    roaming:  59.99,
    aging:    39.99,
    parents:  49.99,
    bundle:   149.99,
    complete: 199.99,
  },
  GB: {
    growing:  19.99,
    street:   27.99,
    nest:     34.99,
    roaming:  42.99,
    aging:    27.99,
    parents:  34.99,
    bundle:   99.99,
    complete: 139.99,
  },
  EU: {
    growing:  24.99,
    street:   34.99,
    nest:     42.99,
    roaming:  49.99,
    aging:    34.99,
    parents:  42.99,
    bundle:   119.99,
    complete: 164.99,
  },
  CA: {
    growing:  34.99,
    street:   49.99,
    nest:     59.99,
    roaming:  74.99,
    aging:    49.99,
    parents:  59.99,
    bundle:   189.99,
    complete: 249.99,
  },
  AU: {
    growing:  39.99,
    street:   54.99,
    nest:     64.99,
    roaming:  79.99,
    aging:    54.99,
    parents:  64.99,
    bundle:   199.99,
    complete: 269.99,
  },
  NZ: {
    growing:  42.99,
    street:   57.99,
    nest:     69.99,
    roaming:  84.99,
    aging:    57.99,
    parents:  69.99,
    bundle:   214.99,
    complete: 289.99,
  },
}

/**
 * "Was" prices for the bundle (crossed-out comparison price).
 * Calculated as: sum of all 5 individual package prices (excluding growing + complete).
 * street + nest + roaming + aging + parents
 */
export const BUNDLE_WAS_PRICES = {
  US: 239.95,  // 39.99+49.99+59.99+39.99+49.99
  GB: 168.95,  // 27.99+34.99+42.99+27.99+34.99
  EU: 204.95,  // 34.99+42.99+49.99+34.99+42.99
  CA: 293.95,  // 49.99+59.99+74.99+49.99+59.99
  AU: 318.95,  // 54.99+64.99+79.99+54.99+64.99
  NZ: 339.95,  // 57.99+69.99+84.99+57.99+69.99
}

/**
 * Bundle savings per region.
 */
export const BUNDLE_SAVINGS = {
  US: 89.96,
  GB: 68.96,
  EU: 84.96,
  CA: 103.96,
  AU: 118.96,
  NZ: 124.96,
}

/**
 * Resolve a 2-letter country code to a region code.
 */
export function countryToRegion(countryCode) {
  if (!countryCode) return 'US'
  const cc = countryCode.toUpperCase()
  if (cc === 'US') return 'US'
  if (cc === 'GB') return 'GB'
  if (cc === 'CA') return 'CA'
  if (cc === 'AU') return 'AU'
  if (cc === 'NZ') return 'NZ'
  if (EU_COUNTRIES.includes(cc)) return 'EU'
  // Default: US for all other countries
  return 'US'
}

/**
 * Format a price for display with the correct currency symbol.
 */
export function formatPrice(amount, regionCode) {
  const region = REGIONS[regionCode] || REGIONS.US
  return `${region.symbol}${amount.toFixed(2)}`
}

/**
 * Get all pricing data for a given region.
 */
export function getRegionPricing(regionCode) {
  const rc = regionCode || 'US'
  return {
    region: REGIONS[rc] || REGIONS.US,
    prices: PRICES[rc] || PRICES.US,
    bundleWas: BUNDLE_WAS_PRICES[rc] || BUNDLE_WAS_PRICES.US,
    bundleSavings: BUNDLE_SAVINGS[rc] || BUNDLE_SAVINGS.US,
  }
}

/**
 * Get the price display string for a package in a given region.
 */
export function getPackagePrice(packageId, regionCode) {
  const rc = regionCode || 'US'
  const prices = PRICES[rc] || PRICES.US
  const amount = prices[packageId]
  if (amount == null) return null
  return formatPrice(amount, rc)
}

/**
 * Get the individual package price amount (number) for a given region.
 * Used for packages that share a common price (currently growing is unique per region).
 */
export function getIndividualPrice(packageId, regionCode) {
  const rc = regionCode || 'US'
  const prices = PRICES[rc] || PRICES.US
  return prices[packageId] ?? null
}
