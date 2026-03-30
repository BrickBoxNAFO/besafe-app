import Link from 'next/link'
import { PACKAGES } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-navy noise relative text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/"><span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.45rem',letterSpacing:'-0.01em',lineHeight:1,display:'inline-block',marginBottom:'1rem'}}><span style={{color:'#ffffff'}}>HomeSafe</span><span style={{color:'#E8703A'}}>Education</span></span></Link>
            <p className="text-white/50 text-sm leading-relaxed">Practical safety education for every member of your family.</p>
          </div>
          <div>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">Packages</p>
            <ul className="space-y-2">
              {PACKAGES.map(p => (
                <li key={p.id}><Link href={"/packages#"+p.id} className="text-white/60 text-sm hover:text-white transition-colors">{p.emoji} {p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">Company</p>
            <ul className="space-y-2">
              {[['/', 'Home'],['/about','About Us'],['/packages','Packages'],['/library','Course Library']].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-white/60 text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">Legal</p>
            <ul className="space-y-2">
              {[['/terms','Terms & Conditions'],['/privacy','Privacy Policy'],['/refunds','Refund Policy'],['/cookies','Cookie Policy'],['/safeguarding','Safeguarding Policy'],['/coppa','COPPA Notice']].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-white/60 text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} HomeSafeEducation. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <span>🔒 SSL Secured</span><span>·</span><span>💳 Stripe</span><span>·</span><span>🛡️ GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
