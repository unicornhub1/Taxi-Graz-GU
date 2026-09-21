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
