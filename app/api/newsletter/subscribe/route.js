import { getResend } from '@/lib/resend'
import { sendNewsletterWelcome } from '@/lib/newsletter'

export async function POST(req) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      console.error('RESEND_AUDIENCE_ID is not set')
      return Response.json({ error: 'Newsletter is not configured yet.' }, { status: 500 })
    }

    // Add contact to Resend audience
    const { data, error } = await getResend().contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    })

    if (error) {
      if (error.message && error.message.toLowerCase().includes('already exists')) {
        return Response.json({ error: 'This email is already subscribed.' }, { status: 409 })
      }
      console.error('Resend contact create error:', error)
      return Response.json({ error: 'Could not subscribe. Please try again.' }, { status: 500 })
    }

    // Send welcome email
    await sendNewsletterWelcome({ to: email })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return Response.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
