import Stripe from 'stripe'

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

/**
 * Multi-currency Stripe Price IDs.
 * Each region has its own set of Stripe prices.
 * Environment variable naming: STRIPE_PRICE_{PACKAGE}_{REGION}
 * Falls back to US prices if a region-specific price isn't set.
 */
const REGION_PRICE_IDS = {
  US: {
    growing:  process.env.STRIPE_PRICE_GROWING_MINDS_US  || process.env.STRIPE_PRICE_GROWING_MINDS,
    street:   process.env.STRIPE_PRICE_STREET_SMART_US   || process.env.STRIPE_PRICE_STREET_SMART,
    nest:     process.env.STRIPE_PRICE_NEST_BREAKING_US  || process.env.STRIPE_PRICE_NEST_BREAKING,
    roaming:  process.env.STRIPE_PRICE_ROAMING_FREE_US   || process.env.STRIPE_PRICE_ROAMING_FREE,
    aging:    process.env.STRIPE_PRICE_AGING_WISDOM_US   || process.env.STRIPE_PRICE_AGING_WISDOM,
    parents:  process.env.STRIPE_PRICE_FAMILY_ANCHOR_US  || process.env.STRIPE_PRICE_FAMILY_ANCHOR,
    bundle:   process.env.STRIPE_PRICE_BUNDLE_US         || process.env.STRIPE_PRICE_BUNDLE,
    complete: process.env.STRIPE_PRICE_COMPLETE_US       || process.env.STRIPE_PRICE_COMPLETE,
  },
  GB: {
    growing:  process.env.STRIPE_PRICE_GROWING_MINDS_GB,
    street:   process.env.STRIPE_PRICE_STREET_SMART_GB,
    nest:     process.env.STRIPE_PRICE_NEST_BREAKING_GB,
    roaming:  process.env.STRIPE_PRICE_ROAMING_FREE_GB,
    aging:    process.env.STRIPE_PRICE_AGING_WISDOM_GB,
    parents:  process.env.STRIPE_PRICE_FAMILY_ANCHOR_GB,
    bundle:   process.env.STRIPE_PRICE_BUNDLE_GB,
    complete: process.env.STRIPE_PRICE_COMPLETE_GB,
  },
  EU: {
    growing:  process.env.STRIPE_PRICE_GROWING_MINDS_EU,
    street:   process.env.STRIPE_PRICE_STREET_SMART_EU,
    nest:     process.env.STRIPE_PRICE_NEST_BREAKING_EU,
    roaming:  process.env.STRIPE_PRICE_ROAMING_FREE_EU,
    aging:    process.env.STRIPE_PRICE_AGING_WISDOM_EU,
    parents:  process.env.STRIPE_PRICE_FAMILY_ANCHOR_EU,
    bundle:   process.env.STRIPE_PRICE_BUNDLE_EU,
    complete: process.env.STRIPE_PRICE_COMPLETE_EU,
  },
  CA: {
    growing:  process.env.STRIPE_PRICE_GROWING_MINDS_CA,
    street:   process.env.STRIPE_PRICE_STREET_SMART_CA,
    nest:     process.env.STRIPE_PRICE_NEST_BREAKING_CA,
    roaming:  process.env.STRIPE_PRICE_ROAMING_FREE_CA,
    aging:    process.env.STRIPE_PRICE_AGING_WISDOM_CA,
    parents:  process.env.STRIPE_PRICE_FAMILY_ANCHOR_CA,
    bundle:   process.env.STRIPE_PRICE_BUNDLE_CA,
    complete: process.env.STRIPE_PRICE_COMPLETE_CA,
  },
  AU: {
    growing:  process.env.STRIPE_PRICE_GROWING_MINDS_AU,
    street:   process.env.STRIPE_PRICE_STREET_SMART_AU,
    nest:     process.env.STRIPE_PRICE_NEST_BREAKING_AU,
    roaming:  process.env.STRIPE_PRICE_ROAMING_FREE_AU,
    aging:    process.env.STRIPE_PRICE_AGING_WISDOM_AU,
    parents:  process.env.STRIPE_PRICE_FAMILY_ANCHOR_AU,
    bundle:   process.env.STRIPE_PRICE_BUNDLE_AU,
    complete: process.env.STRIPE_PRICE_COMPLETE_AU,
  },
  NZ: {
    growing:  process.env.STRIPE_PRICE_GROWING_MINDS_NZ,
    street:   process.env.STRIPE_PRICE_STREET_SMART_NZ,
    nest:     process.env.STRIPE_PRICE_NEST_BREAKING_NZ,
    roaming:  process.env.STRIPE_PRICE_ROAMING_FREE_NZ,
    aging:    process.env.STRIPE_PRICE_AGING_WISDOM_NZ,
    parents:  process.env.STRIPE_PRICE_FAMILY_ANCHOR_NZ,
    bundle:   process.env.STRIPE_PRICE_BUNDLE_NZ,
    complete: process.env.STRIPE_PRICE_COMPLETE_NZ,
  },
}

/**
 * Music download Stripe Price IDs per region.
 * Environment variable naming: STRIPE_PRICE_MUSIC_{PRODUCT}_{REGION}
 */
const MUSIC_REGION_PRICE_IDS = {
  US: {
    'growing-early': process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY_US || process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY,
    'growing-junior': process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR_US || process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR,
    'street':         process.env.STRIPE_PRICE_MUSIC_STREET_SMART_US  || process.env.STRIPE_PRICE_MUSIC_STREET_SMART,
    'aging':          process.env.STRIPE_PRICE_MUSIC_AGING_WISDOM_US  || process.env.STRIPE_PRICE_MUSIC_AGING_WISDOM,
    'nest':           process.env.STRIPE_PRICE_MUSIC_NEST_BREAKING_US || process.env.STRIPE_PRICE_MUSIC_NEST_BREAKING,
    'roaming':        process.env.STRIPE_PRICE_MUSIC_ROAMING_FREE_US  || process.env.STRIPE_PRICE_MUSIC_ROAMING_FREE,
    'parents':        process.env.STRIPE_PRICE_MUSIC_FAMILY_ANCHOR_US || process.env.STRIPE_PRICE_MUSIC_FAMILY_ANCHOR,
  },
  GB: {
    'growing-early': process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY_GB,
    'growing-junior': process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR_GB,
    'street':         process.env.STRIPE_PRICE_MUSIC_STREET_SMART_GB,
    'aging':          process.env.STRIPE_PRICE_MUSIC_AGING_WISDOM_GB,
    'nest':           process.env.STRIPE_PRICE_MUSIC_NEST_BREAKING_GB,
    'roaming':        process.env.STRIPE_PRICE_MUSIC_ROAMING_FREE_GB,
    'parents':        process.env.STRIPE_PRICE_MUSIC_FAMILY_ANCHOR_GB,
  },
  EU: {
    'growing-early': process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY_EU,
    'growing-junior': process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR_EU,
    'street':         process.env.STRIPE_PRICE_MUSIC_STREET_SMART_EU,
    'aging':          process.env.STRIPE_PRICE_MUSIC_AGING_WISDOM_EU,
    'nest':           process.env.STRIPE_PRICE_MUSIC_NEST_BREAKING_EU,
    'roaming':        process.env.STRIPE_PRICE_MUSIC_ROAMING_FREE_EU,
    'parents':        process.env.STRIPE_PRICE_MUSIC_FAMILY_ANCHOR_EU,
  },
  CA: {
    'growing-early': process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY_CA,
    'growing-junior': process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR_CA,
    'street':         process.env.STRIPE_PRICE_MUSIC_STREET_SMART_CA,
    'aging':          process.env.STRIPE_PRICE_MUSIC_AGING_WISDOM_CA,
    'nest':           process.env.STRIPE_PRICE_MUSIC_NEST_BREAKING_CA,
    'roaming':        process.env.STRIPE_PRICE_MUSIC_ROAMING_FREE_CA,
    'parents':        process.env.STRIPE_PRICE_MUSIC_FAMILY_ANCHOR_CA,
  },
  AU: {
    'growing-early': process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY_AU,
    'growing-junior': process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR_AU,
    'street':         process.env.STRIPE_PRICE_MUSIC_STREET_SMART_AU,
    'aging':          process.env.STRIPE_PRICE_MUSIC_AGING_WISDOM_AU,
    'nest':           process.env.STRIPE_PRICE_MUSIC_NEST_BREAKING_AU,
    'roaming':        process.env.STRIPE_PRICE_MUSIC_ROAMING_FREE_AU,
    'parents':        process.env.STRIPE_PRICE_MUSIC_FAMILY_ANCHOR_AU,
  },
  NZ: {
    'growing-early': process.env.STRIPE_PRICE_MUSIC_GROWING_EARLY_NZ,
    'growing-junior': process.env.STRIPE_PRICE_MUSIC_GROWING_JUNIOR_NZ,
    'street':         process.env.STRIPE_PRICE_MUSIC_STREET_SMART_NZ,
    'aging':          process.env.STRIPE_PRICE_MUSIC_AGING_WISDOM_NZ,
    'nest':           process.env.STRIPE_PRICE_MUSIC_NEST_BREAKING_NZ,
    'roaming':        process.env.STRIPE_PRICE_MUSIC_ROAMING_FREE_NZ,
    'parents':        process.env.STRIPE_PRICE_MUSIC_FAMILY_ANCHOR_NZ,
  },
}

/**
 * Get the Stripe Price ID for a music product in a specific region.
 * Falls back to US price if region-specific price isn't configured.
 */
export function getMusicStripePriceId(productId, regionCode) {
  const rc = regionCode || 'US'
  const regionPrices = MUSIC_REGION_PRICE_IDS[rc]
  const priceId = regionPrices?.[productId]
  if (!priceId) return MUSIC_REGION_PRICE_IDS.US[productId]
  return priceId
}

// Legacy flat map (US defaults) for backward compatibility
export const PRICE_IDS = REGION_PRICE_IDS.US

/**
 * Get the Stripe Price ID for a package in a specific region.
 * Falls back to US price if region-specific price isn't configured.
 */
export function getStripePriceId(packageId, regionCode) {
  const rc = regionCode || 'US'
  const regionPrices = REGION_PRICE_IDS[rc]
  const priceId = regionPrices?.[packageId]
  // Fall back to US if region price isn't set
  if (!priceId) return REGION_PRICE_IDS.US[packageId]
  return priceId
}

/**
 * Get the currency code for a region (for Stripe checkout).
 */
const REGION_CURRENCIES = {
  US: 'usd', GB: 'gbp', EU: 'eur', CA: 'cad', AU: 'aud', NZ: 'nzd',
}

export function getStripeCurrency(regionCode) {
  return REGION_CURRENCIES[regionCode] || 'usd'
}
