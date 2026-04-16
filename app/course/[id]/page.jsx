import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { COURSES, PACKAGES } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function CoursePage({ params }) {
  const course = COURSES.find(c => c.id === params.id)
  if (!course) notFound()

  const pkg = PACKAGES.find(p => p.id === course.pkg)
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect(`/login?redirect=/course/${params.id}`)

  const { data: purchaseRows } = await supabase
    .from('purchases')
    .select('package_id')
    .eq('user_id', user.id)

  const ownedIds = new Set((purchaseRows || []).map(r => r.package_id))
  const hasAccess = ownedIds.has(course.pkg) || ownedIds.has('bundle') || ownedIds.has('complete')

  if (!hasAccess) redirect(`/packages#${course.pkg}`)

  const { data: progressRows } = await supabase
    .from('progress')
    .select('lesson_index, passed, score')
    .eq('user_id', user.id)
    .eq('course_id', course.id)

  const progressMap = {}
  progressRows?.forEach(r => { progressMap[r.lesson_index] = r })

  const completed = Object.values(progressMap).filter(r => r.passed).length
  const pct = Math.round((completed / course.lessons.length) * 100)

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/library" className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            ← Back to Library
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{course.emoji}</span>
            <div className="chip text-xs px-2 py-1 rounded-full text-white" style={{ background: pkg?.color }}>
              {pkg?.name}
            </div>
          </div>
          <h1 className="font-serif text-4xl text-white mb-3">{course.title}</h1>
          <p className="text-white/60 mb-6">{course.lessons.length} Lessons · {course.quizCount || course.lessons.length * 5} quiz questions</p>
          <div className="bg-white/10 rounded-xl p-4 max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Your progress</span>
              <span className="text-white font-semibold text-sm">{completed}/{course.lessons.length}</span>
            </div>
            <div className="progress-track" style={{ height: '6px' }}>
              <div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <section className="section-slate py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-3">
            {course.lessons.map((lesson, idx) => {
              const prog = progressMap[idx]
              const passed = prog?.passed
              const attempted = prog !== undefined
              const prevPassed = idx === 0 || progressMap[idx - 1]?.passed
              const locked = !prevPassed && idx > 0

              return (
                <div key={idx} className={`bg-white rounded-xl border ${passed ? 'border-teal/30' : 'border-gray-100'} overflow-hidden`}>
                  <div className="flex items-center gap-4 p-5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      passed ? 'bg-teal text-white' : locked ? 'bg-gray-100 text-gray-300' : 'bg-navy/10 text-navy'
                    }`}>
                      {passed ? '✓' : locked ? '🔒' : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${locked ? 'text-navy/30' : 'text-navy'}`}>
                        {typeof lesson === 'string' ? lesson : (lesson?.title || `Lesson ${idx + 1}`)}
                      </p>
                      {attempted && !locked && (
                        <p className="text-xs mt-0.5" style={{ color: passed ? '#0EA5A0' : '#EF4444' }}>
                          {passed ? `Passed · ${prog.score}/5` : `Score: ${prog.score}/5 — try again`}
                        </p>
                      )}
                    </div>
                    {!locked && (
                      <Link
                        href={`/lesson/${course.id}/${idx}`}
                        className="text-xs font-semibold px-4 py-2 rounded-lg text-white flex-shrink-0 transition-opacity hover:opacity-80"
                        style={{ background: pkg?.color || '#0EA5A0' }}
                      >
                        {passed ? 'Review' : attempted ? 'Retry' : 'Start'}
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {completed === course.lessons.length && (
            <div className="mt-8 bg-teal/10 border border-teal/20 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-serif text-xl text-navy mb-1">Subject Complete!</h3>
              <p className="text-navy/60 text-sm">You have completed all {course.lessons.length} lessons in {course.title}.</p>
              <Link href="/library" className="btn-ghost mt-4 inline-flex">Back to Library</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
