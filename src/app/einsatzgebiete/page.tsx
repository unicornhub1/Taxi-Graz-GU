import type { Metadata } from 'next'
import client from '@tina/__generated__/client'
import { JsonLd } from '@/components/JsonLd'
import { createMetadata } from '@/lib/metadata'
import { listOrte } from '@/lib/orte-data'
import { breadcrumbSchema } from '@/lib/schema'
import { interpolate } from '@/lib/site'
import { EinsatzgebieteClient } from './EinsatzgebieteClient'

const RELATIVE_PATH = 'einsatzgebiete.json'
const loadSettings = () => client.queries.settings({ relativePath: 'site.json' })

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([loadSettings(), client.queries.einsatzgebiete({ relativePath: RELATIVE_PATH })])
  const s = settings.data.settings
  return createMetadata(s, {
    title: page.data.einsatzgebiete.seo.title,
    description: interpolate(page.data.einsatzgebiete.seo.description, s),
    path: '/einsatzgebiete',
  })
}

export default async function EinsatzgebietePage() {
  const [page, orte, home, settings] = await Promise.all([
    client.queries.einsatzgebiete({ relativePath: RELATIVE_PATH }),
    listOrte(),
    client.queries.home({ relativePath: 'home.json' }),
    loadSettings(),
  ])
  const s = settings.data.settings
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: s.areaLabels.breadcrumbHome, path: '' },
            { name: s.areaLabels.breadcrumbHub, path: '/einsatzgebiete' },
          ],
          s
        )}
      />
      <EinsatzgebieteClient data={page.data} query={page.query} variables={page.variables} orte={orte} cta={home.data.home.cta} />
    </>
  )
}
