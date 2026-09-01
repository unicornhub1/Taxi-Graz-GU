import type { MetadataRoute } from 'next'
import client from '@tina/__generated__/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await client.queries.settings({ relativePath: 'site.json' })
  const baseUrl = data.settings.seo.url
  const now = new Date()

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/kontakt`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
