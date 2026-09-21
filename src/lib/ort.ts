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
