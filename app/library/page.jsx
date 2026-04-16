import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { PACKAGES, COURSES } from '@/lib/data'

export default async function LibraryPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  let purchases = []
  if (user) {
    const { data } = await supabase.from('purchases').select('package_id').eq('user_id', user.id)
    purchases = data?.map(p => p.package_id) || []
  }

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-4">Course Library</div>
          <h1 className="font-serif text-5xl text-white mb-4">All 38 Courses</h1>
          <p className="text-white/60 text-lg">Browse all 38 Courses across our 7 Safety Packages — 146 Lessons in total.</p>
        </div>
      </div>

      <section className="section-slate py-16">
        <div className="max-w-6xl mx-auto px-6">
          {PACKAGES.map(pkg => {
            const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
            const owned = purchases.includes(pkg.id)
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
                    <div key={c.id} className={`bg-white rounded-xl p-5 border ${owned ? 'border-gray-100 hover:border-teal/30 transition-colors' : 'border-gray-100 opacity-70'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-navy text-sm leading-snug flex-1">{c.title}</h3>
                        {!owned && <span className="text-navy/30 text-lg ml-2">🔒</span>}
                      </div>
                      <div className="text-xs text-navy/40 mb-4">📖 {c.lessons.length} Lessons · ✅ {c.quizCount || c.lessons.length * 5} quiz questions</div>
                      {owned ? (
                        <Link href={`/course/${c.id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                          style={{ background: pkg.color }}>
                          Start Subject →
                        </Link>
                      ) : (
                        <Link href={`/packages#${pkg.id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border text-navy/50 border-navy/20 hover:bg-navy/5 transition-colors">
                          Unlock for $29.99
                        </Link>
                      )}
                    </div>
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
import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { PACKAGES, COURSES } from '@/lib/data'

export default async function LibraryPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  let purchases = []
  if (user) {
    const { data } = await supabase.from('purchases').select('package_id').eq('user_id', user.id)
    purchases = data?.map(p => p.package_id) || []
  }

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-4">Course Library</div>
          <h1 className="font-serif text-5xl text-white mb-4">All 25 Subjects</h1>
          <p className="text-white/60 text-lg">Browse all 25 Subjects across our 5 Safety Packages — 250 Lessons in total.</p>
        </div>
      </div>

      <section className="section-slate py-16">
        <div className="max-w-6xl mx-auto px-6">
          {PACKAGES.map(pkg => {
            const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
            const owned = purchases.includes(pkg.id)
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
                    <div key={c.id} className={`bg-white rounded-xl p-5 border ${owned ? 'border-gray-100 hover:border-teal/30 transition-colors' : 'border-gray-100 opacity-70'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-navy text-sm leading-snug flex-1">{c.title}</h3>
                        {!owned && <span className="text-navy/30 text-lg ml-2">🔒</span>}
                      </div>
                      <div className="text-xs text-navy/40 mb-4">📖 {c.lessons.length} Lessons · ✅ {c.lessons.length * 5} quiz questions</div>
                      {owned ? (
                        <Link href={`/course/${c.id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                          style={{ background: pkg.color }}>
                          Start Subject →
                        </Link>
                      ) : (
                        <Link href={`/packages#${pkg.id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg border text-navy/50 border-navy/20 hover:bg-navy/5 transition-colors">
                          Unlock for $29.99
                        </Link>
                      )}
                    </div>
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
