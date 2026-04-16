import { getResend, FROM } from '@/lib/resend'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
const NEWSLETTER_FROM = process.env.RESEND_NEWSLETTER_FROM || 'noreply@homesafeeducation.com'

function wrapNewsletter(body, email) {
  const unsubUrl = SITE + '/api/newsletter/unsubscribe?email=' + encodeURIComponent(email)
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
<div style="background:#ffffff;border-radius:16px;overflow:hidden;">
<div style="background:#0B1F3A;padding:24px 32px;">
<p style="font-family:Georgia,serif;font-weight:bold;font-size:22px;margin:0;line-height:1;"><span style="color:#ffffff;">HomeSafe</span><span style="color:#E8703A;">Education</span></p>
<p style="color:#0EA5A0;font-size:13px;margin:4px 0 0;">Newsletter</p>
</div>
<div style="padding:32px;">
${body}
</div>
<div style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:20px 32px;text-align:center;">
<p style="color:#9CA3AF;font-size:12px;line-height:1.6;margin:0;">
<strong>HomeSafeEducation</strong> &middot; Practical Safety Education<br>
<a href="${SITE}" style="color:#9CA3AF;">${SITE}</a>
</p>
<p style="color:#9CA3AF;font-size:11px;margin-top:12px;">
You received this because you subscribed to our newsletter.<br>
<a href="${unsubUrl}" style="color:#9CA3AF;text-decoration:underline;">Unsubscribe</a>
</p>
</div>
</div>
</div>
</body></html>`
}

export async function sendNewsletterWelcome({ to }) {
  return getResend().emails.send({
    from: NEWSLETTER_FROM,
    to,
    subject: 'Welcome to the HomeSafeEducation Newsletter',
    html: wrapNewsletter(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Welcome to Our Newsletter!</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Thank you for subscribing to the HomeSafeEducation newsletter.</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">You will receive occasional updates including safety tips, new course announcements, and family safety resources delivered straight to your inbox.</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">We respect your time and will never spam you. Every email includes an unsubscribe link if you ever change your mind.</p>
      <div style="text-align:center;margin:28px 0;">
        <a href="${SITE}/packages" style="display:inline-block;background:#0EA5A0;color:#ffffff;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Browse Our Packages</a>
      </div>
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you have any questions, reach us at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a>.</p>
    `, to)
  })
}
