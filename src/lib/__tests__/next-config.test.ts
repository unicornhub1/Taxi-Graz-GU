import { describe, expect, it } from 'vitest'
import nextConfig from '../../../next.config'

// Tina Cloud liefert Bildfelder (Hero-Hintergrund, Logo) als https://assets.tina.io/<clientId>/… aus.
// Ohne Freigabe der Domain antwortet /_next/image mit 400 INVALID_IMAGE_OPTIMIZE_REQUEST.
describe('next.config images', () => {
  it('erlaubt assets.tina.io für next/image', () => {
    const patterns = nextConfig.images?.remotePatterns ?? []
    const tina = patterns.find((p) => p.hostname === 'assets.tina.io')
    expect(tina).toBeDefined()
    expect(tina?.protocol).toBe('https')
  })
})
