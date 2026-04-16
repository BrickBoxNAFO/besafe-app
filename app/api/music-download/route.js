import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'

// R2 public download URLs for all 7 music products
const DOWNLOAD_FILES = {
  'growing-early': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Growing-Minds-Early-Years-Songs.zip',
  'growing-junior': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Growing-Minds-Junior-Songs.zip',
  'street': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Street-Smart-Songs.zip',
  'nest': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Nest-Breaking-Songs.zip',
  'roaming': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Roaming-Free-Songs.zip',
  'aging': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Aging-Wisdom-Songs.zip',
  'parents': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Family-Anchor-Songs.zip',
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const product = searchParams.get('product')
    const sessionId = searchParams.get('session_id')

    if (!product) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      )
    }

    const downloadUrl = DOWNLOAD_FILES[product]
    if (!downloadUrl) {
      return NextResponse.json(
        { error: 'Download not available for this product' },
        { status: 404 }
      )
    }

    // If session_id provided, verify the purchase is paid before allowing download
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if (session.payment_status !== 'paid') {
          return NextResponse.json(
            { error: 'Payment not completed' },
            { status: 403 }
          )
        }
      } catch (error) {
        console.error('Session verification error:', error)
        return NextResponse.json(
          { error: 'Could not verify purchase' },
          { status: 403 }
        )
      }
    }

    // Redirect to the R2 download file
    return NextResponse.redirect(downloadUrl)
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process download' },
      { status: 500 }
    )
  }
}
