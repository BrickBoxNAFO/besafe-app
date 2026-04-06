import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { PACKAGES, COURSES } from '@/lib/data'
import FamilyDashboardClient from './FamilyDashboardClient'

const BUNDLE_SEAT_LIMIT = 5

export default async function FamilyDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/family')

  const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const { data: purchases } = await supabase.from('purchases').select('package_id').eq('user_id', user.id)
  const ownedIds = (purchases || []).map(p => p.package_id)
  if (!ownedIds.includes('bundle') && !ownedIds.includes('complete')) redirect('/packages')

  const { data: seats } = await admin.from('seats').select('*').eq('owner_user_id', user.id).order('created_at', { ascending: true })

  const memberIds = (seats || []).filter(s => s.member_user_id).map(s => s.member_user_id)
  let memberProgress = {}
  if (memberIds.length > 0) {
    const { data: progress } = await admin.from('progress').select('user_id, course_id, passed').in('user_id', memberIds)
    for (const row of (progress || [])) {
      const course = COURSES.find(c => c.id === row.course_id)
      if (!course) continue
      if (!memberProgress[row.user_id]) memberProgress[row.user_id] = {}
      if (!memberProgress[row.user_id][course.pkg]) memberProgress[row.user_id][course.pkg] = { passed: 0, total: 0 }
      memberProgress[row.user_id][course.pkg].total++
      if (row.passed) memberProgress[row.user_id][course.pkg].passed++
    }
  }

  const filledSeats = (seats || []).map(seat => {
    const pkg = PACKAGES.find(p => p.id === seat.package_id)
    const totalLessons = COURSES.filter(c => c.pkg === seat.package_id).reduce((a, c) => a + c.lessons.length, 0)
    let progressPct = 0
    if (seat.member_user_id) {
      const prog = memberProgress[seat.member_user_id]?.[seat.package_id]
      progressPct = prog && totalLessons > 0 ? Math.round((prog.passed / totalLessons) * 100) : 0
    }
    return {
      seatId: seat.id, packageId: seat.package_id,
      packageName: pkg?.name || seat.package_id, packageEmoji: pkg?.emoji || '📦',
      packageColor: pkg?.color || '#0EA5A0', packagePale: pkg?.pale || '#E6F7F7',
      memberName: seat.member_name, memberEmail: seat.invite_email,
      inviteSent: !!seat.invite_sent_at, accepted: !!seat.accepted_at,
      isSelf: seat.owner_user_id === seat.member_user_id,
      progressPct, totalLessons, isEmpty: false,
    }
  })

  const emptySlotCount = Math.max(0, BUNDLE_SEAT_LIMIT - filledSeats.length)
  const emptySlots = Array.from({ length: emptySlotCount }, (_, i) => ({
    seatId: null, packageId: null, packageName: null, packageEmoji: null,
    packageColor: null, packagePale: null, memberName: null, memberEmail: null,
    inviteSent: false, accepted: false, progressPct: 0, totalLessons: 0,
    isEmpty: true, slotNumber: filledSeats.length + i + 1,
  }))

  const acceptedCount = filledSeats.filter(s => s.accepted).length
  const avgProgress = acceptedCount > 0 ? Math.round(filledSeats.filter(s => s.accepted).reduce((a, s) => a + s.progressPct, 0) / acceptedCount) : 0
  const packageOptions = PACKAGES.map(p => ({ id: p.id, name: p.name, emoji: p.emoji, color: p.color, pale: p.pale, tag: p.tag }))

  return (
    <FamilyDashboardClient
      slots={[...filledSeats, ...emptySlots]}
      seatLimit={BUNDLE_SEAT_LIMIT}
      usedSeats={filledSeats.length}
      acceptedCount={acceptedCount}
      sentCount={filledSeats.filter(s => s.inviteSent && !s.accepted).length}
      avgProgress={avgProgress}
      userName={user.user_metadata?.name}
      packageOptions={packageOptions}
    />
  )
}
