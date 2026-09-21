'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import { Section } from '@/components/layout/Section'
import { AreaChip } from '@/components/ui/AreaChip'
import { useSettings } from '@/components/SettingsProvider'
import { ortLinkLabel } from '@/lib/ort'

export function NearbyAreas({
  items,
  intro,
  introField,
}: {
  items: { slug: string; name: string }[]
  intro?: string | null
  introField?: string
}) {
  const { areaLabels } = useSettings()
  if (items.length === 0) return null
  return (
    <Section id="nachbarorte" className="bg-white">
      <div className="text-center">
        <span
          data-tina-field={tinaField(areaLabels, 'nearbyEyebrow')}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
        >
          {areaLabels.nearbyEyebrow}
        </span>
        <h2
          data-tina-field={tinaField(areaLabels, 'nearbyHeading')}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
        >
          {areaLabels.nearbyHeading}
        </h2>
        {intro && (
          <p data-tina-field={introField} className="mx-auto mt-4 max-w-2xl text-[var(--color-gray-500)]">
            {intro}
          </p>
        )}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {items.map((item) => (
          <AreaChip key={item.slug} label={ortLinkLabel(item.name)} href={`/${item.slug}`} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/einsatzgebiete"
          data-tina-field={tinaField(areaLabels, 'allAreas')}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-gold-dark)] hover:underline"
        >
          {areaLabels.allAreas}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  )
}
