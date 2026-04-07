import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function generateCertificatePDF({ recipientName, courseName, date }) {
    const doc = await PDFDocument.create()
    doc.setTitle('Certificate of Completion - ' + courseName)
    doc.setAuthor('HomeSafeEducation')
    const hv = await doc.embedFont(StandardFonts.Helvetica)
    const hvb = await doc.embedFont(StandardFonts.HelveticaBold)
    const W = 841.89, H = 595.28
    const page = doc.addPage([W, H])
    const Y = t => H - t
    const ctr = (t, f, s) => (W - f.widthOfTextAtSize(t, s)) / 2
    const o = rgb(232/255, 112/255, 58/255)
    const w = rgb(1, 1, 1)
    const tl = rgb(14/255, 165/255, 160/255)
    const g = rgb(156/255, 163/255, 175/255)
    const dg = rgb(107/255, 114/255, 128/255)

  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(17/255, 17/255, 17/255) })

  page.drawSvgPath('M 0 0 L 180 0 L 0 180 Z', { x: 0, y: H, color: o, opacity: 0.08 })
    page.drawSvgPath('M 0 0 L 120 0 L 0 120 Z', { x: 0, y: H, color: w, opacity: 0.08 })
    page.drawSvgPath('M 0 0 L 250 0 L 0 250 Z', { x: 0, y: H, color: tl, opacity: 0.05 })
    page.drawSvgPath('M 0 0 L -180 0 L 0 -180 Z', { x: W, y: 0, color: o, opacity: 0.08 })
    page.drawSvgPath('M 0 0 L -120 0 L 0 -120 Z', { x: W, y: 0, color: w, opacity: 0.08 })
    page.drawSvgPath('M 0 0 L -250 0 L 0 -250 Z', { x: W, y: 0, color: tl, opacity: 0.05 })

  page.drawRectangle({ x: 30, y: 30, width: W - 60, height: H - 60, borderColor: o, borderWidth: 1, borderOpacity: 0.15 })
    page.drawRectangle({ x: 36, y: 36, width: W - 72, height: H - 72, borderColor: w, borderWidth: 0.5, borderOpacity: 0.15 })

  page.drawLine({ start: { x: W/2 - 100, y: Y(60) }, end: { x: W/2 + 100, y: Y(60) }, thickness: 2, color: o })

  const hsw = hvb.widthOfTextAtSize('HomeSafe', 16)
    const lx = (W - hsw - hvb.widthOfTextAtSize('Education', 16)) / 2
    page.drawText('HomeSafe', { x: lx, y: Y(91), font: hvb, size: 16, color: w })
    page.drawText('Education', { x: lx + hsw, y: Y(91), font: hvb, size: 16, color: o })
    page.drawText('homesafeeducation.com', { x: ctr('homesafeeducation.com', hv, 8), y: Y(105), font: hv, size: 8, color: tl })

  page.drawText('CERTIFICATE', { x: ctr('CERTIFICATE', hvb, 32), y: Y(167), font: hvb, size: 32, color: o })
    page.drawText('OF COMPLETION', { x: ctr('OF COMPLETION', hv, 14), y: Y(191), font: hv, size: 14, color: w })

  page.drawLine({ start: { x: W/2 - 150, y: Y(207) }, end: { x: W/2 + 150, y: Y(207) }, thickness: 0.5, color: o, opacity: 0.3 })
    page.drawText('AWARDED TO', { x: ctr('AWARDED TO', hv, 11), y: Y(236), font: hv, size: 11, color: g })
    page.drawText(recipientName, { x: ctr(recipientName, hvb, 36), y: Y(291), font: hvb, size: 36, color: w })
    page.drawLine({ start: { x: W/2 - 180, y: Y(303) }, end: { x: W/2 + 180, y: Y(303) }, thickness: 0.5, color: w, opacity: 0.2 })
    page.drawText('for having completed', { x: ctr('for having completed', hv, 12), y: Y(333), font: hv, size: 12, color: g })

  const cn = courseName + ' Learning Courses'
    page.drawText(cn, { x: ctr(cn, hvb, 22), y: Y(367), font: hvb, size: 22, color: o })
    page.drawLine({ start: { x: W/2 - 150, y: Y(383) }, end: { x: W/2 + 150, y: Y(383) }, thickness: 0.5, color: o, opacity: 0.3 })

  const lc = W/2 - 200, rc = W/2 + 60
    page.drawText('Brick', { x: lc + (200 - hvb.widthOfTextAtSize('Brick', 20)) / 2, y: Y(433), font: hvb, size: 20, color: w })
    page.drawLine({ start: { x: lc + 20, y: Y(441) }, end: { x: lc + 180, y: Y(441) }, thickness: 0.5, color: w, opacity: 0.3 })
    page.drawText('Founder & CEO', { x: lc + (200 - hv.widthOfTextAtSize('Founder & CEO', 10)) / 2, y: Y(457), font: hv, size: 10, color: g })

  page.drawText(date, { x: rc + (200 - hvb.widthOfTextAtSize(date, 16)) / 2, y: Y(433), font: hvb, size: 16, color: w })
    page.drawLine({ start: { x: rc + 20, y: Y(441) }, end: { x: rc + 180, y: Y(441) }, thickness: 0.5, color: w, opacity: 0.3 })
    page.drawText('Date', { x: rc + (200 - hv.widthOfTextAtSize('Date', 10)) / 2, y: Y(457), font: hv, size: 10, color: g })

  page.drawLine({ start: { x: W/2 - 100, y: 55 }, end: { x: W/2 + 100, y: 55 }, thickness: 2, color: o })
    const ft = 'HomeSafeEducation — Practical Safety Education for Every Stage of Life'
    page.drawText(ft, { x: ctr(ft, hv, 7), y: 33, font: hv, size: 7, color: dg })

  const pdfBytes = await doc.save()
    return Buffer.from(pdfBytes)
}
