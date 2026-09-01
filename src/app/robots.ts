import type { MetadataRoute } from 'next'
import client from '@tina/__generated__/client'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { data } = await client.queries.settings({ relativePath: 'site.json' })
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] }],
    sitemap: `${data.settings.seo.url}/sitemap.xml`,
  }
}
