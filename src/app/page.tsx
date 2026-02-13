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

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Marquee />
      <Services />
      <WhyUs />
      <Pricing />
      <ServiceAreas />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
