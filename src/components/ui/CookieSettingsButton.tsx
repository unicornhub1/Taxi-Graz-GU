'use client'

import { useConsent } from './CookieConsent'

export function CookieSettingsButton() {
  const { openSettings } = useConsent()

  return (
    <button
      onClick={openSettings}
      className="text-sm text-[var(--color-gray-300)] transition-colors hover:text-[var(--color-gold)] cursor-pointer"
    >
      Cookie-Einstellungen
    </button>
  )
}
