'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Cloudflare Turnstile widget component.
 * Loads the Turnstile script once, renders the widget, and calls onVerify with the token.
 *
 * Props:
 *  - onVerify(token)  — called when challenge is solved
 *  - onExpire()       — called when token expires (optional)
 *  - className        — optional wrapper className
 */
export default function TurnstileWidget({ onVerify, onExpire, className = '' }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Load the Turnstile script once globally
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.getElementById('cf-turnstile-script')) {
      if (window.turnstile) setScriptLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = 'cf-turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.head.appendChild(script)
  }, [])

  // Render the widget once the script is ready
  useEffect(() => {
    if (!scriptLoaded || !window.turnstile || !containerRef.current) return
    // Don't render twice
    if (widgetIdRef.current !== null) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      callback: (token) => onVerify?.(token),
      'expired-callback': () => onExpire?.(),
      theme: 'light',
      size: 'invisible',
    })

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current) } catch {}
        widgetIdRef.current = null
      }
    }
  }, [scriptLoaded, onVerify, onExpire])

  const reset = useCallback(() => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [])

  return <div ref={containerRef} className={className} />
}
