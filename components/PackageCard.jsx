'use client'
import Link from 'next/link'
import { COURSES } from '@/lib/data'

export default function PackageCard({ pkg, owned }) {
  // Calculate real counts from actual course data
  const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
  const subjects = pkgCourses.length
  const lessons = pkgCourses.reduce((sum, c) => sum + (c.lessons ? c.lessons.length : 0), 0)
  const quizQs = lessons * 5

  return (
    <div className={`bg-white rounded-2xl p-6 border card-lift cursor-pointer ${owned ? 'border-teal/30 ring-1 ring-teal/20' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: pkg.pale }}>{pkg.emoji}</div>
        <div className="flex items-center gap-2">
          {pkg.isGrowingBundle && <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:pkg.color}}>Bundle</span>}
          {owned && <span className="chip bg-teal/10 text-teal border border-teal/20 text-xs">Owned</span>}
        </div>
      </div>
      <h3 className="font-serif text-xl text-navy mb-1">{pkg.name}</h3>
      <p className="text-xs font-medium mb-2" style={{ color: pkg.color }}>{pkg.tag}</p>
      <p className="text-navy/60 text-sm leading-relaxed mb-3">{pkg.tagline}</p>
      {pkg.isGrowingBundle && pkg.subPackages && (
        <div className="flex gap-2 mb-3">
          {pkg.subPackages.map(sub => (
            <div key={sub.id} className="flex-1 rounded-xl border px-3 py-2" style={{borderColor: sub.color+'33', background: sub.pale}}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm">{sub.emoji}</span>
                <span className="text-xs font-bold text-navy">{sub.name.replace('Growing Minds: ','')}</span>
              </div>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full text-white" style={{background:sub.color}}>{sub.tag}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="chip text-xs px-2 py-0.5 rounded-full" style={{ background: pkg.pale, color: pkg.color }}>{subjects} Courses</span>
        <span className="chip bg-navy/5 text-navy/50 text-xs px-2 py-0.5 rounded-full">{lessons} Lessons</span>
        <span className="chip bg-navy/5 text-navy/50 text-xs px-2 py-0.5 rounded-full">{quizQs} quiz Qs</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-navy text-lg">$29.99</span>
        <Link href={`/packages#${pkg.id}`} className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors text-white" style={{ background: pkg.color }}>
          {owned ? 'Continue ->' : 'View Package ->'}
        </Link>
      </div>
    </div>
  )
}
