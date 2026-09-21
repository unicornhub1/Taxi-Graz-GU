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
