import { describe, expect, it } from 'vitest'
import { compact, interpolate, phoneRaw, required, whatsappLink, type SiteSettings } from '@/lib/site'

const settings = {
  contact: { phone: '+43 660 1083003', whatsapp: '436601083003', email: 'info@taxigraz-gu.at' },
  google: { rating: 4.9, reviews: 673, mapsUrl: 'https://maps.example' },
} as unknown as SiteSettings

describe('phoneRaw', () => {
  it('entfernt Leerzeichen und Sonderzeichen, behält +', () => {
    expect(phoneRaw('+43 660 1083003')).toBe('+436601083003')
    expect(phoneRaw('0316 / 12 34-56')).toBe('0316123456')
  })
})

describe('whatsappLink', () => {
  it('baut einen wa.me-Link nur aus Ziffern', () => {
    expect(whatsappLink('436601083003')).toBe('https://wa.me/436601083003')
    expect(whatsappLink('+43 660 1083003')).toBe('https://wa.me/436601083003')
  })
})

describe('interpolate', () => {
  it('ersetzt alle bekannten Platzhalter', () => {
    expect(interpolate('Ruf {phone} an oder schreib {email}. {rating}★ bei {reviews} Bewertungen.', settings)).toBe(
      'Ruf +43 660 1083003 an oder schreib info@taxigraz-gu.at. 4.9★ bei 673 Bewertungen.'
    )
  })
  it('lässt unbekannte Platzhalter stehen', () => {
    expect(interpolate('Hallo {name}', settings)).toBe('Hallo {name}')
  })
})

describe('compact', () => {
  it('filtert null/undefined und behandelt fehlende Listen', () => {
    expect(compact([1, null, 2, undefined])).toEqual([1, 2])
    expect(compact(null)).toEqual([])
    expect(compact(undefined)).toEqual([])
  })
})

describe('required', () => {
  it('gibt den Wert zurück oder wirft mit Namen', () => {
    expect(required('x', 'feld')).toBe('x')
    expect(() => required(null, 'home.hero')).toThrow('home.hero')
  })
})
