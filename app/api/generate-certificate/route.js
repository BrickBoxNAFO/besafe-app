import { createClient } from '@supabase/supabase-js'
import { generateCertificatePDF } from '@/lib/certificate'
import { sendCertificateEmail, sendCertificateToPurchaser } from '@/lib/resend'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

/**
 * POST /api/generate-certificate
 *
 * Generates a PDF certificate and emails it to the user who completed the course.
 * If the course was purchased by someone else (via seats), also notifies the purchaser.
 *
 * Body: { userId, courseId, packageId, packageName }
 * — OR for manual/test: { email, name, courseName, date }
 */
export async function POST(req) {
  try {
    const body = await req.json()

    // ─── Manual / test mode (no auth required, just send a certificate) ──
    if (body.email && body.name && body.courseName) {
      const date = body.date || new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      })

      const pdfBuffer = await generateCertificatePDF({
        recipientName: body.name,
        courseName: body.courseName,
        date,
      })

      await sendCertificateEmail({
        to: body.email,
        recipientName: body.name,
        courseName: body.courseName,
        pdfBuffer,
      })

      return Response.json({ success: true, message: `Certificate sent to ${body.email}` })
    }

    // ─── Automated mode (triggered by course completion) ─────────────────
    const { userId, courseId, packageId, packageName } = body
    if (!userId || !courseId || !packageName) {
      return Response.json({ error: 'Missing required fields: userId, courseId, packageName' }, { status: 400 })
    }

    const supabase = getSupabase()

    // Get user details
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId)
    if (userError || !user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    const recipientName = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0]
    const recipientEmail = user.email

    // Check if certificate already issued (prevent duplicates)
    const { data: existing } = await supabase
      .from('certificates')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle()

    if (existing) {
      return Response.json({ success: true, message: 'Certificate already issued', duplicate: true })
    }

    const date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    })

    // Generate the PDF
    const pdfBuffer = await generateCertificatePDF({
      recipientName,
      courseName: packageName,
      date,
    })

    // Send certificate to the person who completed the course
    await sendCertificateEmail({
      to: recipientEmail,
      recipientName,
      courseName: packageName,
      pdfBuffer,
    })

    // Record the certificate in the database
    await supabase.from('certificates').insert({
      user_id: userId,
      course_id: courseId,
      package_name: packageName,
      recipient_name: recipientName,
      issued_at: new Date().toISOString(),
    })

    // ─── Check if someone else purchased this on behalf of the completer ──
    // Look in seats table: if this user is a member_user_id, find the owner
    const { data: seat } = await supabase
      .from('seats')
      .select('owner_user_id, member_name')
      .eq('member_user_id', userId)
      .eq('package_id', packageId || '')
      .maybeSingle()

    if (seat && seat.owner_user_id && seat.owner_user_id !== userId) {
      // Get purchaser details
      const { data: { user: purchaser } } = await supabase.auth.admin.getUserById(seat.owner_user_id)
      if (purchaser) {
        const purchaserEmail = purchaser.email
        const purchaserName = purchaser.user_metadata?.full_name || purchaser.user_metadata?.name || purchaser.email.split('@')[0]

        await sendCertificateToPurchaser({
          to: purchaserEmail,
          purchaserName,
          completedByName: recipientName,
          courseName: packageName,
          pdfBuffer,
        })
      }
    }

    // Also check gift_purchases if packageId doesn't match seats
    if (!seat) {
      const { data: giftSeat } = await supabase
        .from('seats')
        .select('owner_user_id, member_name')
        .eq('member_user_id', userId)
        .maybeSingle()

      if (giftSeat && giftSeat.owner_user_id && giftSeat.owner_user_id !== userId) {
        const { data: { user: purchaser } } = await supabase.auth.admin.getUserById(giftSeat.owner_user_id)
        if (purchaser) {
          await sendCertificateToPurchaser({
            to: purchaser.email,
            purchaserName: purchaser.user_metadata?.full_name || purchaser.user_metadata?.name || purchaser.email.split('@')[0],
            completedByName: recipientName,
            courseName: packageName,
            pdfBuffer,
          })
        }
      }
    }

    return Response.json({
      success: true,
      message: `Certificate generated and sent to ${recipientEmail}`,
    })

  } catch (err) {
    console.error('Certificate generation error:', err)
    return Response.json({ error: 'Failed to generate certificate', details: err.message }, { status: 500 })
  }
}
