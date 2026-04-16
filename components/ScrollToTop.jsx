'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * ScrollToTop
 *
 * Next.js App Router preserves scroll position across soft navigations
 * whenever the layout renders new content in-place. That is occasionally
 * what you want, but across the HomeSafeEducation site we want every
 * route to always start at the top on both desktop and mobile.
 *
 * This component listens for pathname changes (and query-string changes,
 * so filter changes on e.g. /library also reset) and snaps scroll back
 * to 0,0. `behavior: 'instant'` avoids the slow smooth-scroll jank that
 * can feel worse than the bug it's fixing.
 *
 * It also resets the documentElement and body scroll directly, because
 * some pages apply custom scroll containers and `window.scrollTo` alone
 * is not always enough on iOS Safari.
 */
export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Disable the browser's own scroll-restoration so we stay in control.
    if ('scrollRestoration' in window.history) {
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
    if (document.documentElement) document.documentElement.scrollTop = 0
    if (document.body) document.body.scrollTop = 0
  }, [pathname, searchParams])

  return null
}
