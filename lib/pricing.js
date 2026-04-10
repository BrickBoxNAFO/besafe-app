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
    growing:  34.99,
    street:   39.99,
    nest:     49.99,
    roaming:  59.99,
    aging:    39.99,
    parents:  49.99,
    bundle:   129.99,
    complete: 219.99,
  },
  GB: {
    growing:  22.99,
    street:   27.99,
    nest:     34.99,
    roaming:  42.99,
    aging:    27.99,
    parents:  34.99,
    bundle:   89.99,
    complete: 149.99,
  },
  EU: {
    growing:  27.99,
    street:   34.99,
    nest:     42.99,
    roaming:  49.99,
    aging:    34.99,
    parents:  42.99,
    bundle:   109.99,
    complete: 179.99,
  },
  CA: {
    growing:  44.99,
    street:   49.99,
    nest:     64.99,
    roaming:  79.99,
    aging:    49.99,
    parents:  64.99,
    bundle:   169.99,
    complete: 279.99,
  },
  AU: {
    growing:  47.99,
    street:   54.99,
    nest:     69.99,
    roaming:  84.99,
    aging:    54.99,
    parents:  69.99,
    bundle:   179.99,
    complete: 299.99,
  },
  NZ: {
    growing:  49.99,
    street:   57.99,
    nest:     74.99,
    roaming:  89.99,
    aging:    57.99,
    parents:  74.99,
    bundle:   189.99,
    complete: 319.99,
  },
}

/**
 * Music download prices per region.
 * One-time purchase for the complete song collection of a package.
 */
export const MUSIC_PRICES = {
  US: { 'growing-early': 4.99, 'growing-junior': 4.99, 'street': 4.99, 'aging': 4.99 },
  GB: { 'growing-early': 4.99, 'growing-junior': 4.99, 'street': 4.99, 'aging': 4.99 },
  EU: { 'growing-early': 4.99, 'growing-junior': 4.99, 'street': 4.99, 'aging': 4.99 },
  CA: { 'growing-early': 6.99, 'growing-junior': 6.99, 'street': 6.99, 'aging': 6.99 },
  AU: { 'growing-early': 7.99, 'growing-junior': 7.99, 'street': 7.99, 'aging': 7.99 },
  NZ: { 'growing-early': 8.49, 'growing-junior': 8.49, 'street': 8.49, 'aging': 8.49 },
}

/**
 * Get the formatted music price for a product in a given region.
 */
export function getMusicPrice(productId, regionCode) {
  const rc = regionCode || 'US'
  const prices = MUSIC_PRICES[rc] || MUSIC_PRICES.US
  const amount = prices[productId]
  if (amount == null) return null
  return formatPrice(amount, rc)
}

/**
 * Get the raw music price amount for a product in a given region.
 */
export function getMusicPriceAmount(productId, regionCode) {
  const rc = regionCode || 'US'
  const prices = MUSIC_PRICES[rc] || MUSIC_PRICES.US
  return prices[productId] ?? null
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
  CA: 308.95,  // 49.99+64.99+79.99+49.99+64.99
  AU: 333.95,  // 54.99+69.99+84.99+54.99+69.99
  NZ: 354.95,  // 57.99+74.99+89.99+57.99+74.99
}

/**
 * Bundle savings per region.
 */
export const BUNDLE_SAVINGS = {
  US: 109.96,  // 239.95-129.99
  GB: 78.96,   // 168.95-89.99
  EU: 94.96,   // 204.95-109.99
  CA: 138.96,  // 308.95-169.99
  AU: 153.96,  // 333.95-179.99
  NZ: 164.96,  // 354.95-189.99
}

/**
 * Complete Library "was" prices (sum of all 7 individual packages).
 */
export const COMPLETE_WAS_PRICES = {
  US: 273.94,  // 34.99+39.99+49.99+59.99+39.99+49.99
  GB: 191.94,  // 22.99+27.99+34.99+42.99+27.99+34.99
  EU: 232.94,  // 27.99+34.99+42.99+49.99+34.99+42.99
  CA: 353.94,  // 44.99+49.99+64.99+79.99+49.99+64.99
  AU: 381.94,  // 47.99+54.99+69.99+84.99+54.99+69.99
  NZ: 404.94,  // 49.99+57.99+74.99+89.99+57.99+74.99
}

/**
 * Complete Library savings per region.
 */
export const COMPLETE_SAVINGS = {
  US: 53.95,   // 273.94-219.99
  GB: 41.95,   // 191.94-149.99
  EU: 52.95,   // 232.94-179.99
  CA: 73.95,   // 353.94-279.99
  AU: 81.95,   // 381.94-299.99
  NZ: 84.95,   // 404.94-319.99
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
    completeWas: COMPLETE_WAS_PRICES[rc] || COMPLETE_WAS_PRICES.US,
    completeSavings: COMPLETE_SAVINGS[rc] || COMPLETE_SAVINGS.US,
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
