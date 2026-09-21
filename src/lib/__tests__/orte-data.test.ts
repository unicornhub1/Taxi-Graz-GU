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
