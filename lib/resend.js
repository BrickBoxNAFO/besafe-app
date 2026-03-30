import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
export const FROM = process.env.RESEND_FROM_EMAIL || 'hello@homesafeeducation.com'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'

// ─── Shared HTML wrapper ──────────────────────────────────────────────────────
function wrap(body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:system-ui,-apple-system,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 16px;">
  <div style="background:#ffffff;border-radius:16px;overflow:hidden;">
    <div style="background:#0B1F3A;padding:24px 32px;">
      <p style="font-family:Georgia,serif;font-weight:bold;font-size:22px;margin:0;line-height:1;"><span style="color:#ffffff;">HomeSafe</span><span style="color:#E8703A;">Education</span></p>
      <p style="color:#0EA5A0;font-size:13px;margin:4px 0 0;">homesafeeducation.com</p>
    </div>
    <div style="padding:32px;">
      ${body}
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

// ─── 1. Welcome — New Account (no purchase) ──────────────────────────────────
export async function sendWelcomeEmail({ to, name }) {
  return resend.emails.send({
    from: FROM, to,
    subject: 'Welcome to HomeSafeEducation',
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Welcome${name ? ', ' + name : ''}!</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Your account with HomeSafeEducation is now active.</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Browse our safety packages and start learning at your own pace. Each one is built around a specific life stage — practical, expert-led, and designed to make a real difference.</p>
      ${btn('Browse Packages', SITE + '/packages')}
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you have any questions before purchasing, our team is happy to help at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a>.</p>
      ${legalFooter()}
    `)
  })
}

// ─── 2. Order Confirmation (single package) ───────────────────────────────────
export async function sendOrderConfirmation({ to, name, packageName, packageEmoji, orderId, amount, date }) {
  return resend.emails.send({
    from: FROM, to,
    subject: `Your order is confirmed — ${packageName}`,
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 8px;">Order confirmed ${packageEmoji || '✅'}</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;margin-bottom:24px;">Thank you${name ? ', ' + name : ''}. Here are your order details:</p>
      <div style="background:#F0F4F8;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#6B7280;font-size:14px;padding:4px 0;">Order</td><td style="color:#0B1F3A;font-size:14px;font-weight:600;text-align:right;">#${orderId}</td></tr>
          <tr><td style="color:#6B7280;font-size:14px;padding:4px 0;">Package</td><td style="color:#0B1F3A;font-size:14px;font-weight:600;text-align:right;">${packageName}</td></tr>
          <tr><td style="color:#6B7280;font-size:14px;padding:4px 0;">Amount</td><td style="color:#0B1F3A;font-size:14px;font-weight:600;text-align:right;">${amount}</td></tr>
          <tr><td style="color:#6B7280;font-size:14px;padding:4px 0;">Date</td><td style="color:#0B1F3A;font-size:14px;font-weight:600;text-align:right;">${date}</td></tr>
        </table>
      </div>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Your course is now unlocked and ready to start. Log in, go to your Dashboard, and click <strong>Course Library</strong> to begin.</p>
      ${btn('Start Learning Now', SITE + '/library')}
      ${infoBox(`<strong>Your refund entitlement:</strong> You are entitled to a full refund if requested within 7 days of this purchase, provided you have not completed more than 20% of the course content. To request a refund, email <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a> with your order number. <a href="${SITE}/refunds" style="color:#0EA5A0;">Full refund policy</a>.<br><br><em>EU/EEA/UK customers: You may have additional rights under the Consumer Rights Directive including a 14-day cooling-off period. However, by accessing your course you confirm express consent to immediate supply of digital content, and your right of withdrawal may be lost. Your statutory rights are not affected where they provide greater protection.</em>`, '#FFF7ED', '#FED7AA', '#92400E')}
      ${legalFooter()}
    `)
  })
}

// ─── 3. Welcome — Family Bundle Purchase ──────────────────────────────────────
export async function sendFamilyBundleWelcome({ to, name }) {
  return resend.emails.send({
    from: FROM, to,
    subject: 'Your Family Safety Bundle is active — here\'s how to get everyone started',
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Your Family Safety Bundle is active 🛡️</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Dear ${name || 'there'},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Your Family Safety Bundle is now active. You have <strong>5 seats</strong> to use however you like — give them to family members, keep some for yourself, or any mix of the two. You can even send the same package to more than one person.</p>

      <div style="background:#0B1F3A;border-radius:12px;padding:20px 24px;margin:24px 0;">
        <p style="color:#0EA5A0;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px;">Your 5 packages</p>
        ${[['👶','Growing Minds','For children'],['🎓','Nest Breaking','For young adults'],['✈️','Roaming Free','For travellers'],['👴','Aging Wisdom','For older adults'],['👨‍👩‍👧','Family Anchor','For parents']].map(([e,n,d]) =>
          `<p style="color:#ffffff;font-size:15px;margin:6px 0;">${e} <strong>${n}</strong> <span style="color:#9CA3AF;font-size:13px;">— ${d}</span></p>`
        ).join('')}
      </div>

      <h2 style="color:#0B1F3A;font-size:20px;margin:28px 0 16px;">If you want to take a course yourself</h2>
      <p style="color:#374151;font-size:15px;line-height:1.7;">Your courses are <strong>already available to you</strong> — you do not need to invite yourself. Simply log in, click <strong>Dashboard</strong> in the top navigation bar, then go to <strong>Course Library</strong>. All five packages are accessible to you directly. Pick one and begin straight away. Your progress tracks automatically and appears on your Family Dashboard.</p>

      <h2 style="color:#0B1F3A;font-size:20px;margin:28px 0 16px;">How to invite a family member — step by step</h2>

      ${[
        ['1', 'Open your Family Dashboard', 'Log in and click the <strong>Dashboard</strong> button in the top navigation bar. As the bundle holder, this takes you to your Family Dashboard where your 5 seat slots are displayed.'],
        ['2', 'Click an available seat', 'Click any empty seat marked <em>"Send Invite"</em>.'],
        ['3', 'Choose which package to give them', 'A list of all 5 packages appears. Select the one you want this person to receive. You can give the same package to more than one family member — for example, two children can both do Growing Minds.'],
        ['4', 'Enter their name and email, then click Send', 'Type their name (optional but helpful) and their email address, then click <strong>Send [Package Name] Invite</strong>. The invite goes out immediately.'],
        ['5', 'They accept and their course unlocks', 'They receive a personal invite link by email. They click it, create their own free account in under a minute, and their package unlocks immediately. You do not need to do anything else.'],
        ['6', 'Track everyone from your dashboard', 'Return to your Dashboard at any time to see how far along each family member is. If someone has not accepted after a few days, use the <strong>Resend</strong> button on their seat card.'],
      ].map(([n,title,body]) => `
        <div style="display:flex;gap:16px;margin-bottom:16px;">
          <div style="background:#0EA5A0;color:#ffffff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;line-height:28px;text-align:center;">${n}</div>
          <div><p style="color:#0B1F3A;font-size:15px;font-weight:600;margin:0 0 4px;">${title}</p><p style="color:#374151;font-size:14px;line-height:1.7;margin:0;">${body}</p></div>
        </div>
      `).join('')}

      ${btn('Open My Family Dashboard', SITE + '/family')}

      ${infoBox(`
        <strong>Good to know:</strong><br>
        &bull; You can keep seats for yourself — your courses are already unlocked<br>
        &bull; Each invite link is personal, single-use, and cannot be forwarded<br>
        &bull; Family members pay nothing — their access is fully covered by your purchase<br>
        &bull; You can send the same package to multiple people with no restrictions<br>
        &bull; If an invite email doesn't arrive, ask them to check spam, or use the Resend button
      `)}

      ${infoBox(`<strong>Refund reminder:</strong> You are entitled to a full refund within 7 days of purchase, provided no individual package seat has exceeded 20% completion. <a href="${SITE}/refunds" style="color:#0EA5A0;">Full refund policy</a>. EU/EEA/UK statutory rights apply where they provide greater protection.`, '#FFF7ED', '#FED7AA', '#92400E')}

      <p style="color:#374151;font-size:15px;line-height:1.7;">If you run into any difficulty, email us at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a> and we'll help you straight away.</p>
      ${legalFooter()}
    `)
  })
}

// ─── 4. Family Member Invite ──────────────────────────────────────────────────
export async function sendMemberInvite({ to, memberName, senderName, packageName, packageEmoji, inviteUrl }) {
  return resend.emails.send({
    from: FROM, to,
    subject: `${senderName} has given you access to ${packageName} — HomeSafeEducation`,
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">${packageEmoji || '🎓'} You have been invited!</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Hi ${memberName || 'there'},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;"><strong>${senderName}</strong> has purchased the <strong>${packageName}</strong> package for you through HomeSafeEducation — practical, expert-led safety education you can work through at your own pace.</p>

      <div style="background:#F0F4F8;border-radius:12px;padding:20px 24px;margin:24px 0;">
        <p style="color:#0B1F3A;font-size:15px;font-weight:700;margin:0 0 12px;">How to get started — 3 simple steps:</p>
        <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 8px;"><strong>1.</strong> Click the button below to accept your invitation</p>
        <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 8px;"><strong>2.</strong> Create your free account — it takes under a minute</p>
        <p style="color:#374151;font-size:14px;line-height:1.7;margin:0;"><strong>3.</strong> Your <strong>${packageName}</strong> course unlocks immediately — start whenever you're ready</p>
      </div>

      ${btn('Accept Your Invitation →', inviteUrl)}

      ${infoBox('<strong>Important:</strong> This invite link is personal to you and can only be used once. It cannot be forwarded. If you did not expect this email, you can safely ignore it — you are under no obligation to accept.', '#FFF7ED', '#FED7AA', '#92400E')}

      <p style="color:#374151;font-size:15px;line-height:1.7;">If you have any trouble, email us at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a> and we'll help straight away.</p>
      <p style="color:#9CA3AF;font-size:12px;margin-top:20px;">This invitation was sent by ${senderName} on behalf of HomeSafeEducation. Your data is handled per our <a href="${SITE}/privacy" style="color:#9CA3AF;">Privacy Policy</a>. You are not obligated to accept.</p>
    `)
  })
}

// ─── 5. Password Reset ────────────────────────────────────────────────────────
export async function sendPasswordReset({ to, name, resetUrl }) {
  return resend.emails.send({
    from: FROM, to,
    subject: 'Reset your password — HomeSafeEducation',
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Reset your password</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Hi ${name || 'there'},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">We received a request to reset the password for your account at homesafeeducation.com.</p>
      ${btn('Reset My Password', resetUrl)}
      ${infoBox('This link expires in <strong>1 hour</strong>. If it has expired, you can request a new one at <a href="' + SITE + '/reset-password" style="color:#0EA5A0;">homesafeeducation.com/reset-password</a>.')}
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you did not request a password reset, you can safely ignore this email. Your password will not change unless you click the link above.</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you believe someone is attempting to access your account, contact us immediately at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a>.</p>
      <p style="color:#9CA3AF;font-size:12px;margin-top:20px;">For your security, we will never ask for your password by email. This is a transactional email sent in response to a password reset request.</p>
    `)
  })
}

// ─── 6. Support Request Received ─────────────────────────────────────────────
export async function sendSupportAck({ to, name, ticketRef }) {
  return resend.emails.send({
    from: FROM, to,
    subject: `We've received your message — ${ticketRef}`,
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Message received</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Hi ${name || 'there'},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Thank you for getting in touch. We have received your message and will get back to you within <strong>1–2 business days</strong> (Monday to Friday).</p>
      ${infoBox('<strong>Your reference:</strong> ' + ticketRef)}
      <p style="color:#374151;font-size:15px;line-height:1.7;">If your matter is urgent, please reply to this email with more detail and we will prioritise it.</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;">While you wait, you may find useful information in our <a href="${SITE}/refunds" style="color:#0EA5A0;">Refund Policy</a> and <a href="${SITE}/terms" style="color:#0EA5A0;">Terms and Conditions</a>.</p>
      ${legalFooter()}
    `)
  })
}

// ─── 7. Refund Processed ──────────────────────────────────────────────────────
export async function sendRefundConfirmation({ to, name, packageName, orderId, amount }) {
  return resend.emails.send({
    from: FROM, to,
    subject: `Your refund has been processed — Order #${orderId}`,
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Refund processed</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Hi ${name || 'there'},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Your refund request for order <strong>#${orderId}</strong> has been reviewed and approved.</p>
      <div style="background:#F0F4F8;border-radius:10px;padding:20px 24px;margin:20px 0;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#6B7280;font-size:14px;padding:4px 0;">Course</td><td style="color:#0B1F3A;font-size:14px;font-weight:600;text-align:right;">${packageName}</td></tr>
          <tr><td style="color:#6B7280;font-size:14px;padding:4px 0;">Amount refunded</td><td style="color:#0B1F3A;font-size:14px;font-weight:600;text-align:right;">${amount}</td></tr>
          <tr><td style="color:#6B7280;font-size:14px;padding:4px 0;">Returned to</td><td style="color:#0B1F3A;font-size:14px;font-weight:600;text-align:right;">Original payment method</td></tr>
        </table>
      </div>
      ${infoBox('Please allow <strong>5–10 business days</strong> for the funds to appear in your account. This timeframe is set by your bank or card provider and is outside our control.')}
      <p style="color:#374151;font-size:15px;line-height:1.7;">Your access to the course has been removed in line with our <a href="${SITE}/refunds" style="color:#0EA5A0;">Refund Policy</a>.</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you have any questions, or if you'd like to explore a different course that might be a better fit, please don't hesitate to reach out at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a>.</p>
      ${legalFooter()}
    `)
  })
}

// ─── 8. Course Completion ─────────────────────────────────────────────────────
export async function sendCourseCompletion({ to, name, courseName, packageName }) {
  return resend.emails.send({
    from: FROM, to,
    subject: `Well done — you've completed ${courseName}`,
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Course complete! 🎉</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Well done${name ? ', ' + name : ''}!</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">You've completed <strong>${courseName}</strong>${packageName ? ' as part of the ' + packageName + ' package' : ''}. That's a real achievement — the knowledge you've built through this course has practical value that goes far beyond the screen.</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Every lesson you complete is a step toward keeping yourself and the people around you safer.</p>
      ${btn('Continue Learning →', SITE + '/library')}
      ${infoBox('Your completed course remains in your account — you can revisit any lesson at any time.')}
      ${legalFooter()}
    `)
  })
}

// ─── 9. GDPR — Privacy Policy Update ─────────────────────────────────────────
export async function sendPrivacyPolicyUpdate({ to, name, changeDate, changeSummary }) {
  return resend.emails.send({
    from: FROM, to,
    subject: 'An update to our Privacy Policy',
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Privacy Policy update</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Hi ${name || 'there'},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">We have updated our Privacy Policy, effective <strong>${changeDate}</strong>.</p>
      ${infoBox('<strong>What changed:</strong><br>' + changeSummary)}
      <p style="color:#374151;font-size:15px;line-height:1.7;">The updated policy is available in full at <a href="${SITE}/privacy" style="color:#0EA5A0;">homesafeeducation.com/privacy</a>.</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you would like to exercise any of your rights under GDPR — including access, correction, deletion, or portability of your data — please contact us at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a>. We will respond within 30 days.</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;">Continued use of our courses after ${changeDate} constitutes acceptance of the updated policy.</p>
      ${legalFooter()}
    `)
  })
}

// ─── 10. GDPR — Data Request Confirmation ────────────────────────────────────
export async function sendDataRequestConfirmation({ to, name, requestType, reference }) {
  return resend.emails.send({
    from: FROM, to,
    subject: 'We\'ve received your data request',
    html: wrap(`
      <h1 style="color:#0B1F3A;font-size:26px;margin:0 0 16px;">Data request received</h1>
      <p style="color:#374151;font-size:16px;line-height:1.7;">Hi ${name || 'there'},</p>
      <p style="color:#374151;font-size:16px;line-height:1.7;">We have received your request to <strong>${requestType}</strong> the personal data we hold about you. This email confirms your request has been logged.</p>
      ${infoBox('<strong>Your reference:</strong> ' + reference + '<br><br>Under GDPR, we are required to respond within <strong>30 days</strong>. We may contact you to verify your identity before proceeding.')}
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you have any questions in the meantime, contact us at <a href="mailto:Support@HomeSafeEducation.com" style="color:#0EA5A0;">Support@HomeSafeEducation.com</a>.</p>
      <p style="color:#374151;font-size:15px;line-height:1.7;">If you are unhappy with how we handle your request, you have the right to lodge a complaint with your national data protection supervisory authority.</p>
      ${legalFooter()}
    `)
  })
}

// ─── Legacy: purchase confirmation (used by stripe webhook) ──────────────────
export async function sendPurchaseConfirmation({ to, name, packageName, isBundle, orderId }) {
  if (isBundle) {
    return sendFamilyBundleWelcome({ to, name })
  }
  return sendOrderConfirmation({
    to, name,
    packageName: packageName || 'Your Package',
    packageEmoji: '✅',
    orderId: orderId || 'N/A',
    amount: '$29.99',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  })
}
