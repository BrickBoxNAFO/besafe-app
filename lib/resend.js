import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM = process.env.RESEND_FROM_EMAIL || 'hello@thebesafegroup.com'

export async function sendPurchaseConfirmation({ to, name, packageName, isBundle }) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: isBundle
      ? 'Your Family Safety Bundle is ready — The Be Safe Group'
      : `Your ${packageName} package is ready — The Be Safe Group`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;">
        <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="The Be Safe Group" style="height:40px;margin-bottom:24px;" />
        <h1 style="color:#0B1F3A;font-size:24px;margin-bottom:8px;">
          You're all set, ${name || 'there'}!
        </h1>
        <p style="color:#4B5563;font-size:16px;line-height:1.6;">
          ${isBundle
            ? 'Your Family Safety Bundle is now active. All 5 packages are unlocked and ready to start.'
            : `Your <strong>${packageName}</strong> package is now active.`
          }
        </p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/library"
           style="display:inline-block;background:#0EA5A0;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin:24px 0;">
          Start Learning →
        </a>
        <p style="color:#6B7280;font-size:14px;line-height:1.6;">
          If you have any questions, reply to this email and we'll get back to you promptly.
        </p>
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;" />
        <p style="color:#9CA3AF;font-size:12px;">
          The Be Safe Group · Practical Safety Education<br/>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/account" style="color:#9CA3AF;">Manage your account</a>
        </p>
      </div>
    `,
  })
}

export async function sendWelcomeEmail({ to, name }) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Welcome to The Be Safe Group',
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;">
        <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="The Be Safe Group" style="height:40px;margin-bottom:24px;" />
        <h1 style="color:#0B1F3A;font-size:24px;margin-bottom:8px;">
          Welcome${name ? `, ${name}` : ''}!
        </h1>
        <p style="color:#4B5563;font-size:16px;line-height:1.6;">
          Your account has been created. Browse our packages and start building real safety knowledge for you and your family.
        </p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/packages"
           style="display:inline-block;background:#0EA5A0;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin:24px 0;">
          View Packages →
        </a>
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;" />
        <p style="color:#9CA3AF;font-size:12px;">The Be Safe Group · Practical Safety Education</p>
      </div>
    `,
  })
}

export async function sendCourseCompleteEmail({ to, name, courseName }) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `You completed ${courseName} — The Be Safe Group`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;">
        <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="The Be Safe Group" style="height:40px;margin-bottom:24px;" />
        <h1 style="color:#0B1F3A;font-size:24px;margin-bottom:8px;">
          Course complete! 🎉
        </h1>
        <p style="color:#4B5563;font-size:16px;line-height:1.6;">
          ${name ? `Well done, ${name}!` : 'Well done!'} You've completed <strong>${courseName}</strong>.
          Every lesson you finish builds real-world awareness that keeps you and your family safer.
        </p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/library"
           style="display:inline-block;background:#0EA5A0;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin:24px 0;">
          Continue Learning →
        </a>
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;" />
        <p style="color:#9CA3AF;font-size:12px;">The Be Safe Group · Practical Safety Education</p>
      </div>
    `,
  })
}
