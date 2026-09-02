import type { MetadataRoute } from 'next'
import client from '@tina/__generated__/client'

// ISR: Inhalte zur Laufzeit aus Tina Cloud, Cache alle 60 s bzw. per /api/revalidate (Tina-Webhook).
export const revalidate = 60

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { data } = await client.queries.settings({ relativePath: 'site.json' })
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] }],
    sitemap: `${data.settings.seo.url}/sitemap.xml`,
  }
}
