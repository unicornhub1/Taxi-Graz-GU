import client from '@tina/__generated__/client'
import { isOrtSlug, type OrtSummary, type Region } from './ort'
import { compact } from './site'

/** Alle Ortsseiten (Footer, Übersicht, Sitemap, Schema) – sortiert nach Name. */
export async function listOrte(): Promise<OrtSummary[]> {
  const res = await client.queries.ortConnection({ first: 100 })
  return compact(res.data.ortConnection.edges)
    .flatMap(({ node }) => {
      if (!node) return []
      const fact = compact(node.local.facts)[0]
      return [{
        slug: node._sys.filename,
        name: node.name,
        region: node.region as Region,
        fact: fact ? `${fact.label}: ${fact.value}` : undefined,
      }]
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'de'))
}

/**
 * Lädt eine Ortsseite. null bei ungültigem oder unbekanntem Slug (→ 404).
 * Fehler von Tina Cloud werden weitergereicht, damit Vercel die zuletzt gecachte Seite behält.
 */
export async function loadOrt(slug: string) {
  if (!isOrtSlug(slug)) return null
  const orte = await listOrte()
  if (!orte.some((o) => o.slug === slug)) return null
  return client.queries.ort({ relativePath: `${slug}.json` })
}
