import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'

// R2 public download URLs for all 7 music products
const DOWNLOAD_FILES = {
  'growing-early': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Growing-Minds-Early-Years-Songs.zip',
  'growing-junior': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Growing-Minds-Junior-Songs.zip',
  'street': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Street-Smart-Songs.zip',
  'nest': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Nest-Breaking-Songs.zip',
  'roaming': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Roaming-Free-Songs.zip',
  'aging': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Aging-Wisdom-Songs.zip',
  'parents': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Family-Anchor-Songs.zip',
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

    // ── Auth check: require either a valid Stripe session OR a DB purchase record ──

    let verified = false

    // Method 1: Stripe session_id (used in confirmation email links)
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if (session.payment_status === 'paid') {
          verified = true
        }
      } catch (error) {
        console.error('Session verification error:', error)
      }
    }

    // Method 2: Logged-in user with a music_purchases record
    if (!verified) {
      try {
        const cookieStore = await cookies()
        const supabase = createClient(cookieStore)
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const adminClient = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
          )
          const { data: purchase } = await adminClient
            .from('music_purchases')
            .select('id')
            .eq('user_id', user.id)
            .eq('product_id', product)
            .maybeSingle()

          if (purchase) {
            verified = true
          }
        }
      } catch (error) {
        console.error('Auth verification error:', error)
      }
    }

    if (!verified) {
      return NextResponse.json(
        { error: 'Purchase not found. Please log in or use the download link from your confirmation email.' },
        { status: 403 }
      )
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
