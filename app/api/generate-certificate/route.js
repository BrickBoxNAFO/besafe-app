import { createClient } from '@supabase/supabase-js'
import { generateCertificatePDF } from '@/lib/certificate'
import { sendCertificateEmail, sendCertificateToPurchaser } from '@/lib/resend'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function POST(req) {
  try {
    const body = await req.json()

    // Manual / test mode
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
      return Response.json({ success: true, message: 'Certificate sent to ' + body.email })
    }

    // Automated mode (triggered by course completion)
    const { userId, courseId, packageId, packageName } = body
    if (!userId || !courseId || !packageName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = getSupabase()

    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId)
    if (userError || !user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    const recipientName = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0]
    const recipientEmail = user.email

    // Prevent duplicate certificates
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
    const pdfBuffer = await generateCertificatePDF({ recipientName, courseName: packageName, date })

    await sendCertificateEmail({
      to: recipientEmail,
      recipientName,
      courseName: packageName,
      pdfBuffer,
    })

    // Record the certificate
    await supabase.from('certificates').insert({
      user_id: userId,
      course_id: courseId,
      package_name: packageName,
      recipient_name: recipientName,
      issued_at: new Date().toISOString(),
    })

    // Check if someone else purchased this on behalf of the completer (seats/family system)
    const { data: seat } = await supabase
      .from('seats')
      .select('owner_user_id, member_name')
      .eq('member_user_id', userId)
      .eq('package_id', packageId || '')
      .maybeSingle()

    if (seat && seat.owner_user_id && seat.owner_user_id !== userId) {
      const { data: { user: purchaser } } = await supabase.auth.admin.getUserById(seat.owner_user_id)
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

    // Fallback: check seats without package filter
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

    return Response.json({ success: true, message: 'Certificate generated and sent to ' + recipientEmail })

  } catch (err) {
    console.error('Certificate generation error:', err)
    return Response.json({ error: 'Failed to generate certificate. Please try again or contact support.' }, { status: 500 })
  }
}
