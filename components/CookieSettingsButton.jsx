'use client'

import { resetCookieConsent } from './CookieConsent'

export default function CookieSettingsButton() {
  function handleClick(e) {
    e.preventDefault()
    resetCookieConsent()
    window.location.reload()
  }

  return (
    <button
      onClick={handleClick}
      className="text-white/60 text-sm hover:text-white transition-colors text-left"
    >
      Cookie Settings
    </button>
  )
}
