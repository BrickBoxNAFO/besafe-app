import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { PACKAGES, COURSES } from '@/lib/data'
import FamilyDashboardClient from './FamilyDashboardClient'

export const dynamic = 'force-dynamic'

// Map a package id (including aggregate ids like bundle/complete, and
// sub-packages like growing-early/growing-junior) to the set of course ids
// that count toward that seat's total.
function coursesForPackage(pkgId) {
  if (!pkgId) return []
  if (pkgId === 'bundle' || pkgId === 'complete') {
    return COURSES.map(c => c.id)
  }
  if (pkgId === 'growing-early' || pkgId === 'growing-junior') {
    return COURSES.filter(c => c.subPkg === pkgId).map(c => c.id)
  }
  return COURSES.filter(c => c.pkg === pkgId).map(c => c.id)
}

// Count passed lessons (not rows — one row per lesson attempt) against the
// total lessons in the seat's package.
function progressFor(pkgId, rows) {
  const courseIds = coursesForPackage(pkgId)
  const courseSet = new Set(courseIds)
  const relevant = (rows || []).filter(r => courseSet.has(r.course_id))

  // Unique (course_id, lesson_index) pairs that are passed.
  const passedPairs = new Set()
  relevant.forEach(r => {
    if (r.passed) passedPairs.add(`${r.course_id}:${r.lesson_index}`)
  })

  const totalLessons = COURSES
    .filter(c => courseSet.has(c.id))
    .reduce((a, c) => a + (c.lessons?.length || 0), 0)

  // Count unique courses that have at least one passed lesson AND are fully
  // completed.
  const byCourse = {}
  relevant.forEach(r => {
    if (!byCourse[r.course_id]) byCourse[r.course_id] = new Set()
    if (r.passed) byCourse[r.course_id].add(r.lesson_index)
  })
  const totalCourses = courseIds.length
  const startedCourses = Object.values(byCourse).filter(s => s.size > 0).length
  const completedCourses = courseIds.filter(id => {
    const c = COURSES.find(cc => cc.id === id)
    if (!c) return false
    const passed = byCourse[id]?.size || 0
    return c.lessons?.length > 0 && passed >= c.lessons.length
  }).length

  const pct = totalLessons > 0
    ? Math.min(100, Math.round((passedPairs.size / totalLessons) * 100))
    : 0

  return {
    pct,
    passedLessons: passedPairs.size,
    totalLessons,
    startedCourses,
    completedCourses,
    totalCourses,
  }
}

export default async function FamilyPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch user's purchases
  const { data: purchaseRows } = await supabase
    .from('purchases').select('package_id').eq('user_id', user.id)
  const purchases = purchaseRows?.map(p => p.package_id) || []

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

  // seatProgress: seatId -> { pct, passedLessons, totalLessons, ... }
  const seatProgress = {}

  if (memberIds.length > 0) {
    const { data: progressRows } = await supabase
      .from('progress')
      .select('user_id, course_id, lesson_index, passed')
      .in('user_id', memberIds)

    const rowsByMember = {}
    ;(progressRows || []).forEach(r => {
      if (!rowsByMember[r.user_id]) rowsByMember[r.user_id] = []
      rowsByMember[r.user_id].push(r)
    })

    seats.forEach(seat => {
      if (!seat.member_user_id) return
      const rows = rowsByMember[seat.member_user_id] || []
      seatProgress[seat.id] = progressFor(seat.package_id, rows)
    })
  }

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
        seatProgress={seatProgress}
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
