'use client'
import Link from 'next/link'

export default function PackageCard({ pkg, owned }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border card-lift cursor-pointer ${owned ? 'border-teal/30 ring-1 ring-teal/20' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: pkg.pale }}>
          {pkg.emoji}
        </div>
        {owned && (
          <span className="chip bg-teal/10 text-teal border border-teal/20 text-xs">Owned</span>
        )}
      </div>

      <h3 className="font-serif text-xl text-navy mb-1">{pkg.name}</h3>
      <p className="text-xs font-medium mb-3" style={{ color: pkg.color }}>{pkg.tag}</p>
      <p className="text-navy/60 text-sm leading-relaxed mb-4">{pkg.tagline}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="chip text-xs px-2 py-0.5 rounded-full" style={{ background: pkg.pale, color: pkg.color }}>
          5 Subjects
        </span>
        <span className="chip bg-navy/5 text-navy/50 text-xs px-2 py-0.5 rounded-full">50 Lessons</span>
        <span className="chip bg-navy/5 text-navy/50 text-xs px-2 py-0.5 rounded-full">250 quiz Qs</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-navy text-lg">$29.99</span>
        <Link href={`/packages#${pkg.id}`}
          className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors text-white"
          style={{ background: pkg.color }}>
          {owned ? 'Continue →' : 'View Package →'}
        </Link>
      </div>
    </div>
  )
}
