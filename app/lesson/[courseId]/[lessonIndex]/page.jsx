'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { COURSES, PACKAGES } from '@/lib/data'
import SONGS, { getAudioUrl } from '@/lib/songs'
import AudioPlayer from '@/components/AudioPlayer'

// Courses that are the LAST course in their package/sub-package.
// A certificate is only issued when one of these is completed (and all other
// courses in the same package are also complete) — so users get exactly one
// certificate per package, not one per course. Must stay in sync with
// LAST_COURSE_IN_PACKAGE in /app/congratulations/[courseId]/page.jsx.
const LAST_COURSE_IDS = new Set([
  'c35',  // Growing Minds: Early Years
  'c39',  // Growing Minds: Junior
  'c38',  // Street Smart
  'c9',   // Nest Breaking
  'c15',  // Roaming Free
  'c20',  // Aging Wisdom
  'c25',  // Family Anchor
])

/* ────────────────────────────────────────────
   Parse a lesson's content array into:
   - paragraphs: the teaching content (before quiz)
   - keyTakeaways: bullet points from "--- Key Takeaways ---"
   - questions: [{ question, options: [{ text, isCorrect }], explanation }]
   ──────────────────────────────────────────── */
function parseLesson(content) {
  if (!content || !content.length) return { paragraphs: [], keyTakeaways: [], questions: [] }

  const paragraphs = []
  const keyTakeaways = []
  const questions = []

  let phase = 'content' // 'content' | 'takeaways' | 'quiz'
  let currentQuestion = null

  for (let i = 0; i < content.length; i++) {
    const line = content[i]
    if (!line || line.trim() === '') continue

    // Detect key takeaways section (can appear in any phase, including after quiz)
    if (line.includes('--- Key Takeaways ---') || line.trim() === 'Key Takeaways:' || line.trim() === 'Key Takeaways') {
      // Save any in-progress question before switching phases
      if (currentQuestion && currentQuestion.options.length > 0) {
        questions.push(currentQuestion)
        currentQuestion = null
      }
      phase = 'takeaways'
      continue
    }

    // Detect quiz section
    if (line === 'Check Your Understanding' || line.startsWith('Check Your Understanding')) {
      phase = 'quiz'
      continue
    }

    // Detect a question line: "Q1." or "Q1 " or just "Q1" on its own
    // This can appear in any phase (some lessons skip "Check Your Understanding")
    if (/^Q\d+\.?\s/.test(line) || /^Q\d+\.?\s*$/.test(line.trim())) {
      phase = 'quiz'
      // If we have a previous question, save it
      if (currentQuestion) questions.push(currentQuestion)

      // Some formats have the question text on the same line as Q1.
      const qText = line.replace(/^Q\d+\.?\s*/, '').trim()
      if (qText) {
        // Question text is on this line
        currentQuestion = { question: qText, options: [], explanation: '' }
      } else {
        // Question text is on the NEXT line
        const nextLine = content[i + 1] || ''
        currentQuestion = { question: nextLine.trim(), options: [], explanation: '' }
        i++ // skip the next line since we consumed it
      }
      continue
    }

    // Detect "Scenario Question" (used in recap/final lessons)
    // Format 1: "Scenario Question: <question text>" (Early Years — question on same line)
    // Format 2: "Scenario Question" alone, question text on next line (Junior/other)
    if (/^Scenario Question/i.test(line.trim())) {
      phase = 'quiz'
      if (currentQuestion && currentQuestion.options.length > 0) {
        questions.push(currentQuestion)
      }

      const afterColon = line.replace(/^Scenario Question:?\s*/i, '').trim()
      if (afterColon) {
        // Format 1: question text is on this line after the colon (Early Years)
        currentQuestion = { question: afterColon, options: [], explanation: '' }
      } else {
        // Format 2: "Scenario Question" alone — check if next line is question text or an answer
        const nextLine = (content[i + 1] || '').trim()
        if (nextLine && !nextLine.startsWith('Why:') && !/^[A-D]\)/.test(nextLine)) {
          // Next line is the question text (not an answer option)
          currentQuestion = { question: nextLine, options: [], explanation: '' }
          i++ // consume the next line
        } else {
          // Next line is already an answer option — no separate question text
          currentQuestion = { question: 'Scenario Question', options: [], explanation: '' }
        }
      }
      continue
    }

    // Detect explanation line
    if (phase === 'quiz' && currentQuestion && line.startsWith('Why:')) {
      currentQuestion.explanation = line.replace(/^Why:\s*/, '').trim()
      continue
    }

    // Detect answer option (when we're in a question)
    if (phase === 'quiz' && currentQuestion) {
      const isCorrect = line.includes('[CORRECT]')
      const cleanText = line.replace('[CORRECT]', '').replace(/^[A-D]\)\s*/, '').trim()
      if (cleanText) {
        currentQuestion.options.push({ text: cleanText, isCorrect })
      }
      continue
    }

    // In takeaways phase, collect bullet points
    if (phase === 'takeaways') {
      keyTakeaways.push(line.trim())
      continue
    }

    // Regular content paragraph
    if (phase === 'content') {
      // Skip "Key Learning:" lines - they'll go in takeaways-style display
      if (line.startsWith('Key Learning:')) {
        keyTakeaways.push(line.replace('Key Learning:', '').trim())
        continue
      }
      paragraphs.push(line)
    }
  }

  // Push last question if exists
  if (currentQuestion && currentQuestion.options.length > 0) {
    questions.push(currentQuestion)
  }

  return { paragraphs, keyTakeaways, questions }
}


export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const course = COURSES.find(c => c.id === params.courseId)
  const lessonIndex = parseInt(params.lessonIndex)
  const lesson = course?.lessons[lessonIndex]
  const pkg = course ? PACKAGES.find(p => p.id === course.pkg) : null

  const lessonTitle = typeof lesson === 'string' ? lesson : lesson?.title
  const rawContent = typeof lesson === 'object' && lesson?.content ? lesson.content : []

  const { paragraphs, keyTakeaways, questions } = useMemo(() => parseLesson(rawContent), [rawContent])

  const courseColor = course?.color || pkg?.color || '#0EA5A0'
  const totalLessons = course?.lessons?.length || 0
  const nextLessonIdx = lessonIndex + 1 < totalLessons ? lessonIndex + 1 : null

  // Course images for Growing Minds — served from Supabase Storage bucket "Images"
  const imgBase = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/Images`
  const courseImageMap = {
    'c26': `${imgBase}/early-road-safety.jpg`,
    'c27': `${imgBase}/early-anti-bullying.jpg`,
    'c28': `${imgBase}/early-online-safety.jpg`,
    'c29': `${imgBase}/early-stranger-danger.jpg`,
    'c30': `${imgBase}/early-body-safety.jpg`,
    'c1': `${imgBase}/junior-road-safety.jpg`,
    'c2': `${imgBase}/junior-anti-bullying.jpg`,
    'c3': `${imgBase}/junior-online-safety.jpg`,
    'c4': `${imgBase}/junior-stranger-danger.jpg`,
    'c5': `${imgBase}/junior-body-safety.jpg`,
  }
  const courseImage = course ? courseImageMap[course.id] : null
  const isGrowingEarly = course?.subPkg === 'growing-early'
  const isGrowingJunior = course?.subPkg === 'growing-junior'
  const isGrowingMind = isGrowingEarly || isGrowingJunior

  // Song data for Growing Minds courses
  const songData = course ? SONGS[course.id] : null
  const lessonSong = songData?.lessons?.[lessonIndex]
  const rememberSong = songData?.remember
  const isLastLesson = lessonIndex === totalLessons - 1
  const hasLessonSong = lessonSong?.file && lessonSong.file.length > 0
  const hasRememberSong = isLastLesson && rememberSong?.file && rememberSong.file.length > 0

  const [phase, setPhase] = useState('content') // 'content' | 'quiz' | 'result'
  const [selected, setSelected] = useState({}) // { questionIndex: optionIndex }
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [existingProgress, setExistingProgress] = useState(null)
  const [saveError, setSaveError] = useState(null)
  const [justPassedCourse, setJustPassedCourse] = useState(false)

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', params.courseId)
        .eq('lesson_index', lessonIndex)
        .maybeSingle()
      if (data) setExistingProgress(data)
    }
    fetchProgress()
  }, [params.courseId, lessonIndex])

  // Reset state when navigating between lessons
  useEffect(() => {
    setPhase('content')
    setSelected({})
    setSubmitted(false)
    setSaving(false)
    window.scrollTo(0, 0)
  }, [params.courseId, lessonIndex])

  if (!course || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy/50 mb-4">Lesson not found.</p>
          <Link href="/library" className="btn-primary">Back to Library</Link>
        </div>
      </div>
    )
  }

  // Calculate quiz score
  const totalQ = questions.length
  const score = questions.reduce((sum, q, qi) => {
    const picked = selected[qi]
    if (picked !== undefined && q.options[picked]?.isCorrect) return sum + 1
    return sum
  }, 0)
  const passThreshold = Math.max(1, Math.ceil(totalQ * 0.6)) // 60% to pass, minimum 1
  const passed = score >= passThreshold
  const allAnswered = Object.keys(selected).length === totalQ

  const handleSubmit = async () => {
    if (!allAnswered) return
    setSubmitted(true)
    setSaving(true)
    setSaveError(null)

    // ─── Auth: try getUser(), fall back to getSession() ───────────────
    // On mobile Safari with strict cookie settings getUser() occasionally
    // returns null even when a valid session exists. getSession() reads
    // from the client and is more forgiving.
    let user = null
    try {
      const { data: { user: u } } = await supabase.auth.getUser()
      user = u
    } catch (err) {
      console.error('getUser failed, falling back to getSession:', err)
    }
    if (!user) {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        user = session?.user || null
      } catch (err) {
        console.error('getSession also failed:', err)
      }
    }

    if (!user) {
      // We genuinely could not identify the user. Tell them so they know
      // their progress was NOT saved and they need to log in again.
      setSaveError('We could not verify your session. Your progress was not saved. Please log in again and retry this lesson.')
      setSaving(false)
      setPhase('result')
      return
    }

    // ─── Save lesson progress ─────────────────────────────────────────
    try {
      const { error: upsertError } = await supabase.from('progress').upsert({
        user_id: user.id,
        course_id: params.courseId,
        lesson_index: lessonIndex,
        passed: score >= passThreshold,
        score,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,course_id,lesson_index' })

      if (upsertError) {
        console.error('Progress upsert error:', upsertError)
        setSaveError('Your progress could not be saved. Please check your connection and retry.')
        setSaving(false)
        setPhase('result')
        return
      }
    } catch (err) {
      console.error('Progress upsert threw:', err)
      setSaveError('Your progress could not be saved. Please check your connection and retry.')
      setSaving(false)
      setPhase('result')
      return
    }

    // ─── Check if the entire course is now complete ───────────────────
    if (score >= passThreshold && course) {
      try {
        const { data: allProgress } = await supabase
          .from('progress')
          .select('lesson_index, passed')
          .eq('user_id', user.id)
          .eq('course_id', params.courseId)

        const passedLessons = new Set(
          (allProgress || []).filter(r => r.passed).map(r => r.lesson_index)
        )
        // Include the current lesson we just passed
        passedLessons.add(lessonIndex)

        if (passedLessons.size >= totalLessons) {
          // Every lesson in THIS course is now passed.
          setJustPassedCourse(true)

          // Only issue a certificate when (a) this is the designated
          // "last course" of its package AND (b) every other course in
          // the same package/sub-package is also complete. This
          // guarantees exactly one certificate per package — not one
          // per course.
          if (LAST_COURSE_IDS.has(params.courseId)) {
            const siblingCourses = COURSES.filter(c => {
              if (course.subPkg) return c.subPkg === course.subPkg
              return c.pkg === course.pkg
            })
            const otherCourseIds = siblingCourses
              .map(c => c.id)
              .filter(id => id !== params.courseId)

            let packageComplete = true
            if (otherCourseIds.length > 0) {
              const { data: pkgProgress } = await supabase
                .from('progress')
                .select('course_id, lesson_index, passed')
                .eq('user_id', user.id)
                .in('course_id', otherCourseIds)

              // For each sibling course, confirm every lesson is passed
              for (const sibling of siblingCourses) {
                if (sibling.id === params.courseId) continue
                const total = sibling.lessons?.length || 0
                if (total === 0) continue
                const passedForSibling = new Set(
                  (pkgProgress || [])
                    .filter(r => r.course_id === sibling.id && r.passed)
                    .map(r => r.lesson_index)
                )
                if (passedForSibling.size < total) {
                  packageComplete = false
                  break
                }
              }
            }

            if (packageComplete) {
              const pkgName = pkg?.name || course.title || 'Course'
              fetch('/api/generate-certificate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: user.id,
                  courseId: params.courseId,
                  packageId: course.pkg || '',
                  packageName: pkgName,
                }),
              }).catch(err => console.error('Certificate generation failed:', err))
            }
          }
        }
      } catch (err) {
        console.error('Course completion check failed:', err)
        // Completion-check failure should NOT block the user from seeing
        // their score or navigating forward. Swallow and carry on.
      }
    }

    setSaving(false)
    setPhase('result')
  }

  // Render a content paragraph with rich formatting
  const renderParagraph = (text, idx) => {
    if (!text || text.trim() === '') return null

    // Handle multi-line text with embedded bullets
    if (text.includes('\n')) {
      const lines = text.split('\n')
      const intro = lines[0]
      const bullets = lines.slice(1).filter(l => l.startsWith('- '))

      if (bullets.length > 0) {
        return (
          <div key={idx}>
            <p className="text-navy/80 text-base leading-[1.85] mb-3">{intro}</p>
            <div className="rounded-xl border border-gray-100 bg-slate/50 p-4 space-y-2">
              {bullets.map((b, bi) => (
                <div key={bi} className="flex gap-3 text-navy/75 text-[15px] leading-relaxed">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: courseColor + '18', color: courseColor }}>
                    {bi + 1}
                  </span>
                  <span>{b.replace(/^-\s*/, '')}</span>
                </div>
              ))}
            </div>
          </div>
        )
      }
      // Multi-line without bullets
      return (
        <div key={idx} className="space-y-3">
          {lines.map((line, li) => (
            <p key={li} className="text-navy/80 text-base leading-[1.85]">{line}</p>
          ))}
        </div>
      )
    }

    // Regular paragraph
    return (
      <p key={idx} className="text-navy/80 text-base leading-[1.85]">{text}</p>
    )
  }

  return (
    <div className="page-enter min-h-screen bg-slate">
      {/* Sticky header with progress bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link href={'/course/' + course.id} className="text-navy/50 hover:text-navy text-sm transition-colors flex items-center gap-1 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {course.title}
          </Link>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: ((lessonIndex + 1) / totalLessons * 100) + '%', background: courseColor }}
            />
          </div>
          <span className="text-xs text-navy/40 flex-shrink-0">{lessonIndex + 1}/{totalLessons}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* ===== CONTENT PHASE ===== */}
        {phase === 'content' && (
          <div>
            {/* Lesson header with coloured accent */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1 w-8 rounded-full" style={{ background: courseColor }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: courseColor }}>
                  Lesson {lessonIndex + 1} of {totalLessons}
                </span>
              </div>
              <h1 className="font-serif text-4xl text-navy leading-tight">{lessonTitle}</h1>
              {pkg && (
                <p className="text-navy/40 text-sm mt-2">{course.emoji} {course.title} &middot; {pkg.name}</p>
              )}
            </div>

            {/* Course illustration for Growing Minds */}
            {courseImage && lessonIndex === 0 && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img
                  src={courseImage}
                  alt={'Illustration for ' + course.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Age-appropriate notice for Growing Minds */}
            {isGrowingMind && lessonIndex === 0 && (
              <div className="mb-6 flex gap-3 p-5 rounded-xl border border-amber-200 bg-amber-50/60">
                <span className="text-2xl mt-0.5 flex-shrink-0">{isGrowingEarly ? '\uD83D\uDC68\u200D\uD83D\uDC67' : '\u26A0\uFE0F'}</span>
                <div>
                  <p className="text-sm font-bold text-amber-900 mb-1">{isGrowingEarly ? 'Guided Learning \u2014 Complete Together With Your Child' : 'Age-Appropriate Content'}</p>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {isGrowingEarly
                      ? 'This course is designed for children aged 4\u20137 and must be completed together with a parent or carer. The content uses simple, gentle language intended to be read aloud. Please sit with your child as you work through each lesson together.'
                      : 'This course is designed for children aged 8\u201311 and may not be suitable for the 4\u20137 age range. It covers topics in greater depth than the Early Years version. If your child is in the younger group, we recommend the Early Years courses instead.'}
                  </p>
                </div>
              </div>
            )}

            {/* Lesson song — appears BEFORE the written content */}
            {hasLessonSong && (
              <div className="mb-6">
                <AudioPlayer
                  src={getAudioUrl(lessonSong.file)}
                  title={lessonSong.title}
                  subtitle={course.title + ' - Lesson ' + (lessonIndex + 1) + ' of ' + totalLessons}
                  lyrics={lessonSong.lyrics}
                  variant="lesson"
                />
              </div>
            )}

            {/* Lesson content card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              {/* Coloured top accent bar */}
              <div className="h-1" style={{ background: 'linear-gradient(to right, ' + courseColor + ', ' + courseColor + '60)' }} />

              <div className="p-8 md:p-10">
                <div className="space-y-5">
                  {paragraphs.map((text, idx) => renderParagraph(text, idx))}
                </div>

                {/* Key Takeaways */}
                {keyTakeaways.length > 0 && (
                  <div className="mt-10 rounded-xl p-6" style={{ background: courseColor + '08', border: '1px solid ' + courseColor + '20' }}>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: courseColor + '20' }}>
                        <svg className="w-4 h-4" fill="none" stroke={courseColor} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm font-bold text-navy">Key Takeaways</span>
                    </div>
                    <ul className="space-y-3">
                      {keyTakeaways.map((t, i) => (
                        <li key={i} className="flex gap-3 text-sm text-navy/70 leading-relaxed">
                          <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: courseColor }} />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Remember This recap song (shown on last lesson only, after content) */}
            {hasRememberSong && (
              <div className="mb-6">
                <AudioPlayer
                  src={getAudioUrl(rememberSong.file)}
                  title={rememberSong.title || 'Remember This'}
                  subtitle={course.title + ' - Course Recap'}
                  lyrics={rememberSong.lyrics}
                  variant="remember"
                />
              </div>
            )}

            {/* Previous progress notice */}
            {existingProgress?.passed && (
              <div className="mb-4 flex items-center gap-2 bg-teal/5 border border-teal/15 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-teal">Previously passed with {existingProgress.score}/{totalQ || existingProgress.score}</span>
              </div>
            )}

            {/* Action button */}
            <div className="flex items-center justify-between">
              <div />
              {questions.length > 0 ? (
                <button onClick={() => { setPhase('quiz'); window.scrollTo(0, 0) }} className="btn-primary text-base py-3.5 px-8">
                  Take the Quiz ({questions.length} questions)
                </button>
              ) : (
                <div className="flex gap-3">
                  {nextLessonIdx !== null ? (
                    <Link href={'/lesson/' + course.id + '/' + nextLessonIdx} className="btn-primary">
                      Next Lesson
                    </Link>
                  ) : (
                    <Link href={'/course/' + course.id} className="btn-primary">
                      Back to Course
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== QUIZ PHASE ===== */}
        {phase === 'quiz' && (
          <div>
            <div className="mb-8">
              <h2 className="font-serif text-2xl text-navy mb-1">Check Your Understanding</h2>
              <p className="text-navy/50 text-sm">
                Answer {totalQ === 2 ? 'both' : 'all ' + totalQ} question{totalQ !== 1 ? 's' : ''}.
                Score {passThreshold} or more to pass.
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((q, qi) => (
                <div key={qi} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <p className="font-semibold text-navy mb-4 text-sm">
                    <span style={{ color: courseColor }} className="font-bold">Q{qi + 1}.</span>{' '}
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => {
                          if (!submitted) {
                            setSelected(prev => ({ ...prev, [qi]: oi }))
                          }
                        }}
                        className={'w-full text-left p-3 rounded-xl text-sm transition-all border ' +
                          (selected[qi] === oi
                            ? 'border-teal bg-teal/10 text-navy font-medium'
                            : 'border-gray-100 bg-slate text-navy/70 hover:border-gray-200')
                        }
                      >
                        <span className="font-bold mr-2" style={{ color: courseColor }}>
                          {['A', 'B', 'C', 'D'][oi]}.
                        </span>
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button onClick={() => setPhase('content')} className="btn-ghost text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to Lesson
              </button>
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Submit Answers'}
              </button>
            </div>
          </div>
        )}

        {/* ===== RESULT PHASE ===== */}
        {phase === 'result' && (
          <div>
            {/* Score banner */}
            <div className={'rounded-2xl p-8 mb-8 text-center ' + (passed ? 'bg-teal/10 border border-teal/20' : 'bg-red-50 border border-red-100')}>
              <div className={'w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 ' + (passed ? 'bg-teal/20' : 'bg-red-100')}>
                {passed ? '\u{1F389}' : '\u{1F4AA}'}
              </div>
              <h2 className="font-serif text-2xl text-navy mb-2">
                {passed ? 'Lesson Passed!' : 'Not Quite There'}
              </h2>
              <p className="text-navy/60 mb-1">
                You scored <strong className={passed ? 'text-teal' : 'text-red-500'}>{score}/{totalQ}</strong>
              </p>
              <p className="text-navy/40 text-sm">
                {passed
                  ? (saveError ? 'Great work on the quiz!' : 'Great work! Your progress has been saved.')
                  : 'You need ' + passThreshold + ' or more to pass. Review the lesson and try again.'}
              </p>
            </div>

            {/* Save error banner — surfaces any auth/network failure so mobile
                users know their progress wasn't recorded. */}
            {saveError && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
                <span className="text-xl mt-0.5" aria-hidden="true">{'\u26A0\uFE0F'}</span>
                <div className="text-sm text-amber-900 leading-relaxed">
                  <p className="font-bold mb-1">Progress not saved</p>
                  <p>{saveError}</p>
                  <button
                    onClick={() => { setPhase('quiz'); setSubmitted(false); setSaveError(null) }}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-900 underline hover:no-underline"
                  >
                    Retry save
                  </button>
                </div>
              </div>
            )}

            {/* Answer review */}
            <div className="space-y-4 mb-8">
              {questions.map((q, qi) => {
                const pickedIdx = selected[qi]
                const isCorrect = q.options[pickedIdx]?.isCorrect

                return (
                  <div key={qi} className={'rounded-2xl border overflow-hidden ' + (isCorrect ? 'border-teal/30' : 'border-red-200')}>
                    {/* Question header */}
                    <div className={'px-5 py-3 flex items-center gap-2 ' + (isCorrect ? 'bg-teal/10' : 'bg-red-50')}>
                      <span className={'text-lg ' + (isCorrect ? 'text-teal' : 'text-red-500')}>
                        {isCorrect ? '\u2713' : '\u2717'}
                      </span>
                      <p className="font-semibold text-navy text-sm flex-1">
                        <span className="text-navy/40 mr-1">Q{qi + 1}.</span> {q.question}
                      </p>
                      <span className={'text-xs font-bold px-2.5 py-1 rounded-full ' + (isCorrect ? 'bg-teal/20 text-teal' : 'bg-red-100 text-red-600')}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    {/* All options shown with visual treatment */}
                    <div className="px-5 py-3 space-y-2 bg-white">
                      {q.options.map((opt, oi) => {
                        const isThisCorrect = opt.isCorrect
                        const isThisSelected = oi === pickedIdx
                        const isWrongPick = isThisSelected && !isThisCorrect

                        let style = 'border-gray-100 bg-slate text-navy/40'
                        if (isThisCorrect) style = 'border-green-300 bg-green-50 text-green-800 font-medium'
                        if (isWrongPick) style = 'border-red-300 bg-red-50 text-red-700 line-through'

                        return (
                          <div key={oi} className={'flex items-center gap-3 p-3 rounded-xl border text-sm ' + style}>
                            <span className={'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ' +
                              (isThisCorrect ? 'bg-green-500 text-white' : isWrongPick ? 'bg-red-400 text-white' : 'bg-gray-100 text-navy/30')
                            }>
                              {isThisCorrect ? '\u2713' : isWrongPick ? '\u2717' : ['A','B','C','D'][oi]}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                            {isThisCorrect && !isCorrect && (
                              <span className="text-xs font-bold text-green-600 flex-shrink-0">Correct Answer</span>
                            )}
                            {isWrongPick && (
                              <span className="text-xs font-bold text-red-500 flex-shrink-0">Your Answer</span>
                            )}
                            {isThisCorrect && isCorrect && (
                              <span className="text-xs font-bold text-green-600 flex-shrink-0">Your Answer {'\u2713'}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className={'px-5 py-3 border-t text-sm leading-relaxed ' + (isCorrect ? 'bg-teal/5 border-teal/10 text-teal' : 'bg-amber-50 border-amber-100 text-amber-800')}>
                        <span className="font-semibold">{isCorrect ? 'Well done! ' : 'Explanation: '}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!passed && (
                <button
                  onClick={() => {
                    setPhase('content')
                    setSelected({})
                    setSubmitted(false)
                    window.scrollTo(0, 0)
                  }}
                  className="btn-ghost"
                >
                  Review Lesson & Try Again
                </button>
              )}
              {passed && nextLessonIdx !== null && (
                <Link href={'/lesson/' + course.id + '/' + nextLessonIdx} className="btn-primary text-center">
                  Next Lesson: {typeof course.lessons[nextLessonIdx] === 'string' ? course.lessons[nextLessonIdx] : course.lessons[nextLessonIdx]?.title}
                </Link>
              )}
              {/* Last lesson passed: route to /congratulations/[courseId].
                  That page shows the music-purchase popup for the package's
                  final course, or a "next course" CTA for mid-package. */}
              {passed && nextLessonIdx === null && justPassedCourse && !saveError && (
                <Link href={'/congratulations/' + course.id} className="btn-primary text-center">
                  {LAST_COURSE_IDS.has(course.id) ? 'Celebrate & Get Your Songs \u2192' : 'Course Complete \u2192'}
                </Link>
              )}
              {/* Fallback if we couldn't verify course completion but the
                  user still passed the final lesson. Keeps the old behaviour. */}
              {passed && nextLessonIdx === null && !justPassedCourse && (
                <Link href={'/course/' + course.id} className="btn-primary text-center">
                  Back to Course
                </Link>
              )}
              <Link href={'/course/' + course.id} className="btn-ghost text-center">
                Back to {course.title}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
