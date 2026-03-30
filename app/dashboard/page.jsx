import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { PACKAGES, COURSES } from '@/lib/data'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: purchaseRows } = await supabase
    .from('purchases').select('package_id').eq('user_id', user.id)
  const purchases = purchaseRows?.map(p => p.package_id) || []

  const { data: progressRows } = await supabase
    .from('progress').select('course_id, lesson_index, passed').eq('user_id', user.id)

  const progressByCourse = {}
  progressRows?.forEach(r => {
    if (!progressByCourse[r.course_id]) {
      const course = COURSES.find(c => c.id === r.course_id)
      progressByCourse[r.course_id] = { passed: 0, total: course?.lessons.length || 10 }
    }
    if (r.passed) progressByCourse[r.course_id].passed++
  })

  const ownedPackages = PACKAGES.filter(p => purchases.includes(p.id))
  const totalLessons = ownedPackages.reduce((acc) => acc + 50, 0)
  const passedLessons = Object.values(progressByCourse).reduce((acc, v) => acc + v.passed, 0)
  const name = user.user_metadata?.name || user.email?.split('@')[0]

  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-navy mb-1">Welcome back, {name}.</h1>
          <p className="text-navy/50">Here is your learning progress.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            ['Packages Owned', ownedPackages.length],
            ['Lessons Completed', passedLessons],
            ['Total Lessons', totalLessons],
            ['Completion', totalLessons > 0 ? `${Math.round(passedLessons / totalLessons * 100)}%` : '—'],
          ].map(([l, v]) => (
            <div key={l} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <div className="font-serif text-3xl text-navy mb-1">{v}</div>
              <div className="text-navy/50 text-xs">{l}</div>
            </div>
          ))}
        </div>

        {ownedPackages.length > 0 ? (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-navy mb-5">My Packages</h2>
            <div className="space-y-4">
              {ownedPackages.map(pkg => {
                const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
                const pkgPassed = pkgCourses.reduce((acc, c) => acc + (progressByCourse[c.id]?.passed || 0), 0)
                const pkgTotal = pkgCourses.reduce((acc, c) => acc + c.lessons.length, 0)
                const pct = Math.round((pkgPassed / pkgTotal) * 100)

                return (
                  <div key={pkg.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: pkg.pale }}>
                          {pkg.emoji}
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy">{pkg.name}</h3>
                          <p className="text-xs text-navy/40">{pkgPassed}/{pkgTotal} lessons passed</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold" style={{ color: pct === 100 ? '#0EA5A0' : pkg.color }}>{pct}%</span>
                    </div>
                    <div className="progress-track mb-4" style={{ height: '6px' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct === 100 ? '#0EA5A0' : pkg.color }} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {pkgCourses.map(c => {
                        const cp = progressByCourse[c.id] || { passed: 0, total: c.lessons.length }
                        const cpct = Math.round((cp.passed / cp.total) * 100)
                        return (
                          <Link key={c.id} href={`/course/${c.id}`}
                            className="text-center p-3 rounded-xl bg-slate hover:bg-gray-100 transition-colors border border-gray-100 group">
                            <div className="text-xs font-medium text-navy/70 leading-snug mb-1 group-hover:text-navy">{c.title}</div>
                            <div className="text-xs" style={{ color: cpct === 100 ? '#0EA5A0' : pkg.color }}>
                              {cpct === 100 ? '✓ Done' : `${cp.passed}/${cp.total}`}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center mb-10">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="font-serif text-2xl text-navy mb-2">No packages yet</h3>
            <p className="text-navy/50 mb-6">Browse our packages and start your safety education.</p>
            <Link href="/packages" className="btn-primary inline-flex">View Packages →</Link>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/library" className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-teal/30 transition-colors group">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="font-semibold text-navy group-hover:text-teal transition-colors">Course Library</h3>
            <p className="text-navy/50 text-sm mt-1">Browse all 25 subjects</p>
          </Link>
          <Link href="/packages" className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-teal/30 transition-colors group">
            <div className="text-2xl mb-3">📦</div>
            <h3 className="font-semibold text-navy group-hover:text-teal transition-colors">Add a Package</h3>
            <p className="text-navy/50 text-sm mt-1">Expand your learning</p>
          </Link>
          <Link href="/account" className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-teal/30 transition-colors group">
            <div className="text-2xl mb-3">⚙️</div>
            <h3 className="font-semibold text-navy group-hover:text-teal transition-colors">Account Settings</h3>
            <p className="text-navy/50 text-sm mt-1">Manage your account</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
