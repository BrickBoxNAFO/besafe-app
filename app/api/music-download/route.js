import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { MUSIC_PRODUCT_NAMES } from '@/lib/music-collections'

/* ────────────────────────────────────────────
   Music Download API
   Verifies purchase, then redirects to the
   pre-built download file hosted on R2.
   ──────────────────────────────────────────── */

const R2_BASE = 'https://pub-a7d5ba1f078f45fcbfb994964f59ca05.r2.dev'

// Pre-built download files on R2 (upload these once)
const DOWNLOAD_FILES = {
  'growing-early': `${R2_BASE}/Music%20Downloads/Growing-Minds-Early-Years-Songs.zip`,
  'growing-junior': `${R2_BASE}/Music%20Downloads/Growing-Minds-Junior-Songs.zip`,
  'street':         `${R2_BASE}/Music%20Downloads/Street-Smart-Songs.zip`,
  'aging':          `${R2_BASE}/Music%20Downloads/Aging-Wisdom-Songs.zip`,
}

export async function GET(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product')

    if (!productId || !DOWNLOAD_FILES[productId]) {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
    }

    // Verify purchase
    const { data: purchase } = await supabase
      .from('music_purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single()

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found. If you just purchased, wait a moment and try again.' }, { status: 403 })
    }

    // Redirect to the pre-built download file
    return NextResponse.redirect(DOWNLOAD_FILES[productId])
  } catch (err) {
    console.error('Music download error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
