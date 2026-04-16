'use client'

import { useEffect, useLayoutEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * ScrollToTop
 *
 * Next.js App Router preserves scroll position across soft navigations
 * whenever the layout renders new content in-place. Mobile Safari adds
 * another layer: after tapping a link it sometimes restores the prior
 * scroll position of the DESTINATION URL from bfcache, meaning users
 * land "halfway down" the page.
 *
 * This component fixes both by:
 *   1. Disabling the browser's own scroll-restoration on mount.
 *   2. Running scrollTo(0, 0) on every pathname + query-string change.
 *   3. Using useLayoutEffect so the scroll reset happens before paint —
 *      users don't see a flash of the page at the wrong scroll offset.
 *   4. Belt-and-braces reset of documentElement and body scrollTop for
 *      iOS Safari / custom scroll containers.
 */

// useLayoutEffect warns on SSR. Use the effect hook that matches the env.
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useIsoLayoutEffect(() => {
    // Disable the browser's own scroll-restoration so we stay in control.
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // If the URL has a #hash, let the browser handle jumping to that anchor.
    if (typeof window !== 'undefined' && window.location.hash) {
      return
    }

    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    } catch {
      // Older browsers don't support behavior: 'instant'.
      window.scrollTo(0, 0)
    }

    // Belt-and-braces for iOS Safari / custom scroll containers.
    if (typeof document !== 'undefined') {
      if (document.documentElement) document.documentElement.scrollTop = 0
      if (document.body) document.body.scrollTop = 0
    }

    // iOS Safari bfcache: when the page is restored from bfcache the
    // pageshow event fires; if e.persisted is true the browser restored
    // scroll position from cache. Reset it again on the next frame.
    const onPageShow = (e) => {
      if (e.persisted) {
        requestAnimationFrame(() => {
          try {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          } catch {
            window.scrollTo(0, 0)
          }
          if (document.documentElement) document.documentElement.scrollTop = 0
          if (document.body) document.body.scrollTop = 0
        })
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('pageshow', onPageShow)
      return () => window.removeEventListener('pageshow', onPageShow)
    }
  }, [pathname, searchParams])

  return null
}
