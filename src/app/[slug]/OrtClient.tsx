'use client'

import { useTina, tinaField } from 'tinacms/dist/react'
import type { HomeQuery, OrtQuery } from '@tina/__generated__/types'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Breadcrumbs } from '@/components/sections/Breadcrumbs'
import { LocalInfo } from '@/components/sections/LocalInfo'
import { LocalPrices } from '@/components/sections/LocalPrices'
import { OrderSteps } from '@/components/sections/OrderSteps'
import { Services } from '@/components/sections/Services'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { NearbyAreas } from '@/components/sections/NearbyAreas'
import { CTA } from '@/components/sections/CTA'
import { useSettings } from '@/components/SettingsProvider'
import { compact } from '@/lib/site'

export interface OrtClientProps {
  data: OrtQuery
  query: string
  variables: { relativePath: string }
  home: HomeQuery['home']
}

export function OrtClient({ home, ...tina }: OrtClientProps) {
  const { data } = useTina(tina)
  const ort = data.ort
  const { areaLabels } = useSettings()
  // Texte vom Ort, Button-Beschriftungen/Kontaktkarte/Scroll-Hinweis von der Startseite.
  const hero = { ...home.hero, ...ort.hero }
  const nearby = compact(ort.nearby).flatMap(({ ort: ref }) => (ref ? [{ slug: ref._sys.filename, name: ref.name }] : []))

  return (
    <>
      <Hero data={hero} imageSrc={ort.heroImage} imageField={tinaField(ort, 'heroImage')} />
      <TrustBar data={home.trustBar} />
      <Breadcrumbs
        items={[
          { label: areaLabels.breadcrumbHome, href: '/' },
          { label: areaLabels.breadcrumbHub, href: '/einsatzgebiete' },
          { label: ort.name },
        ]}
      />
      <LocalInfo data={ort.local} />
      <OrderSteps data={ort.order} />
      {ort.prices && <LocalPrices data={ort.prices} />}
      <Services data={home.services} />
      <Testimonials data={home.testimonials} />
      <FAQ data={ort.faq} />
      <NearbyAreas items={nearby} intro={ort.nearbyIntro} introField={tinaField(ort, 'nearbyIntro')} />
      <CTA data={home.cta} />
    </>
  )
}
