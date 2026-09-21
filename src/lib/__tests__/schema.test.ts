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
