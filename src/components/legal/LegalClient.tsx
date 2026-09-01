'use client'

import { useTina, tinaField } from 'tinacms/dist/react'
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text'
import type { LegalQuery } from '@tina/__generated__/types'
import { Section } from '@/components/layout/Section'
import { CompanyBlock } from './CompanyBlock'
import { legalComponents } from './markdownComponents'

export interface LegalClientProps {
  data: LegalQuery
  query: string
  variables: { relativePath: string }
}

export function LegalClient(props: LegalClientProps) {
  const { data } = useTina(props)
  const page = data.legal

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-gray-900)] pt-44 pb-20">
        <div className="absolute -left-[20%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/12 via-[var(--color-gold)]/3 to-transparent blur-3xl" />
        <div className="absolute -right-[15%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-[var(--color-gold)]/[0.05] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-gray-900)] via-[var(--color-gray-900)]/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">Rechtliches</span>
          <h1
            data-tina-field={tinaField(page, 'title')}
            className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {page.title}
          </h1>
          <p data-tina-field={tinaField(page, 'intro')} className="mt-3 text-[var(--color-gray-400)]">
            {page.intro}
          </p>
        </div>
      </section>

      <Section className="bg-[var(--color-cream)]">
        <div className="space-y-8 text-[var(--color-gray-600)] leading-relaxed">
          {page.showCompanyBlock && <CompanyBlock />}
          <div data-tina-field={tinaField(page, 'body')}>
            <TinaMarkdown content={page.body as TinaMarkdownContent} components={legalComponents} />
          </div>
        </div>
      </Section>
    </>
  )
}
