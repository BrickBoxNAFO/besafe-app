import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { PACKAGES, COURSES } from '@/lib/data'
import { getServerRegion } from '@/lib/get-region'
import { getPackagePrice } from '@/lib/pricing'

export const metadata = {
  title: 'My Library',
  description: 'Access your purchased safety education courses and track your learning progress.',
}

export default async function LibraryPage() {
  const regionCode = getServerRegion()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let purchases = []
  if (user) {
    const { data } = await supabase.from('purchases').select('package_id').eq('user_id', user.id)
    purchases = data?.map(p => p.package_id) || []
  }

  const totalCourses = COURSES.length
  const totalLessons = COURSES.reduce((sum, c) => sum + (c.lessons ? c.lessons.length : 0), 0)

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-4">Course Library</div>
          <h1 className="font-serif text-5xl text-white mb-4">All {totalCourses} Courses</h1>
          <p className="text-white/60 text-lg">Browse all {totalCourses} courses across our 7 packages, {totalLessons} lessons in total.</p>
        </div>
      </div>

      <section className="section-slate py-16">
        <div className="max-w-6xl mx-auto px-6">
          {PACKAGES.map(pkg => {
            const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
            const owned = purchases.includes(pkg.id) || purchases.includes('bundle') || purchases.includes('complete')
            const hasSubPackages = pkg.subPackages && pkg.subPackages.length > 0

            // Build sub-groups: either by subPackage or a single group
            const subGroups = hasSubPackages
              ? pkg.subPackages.map(sub => ({
                  id: sub.id,
                  name: sub.name,
                  ageRange: sub.ageRange,
                  courses: pkgCourses.filter(c => c.subPkg === sub.id),
                  color: pkgCourses.find(c => c.subPkg === sub.id)?.color || pkg.color,
                  emoji: pkgCourses.find(c => c.subPkg === sub.id)?.emoji || pkg.emoji,
                })).filter(g => g.courses.length > 0)
              : [{ id: pkg.id, name: null, ageRange: null, courses: pkgCourses, color: pkg.color, emoji: pkg.emoji }]

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

                {subGroups.map(group => {
                  const isJunior = group.id === 'growing-junior'
                  return (
                    <div key={group.id} className={hasSubPackages ? 'mb-8 last:mb-0' : ''}>
                      {group.name && (
                        <div className="flex items-center gap-2.5 mb-4">
                          <span className="text-lg">{group.emoji}</span>
                          <h3 className="font-semibold text-navy text-base">{group.name}</h3>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                            style={{ background: group.color }}
                          >
                            Ages {group.ageRange}
                          </span>
                        </div>
                      )}
                      {isJunior && (
                        <div className="mb-4 p-3 rounded-lg border border-amber-200 bg-amber-50/60 flex items-start gap-2">
                          <span className="text-amber-500 text-sm mt-0.5">{'\u26A0\uFE0F'}</span>
                          <p className="text-xs text-amber-700 leading-relaxed">
                            <strong>Note:</strong> Junior courses are designed for ages 8{'\u2013'}11 and may not be suitable for the 4{'\u2013'}7 age range.
                            If your child is in the younger group, we recommend the Early Years courses above.
                          </p>
                        </div>
                      )}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {group.courses.map(c => (
                          <div key={c.id} className={`bg-white rounded-xl p-5 border ${owned ? 'border-gray-100 hover:border-teal/30 transition-colors' : 'border-gray-100 opacity-70'}`}>
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-navy text-sm leading-snug flex-1">{c.title}</h3>
                              {!owned && <span className="text-navy/30 text-lg ml-2">{'\uD83D\uDD12'}</span>}
                            </div>
                            <div className="text-xs text-navy/40 mb-4">{'\uD83D\uDCD6'} {c.lessons.length} Lessons {'\u00B7'} {'\u2705'} {c.lessons.length * 5} quiz questions</div>
                            {owned ? (
                              <Link href={`/course/${c.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80" style={{ background: group.color }}>
                                Start Course &rarr;
                              </Link>
                            ) : (
                              <Link href={`/packages#${pkg.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg border text-navy/50 border-navy/20 hover:bg-navy/5 transition-colors">
                                Unlock for {getPackagePrice(pkg.id, regionCode)}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
