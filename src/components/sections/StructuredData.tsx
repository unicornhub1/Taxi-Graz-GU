import type { SiteSettings } from '@/lib/site'
import { interpolate } from '@/lib/site'

export interface StructuredDataProps {
  settings: SiteSettings
  faq: { question: string; answer: string }[]
  services: { title: string; description: string }[]
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function StructuredData({ settings, faq, services }: StructuredDataProps) {
  const s = settings
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
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
    areaServed: [
      { '@type': 'City', name: 'Graz' },
      { '@type': 'AdministrativeArea', name: 'Graz-Umgebung' },
      { '@type': 'Place', name: 'Flughafen Graz' },
    ],
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

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: interpolate(item.answer, s) },
    })),
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: s.seo.url },
      { '@type': 'ListItem', position: 2, name: 'Kontakt', item: `${s.seo.url}/kontakt` },
      { '@type': 'ListItem', position: 3, name: 'Impressum', item: `${s.seo.url}/impressum` },
      { '@type': 'ListItem', position: 4, name: 'Datenschutz', item: `${s.seo.url}/datenschutz` },
    ],
  }

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={faqPage} />
      <JsonLd data={breadcrumbs} />
    </>
  )
}
