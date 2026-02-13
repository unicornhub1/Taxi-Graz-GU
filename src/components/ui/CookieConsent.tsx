'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type ConsentCategories = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  external: boolean
}

type ConsentContextType = {
  consent: ConsentCategories | null
  hasConsented: boolean
  showBanner: boolean
  acceptAll: () => void
  rejectAll: () => void
  acceptSelected: (categories: Partial<ConsentCategories>) => void
  openSettings: () => void
}

const CONSENT_KEY = 'cookie-consent'
const CONSENT_VERSION = '1'

const defaultConsent: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  external: false,
}

const ConsentContext = createContext<ConsentContextType>({
  consent: null,
  hasConsented: false,
  showBanner: false,
  acceptAll: () => {},
  rejectAll: () => {},
  acceptSelected: () => {},
  openSettings: () => {},
})

export function useConsent() {
  return useContext(ConsentContext)
}

export function hasExternalConsent(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return false
    const parsed = JSON.parse(stored)
    return parsed.version === CONSENT_VERSION && parsed.categories?.external === true
  } catch {
    return false
  }
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentCategories | null>(null)
  const [hasConsented, setHasConsented] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.categories)
          setHasConsented(true)
          return
        }
      }
    } catch {}
    // Show banner after a short delay for better UX
    const timer = setTimeout(() => setShowBanner(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const saveConsent = useCallback((categories: ConsentCategories) => {
    const data = { version: CONSENT_VERSION, categories, timestamp: Date.now() }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data))
    setConsent(categories)
    setHasConsented(true)
    setShowBanner(false)
    setShowDetails(false)
  }, [])

  const acceptAll = useCallback(() => {
    saveConsent({ necessary: true, analytics: true, marketing: true, external: true })
  }, [saveConsent])

  const rejectAll = useCallback(() => {
    saveConsent({ ...defaultConsent })
  }, [saveConsent])

  const acceptSelected = useCallback(
    (categories: Partial<ConsentCategories>) => {
      saveConsent({ ...defaultConsent, ...categories, necessary: true })
    },
    [saveConsent]
  )

  const openSettings = useCallback(() => {
    setShowBanner(true)
    setShowDetails(true)
  }, [])

  return (
    <ConsentContext.Provider
      value={{ consent, hasConsented, showBanner, acceptAll, rejectAll, acceptSelected, openSettings }}
    >
      {children}
      <CookieBanner
        show={showBanner}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onAcceptSelected={acceptSelected}
      />
    </ConsentContext.Provider>
  )
}

// Category toggle component
function CategoryToggle({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <label className="flex items-start gap-4 py-3 cursor-pointer">
      <div className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="h-6 w-11 rounded-full bg-white/10 peer-checked:bg-[var(--color-gold)] transition-colors peer-disabled:opacity-50" />
        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">
          {label}
          {disabled && (
            <span className="ml-2 text-xs font-normal text-white/40">Immer aktiv</span>
          )}
        </p>
        <p className="mt-0.5 text-xs text-white/50 leading-relaxed">{description}</p>
      </div>
    </label>
  )
}

function CookieBanner({
  show,
  showDetails,
  setShowDetails,
  onAcceptAll,
  onRejectAll,
  onAcceptSelected,
}: {
  show: boolean
  showDetails: boolean
  setShowDetails: (v: boolean) => void
  onAcceptAll: () => void
  onRejectAll: () => void
  onAcceptSelected: (categories: Partial<ConsentCategories>) => void
}) {
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [external, setExternal] = useState(false)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-lg rounded-2xl border border-white/10 bg-[var(--color-gray-900)] p-6 shadow-2xl shadow-black/40 sm:inset-x-auto sm:right-6 sm:left-auto"
        >
          {/* Main view */}
          {!showDetails ? (
            <div>
              <p className="text-sm font-semibold text-white">Wir respektieren Ihre Privatsphäre</p>
              <p className="mt-2 text-xs leading-relaxed text-white/50">
                Wir verwenden Cookies und externe Dienste (z.B. Google Maps) um Ihnen die bestmögliche
                Erfahrung zu bieten.{' '}
                <Link href="/datenschutz" className="text-[var(--color-gold)] hover:underline">
                  Datenschutzerklärung
                </Link>
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={onAcceptAll}
                  className="w-full rounded-full bg-[var(--color-gold)] py-3 text-sm font-bold text-[var(--color-black)] transition-all hover:bg-[var(--color-gold-dark)] cursor-pointer"
                >
                  Alle akzeptieren
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={onRejectAll}
                    className="flex-1 rounded-full border border-white/10 py-3 text-sm font-semibold text-white transition-all hover:bg-white/5 cursor-pointer"
                  >
                    Nur notwendige
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex-1 rounded-full border border-white/10 py-3 text-sm font-semibold text-white transition-all hover:bg-white/5 cursor-pointer"
                  >
                    Einstellungen
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-white">Cookie-Einstellungen</p>
              <p className="mt-1 text-xs text-white/50">
                Wählen Sie aus, welche Kategorien Sie erlauben möchten.
              </p>

              <div className="mt-4 divide-y divide-white/[0.06]">
                <CategoryToggle
                  label="Notwendig"
                  description="Grundlegende Funktionen der Website. Kann nicht deaktiviert werden."
                  checked={true}
                  onChange={() => {}}
                  disabled
                />
                <CategoryToggle
                  label="Analyse"
                  description="Hilft uns zu verstehen, wie Besucher die Website nutzen."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CategoryToggle
                  label="Marketing"
                  description="Wird für personalisierte Werbung verwendet."
                  checked={marketing}
                  onChange={setMarketing}
                />
                <CategoryToggle
                  label="Externe Dienste"
                  description="Google Maps, eingebettete Videos und andere externe Inhalte."
                  checked={external}
                  onChange={setExternal}
                />
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 rounded-full border border-white/10 py-3 text-sm font-semibold text-white transition-all hover:bg-white/5 cursor-pointer"
                >
                  Zurück
                </button>
                <button
                  onClick={() => onAcceptSelected({ analytics, marketing, external })}
                  className="flex-1 rounded-full bg-[var(--color-gold)] py-3 text-sm font-bold text-[var(--color-black)] transition-all hover:bg-[var(--color-gold-dark)] cursor-pointer"
                >
                  Auswahl speichern
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
