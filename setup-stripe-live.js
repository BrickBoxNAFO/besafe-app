#!/usr/bin/env node

/**
 * HomeSafeEducation - Stripe LIVE Mode Price Setup Script
 *
 * This script creates all regional prices for every package in Stripe LIVE mode.
 * Run it once to set up pricing for US, UK, EU, Canada, Australia, and New Zealand.
 *
 * Usage (PowerShell):
 *   1. $env:STRIPE_SECRET_KEY="sk_live_your_key_here"
 *   2. node setup-stripe-live.js
 */

const Stripe = require('stripe')

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
if (!STRIPE_SECRET_KEY) {
  console.error('\n Missing STRIPE_SECRET_KEY environment variable.')
  console.error('   In PowerShell run: $env:STRIPE_SECRET_KEY="sk_live_your_key_here"')
  console.error('   Then run this script again.\n')
  process.exit(1)
}

if (!STRIPE_SECRET_KEY.startsWith('sk_live_')) {
  console.error('\n This does not look like a LIVE secret key.')
  console.error('   Make sure your key starts with sk_live_')
  console.error('   (Not sk_test_)\n')
  process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY)

// Product definitions
const PRODUCTS = [
  { id: 'growing',  name: 'Growing Minds',       description: 'Children aged 4-11 (2-in-1 Bundle)' },
  { id: 'street',   name: 'Street Smart',        description: 'Teenagers aged 12-17' },
  { id: 'nest',     name: 'Nest Breaking',       description: 'Young Adults aged 16-25' },
  { id: 'roaming',  name: 'Roaming Free',        description: 'Travellers' },
  { id: 'aging',    name: 'Aging Wisdom',        description: 'Older Adults aged 60+' },
  { id: 'parents',  name: 'Family Anchor',       description: 'Parents & Guardians' },
  { id: 'bundle',   name: 'Family Safety Bundle', description: 'Any 5 packages for your family' },
  { id: 'complete', name: 'Complete Library',     description: 'All 7 packages' },
]

// Regional pricing (in smallest currency unit: cents/pence)
const PRICES = {
  US: {
    currency: 'usd',
    amounts: {
      growing: 3499, street: 3999, nest: 4999, roaming: 5999,
      aging: 3999, parents: 4999, bundle: 12999, complete: 21999,
    },
  },
  GB: {
    currency: 'gbp',
    amounts: {
      growing: 2299, street: 2799, nest: 3499, roaming: 4299,
      aging: 2799, parents: 3499, bundle: 8999, complete: 14999,
    },
  },
  EU: {
    currency: 'eur',
    amounts: {
      growing: 2799, street: 3499, nest: 4299, roaming: 4999,
      aging: 3499, parents: 4299, bundle: 10999, complete: 17999,
    },
  },
  CA: {
    currency: 'cad',
    amounts: {
      growing: 4499, street: 4999, nest: 6499, roaming: 7999,
      aging: 4999, parents: 6499, bundle: 16999, complete: 27999,
    },
  },
  AU: {
    currency: 'aud',
    amounts: {
      growing: 4799, street: 5499, nest: 6999, roaming: 8499,
      aging: 5499, parents: 6999, bundle: 17999, complete: 29999,
    },
  },
  NZ: {
    currency: 'nzd',
    amounts: {
      growing: 4999, street: 5799, nest: 7499, roaming: 8999,
      aging: 5799, parents: 7499, bundle: 18999, complete: 31999,
    },
  },
}

// ENV variable name mapping
const ENV_NAMES = {
  growing:  'GROWING_MINDS',
  street:   'STREET_SMART',
  nest:     'NEST_BREAKING',
  roaming:  'ROAMING_FREE',
  aging:    'AGING_WISDOM',
  parents:  'FAMILY_ANCHOR',
  bundle:   'BUNDLE',
  complete: 'COMPLETE',
}

async function main() {
  console.log('\n HomeSafeEducation - Stripe LIVE Mode Price Setup')
  console.log('='.repeat(60))

  // Step 1: Find or create products
  console.log('\n Setting up products...')
  const productMap = {}

  for (const prod of PRODUCTS) {
    const existing = await stripe.products.search({
      query: `name:"${prod.name}"`,
    })

    if (existing.data.length > 0) {
      productMap[prod.id] = existing.data[0]
      console.log(`   Found existing: ${prod.name} (${existing.data[0].id})`)
    } else {
      const created = await stripe.products.create({
        name: prod.name,
        description: prod.description,
        metadata: { package_id: prod.id },
      })
      productMap[prod.id] = created
      console.log(`   Created: ${prod.name} (${created.id})`)
    }
  }

  // Step 2: Create prices for each region
  console.log('\n Creating regional prices...')
  const envVars = {}

  for (const [region, config] of Object.entries(PRICES)) {
    console.log(`\n   ${region} (${config.currency.toUpperCase()})`)

    for (const [pkgId, amountInCents] of Object.entries(config.amounts)) {
      const product = productMap[pkgId]
      const displayAmount = (amountInCents / 100).toFixed(2)

      const existingPrices = await stripe.prices.list({
        product: product.id,
        currency: config.currency,
        active: true,
        limit: 10,
      })

      const matchingPrice = existingPrices.data.find(
        p => p.unit_amount === amountInCents && p.type === 'one_time'
      )

      let priceId
      if (matchingPrice) {
        priceId = matchingPrice.id
        console.log(`      ${product.name}: ${config.currency.toUpperCase()} ${displayAmount} (existing: ${priceId})`)
      } else {
        const created = await stripe.prices.create({
          product: product.id,
          unit_amount: amountInCents,
          currency: config.currency,
          metadata: {
            package_id: pkgId,
            region: region,
          },
        })
        priceId = created.id
        console.log(`      ${product.name}: ${config.currency.toUpperCase()} ${displayAmount} (${priceId})`)
      }

      const envName = `STRIPE_PRICE_${ENV_NAMES[pkgId]}_${region}`
      envVars[envName] = priceId
    }
  }

  // Step 3: Output environment variables
  console.log('\n' + '='.repeat(60))
  console.log('ENVIRONMENT VARIABLES FOR VERCEL')
  console.log('='.repeat(60))
  console.log('\nCopy everything below and add to your Vercel project settings:')
  console.log('(Settings > Environment Variables)\n')

  for (const [name, value] of Object.entries(envVars)) {
    console.log(`${name}=${value}`)
  }

  // Also output backward-compatible US variables
  console.log('\n# Backward-compatible US defaults:')
  for (const [pkgId, _] of Object.entries(PRICES.US.amounts)) {
    const envName = `STRIPE_PRICE_${ENV_NAMES[pkgId]}`
    const usEnvName = `STRIPE_PRICE_${ENV_NAMES[pkgId]}_US`
    if (envVars[usEnvName]) {
      console.log(`${envName}=${envVars[usEnvName]}`)
    }
  }

  console.log('\n Done! Total prices created/found:', Object.keys(envVars).length)
  console.log('   Add these to Vercel, then redeploy your site.\n')
}

main().catch(err => {
  console.error('\n Error:', err.message)
  process.exit(1)
})
