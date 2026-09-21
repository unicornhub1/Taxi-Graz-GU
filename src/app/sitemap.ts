import type { MetadataRoute } from 'next'
import client from '@tina/__generated__/client'
import { listOrte } from '@/lib/orte-data'

// ISR: Inhalte zur Laufzeit aus Tina Cloud, Cache alle 60 s bzw. per /api/revalidate (Tina-Webhook).
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data }, orte] = await Promise.all([client.queries.settings({ relativePath: 'site.json' }), listOrte()])
  const baseUrl = data.settings.seo.url
  const now = new Date()

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/kontakt`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/einsatzgebiete`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...orte.map((o) => ({ url: `${baseUrl}/${o.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
