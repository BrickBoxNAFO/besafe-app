import { createClient } from '@/utils/supabase/server'

export async function POST(request) {
  const formData = await request.formData()
  const courseId = formData.get('courseId')
  if (!courseId) return new Response('Missing courseId', { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorised', { status: 401 })

  await supabase.from('progress').delete().eq('user_id', user.id).eq('course_id', courseId)

  return Response.redirect(new URL(`/course/${courseId}`, request.url))
}