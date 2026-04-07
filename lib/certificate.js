import PDFDocument from 'pdfkit'

export async function generateCertificatePDF({ recipientName, courseName, date }) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4', layout: 'landscape',
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
        info: {
          Title: `Certificate of Completion - ${courseName}`,
          Author: 'HomeSafeEducation',
          Subject: `${recipientName} - ${courseName} Learning Courses`,
          Creator: 'HomeSafeEducation',
        }
      })
      const chunks = []
      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const W = 841.89
      const H = 595.28

      // Black background
      doc.rect(0, 0, W, H).fill('#111111')

      // Geometric triangle decorations - top left
      doc.save()
      doc.opacity(0.08)
      doc.moveTo(0, 0).lineTo(180, 0).lineTo(0, 180).closePath().fill('#E8703A')
      doc.moveTo(0, 0).lineTo(120, 0).lineTo(0, 120).closePath().fill('#ffffff')
      doc.opacity(0.05)
      doc.moveTo(0, 0).lineTo(250, 0).lineTo(0, 250).closePath().fill('#0EA5A0')
      doc.restore()

      // Bottom right triangles
      doc.save()
      doc.opacity(0.08)
      doc.moveTo(W, H).lineTo(W - 180, H).lineTo(W, H - 180).closePath().fill('#E8703A')
      doc.moveTo(W, H).lineTo(W - 120, H).lineTo(W, H - 120).closePath().fill('#ffffff')
      doc.opacity(0.05)
      doc.moveTo(W, H).lineTo(W - 250, H).lineTo(W, H - 250).closePath().fill('#0EA5A0')
      doc.restore()

      // Decorative border lines
      doc.save()
      doc.opacity(0.15)
      const borderInset = 30
      doc.rect(borderInset, borderInset, W - borderInset * 2, H - borderInset * 2).lineWidth(1).stroke('#E8703A')
      doc.rect(borderInset + 6, borderInset + 6, W - (borderInset + 6) * 2, H - (borderInset + 6) * 2).lineWidth(0.5).stroke('#ffffff')
      doc.restore()

      // Orange accent line at top
      const accentY = 60
      const accentWidth = 100
      doc.save()
      doc.moveTo(W / 2 - accentWidth, accentY).lineTo(W / 2 + accentWidth, accentY).lineWidth(2).stroke('#E8703A')
      doc.restore()

      // Logo text
      const logoY = 75
      doc.font('Helvetica-Bold').fontSize(16)
      const homeSafeWidth = doc.widthOfString('HomeSafe')
      const educationWidth = doc.widthOfString('Education')
      const totalLogoWidth = homeSafeWidth + educationWidth
      const logoX = (W - totalLogoWidth) / 2
      doc.fillColor('#ffffff').text('HomeSafe', logoX, logoY, { continued: true, lineBreak: false })
      doc.fillColor('#E8703A').text('Education', { lineBreak: false })

      // Subtitle
      doc.font('Helvetica').fontSize(8).fillColor('#0EA5A0')
      doc.text('homesafeeducation.com', 0, logoY + 22, { align: 'center', width: W })

      // CERTIFICATE OF COMPLETION
      const titleY = 135
      doc.font('Helvetica-Bold').fontSize(32).fillColor('#E8703A')
      doc.text('CERTIFICATE', 0, titleY, { align: 'center', width: W, characterSpacing: 8 })
      doc.font('Helvetica').fontSize(14).fillColor('#ffffff')
      doc.text('OF COMPLETION', 0, titleY + 42, { align: 'center', width: W, characterSpacing: 4 })
      // Divider line
      const divY1 = titleY + 72
      doc.save()
      doc.opacity(0.3)
      doc.moveTo(W / 2 - 150, divY1).lineTo(W / 2 + 150, divY1).lineWidth(0.5).stroke('#E8703A')
      doc.restore()

      // AWARDED TO
      const awardedY = divY1 + 18
      doc.font('Helvetica').fontSize(11).fillColor('#9CA3AF')
      doc.text('AWARDED TO', 0, awardedY, { align: 'center', width: W, characterSpacing: 3 })

      // Recipient Name
      const nameY = awardedY + 30
      doc.font('Helvetica-Bold').fontSize(36).fillColor('#ffffff')
      doc.text(recipientName, 0, nameY, { align: 'center', width: W })

      // Signature line under name
      const sigLineY = nameY + 48
      doc.save()
      doc.opacity(0.2)
      doc.moveTo(W / 2 - 180, sigLineY).lineTo(W / 2 + 180, sigLineY).lineWidth(0.5).stroke('#ffffff')
      doc.restore()

      // For having completed
      const completedY = sigLineY + 18
      doc.font('Helvetica').fontSize(12).fillColor('#9CA3AF')
      doc.text('for having completed', 0, completedY, { align: 'center', width: W })

      // Course Name
      const courseY = completedY + 24
      doc.font('Helvetica-Bold').fontSize(22).fillColor('#E8703A')
      doc.text(`${courseName} Learning Courses`, 0, courseY, { align: 'center', width: W })

      // Another divider
      const divY2 = courseY + 38
      doc.save()
      doc.opacity(0.3)
      doc.moveTo(W / 2 - 150, divY2).lineTo(W / 2 + 150, divY2).lineWidth(0.5).stroke('#E8703A')
      doc.restore()

      // Bottom section: Signature + Date
      const bottomY = divY2 + 30
      const leftCol = W / 2 - 200
      const rightCol = W / 2 + 60

      // Signature (left)
      doc.font('Helvetica-Bold').fontSize(20).fillColor('#ffffff')
      doc.text('Brick', leftCol, bottomY, { width: 200, align: 'center' })
      doc.save()
      doc.opacity(0.3)
      doc.moveTo(leftCol + 20, bottomY + 28).lineTo(leftCol + 180, bottomY + 28).lineWidth(0.5).stroke('#ffffff')
      doc.restore()
      doc.font('Helvetica').fontSize(10).fillColor('#9CA3AF')
      doc.text('Founder & CEO', leftCol, bottomY + 34, { width: 200, align: 'center' })

      // Date (right)
      doc.font('Helvetica-Bold').fontSize(16).fillColor('#ffffff')
      doc.text(date, rightCol, bottomY + 4, { width: 200, align: 'center' })
      doc.save()
      doc.opacity(0.3)
      doc.moveTo(rightCol + 20, bottomY + 28).lineTo(rightCol + 180, bottomY + 28).lineWidth(0.5).stroke('#ffffff')
      doc.restore()
      doc.font('Helvetica').fontSize(10).fillColor('#9CA3AF')
      doc.text('Date', rightCol, bottomY + 34, { width: 200, align: 'center' })

      // Bottom accent line
      const bottomAccentY = H - 55
      doc.save()
      doc.moveTo(W / 2 - accentWidth, bottomAccentY).lineTo(W / 2 + accentWidth, bottomAccentY).lineWidth(2).stroke('#E8703A')
      doc.restore()

      // Small footer
      doc.font('Helvetica').fontSize(7).fillColor('#6B7280')
      doc.text('HomeSafeEducation \u2014 Practical Safety Education for Every Stage of Life', 0, H - 40, { align: 'center', width: W })

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}
