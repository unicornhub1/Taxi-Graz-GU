import type { Metadata } from 'next'
import client from '@tina/__generated__/client'
import { createMetadata } from '@/lib/metadata'
import { KontaktClient } from './KontaktClient'

const RELATIVE_PATH = 'kontakt.json'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([
    client.queries.settings({ relativePath: 'site.json' }),
    client.queries.kontakt({ relativePath: RELATIVE_PATH }),
  ])
  return createMetadata(settings.data.settings, {
    title: page.data.kontakt.seo.title,
    description: page.data.kontakt.seo.description,
    path: '/kontakt',
  })
}

export default async function KontaktPage() {
  const res = await client.queries.kontakt({ relativePath: RELATIVE_PATH })
  return <KontaktClient data={res.data} query={res.query} variables={res.variables} />
}
