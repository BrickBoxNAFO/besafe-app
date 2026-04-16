import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { PACKAGES, COURSES } from '@/lib/data'
import FamilyDashboardClient from './FamilyDashboardClient'

export default async function FamilyPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch user's purchases
  const { data: purchaseRows } = await supabase
    .from('purchases').select('package_id').eq('user_id', user.id)
  const purchases = purchaseRows?.map(p => p.package_id) || []

  // Check if user owns bundle or complete
  const hasBundle = purchases.includes('bundle')
  const hasComplete = purchases.includes('complete')

  if (!hasBundle && !hasComplete) {
    redirect('/dashboard')
  }

  // Fetch all seats owned by this user
  const { data: seatRows } = await supabase
    .from('seats').select('*').eq('owner_user_id', user.id)
  const seats = seatRows || []

  // Fetch member progress for all members on seats
  const memberIds = seats
    .filter(s => s.member_user_id)
    .map(s => s.member_user_id)

  let memberProgress = {}
  if (memberIds.length > 0) {
    const { data: progressRows } = await supabase
      .from('progress')
      .select('user_id, course_id, lesson_index, passed')
      .in('user_id', memberIds)

    memberProgress = {}
    progressRows?.forEach(r => {
      if (!memberProgress[r.user_id]) {
        memberProgress[r.user_id] = []
      }
      if (r.passed) {
        memberProgress[r.user_id].push(r.course_id)
      }
    })
  }

  // Calculate seat limit based on purchase types
  const seatLimit = calculateSeatLimit(purchases)

  const name = user.user_metadata?.name || user.email?.split('@')[0]

  return (
    <div className="page-enter min-h-screen bg-slate">
      <FamilyDashboardClient
        user={user}
        name={name}
        seats={seats}
        seatLimit={seatLimit}
        packages={PACKAGES}
        courses={COURSES}
        memberProgress={memberProgress}
      />
    </div>
  )
}

function calculateSeatLimit(purchases) {
  let total = 0
  if (purchases.includes('bundle')) total += 5
  if (purchases.includes('complete')) total += 7
  if (purchases.includes('gift_later')) total += 1
  return Math.max(total, 5)
}
