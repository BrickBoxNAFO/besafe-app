'use client'

export default function CookieSettingsButton() {
  const handleClick = () => {
    // Trigger cookie consent banner re-display
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('show-cookie-settings')
      window.dispatchEvent(event)
    }
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
