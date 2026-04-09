#!/usr/bin/env node
/**
 * Creates multi-currency Stripe prices for the 3 music download products.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-music-prices.js
 *
 * This will:
 *   1. Create one-time prices in GBP, EUR, CAD, AUD, NZD for each product
 *   2. Print the env vars you need to add to .env.local
 *
 * Products (already exist in Stripe):
 *   - Growing Minds Early Years Songs  → prod_UIsz3YUYpcWFyK
 *   - Growing Minds Junior Songs       → prod_UIszFYfPXF9dYh
 *   - Street Smart Songs               → prod_UIt0v4c4ZtLF0L
 */

const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRODUCTS = [
  { id: 'prod_UIsz3YUYpcWFyK', envKey: 'GROWING_EARLY', name: 'Growing Minds Early Years Songs' },
  { id: 'prod_UIszFYfPXF9dYh', envKey: 'GROWING_JUNIOR', name: 'Growing Minds Junior Songs' },
  { id: 'prod_UIt0v4c4ZtLF0L', envKey: 'STREET_SMART',   name: 'Street Smart Songs' },
]

// Prices in lowest currency unit (cents/pence)
const CURRENCY_PRICES = [
  { region: 'GB', currency: 'gbp', amount: 499 },
  { region: 'EU', currency: 'eur', amount: 499 },
  { region: 'CA', currency: 'cad', amount: 699 },
  { region: 'AU', currency: 'aud', amount: 799 },
  { region: 'NZ', currency: 'nzd', amount: 849 },
]

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('ERROR: Set STRIPE_SECRET_KEY environment variable first.')
    console.error('Usage: STRIPE_SECRET_KEY=sk_live_xxx node scripts/create-music-prices.js')
    process.exit(1)
  }

  console.log('Creating multi-currency music prices in Stripe...\n')

  const envLines = []

  for (const product of PRODUCTS) {
    console.log(`── ${product.name} (${product.id}) ──`)

    for (const cp of CURRENCY_PRICES) {
      try {
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: cp.amount,
          currency: cp.currency,
          metadata: {
            region: cp.region,
            type: 'music_download',
          },
        })

        const envVar = `STRIPE_PRICE_MUSIC_${product.envKey}_${cp.region}`
        envLines.push(`${envVar}=${price.id}`)
        console.log(`  ✓ ${cp.region} (${cp.currency.toUpperCase()} ${(cp.amount / 100).toFixed(2)}) → ${price.id}`)
      } catch (err) {
        console.error(`  ✗ ${cp.region} FAILED: ${err.message}`)
      }
    }
    console.log()
  }

  // Also remind about the existing US prices
  console.log('═══════════════════════════════════════════')
  console.log('Add these to your .env.local:')
  console.log('═══════════════════════════════════════════\n')
  console.log('# Music download prices (USD prices already set — add these regional ones)')
  for (const line of envLines) {
    console.log(line)
  }
  console.log()
  console.log('Done! Don\'t forget to also set the US prices if not already set:')
  console.log('  STRIPE_PRICE_MUSIC_GROWING_EARLY=price_xxx  (your existing USD price)')
  console.log('  STRIPE_PRICE_MUSIC_GROWING_JUNIOR=price_xxx')
  console.log('  STRIPE_PRICE_MUSIC_STREET_SMART=price_xxx')
}

main().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
