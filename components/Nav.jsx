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
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) loadDashboardRoute(user.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
      if (session?.user) loadDashboardRoute(session.user.id)
      else setDashboardHref('/dashboard')
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
  ]

  return (
    <>
      <div className="bg-navy text-white text-xs py-2 overflow-hidden whitespace-nowrap">
        <div className="flex gap-10 animate-marquee px-4">
          {['✓ One-time payment no subscription','7 Packages · 33 Courses · 115 Lessons','Real-world and online safety education','Family progress tracking included','🔒 Secure checkout via Stripe'].map((t, i) => (
            <span key={i} className="flex-shrink-0 text-white/70">{t}</span>
          ))}
          {['✓ One-time payment no subscription','7 Packages · 33 Courses · 115 Lessons','Real-world and online safety education','Family progress tracking included','🔒 Secure checkout via Stripe'].map((t, i) => (
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
                {hasCourses && <Link href="/library" className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90" style={{ background: '#E8703A' }}>My Courses</Link>}
                <Link href={dashboardHref} className="btn-primary text-sm py-2 px-4">Dashboard</Link>
                <button onClick={handleSignOut} className="text-sm font-medium text-navy/50 hover:text-navy">Sign out</button>
              </>
            ) : (
              <>
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
                  {hasCourses && <Link href="/library" className="block text-center text-sm font-semibold text-white py-2.5 rounded-lg" style={{ background: '#E8703A' }} onClick={() => setMobileOpen(false)}>My Courses</Link>}
                  <div className="flex gap-3">
                    <Link href={dashboardHref} className="btn-primary text-sm py-2 flex-1 text-center" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                    <button onClick={() => { handleSignOut(); setMobileOpen(false) }} className="btn-ghost text-sm py-2 flex-1">Sign out</button>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" className="btn-ghost text-sm py-2 flex-1 text-center" onClick={() => setMobileOpen(false)}>Sign in</Link>
                  <Link href="/register" className="btn-primary text-sm py-2 flex-1 text-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
                </div>
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
