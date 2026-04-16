#!/usr/bin/env node
/**
 * Script to create Stripe prices for music products in multiple currencies.
 * Creates region-specific prices for each music product.
 *
 * Usage: node scripts/create-music-prices.js
 *
 * Requires environment variables:
 * - STRIPE_SECRET_KEY: Your Stripe secret API key
 * - STRIPE_PRODUCT_MUSIC_GROWING_EARLY: Product ID for Growing Minds Early Years
 * - STRIPE_PRODUCT_MUSIC_GROWING_JUNIOR: Product ID for Growing Minds Junior
 * - STRIPE_PRODUCT_MUSIC_STREET: Product ID for Street Smart
 * - STRIPE_PRODUCT_MUSIC_AGING: Product ID for Aging Wisdom
 *
 * Script will create and output environment variables for .env.local
 */

const Stripe = require('stripe')
require('dotenv').config({ path: '.env.local' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

// Pricing per region (in the respective currency's lowest unit)
// USD = cents, GBP = pence, EUR = cents, etc.
const PRICING = {
  'growing-early': {
    US: 4999,   // $49.99 USD
    GB: 3999,   // £39.99 GBP
    EU: 4499,   // €44.99 EUR
    CA: 6499,   // CAD$64.99
    AU: 7999,   // AU$79.99
    NZ: 8499,   // NZ$84.99
  },
  'growing-junior': {
    US: 4499,   // $44.99 USD
    GB: 3599,   // £35.99 GBP
    EU: 3999,   // €39.99 EUR
    CA: 5999,   // CAD$59.99
    AU: 7299,   // AU$72.99
    NZ: 7799,   // NZ$77.99
  },
  'street': {
    US: 3999,   // $39.99 USD
    GB: 3199,   // £31.99 GBP
    EU: 3599,   // €35.99 EUR
    CA: 5299,   // CAD$52.99
    AU: 6499,   // AU$64.99
    NZ: 6999,   // NZ$69.99
  },
  'aging': {
    US: 3499,   // $34.99 USD
    GB: 2799,   // £27.99 GBP
    EU: 3199,   // €31.99 EUR
    CA: 4699,   // CAD$46.99
    AU: 5699,   // AU$56.99
    NZ: 6199,   // NZ$61.99
  },
}

const CURRENCIES = {
  US: 'usd',
  GB: 'gbp',
  EU: 'eur',
  CA: 'cad',
  AU: 'aud',
  NZ: 'nzd',
}

async function createPrices() {
  console.log('Creating Stripe prices for music products...\n')

  const output = {}
  const errors = []

  for (const [product, regions] of Object.entries(PRICING)) {
    console.log(`\n${product}:`)

    const productId = process.env[`STRIPE_PRODUCT_MUSIC_${product.toUpperCase().replace(/-/g, '_')}`]
    if (!productId) {
      errors.push(`Missing product ID env var for ${product}`)
      console.log(`  ERROR: Missing product ID env var`)
      continue
    }

    for (const [region, amount] of Object.entries(regions)) {
      const currency = CURRENCIES[region]
      try {
        const price = await stripe.prices.create({
          product: productId,
          unit_amount: amount,
          currency: currency,
          billing_scheme: 'per_unit',
        })

        const envVar = `STRIPE_PRICE_MUSIC_${product.toUpperCase().replace(/-/g, '_')}_${region}`
        output[envVar] = price.id
        console.log(`  ${region}: ${price.id}`)
      } catch (error) {
        errors.push(`Failed to create price for ${product} in ${region}: ${error.message}`)
        console.log(`  ${region}: ERROR - ${error.message}`)
      }
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('Add these to your .env.local:')
  console.log('='.repeat(60))
  for (const [key, value] of Object.entries(output)) {
    console.log(`${key}=${value}`)
  }

  if (errors.length > 0) {
    console.log('\n' + '='.repeat(60))
    console.log('ERRORS:')
    console.log('='.repeat(60))
    errors.forEach(e => console.log(`  - ${e}`))
  }

  console.log('\nDone!')
}

createPrices().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
