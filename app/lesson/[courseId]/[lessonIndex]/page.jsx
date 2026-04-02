'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { COURSES, PACKAGES, QUIZ_POOL } from '@/lib/data'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const course = COURSES.find(c => c.id === params.courseId)
  const lessonIndex = parseInt(params.lessonIndex)
  const lesson = course?.lessons[lessonIndex]
  const pkg = course ? PACKAGES.find(p => p.id === course.pkg) : null

  // Support both old format (string) and new format (object with title/content)
  const lessonTitle = typeof lesson === 'string' ? lesson : lesson?.title
  const lessonContent = typeof lesson === 'object' && lesson?.content ? lesson.content : []

  // Check if this is a Growing Minds course (for images)
  const isGrowingEarly = course?.subPkg === 'growing-early'
  const isGrowingJunior = course?.subPkg === 'growing-junior'
  const isGrowingMind = isGrowingEarly || isGrowingJunior

  // Map course IDs to their illustration image
  const courseImageMap = {
    'c26': '/images/courses/early-road-safety.jpg',
    'c27': '/images/courses/early-anti-bullying.jpg',
    'c28': '/images/courses/early-online-safety.jpg',
    'c29': '/images/courses/early-stranger-danger.jpg',
    'c30': '/images/courses/early-body-safety.jpg',
    'c1': '/images/courses/junior-road-safety.jpg',
    'c2': '/images/courses/junior-anti-bullying.jpg',
    'c3': '/images/courses/junior-online-safety.jpg',
    'c4': '/images/courses/junior-stranger-danger.jpg',
    'c5': '/images/courses/junior-body-safety.jpg',
  }
  const courseImage = course ? courseImageMap[course.id] : null

  const [phase, setPhase] = useState('content') // 'content' | 'quiz' | 'result'
  const [selected, setSelected] = useState([null, null, null, null, null])
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [existingProgress, setExistingProgress] = useState(null)

  // Pick 5 quiz questions deterministically for this lesson
  const quizQuestions = QUIZ_POOL.slice(
    (lessonIndex * 3) % QUIZ_POOL.length,
    ((lessonIndex * 3) % QUIZ_POOL.length) + 5
  ).concat(
    lessonIndex * 3 % QUIZ_POOL.length + 5 > QUIZ_POOL.length
      ? QUIZ_POOL.slice(0, (lessonIndex * 3 % QUIZ_POOL.length + 5) - QUIZ_POOL.length)
      : []
  ).slice(0, Math.min(5, QUIZ_POOL.length))

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
  }, [])

  if (!course || !lesson) {
    return <div className="min-h-screen flex items-center justify-center text-navy/50">Lesson not found.</div>
  }

  const score = selected.filter((s, i) => s === quizQuestions[i]?.correct).length
  const passed = score >= 3

  const handleSubmit = async () => {
    if (selected.some(s => s === null)) return
    setSubmitted(true)
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('progress').upsert({
        user_id: user.id,
        course_id: params.courseId,
        lesson_index: lessonIndex,
        passed: score >= 3,
        score,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'user_id,course_id,lesson_index' })
    }
    setSaving(false)
    setPhase('result')
  }

  const nextLesson = lessonIndex + 1 < course.lessons.length ? lessonIndex + 1 : null

  // Helper to render a content paragraph with special formatting
  const renderParagraph = (text, idx) => {
    if (!text || text.trim() === '') return <div key={idx} className="h-4" />

    // Key Takeaways separator
    if (text.includes('--- Key Takeaways ---')) {
      return (
        <div key={idx} className="mt-8 mb-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: pkg?.color }}>
            Key Takeaways
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )
    }

    // Bullet points (lines starting with - or â¢)
    if (text.startsWith('- ') || text.startsWith('â¢ ')) {
      const items = text.split('\n').filter(line => line.startsWith('- ') || line.startsWith('â¢ '))
      if (items.length > 1) {
        return (
          <ul key={idx} className="list-disc list-inside space-y-1.5 text-navy/70 text-[15px] leading-relaxed pl-2">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^[-â¢]\s*/, '')}</li>
            ))}
          </ul>
        )
      }
      return (
        <div key={idx} className="flex gap-2 text-navy/70 text-[15px] leading-relaxed pl-2">
          <span className="text-navy/30 mt-0.5">â¢</span>
          <span>{text.replace(/^[-â¢]\s*/, '')}</span>
        </div>
      )
    }

    // Numbered items
    if (/^\d+[\.\)]\s/.test(text)) {
      return (
        <div key={idx} className="flex gap-2 text-navy/70 text-[15px] leading-relaxed pl-2">
          <span className="font-semibold text-navy/50 min-w-[1.5rem]">{text.match(/^\d+[\.\)]/)[0]}</span>
          <span>{text.replace(/^\d+[\.\)]\s*/, '')}</span>
        </div>
      )
    }

    // Bold headers (text in ALL CAPS or ending with colon)
    if (text === text.toUpperCase() && text.length > 3 && text.length < 80) {
      return (
        <h3 key={idx} className="font-semibold text-navy text-base mt-6 mb-2">
          {text.charAt(0) + text.slice(1).toLowerCase()}
        </h3>
      )
    }

    // Multi-line paragraphs with embedded bullet points
    if (text.includes('\n- ') || text.includes('\nâ¢ ')) {
      const lines = text.split('\n')
      return (
        <div key={idx} className="space-y-2">
          {lines.map((line, i) => {
            if (line.startsWith('- ') || line.startsWith('â¢ ')) {
              return (
                <div key={i} className="flex gap-2 text-navy/70 text-[15px] leading-relaxed pl-2">
                  <span className="text-navy/30 mt-0.5">â¢</span>
                  <span>{line.replace(/^[-â¢]\s*/, '')}</span>
                </div>
              )
            }
            return <p key={i} className="text-navy/70 text-[15px] leading-relaxed">{line}</p>
          })}
        </div>
      )
    }

    // Regular paragraph
    return (
      <p key={idx} className="text-navy/70 text-[15px] leading-relaxed">
        {text}
      </p>
    )
  }

  return (
    <div className="page-enter min-h-screen bg-slate">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href={`/course/${course.id}`} className="text-navy/50 hover:text-navy text-sm transition-colors">
            â {course.title}
          </Link>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((lessonIndex + 1) / course.lessons.length) * 100}%`, background: pkg?.color }}
            />
          </div>
          <span className="text-xs text-navy/40">{lessonIndex + 1}/{course.lessons.length}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {phase === 'content' && (
          <div>
            {/* Age-appropriateness notice for Growing Minds */}
            {isGrowingMind && lessonIndex === 0 && (
              <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                <div className="flex gap-3">
                  <span className="text-amber-500 text-lg mt-0.5">â ï¸</span>
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">Age-Appropriate Content</p>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      {isGrowingEarly
                        ? 'This course is designed for children aged 4â7 and should be completed together with a parent or carer. The content uses simple language and gentle explanations suitable for young children.'
                        : 'This course is designed for children aged 8â11. Please ensure younger children are not accessing this content, as it covers topics in greater depth than the Early Years version.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: pkg?.color }}>
                Lesson {lessonIndex + 1}
              </span>
              <h1 className="font-serif text-3xl text-navy mt-1">{lessonTitle}</h1>
            </div>

            {/* Course illustration for Growing Minds */}
            {courseImage && lessonIndex === 0 && (
              <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src={courseImage}
                  alt={`Illustration for ${course.title}`}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Lesson content */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
              {lessonContent.length > 0 ? (
                <div className="space-y-4">
                  {lessonContent.map((text, idx) => renderParagraph(text, idx))}
                </div>
              ) : (
                <p className="text-navy/70 leading-relaxed text-base">
                  This lesson covers practical, evidence-based knowledge about <strong>{lessonTitle}</strong>.
                  Work through the content at your own pace, then complete the quiz to confirm your understanding and move on to the next lesson.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-navy/40">
                {existingProgress?.passed && <span className="text-teal">â Previously passed Â· Score: {existingProgress.score}/5</span>}
              </div>
              <button onClick={() => setPhase('quiz')} className="btn-primary">
                Take the Quiz â
              </button>
            </div>
          </div>
        )}

        {phase === 'quiz' && (
          <div>
            <div className="mb-8">
              <h2 className="font-serif text-2xl text-navy mb-1">Check Your Understanding</h2>
              <p className="text-navy/50 text-sm">Answer all 5 questions. Score 3 or more to pass.</p>
            </div>
            <div className="space-y-6">
              {quizQuestions.map((q, qi) => (
                <div key={qi} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <p className="font-semibold text-navy mb-4 text-sm">
                    <span style={{ color: pkg?.color }} className="font-bold">Q{qi + 1}.</span> {q.q}
                  </p>
                  <div className="space-y-2">
                    {q.opts.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => {
                          if (!submitted) {
                            const next = [...selected]
                            next[qi] = oi
                            setSelected(next)
                          }
                        }}
                        className={`w-full text-left p-3 rounded-xl text-sm transition-all border ${
                          selected[qi] === oi
                            ? 'border-teal bg-teal/10 text-navy font-medium'
                            : 'border-gray-100 bg-slate text-navy/70 hover:border-gray-200'
                        }`}
                      >
                        <span className="font-bold mr-2" style={{ color: pkg?.color }}>
                          {['A', 'B', 'C', 'D'][oi]}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <button onClick={() => setPhase('content')} className="btn-ghost text-sm">
                â Back to Lesson
              </button>
              <button
                onClick={handleSubmit}
                disabled={selected.some(s => s === null) || saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Submit Answers â'}
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 ${
              passed ? 'bg-teal/15' : 'bg-red-50'
            }`}>
              {passed ? 'ð' : 'ð'}
            </div>
            <h2 className="font-serif text-3xl text-navy mb-2">
              {passed ? 'Lesson Passed!' : 'Not Quite'}
            </h2>
            <p className="text-navy/60 mb-2">
              You scored <strong>{score}/5</strong>
              {quizQuestions.length > 0 && ` (${Math.round(score / quizQuestions.length * 100)}%)`}
            </p>
            <p className="text-navy/50 text-sm mb-8">
              {passed
                ? 'Great work. Your progress has been saved.'
                : 'You need 3 or more to pass. Review the lesson and try again.'}
            </p>

            {/* Answer review */}
            <div className="text-left space-y-4 mb-8">
              {quizQuestions.map((q, qi) => {
                const correct = selected[qi] === q.correct
                return (
                  <div key={qi} className={`rounded-xl p-4 border text-sm ${correct ? 'bg-teal/5 border-teal/20' : 'bg-red-50 border-red-100'}`}>
                    <p className="font-medium text-navy mb-1">{q.q}</p>
                    <p className={`text-xs ${correct ? 'text-teal' : 'text-red-500'}`}>
                      {correct ? 'â Correct' : `â Incorrect â correct answer: ${q.opts[q.correct]}`}
                    </p>
                    <p className="text-navy/50 text-xs mt-1 italic">{q.expl}</p>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!passed && (
                <button onClick={() => { setPhase('content'); setSelected([null, null, null, null, null]); setSubmitted(false) }} className="btn-ghost">
                  Try Again
                </button>
              )}
              {passed && nextLesson !== null && (
                <Link href={`/lesson/${course.id}/${nextLesson}`} className="btn-primary">
                  Next Lesson â
                </Link>
              )}
              {passed && nextLesson === null && (
                <Link href={`/course/${course.id}`} className="btn-primary">
                  Subject Complete! â
                </Link>
              )}
              <Link href={`/course/${course.id}`} className="btn-ghost">
                Back to Subject
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
