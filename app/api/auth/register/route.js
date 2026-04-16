import { NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-server';
import { rateLimit } from '@/lib/rate-limit';
import { sendWelcomeEmail } from '@/lib/resend';

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, name' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Rate limit: 5 per IP per hour
    const { success, remaining } = rateLimit(`register:${ip}`, 5, 60 * 60 * 1000);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Sign up user with admin client
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name,
      },
      email_confirm: false,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the registration if email sending fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful. Please check your email to verify your account.',
        user: {
          id: data.user.id,
          email: data.user.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
