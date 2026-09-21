import { JsonLd } from '@/components/JsonLd'
import { taxiServiceSchema } from '@/lib/schema'
import type { SiteSettings } from '@/lib/site'

export interface StructuredDataProps {
  settings: SiteSettings
  services: { title: string; description: string }[]
  orte: { name: string }[]
}

/** Globales JSON-LD (jede Seite): nur das Unternehmen. FAQ und Breadcrumbs gibt jede Seite selbst aus. */
export function StructuredData({ settings, services, orte }: StructuredDataProps) {
  return <JsonLd data={taxiServiceSchema(settings, services, orte)} />
}
