'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const BUNDLE_ID = 'bundle'

export default function Nav() {
  const [user, setUser] = useState(null)
  const [dashboardHref, setDashboardHref] = useState('/dashboard')
  const [hasCourses, setHasCourses] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const loadDashboardRoute = async (userId) => {
    try {
      const { data: purchases } = await supabase.from('purchases').select('package_id').eq('user_id', userId)
      const ids = (purchases || []).map(p => p.package_id)
      setHasCourses(ids.length > 0)
      setDashboardHref((ids.includes(BUNDLE_ID) || ids.includes('complete')) ? '/family' : '/dashboard')
    } catch (e) { setDashboardHref('/dashboard') }
  }

  useEffect(() => {
    // getSession reads from local storage immediately — no server round trip
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadDashboardRoute(u.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadDashboardRoute(u.id)
      else { setDashboardHref('/dashboard'); setHasCourses(false) }
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/packages', label: 'Packages' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <div className="bg-navy text-white text-xs py-2 overflow-hidden whitespace-nowrap">
        <div className="flex gap-10 animate-marquee px-4">
          {['\u2713 One-time payment no subscription','7 Packages \u00b7 38 Courses \u00b7 146 Lessons','Real-world safety, wellbeing, and life skills education','Family progress tracking included','\ud83d\udd12 Secure checkout via Stripe'].map((t, i) => (
            <span key={i} className="flex-shrink-0 text-white/70">{t}</span>
          ))}
          {['\u2713 One-time payment no subscription','7 Packages \u00b7 38 Courses \u00b7 146 Lessons','Real-world safety, wellbeing, and life skills education','Family progress tracking included','\ud83d\udd12 Secure checkout via Stripe'].map((t, i) => (
            <span key={"b"+i} className="flex-shrink-0 text-white/70">{t}</span>
          ))}
        </div>
      </div>
      <nav className={"sticky top-0 z-50 nav-glass border-b border-gray-100 transition-shadow duration-200 " + (scrolled ? 'shadow-sm' : '')}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.55rem',letterSpacing:'-0.01em',lineHeight:1}}><span style={{color:'#2B3480'}}>HomeSafe</span><span style={{color:'#E8703A'}}>Education</span></span></Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (<Link key={l.href} href={l.href} className={"text-sm font-medium transition-colors " + (pathname === l.href ? 'text-teal' : 'text-navy/70 hover:text-navy')}>{l.label}</Link>))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {hasCourses && <Link href="/library" className="text-sm font-medium text-navy/70 hover:text-navy transition-colors">My Course</Link>}
                <Link href={dashboardHref} className="btn-primary text-sm py-2 px-4">My Dashboard</Link>
                <button onClick={handleSignOut} className="text-sm font-medium text-navy/40 hover:text-navy ml-1">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/example" className="text-sm font-medium text-teal hover:text-teal2 transition-colors">Try a Free Lesson</Link>
                <Link href="/login" className="text-sm font-medium text-navy/70 hover:text-navy">Sign in</Link>
                <Link href="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
              </>
            )}
          </div>
          <button className="md:hidden p-2 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="w-5 h-0.5 bg-navy mb-1" /><div className="w-5 h-0.5 bg-navy mb-1" /><div className="w-5 h-0.5 bg-navy" />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-4">
            {links.map(l => (<Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-medium text-navy/70 border-b border-gray-50 last:border-0">{l.label}</Link>))}
            <div className="mt-3 space-y-2">
              {user ? (
                <>
                  <div className="flex gap-3">
                    {hasCourses && <Link href="/library" className="btn-ghost text-sm py-2 flex-1 text-center" onClick={() => setMobileOpen(false)}>My Course</Link>}
                    <Link href={dashboardHref} className="btn-primary text-sm py-2 flex-1 text-center" onClick={() => setMobileOpen(false)}>My Dashboard</Link>
                  </div>
                  <button onClick={() => { handleSignOut(); setMobileOpen(false) }} className="text-sm text-navy/40 py-2 px-2 w-full text-center">Sign out</button>
                </>
              ) : (
                <>
                  <Link href="/example" className="block text-center text-sm font-semibold text-teal py-2.5 rounded-lg border border-teal/30 bg-teal/5 hover:bg-teal/10 transition-colors" onClick={() => setMobileOpen(false)}>Try a Free Lesson</Link>
                  <div className="flex gap-3">
                    <Link href="/login" className="btn-ghost text-sm py-2 flex-1 text-center" onClick={() => setMobileOpen(false)}>Sign in</Link>
                    <Link href="/register" className="btn-primary text-sm py-2 flex-1 text-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: inline-flex; animation: marquee 30s linear infinite; }
      `}</style>
    </>
  )
}
