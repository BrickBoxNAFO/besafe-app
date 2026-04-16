import { NextResponse } from 'next/server'

export async function GET() {
  // Purchases are enabled when Stripe is configured
  const purchasesEnabled = !!process.env.STRIPE_SECRET_KEY
  return NextResponse.json({ purchasesEnabled })
}
