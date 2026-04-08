import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { sendEmailChangedNotification } from '@/lib/resend'

export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })

    const { newEmail } = await request.json()
    if (!newEmail) return NextResponse.json({ error: 'New email is required' }, { status: 400 })

    const oldEmail = user.email
    if (newEmail.toLowerCase() === oldEmail.toLowerCase()) {
      return NextResponse.json({ error: 'New email must be different from your current email' }, { status: 400 })
    }

    // Supabase sends a confirmation link to the new email address
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Send security notification to the OLD email address
    try {
      await sendEmailChangedNotification({
        to: oldEmail,
        name: user.user_metadata?.name,
        newEmail,
      })
    } catch (emailErr) {
      console.error('Email change notification error:', emailErr)
      // Non-critical
    }

    return NextResponse.json({ success: true, message: 'A confirmation link has been sent to your new email address. Please check your inbox.' })
  } catch (err) {
    console.error('Change email error:', err)
    return NextResponse.json({ error: 'Failed to update email' }, { status: 500 })
  }
}
