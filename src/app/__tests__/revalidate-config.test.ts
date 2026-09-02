import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// ISR: Inhalte kommen zur Laufzeit aus Tina Cloud. Das Root-Layout deckt alle Seiten ab,
// Metadata-Routen (Sitemap, Robots, OG-Bild) brauchen die Angabe einzeln.
const ROUTES = ['src/app/layout.tsx', 'src/app/sitemap.ts', 'src/app/robots.ts', 'src/app/opengraph-image.tsx']

describe('ISR-Revalidierung', () => {
  it.each(ROUTES)('%s exportiert revalidate = 60', (file) => {
    const src = readFileSync(file, 'utf8')
    expect(src).toMatch(/^export const revalidate = 60$/m)
  })
})
