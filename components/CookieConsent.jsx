'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'hse_cookie_consent'

function getConsent() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch { return null }
}

function setConsent(prefs) {
  if (typeof window === 'undefined') return
  const record = {
    ...prefs,
    timestamp: new Date().toISOString(),
    version: '1.0'
  }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const existing = getConsent()
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleAcceptAll() {
    setConsent({ essential: true, analytics: true, marketing: true })
    setVisible(false)
  }

  function handleRejectAll() {
    setConsent({ essential: true, analytics: false, marketing: false })
    setVisible(false)
  }

  function handleSavePreferences() {
    setConsent({ essential: true, analytics, marketing })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[9998]" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6" role="dialog" aria-label="Cookie consent" aria-modal="true">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl" aria-hidden="true">🍪</span>
              <div>
                <h2 className="font-serif text-xl text-navy">We Value Your Privacy</h2>
                <p className="text-navy/60 text-sm mt-1 leading-relaxed">We use essential cookies to make our site work. We&apos;d also like to set optional cookies to help us improve your experience. We won&apos;t set non-essential cookies unless you enable them. The site works fully without them.</p>
              </div>
            </div>
            <p className="text-navy/50 text-xs ml-9">Read our full <Link href="/cookies" className="text-teal hover:underline">Cookie Policy</Link> and <Link href="/privacy" className="text-teal hover:underline">Privacy Policy</Link>.</p>
          </div>

          {/* Expandable details */}
          {showDetails && (
            <div className="px-6 pb-4 space-y-3">
              <div className="bg-slate rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-navy text-sm">Strictly Necessary</span>
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">Always on</span>
                </div>
                <p className="text-navy/60 text-xs">Required for authentication, payments, and storing your cookie preferences. Cannot be disabled.</p>
              </div>

              <div className="bg-slate rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-navy text-sm">Analytics</span>
                  <button
                    onClick={() => setAnalytics(!analytics)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${analytics ? 'bg-teal' : 'bg-gray-300'}`}
                    role="switch"
                    aria-checked={analytics}
                    aria-label="Toggle analytics cookies"
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${analytics ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <p className="text-navy/60 text-xs">Help us understand how visitors interact with our site. Currently none in use — this is here for future transparency.</p>
              </div>

              <div className="bg-slate rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-navy text-sm">Marketing</span>
                  <button
                    onClick={() => setMarketing(!marketing)}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${marketing ? 'bg-teal' : 'bg-gray-300'}`}
                    role="switch"
                    aria-checked={marketing}
                    aria-label="Toggle marketing cookies"
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${marketing ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                <p className="text-navy/60 text-xs">We do not currently use marketing cookies. This category is included for transparency and future-proofing.</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="p-6 pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleRejectAll}
              className="flex-1 px-5 py-2.5 rounded-xl border border-navy/20 text-navy text-sm font-medium hover:bg-navy/5 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 px-5 py-2.5 rounded-xl border border-navy/20 text-navy text-sm font-medium hover:bg-navy/5 transition-colors"
            >
              {showDetails ? 'Save Preferences' : 'Customise'}
            </button>
            <button
              onClick={showDetails ? handleSavePreferences : handleAcceptAll}
              className="flex-1 px-5 py-2.5 rounded-xl bg-teal text-white text-sm font-semibold hover:bg-teal2 transition-colors"
            >
              {showDetails ? 'Save Preferences' : 'Accept All'}
            </button>
          </div>

          {showDetails && (
            <div className="px-6 pb-4 flex justify-center">
              <button
                onClick={handleSavePreferences}
                className="text-xs text-navy/50 hover:text-navy transition-colors underline"
              >
                Save my preferences and close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

/**
 * Utility: open the cookie settings banner from anywhere (e.g., footer link).
 * Call this from a client component to re-show the banner.
 */
export function resetCookieConsent() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CONSENT_KEY)
  window.dispatchEvent(new Event('cookie-consent-reset'))
}
