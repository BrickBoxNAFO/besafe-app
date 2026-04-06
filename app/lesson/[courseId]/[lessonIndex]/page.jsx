'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { COURSES, PACKAGES } from '@/lib/data'

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

    // Detect key takeaways section
    if (line.includes('--- Key Takeaways ---') || line.includes('Key Takeaways')) {
      if (phase === 'content') phase = 'takeaways'
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

  const [phase, setPhase] = useState('content') // 'content' | 'quiz' | 'result'
  const [selected, setSelected] = useState({}) // { questionIndex: optionIndex }
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [existingProgress, setExistingProgress] = useState(null)

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
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('progress').upsert({
        user_id: user.id,
        course_id: params.courseId,
        lesson_index: lessonIndex,
        passed: score >= passThreshold,
        score,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,course_id,lesson_index' })
    }
    setSaving(false)
    setPhase('result')
  }

  // Render a content paragraph with formatting
  const renderParagraph = (text, idx) => {
    if (!text || text.trim() === '') return null

    // Handle multi-line text with embedded bullets
    if (text.includes('\n')) {
      const lines = text.split('\n')
      const intro = lines[0]
      const bullets = lines.slice(1).filter(l => l.startsWith('- '))

      if (bullets.length > 0) {
        return (
          <div key={idx} className="space-y-2">
            <p className="text-navy/70 text-[15px] leading-relaxed">{intro}</p>
            <ul className="space-y-1.5 pl-4">
              {bullets.map((b, bi) => (
                <li key={bi} className="flex gap-2 text-navy/70 text-[15px] leading-relaxed">
                  <span className="text-navy/30 mt-1 flex-shrink-0">&bull;</span>
                  <span>{b.replace(/^-\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      }
      // Multi-line without bullets
      return (
        <div key={idx} className="space-y-2">
          {lines.map((line, li) => (
            <p key={li} className="text-navy/70 text-[15px] leading-relaxed">{line}</p>
          ))}
        </div>
      )
    }

    // Regular paragraph
    return (
      <p key={idx} className="text-navy/70 text-[15px] leading-relaxed">{text}</p>
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
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: courseColor }}>
                Lesson {lessonIndex + 1} of {totalLessons}
              </span>
              <h1 className="font-serif text-3xl text-navy mt-1">{lessonTitle}</h1>
            </div>

            {/* Lesson content */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
              <div className="space-y-4">
                {paragraphs.map((text, idx) => renderParagraph(text, idx))}
              </div>

              {/* Key Takeaways */}
              {keyTakeaways.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: courseColor + '20' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke={courseColor} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm font-bold text-navy">Key Takeaways</span>
                  </div>
                  <ul className="space-y-2">
                    {keyTakeaways.map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm text-navy/70 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: courseColor }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

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
                <button onClick={() => { setPhase('quiz'); window.scrollTo(0, 0) }} className="btn-primary">
                  Take the Quiz ({questions.length} questions)
                </button>
              ) : (
                // No quiz - just mark as complete and move on
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
                  ? 'Great work! Your progress has been saved.'
                  : 'You need ' + passThreshold + ' or more to pass. Review the lesson and try again.'}
              </p>
            </div>

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
              {passed && nextLessonIdx === null && (
                <Link href={'/course/' + course.id} className="btn-primary text-center">
                  Course Complete!
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
