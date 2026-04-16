import { NextResponse } from 'next/server';
import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabase-server';

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

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Use admin client to delete progress
    const adminSupabase = await createAdminSupabaseClient();

    const { error: deleteError } = await adminSupabase
      .from('progress')
      .delete()
      .eq('user_id', user.id)
      .eq('course_id', courseId);

    if (deleteError) {
      console.error('Error deleting progress:', deleteError);
      return NextResponse.json(
        { error: 'Failed to restart course' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Course progress has been reset. You can now restart the course.',
      courseId,
    });
  } catch (error) {
    console.error('Restart course error:', error);
    return NextResponse.json(
      { error: 'An error occurred while restarting the course' },
      { status: 500 }
    );
  }
}
