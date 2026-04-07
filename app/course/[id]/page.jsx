import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { COURSES, PACKAGES } from '@/lib/data'
import RestartCourseButton from '@/components/RestartCourseButton'

export const dynamic = 'force-dynamic'

function getLessonTitle(lesson) {
  if (typeof lesson === 'string') return lesson
  return lesson?.title || 'Untitled Lesson'
}

export default async function CoursePage({ params }) {
  const course = COURSES.find(c => c.id === params.id)
  if (!course) notFound()

  const purchasePkgId = course.pkg
  const pkg = PACKAGES.find(p => p.id === purchasePkgId)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/course/' + params.id)

  const { data: allPurchases } = await supabase
    .from('purchases')
    .select('package_id')
    .eq('user_id', user.id)

  const ownedIds = (allPurchases || []).map(p => p.package_id)
  const hasAccess = ownedIds.includes(purchasePkgId) || ownedIds.includes('bundle') || ownedIds.includes('complete')

  if (!hasAccess) redirect('/packages#' + purchasePkgId)

  const { data: progressRows } = await supabase
    .from('progress')
    .select('lesson_index, passed, score')
    .eq('user_id', user.id)
    .eq('course_id', course.id)

  const progressMap = {}
  progressRows?.forEach(r => { progressMap[r.lesson_index] = r })

  const completed = Object.values(progressMap).filter(r => r.passed).length
  const total = course.lessons.length
  const pct = Math.round((completed / total) * 100)
  const courseColor = course.color || (pkg && pkg.color) || '#0EA5A0'
  const ageLabel = course.ageGroup
    ? 'Ages ' + course.ageGroup.replace('-', '\u2013')
    : (pkg && pkg.name) || ''
  const isJunior = course.subPkg === 'growing-junior'

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link href="/library" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to My Courses
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{course.emoji}</span>
            {ageLabel && (
              <div className="chip text-xs px-2 py-1 rounded-full text-white" style={{ background: courseColor }}>
                {ageLabel}
              </div>
            )}
          </div>
          <h1 className="font-serif text-4xl text-white mb-3">{course.title}</h1>
          <p className="text-white/60 mb-6">{total} Lessons</p>
          <div className="bg-white/10 rounded-xl p-4 max-w-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Your progress</span>
              <span className="text-white font-semibold text-sm">{completed}/{total}</span>
            </div>
            <div className="progress-track" style={{ height: '6px' }}>
              <div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: pct + '%' }} />
            </div>
          </div>
        </div>
      </div>

      <section className="section-slate py-12">
        <div className="max-w-4xl mx-auto px-6">
          {isJunior && (
            <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex gap-3">
                <span className="text-amber-500 text-lg mt-0.5">{'\u26A0\uFE0F'}</span>
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-1">Age Range Notice</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    This course is designed for children aged 8{'\u2013'}11 and may not be suitable for the 4{'\u2013'}7 age range.
                    If your child is in the younger group, we recommend the Early Years courses instead.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-3">
            {course.lessons.map((lesson, idx) => {
              const prog = progressMap[idx]
              const passed = prog && prog.passed
              const attempted = prog !== undefined
              const prevPassed = idx === 0 || (progressMap[idx - 1] && progressMap[idx - 1].passed)
              const locked = !prevPassed && idx > 0
              const title = getLessonTitle(lesson)

              return (
                <div key={idx} className={'bg-white rounded-xl border overflow-hidden transition-colors ' + (passed ? 'border-teal/30' : locked ? 'border-gray-100 opacity-60' : 'border-gray-100')}>
                  <div className="flex items-center gap-4 p-5">
                    <div className={'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ' + (passed ? 'bg-teal text-white' : locked ? 'bg-gray-100 text-gray-300' : 'bg-navy/10 text-navy')}>
                      {passed ? '\u2713' : locked ? '\uD83D\uDD12' : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={'font-medium text-sm ' + (locked ? 'text-navy/30' : 'text-navy')}>{title}</p>
                      {attempted && !locked && (
                        <p className="text-xs mt-0.5" style={{ color: passed ? '#0EA5A0' : '#EF4444' }}>
                          {passed ? 'Passed \u00B7 Score: ' + prog.score : 'Score: ' + prog.score + ' \u2014 try again'}
                        </p>
                      )}
                      {locked && (
                        <p className="text-xs mt-0.5 text-navy/25">Complete the previous lesson to unlock</p>
                      )}
                    </div>
                    {!locked && (
                      <Link
                        href={'/lesson/' + course.id + '/' + idx}
                        className="text-xs font-semibold px-4 py-2 rounded-lg text-white flex-shrink-0 transition-opacity hover:opacity-80"
                        style={{ background: courseColor }}
                      >
                        {passed ? 'Review' : attempted ? 'Retry' : idx === 0 ? 'Start' : 'Start'}
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {completed === total && (
            <div className="mt-8 bg-teal/10 border border-teal/20 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">{'\uD83C\uDF89'}</div>
              <h3 className="font-serif text-xl text-navy mb-1">Course Complete!</h3>
              <p className="text-navy/60 text-sm mb-5">
                You have completed all {total} lessons in {course.title}.
                You can review any lesson above, or restart the course from the beginning.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/library" className="btn-ghost">Back to Library</Link>
                <RestartCourseButton courseId={course.id} />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
