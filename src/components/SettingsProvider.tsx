'use client'

import { createContext, useContext } from 'react'
import type { SiteSettings } from '@/lib/site'

const SettingsContext = createContext<SiteSettings | null>(null)

export function SettingsProvider({ settings, children }: { settings: SiteSettings; children: React.ReactNode }) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

/** Globale Einstellungen (Kontakt, Firma, Google, SEO, Design) – live im Visual Editing. */
export function useSettings(): SiteSettings {
  const settings = useContext(SettingsContext)
  if (!settings) throw new Error('useSettings() muss innerhalb von <SettingsProvider> verwendet werden')
  return settings
}
