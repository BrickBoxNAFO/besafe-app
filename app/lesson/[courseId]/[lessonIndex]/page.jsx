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

  return (
    <div className="page-enter min-h-screen bg-slate">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href={`/course/${course.id}`} className="text-navy/50 hover:text-navy text-sm transition-colors">
            ← {course.title}
          </Link>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((lessonIndex + 1) / course.lessons.length) * 100}%`, background: pkg?.color }} />
          </div>
          <span className="text-xs text-navy/40">{lessonIndex + 1}/{course.lessons.length}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {phase === 'content' && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: pkg?.color }}>
                Lesson {lessonIndex + 1}
              </span>
              <h1 className="font-serif text-3xl text-navy mt-1">{lesson}</h1>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
              <p className="text-navy/70 leading-relaxed text-base">
                This lesson covers practical, evidence-based knowledge about <strong>{lesson}</strong>.
                Work through the content at your own pace, then complete the quiz to confirm your understanding and move on to the next lesson.
              </p>
              <div className="mt-6 p-5 rounded-xl border-l-4 text-sm leading-relaxed text-navy/70 bg-teal/5" style={{ borderColor: pkg?.color }}>
                <strong className="text-navy">⭐ Key Learning</strong>
                <p className="mt-2">
                  Understanding <em>{lesson}</em> is a core part of your personal safety knowledge.
                  The skills and awareness covered here apply to real situations you may encounter.
                  Take your time, and use the quiz to check you have absorbed the key points.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-navy/40">
                {existingProgress?.passed && <span className="text-teal">✓ Previously passed · Score: {existingProgress.score}/5</span>}
              </div>
              <button onClick={() => setPhase('quiz')} className="btn-primary">
                Take the Quiz →
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
                ← Back to Lesson
              </button>
              <button
                onClick={handleSubmit}
                disabled={selected.some(s => s === null) || saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Submit Answers →'}
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 ${
              passed ? 'bg-teal/15' : 'bg-red-50'
            }`}>
              {passed ? '🎉' : '📖'}
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
                      {correct ? '✓ Correct' : `✗ Incorrect correct answer: ${q.opts[q.correct]}`}
                    </p>
                    <p className="text-navy/50 text-xs mt-1 italic">{q.expl}</p>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {!passed && (
                <button onClick={() => { setPhase('content'); setSelected([null, null, null, null, null]); setSubmitted(false) }}
                  className="btn-ghost">
                  Try Again
                </button>
              )}
              {passed && nextLesson !== null && (
                <Link href={`/lesson/${course.id}/${nextLesson}`} className="btn-primary">
                  Next Lesson →
                </Link>
              )}
              {passed && nextLesson === null && (
                <Link href={`/course/${course.id}`} className="btn-primary">
                  Subject Complete! →
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
