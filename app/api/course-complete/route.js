import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { sendCourseCompletion } from '@/lib/resend'
import { COURSES, PACKAGES } from '@/lib/data'

// Called by the congratulations page when a user has completed all lessons in a course.
// Sends the course completion email (mid-package courses only — the certificate
// endpoint handles the final-course email separately).
export async function POST(request) {
  try {
    const { courseId } = await request.json()
    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const course = COURSES.find(c => c.id === courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Verify user actually passed all lessons
    const { data: progress } = await supabase
      .from('progress')
      .select('lesson_index, passed')
      .eq('user_id', user.id)
      .eq('course_id', courseId)

    const passedSet = new Set((progress || []).filter(r => r.passed).map(r => r.lesson_index))
    const allPassed = course.lessons.every((_, i) => passedSet.has(i))
    if (!allPassed) {
      return NextResponse.json({ error: 'Course not fully completed' }, { status: 400 })
    }

    const pkg = PACKAGES.find(p => p.id === course.pkg)

    await sendCourseCompletion({
      to: user.email,
      name: user.user_metadata?.name,
      courseName: course.title,
      packageName: pkg?.name,
    }).catch(e => console.error('Course completion email error:', e))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Course complete endpoint error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
