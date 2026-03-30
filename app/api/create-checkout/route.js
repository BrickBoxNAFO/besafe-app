import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Payments are not yet active. Please check back soon.' },
    { status: 503 }
  )
}
