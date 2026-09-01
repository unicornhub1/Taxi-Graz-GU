import { describe, expect, it } from 'vitest'
import { accentCssVars, deriveAccentPalette, hexToHsl, hslToHex } from '@/lib/color'

describe('hexToHsl / hslToHex', () => {
  it('wandelt reines Rot korrekt um', () => {
    expect(hexToHsl('#FF0000')).toEqual({ h: 0, s: 1, l: 0.5 })
    expect(hslToHex({ h: 0, s: 1, l: 0.5 })).toBe('#FF0000')
  })

  it('akzeptiert Kurzform und Kleinschreibung', () => {
    expect(hexToHsl('#fff')).toEqual({ h: 0, s: 0, l: 1 })
    expect(hslToHex({ h: 120, s: 1, l: 0.25 })).toBe('#008000')
  })

  it('Roundtrip bleibt innerhalb von ±1 pro Kanal', () => {
    const out = hslToHex(hexToHsl('#E8B931'))
    const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
    const [a, b] = [channels(out), channels('#E8B931')]
    a.forEach((v, i) => expect(Math.abs(v - b[i])).toBeLessThanOrEqual(1))
  })
})

describe('deriveAccentPalette', () => {
  it('liefert die Eingabe normalisiert als base', () => {
    expect(deriveAccentPalette('#e8b931').base).toBe('#E8B931')
  })

  it('hellt light auf und dunkelt dark ab, Farbton bleibt', () => {
    const p = deriveAccentPalette('#2E86DE')
    const base = hexToHsl(p.base), light = hexToHsl(p.light), dark = hexToHsl(p.dark)
    expect(light.l).toBeGreaterThan(base.l)
    expect(dark.l).toBeLessThan(base.l)
    expect(Math.abs(light.h - base.h)).toBeLessThan(2)
    expect(Math.abs(dark.h - base.h)).toBeLessThan(2)
  })

  it('liefert für die Standardfarbe exakt die Originaltöne', () => {
    expect(deriveAccentPalette('#e8b931')).toEqual({ base: '#E8B931', light: '#F5D668', dark: '#C99B1D' })
  })

  it('clamped an den Rändern', () => {
    expect(hexToHsl(deriveAccentPalette('#FFFFFF').light).l).toBeLessThanOrEqual(0.95)
    expect(hexToHsl(deriveAccentPalette('#000000').dark).l).toBeGreaterThanOrEqual(0.05)
  })
})

describe('accentCssVars', () => {
  it('setzt alle vier Variablen', () => {
    const vars = accentCssVars('#E8B931')
    expect(vars['--color-gold']).toBe('#E8B931')
    expect(vars['--accent']).toBe('#E8B931')
    expect(vars['--color-gold-light']).toBe('#F5D668')
    expect(vars['--color-gold-dark']).toBe('#C99B1D')
  })
})
