import { NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';
import { sendPasswordReset } from '@/lib/resend';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Rate limit: 3 per email per 10 minutes
    const emailKey = `reset-password:email:${email.toLowerCase()}`;
    const { success: emailSuccess } = rateLimit(emailKey, 3, 10 * 60 * 1000);

    if (!emailSuccess) {
      // Always return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link shortly.'
      });
    }

    // Rate limit: 10 per IP per 10 minutes
    const ipKey = `reset-password:ip:${ip}`;
    const { success: ipSuccess } = rateLimit(ipKey, 10, 10 * 60 * 1000);

    if (!ipSuccess) {
      // Always return success to prevent IP-based enumeration
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link shortly.'
      });
    }

    const supabase = await createAdminSupabaseClient();

    // Generate password reset link
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?type=recovery`,
      },
    });

    if (error) {
      console.error('Error generating reset link:', error);
      // Still return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link shortly.'
      });
    }

    // Send password reset email
    try {
      await sendPasswordReset(email, data.properties.action_link);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Still return success - email sending failure shouldn't be visible to user
    }

    // Always return success (don't reveal if email exists)
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link shortly.'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link shortly.'
    });
  }
}
