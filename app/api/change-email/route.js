import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { sendEmailChangedNotification } from '@/lib/resend';

export async function POST(request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { newEmail } = await request.json();

    if (!newEmail) {
      return NextResponse.json(
        { error: 'New email is required' },
        { status: 400 }
      );
    }

    if (newEmail === user.email) {
      return NextResponse.json(
        { error: 'New email must be different from current email' },
        { status: 400 }
      );
    }

    // Update email
    const { error: updateError } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      );
    }

    // Send security notification to old email
    try {
      await sendEmailChangedNotification(user.email, newEmail);
    } catch (emailError) {
      console.error('Failed to send email change notification:', emailError);
      // Don't fail the request if notification email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Email change requested. Please check both your old and new email for verification instructions.',
      newEmail,
    });
  } catch (error) {
    console.error('Change email error:', error);
    return NextResponse.json(
      { error: 'An error occurred while changing your email' },
      { status: 500 }
    );
  }
}
