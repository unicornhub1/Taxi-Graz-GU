import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import client from '@tina/__generated__/client'
import { JsonLd } from '@/components/JsonLd'
import { createMetadata } from '@/lib/metadata'
import { listOrte, loadOrt } from '@/lib/orte-data'
import { breadcrumbSchema, faqPageSchema, ortServiceSchema } from '@/lib/schema'
import { compact, interpolate } from '@/lib/site'
import { OrtClient } from './OrtClient'

// Bekannte Orte werden vorab erzeugt; neue Orte aus dem CMS beim ersten Aufruf (ISR, revalidate aus dem Layout).
export const dynamicParams = true

export async function generateStaticParams() {
  return (await listOrte()).map((o) => ({ slug: o.slug }))
}

type Props = { params: Promise<{ slug: string }> }

const loadSettings = () => client.queries.settings({ relativePath: 'site.json' })

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [ort, settings] = await Promise.all([loadOrt(slug), loadSettings()])
  if (!ort) return {}
  const s = settings.data.settings
  return createMetadata(s, {
    title: ort.data.ort.seo.title,
    description: interpolate(ort.data.ort.seo.description, s),
    path: `/${slug}`,
  })
}

export default async function OrtPage({ params }: Props) {
  const { slug } = await params
  const [ort, home, settings] = await Promise.all([
    loadOrt(slug),
    client.queries.home({ relativePath: 'home.json' }),
    loadSettings(),
  ])
  if (!ort) notFound()
  const s = settings.data.settings
  const o = ort.data.ort

  return (
    <>
      <JsonLd data={ortServiceSchema(s, { name: o.name, slug })} />
      <JsonLd data={faqPageSchema(compact(o.faq.items), s)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: s.areaLabels.breadcrumbHome, path: '' },
            { name: s.areaLabels.breadcrumbHub, path: '/einsatzgebiete' },
            { name: o.name, path: `/${slug}` },
          ],
          s
        )}
      />
      <OrtClient data={ort.data} query={ort.query} variables={ort.variables} home={home.data.home} />
    </>
  )
}
