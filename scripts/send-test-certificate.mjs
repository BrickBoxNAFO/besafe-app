/**
 * Standalone script to send a test certificate email.
 * Run with: RESEND_API_KEY=re_xxx node scripts/send-test-certificate.mjs
 */
import { Resend } from 'resend'
import PDFDocument from 'pdfkit'

const RESEND_API_KEY = process.env.RESEND_API_KEY
if (!RESEND_API_KEY) {
  console.error('❌ Set RESEND_API_KEY environment variable first')
  console.error('   RESEND_API_KEY=re_xxx node scripts/send-test-certificate.mjs')
  process.exit(1)
}

const resend = new Resend(RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL || 'hello@homesafeeducation.com'

// Certificate details
const recipientName = 'Brick'
const courseName = 'Street Smart'
const date = '7 April 2026'
const toEmail = 'Jonathanmichaellees@outlook.com'

// Generate PDF
function generatePDF() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4', layout: 'landscape',
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      info: { Title: `Certificate of Completion - ${courseName}`, Author: 'HomeSafeEducation' }
    })
    const chunks = []
    doc.on('data', c => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    const W = 841.89, H = 595.28

    doc.rect(0, 0, W, H).fill('#111111')

    // Geometric triangles
    doc.save(); doc.opacity(0.08)
    doc.moveTo(0, 0).lineTo(180, 0).lineTo(0, 180).closePath().fill('#E8703A')
    doc.moveTo(0, 0).lineTo(120, 0).lineTo(0, 120).closePath().fill('#ffffff')
    doc.opacity(0.05)
    doc.moveTo(0, 0).lineTo(250, 0).lineTo(0, 250).closePath().fill('#0EA5A0')
    doc.restore()

    doc.save(); doc.opacity(0.08)
    doc.moveTo(W, H).lineTo(W - 180, H).lineTo(W, H - 180).closePath().fill('#E8703A')
    doc.moveTo(W, H).lineTo(W - 120, H).lineTo(W, H - 120).closePath().fill('#ffffff')
    doc.opacity(0.05)
    doc.moveTo(W, H).lineTo(W - 250, H).lineTo(W, H - 250).closePath().fill('#0EA5A0')
    doc.restore()

    // Border
    doc.save(); doc.opacity(0.15)
    doc.rect(30, 30, W - 60, H - 60).lineWidth(1).stroke('#E8703A')
    doc.rect(36, 36, W - 72, H - 72).lineWidth(0.5).stroke('#ffffff')
    doc.restore()

    // Top accent
    doc.save()
    doc.moveTo(W/2 - 100, 60).lineTo(W/2 + 100, 60).lineWidth(2).stroke('#E8703A')
    doc.restore()

    // Logo
    doc.font('Helvetica-Bold').fontSize(16)
    const hsW = doc.widthOfString('HomeSafe')
    const edW = doc.widthOfString('Education')
    const logoX = (W - hsW - edW) / 2
    doc.fillColor('#ffffff').text('HomeSafe', logoX, 75, { continued: true, lineBreak: false })
    doc.fillColor('#E8703A').text('Education', { lineBreak: false })
    doc.font('Helvetica').fontSize(8).fillColor('#0EA5A0')
    doc.text('homesafeeducation.com', 0, 97, { align: 'center', width: W })

    // CERTIFICATE OF COMPLETION
    doc.font('Helvetica-Bold').fontSize(32).fillColor('#E8703A')
    doc.text('CERTIFICATE', 0, 135, { align: 'center', width: W, characterSpacing: 8 })
    doc.font('Helvetica').fontSize(14).fillColor('#ffffff')
    doc.text('OF COMPLETION', 0, 177, { align: 'center', width: W, characterSpacing: 4 })

    doc.save().opacity(0.3)
    doc.moveTo(W/2 - 150, 207).lineTo(W/2 + 150, 207).lineWidth(0.5).stroke('#E8703A')
    doc.restore()

    doc.font('Helvetica').fontSize(11).fillColor('#9CA3AF')
    doc.text('AWARDED TO', 0, 225, { align: 'center', width: W, characterSpacing: 3 })

    doc.font('Helvetica-Bold').fontSize(36).fillColor('#ffffff')
    doc.text(recipientName, 0, 255, { align: 'center', width: W })

    doc.save().opacity(0.2)
    doc.moveTo(W/2 - 180, 303).lineTo(W/2 + 180, 303).lineWidth(0.5).stroke('#ffffff')
    doc.restore()

    doc.font('Helvetica').fontSize(12).fillColor('#9CA3AF')
    doc.text('for having completed', 0, 321, { align: 'center', width: W })

    doc.font('Helvetica-Bold').fontSize(22).fillColor('#E8703A')
    doc.text(`${courseName} Learning Courses`, 0, 345, { align: 'center', width: W })

    doc.save().opacity(0.3)
    doc.moveTo(W/2 - 150, 383).lineTo(W/2 + 150, 383).lineWidth(0.5).stroke('#E8703A')
    doc.restore()

    // Signature + Date
    const bottomY = 413, leftCol = W/2 - 200, rightCol = W/2 + 60
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#ffffff')
    doc.text('Brick', leftCol, bottomY, { width: 200, align: 'center' })
    doc.save().opacity(0.3)
    doc.moveTo(leftCol + 20, bottomY + 28).lineTo(leftCol + 180, bottomY + 28).lineWidth(0.5).stroke('#ffffff')
    doc.restore()
    doc.font('Helvetica').fontSize(10).fillColor('#9CA3AF')
    doc.text('Founder & CEO', leftCol, bottomY + 34, { width: 200, align: 'center' })

    doc.font('Helvetica-Bold').fontSize(16).fillColor('#ffffff')
    doc.text(date, rightCol, bottomY + 4, { width: 200, align: 'center' })
    doc.save().opacity(0.3)
    doc.moveTo(rightCol + 20, bottomY + 28).lineTo(rightCol + 180, bottomY + 28).lineWidth(0.5).stroke('#ffffff')
    doc.restore()
    doc.font('Helvetica').fontSize(10).fillColor('#9CA3AF')
    doc.text('Date', rightCol, bottomY + 34, { width: 200, align: 'center' })

    // Bottom accent + footer
    doc.save()
    doc.moveTo(W/2 - 100, H - 55).lineTo(W/2 + 100, H - 55).lineWidth(2).stroke('#E8703A')
    doc.restore()
    doc.font('Helvetica').fontSize(7).fillColor('#6B7280')
    doc.text('HomeSafeEducation — Practical Safety Education for Every Stage of Life', 0, H - 40, { align: 'center', width: W })

    doc.end()
  })
}

// Send email
async function main() {
  console.log('📄 Generating certificate PDF...')
  const pdfBuffer = await generatePDF()
  console.log(`✅ PDF generated (${pdfBuffer.length} bytes)`)

  console.log(`📧 Sending certificate to ${toEmail}...`)
  const SITE = 'https://homesafeeducation.com'

  const result = await resend.emails.send({
    from: FROM,
    to: toEmail,
    subject: `Your Certificate of Completion — ${courseName}`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
  <div style="background:#ffffff;border-radius:16px;overflow:hidden;">
    <div style="background:#0B1F3A;padding:24px 32px;">
      <p style="font-family:Georgia,serif;font-weight:bold;font-size:22px;margin:0;line-height:1;"><span style="color:#ffffff;">HomeSafe</span><span style="color:#E8703A;">Education</span></p>
      <p style="color:#0EA5A0;font-size:13px;margin:4px 0 0;">homesafeeducation.com</p>
    </div>
    <div style="padding:32px;">
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Congratulations, ${recipientName}! 🎓</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">You've officially completed <strong>${courseName} Learning Courses</strong> through HomeSafeEducation.</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Your <strong>Certificate of Completion</strong> is attached to this email. You've earned it — the knowledge you've gained has real, lasting value.</p>
      <div style="background:#F0F4F8;border:1px solid #E5E7EB;border-radius:10px;padding:16px 20px;margin:20px 0;">
        <p style="color:#374151;font-size:13px;line-height:1.7;margin:0;"><strong>Your certificate is attached as a PDF.</strong> You can download, print, or share it anytime.</p>
      </div>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Want to keep learning? Explore our other safety courses and continue building practical life skills.</p>
      <div style="text-align:center;margin:28px 0;">
        <a href="${SITE}/packages" style="display:inline-block;background:#0EA5A0;color:#ffffff;padding:16px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Explore More Courses</a>
      </div>
      <p style="color:#9CA3AF;font-size:11px;line-height:1.6;margin-top:24px;padding-top:16px;border-top:1px solid #E5E7EB;">
        Your personal data is handled in accordance with our <a href="${SITE}/privacy" style="color:#9CA3AF;">Privacy Policy</a>.
        View our <a href="${SITE}/terms" style="color:#9CA3AF;">Terms &amp; Conditions</a> and
        <a href="${SITE}/refunds" style="color:#9CA3AF;">Refund Policy</a>.
      </p>
    </div>
    <div style="background:#F9FAFB;border-top:1px solid #E5E7EB;padding:20px 32px;text-align:center;">
      <p style="color:#9CA3AF;font-size:12px;line-height:1.6;margin:0;">
        <strong>HomeSafeEducation</strong> &middot; Practical Safety Education<br>
        <a href="${SITE}" style="color:#9CA3AF;">${SITE}</a> &middot;
        <a href="mailto:Support@HomeSafeEducation.com" style="color:#9CA3AF;">Support@HomeSafeEducation.com</a>
      </p>
    </div>
  </div>
</div>
</body></html>`,
    attachments: [{
      filename: `HomeSafeEducation-Certificate-${courseName.replace(/\s+/g, '-')}.pdf`,
      content: pdfBuffer.toString('base64'),
      contentType: 'application/pdf',
    }],
  })

  console.log('✅ Email sent!', JSON.stringify(result, null, 2))
}

main().catch(err => {
  console.error('❌ Failed:', err.message)
  process.exit(1)
})
