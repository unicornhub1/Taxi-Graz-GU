import { type Metadata } from 'next'
import { SITE_CONFIG } from './constants'

export function createMetadata({
  title,
  description,
  path = '',
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const fullTitle = path === '' ? `${title} | ${SITE_CONFIG.name}` : `${title} | ${SITE_CONFIG.name}`
  const url = `${SITE_CONFIG.url}${path}`

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: 'de_AT',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}
