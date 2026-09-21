'use client'

import { useEffect } from 'react'
import { useTina } from 'tinacms/dist/react'
import type { SettingsQuery } from '@tina/__generated__/types'
import { SettingsProvider } from '@/components/SettingsProvider'
import { OrteProvider } from '@/components/OrteProvider'
import type { OrtSummary } from '@/lib/ort'
import { accentCssVars } from '@/lib/color'
import { ContactBar } from '@/components/sections/ContactBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/sections/FloatingContact'
import { BackToTop } from '@/components/ui/BackToTop'
import { CookieConsentProvider } from '@/components/ui/CookieConsent'

export interface SiteShellProps {
  settings: { data: SettingsQuery; query: string; variables: { relativePath: string } }
  orte: OrtSummary[]
  children: React.ReactNode
}

export function SiteShell({ settings, orte, children }: SiteShellProps) {
  const { data } = useTina(settings)
  const site = data.settings

  // SSR setzt die Variablen bereits inline auf <html>; hier nur die Live-Vorschau im Visual Editing.
  useEffect(() => {
    const vars = accentCssVars(site.design.accentColor)
    for (const [name, value] of Object.entries(vars)) {
      document.documentElement.style.setProperty(name, value)
    }
  }, [site.design.accentColor])

  return (
    <SettingsProvider settings={site}>
      <OrteProvider orte={orte}>
        <CookieConsentProvider>
          <ContactBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
          <BackToTop />
        </CookieConsentProvider>
      </OrteProvider>
    </SettingsProvider>
  )
}
