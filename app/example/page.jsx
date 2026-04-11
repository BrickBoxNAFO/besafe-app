'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AudioPlayer from '@/components/AudioPlayer'
import { getAudioUrl } from '@/lib/songs'

/* ────────────────────────────────────────────
   GUIDED EXAMPLE LESSON — Product Tour
   Street Smart → Online Safety & Social Media → Lesson 4: Scams, Catfishing and Fake Profiles
   ──────────────────────────────────────────── */

const COURSE_COLOR = '#DC2626'

const LESSON = {
  title: 'Scams, Catfishing and Fake Profiles',
  courseTitle: 'Online Safety and Social Media',
  packageName: 'Street Smart',
  emoji: '🥷',
  lessonIndex: 3,
  totalLessons: 4,
}

const LESSON_SONG = {
  title: 'Scams, Catfishing and Fake Profiles',
  file: 'Street Smart/Course 2/Scams, Catfishing and Fake Profiles.mp3',
  lyrics: `Not everyone online is who they say
Fake pics, fake stories, fake games they play
Pause, think, check the vibe
Trust your gut, don't take the dive
Catfishers hide behind a screen
Photos stolen, lives unseen
Say they care, say they're real
But their goal is to make you feel
They dodge the video, their stories don't fit
Vague details, excuses that don't quit
Ask for money, ask for more
Watch your back, don't ignore
Reverse search, check the face
Too perfect? Something's off in place
Feel it in your gut? You're right
No one online deserves your trust overnight
Not everyone online is who they say
Fake pics, fake stories, fake games they play
Pause, think, check the vibe
Trust your gut, don't take the dive
Scams come fast, "Act now, limited time!"
"Win a prize!" "Do this task, it's fine!"
Phishing links, fake logins, shady deals
Don't click, don't send, protect what's real
Anything too good to be true, it's a lie
Stop, breathe, don't comply
Tell a trusted adult, report it fast
You're smarter than they think, you'll last
Pause before you click, think before you share
Your safety online is handled with care
Scammers are clever, but you're wise too
Don't let anyone trick you
Not everyone online is who they say
Fake pics, fake stories, fake games they play
Pause, think, check the vibe
Trust your gut, don't take the dive
Check the links, protect your space
Your safety online, you own that place
Trust yourself, be alert, stay strong
You know what's right, you can't go wrong`,
}

const REMEMBER_SONG = {
  title: 'Remember This — Online Safety Recap',
  file: 'Street Smart/Course 2/Remember This Course 2.mp3',
  lyrics: `Your footprint online stays forever
Think before you post, keep it clever
Screenshots, shares, nothing disappears
Your safety online is worth your years
Location, routine, personal stuff
Privacy settings help, but they're not enough
Anything can be screenshotted, shared, or leaked
Keep control of what you post, don't be tricked
Groomers online use distance and lies
Ask personal questions, tell fake ties
Secrets, pics, isolation from friends
Stay alert, trust instincts, that's how it ends
Grooming happens in person too
Know the signs, know what to do
Harassment online? Document, block, report
Tell a trusted adult, you're in support
Think before you post, think before you share
Your digital life needs your care
Trust your gut, stay aware
Safety online is everywhere
Not everyone online is who they claim
Catfish, scams, urgency games
Fake profiles, shady deals, phishing too
Pause, check, don't fall for the crew
If it feels wrong, it probably is
Your instincts are sharp, your mind is bliss
You control what you share, what you trust
Respect yourself, protect your stuff
Screenshots, passwords, block and report
Safety online is your own fort
Friends, family, adults you trust
Use their help, it's a must
Think before you post, think before you share
Your digital life needs your care
Trust your gut, stay aware
Safety online is everywhere
Digital footprint, yeah, it's real
Your posts, your pics, everything you feel
Stay smart, stay safe, keep your light
Trust yourself, and do what's right`,
}

const PARAGRAPHS = [
  "Not everyone online is who they say they are. This is not just about groomers. It is about the wide range of people who create fake profiles, fake identities, and fake stories to get something from you.",
  "Catfishing is when someone creates a fake identity online to deceive you. They might use someone else's photos, make up a life story, and build a relationship with you based on lies. People catfish for different reasons: loneliness, manipulation, financial gain, or to get personal information. The result is the same. You are connecting with someone who does not exist.",
  "Signs of catfishing: they avoid video calls or always have an excuse, their photos look too polished or like they came from a modelling page, their stories do not add up over time, they are vague about details of their life, they got very emotionally intense very quickly, or they ask for money or personal information.",
  "If you suspect someone is not who they claim to be, you can reverse-image search their profile photos. If the photos appear on other accounts or stock photo sites, that tells you everything. But even without proof, if something feels off, trust that feeling. You do not owe anyone online your trust.",
  "Online scams targeting teenagers are more common than you might think. These include: fake giveaways that ask for your details to \"claim a prize,\" messages saying you have won something you never entered, links that look like login pages but are actually designed to steal your password (this is called phishing), people offering easy money for doing small tasks that turn out to be illegal, and \"too good to be true\" deals on items that do not exist.",
  "The common thread in all scams is urgency. They want you to act fast before you think. \"Limited time only.\" \"Act now or lose your account.\" \"Reply in the next hour.\" Urgency is a manipulation tactic. Anything legitimate will still be there after you have taken time to think.",
  "If someone contacts you with an offer, a prize, a deal, or a request, pause. Do not click links in messages from people you do not know. Do not enter your login details on any page you reached through a link in a message. Go directly to the website yourself instead. Never send money to someone you have only met online. Never share passwords, even with people you think you trust online.",
  "If you have been scammed, tell a trusted adult. It is not embarrassing. Scammers are professionals who trick adults every day. Report the account and the scam to the platform.",
]

const KEY_TAKEAWAYS = [
  "Not everyone online is who they say they are. Watch for signs of fake profiles and catfishing.",
  "Scams use urgency to stop you thinking. Pause before clicking, sharing, or sending.",
  "If someone avoids video calls, has inconsistent stories, or asks for money — trust your instincts.",
  "Never enter login details through a link someone sends you. Go to the website directly.",
  "If you have been scammed, tell a trusted adult. It is not your fault.",
]

const REMEMBER_THIS = "Your digital footprint is permanent — think before posting about your location, routine, or personal content. Privacy settings help but are not perfect; assume anything can be screenshotted and shared. Online grooming uses anonymity and distance to build trust and exploit you — watch for increasing personal questions, image requests, secrecy, and isolation from friends and family. Remember that grooming happens in person too. If you are harassed online, document everything, block the person, report to the platform, and tell a trusted adult. Not everyone online is who they say they are — watch for signs of catfishing and scams, and never act on urgency. If something feels wrong, trust that feeling."

const QUESTIONS = [
  {
    question: "Someone you have been talking to online for weeks always has an excuse for why they cannot video call. Their photos look very professional and their stories sometimes contradict each other. What is most likely happening?",
    options: [
      { text: "They are just shy about video calls", isCorrect: false },
      { text: "They probably have a bad camera", isCorrect: false },
      { text: "They may be catfishing you, using a fake identity and photos that are not theirs", isCorrect: true },
      { text: "This is completely normal behaviour", isCorrect: false },
    ],
    explanation: "Consistently avoiding video calls combined with professional-looking photos and inconsistent stories are classic signs of catfishing. Trust the pattern, not the excuses.",
  },
  {
    question: "You receive a message saying you have won a competition and need to click a link and enter your login details to claim your prize. What should you do?",
    options: [
      { text: "Click the link quickly before the offer expires", isCorrect: false },
      { text: "Enter your details because you might have actually won", isCorrect: false },
      { text: "Forward it to your friends so they can win too", isCorrect: false },
      { text: "Do not click the link. This is likely a phishing scam designed to steal your password", isCorrect: true },
    ],
    explanation: "Legitimate prizes do not ask for your login details through a message link. This is a common phishing tactic. Never enter your details through a link someone sends you.",
  },
  {
    question: "You have been messaging someone online for weeks who seems understanding about your problems. They have said no one at school gets you like they do. They have asked you to keep your friendship \"private\" and are asking for photos \"to feel closer.\" You are starting to feel uncomfortable. What should you do?",
    options: [
      { text: "Send photos to show you trust them", isCorrect: false },
      { text: "Keep messaging but do not send photos", isCorrect: false },
      { text: "Stop contact, tell a trusted adult about the pattern, and do not delete messages", isCorrect: true },
      { text: "Confront them about grooming", isCorrect: false },
    ],
    explanation: "The pattern (understanding approach, isolation from peers, secret-keeping, photo requests) adds up to grooming. Your discomfort is data. Tell an adult with evidence.",
  },
]


/* ────────────────────────────────────────────
   Side Annotation Component
   ──────────────────────────────────────────── */
function Annotation({ children, color = 'teal', label = 'How it works' }) {
  const borderColor = color === 'red' ? COURSE_COLOR : color === 'navy' ? '#0B1F3A' : color === 'amber' ? '#F59E0B' : '#0EA5A0'
  return (
    <div className="relative bg-white rounded-lg shadow-sm border-l-3 overflow-hidden"
      style={{ borderLeftColor: borderColor }}>
      {/* Explainer tag */}
      <div className="px-3 py-1.5 flex items-center gap-1.5" style={{ background: borderColor + '12' }}>
        <svg className="w-4 h-4 flex-shrink-0" style={{ color: borderColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: borderColor }}>{label}</span>
      </div>
      <div className="px-4 py-3 text-sm leading-relaxed text-navy/70">
        {children}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Two-column layout wrapper
   On desktop: side-by-side with wide thin annotation on right
   On mobile: annotation wraps below the content
   ──────────────────────────────────────────── */
function GuidedRow({ children, annotation, annotationColor, annotationKey, annotationLabel }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row gap-3 items-start">
        <div className="flex-1 min-w-0">
          {children}
        </div>
        {annotation && (
          <div className="w-full lg:w-80 flex-shrink-0" key={annotationKey}>
            <Annotation color={annotationColor} label={annotationLabel || 'How it works'}>{annotation}</Annotation>
          </div>
        )}
      </div>
    </div>
  )
}


export default function ExampleLessonPage() {
  const [phase, setPhase] = useState('content') // 'content' | 'quiz' | 'result'
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const [showWrongPrompt, setShowWrongPrompt] = useState(null) // which question to show popup on

  const totalQ = QUESTIONS.length
  const score = QUESTIONS.reduce((sum, q, qi) => {
    const picked = selected[qi]
    if (picked !== undefined && q.options[picked]?.isCorrect) return sum + 1
    return sum
  }, 0)
  const passThreshold = Math.max(1, Math.ceil(totalQ * 0.6))
  const passed = score >= passThreshold
  const allAnswered = Object.keys(selected).length === totalQ

  const handleSubmit = () => {
    if (!allAnswered) return
    setSubmitted(true)
    setPhase('result')
    window.scrollTo(0, 0)
  }

  return (
    <div className="page-enter min-h-screen bg-slate">
      {/* Free example banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-3 px-4">
        <p className="text-sm font-semibold">
          Guided Example &mdash; See how a real HomeSafeEducation lesson works
        </p>
      </div>

      {/* Sticky header with progress bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link href="/packages" className="text-navy/50 hover:text-navy text-sm transition-colors flex items-center gap-1 flex-shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            View All Packages
          </Link>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: '100%', background: COURSE_COLOR }}
            />
          </div>
          <span className="text-xs text-navy/40 flex-shrink-0">{LESSON.lessonIndex + 1}/{LESSON.totalLessons}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ===== CONTENT PHASE ===== */}
        {phase === 'content' && (
          <div>
            {/* Lesson header */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">What you are looking at</p>
                  <p>This is a lesson from <strong>Street Smart</strong>, one of our 7 packages. Street Smart is designed for <strong>teenagers aged 12–17</strong>.</p>
                  <p className="mt-2">Every lesson is written specifically for its age group — the language, examples, and scenarios are all age-appropriate.</p>
                </div>
              }
              annotationColor="navy"
              annotationLabel="This Lesson"
            >
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1 w-8 rounded-full" style={{ background: COURSE_COLOR }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: COURSE_COLOR }}>
                    Lesson {LESSON.lessonIndex + 1} of {LESSON.totalLessons}
                  </span>
                </div>
                <h1 className="font-serif text-4xl text-navy leading-tight">{LESSON.title}</h1>
                <p className="text-navy/40 text-sm mt-2">{LESSON.emoji} {LESSON.courseTitle} &middot; {LESSON.packageName}</p>
              </div>
            </GuidedRow>

            {/* Lesson song */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">Educational Music</p>
                  <p>Selected packages include <strong>original songs written and produced by HomeSafeEducation</strong>, with age-appropriate lyrics and a music style designed for the age range.</p>
                  <p className="mt-2">Press play to hear it. The lyrics reinforce the lesson&apos;s key safety messages in a way that sticks.</p>
                  <p className="mt-2 text-navy/50 text-xs">Growing Minds (ages 4–11), Street Smart (ages 12–17), and Aging Wisdom (60+) include original music in every lesson.</p>
                </div>
              }
              annotationColor="amber"
              annotationLabel="Music"
            >
              <div>
                <AudioPlayer
                  src={getAudioUrl(LESSON_SONG.file)}
                  title={LESSON_SONG.title}
                  subtitle={LESSON.courseTitle + ' — Lesson ' + (LESSON.lessonIndex + 1) + ' of ' + LESSON.totalLessons}
                  lyrics={LESSON_SONG.lyrics}
                  variant="lesson"
                />
              </div>
            </GuidedRow>

            {/* Lesson content card */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">The Lesson Content</p>
                  <p>This is the main body of the lesson. It covers the key information your child needs to know about this topic — written clearly and directly.</p>
                  <p className="mt-2">No filler, no fluff. Just the information that matters, in language designed for the age group.</p>
                </div>
              }
              annotationColor="teal"
              annotationLabel="Lesson Content"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1" style={{ background: 'linear-gradient(to right, ' + COURSE_COLOR + ', ' + COURSE_COLOR + '60)' }} />
                <div className="p-8 md:p-10">
                  <div className="space-y-5">
                    {PARAGRAPHS.map((text, idx) => (
                      <p key={idx} className="text-navy/80 text-base leading-[1.85]">{text}</p>
                    ))}
                  </div>
                </div>
              </div>
            </GuidedRow>

            {/* Key Takeaways */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">Key Takeaways</p>
                  <p>After the main lesson content, we summarise the most important points. This helps reinforce learning and gives a quick reference to come back to.</p>
                  <p className="mt-2">Think of it as the &ldquo;if you remember nothing else, remember this&rdquo; section.</p>
                </div>
              }
              annotationColor="red"
              annotationLabel="Key Takeaways"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="rounded-xl p-6" style={{ background: COURSE_COLOR + '08', border: '1px solid ' + COURSE_COLOR + '20' }}>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: COURSE_COLOR + '20' }}>
                        <svg className="w-4 h-4" fill="none" stroke={COURSE_COLOR} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm font-bold text-navy">Key Takeaways</span>
                    </div>
                    <ul className="space-y-3">
                      {KEY_TAKEAWAYS.map((t, i) => (
                        <li key={i} className="flex gap-3 text-sm text-navy/70 leading-relaxed">
                          <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: COURSE_COLOR }} />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GuidedRow>

            {/* Remember This recap section */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">Remember This — Course Recap</p>
                  <p>This section appears at the end of the final lesson in each course. It summarises <strong>everything learned across all previous lessons</strong> in the course — not just this one.</p>
                  <p className="mt-2">It ties the whole course together so the learner leaves with a complete picture.</p>
                </div>
              }
              annotationColor="teal"
              annotationLabel="Course Recap"
            >
              <div className="bg-white rounded-2xl border border-teal/20 shadow-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-teal to-teal2" />
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-teal/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-sm font-bold text-navy">Remember This — Course Recap</span>
                  </div>
                  <p className="text-navy/70 text-sm leading-relaxed">{REMEMBER_THIS}</p>
                </div>
              </div>
            </GuidedRow>

            {/* Remember This song */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">Recap Song</p>
                  <p>The final lesson also includes a <strong>recap song</strong> that musically summarises the entire course. It reinforces all the key messages from every lesson in one track.</p>
                </div>
              }
              annotationColor="amber"
              annotationLabel="Recap Song"
            >
              <div>
                <AudioPlayer
                  src={getAudioUrl(REMEMBER_SONG.file)}
                  title={REMEMBER_SONG.title}
                  subtitle={LESSON.courseTitle + ' — Course Recap'}
                  lyrics={REMEMBER_SONG.lyrics}
                  variant="remember"
                />
              </div>
            </GuidedRow>

            {/* Quiz transition */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">Every Lesson Has a Quiz</p>
                  <p>Every single lesson across all packages includes a quiz that reinforces learning. It is not just about testing — it is about making sure the information sticks.</p>
                  <p className="mt-2">Click below to see how it works.</p>
                </div>
              }
              annotationColor="navy"
              annotationLabel="Quiz"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <p className="text-navy/60 text-base mb-4">That covers the lesson content. Now it is time to check what you have learned.</p>
                <button onClick={() => { setPhase('quiz'); window.scrollTo(0, 0) }} className="btn-primary text-base py-3.5 px-8 group">
                  Now let&apos;s move onto the quiz
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </GuidedRow>
          </div>
        )}

        {/* ===== QUIZ PHASE ===== */}
        {phase === 'quiz' && (
          <div>
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">The Quiz</p>
                  <p>The quiz covers information learned across the lessons in this course — not just this single lesson.</p>
                  <p className="mt-3 font-semibold text-red-600">For this demo, please click a wrong answer on the first two questions so we can show you how the review system works.</p>
                  <p className="mt-2 text-navy/50 text-xs">We have highlighted which answers are clickable.</p>
                </div>
              }
              annotationColor="red"
              annotationLabel="Demo Instructions"
            >
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-navy mb-1">Check Your Understanding</h2>
                <p className="text-navy/50 text-sm">
                  Answer all {totalQ} questions. Score {passThreshold} or more to pass.
                </p>
              </div>
            </GuidedRow>

            <div className="space-y-6">
              {QUESTIONS.map((q, qi) => {
                const isRestrictedQuestion = qi < 2

                return (
                  <GuidedRow
                    key={qi}
                    annotation={
                      qi === 0 ? (
                        <div>
                          <p className="font-bold text-navy mb-1">Please click on a wrong answer</p>
                          <p>We want to show you what happens when a learner gets something wrong — this is where the real learning happens.</p>
                        </div>
                      ) : qi === 1 ? (
                        <div>
                          <p className="font-bold text-navy mb-1">Please click on a wrong answer</p>
                          <p>After you submit, you will see how we explain <strong>why</strong> each answer was right or wrong.</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-bold text-navy mb-1">Your Choice</p>
                          <p>This one is up to you — pick any answer.</p>
                        </div>
                      )
                    }
                    annotationColor={qi < 2 ? 'red' : 'teal'}
                    annotationKey={'quiz-' + qi}
                    annotationLabel={qi < 2 ? 'Try It' : 'Your Turn'}
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                      <p className="font-semibold text-navy mb-4 text-sm">
                        <span style={{ color: COURSE_COLOR }} className="font-bold">Q{qi + 1}.</span>{' '}
                        {q.question}
                      </p>

                      {/* "Please click a wrong answer" prompt below question for Q1 and Q2 */}
                      {isRestrictedQuestion && !selected[qi] && selected[qi] !== 0 && (
                        <p className="text-red-500 text-xs font-semibold mb-3 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg>
                          Please click on a wrong answer
                        </p>
                      )}

                      <div className="space-y-2 relative">
                        {q.options.map((opt, oi) => {
                          const isSelected = selected[qi] === oi

                          return (
                            <button
                              key={oi}
                              onClick={() => {
                                if (submitted) return
                                // If restricted question and they click the correct answer, show popup
                                if (isRestrictedQuestion && opt.isCorrect) {
                                  setShowWrongPrompt(qi)
                                  setTimeout(() => setShowWrongPrompt(null), 2500)
                                  return
                                }
                                setShowWrongPrompt(null)
                                setSelected(prev => ({ ...prev, [qi]: oi }))
                              }}
                              className={'w-full text-left p-3 rounded-xl text-sm transition-all border ' +
                                (isSelected
                                  ? 'border-teal bg-teal/10 text-navy font-medium'
                                  : 'border-gray-100 bg-slate text-navy/70 hover:border-gray-200 cursor-pointer')
                              }
                            >
                              <span className="font-bold mr-2" style={{ color: COURSE_COLOR }}>
                                {['A', 'B', 'C', 'D'][oi]}.
                              </span>
                              {opt.text}
                            </button>
                          )
                        })}

                        {/* Popup when they click the correct answer on a restricted question */}
                        {showWrongPrompt === qi && (
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-4 bg-navy text-white rounded-xl px-5 py-4 shadow-xl text-sm text-center z-10 animate-fadeIn">
                            <p className="font-semibold">For the purpose of this demo, please click on a wrong answer</p>
                            <p className="text-white/60 text-xs mt-1">We want to show you how the review system works when a learner makes a mistake.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </GuidedRow>
                )
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button onClick={() => { setPhase('content'); window.scrollTo(0, 0) }} className="btn-ghost text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to Lesson
              </button>
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers
              </button>
            </div>
          </div>
        )}

        {/* ===== RESULT PHASE ===== */}
        {phase === 'result' && (
          <div>
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">Quiz Results</p>
                  <p>After submitting, the learner sees their score immediately. They need <strong>60% or more</strong> to pass the lesson.</p>
                  <p className="mt-2">If they do not pass, they can review the lesson and try again. If they pass, they move on to the next lesson.</p>
                  <p className="mt-2">Every lesson across all packages works this way — building knowledge step by step.</p>
                </div>
              }
              annotationColor="navy"
              annotationLabel="Results"
            >
              <div className={'rounded-2xl p-8 mb-2 text-center ' + (passed ? 'bg-teal/10 border border-teal/20' : 'bg-red-50 border border-red-100')}>
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
                    ? 'The learner passes and can move on to the next lesson.'
                    : 'The learner needs ' + passThreshold + ' or more to pass. They would review the lesson and try again.'}
                </p>
              </div>
            </GuidedRow>

            {/* Answer review */}
            <div className="space-y-4 mb-8">
              {QUESTIONS.map((q, qi) => {
                const pickedIdx = selected[qi]
                const isCorrect = q.options[pickedIdx]?.isCorrect

                return (
                  <GuidedRow
                    key={qi}
                    annotation={
                      qi === 0 ? (
                        <div>
                          <p className="font-bold text-navy mb-2">How Wrong Answers Work</p>
                          <p>When a learner gets an answer wrong, we show them:</p>
                          <ul className="mt-2 space-y-1 text-xs">
                            <li className="flex gap-2"><span className="text-red-500 font-bold flex-shrink-0">✗</span><span>Their wrong answer (crossed out in red)</span></li>
                            <li className="flex gap-2"><span className="text-green-500 font-bold flex-shrink-0">✓</span><span>The correct answer (highlighted in green)</span></li>
                            <li className="flex gap-2"><span className="text-amber-500 font-bold flex-shrink-0">!</span><span>An explanation of <strong>why</strong> the correct answer is right</span></li>
                          </ul>
                          <p className="mt-2">This is where the real reinforcement happens. They do not just learn the right answer — they understand <strong>why</strong>.</p>
                        </div>
                      ) : qi === 1 ? (
                        <div>
                          <p className="font-bold text-navy mb-2">Consistent Reinforcement</p>
                          <p>Every question follows the same pattern. The learner always walks away understanding <strong>what they got wrong and why the correct answer matters</strong>.</p>
                          <p className="mt-2">This is not just a quiz — it is a learning tool.</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-bold text-navy mb-2">{isCorrect ? 'Correct Answers Too' : 'Every Answer Explained'}</p>
                          <p>{isCorrect
                            ? 'When a learner gets an answer right, we still show them an explanation to reinforce why their choice was correct.'
                            : 'Whether right or wrong, every answer gets a full explanation. Learning happens either way.'}</p>
                        </div>
                      )
                    }
                    annotationColor={isCorrect ? 'teal' : 'red'}
                    annotationKey={'result-' + qi}
                    annotationLabel="Review System"
                  >
                    <div className={'rounded-2xl border overflow-hidden ' + (isCorrect ? 'border-teal/30' : 'border-red-200')}>
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

                      {q.explanation && (
                        <div className={'px-5 py-3 border-t text-sm leading-relaxed ' + (isCorrect ? 'bg-teal/5 border-teal/10 text-teal' : 'bg-amber-50 border-amber-100 text-amber-800')}>
                          <span className="font-semibold">{isCorrect ? 'Well done! ' : 'Explanation: '}</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  </GuidedRow>
                )
              })}
            </div>

            {/* Two outcomes explanation */}
            <GuidedRow
              annotation={
                <div>
                  <p className="font-bold text-navy mb-2">Two Outcomes</p>
                  <p>Depending on their score, the learner either:</p>
                  <ul className="mt-2 space-y-2 text-xs">
                    <li><span className="font-bold text-red-500">Below 60%:</span> Reviews the lesson and retakes the quiz until they pass</li>
                    <li><span className="font-bold text-teal">60% or above:</span> Passes and progresses to the next lesson in the course</li>
                  </ul>
                  <p className="mt-2">Progress is tracked on the family dashboard so parents can see exactly where their children are in each course.</p>
                </div>
              }
              annotationColor="navy"
              annotationLabel="Outcomes"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-5 text-center">
                    <div className="text-3xl mb-2">{'\u{1F4AA}'}</div>
                    <p className="font-bold text-navy text-sm mb-1">Below 60%</p>
                    <p className="text-navy/60 text-xs">Review the lesson and try the quiz again. The content is always available to re-read.</p>
                  </div>
                  <div className="rounded-xl border border-teal/30 bg-teal/5 p-5 text-center">
                    <div className="text-3xl mb-2">{'\u{1F389}'}</div>
                    <p className="font-bold text-navy text-sm mb-1">60% or Above</p>
                    <p className="text-navy/60 text-xs">Lesson passed! Progress is saved and the next lesson unlocks.</p>
                    <p className="text-navy/50 text-xs mt-1">All courses and lessons will remain accessible to the user in the future.</p>
                  </div>
                </div>
              </div>
            </GuidedRow>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1B3358] rounded-2xl p-8 md:p-10 text-center mb-6">
              <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
                You just experienced a real lesson.
              </h2>
              <p className="text-white/60 text-base mb-2">
                This is one lesson from one course in one package.
              </p>
              <p className="text-white/80 text-lg font-semibold mb-6">
                The full library has <span className="text-teal">7 packages</span>, <span className="text-teal">38 courses</span>, and <span className="text-teal">146 lessons</span> — each with quizzes and real-world safety education. Selected packages include original music in every lesson.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-lg mx-auto">
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-xl mb-1">{'\uD83C\uDF31'}</div>
                  <div className="text-white font-semibold text-xs">Growing Minds</div>
                  <div className="text-white/50 text-[10px]">Ages 4-11</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 ring-2 ring-teal/50">
                  <div className="text-xl mb-1">{'\uD83E\uDD77'}</div>
                  <div className="text-white font-semibold text-xs">Street Smart</div>
                  <div className="text-white/50 text-[10px]">Ages 12-17</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-xl mb-1">{'\uD83D\uDC90'}</div>
                  <div className="text-white font-semibold text-xs">Aging Wisdom</div>
                  <div className="text-white/50 text-[10px]">Ages 60+</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-xl mb-1">{'\u2764\uFE0F'}</div>
                  <div className="text-white font-semibold text-xs">Family Anchor</div>
                  <div className="text-white/50 text-[10px]">Parents</div>
                </div>
              </div>

              <Link href="/packages" className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-8 py-4 rounded-xl hover:bg-teal2 transition-all duration-200 text-lg">
                View All Packages
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>

              <p className="text-white/40 text-xs mt-4">One-time payment &middot; No subscription &middot; Secure checkout via Stripe</p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setPhase('content')
                  setSelected({})
                  setSubmitted(false)
                  window.scrollTo(0, 0)
                }}
                className="btn-ghost"
              >
                Try the Lesson Again
              </button>
              <Link href="/packages" className="btn-primary text-center">
                Browse Packages
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
