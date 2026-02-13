import { SITE_CONFIG } from '@/lib/constants'
import { faq } from '@/data/faq'

function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: SITE_CONFIG.name,
    alternateName: 'Taxi Graz //GU',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: 'AT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.0500761,
      longitude: 15.4743797,
    },
    areaServed: [
      { '@type': 'City', name: 'Graz' },
      { '@type': 'AdministrativeArea', name: 'Graz-Umgebung' },
      { '@type': 'Place', name: 'Flughafen Graz' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE_CONFIG.google.rating,
      reviewCount: SITE_CONFIG.google.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: '€€',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'EUR',
    sameAs: [SITE_CONFIG.google.mapsUrl],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Taxi-Leistungen',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Flughafentransfer Graz',
            description: 'Zuverlässiger Transfer zum Flughafen Graz und zurück. Pünktliche Abholung garantiert – auch bei Frühflügen.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stretchlimousinen',
            description: 'Stilvolle Stretchlimousinen für besondere Anlässe wie Hochzeiten, Geburtstage oder Geschäftsfahrten.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Botenfahrten',
            description: 'Schnelle und zuverlässige Kurier- und Botenfahrten in Graz und Umgebung.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Taxi-Service 24/7',
            description: 'Rund um die Uhr Taxi-Service in Graz und Graz-Umgebung.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Barrierefreie Fahrten',
            description: 'Rollstuhlgerechte Fahrzeuge für mobilitätseingeschränkte Fahrgäste.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: SITE_CONFIG.url,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function StructuredData() {
  return (
    <>
      <LocalBusinessSchema />
      <FAQSchema />
      <BreadcrumbSchema />
    </>
  )
}
