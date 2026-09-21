import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { ortSlug, REGIONS } from '@/lib/ort'
import { interpolate, type SiteSettings } from '@/lib/site'

// Inhaltsregeln der Ortsseiten (Plan „Inhaltsregeln“): prüft die JSON-Dateien direkt.
const DIR = 'content/orte'
const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith('.json')) : []
const settings = JSON.parse(readFileSync('content/settings/site.json', 'utf8')) as SiteSettings
const home = JSON.parse(readFileSync('content/pages/home.json', 'utf8'))
const regions: string[] = REGIONS.map((r) => r.value)
const words = (text: string) => text.split(/\s+/).filter(Boolean).length
const homeRefs: string[] = home.serviceAreas.groups.flatMap((g: { areas: { ort?: string }[] }) =>
  g.areas.map((a) => a.ort).filter(Boolean)
)

describe('Startseite: Gebietsliste', () => {
  it('alle verknüpften Ortsseiten existieren', () => {
    for (const ref of homeRefs) expect(existsSync(ref), ref).toBe(true)
  })
})

describe.skipIf(files.length === 0)('Ortsseiten-Inhalte', () => {
  describe.each(files)('%s', (file) => {
    const ort = JSON.parse(readFileSync(`${DIR}/${file}`, 'utf8'))
    const all = JSON.stringify(ort)

    it('Dateiname entspricht dem Ortsnamen', () => expect(file).toBe(`${ortSlug(ort.name)}.json`))
    it('Region ist gültig', () => expect(regions).toContain(ort.region))
    it('Title ≤ 40 Zeichen', () => expect(ort.seo.title.length).toBeLessThanOrEqual(40))
    it('Meta-Description 100–140 Zeichen (Platzhalter aufgelöst)', () => {
      const len = interpolate(ort.seo.description, settings).length
      expect(len).toBeGreaterThanOrEqual(100)
      expect(len).toBeLessThanOrEqual(140)
    })
    it('lokaler Text 250–500 Wörter, mit Zwischenüberschrift und internem Link', () => {
      const n = words(ort.local.body)
      expect(n).toBeGreaterThanOrEqual(250)
      expect(n).toBeLessThanOrEqual(500)
      expect(ort.local.body).toMatch(/^### /m)
      expect(ort.local.body).toMatch(/\]\(\/[a-z-]+\)/)
    })
    it('genau 3 Fakten-Kacheln', () => expect(ort.local.facts).toHaveLength(3))
    it('Bestell-Sektion: Überschrift mit Taxi + Ort, genau 3 Schritte', () => {
      expect(ort.order.heading).toMatch(/Taxi/)
      expect(ort.order.heading).toContain(ort.name.split(' ')[0])
      expect(ort.order.steps).toHaveLength(3)
    })
    it('Einleitung zu den Nachbarorten vorhanden', () => expect(ort.nearbyIntro?.length ?? 0).toBeGreaterThan(40))
    it('3–5 FAQ', () => {
      expect(ort.faq.items.length).toBeGreaterThanOrEqual(3)
      expect(ort.faq.items.length).toBeLessThanOrEqual(5)
    })
    it('2–4 Nachbarorte, alle vorhanden, nicht der Ort selbst', () => {
      expect(ort.nearby.length).toBeGreaterThanOrEqual(2)
      expect(ort.nearby.length).toBeLessThanOrEqual(4)
      for (const { ort: ref } of ort.nearby) {
        expect(existsSync(ref), ref).toBe(true)
        expect(ref).not.toBe(`${DIR}/${file}`)
      }
    })
    it('ist von der Startseite verlinkt', () => expect(homeRefs).toContain(`${DIR}/${file}`))
    it('keine fremde Marke „GU-Taxi“', () => expect(all).not.toMatch(/GU-Taxi/i))
    it('keine Platzhalter „…“ im Text', () => expect(all).not.toContain('…'))
  })
})
