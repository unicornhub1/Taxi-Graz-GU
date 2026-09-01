import { type Metadata } from 'next'
import type { SiteSettings } from './site'

export function createMetadata(
  settings: SiteSettings,
  { title, description, path = '', noIndex = false }: { title: string; description: string; path?: string; noIndex?: boolean }
): Metadata {
  const fullTitle = `${title} | ${settings.seo.siteName}`
  const url = `${settings.seo.url}${path}`

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: { title: fullTitle, description, url, siteName: settings.seo.siteName, type: 'website', locale: 'de_AT' },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    alternates: { canonical: url },
  }
}
