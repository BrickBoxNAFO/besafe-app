import { resend } from '@/lib/resend'

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return Response.json({ error: 'Email is required.' }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      return Response.json({ error: 'Newsletter is not configured.' }, { status: 500 })
    }

    // Find the contact in the audience
    const { data: contacts } = await resend.contacts.list({ audienceId })
    const contact = contacts?.data?.find(c => c.email.toLowerCase() === email.toLowerCase())

    if (!contact) {
      // Redirect to unsubscribe page with success anyway (don't reveal if email exists)
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
      return Response.redirect(siteUrl + '/unsubscribe?success=true')
    }

    // Update the contact to unsubscribed
    await resend.contacts.update({
      id: contact.id,
      audienceId,
      unsubscribed: true,
    })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
    return Response.redirect(siteUrl + '/unsubscribe?success=true')
  } catch (err) {
    console.error('Newsletter unsubscribe error:', err)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
    return Response.redirect(siteUrl + '/unsubscribe?success=true')
  }
}
