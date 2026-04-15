import Stripe from 'stripe'

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

// Maps package IDs to Stripe Price IDs
export const PRICE_IDS = {
  growing:  process.env.STRIPE_PRICE_GROWING_MINDS,
  nest:     process.env.STRIPE_PRICE_NEST_BREAKING,
  roaming:  process.env.STRIPE_PRICE_ROAMING_FREE,
  aging:    process.env.STRIPE_PRICE_AGING_WISDOM,
  parents:  process.env.STRIPE_PRICE_FAMILY_ANCHOR,
  bundle:   process.env.STRIPE_PRICE_BUNDLE,
}
