import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
export const FROM = process.env.RESEND_FROM_EMAIL || 'hello@thebesafegroup.com'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebesafegroup.com'

// ─── Shared HTML wrapper ──────────────────────────────────────────────────────
function wrap(body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
  <div style="background:#ffffff;border-radius:16px;overflow:hidden;">
    <div style="background:#0B1F3A;padding:24px 32px;">
      <p style="color:#ffffff;font-size:20px;font-weight:700;margin:0;">The Be Safe Group</p>
      <p style="color:#0EA5A0;font-size:13px;margin:4px 0 0;">TheBeSafeGroup.com</p>
    </div>
    <div style="padding:32px;">
      ${body}
    </div>
    <div style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:20px 32px;text-align:center;">
      <p style="color:#9CA3AF;font-size:12px;line-height:1.6;margin:0;">
        <strong>The Be Safe Group</strong> &middot; Practical Safety Education<br>
        <a href="${SITE}" style="color:#9CA3AF;">${SITE}</a> &middot;
        <a href="mailto:Support@TheBeSafeGroup.com" style="color:#9CA3AF;">Support@TheBeSafeGroup.com</a>
      </p>
    </div>
  </div>
</div>
</body></html>`
}

function btn(text, href) {
  return `<div style="text-align:center;margin:28px 0;">
    <a href="${href}" style="display:inline-block;background:#0EA5A0;color:#ffffff;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">${text}</a>
  </div>`
}

function infoBox(html, color = '#F0F4F8', border = '#E5E7EB', text = '#374151') {
  return `<div style="background:${color};border:1px solid ${border};border-radius:10px;padding:16px 20px;margin:20px 0;">
    <p style="color:${text};font-size:13px;line-height:1.7;margin:0;">${html}</p>
  </div>`
}

function legalFooter() {
  return `<p style="color:#9CA3AF;font-size:11px;line-height:1.6;margin-top:24px;padding-top:16px;border-top:1px solid #E5E7EB;">
    Your personal data is handled in accordance with our <a href="${SITE}/privacy" style="color:#9CA3AF;">Privacy Policy</a>.
    View our <a href="${SITE}/terms" style="color:#9CA3AF;">Terms &amp; Conditions</a> and
    <a href="${SITE}/refunds" style="color:#9CA3AF;">Refund Policy</a>.
  </p>`
}
