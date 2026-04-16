import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { PACKAGES, COURSES } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function LibraryPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  let purchases = []
  let progressByCourse = {} // course_id -> Set of passed lesson indices
  if (user) {
    const { data: purchaseData } = await supabase
      .from('purchases').select('package_id').eq('user_id', user.id)
    purchases = purchaseData?.map(p => p.package_id) || []

    const { data: progressData } = await supabase
      .from('progress')
      .select('course_id, lesson_index, passed')
      .eq('user_id', user.id)

    ;(progressData || []).forEach(r => {
      if (!progressByCourse[r.course_id]) progressByCourse[r.course_id] = new Set()
      if (r.passed) progressByCourse[r.course_id].add(r.lesson_index)
    })
  }

  const hasBundleLike = purchases.includes('bundle') || purchases.includes('complete')

  const earlyYearsCourses = COURSES.filter(c => c.subPkg === 'growing-early')
  const juniorCourses     = COURSES.filter(c => c.subPkg === 'growing-junior')

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-4">Course Library</div>
          <h1 className="font-serif text-5xl text-white mb-4">All Subjects</h1>
          <p className="text-white/60 text-lg">Browse every subject across our Safety Packages.</p>
        </div>
      </div>

      <section className="section-slate py-16">
        <div className="max-w-6xl mx-auto px-6">

          {PACKAGES.map(pkg => {
            const owned = hasBundleLike || purchases.includes(pkg.id)
            const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)

            /* ── Growing Minds: show Early Years + Junior as two sections ── */
            if (pkg.id === 'growing') {
              return (
                <div key={pkg.id} className="mb-14">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: pkg.pale }}>
                      {pkg.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-2xl text-navy">{pkg.name}</h2>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: pkg.color }}>2-in-1 Bundle</span>
                      </div>
                      <p className="text-sm" style={{ color: pkg.color }}>{pkg.tag}</p>
                    </div>
                    {owned && <span className="chip bg-teal/10 text-teal border border-teal/20 ml-2">Owned</span>}
                  </div>

                  <div className="mb-7">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🌱</span>
                      <h3 className="font-semibold text-navy">Early Years</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: '#16A34A' }}>Ages 4–7</span>
                      {owned && (
                        <span className="text-xs bg-amber-50 border border-amber-200/70 text-amber-800 rounded-lg px-2 py-0.5 ml-1">
                          👨‍👧 Complete with a parent or carer
                        </span>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {earlyYearsCourses.map(c => (
                        <CourseCard key={c.id} c={c} pkgColor="#16A34A" pkgId={pkg.id} owned={owned} progressByCourse={progressByCourse} />
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mb-7" />

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">🌿</span>
                      <h3 className="font-semibold text-navy">Junior</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: '#15803d' }}>Ages 8–11</span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {juniorCourses.map(c => (
                        <CourseCard key={c.id} c={c} pkgColor="#15803d" pkgId={pkg.id} owned={owned} progressByCourse={progressByCourse} />
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            /* ── All other packages ── */
            return (
              <div key={pkg.id} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: pkg.pale }}>
                    {pkg.emoji}
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-navy">{pkg.name}</h2>
                    <p className="text-sm" style={{ color: pkg.color }}>{pkg.tag}</p>
                  </div>
                  {owned && <span className="chip bg-teal/10 text-teal border border-teal/20 ml-2">Owned</span>}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pkgCourses.map(c => (
                    <CourseCard key={c.id} c={c} pkgColor={pkg.color} pkgId={pkg.id} owned={owned} progressByCourse={progressByCourse} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function CourseCard({ c, pkgColor, pkgId, owned, progressByCourse }) {
  const totalLessons = c.lessons?.length || 0
  const passedSet = progressByCourse?.[c.id]
  const passedLessons = passedSet ? Math.min(passedSet.size, totalLessons) : 0
  const pct = totalLessons > 0 ? Math.min(100, Math.round((passedLessons / totalLessons) * 100)) : 0
  const done = pct === 100 && totalLessons > 0
  const started = passedLessons > 0

  return (
    <div className={`bg-white rounded-xl p-5 border ${owned ? (done ? 'border-teal/40' : 'border-gray-100 hover:border-teal/30 transition-colors') : 'border-gray-100 opacity-70'} flex flex-col`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-navy text-sm leading-snug flex-1">{c.title}</h3>
        {!owned && <span className="text-navy/30 text-lg ml-2">🔒</span>}
        {owned && done && <span className="text-teal text-sm ml-2" aria-label="Completed">✓</span>}
      </div>
      <div className="text-xs text-navy/40 mb-3">📖 {totalLessons} Lessons · ✅ {totalLessons * 5} quiz questions</div>

      {owned && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-medium text-navy/60">
              {done ? 'Completed' : started ? 'In progress' : 'Not started'}
            </span>
            <span className="text-[11px] font-semibold" style={{ color: done ? '#0EA5A0' : pkgColor }}>
              {passedLessons}/{totalLessons} · {pct}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ width: `${pct}%`, background: done ? '#0EA5A0' : pkgColor }}
            />
          </div>
        </div>
      )}

      {owned ? (
        <Link
          href={`/course/${c.id}`}
          className="mt-auto text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80 self-start"
          style={{ background: done ? '#0EA5A0' : pkgColor }}>
          {done ? 'Review Subject' : started ? 'Continue →' : 'Start Subject →'}
        </Link>
      ) : (
        <Link
          href={`/packages#${pkgId}`}
          className="mt-auto text-xs font-semibold px-3 py-1.5 rounded-lg border text-navy/50 border-navy/20 hover:bg-navy/5 transition-colors self-start">
          Unlock Package →
        </Link>
      )}
    </div>
  )
}
