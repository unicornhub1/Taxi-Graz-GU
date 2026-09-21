import { interpolate, type SiteSettings } from './site'
import { ortLinkLabel } from './ort'

const CONTEXT = 'https://schema.org'

type Area = { '@type': string; name: string }

const BASE_AREAS: Area[] = [
  { '@type': 'City', name: 'Graz' },
  { '@type': 'AdministrativeArea', name: 'Graz-Umgebung' },
  { '@type': 'Place', name: 'Flughafen Graz' },
]

export const taxiServiceId = (s: SiteSettings) => `${s.seo.url}/#taxiservice`

/** Das Unternehmen – auf jeder Seite (Root-Layout). */
export function taxiServiceSchema(
  s: SiteSettings,
  services: { title: string; description: string }[],
  orte: { name: string }[]
) {
  const known = new Set(BASE_AREAS.map((a) => a.name))
  const areaServed: Area[] = [
    ...BASE_AREAS,
    ...orte.filter((o) => !known.has(o.name)).map((o) => ({ '@type': 'Place', name: o.name })),
  ]
  return {
    '@context': CONTEXT,
    '@type': 'TaxiService',
    '@id': taxiServiceId(s),
    name: s.seo.siteName,
    alternateName: 'Taxi Graz //GU',
    description: interpolate(s.seo.description, s),
    url: s.seo.url,
    telephone: s.contact.phone,
    email: s.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      postalCode: s.address.zip,
      addressCountry: 'AT',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 47.0500761, longitude: 15.4743797 },
    areaServed,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: s.google.rating,
      reviewCount: s.google.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: '€€',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'EUR',
    sameAs: [s.google.mapsUrl],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Taxi-Leistungen',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.description },
      })),
    },
  }
}

/** FAQ – nur auf der Seite, deren Fragen sichtbar sind. */
export function faqPageSchema(items: { question: string; answer: string }[], s: SiteSettings) {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: interpolate(item.answer, s) },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[], s: SiteSettings) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${s.seo.url}${item.path}`,
    })),
  }
}

/** Taxi-Leistung für einen Ort, verknüpft mit dem Unternehmen über dessen @id. */
export function ortServiceSchema(s: SiteSettings, ort: { name: string; slug: string }) {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    serviceType: 'Taxi',
    name: ortLinkLabel(ort.name),
    url: `${s.seo.url}/${ort.slug}`,
    areaServed: { '@type': 'Place', name: ort.name },
    provider: { '@id': taxiServiceId(s) },
  }
}
