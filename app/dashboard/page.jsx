import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { PACKAGES, COURSES } from '@/lib/data'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: purchaseRows } = await supabase.from('purchases').select('package_id').eq('user_id', user.id)
  const purchases = purchaseRows?.map(p => p.package_id) || []
  if (purchases.includes('bundle') || purchases.includes('complete')) redirect('/family')

  const { data: progressRows } = await supabase.from('progress').select('course_id, lesson_index, passed').eq('user_id', user.id)
  const progressByCourse = {}
  progressRows?.forEach(r => {
    const course = COURSES.find(c => c.id === r.course_id)
    if (!progressByCourse[r.course_id]) progressByCourse[r.course_id] = { passed: 0, total: course?.lessons.length || 10 }
    if (r.passed) progressByCourse[r.course_id].passed++
  })

  const ownedPackages = PACKAGES.filter(p => purchases.includes(p.id))
  const totalLessons = ownedPackages.reduce((acc) => acc + 50, 0)
  const passedLessons = Object.values(progressByCourse).reduce((acc, v) => acc + v.passed, 0)
  const overallPct = totalLessons > 0 ? Math.round((passedLessons / totalLessons) * 100) : 0
  const name = user.user_metadata?.name || user.email?.split('@')[0]

  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-14 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-4">My Dashboard</div>
          <h1 className="font-serif text-4xl text-white mb-2">Welcome back, {name}.</h1>
          <p className="text-white/60">Here is your personal learning progress.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[['Packages Owned', ownedPackages.length], ['Lessons Completed', passedLessons], ['Total Lessons', totalLessons], ['Overall Progress', totalLessons > 0 ? overallPct + '%' : '0%']].map(([l, v]) => (
            <div key={l} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <div className="font-serif text-3xl text-navy mb-1">{v}</div>
              <div className="text-navy/50 text-xs font-medium">{l}</div>
            </div>
          ))}
        </div>

        {totalLessons > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <div className="flex justify-between text-sm font-medium text-navy mb-2"><span>Overall Completion</span><span>{overallPct}%</span></div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className="h-3 rounded-full bg-teal transition-all duration-500" style={{ width: overallPct + '%' }} />
            </div>
          </div>
        )}

        {ownedPackages.length > 0 ? (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-navy mb-5">My Packages</h2>
            <div className="space-y-4">
              {ownedPackages.map(pkg => {
                const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
                const pkgPassed = pkgCourses.reduce((acc, c) => acc + (progressByCourse[c.id]?.passed || 0), 0)
                const pkgTotal = pkgCourses.reduce((acc, c) => acc + c.lessons.length, 0)
                const pkgPct = pkgTotal > 0 ? Math.round((pkgPassed / pkgTotal) * 100) : 0
                return (
                  <div key={pkg.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: pkg.pale }}>{pkg.emoji}</div>
                        <div>
                          <h3 className="font-serif text-xl text-navy">{pkg.name}</h3>
                          <p className="text-xs font-medium" style={{ color: pkg.color }}>{pkg.tag}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-navy text-lg">{pkgPct}%</div>
                        <div className="text-xs text-navy/40">{pkgPassed}/{pkgTotal} lessons</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full transition-all duration-500" style={{ width: pkgPct + '%', background: pkg.color }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
                      {pkgCourses.map(course => {
                        const cp = progressByCourse[course.id] || { passed: 0, total: course.lessons.length }
                        const coursePct = cp.total > 0 ? Math.round((cp.passed / cp.total) * 100) : 0
                        return (
                          <Link key={course.id} href={"/course/" + course.id} className="text-center p-3 rounded-xl border border-gray-100 hover:border-teal/30 hover:bg-teal/5 transition-all">
                            <div className="text-lg mb-1">{course.emoji}</div>
                            <div className="text-xs font-medium text-navy/70 leading-snug mb-2">{course.title}</div>
                            <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                              <div className="h-1 rounded-full" style={{ width: coursePct + '%', background: pkg.color }} />
                            </div>
                            <div className="text-xs text-navy/40 mt-1">{coursePct}%</div>
                          </Link>
                        )
                      })}
                    </div>
                    <Link href="/library" className="btn-primary text-sm py-2 px-5">Continue Learning</Link>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="font-serif text-2xl text-navy mb-3">No packages yet</h2>
            <p className="text-navy/50 mb-6">Purchase a package to unlock your courses and start tracking your progress.</p>
            <Link href="/packages" className="btn-primary">Browse Packages</Link>
          </div>
        )}
      </div>
    </div>
  )
}
