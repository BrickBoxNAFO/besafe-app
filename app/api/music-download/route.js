import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'

// Public R2 URLs for each music product ZIP. The original 4 packages are served
// from `/Site Music/Music Downloads/`; the 3 newer packages (nest, roaming,
// parents) were uploaded directly into the root `/Music Downloads/` folder.
const DOWNLOAD_FILES = {
  'growing-early':  'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Growing-Minds-Early-Years-Songs.zip',
  'growing-junior': 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Growing-Minds-Junior-Songs.zip',
  'street':         'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Street-Smart-Songs.zip',
  'aging':          'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Site%20Music/Music%20Downloads/Aging-Wisdom-Songs.zip',
  'nest':           'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Nest-Breaking-Songs.zip',
  'roaming':        'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Roaming-Free-Songs.zip',
  'parents':        'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev/Music%20Downloads/Family-Anchor-Songs.zip',
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const product = searchParams.get('product')
    const sessionId = searchParams.get('session_id')
    const userId = searchParams.get('user_id')

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

    // If session_id provided, verify purchase and log it
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if (session.payment_status === 'paid' && session.metadata?.user_id) {
          const supabase = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
          )

          // Log the download access
          await supabase.from('music_purchases').insert({
            user_id: session.metadata.user_id,
            product_id: product,
            stripe_session_id: sessionId,
            created_at: new Date().toISOString(),
          }).catch(e => console.error('DB logging error:', e))
        }
      } catch (error) {
        console.error('Session verification error:', error)
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
