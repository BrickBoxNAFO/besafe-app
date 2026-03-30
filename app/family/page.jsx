import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { PACKAGES, COURSES } from '@/lib/data'
import FamilyDashboardClient from './FamilyDashboardClient'

export default async function FamilyDashboardPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/family')

  const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data: purchases } = await supabase.from('purchases').select('package_id').eq('user_id', user.id)
  const ownedPackageIds = (purchases || []).map(p => p.package_id)
  if (ownedPackageIds.length === 0) redirect('/packages')

  const { data: seats } = await admin.from('seats').select('*').eq('owner_user_id', user.id)
  const memberIds = (seats || []).filter(s => s.member_user_id).map(s => s.member_user_id)
  let memberProgress = {}

  if (memberIds.length > 0) {
    const { data: progress } = await admin.from('progress').select('user_id, course_id, passed').in('user_id', memberIds)
    for (const row of (progress || [])) {
      if (!memberProgress[row.user_id]) memberProgress[row.user_id] = {}
      const course = COURSES.find(c => c.id === row.course_id)
      if (course) {
        if (!memberProgress[row.user_id][course.pkg]) memberProgress[row.user_id][course.pkg] = { passed: 0, total: 0 }
        memberProgress[row.user_id][course.pkg].total++
        if (row.passed) memberProgress[row.user_id][course.pkg].passed++
      }
    }
  }

  const { data: ownerProgressRows } = await supabase.from('progress').select('course_id, passed')
  let ownerPkgProgress = {}
  for (const row of (ownerProgressRows || [])) {
    const course = COURSES.find(c => c.id === row.course_id)
    if (course) {
      if (!ownerPkgProgress[course.pkg]) ownerPkgProgress[course.pkg] = { passed: 0, total: 0 }
      ownerPkgProgress[course.pkg].total++
      if (row.passed) ownerPkgProgress[course.pkg].passed++
    }
  }

  const seatData = ownedPackageIds.map(pkgId => {
    const pkg = PACKAGES.find(p => p.id === pkgId)
    const seat = (seats || []).find(s => s.package_id === pkgId)
    const totalLessons = COURSES.filter(c => c.pkg === pkgId).reduce((acc, c) => acc + c.lessons.length, 0)
    let progressPct = 0, memberName = null, memberEmail = null, isOwner = false
    if (seat?.member_user_id) {
      const prog = memberProgress[seat.member_user_id]?.[pkgId]
      progressPct = prog && totalLessons > 0 ? Math.round((prog.passed / totalLessons) * 100) : 0
      memberName = seat.member_name; memberEmail = seat.invite_email
    } else if (!seat) {
      const prog = ownerPkgProgress[pkgId]
      progressPct = prog && totalLessons > 0 ? Math.round((prog.passed / totalLessons) * 100) : 0
      memberName = user.user_metadata?.name || 'You'; isOwner = true
    }
    return {
      packageId: pkgId, packageName: pkg?.name || pkgId, packageEmoji: pkg?.emoji || '📦',
      packageColor: pkg?.color || '#0EA5A0', packagePale: pkg?.pale || '#E6F7F7',
      seatId: seat?.id || null, memberName, memberEmail,
      inviteEmail: seat?.invite_email || null, inviteSent: !!seat?.invite_sent_at,
      accepted: !!seat?.accepted_at, isOwner, progressPct, totalLessons
    }
  })

  return <FamilyDashboardClient seatData={seatData} userId={user.id} userName={user.user_metadata?.name} />
}
