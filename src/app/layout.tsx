import type { Metadata } from 'next'
import client from '@tina/__generated__/client'
import { dmSerifDisplay, outfit } from '@/lib/fonts'
import { accentCssVars } from '@/lib/color'
import { compact, interpolate } from '@/lib/site'
import { SiteShell } from '@/components/SiteShell'
import { StructuredData } from '@/components/sections/StructuredData'
import './globals.css'

const loadSettings = () => client.queries.settings({ relativePath: 'site.json' })
const loadHome = () => client.queries.home({ relativePath: 'home.json' })

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await loadSettings()
  const s = data.settings
  const description = interpolate(s.seo.description, s)
  return {
    metadataBase: new URL(s.seo.url),
    title: { default: s.seo.defaultTitle, template: `%s | ${s.seo.siteName}` },
    description,
    keywords: compact(s.seo.keywords),
    openGraph: {
      title: s.seo.defaultTitle,
      description,
      url: s.seo.url,
      siteName: s.seo.siteName,
      locale: 'de_AT',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: s.seo.defaultTitle, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
    },
    alternates: { canonical: s.seo.url },
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, home] = await Promise.all([loadSettings(), loadHome()])
  const site = settings.data.settings

  return (
    <html
      lang="de"
      className={`${dmSerifDisplay.variable} ${outfit.variable}`}
      style={accentCssVars(site.design.accentColor) as React.CSSProperties}
    >
      <head>
        <StructuredData
          settings={site}
          faq={compact(home.data.home.faq.items)}
          services={compact(home.data.home.services.items)}
        />
      </head>
      <body className="font-[var(--font-body)] antialiased bg-[var(--color-cream)]">
        <SiteShell settings={{ data: settings.data, query: settings.query, variables: settings.variables }}>
          {children}
        </SiteShell>
      </body>
    </html>
  )
}
