'use client'

import { useConsent } from './CookieConsent'
import { MapPin } from 'lucide-react'

/**
 * Wraps external content (iframes, embeds) and only renders when
 * the user has given consent for external services.
 * Shows a placeholder with an "accept" button otherwise.
 */
export function ConsentGate({
  children,
  fallbackTitle = 'Externer Inhalt',
  fallbackDescription = 'Dieser Inhalt wird von einem externen Dienst bereitgestellt. Bitte akzeptieren Sie externe Cookies, um ihn anzuzeigen.',
}: {
  children: React.ReactNode
  fallbackTitle?: string
  fallbackDescription?: string
}) {
  const { consent, openSettings } = useConsent()

  if (consent?.external) {
    return <>{children}</>
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[var(--color-gray-100)] p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-gray-200)]">
        <MapPin className="h-6 w-6 text-[var(--color-gray-400)]" />
      </div>
      <div>
        <p className="font-semibold text-[var(--color-black)]">{fallbackTitle}</p>
        <p className="mt-1 max-w-sm text-sm text-[var(--color-gray-500)]">{fallbackDescription}</p>
      </div>
      <button
        onClick={openSettings}
        className="rounded-full bg-[var(--color-gold)] px-6 py-2.5 text-sm font-bold text-[var(--color-black)] transition-all hover:bg-[var(--color-gold-dark)] cursor-pointer"
      >
        Cookie-Einstellungen öffnen
      </button>
    </div>
  )
}
