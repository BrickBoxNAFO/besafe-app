import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { PACKAGES, COURSES } from '@/lib/data'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: purchaseRows } = await supabase.from('purchases').select('package_id').eq('user_id', user.id)
  const purchases = purchaseRows?.map(p => p.package_id) || []
  if (purchases.includes('bundle') || purchases.includes('complete')) redirect('/family')

  // Check for unassigned seats (from "assign later" purchases)
  const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data: seatRows } = await admin.from('seats').select('*').eq('owner_user_id', user.id).order('created_at', { ascending: true })
  const unassignedSeats = (seatRows || []).filter(s => !s.member_user_id && !s.invite_email)
  const assignedSeats = (seatRows || []).filter(s => s.member_user_id || s.invite_email)

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

        {/* Unassigned seats from "assign later" purchases */}
        {unassignedSeats.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-navy mb-5">Seats to Assign</h2>
            <p className="text-navy/50 text-sm mb-4">You have {unassignedSeats.length} seat{unassignedSeats.length !== 1 ? 's' : ''} waiting to be assigned. Assign them to yourself or invite someone.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {unassignedSeats.map(seat => {
                const pkg = PACKAGES.find(p => p.id === seat.package_id)
                return (
                  <div key={seat.id} className="bg-white rounded-2xl border-2 border-dashed border-purple-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: pkg?.pale || '#F3E8FF' }}>
                        {pkg?.emoji || '📦'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy">{pkg?.name || seat.package_id}</h3>
                        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Ready to assign</span>
                      </div>
                    </div>
                    <Link href={`/assign/${seat.id}`} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl py-2.5 text-center transition-colors text-sm block">
                      Assign This Seat
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Assigned seats that the user sent invites for */}
        {assignedSeats.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-navy mb-5">Gifted Seats</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {assignedSeats.map(seat => {
                const pkg = PACKAGES.find(p => p.id === seat.package_id)
                const isAccepted = !!seat.accepted_at
                return (
                  <div key={seat.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: pkg?.pale || '#E6F7F7' }}>
                          {pkg?.emoji || '📦'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy text-sm">{pkg?.name || seat.package_id}</h3>
                          <p className="text-navy/50 text-xs">{seat.member_name || seat.invite_email || 'Invited'}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isAccepted ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                        {isAccepted ? 'Active' : 'Invite sent'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {ownedPackages.length > 0 ? (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-navy mb-5">My Packages</h2>
            <div className="space-y-4">
              {ownedPackages.map(pkg => {
                const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)

                // Check if this package has sub-packages (e.g. Growing Minds with Early Years + Junior)
                const hasSubPackages = pkg.subPackages && pkg.subPackages.length > 0
                const subGroups = hasSubPackages
                  ? pkg.subPackages.map(sub => ({
                      id: sub.id,
                      name: sub.name,
                      ageRange: sub.ageRange,
                      courses: pkgCourses.filter(c => c.subPkg === sub.id),
                    })).filter(g => g.courses.length > 0)
                  : [{ id: pkg.id, name: pkg.name, ageRange: null, courses: pkgCourses }]

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

                    {subGroups.map(group => {
                      const groupPassed = group.courses.reduce((acc, c) => acc + (progressByCourse[c.id]?.passed || 0), 0)
                      const groupTotal = group.courses.reduce((acc, c) => acc + c.lessons.length, 0)
                      const groupPct = groupTotal > 0 ? Math.round((groupPassed / groupTotal) * 100) : 0
                      const groupColor = group.courses[0]?.color || pkg.color
                      const isJunior = group.id === 'growing-junior'

                      return (
                        <div key={group.id} className={hasSubPackages ? 'mb-5 last:mb-0' : ''}>
                          {hasSubPackages && (
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{group.courses[0]?.emoji || pkg.emoji}</span>
                                <h4 className="font-semibold text-navy text-sm">{group.name}</h4>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{ background: groupColor }}>
                                  Ages {group.ageRange}
                                </span>
                              </div>
                              <div className="flex-1 flex items-center gap-2">
                                <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                  <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: groupPct + '%', background: groupColor }} />
                                </div>
                                <span className="text-xs text-navy/40 whitespace-nowrap">{groupPassed}/{groupTotal}</span>
                              </div>
                            </div>
                          )}
                          {isJunior && (
                            <div className="mb-3 p-3 rounded-lg border border-amber-200 bg-amber-50/60 flex items-start gap-2">
                              <span className="text-amber-500 text-sm mt-0.5">&#9888;&#65039;</span>
                              <p className="text-xs text-amber-700 leading-relaxed">
                                <strong>Note:</strong> Junior courses are designed for ages 8{'\u2013'}11 and may not be suitable for the 4{'\u2013'}7 age range.
                                If your child is in the younger group, we recommend the Early Years courses above.
                              </p>
                            </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-2">
                            {group.courses.map(course => {
                              const cp = progressByCourse[course.id] || { passed: 0, total: course.lessons.length }
                              const coursePct = cp.total > 0 ? Math.round((cp.passed / cp.total) * 100) : 0
                              return (
                                <Link key={course.id} href={"/course/" + course.id} className="text-center p-3 rounded-xl border border-gray-100 hover:border-teal/30 hover:bg-teal/5 transition-all">
                                  <div className="text-lg mb-1">{course.emoji}</div>
                                  <div className="text-xs font-medium text-navy/70 leading-snug mb-2">{course.title}</div>
                                  <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                                    <div className="h-1 rounded-full" style={{ width: coursePct + '%', background: groupColor }} />
                                  </div>
                                  <div className="text-xs text-navy/40 mt-1">{coursePct}%</div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
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
