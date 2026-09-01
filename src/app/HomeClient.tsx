'use client'

import { useTina } from 'tinacms/dist/react'
import type { HomeQuery } from '@tina/__generated__/types'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Marquee } from '@/components/sections/Marquee'
import { Services } from '@/components/sections/Services'
import { WhyUs } from '@/components/sections/WhyUs'
import { Pricing } from '@/components/sections/Pricing'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'

export interface HomeClientProps {
  data: HomeQuery
  query: string
  variables: { relativePath: string }
}

export function HomeClient(props: HomeClientProps) {
  const { data } = useTina(props)
  const home = data.home

  return (
    <>
      <Hero data={home.hero} />
      <TrustBar data={home.trustBar} />
      <Marquee data={home.marquee} />
      <Services data={home.services} />
      <WhyUs data={home.whyUs} />
      <Pricing data={home.pricing} />
      <ServiceAreas data={home.serviceAreas} />
      <Testimonials data={home.testimonials} />
      <FAQ data={home.faq} />
      <CTA data={home.cta} />
    </>
  )
}
