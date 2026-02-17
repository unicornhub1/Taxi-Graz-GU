import type { Metadata } from 'next'
import { dmSerifDisplay, outfit } from '@/lib/fonts'
import { SITE_CONFIG } from '@/lib/constants'
import { ContactBar } from '@/components/sections/ContactBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/sections/FloatingContact'
import { BackToTop } from '@/components/ui/BackToTop'
import { CookieConsentProvider } from '@/components/ui/CookieConsent'
import { StructuredData } from '@/components/sections/StructuredData'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `Taxi Graz | ${SITE_CONFIG.name} - 24/7 Taxiservice, Flughafentransfer & Stretchlimousinen`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    'Taxi Graz GU – Ihr 24/7 Taxiservice in Graz & Umgebung. Flughafentransfer, Stretchlimousinen, Botenfahrten. ☎ +43 660 1083003. 4.9★ Google (673 Bewertungen). Jetzt anrufen!',
  keywords: [
    'Taxi Graz',
    'Taxi Graz GU',
    'Taxi Graz Flughafen',
    'Taxi Graz Flughafen Preis',
    'Flughafentransfer Graz',
    'Taxi bestellen Graz',
    'Taxi Graz bestellen',
    'Stretchlimousine Graz',
    'Limousine mieten Graz',
    'Taxi Graz 24h',
    'Taxi Graz Nummer',
    'Taxi Graz Telefonnummer',
    'Taxi Graz Preise',
    'Taxi Graz Kosten',
    'Taxiunternehmen Graz',
    'Taxi Graz Umgebung',
    'Taxi Graz Andritz',
    'Taxi Graz Eggenberg',
    'Taxi Graz Nord',
    'Taxi Graz Don Bosco',
    'Taxi Feldkirchen bei Graz',
    'Taxi Kalsdorf bei Graz',
    'Taxi Seiersberg',
    'Taxi Gratkorn',
    'Botenfahrten Graz',
    'Günstigstes Taxi Graz',
  ],
  openGraph: {
    title: `Taxi Graz | ${SITE_CONFIG.name} - 24/7 Taxiservice & Flughafentransfer`,
    description:
      'Taxi Graz GU – Ihr 24/7 Taxiservice in Graz & Umgebung. Flughafentransfer, Stretchlimousinen, Botenfahrten. 4.9★ bei 673 Google-Bewertungen.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'de_AT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Taxi Graz | ${SITE_CONFIG.name} - 24/7 Taxiservice`,
    description:
      'Taxi Graz GU – Ihr 24/7 Taxiservice in Graz & Umgebung. Flughafentransfer, Stretchlimousinen, Botenfahrten.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${dmSerifDisplay.variable} ${outfit.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-[var(--font-body)] antialiased bg-[var(--color-cream)]">
        <CookieConsentProvider>
          <ContactBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
          <BackToTop />
        </CookieConsentProvider>
      </body>
    </html>
  )
}
