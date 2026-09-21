# Ortsseiten – Umsetzungsplan

> **Für die Ausführung:** Umsetzung inline in der Claude-Sitzung (keine Subagenten, Felix-Vorgabe). Vorgehen nach superpowers:executing-plans, Task für Task mit Checkpoints. Schritte sind Checkboxen (`- [ ]`).

**Ziel:** 12 Ortsseiten unter `/taxi-<ort>` und die Übersicht `/einsatzgebiete` für taxigraz-gu.at, gepflegt im CMS, ins Design integriert und intern verlinkt, plus die Vorab-Fixes für Canonical und Label.

**Architektur:** Neue Tina-Collection `ort` (eine JSON-Datei pro Ort) und eine dynamische Route `src/app/[slug]/page.tsx`, die bestehende Sektionen der Startseite wiederverwendet und vier neue Bausteine ergänzt. Die Ortsliste lädt das Root-Layout einmal (`listOrte()`) und reicht sie an Footer und Schema weiter. Die strukturierten Daten werden reine Funktionen in `src/lib/schema.ts`, jede Seite gibt nur ihre eigenen aus.

**Tech-Stack:** Next.js 16.1 (App Router, ISR), React 19, TinaCMS 3.12 (Tina Cloud, Visual Editing), Tailwind 4, framer-motion, vitest 4.

**Spec:** `docs/superpowers/specs/2026-09-21-ortsseiten-design.md`

## Globale Vorgaben

- Repo: `/Users/felixzink/UnicornFactory/Kundenprojekte/Taxigraz Gu/taxi-graz-gu`, Arbeitsbranch `feat/ortsseiten`. **Deploy-Quelle ist `origin`** (unicornhub1/Taxi-Graz-GU), `vercel` ist ein Spiegel. Vor jedem Merge `git pull --ff-only origin main`, weil Tina Cloud Inhalts-Commits auf `main` schreibt.
- **Nichts pushen ohne Felix-OK.**
- URLs: `/taxi-<slug>` (Präfix `taxi-`, Umlaute ae/oe/ue, ß → ss), Übersicht `/einsatzgebiete`.
- Title-Feld höchstens 40 Zeichen (plus „ | Taxi Graz GU“ = höchstens 57). Meta-Description 100–140 Zeichen nach Auflösung der Platzhalter. Genau eine H1 pro Seite.
- Bestehende Sektionen: Markup, Klassen und framer-motion bleiben unverändert. Nur Prop-Typen werden gelockert.
- Jede sichtbare Beschriftung ist im CMS pflegbar. Ausnahmen: Verbindungswörter und das Anker-Präfix „Taxi “ vor Ortsnamen (`ortLinkLabel`).
- Die Übersicht zielt **nicht** auf „Taxi Graz“ oder „Taxi Graz Umgebung“ (Startseite Pos. 1,5–1,6).
- Nach Schema-Änderungen `tina/tina-lock.json` mitcommitten (Tina Cloud liest das Schema daraus).
- Commit-Messages enden mit:
  ```
  Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB
  ```
- Befehle aus dem Repo-Root. macOS/zsh: Globs quoten, kein `timeout`.

## Inhaltsregeln (gelten für jede Ortsseite)

Durchgesetzt vom Test `src/lib/__tests__/content-orte.test.ts` (Task 3):

1. **Unique Content:** kein Text, bei dem nur der Name getauscht wird. Jede Seite nennt die Lage relativ zu Graz, echte Entfernungen und Fahrzeiten (aus `docs/ortsseiten-distanzen.json`, Task 5), typische Fahrten von dort (Hauptbahnhof, Flughafen, Kliniken/LKH, Einkauf, Veranstaltungen) und 1–3 **überprüfbare** Orientierungspunkte (Ortsteile, Hauptstraßen, bekannte Orte, z. B. Schloss Eggenberg, Basilika Mariatrost). Keine erfundenen Firmen, Stammkunden, Zahlen oder Preise.
2. **Aussagen nur im Rahmen der Startseite:** 24/7 erreichbar, Vorbestellung per Telefon/WhatsApp, Kartenzahlung (Bankomat, Visa, Mastercard, kontaktlos), Festpreise für Flughafentransfers auf Anfrage, Stretchlimousinen, barrierefreie Fahrten, Steiermärkischer Taxitarif. Keine garantierten Anfahrtszeiten.
3. **Felder:**
   - `seo.title` höchstens 40 Zeichen, Keyword vorn (z. B. „Taxi Gratkorn – 24/7 & Flughafentransfer“).
   - `seo.description` 100–140 Zeichen, Keyword vorn, Nutzen, CTA, `{phone}` erlaubt.
   - `hero.headline` „Ihr Taxi in“ und `headlineHighlight` = Ortsname. Grazer Bezirke als „Graz-Andritz“ usw., Flughafen: „Ihr Taxi zum“ + „Flughafen Graz“.
   - `local.body` 300–500 Wörter (Test-Grenze 300–550), mindestens eine `### `-Zwischenüberschrift, mindestens ein interner Link (z. B. auf `/taxi-flughafen-graz` oder `/kontakt`).
   - `local.facts` genau 3 Kacheln.
   - `faq.items` 3–5 lokale Fragen.
   - `nearby` 2–4 Verweise laut Task 5.
4. **Fremdmarke:** Die Zeichenfolge „GU-Taxi“ kommt nirgends vor (offene Frage „GU-Taxi Gratkorn (das Original seit 2013)“).
5. **Ragnitz** wird als Grazer Stadtteil behandelt (Annahme laut Spec). **Pachern** kommt im Text der Seite Hart bei Graz vor.

## Dateistruktur

| Datei | Verantwortung |
|---|---|
| `src/lib/ort.ts` (neu) | Slug, Regionen, Gruppierung, Anker-Label – reine Helfer, auch vom Tina-Schema genutzt |
| `src/lib/orte-data.ts` (neu) | Server-Datenzugriff: `listOrte()`, `loadOrt()` |
| `src/lib/schema.ts` (neu) | JSON-LD-Bausteine als reine Funktionen |
| `src/components/JsonLd.tsx` (neu) | `<script type="application/ld+json">` |
| `src/components/OrteProvider.tsx` (neu) | Context mit der Ortsliste für Client-Komponenten (Footer) |
| `src/components/ui/AreaChip.tsx` (neu) | Chip (Link oder Text) im Stil der Gebietsliste |
| `src/components/sections/{Breadcrumbs,LocalInfo,LocalPrices,NearbyAreas}.tsx` (neu) | Bausteine der Ortsseite |
| `src/app/[slug]/{page.tsx,OrtClient.tsx}` (neu) | Ortsseite |
| `src/app/einsatzgebiete/{page.tsx,EinsatzgebieteClient.tsx}` (neu) | Übersicht |
| `tina/collections/{ort,einsatzgebiete}.ts` (neu) | CMS-Schema |
| `scripts/ort-distanzen.mjs` (neu) | Recherche: Entfernung/Fahrzeit/Nachbarn per OSM |
| `content/orte/*.json`, `content/pages/einsatzgebiete.json` (neu) | Inhalte |
| geändert: `tina/config.ts`, `tina/collections/{home,settings}.ts`, `content/pages/home.json`, `content/settings/site.json`, `src/app/{layout.tsx,page.tsx,sitemap.ts}`, `src/components/SiteShell.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/{Hero,FAQ,ServiceAreas,StructuredData}.tsx`, `docs/tina-cloud-setup.md` | |

---

### Task 1: Vorab-Fixes (Canonical auf www, Label „Telefon“)

**Dateien:** Ändern: `content/settings/site.json` (auf `main`)

- [ ] **Schritt 1: Auf `main` wechseln und aktualisieren**

```bash
git checkout main && git pull --ff-only origin main
```

- [ ] **Schritt 2: Zwei Werte ändern (Format wie Tina: 2 Leerzeichen, kein Zeilenumbruch am Ende)**

```bash
node -e "const fs=require('fs');const f='content/settings/site.json';const j=JSON.parse(fs.readFileSync(f,'utf8'));j.seo.url='https://www.taxigraz-gu.at';j.labels.phone='Telefon';fs.writeFileSync(f,JSON.stringify(j,null,2))"
git diff --stat && git diff content/settings/site.json
```
Erwartet: genau 2 geänderte Zeilen (`"url"`, `"phone"`).

- [ ] **Schritt 3: Tests laufen lassen**

Run: `npm test`. Erwartet: alles grün.

- [ ] **Schritt 4: Commit auf `main` (noch nicht pushen)**

```bash
git add content/settings/site.json
git commit -m "$(cat <<'EOF'
content: Canonical-URL auf www, Label „Telefon“ korrigiert

Canonical/Sitemap/og:url zeigten auf https://taxigraz-gu.at (307 → www);
Google führt die Startseite dadurch unter zwei URLs. „Telefon!“ war ein
Rest aus dem Webhook-Test.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB
EOF
)"
```

- [ ] **Schritt 5: ⏸ Felix-OK einholen, dann pushen**

```bash
git push origin main && git push vercel main
```
Das ist ein reiner Inhalts-Commit: Vercel überspringt den Build, Tina Cloud indiziert und löst den Webhook aus.

- [ ] **Schritt 6: Live prüfen**

Mit dem Monitor-Tool warten (bis zu 5 Min.), bis der Canonical umgestellt ist:
```bash
until curl -s https://www.taxigraz-gu.at | grep -q 'rel="canonical" href="https://www.taxigraz-gu.at"'; do sleep 20; done; echo LIVE
```
Danach:
```bash
curl -s https://www.taxigraz-gu.at/sitemap.xml | grep -o '<loc>[^<]*</loc>'
curl -s https://www.taxigraz-gu.at/robots.txt | tail -1
curl -s https://www.taxigraz-gu.at | grep -o 'Telefon!' | wc -l
```
Erwartet: Alle `<loc>` und die Sitemap-Zeile beginnen mit `https://www.`, „Telefon!“ kommt 0-mal vor.

- [ ] **Schritt 7: Felix-Aufgaben weitergeben**
  - Vercel: Domains › `taxigraz-gu.at` › Redirect auf www von 307 auf **308**.
  - Search Console: Sitemap `https://www.taxigraz-gu.at/sitemap.xml` einreichen.

- [ ] **Schritt 8: Feature-Branch auf `main` setzen**

```bash
git checkout feat/ortsseiten && git rebase main
```

---

### Task 2: Orts-Helfer (`src/lib/ort.ts`)

**Dateien:** Neu: `src/lib/ort.ts`, Test: `src/lib/__tests__/ort.test.ts`

**Schnittstellen (Produces):**
- `ORT_PREFIX = 'taxi-'`
- `REGIONS: readonly { value: 'graz-stadt' | 'graz-umgebung' | 'spezial'; label: string }[]`
- `type Region`
- `ortSlug(name: string): string`
- `isOrtSlug(slug: string): boolean`
- `type OrtSummary = { slug: string; name: string; region: Region; fact?: string }`
- `groupByRegion(orte: OrtSummary[]): { region: Region; orte: OrtSummary[] }[]`
- `ortLinkLabel(name: string): string`

- [ ] **Schritt 1: Test schreiben**

```ts
// src/lib/__tests__/ort.test.ts
import { describe, expect, it } from 'vitest'
import { groupByRegion, isOrtSlug, ortLinkLabel, ortSlug, type OrtSummary } from '@/lib/ort'

describe('ortSlug', () => {
  it.each([
    ['Gratkorn', 'taxi-gratkorn'],
    ['Laßnitzhöhe', 'taxi-lassnitzhoehe'],
    ['Gösting', 'taxi-goesting'],
    ['Hart bei Graz', 'taxi-hart-bei-graz'],
    ['Raaba-Grambach', 'taxi-raaba-grambach'],
    ['Flughafen Graz', 'taxi-flughafen-graz'],
    ['  Übelbach  ', 'taxi-uebelbach'],
  ])('%s → %s', (name, slug) => {
    expect(ortSlug(name)).toBe(slug)
  })
})

describe('isOrtSlug', () => {
  it('akzeptiert taxi-<ort>', () => {
    expect(isOrtSlug('taxi-gratkorn')).toBe(true)
    expect(isOrtSlug('taxi-hart-bei-graz')).toBe(true)
  })
  it('lehnt alles andere ab', () => {
    for (const slug of ['kontakt', 'admin', 'taxi-', 'taxi--x', 'Taxi-Gratkorn', 'taxi-gratkorn-']) {
      expect(isOrtSlug(slug)).toBe(false)
    }
  })
})

describe('groupByRegion', () => {
  const orte: OrtSummary[] = [
    { slug: 'taxi-gratkorn', name: 'Gratkorn', region: 'graz-umgebung' },
    { slug: 'taxi-eggenberg', name: 'Eggenberg', region: 'graz-stadt' },
    { slug: 'taxi-andritz', name: 'Andritz', region: 'graz-stadt' },
  ]
  it('gruppiert in fester Reihenfolge, sortiert nach Name und lässt leere Regionen weg', () => {
    expect(groupByRegion(orte)).toEqual([
      { region: 'graz-stadt', orte: [orte[2], orte[1]] },
      { region: 'graz-umgebung', orte: [orte[0]] },
    ])
  })
})

describe('ortLinkLabel', () => {
  it('stellt „Taxi“ voran', () => {
    expect(ortLinkLabel('Gratkorn')).toBe('Taxi Gratkorn')
  })
})
```

- [ ] **Schritt 2: Test läuft rot**

Run: `npx vitest run src/lib/__tests__/ort.test.ts`. Erwartet: FAIL („Failed to resolve import @/lib/ort“).

- [ ] **Schritt 3: Implementieren**

```ts
// src/lib/ort.ts
// Reine Helfer für Ortsseiten. Wird auch vom Tina-Schema importiert (relativer Pfad, keine Aliase).

export const ORT_PREFIX = 'taxi-'

export const REGIONS = [
  { value: 'graz-stadt', label: 'Graz Stadt' },
  { value: 'graz-umgebung', label: 'Graz-Umgebung' },
  { value: 'spezial', label: 'Spezial (Flughafen u. a.)' },
] as const

export type Region = (typeof REGIONS)[number]['value']

export type OrtSummary = { slug: string; name: string; region: Region; fact?: string }

const UMLAUTE: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }

/** "Laßnitzhöhe" → "taxi-lassnitzhoehe" (Dateiname und URL einer Ortsseite) */
export function ortSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => UMLAUTE[c])
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${ORT_PREFIX}${base}`
}

/** Nur taxi-<kleinbuchstaben/ziffern>(-…)* – alles andere ist keine Ortsseite (→ 404 ohne CMS-Abfrage). */
export function isOrtSlug(slug: string): boolean {
  return /^taxi-[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)
}

export function groupByRegion(orte: OrtSummary[]): { region: Region; orte: OrtSummary[] }[] {
  return REGIONS.map(({ value }) => ({
    region: value,
    orte: orte.filter((o) => o.region === value).sort((a, b) => a.name.localeCompare(b.name, 'de')),
  })).filter((group) => group.orte.length > 0)
}

/** Ankertext für Links auf Ortsseiten (Footer, Übersicht, Nachbarorte). */
export function ortLinkLabel(name: string): string {
  return `Taxi ${name}`
}
```

- [ ] **Schritt 4: Test läuft grün**

Run: `npx vitest run src/lib/__tests__/ort.test.ts`. Erwartet: PASS.

- [ ] **Schritt 5: Commit**

```bash
git add src/lib/ort.ts src/lib/__tests__/ort.test.ts
git commit -m "feat(orte): Slug-, Regions- und Label-Helfer für Ortsseiten" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

---

### Task 3: CMS-Schema und Datenzugriff

**Dateien:**
- Neu: `tina/collections/ort.ts`, `tina/collections/einsatzgebiete.ts`, `src/lib/orte-data.ts`, Tests: `src/lib/__tests__/orte-data.test.ts`, `src/lib/__tests__/content-orte.test.ts`
- Ändern: `tina/config.ts`, `tina/collections/home.ts` (Feld `serviceAreas.groups.areas`), `tina/collections/settings.ts` (Gruppe `areaLabels`), `content/pages/home.json`, `content/settings/site.json`, `src/components/sections/ServiceAreas.tsx:24-35`

**Schnittstellen:**
- Nutzt: `ortSlug`, `isOrtSlug`, `REGIONS`, `OrtSummary`, `Region` (Task 2)
- Liefert: `listOrte(): Promise<OrtSummary[]>` (sortiert nach Name, `fact` = „<label>: <value>“ der ersten Kachel), `loadOrt(slug): Promise<Awaited<ReturnType<typeof client.queries.ort>> | null>`. Die Tina-Typen `OrtQuery` und `EinsatzgebieteQuery`. `settings.areaLabels.{footerHeading, allAreas, nearbyEyebrow, nearbyHeading, breadcrumbHome, breadcrumbHub}`. `home.serviceAreas.groups[].areas[]` = `{ label: string; ort?: Ort | null }`.

- [ ] **Schritt 1: Test für den Datenzugriff schreiben**

```ts
// src/lib/__tests__/orte-data.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'

const queries = vi.hoisted(() => ({ ortConnection: vi.fn(), ort: vi.fn() }))
vi.mock('@tina/__generated__/client', () => ({ default: { queries } }))

import { listOrte, loadOrt } from '@/lib/orte-data'

const edge = (filename: string, name: string, region: string, facts: { label: string; value: string }[] = []) => ({
  node: { _sys: { filename }, name, region, local: { facts } },
})

beforeEach(() => {
  queries.ortConnection.mockReset()
  queries.ort.mockReset()
  queries.ortConnection.mockResolvedValue({
    data: {
      ortConnection: {
        edges: [
          edge('taxi-gratkorn', 'Gratkorn', 'graz-umgebung', [{ label: 'Graz Hauptplatz', value: '12 km · ca. 20 Min.' }]),
          edge('taxi-andritz', 'Andritz', 'graz-stadt'),
          null,
        ],
      },
    },
  })
})

describe('listOrte', () => {
  it('liefert Slug, Name, Region und die erste Fakten-Kachel, sortiert nach Name', async () => {
    expect(await listOrte()).toEqual([
      { slug: 'taxi-andritz', name: 'Andritz', region: 'graz-stadt', fact: undefined },
      { slug: 'taxi-gratkorn', name: 'Gratkorn', region: 'graz-umgebung', fact: 'Graz Hauptplatz: 12 km · ca. 20 Min.' },
    ])
    expect(queries.ortConnection).toHaveBeenCalledWith({ first: 100 })
  })
})

describe('loadOrt', () => {
  it('lädt einen bekannten Ort', async () => {
    queries.ort.mockResolvedValue({ data: { ort: { name: 'Gratkorn' } }, query: 'q', variables: { relativePath: 'taxi-gratkorn.json' } })
    const res = await loadOrt('taxi-gratkorn')
    expect(res?.data.ort.name).toBe('Gratkorn')
    expect(queries.ort).toHaveBeenCalledWith({ relativePath: 'taxi-gratkorn.json' })
  })
  it('gibt null für unbekannte oder ungültige Slugs zurück, ohne das Dokument abzufragen', async () => {
    expect(await loadOrt('taxi-gibtsnicht')).toBeNull()
    expect(await loadOrt('kontakt')).toBeNull()
    expect(queries.ort).not.toHaveBeenCalled()
  })
  it('reicht Tina-Ausfälle weiter, statt eine 404 zu liefern', async () => {
    queries.ortConnection.mockRejectedValue(new Error('Tina Cloud down'))
    await expect(loadOrt('taxi-gratkorn')).rejects.toThrow('Tina Cloud down')
  })
})
```

- [ ] **Schritt 2: Test für die Inhaltsregeln schreiben (bei 0 Ortsdateien wird er übersprungen)**

```ts
// src/lib/__tests__/content-orte.test.ts
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
    it('lokaler Text 300–550 Wörter, mit Zwischenüberschrift und internem Link', () => {
      const n = words(ort.local.body)
      expect(n).toBeGreaterThanOrEqual(300)
      expect(n).toBeLessThanOrEqual(550)
      expect(ort.local.body).toMatch(/^### /m)
      expect(ort.local.body).toMatch(/\]\(\/[a-z-]+\)/)
    })
    it('genau 3 Fakten-Kacheln', () => expect(ort.local.facts).toHaveLength(3))
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
  })
})
```

- [ ] **Schritt 3: Tests laufen rot**

Run: `npx vitest run src/lib/__tests__/orte-data.test.ts src/lib/__tests__/content-orte.test.ts`
Erwartet: `orte-data` FAIL (Modul fehlt). `content-orte` FAIL, weil `home.json` Strings statt Objekten enthält (`a.ort` von einem String ist `undefined` → leer, also könnte er auch PASS sein). Beides ist ok, entscheidend ist der Fehlschlag von `orte-data`.

- [ ] **Schritt 4: Collection `ort` anlegen**

```ts
// tina/collections/ort.ts
import type { Collection, TinaField } from 'tinacms'
import { ortSlug, REGIONS } from '../../src/lib/ort'

const str = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description,
})
const textarea = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description, ui: { component: 'textarea' },
})
const PLATZHALTER = 'Platzhalter erlaubt: {phone}, {email}, {rating}, {reviews}'

export const ort: Collection = {
  name: 'ort',
  label: 'Ortsseiten',
  path: 'content/orte',
  format: 'json',
  ui: {
    // Adresse der Seite = Dateiname, automatisch aus dem Ortsnamen (nur beim Anlegen).
    filename: { readonly: true, slugify: (values) => ortSlug(String(values?.name ?? '')) },
    router: ({ document }) => `/${document._sys.filename}`,
  },
  fields: [
    {
      type: 'string', name: 'name', label: 'Ortsname', required: true, isTitle: true,
      description: 'z. B. „Gratkorn“ – daraus entsteht beim Anlegen die Adresse /taxi-gratkorn.',
    },
    {
      type: 'string', name: 'region', label: 'Region', required: true,
      options: REGIONS.map((r) => ({ value: r.value, label: r.label })),
    },
    {
      type: 'object', name: 'seo', label: 'SEO', required: true,
      fields: [
        str('title', 'Seitentitel', 'max. 40 Zeichen – „ | Taxi Graz GU“ wird automatisch angehängt'),
        textarea('description', 'Beschreibung (Google-Snippet)', `100–140 Zeichen. ${PLATZHALTER}`),
      ],
    },
    {
      type: 'object', name: 'hero', label: 'Hero (oberster Bereich)', required: true,
      description: 'Button-Texte und Kontaktkarte kommen von der Startseite.',
      fields: [
        str('badge', 'Badge-Text'),
        str('headline', 'Überschrift (Teil 1)', 'z. B. „Ihr Taxi in“ – das letzte Wort steht in der zweiten Zeile'),
        str('headlineHighlight', 'Überschrift (hervorgehoben)', 'z. B. „Gratkorn“'),
        str('subline', 'Unterzeile'),
        {
          type: 'rich-text', name: 'description', label: 'Beschreibung', required: true,
          overrides: { toolbar: ['bold'], showFloatingToolbar: false },
        },
      ],
    },
    { type: 'image', name: 'heroImage', label: 'Hintergrundbild (optional – sonst das Bild der Startseite)' },
    {
      type: 'object', name: 'local', label: 'Lokaler Inhalt', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        {
          type: 'rich-text', name: 'body', label: 'Text', required: true,
          description: '300–500 Wörter über den Ort – kein Text, in dem nur der Ortsname getauscht ist.',
          overrides: { toolbar: ['heading', 'bold', 'link', 'ul', 'ol'], headingLevels: ['h3'] },
        },
        {
          type: 'object', name: 'facts', label: 'Fakten-Kacheln', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [str('label', 'Beschriftung', 'z. B. „Graz Hauptplatz“'), str('value', 'Wert', 'z. B. „14 km · ca. 20 Min.“')],
        },
      ],
    },
    {
      type: 'object', name: 'prices', label: 'Richtpreise (optional – Bereich erscheint nur mit Einträgen)',
      fields: [
        { type: 'string', name: 'heading', label: 'Überschrift' },
        {
          type: 'object', name: 'items', label: 'Strecken', list: true,
          ui: { itemProps: (item) => ({ label: item?.route }) },
          fields: [
            { type: 'string', name: 'route', label: 'Strecke', required: true, description: 'z. B. „Gratkorn → Flughafen Graz“' },
            { type: 'string', name: 'price', label: 'Preis', required: true, description: 'z. B. „ca. 45 €“' },
          ],
        },
        { type: 'string', name: 'note', label: 'Hinweis', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'faq', label: 'Häufige Fragen', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        {
          type: 'object', name: 'items', label: 'Fragen', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.question }) },
          fields: [str('question', 'Frage'), textarea('answer', 'Antwort', PLATZHALTER)],
        },
      ],
    },
    {
      type: 'object', name: 'nearby', label: 'Nachbarorte', list: true,
      ui: { itemProps: (item) => ({ label: item?.ort }) },
      fields: [{ type: 'reference', name: 'ort', label: 'Ortsseite', collections: ['ort'], required: true }],
    },
  ],
}
```

- [ ] **Schritt 5: Collection `einsatzgebiete` anlegen**

```ts
// tina/collections/einsatzgebiete.ts
import type { Collection, TinaField } from 'tinacms'

const str = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description,
})
const PLATZHALTER = 'Platzhalter erlaubt: {phone}, {email}, {rating}, {reviews}'

export const einsatzgebiete: Collection = {
  name: 'einsatzgebiete',
  label: 'Einsatzgebiete (Übersicht)',
  path: 'content/pages',
  format: 'json',
  match: { include: 'einsatzgebiete' },
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => '/einsatzgebiete',
  },
  fields: [
    {
      type: 'object', name: 'seo', label: 'SEO', required: true,
      fields: [
        str('title', 'Seitentitel', 'max. 40 Zeichen – nicht „Taxi Graz“ (das ist die Startseite)'),
        { type: 'string', name: 'description', label: 'Beschreibung (Google-Snippet)', required: true, ui: { component: 'textarea' }, description: PLATZHALTER },
      ],
    },
    {
      type: 'object', name: 'hero', label: 'Kopfbereich', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        { type: 'string', name: 'text', label: 'Text', required: true, ui: { component: 'textarea' }, description: PLATZHALTER },
      ],
    },
    {
      type: 'object', name: 'groupLabels', label: 'Gruppen-Überschriften', required: true,
      fields: [str('grazStadt', 'Graz Stadt'), str('grazUmgebung', 'Graz-Umgebung'), str('spezial', 'Spezial (Flughafen u. a.)')],
    },
    str('cardLinkLabel', 'Linktext auf den Karten', 'z. B. „Zur Ortsseite“'),
  ],
}
```

- [ ] **Schritt 6: `home.ts` – Gebiete als Objekte mit optionalem Verweis**

In `tina/collections/home.ts`, Gruppe `serviceAreas` › `groups` › `fields`, die Zeile
```ts
            { type: 'string', name: 'areas', label: 'Orte / Routen', list: true, required: true },
```
ersetzen durch:
```ts
            {
              type: 'object', name: 'areas', label: 'Orte / Routen', list: true, required: true,
              ui: { itemProps: (item) => ({ label: item?.label }) },
              fields: [
                str('label', 'Beschriftung'),
                { type: 'reference', name: 'ort', label: 'Verknüpfte Ortsseite (optional – macht den Eintrag zum Link)', collections: ['ort'] },
              ],
            },
```

- [ ] **Schritt 7: `settings.ts` – Gruppe `areaLabels` vor `design` einfügen**

```ts
    {
      type: 'object', name: 'areaLabels', label: 'Beschriftungen Einsatzgebiete', required: true,
      description: 'Texte rund um die Ortsseiten (Footer, Startseite, Ortsseiten).',
      fields: [
        { type: 'string', name: 'footerHeading', label: 'Überschrift im Footer', required: true },
        { type: 'string', name: 'allAreas', label: 'Link „Alle Einsatzgebiete“', required: true },
        { type: 'string', name: 'nearbyEyebrow', label: 'Ortsseiten: kleine Überschrift „Nachbarorte“', required: true },
        { type: 'string', name: 'nearbyHeading', label: 'Ortsseiten: Überschrift „Nachbarorte“', required: true },
        { type: 'string', name: 'breadcrumbHome', label: 'Brotkrumen: Startseite', required: true },
        { type: 'string', name: 'breadcrumbHub', label: 'Brotkrumen: Einsatzgebiete', required: true },
      ],
    },
```

- [ ] **Schritt 8: Collections registrieren**

`tina/config.ts`:
```ts
import { ort } from './collections/ort'
import { einsatzgebiete } from './collections/einsatzgebiete'
// …
  schema: { collections: [settings, home, kontakt, legal, ort, einsatzgebiete] },
```

- [ ] **Schritt 9: Inhalte migrieren**

```bash
node -e "
const fs=require('fs')
const h='content/pages/home.json', s='content/settings/site.json'
const home=JSON.parse(fs.readFileSync(h,'utf8'))
for (const g of home.serviceAreas.groups) g.areas=g.areas.map((label)=>({label}))
fs.writeFileSync(h,JSON.stringify(home,null,2))
const {design,...rest}=JSON.parse(fs.readFileSync(s,'utf8'))
const site={...rest,areaLabels:{footerHeading:'Einsatzgebiete',allAreas:'Alle Einsatzgebiete',nearbyEyebrow:'In der Nähe',nearbyHeading:'Taxi auch in den Nachbarorten',breadcrumbHome:'Start',breadcrumbHub:'Einsatzgebiete'},design}
fs.writeFileSync(s,JSON.stringify(site,null,2))
"
mkdir -p content/orte
git diff --stat
```
Erwartet: `home.json` (Gebiete jetzt `{ "label": … }`) und `site.json` (+ `areaLabels`).

- [ ] **Schritt 10: `ServiceAreas.tsx` auf Objekte umstellen (sichtbar unverändert)**

In `AreaGroup` `{area}` → `{area.label}`:
```tsx
        {areas.map((area, i) => (
          <span key={i} className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-gray-600)] transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 hover:text-[var(--color-black)]">
            <MapPin className="h-3.5 w-3.5 text-[var(--color-gold)] transition-transform group-hover:scale-110" />
            {area.label}
          </span>
        ))}
```

- [ ] **Schritt 11: Datenzugriff implementieren**

```ts
// src/lib/orte-data.ts
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
```

- [ ] **Schritt 12: Tina-Client und Typen neu erzeugen, Typecheck**

```bash
npx tinacms build --local --skip-cloud-checks
grep -c "OrtQuery\|EinsatzgebieteQuery" tina/__generated__/types.ts
npx tsc --noEmit
```
Erwartet: Build ok, beide Typen vorhanden, `tsc` ohne Fehler. Falls `tinacms build` ohne `-c` scheitert: einmal `npm run dev` starten, bis „Tina server running“ erscheint, dann beenden. Das erzeugt dieselben Dateien.

- [ ] **Schritt 13: Tests grün**

Run: `npm test`. Erwartet: alle PASS (`content-orte` › „Ortsseiten-Inhalte“ übersprungen).

- [ ] **Schritt 14: Commit**

```bash
git add tina/ content/pages/home.json content/settings/site.json src/lib/orte-data.ts src/lib/__tests__/orte-data.test.ts src/lib/__tests__/content-orte.test.ts src/components/sections/ServiceAreas.tsx
git commit -m "feat(cms): Collections Ortsseiten und Einsatzgebiete, Gebietsliste mit Verweisen, Beschriftungen" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```
(`tina/` enthält `tina-lock.json`. `tina/__generated__` ist per .gitignore ausgeschlossen.)

---

### Task 4: Strukturierte Daten umbauen

**Dateien:**
- Neu: `src/lib/schema.ts`, `src/components/JsonLd.tsx`, Test: `src/lib/__tests__/schema.test.ts`
- Ändern: `src/components/sections/StructuredData.tsx` (komplett), `src/app/layout.tsx`, `src/app/page.tsx`

**Schnittstellen (Produces):**
- `taxiServiceId(s: SiteSettings): string`
- `taxiServiceSchema(s, services: { title: string; description: string }[], orte: { name: string }[])`
- `faqPageSchema(items: { question: string; answer: string }[], s)`
- `breadcrumbSchema(items: { name: string; path: string }[], s)` (`path` `''` = Startseite)
- `ortServiceSchema(s, ort: { name: string; slug: string })`
- `<JsonLd data={object} />`

- [ ] **Schritt 1: Test schreiben**

```ts
// src/lib/__tests__/schema.test.ts
import { describe, expect, it } from 'vitest'
import { breadcrumbSchema, faqPageSchema, ortServiceSchema, taxiServiceSchema } from '@/lib/schema'
import type { SiteSettings } from '@/lib/site'

const s = {
  contact: { phone: '+43 660 1083003', whatsapp: '436601083003', email: 'info@taxigraz-gu.at' },
  address: { street: 'Walter-Goldschmidt-Gasse 31', zip: '8042', city: 'Graz', country: 'Österreich' },
  google: { rating: 4.9, reviews: 673, mapsUrl: 'https://maps.example' },
  seo: { siteName: 'Taxi Graz GU', url: 'https://www.taxigraz-gu.at', description: 'Taxi ☎ {phone}' },
} as unknown as SiteSettings

describe('taxiServiceSchema', () => {
  const schema = taxiServiceSchema(s, [{ title: 'Flughafentransfer', description: 'Zum Flughafen' }], [{ name: 'Gratkorn' }, { name: 'Flughafen Graz' }])
  it('hat eine feste @id und löst Platzhalter auf', () => {
    expect(schema['@type']).toBe('TaxiService')
    expect(schema['@id']).toBe('https://www.taxigraz-gu.at/#taxiservice')
    expect(schema.description).toBe('Taxi ☎ +43 660 1083003')
  })
  it('nimmt alle Orte ohne Duplikate in areaServed auf', () => {
    expect(schema.areaServed.map((a) => a.name)).toEqual(['Graz', 'Graz-Umgebung', 'Flughafen Graz', 'Gratkorn'])
  })
  it('listet die Leistungen im OfferCatalog', () => {
    expect(schema.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe('Flughafentransfer')
  })
})

describe('faqPageSchema', () => {
  it('baut Fragen und Antworten mit aufgelösten Platzhaltern', () => {
    expect(faqPageSchema([{ question: 'Nummer?', answer: 'Ruf {phone} an' }], s).mainEntity).toEqual([
      { '@type': 'Question', name: 'Nummer?', acceptedAnswer: { '@type': 'Answer', text: 'Ruf +43 660 1083003 an' } },
    ])
  })
})

describe('breadcrumbSchema', () => {
  it('nummeriert ab 1 und baut absolute URLs', () => {
    expect(breadcrumbSchema([{ name: 'Start', path: '' }, { name: 'Einsatzgebiete', path: '/einsatzgebiete' }], s).itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.taxigraz-gu.at' },
      { '@type': 'ListItem', position: 2, name: 'Einsatzgebiete', item: 'https://www.taxigraz-gu.at/einsatzgebiete' },
    ])
  })
})

describe('ortServiceSchema', () => {
  it('beschreibt den Ort und verweist per @id auf den Taxi-Service', () => {
    expect(ortServiceSchema(s, { name: 'Gratkorn', slug: 'taxi-gratkorn' })).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Taxi',
      name: 'Taxi Gratkorn',
      url: 'https://www.taxigraz-gu.at/taxi-gratkorn',
      areaServed: { '@type': 'Place', name: 'Gratkorn' },
      provider: { '@id': 'https://www.taxigraz-gu.at/#taxiservice' },
    })
  })
})
```

- [ ] **Schritt 2: Test läuft rot**

Run: `npx vitest run src/lib/__tests__/schema.test.ts`. Erwartet: FAIL (Modul fehlt).

- [ ] **Schritt 3: `src/lib/schema.ts` implementieren (Werte 1:1 aus dem bisherigen `StructuredData.tsx`)**

```ts
// src/lib/schema.ts
import { interpolate, type SiteSettings } from './site'
import { ortLinkLabel } from './ort'

const CONTEXT = 'https://schema.org'

type Area = { '@type': string; name: string }

const BASE_AREAS: Area[] = [
  { '@type': 'City', name: 'Graz' },
  { '@type': 'AdministrativeArea', name: 'Graz-Umgebung' },
  { '@type': 'Place', name: 'Flughafen Graz' },
]

export const taxiServiceId = (s: SiteSettings) => `${s.seo.url}/#taxiservice`

/** Das Unternehmen – auf jeder Seite (Root-Layout). */
export function taxiServiceSchema(
  s: SiteSettings,
  services: { title: string; description: string }[],
  orte: { name: string }[]
) {
  const known = new Set(BASE_AREAS.map((a) => a.name))
  const areaServed: Area[] = [
    ...BASE_AREAS,
    ...orte.filter((o) => !known.has(o.name)).map((o) => ({ '@type': 'Place', name: o.name })),
  ]
  return {
    '@context': CONTEXT,
    '@type': 'TaxiService',
    '@id': taxiServiceId(s),
    name: s.seo.siteName,
    alternateName: 'Taxi Graz //GU',
    description: interpolate(s.seo.description, s),
    url: s.seo.url,
    telephone: s.contact.phone,
    email: s.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      postalCode: s.address.zip,
      addressCountry: 'AT',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 47.0500761, longitude: 15.4743797 },
    areaServed,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: s.google.rating,
      reviewCount: s.google.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: '€€',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'EUR',
    sameAs: [s.google.mapsUrl],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Taxi-Leistungen',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
  }
}

/** FAQ – nur auf der Seite, deren Fragen sichtbar sind. */
export function faqPageSchema(items: { question: string; answer: string }[], s: SiteSettings) {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: interpolate(item.answer, s) },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[], s: SiteSettings) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${s.seo.url}${item.path}`,
    })),
  }
}

/** Taxi-Leistung für einen Ort, verknüpft mit dem Unternehmen über dessen @id. */
export function ortServiceSchema(s: SiteSettings, ort: { name: string; slug: string }) {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    serviceType: 'Taxi',
    name: ortLinkLabel(ort.name),
    url: `${s.seo.url}/${ort.slug}`,
    areaServed: { '@type': 'Place', name: ort.name },
    provider: { '@id': taxiServiceId(s) },
  }
}
```

- [ ] **Schritt 4: Test läuft grün**

Run: `npx vitest run src/lib/__tests__/schema.test.ts`. Erwartet: PASS.

- [ ] **Schritt 5: `JsonLd` und `StructuredData` umstellen**

```tsx
// src/components/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
```

```tsx
// src/components/sections/StructuredData.tsx (ersetzt den bisherigen Inhalt)
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
```

- [ ] **Schritt 6: `layout.tsx` lädt die Orte und reicht sie weiter**

```tsx
import { listOrte } from '@/lib/orte-data'
// …
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, home, orte] = await Promise.all([loadSettings(), loadHome(), listOrte()])
  const site = settings.data.settings
  // …
      <head>
        <StructuredData settings={site} services={compact(home.data.home.services.items)} orte={orte} />
      </head>
```
(Die Übergabe `orte` an `SiteShell` folgt in Task 8.)

- [ ] **Schritt 7: Startseite gibt ihr FAQ-Schema selbst aus**

```tsx
// src/app/page.tsx
import client from '@tina/__generated__/client'
import { JsonLd } from '@/components/JsonLd'
import { faqPageSchema } from '@/lib/schema'
import { compact } from '@/lib/site'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const [res, settings] = await Promise.all([
    client.queries.home({ relativePath: 'home.json' }),
    client.queries.settings({ relativePath: 'site.json' }),
  ])
  return (
    <>
      <JsonLd data={faqPageSchema(compact(res.data.home.faq.items), settings.data.settings)} />
      <HomeClient data={res.data} query={res.query} variables={res.variables} />
    </>
  )
}
```

- [ ] **Schritt 8: Prüfen**

```bash
npx tsc --noEmit && npm test && npm run lint
```
Dann lokal `npm run dev` (Hintergrund) und:
```bash
for p in / /kontakt /impressum; do echo "$p: $(curl -s localhost:3000$p | grep -o '"@type":"[A-Za-z]*"' | sort | uniq -c | tr '\n' ' ')"; done
```
Erwartet: `/` enthält TaxiService und FAQPage. `/kontakt` und `/impressum` enthalten TaxiService, aber **kein** FAQPage und kein BreadcrumbList.

- [ ] **Schritt 9: Commit**

```bash
git add src/lib/schema.ts src/lib/__tests__/schema.test.ts src/components/JsonLd.tsx src/components/sections/StructuredData.tsx src/app/layout.tsx src/app/page.tsx
git commit -m "fix(schema): FAQ/Breadcrumbs nur auf der passenden Seite, TaxiService mit @id und allen Orten" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

---

### Task 5: Recherche-Skript für Entfernungen und Nachbarorte

**Dateien:** Neu: `scripts/ort-distanzen.mjs`, `docs/ortsseiten-distanzen.json`

- [ ] **Schritt 1: Skript schreiben**

```js
// scripts/ort-distanzen.mjs
// Recherche-Hilfe für die Fakten-Kacheln der Ortsseiten: Entfernung und Fahrzeit (ohne Verkehr)
// per OpenStreetMap (Nominatim + OSRM) sowie die drei nächstgelegenen Orte (Luftlinie).
// Aufruf: node scripts/ort-distanzen.mjs "Gratkorn=Gratkorn, Steiermark" "Andritz=Andritz, Graz" …
const ZIELE = [
  { label: 'Graz Hauptplatz', query: 'Hauptplatz, 8010 Graz' },
  { label: 'Graz Hauptbahnhof', query: 'Graz Hauptbahnhof' },
  { label: 'Flughafen Graz', query: 'Flughafen Graz' },
]
const UA = 'taxigraz-gu.at Ortsseiten-Recherche (info@unicorn-factory.net)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=at&q=${encodeURIComponent(query)}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  const [hit] = await res.json()
  await sleep(1100) // Nominatim erlaubt max. 1 Anfrage pro Sekunde
  if (!hit) throw new Error(`Nicht gefunden: ${query}`)
  return { lat: Number(hit.lat), lon: Number(hit.lon), gefunden: hit.display_name }
}

async function route(a, b) {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`
  const json = await (await fetch(url)).json()
  if (json.code !== 'Ok') throw new Error(`Routing fehlgeschlagen: ${json.code}`)
  const km = Math.round(json.routes[0].distance / 100) / 10
  const min = Math.ceil(json.routes[0].duration / 60 / 5) * 5 // auf 5 Minuten aufgerundet
  return { km, min, text: `${km.toLocaleString('de-AT')} km · ca. ${min} Min.` }
}

function luftlinie(a, b) {
  const rad = (d) => (d * Math.PI) / 180
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

;(async () => {
  const args = process.argv.slice(2)
  if (!args.length) throw new Error('Aufruf: node scripts/ort-distanzen.mjs "Name=Suchbegriff" …')
  const ziele = []
  for (const z of ZIELE) ziele.push({ ...z, ...(await geocode(z.query)) })
  const orte = []
  for (const arg of args) {
    const [name, query = name] = arg.split('=')
    orte.push({ name, ...(await geocode(query)) })
  }
  const out = {}
  for (const ort of orte) {
    const fahrten = {}
    for (const z of ziele) fahrten[z.label] = await route(ort, z)
    const nachbarn = orte
      .filter((o) => o !== ort)
      .map((o) => ({ name: o.name, km: Math.round(luftlinie(ort, o) * 10) / 10 }))
      .sort((a, b) => a.km - b.km)
      .slice(0, 3)
    out[ort.name] = { gefunden: ort.gefunden, fahrten, nachbarn }
  }
  console.log(JSON.stringify(out, null, 2))
})().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
```

- [ ] **Schritt 2: Für alle 12 Orte ausführen und speichern**

```bash
node scripts/ort-distanzen.mjs \
  "Flughafen Graz=Flughafen Graz" "Gratkorn=Gratkorn, Steiermark" "Hart bei Graz=Hart bei Graz" \
  "Laßnitzhöhe=Laßnitzhöhe" "Raaba-Grambach=Raaba-Grambach" "Vasoldsberg=Vasoldsberg" \
  "Hitzendorf=Hitzendorf, Steiermark" "Andritz=Andritz, Graz" "Eggenberg=Eggenberg, Graz" \
  "Gösting=Gösting, Graz" "Mariatrost=Mariatrost, Graz" "Ragnitz=Ragnitz, Graz" \
  > docs/ortsseiten-distanzen.json
```

- [ ] **Schritt 3: Plausibilität prüfen**

`docs/ortsseiten-distanzen.json` lesen und für jeden Ort prüfen:
- `gefunden` liegt in der Steiermark bzw. in Graz. Bei **Ragnitz** muss es der Grazer Stadtteil sein und nicht die Gemeinde im Bezirk Leibnitz.
- Die Entfernung Hauptplatz ↔ Grazer Bezirke liegt unter 10 km, zu Umlandgemeinden bei 8–25 km.

Treffer, die nicht passen, mit einem genaueren Suchbegriff erneut abfragen.

- [ ] **Schritt 4: Commit**

```bash
git add scripts/ort-distanzen.mjs docs/ortsseiten-distanzen.json
git commit -m "chore(orte): Recherche-Skript Entfernungen/Fahrzeiten (OSM) und Ergebnisse" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

---

### Task 6: Ortsseite mit Pilot Gratkorn

**Dateien:**
- Neu: `src/components/ui/AreaChip.tsx`, `src/components/sections/{Breadcrumbs,LocalInfo,LocalPrices,NearbyAreas}.tsx`, `src/app/[slug]/page.tsx`, `src/app/[slug]/OrtClient.tsx`, `content/orte/taxi-gratkorn.json`
- Ändern: `src/components/sections/Hero.tsx` (Typ, Props `imageSrc` und `imageField`), `src/components/sections/FAQ.tsx` (Typ), `content/pages/home.json` (Verweis Gratkorn)

**Schnittstellen:**
- Nutzt: `loadOrt`, `listOrte` (Task 3); `breadcrumbSchema`, `faqPageSchema`, `ortServiceSchema`, `JsonLd` (Task 4); `ortLinkLabel` (Task 2); `createMetadata` (`src/lib/metadata.ts`)
- Liefert: `<AreaChip label href? tinaFieldId? />` (wird in Task 8 wiederverwendet), `HeroData`, `FaqData` als strukturelle Typen

- [ ] **Schritt 1: `Hero.tsx` – strukturellen Typ und optionales Bild**

`HeroData` ersetzen (Import `HomeQuery` entfernen):
```ts
/** Startseite und Ortsseiten (dort gemischt: Texte vom Ort, Buttons/Karte von der Startseite). */
export type HeroData = {
  badge: string
  headline: string
  headlineHighlight: string
  subline: string
  description: unknown
  ctaCall: string
  ctaWhatsapp: string
  cardTitle: string
  scrollHint: string
}
```
Signatur und Bild:
```tsx
export function Hero({ data, imageSrc, imageField }: { data: HeroData; imageSrc?: string | null; imageField?: string }) {
  // …
      <div className="absolute inset-0 z-0" data-tina-field={imageField ?? tinaField(settings.design, 'heroImage')}>
        <Image
          src={imageSrc || settings.design.heroImage}
```

- [ ] **Schritt 2: `FAQ.tsx` – strukturellen Typ**

`FaqData` ersetzen (Import `HomeQuery` entfernen):
```ts
export type FaqData = {
  eyebrow: string
  heading: string
  items?: ReadonlyArray<{ question: string; answer: string } | null> | null
}
```

- [ ] **Schritt 3: Typecheck (Startseite unverändert)**

Run: `npx tsc --noEmit`. Erwartet: keine Fehler.

- [ ] **Schritt 4: `AreaChip`**

```tsx
// src/components/ui/AreaChip.tsx
import Link from 'next/link'
import { MapPin } from 'lucide-react'

const chipClass =
  'group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-gray-600)] transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 hover:text-[var(--color-black)]'

/** Orts-Chip aus der Gebietsliste – als Link, sobald eine Ortsseite verknüpft ist. */
export function AreaChip({ label, href, tinaFieldId }: { label: string; href?: string; tinaFieldId?: string }) {
  const content = (
    <>
      <MapPin className="h-3.5 w-3.5 text-[var(--color-gold)] transition-transform group-hover:scale-110" />
      {label}
    </>
  )
  return href ? (
    <Link href={href} className={chipClass} data-tina-field={tinaFieldId}>{content}</Link>
  ) : (
    <span className={chipClass} data-tina-field={tinaFieldId}>{content}</span>
  )
}
```

- [ ] **Schritt 5: `Breadcrumbs`**

```tsx
// src/components/sections/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-[var(--color-cream)]">
      <Container>
        <ol className="flex flex-wrap items-center gap-2 pt-8 text-sm text-[var(--color-gray-500)]">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-[var(--color-gold-dark)]">{item.label}</Link>
              ) : (
                <span aria-current="page" className="font-medium text-[var(--color-black)]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  )
}
```

- [ ] **Schritt 6: `LocalInfo`**

```tsx
// src/components/sections/LocalInfo.tsx
'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { Section } from '@/components/layout/Section'
import { legalComponents } from '@/components/legal/markdownComponents'
import { compact } from '@/lib/site'

export type LocalInfoData = {
  eyebrow: string
  heading: string
  body: unknown
  facts?: ReadonlyArray<{ label: string; value: string } | null> | null
}

export function LocalInfo({ data }: { data: LocalInfoData }) {
  const facts = compact(data.facts)
  return (
    <Section id="ort" className="bg-[var(--color-cream)]">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <motion.span
            data-tina-field={tinaField(data, 'eyebrow')}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
          >
            {data.eyebrow}
          </motion.span>
          <motion.h2
            data-tina-field={tinaField(data, 'heading')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
          >
            {data.heading}
          </motion.h2>
          <motion.div
            data-tina-field={tinaField(data, 'body')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 leading-relaxed text-[var(--color-gray-600)]"
          >
            <TinaMarkdown content={data.body as TinaMarkdownContent} components={legalComponents} />
          </motion.div>
        </div>
        <motion.ul
          data-tina-field={tinaField(data, 'facts')}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid gap-4 self-start sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1"
        >
          {facts.map((fact, i) => (
            <li key={i} data-tina-field={tinaField(fact)} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
                <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
                {fact.label}
              </span>
              <p className="mt-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-black)]">{fact.value}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}
```

- [ ] **Schritt 7: `LocalPrices`**

```tsx
// src/components/sections/LocalPrices.tsx
'use client'

import { tinaField } from 'tinacms/dist/react'
import { Section } from '@/components/layout/Section'
import { compact } from '@/lib/site'

export type LocalPricesData = {
  heading?: string | null
  note?: string | null
  items?: ReadonlyArray<{ route: string; price: string } | null> | null
}

/** Richtpreise – nur sichtbar, wenn im CMS Strecken eingetragen sind. */
export function LocalPrices({ data }: { data: LocalPricesData }) {
  const items = compact(data.items)
  if (items.length === 0) return null
  return (
    <Section className="bg-[var(--color-gray-50)]" narrow>
      {data.heading && (
        <h2
          data-tina-field={tinaField(data, 'heading')}
          className="text-center font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
        >
          {data.heading}
        </h2>
      )}
      <ul className="mt-8 divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
        {items.map((item, i) => (
          <li key={i} data-tina-field={tinaField(item)} className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="text-[var(--color-gray-600)]">{item.route}</span>
            <span className="font-bold text-[var(--color-gold-dark)]">{item.price}</span>
          </li>
        ))}
      </ul>
      {data.note && (
        <p data-tina-field={tinaField(data, 'note')} className="mt-4 text-center text-sm text-[var(--color-gray-500)]">
          {data.note}
        </p>
      )}
    </Section>
  )
}
```

- [ ] **Schritt 8: `NearbyAreas`**

```tsx
// src/components/sections/NearbyAreas.tsx
'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import { Section } from '@/components/layout/Section'
import { AreaChip } from '@/components/ui/AreaChip'
import { useSettings } from '@/components/SettingsProvider'
import { ortLinkLabel } from '@/lib/ort'

export function NearbyAreas({ items }: { items: { slug: string; name: string }[] }) {
  const { areaLabels } = useSettings()
  if (items.length === 0) return null
  return (
    <Section id="nachbarorte" className="bg-white">
      <div className="text-center">
        <span
          data-tina-field={tinaField(areaLabels, 'nearbyEyebrow')}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
        >
          {areaLabels.nearbyEyebrow}
        </span>
        <h2
          data-tina-field={tinaField(areaLabels, 'nearbyHeading')}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
        >
          {areaLabels.nearbyHeading}
        </h2>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {items.map((item) => (
          <AreaChip key={item.slug} label={ortLinkLabel(item.name)} href={`/${item.slug}`} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/einsatzgebiete"
          data-tina-field={tinaField(areaLabels, 'allAreas')}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold-dark)] hover:underline"
        >
          {areaLabels.allAreas}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  )
}
```

- [ ] **Schritt 9: `OrtClient`**

```tsx
// src/app/[slug]/OrtClient.tsx
'use client'

import { useTina, tinaField } from 'tinacms/dist/react'
import type { HomeQuery, OrtQuery } from '@tina/__generated__/types'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Breadcrumbs } from '@/components/sections/Breadcrumbs'
import { LocalInfo } from '@/components/sections/LocalInfo'
import { LocalPrices } from '@/components/sections/LocalPrices'
import { Services } from '@/components/sections/Services'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { NearbyAreas } from '@/components/sections/NearbyAreas'
import { CTA } from '@/components/sections/CTA'
import { useSettings } from '@/components/SettingsProvider'
import { compact } from '@/lib/site'

export interface OrtClientProps {
  data: OrtQuery
  query: string
  variables: { relativePath: string }
  home: HomeQuery['home']
}

export function OrtClient({ home, ...tina }: OrtClientProps) {
  const { data } = useTina(tina)
  const ort = data.ort
  const { areaLabels } = useSettings()
  // Texte vom Ort, Button-Beschriftungen/Kontaktkarte/Scroll-Hinweis von der Startseite.
  const hero = { ...home.hero, ...ort.hero }
  const nearby = compact(ort.nearby).flatMap(({ ort: ref }) => (ref ? [{ slug: ref._sys.filename, name: ref.name }] : []))

  return (
    <>
      <Hero data={hero} imageSrc={ort.heroImage} imageField={tinaField(ort, 'heroImage')} />
      <TrustBar data={home.trustBar} />
      <Breadcrumbs
        items={[
          { label: areaLabels.breadcrumbHome, href: '/' },
          { label: areaLabels.breadcrumbHub, href: '/einsatzgebiete' },
          { label: ort.name },
        ]}
      />
      <LocalInfo data={ort.local} />
      {ort.prices && <LocalPrices data={ort.prices} />}
      <Services data={home.services} />
      <Testimonials data={home.testimonials} />
      <FAQ data={ort.faq} />
      <NearbyAreas items={nearby} />
      <CTA data={home.cta} />
    </>
  )
}
```

- [ ] **Schritt 10: Route `[slug]`**

```tsx
// src/app/[slug]/page.tsx
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
```

- [ ] **Schritt 11: Pilot-Inhalt Gratkorn schreiben**

Die Daten für „Gratkorn“ aus `docs/ortsseiten-distanzen.json` nehmen (Fakten = die drei `fahrten`, Nachbarn = `nachbarn`). **Nachbarn, die als Datei noch nicht existieren, erst in Task 9 eintragen**, für den Piloten also `"nearby": []`. Deshalb ist der Content-Test für diese eine Regel bis Task 9 rot, und Schritt 14 lässt ihn gezielt aus.

Struktur von `content/orte/taxi-gratkorn.json` (Texte nach den **Inhaltsregeln** schreiben, Gratkorn-spezifisch: Lage nördlich von Graz an der Mur, Nachbarschaft zu Gratwein-Straßengel und Graz-Gösting, Anbindung A9/B67 und S-Bahn, typische Fahrten zum Hauptbahnhof, LKH und Flughafen):
```json
{
  "name": "Gratkorn",
  "region": "graz-umgebung",
  "seo": {
    "title": "Taxi Gratkorn – 24/7 & Flughafentransfer",
    "description": "Taxi Gratkorn rund um die Uhr: Fahrten nach Graz, zum Hauptbahnhof und Flughafen, Festpreise auf Anfrage. ☎ {phone}"
  },
  "hero": {
    "badge": "24/7 in Gratkorn unterwegs",
    "headline": "Ihr Taxi in",
    "headlineHighlight": "Gratkorn",
    "subline": "Rund um die Uhr – schnell vor Ort.",
    "description": "**Taxi Gratkorn**: …1–2 Sätze mit Nutzen…"
  },
  "local": {
    "eyebrow": "Taxi Gratkorn",
    "heading": "…",
    "body": "…300–500 Wörter Markdown, mindestens eine „### “-Überschrift, mindestens ein interner Link wie [Flughafentransfer](/taxi-flughafen-graz)…",
    "facts": [
      { "label": "Graz Hauptplatz", "value": "<fahrten['Graz Hauptplatz'].text>" },
      { "label": "Graz Hauptbahnhof", "value": "<fahrten['Graz Hauptbahnhof'].text>" },
      { "label": "Flughafen Graz", "value": "<fahrten['Flughafen Graz'].text>" }
    ]
  },
  "faq": {
    "eyebrow": "Häufige Fragen",
    "heading": "Taxi in Gratkorn – häufige Fragen",
    "items": [
      { "question": "…", "answer": "…" }
    ]
  },
  "nearby": []
}
```
Die `…` sind die zu schreibenden Texte, sie dürfen so nicht in der Datei bleiben. Schritt 14 prüft das per Test. Eine Beschreibung mit `{phone}` hat nach der Auflösung +9 Zeichen, deshalb die Länge per Test prüfen.

- [ ] **Schritt 12: Gratkorn auf der Startseite verknüpfen**

```bash
node -e "
const fs=require('fs');const f='content/pages/home.json';const h=JSON.parse(fs.readFileSync(f,'utf8'))
for(const g of h.serviceAreas.groups)for(const a of g.areas)if(a.label==='Taxi Gratkorn')a.ort='content/orte/taxi-gratkorn.json'
fs.writeFileSync(f,JSON.stringify(h,null,2))"
grep -n 'taxi-gratkorn' content/pages/home.json
```

- [ ] **Schritt 13: Lokal ansehen**

`npm run dev` (Hintergrund), dann:
```bash
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/taxi-gratkorn        # 200
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/taxi-gibtsnicht      # 404
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/gibtsnicht           # 404
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/admin                # 200 (Rewrite greift vor [slug])
curl -s localhost:3000/taxi-gratkorn | grep -o '<title>[^<]*</title>\|<link rel="canonical"[^>]*>\|<h1' | head
curl -s localhost:3000/taxi-gratkorn | grep -o '"@type":"[A-Za-z]*"' | sort | uniq -c
```
Erwartet: Title „Taxi Gratkorn – … | Taxi Graz GU“, Canonical `https://www.taxigraz-gu.at/taxi-gratkorn`, eine `<h1`. JSON-LD: TaxiService, Service, FAQPage, BreadcrumbList.

Screenshots mit Playwright (Desktop 1440×900 und Mobil 390×844). Vorher per `browser_evaluate` durchscrollen, damit die whileInView-Animationen auslösen:
```js
async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) } window.scrollTo(0, 0) }
```
Dann `browser_take_screenshot` mit `fullPage: true` in den Scratchpad (`gratkorn-desktop.png`, `gratkorn-mobil.png`). Prüfen:
- Hero-Überschrift bricht mobil sauber um.
- Brotkrumen sind sichtbar.
- Die Fakten-Kacheln stehen mobil in einer Spalte bzw. als 3er-Raster ab `sm`.
- Nachbarorte werden ausgeblendet (noch leer).

- [ ] **Schritt 14: Tests und Typecheck**

```bash
npx tsc --noEmit && npm run lint
npx vitest run -t "Ortsseiten-Inhalte" 2>&1 | tail -20
npm test -- --exclude src/lib/__tests__/content-orte.test.ts
```
Erwartet:
- Im Content-Test ist für `taxi-gratkorn.json` nur „2–4 Nachbarorte …“ rot, weil die Nachbarn erst in Task 9 kommen. Alle anderen Regeln sind grün, sonst den Text nachbessern.
- Alle übrigen Tests sind grün.
- `grep -c '…' content/orte/taxi-gratkorn.json` ergibt `0`.

- [ ] **Schritt 15: Commit**

```bash
git add src/components/ui/AreaChip.tsx src/components/sections/ src/app/\[slug\]/ content/orte/taxi-gratkorn.json content/pages/home.json
git commit -m "feat(orte): Ortsseiten-Vorlage /taxi-<ort> mit Pilot Gratkorn" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

- [ ] **Schritt 16: ⏸ Checkpoint Felix**

Screenshots und Text der Gratkorn-Seite an Felix schicken (SendUserFile). Erst nach seinem OK zu Aufbau und Tonalität die restlichen Orte schreiben (Task 9).

---

### Task 7: Übersicht `/einsatzgebiete`

**Dateien:** Neu: `content/pages/einsatzgebiete.json`, `src/app/einsatzgebiete/page.tsx`, `src/app/einsatzgebiete/EinsatzgebieteClient.tsx`

**Schnittstellen:** Nutzt `listOrte`, `groupByRegion`, `ortLinkLabel`, `breadcrumbSchema`, `JsonLd`, `createMetadata`, `CTA`.

- [ ] **Schritt 1: Inhalt anlegen**

```json
{
  "seo": {
    "title": "Einsatzgebiete – alle Orte im Überblick",
    "description": "Alle Einsatzgebiete von Taxi Graz GU: Grazer Bezirke, Umlandgemeinden und Flughafen Graz – 24/7 erreichbar unter {phone}."
  },
  "hero": {
    "eyebrow": "Einsatzgebiete",
    "heading": "Hier sind wir für Sie unterwegs",
    "text": "Ob Grazer Bezirk, Nachbargemeinde oder Flughafen: Wählen Sie Ihren Ort – rund um die Uhr erreichbar unter {phone}."
  },
  "groupLabels": {
    "grazStadt": "Graz Stadt",
    "grazUmgebung": "Graz-Umgebung",
    "spezial": "Flughafen"
  },
  "cardLinkLabel": "Zur Ortsseite"
}
```
In `content/pages/einsatzgebiete.json` speichern. Länge der Description nach der Auflösung prüfen: `node -e "…"` mit interpolierter Telefonnummer, Ziel 100–140.

- [ ] **Schritt 2: Client-Komponente**

```tsx
// src/app/einsatzgebiete/EinsatzgebieteClient.tsx
'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import type { EinsatzgebieteQuery, HomeQuery } from '@tina/__generated__/types'
import { Section } from '@/components/layout/Section'
import { CTA } from '@/components/sections/CTA'
import { useSettings } from '@/components/SettingsProvider'
import { groupByRegion, ortLinkLabel, type OrtSummary, type Region } from '@/lib/ort'
import { interpolate } from '@/lib/site'
import { goldGridStyle } from '@/lib/styles'

const LABEL_KEY: Record<Region, 'grazStadt' | 'grazUmgebung' | 'spezial'> = {
  'graz-stadt': 'grazStadt',
  'graz-umgebung': 'grazUmgebung',
  spezial: 'spezial',
}

export interface EinsatzgebieteClientProps {
  data: EinsatzgebieteQuery
  query: string
  variables: { relativePath: string }
  orte: OrtSummary[]
  cta: HomeQuery['home']['cta']
}

export function EinsatzgebieteClient({ orte, cta, ...tina }: EinsatzgebieteClientProps) {
  const { data } = useTina(tina)
  const page = data.einsatzgebiete
  const settings = useSettings()

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-gray-900)] pt-40 pb-16">
        <div className="absolute -left-[20%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/15 via-[var(--color-gold)]/5 to-transparent blur-3xl" />
        <div className="absolute -right-[15%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-[var(--color-gold)]/[0.06] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={goldGridStyle} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-gray-900)] via-[var(--color-gray-900)]/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]" data-tina-field={tinaField(page.hero, 'eyebrow')}>
            {page.hero.eyebrow}
          </span>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl" data-tina-field={tinaField(page.hero, 'heading')}>
            {page.hero.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-gray-400)] md:text-lg" data-tina-field={tinaField(page.hero, 'text')}>
            {interpolate(page.hero.text, settings)}
          </p>
        </div>
      </section>

      <Section className="bg-[var(--color-cream)]">
        <div className="space-y-14">
          {groupByRegion(orte).map((group) => (
            <div key={group.region}>
              <h2
                className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
                data-tina-field={tinaField(page.groupLabels, LABEL_KEY[group.region])}
              >
                {page.groupLabels[LABEL_KEY[group.region]]}
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.orte.map((ort) => (
                  <li key={ort.slug}>
                    <Link
                      href={`/${ort.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:shadow-lg"
                    >
                      <span className="flex items-center gap-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-black)]">
                        <MapPin className="h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                        {ortLinkLabel(ort.name)}
                      </span>
                      {ort.fact && <span className="mt-2 text-sm text-[var(--color-gray-500)]">{ort.fact}</span>}
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[var(--color-gold-dark)]" data-tina-field={tinaField(page, 'cardLinkLabel')}>
                        {page.cardLinkLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CTA data={cta} />
    </>
  )
}
```

- [ ] **Schritt 3: Route**

```tsx
// src/app/einsatzgebiete/page.tsx
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
```

- [ ] **Schritt 4: Prüfen**

```bash
npx tsc --noEmit && npm run lint
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/einsatzgebiete
curl -s localhost:3000/einsatzgebiete | grep -o '<title>[^<]*</title>\|<link rel="canonical"[^>]*>\|href="/taxi-[a-z-]*"' | sort -u
```
Erwartet: 200, Title ohne „Taxi Graz“ am Anfang, Canonical `/einsatzgebiete`, Link auf `/taxi-gratkorn`. Screenshot Desktop und Mobil wie in Task 6, Schritt 13.

- [ ] **Schritt 5: Commit**

```bash
git add content/pages/einsatzgebiete.json src/app/einsatzgebiete/
git commit -m "feat(orte): Übersichtsseite /einsatzgebiete" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

---

### Task 8: Verlinkung (Startseite, Footer, Menü) und Sitemap

**Dateien:**
- Neu: `src/components/OrteProvider.tsx`, Test: `src/app/__tests__/sitemap.test.ts`
- Ändern: `src/components/sections/ServiceAreas.tsx`, `src/components/layout/Footer.tsx`, `src/components/SiteShell.tsx`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `content/settings/site.json` (Menü)

- [ ] **Schritt 1: Sitemap-Test schreiben**

```ts
// src/app/__tests__/sitemap.test.ts
import { describe, expect, it, vi } from 'vitest'

vi.mock('@tina/__generated__/client', () => ({
  default: {
    queries: {
      settings: vi.fn().mockResolvedValue({ data: { settings: { seo: { url: 'https://www.taxigraz-gu.at' } } } }),
    },
  },
}))
vi.mock('@/lib/orte-data', () => ({
  listOrte: vi.fn().mockResolvedValue([{ slug: 'taxi-gratkorn', name: 'Gratkorn', region: 'graz-umgebung' }]),
}))

import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('enthält die Übersicht und alle Ortsseiten', async () => {
    expect((await sitemap()).map((e) => e.url)).toEqual([
      'https://www.taxigraz-gu.at',
      'https://www.taxigraz-gu.at/kontakt',
      'https://www.taxigraz-gu.at/einsatzgebiete',
      'https://www.taxigraz-gu.at/taxi-gratkorn',
      'https://www.taxigraz-gu.at/impressum',
      'https://www.taxigraz-gu.at/datenschutz',
    ])
  })
})
```

- [ ] **Schritt 2: Test läuft rot**

Run: `npx vitest run src/app/__tests__/sitemap.test.ts`. Erwartet: FAIL (Übersicht und Ort fehlen).

- [ ] **Schritt 3: Sitemap erweitern**

```ts
// src/app/sitemap.ts
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
```

- [ ] **Schritt 4: Test läuft grün**

Run: `npx vitest run src/app/__tests__/sitemap.test.ts src/app/__tests__/revalidate-config.test.ts`. Erwartet: PASS.

- [ ] **Schritt 5: `OrteProvider` und Weitergabe über das Layout**

```tsx
// src/components/OrteProvider.tsx
'use client'

import { createContext, useContext } from 'react'
import type { OrtSummary } from '@/lib/ort'

const OrteContext = createContext<OrtSummary[]>([])

export function OrteProvider({ orte, children }: { orte: OrtSummary[]; children: React.ReactNode }) {
  return <OrteContext.Provider value={orte}>{children}</OrteContext.Provider>
}

/** Alle Ortsseiten (vom Root-Layout geladen) – für Footer & Co. */
export function useOrte(): OrtSummary[] {
  return useContext(OrteContext)
}
```
`SiteShell.tsx`: Prop `orte: OrtSummary[]` in `SiteShellProps` ergänzen und innerhalb von `SettingsProvider` umschließen:
```tsx
    <SettingsProvider settings={site}>
      <OrteProvider orte={orte}>
        <CookieConsentProvider>
          {/* … unverändert … */}
        </CookieConsentProvider>
      </OrteProvider>
    </SettingsProvider>
```
`layout.tsx`: `<SiteShell settings={…} orte={orte}>`.

- [ ] **Schritt 6: Footer-Zeile „Einsatzgebiete“**

In `Footer.tsx` `useOrte` und `ortLinkLabel` importieren und zwischen dem Raster-`</div>` und `{/* Bottom bar */}` einfügen:
```tsx
        {orte.length > 0 && (
          <div className="border-t border-[var(--color-gray-700)] py-10">
            <h3
              className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-400)]"
              data-tina-field={tinaField(settings.areaLabels, 'footerHeading')}
            >
              {settings.areaLabels.footerHeading}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
              {orte.map((ort) => (
                <li key={ort.slug}>
                  <Link href={`/${ort.slug}`} className="text-sm text-[var(--color-gray-300)] transition-colors hover:text-[var(--color-gold)]">
                    {ortLinkLabel(ort.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
```
Oben im Component-Body: `const orte = useOrte()`.

- [ ] **Schritt 7: Startseite – Chips als Links und „Alle Einsatzgebiete“**

In `ServiceAreas.tsx` die Chips durch `AreaChip` ersetzen:
```tsx
        {areas.map((area, i) => (
          <AreaChip
            key={i}
            label={area.label}
            href={area.ort ? `/${area.ort._sys.filename}` : undefined}
            tinaFieldId={tinaField(area)}
          />
        ))}
```
In `ServiceAreas` nach der Gruppen-Liste (`useSettings`, `Link`, `ArrowRight` importieren; nicht mehr genutzte Imports `MapPin` im AreaGroup-Code entfernen, `MapPin` bleibt für `iconMap`):
```tsx
      <div className="mt-10 text-center">
        <Link
          href="/einsatzgebiete"
          data-tina-field={tinaField(settings.areaLabels, 'allAreas')}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold-dark)] hover:underline"
        >
          {settings.areaLabels.allAreas}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
```

- [ ] **Schritt 8: Menü auf die Übersicht**

```bash
node -e "
const fs=require('fs');const f='content/settings/site.json';const s=JSON.parse(fs.readFileSync(f,'utf8'))
for(const i of s.navigation.main)if(i.href==='/#gebiete')i.href='/einsatzgebiete'
fs.writeFileSync(f,JSON.stringify(s,null,2))"
grep -n 'einsatzgebiete' content/settings/site.json
```

- [ ] **Schritt 9: Prüfen**

```bash
npx tsc --noEmit && npm run lint && npm test -- --exclude src/lib/__tests__/content-orte.test.ts
curl -s localhost:3000/ | grep -o 'href="/taxi-[a-z-]*"\|href="/einsatzgebiete"' | sort | uniq -c
curl -s localhost:3000/sitemap.xml | grep -o '<loc>[^<]*</loc>'
```
Erwartet:
- Startseite: Links auf `/taxi-gratkorn` (Chip und Footer) und `/einsatzgebiete` (Menü, Link unter der Liste).
- Sitemap: enthält `/einsatzgebiete` und `/taxi-gratkorn`.
- Mobil: Menüpunkt „Service-Gebiete“ navigiert zu `/einsatzgebiete`.

- [ ] **Schritt 10: Commit**

```bash
git add src/components/OrteProvider.tsx src/components/SiteShell.tsx src/components/layout/Footer.tsx src/components/sections/ServiceAreas.tsx src/app/layout.tsx src/app/sitemap.ts src/app/__tests__/sitemap.test.ts content/settings/site.json
git commit -m "feat(orte): Verlinkung Startseite/Footer/Menü, Sitemap mit Übersicht und Orten" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

---

### Task 9: Inhalte der übrigen 11 Orte

**Dateien:** Neu: `content/orte/<slug>.json` ×11. Ändern: `content/orte/taxi-gratkorn.json` (Nachbarn), `content/pages/home.json` (Verweise und neue Chips).

Voraussetzung: Felix-OK aus Task 6, Schritt 16.

| Name | Datei | Region | Chip auf der Startseite (Gruppe → Label) | Ortsspezifische Punkte |
|---|---|---|---|---|
| Flughafen Graz | `taxi-flughafen-graz.json` | `spezial` | Spezial-Routen → „Taxi Graz Flughafen“ | Headline „Ihr Taxi zum“ + „Flughafen Graz“. Festpreise auf Anfrage, Abholung am Terminal, Früh-/Spätflüge, Gepäck, Vorbestellung. Fakten: Hauptplatz, Hauptbahnhof, dritte Kachel „Erreichbar“ → „24/7 – auch Früh- und Nachtflüge“ |
| Hart bei Graz | `taxi-hart-bei-graz.json` | `graz-umgebung` | Graz-Umgebung → „Taxi Hart bei Graz“ | Ortsteil **Pachern** im Text nennen; östlich von Graz |
| Laßnitzhöhe | `taxi-lassnitzhoehe.json` | `graz-umgebung` | Graz-Umgebung → „Taxi Laßnitzhöhe“ | Kurort/Reha-Zentrum, S-Bahn Laßnitzhöhe |
| Raaba-Grambach | `taxi-raaba-grambach.json` | `graz-umgebung` | Graz-Umgebung → Label „Taxi Raaba“ in „Taxi Raaba-Grambach“ ändern | Gewerbegebiet, Nähe A2 und Flughafen |
| Vasoldsberg | `taxi-vasoldsberg.json` | `graz-umgebung` | Graz-Umgebung → neuer Chip „Taxi Vasoldsberg“ | ländlich südöstlich von Graz |
| Hitzendorf | `taxi-hitzendorf.json` | `graz-umgebung` | Graz-Umgebung → neuer Chip „Taxi Hitzendorf“ | westlich von Graz, Weststeiermark-Richtung |
| Andritz | `taxi-andritz.json` | `graz-stadt` | Graz Stadt → „Taxi Graz Andritz“ | Highlight „Graz-Andritz“, 12. Bezirk, Norden |
| Eggenberg | `taxi-eggenberg.json` | `graz-stadt` | Graz Stadt → „Taxi Graz Eggenberg“ | Highlight „Graz-Eggenberg“, Schloss Eggenberg, Hauptbahnhof-Nähe |
| Gösting | `taxi-goesting.json` | `graz-stadt` | Graz Stadt → „Taxi Graz Gösting“ | Highlight „Graz-Gösting“, Burgruine Gösting, Norden-West |
| Mariatrost | `taxi-mariatrost.json` | `graz-stadt` | Graz Stadt → „Taxi Graz Mariatrost“ | Highlight „Graz-Mariatrost“, Basilika Mariatrost |
| Ragnitz | `taxi-ragnitz.json` | `graz-stadt` | Graz Stadt → neuer Chip „Taxi Graz Ragnitz“ | Highlight „Graz-Ragnitz“, Grazer Osten |

Die Orientierungspunkte in der letzten Spalte vor dem Schreiben per Web-Suche verifizieren. Was sich nicht bestätigen lässt, fliegt raus.

Pro Ort (Schritte 1–3 für jede Zeile wiederholen, jeder Ort ein eigener Commit):

- [ ] **Schritt 1: Datei schreiben**

Struktur wie `content/orte/taxi-gratkorn.json` (Task 6, Schritt 11). Fakten aus `docs/ortsseiten-distanzen.json` (`fahrten[…].text`), `nearby` = die bis zu 3 `nachbarn` aus derselben Datei als `{ "ort": "content/orte/<slug>.json" }`. Texte nach den **Inhaltsregeln**, dazu die ortsspezifischen Punkte aus der Tabelle.

- [ ] **Schritt 2: Chip auf der Startseite verknüpfen bzw. anlegen**

```bash
node -e "
const fs=require('fs');const f='content/pages/home.json';const h=JSON.parse(fs.readFileSync(f,'utf8'))
const [gruppe,label,neuesLabel,ref]=process.argv.slice(1)
const g=h.serviceAreas.groups.find(x=>x.title===gruppe)
let a=g.areas.find(x=>x.label===label)
if(!a){a={label};g.areas.push(a)}
if(neuesLabel)a.label=neuesLabel
a.ort=ref
fs.writeFileSync(f,JSON.stringify(h,null,2))" "Graz-Umgebung" "Taxi Raaba" "Taxi Raaba-Grambach" "content/orte/taxi-raaba-grambach.json"
```
Argumente: Gruppe, bestehendes Label, neues Label (oder `""`), Verweis. Gruppen-Titel: „Graz Stadt“, „Graz-Umgebung“, „Spezial-Routen“.

- [ ] **Schritt 3: Test und Commit**

```bash
npx vitest run src/lib/__tests__/content-orte.test.ts -t "<slug>.json"
git add content/orte/<slug>.json content/pages/home.json
git commit -m "content(orte): Ortsseite <Name>" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```
Erwartet: Alle Regeln für diese Datei sind grün, außer „Nachbarorte … existieren“, falls ein Nachbar noch nicht angelegt ist. Das löst sich, sobald alle Orte existieren.

- [ ] **Schritt 4: Gratkorn-Nachbarn nachtragen und Gesamtlauf**

`nearby` in `taxi-gratkorn.json` aus `docs/ortsseiten-distanzen.json` setzen. Dann:
```bash
npm test
```
Erwartet: **alles grün**, inklusive aller 12 Ortsdateien.

- [ ] **Schritt 5: Duplicate-Check (kein Namenstausch)**

```bash
node -e "
const fs=require('fs');const d='content/orte';const fl=fs.readdirSync(d)
const sh=t=>new Set(t.toLowerCase().replace(/[^a-zäöüß0-9 ]/g,'').split(/\s+/).map((w,i,a)=>a.slice(i,i+5).join(' ')).filter(s=>s.split(' ').length===5))
const b=Object.fromEntries(fl.map(f=>[f,sh(JSON.parse(fs.readFileSync(d+'/'+f,'utf8')).local.body)]))
for(const x of fl)for(const y of fl)if(x<y){const i=[...b[x]].filter(s=>b[y].has(s)).length;const r=i/Math.min(b[x].size,b[y].size);if(r>0.15)console.log(x,y,(r*100).toFixed(0)+'%')}
console.log('fertig')"
```
Erwartet: kein Paar über 15 % gemeinsamer 5-Wort-Folgen. Sonst die betroffenen Texte umschreiben.

- [ ] **Schritt 6: Commit Gratkorn-Nachbarn**

```bash
git add content/orte/taxi-gratkorn.json
git commit -m "content(orte): Nachbarorte für Gratkorn" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

---

### Task 10: Qualitätssicherung und Doku

**Dateien:** Ändern: `docs/tina-cloud-setup.md`, `docs/superpowers/specs/2026-09-21-ortsseiten-design.md` (Abweichungen)

- [ ] **Schritt 1: Voller Lauf**

```bash
npm run lint && npm test && npx tsc --noEmit && npm run build:local
```
Erwartet: alles grün. Im Build erscheinen `/einsatzgebiete` und 12× `/[slug]` als vorab erzeugt (●/SSG).

- [ ] **Schritt 2: Screenshots (Dev-Server, Desktop 1440 und Mobil 390, vorher scrollen wie in Task 6)**

Seiten: `/` (verglichen mit dem Live-Stand www.taxigraz-gu.at – Abweichungen **nur** Chip-Links, „Alle Einsatzgebiete“, Footer-Zeile), `/taxi-flughafen-graz`, `/taxi-raaba-grambach` (langer Name im Hero), `/taxi-andritz`, `/einsatzgebiete`. Dabei prüfen:
- Hero-Überschrift ohne horizontales Scrollen bei 390 px.
- Genau eine H1 pro Seite.
- Footer-Spalten brechen sauber um.

- [ ] **Schritt 3: Admin-Durchlauf lokal (`npm run dev`, http://localhost:3000/admin)**
  1. Ortsseiten › Gratkorn öffnen: Die Vorschau zeigt `/taxi-gratkorn`. Die Überschrift ändern und prüfen, ob die Vorschau live mitläuft. **Nicht speichern.**
  2. Einen neuen Ort „Testort“ anlegen (Region Graz-Umgebung, Pflichtfelder kurz füllen) und speichern. `content/orte/taxi-testort.json` existiert, `/taxi-testort` liefert 200, der Footer und die Sitemap enthalten ihn.
  3. „Testort“ im Admin löschen. Die Datei ist weg, `/taxi-testort` liefert 404.
  4. `git status`: kein Rest.

- [ ] **Schritt 4: Kundenanleitung ergänzen**

In `docs/tina-cloud-setup.md` Abschnitt 6 (Kurzanleitung) um Punkt 7 erweitern:
```markdown
7. **Neue Ortsseite anlegen:** Links „Ortsseiten“ → „Add File“ → Ortsname eintragen (daraus entsteht automatisch die Adresse, z. B. „Premstätten“ → /taxi-premstaetten), Region wählen, alle Felder ausfüllen (Text 300–500 Wörter über den Ort, 3 Fakten-Kacheln, 3–5 Fragen, 2–4 Nachbarorte) → „Save“. Die Seite erscheint nach spätestens einer Minute unter „Einsatzgebiete“, im Footer und in der Sitemap. Damit sie auch auf der Startseite verlinkt ist: Startseite → Service-Gebiete → Eintrag wählen → „Verknüpfte Ortsseite“ setzen. Bitte keine Seiten anlegen, in denen nur der Ortsname ausgetauscht ist – Google wertet das als Spam.
```
Und in Abschnitt 5 unter „Bekannte Grenzen“ ergänzen: „Der Ortsname lässt sich nach dem Anlegen ändern, die Adresse (Dateiname) nicht. Für eine neue Adresse: Seite neu anlegen, alte löschen (und eine Weiterleitung einrichten lassen).“

- [ ] **Schritt 5: Abweichungen in der Spec festhalten**

Am Ende der Spec einen Abschnitt „## Abweichungen in der Umsetzung (2026-09-xx)“ mit allem, was von der Spec abwich (mindestens: Test-Grenze 300–550 Wörter; Fakten-Kacheln = genau 3; Flughafen-Seite mit Kachel „Erreichbar“; weitere während der Umsetzung).

- [ ] **Schritt 6: Commit**

```bash
git add docs/
git commit -m "docs: Kundenanleitung Ortsseiten, Spec-Abweichungen" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
```

---

### Task 11: Rollout

- [ ] **Schritt 1: ⏸ Felix: Tina Cloud muss den Branch `feat/ortsseiten` kennen** (app.tina.io › Projekt › Branches). Danach pushen:

```bash
git fetch origin && git rebase origin/main
git push origin feat/ortsseiten
```
Vercel baut ein Preview. Felix gibt die Preview-URL weiter.

- [ ] **Schritt 2: Preview prüfen**

```bash
P=<preview-url>
for p in / /einsatzgebiete /taxi-gratkorn /taxi-flughafen-graz /taxi-hart-bei-graz /taxi-lassnitzhoehe /taxi-raaba-grambach /taxi-vasoldsberg /taxi-hitzendorf /taxi-andritz /taxi-eggenberg /taxi-goesting /taxi-mariatrost /taxi-ragnitz /taxi-gibtsnicht /admin /sitemap.xml; do printf "%-26s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' $P$p)"; done
npx lighthouse "$P/taxi-gratkorn" --only-categories=performance,seo --form-factor=mobile --quiet --chrome-flags="--headless" --output=json --output-path=./lh.json && node -e "const r=require('./lh.json');console.log('Perf',r.categories.performance.score,'SEO',r.categories.seo.score,'LCP',r.audits['largest-contentful-paint'].displayValue,'CLS',r.audits['cumulative-layout-shift'].displayValue)" && rm lh.json
```
Erwartet:
- 200 überall, außer `/taxi-gibtsnicht` mit 404.
- LCP unter 2,5 s, CLS 0.
- SEO-Score ≥ 0,9. Preview-Seiten tragen `noindex` über den Vercel-Header, das drückt den SEO-Score. Dann auf den Live-Check verschieben.

- [ ] **Schritt 3: ⏸ Felix prüft die Texte auf der Preview.** Korrekturen einarbeiten, committen und erneut pushen.

- [ ] **Schritt 4: Merge und Deploy (nach Felix-OK)**

```bash
git checkout main && git pull --ff-only origin main
git merge --no-ff feat/ortsseiten -m "Merge feat/ortsseiten: 12 Ortsseiten und Einsatzgebiete-Übersicht" -m "Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HaEZBSiXskGbYjfZrJufpB"
git push origin main && git push vercel main
```

- [ ] **Schritt 5: Live-Check**

Wie Schritt 2 gegen `https://www.taxigraz-gu.at`, zusätzlich:
```bash
for p in /taxi-gratkorn /einsatzgebiete /kontakt; do echo "== $p"; curl -s https://www.taxigraz-gu.at$p | grep -o '<title>[^<]*</title>\|<link rel="canonical"[^>]*>\|"@type":"[A-Za-z]*"' | sort | uniq -c; done
```
Erwartet: Titles und Canonicals auf www. `/kontakt` hat **kein** FAQPage. Rich-Results-Test (search.google.com/test/rich-results) für `/taxi-gratkorn` ohne Fehler (Felix oder per Browser).

- [ ] **Schritt 6: ⏸ Felix: Search Console** – Sitemap erneut einreichen und die URL-Prüfung mit „Indexierung beantragen“ für `/einsatzgebiete`, `/taxi-gratkorn`, `/taxi-hart-bei-graz`, `/taxi-flughafen-graz` und `/taxi-lassnitzhoehe` durchführen. Unser API-Zugang ist nur lesend.

- [ ] **Schritt 7: Nachhalten**

Memory `project-taxigraz-ortsseiten` auf „live seit <Datum>“ setzen. In 4–6 Wochen per GSC-Skript (Memory `feedback-gsc-kundenproperties-selbst-abfragen`) die Positionen der Ortssuchen mit der Ausgangslage aus der Spec vergleichen. Die Kandidaten für die zweite Welle (Spec, Schlussabschnitt) dem Kunden anbieten.
