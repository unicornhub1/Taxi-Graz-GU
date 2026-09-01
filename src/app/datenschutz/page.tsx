import type { Metadata } from 'next'
import client from '@tina/__generated__/client'
import { createMetadata } from '@/lib/metadata'
import { LegalClient } from '@/components/legal/LegalClient'

const RELATIVE_PATH = 'datenschutz.mdx'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([
    client.queries.settings({ relativePath: 'site.json' }),
    client.queries.legal({ relativePath: RELATIVE_PATH }),
  ])
  return createMetadata(settings.data.settings, {
    title: page.data.legal.title,
    description: page.data.legal.seoDescription,
    path: '/datenschutz',
    noIndex: true,
  })
}

export default async function DatenschutzPage() {
  const res = await client.queries.legal({ relativePath: RELATIVE_PATH })
  return <LegalClient data={res.data} query={res.query} variables={res.variables} />
}
