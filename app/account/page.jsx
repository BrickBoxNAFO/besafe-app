'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { PACKAGES } from '@/lib/data'

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [purchases, setPurchases] = useState([])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [pwError, setPwError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      const { data } = await supabase.from('purchases').select('package_id, purchased_at').eq('user_id', user.id)
      setPurchases(data || [])
    }
    load()
  }, [])

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPwMsg(''); setPwError('')
    if (newPassword !== confirmPw) { setPwError('Passwords do not match.'); return }
    if (newPassword.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) { setPwError(error.message) } else { setPwMsg('Password updated successfully.'); setNewPassword(''); setConfirmPw('') }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) return <div className="min-h-screen bg-slate flex items-center justify-center text-navy/50">Loading...</div>

  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-navy mb-1">Account Settings</h1>
          <p className="text-navy/50 text-sm">{user.email}</p>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-navy mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white text-xl font-bold">
              {(user.user_metadata?.name || user.email)?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-navy">{user.user_metadata?.name || 'No name set'}</p>
              <p className="text-navy/50 text-sm">{user.email}</p>
              <p className="text-navy/30 text-xs mt-0.5">Member since {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Purchases */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-navy mb-4">Your Purchases</h2>
          {purchases.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-navy/50 text-sm mb-4">No purchases yet.</p>
              <Link href="/packages" className="btn-ghost text-sm">View Packages</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {purchases.map(p => {
                const pkg = PACKAGES.find(pkg => pkg.id === p.package_id)
                return pkg ? (
                  <div key={p.package_id} className="flex items-center justify-between p-4 bg-slate rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{pkg.emoji}</span>
                      <div>
                        <p className="font-medium text-navy text-sm">{pkg.name}</p>
                        <p className="text-navy/40 text-xs">
                          Purchased {new Date(p.purchased_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Link href={`/library`} className="text-xs text-teal font-medium hover:underline">Access →</Link>
                  </div>
                ) : null
              })}
            </div>
          )}
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-navy mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
            {pwMsg && <div className="bg-teal/10 border border-teal/20 text-teal text-sm rounded-xl p-3">{pwMsg}</div>}
            {pwError && <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-3">{pwError}</div>}
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">New password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                placeholder="Minimum 8 characters" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Confirm new password</label>
              <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                placeholder="Repeat new password" />
            </div>
            <button type="submit" disabled={loading} className="btn-ghost text-sm">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Refund info */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-navy mb-2">Refund Policy</h2>
          <p className="text-navy/60 text-sm leading-relaxed">
            We offer a full refund within 7 days of purchase, provided that less than 20% of any course has been completed.
            To request a refund, email <a href="mailto:support@thebesafegroup.com" className="text-teal underline">support@thebesafegroup.com</a>.
          </p>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-navy mb-4">Account Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleSignOut} className="btn-ghost text-sm text-red-500 border-red-100 hover:bg-red-50">
              Sign Out
            </button>
            <Link href="/contact" className="btn-ghost text-sm">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
