export interface Hsl {
  h: number // 0–360
  s: number // 0–1
  l: number // 0–1
}

function normalizeHex(hex: string): string {
  const clean = hex.trim().replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  return `#${full.toUpperCase()}`
}

export function hexToHsl(hex: string): Hsl {
  const full = normalizeHex(hex).slice(1)
  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
  else if (max === g) h = (b - r) / d + 2
  else h = (r - g) / d + 4
  return { h: h * 60, s, l }
}

export function hslToHex({ h, s, l }: Hsl): string {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase()
}

export interface AccentPalette {
  base: string
  light: string
  dark: string
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/** Leitet Hell-/Dunkel-Variante der Akzentfarbe ab (entspricht dem Verhältnis #E8B931 → #F5D668 / #C99B1D). */
export function deriveAccentPalette(hex: string): AccentPalette {
  const hsl = hexToHsl(hex)
  return {
    base: normalizeHex(hex),
    light: hslToHex({ ...hsl, l: clamp(hsl.l + 0.13, 0, 0.95) }),
    dark: hslToHex({ ...hsl, l: clamp(hsl.l - 0.1, 0.05, 1) }),
  }
}

/** CSS-Variablen für <html style> – Namen entsprechen globals.css. */
export function accentCssVars(hex: string): Record<string, string> {
  const p = deriveAccentPalette(hex)
  return {
    '--color-gold': p.base,
    '--color-gold-light': p.light,
    '--color-gold-dark': p.dark,
    '--accent': p.base,
  }
}
