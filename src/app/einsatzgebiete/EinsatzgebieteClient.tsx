'use client'

import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import type { EinsatzgebieteQuery, HomeQuery } from '@tina/__generated__/types'
import { Section } from '@/components/layout/Section'
import { Breadcrumbs } from '@/components/sections/Breadcrumbs'
import { CTA } from '@/components/sections/CTA'
import { useSettings } from '@/components/SettingsProvider'
import { groupByRegion, ortLinkLabel, type OrtSummary, type Region } from '@/lib/ort'
import { interpolate } from '@/lib/site'
import { goldGridStyle } from '@/lib/styles'

const LABEL_KEY: Record<Region, 'grazStadt' | 'grazUmgebung' | 'spezial'> = {
  'graz-stadt': 'grazStadt',
  'graz-umgebung': 'grazUmgebung',
  spezial: 'spezial',
}

export interface EinsatzgebieteClientProps {
  data: EinsatzgebieteQuery
  query: string
  variables: { relativePath: string }
  orte: OrtSummary[]
  cta: HomeQuery['home']['cta']
}

export function EinsatzgebieteClient({ orte, cta, ...tina }: EinsatzgebieteClientProps) {
  const { data } = useTina(tina)
  const page = data.einsatzgebiete
  const settings = useSettings()

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-gray-900)] pt-40 pb-16">
        <div className="absolute -left-[20%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/15 via-[var(--color-gold)]/5 to-transparent blur-3xl" />
        <div className="absolute -right-[15%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-[var(--color-gold)]/[0.06] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={goldGridStyle} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-gray-900)] via-[var(--color-gray-900)]/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]" data-tina-field={tinaField(page.hero, 'eyebrow')}>
            {page.hero.eyebrow}
          </span>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl" data-tina-field={tinaField(page.hero, 'heading')}>
            {page.hero.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-gray-400)] md:text-lg" data-tina-field={tinaField(page.hero, 'text')}>
            {interpolate(page.hero.text, settings)}
          </p>
        </div>
      </section>

      <Breadcrumbs items={[{ label: settings.areaLabels.breadcrumbHome, href: '/' }, { label: settings.areaLabels.breadcrumbHub }]} />
      <Section className="bg-[var(--color-cream)] pt-10 md:pt-12">
        <div className="space-y-14">
          {groupByRegion(orte).map((group) => (
            <div key={group.region}>
              <h2
                className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
                data-tina-field={tinaField(page.groupLabels, LABEL_KEY[group.region])}
              >
                {page.groupLabels[LABEL_KEY[group.region]]}
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.orte.map((ort) => (
                  <li key={ort.slug}>
                    <Link
                      href={`/${ort.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:shadow-lg"
                    >
                      <span className="flex items-center gap-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-black)]">
                        <MapPin className="h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                        {ortLinkLabel(ort.name, settings.areaLabels.linkPrefix)}
                      </span>
                      {ort.fact && <span className="mt-2 text-sm text-[var(--color-gray-500)]">{ort.fact}</span>}
                      <span
                        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[var(--color-gold-dark)]"
                        data-tina-field={tinaField(page, 'cardLinkLabel')}
                      >
                        {page.cardLinkLabel}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CTA data={cta} />
    </>
  )
}
