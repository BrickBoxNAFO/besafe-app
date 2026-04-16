import { NextResponse } from 'next/server'
import { sendSupportAck } from '@/lib/resend'

export async function POST(request) {
  try {
    const { name, email, message, orderRef } = await request.json()

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      )
    }

    // Generate a ticket reference
    const ticketRef = 'HSE-' + Date.now().toString(36).toUpperCase()

    // Send acknowledgment email to the user
    await sendSupportAck({ to: email, name: name || undefined, ticketRef })

    // Forward the message to the support inbox
    const { getResend, FROM } = await import('@/lib/resend')
    await getResend().emails.send({
      from: FROM,
      to: 'Support@HomeSafeEducation.com',
      replyTo: email,
      subject: `Support Request ${ticketRef} — ${name || 'No name'}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;">
          <h2 style="color:#0B1F3A;">New Support Request</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:6px 12px;color:#6B7280;font-size:14px;">Reference</td><td style="padding:6px 12px;font-weight:600;">${ticketRef}</td></tr>
            <tr><td style="padding:6px 12px;color:#6B7280;font-size:14px;">Name</td><td style="padding:6px 12px;">${name || 'Not provided'}</td></tr>
            <tr><td style="padding:6px 12px;color:#6B7280;font-size:14px;">Email</td><td style="padding:6px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${orderRef ? `<tr><td style="padding:6px 12px;color:#6B7280;font-size:14px;">Order Ref</td><td style="padding:6px 12px;">${orderRef}</td></tr>` : ''}
          </table>
          <div style="background:#F0F4F8;border-radius:8px;padding:16px;margin-top:16px;">
            <p style="color:#374151;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, ticketRef })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please email Support@HomeSafeEducation.com directly.' },
      { status: 500 }
    )
  }
}
