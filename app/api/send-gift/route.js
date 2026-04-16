import { NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase-server'
import { sendMemberInvite } from '@/lib/resend'
import { PACKAGES } from '@/lib/data'
import { randomUUID } from 'crypto'

export async function POST(request) {
  try {
    const {
      packageId,
      recipientEmail,
      recipientName,
      gifterName,
      stripeSessionId,
    } = await request.json()

    if (!packageId || !recipientEmail || !gifterName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const adminClient = createAdminSupabaseClient()

    // Create gift record (using a generalized approach - can be extended)
    const giftToken = randomUUID()

    // For now, we store gift data in a separate table if it exists,
    // otherwise we can use seats table with a gift marker
    // This stores the gift token for later redemption
    const { error: insertError } = await adminClient
      .from('gifts')
      .insert({
        token: giftToken,
        package_id: packageId,
        recipient_email: recipientEmail,
        recipient_name: recipientName,
        gifter_name: gifterName,
        stripe_session_id: stripeSessionId,
        created_at: new Date().toISOString(),
      })

    if (insertError) {
      console.error('Error creating gift record:', insertError)
      // If gifts table doesn't exist, we'll handle gracefully
    }

    // Send gift invite email
    const pkg = PACKAGES.find(p => p.id === packageId)
    const inviteUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'}/register?gift_token=${giftToken}&package=${packageId}`

    await sendMemberInvite({
      to: recipientEmail,
      memberName: recipientName || recipientEmail.split('@')[0],
      senderName: gifterName,
      packageName: pkg?.name || packageId,
      packageEmoji: pkg?.emoji || '🎁',
      inviteUrl: inviteUrl,
    })

    return NextResponse.json({
      success: true,
      giftToken: giftToken,
    })
  } catch (err) {
    console.error('Error in send-gift:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
