'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text'
import { Section } from '@/components/layout/Section'
import { legalComponents } from '@/components/legal/markdownComponents'
import { compact } from '@/lib/site'

export type LocalInfoData = {
  eyebrow: string
  heading: string
  body: unknown
  facts?: ReadonlyArray<{ label: string; value: string } | null> | null
}

export function LocalInfo({ data }: { data: LocalInfoData }) {
  const facts = compact(data.facts)
  return (
    <Section id="ort" className="bg-[var(--color-cream)]">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <motion.span
            data-tina-field={tinaField(data, 'eyebrow')}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
          >
            {data.eyebrow}
          </motion.span>
          <motion.h2
            data-tina-field={tinaField(data, 'heading')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
          >
            {data.heading}
          </motion.h2>
          <motion.div
            data-tina-field={tinaField(data, 'body')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 leading-relaxed text-[var(--color-gray-600)]"
          >
            <TinaMarkdown content={data.body as TinaMarkdownContent} components={legalComponents} />
          </motion.div>
        </div>
        <motion.ul
          data-tina-field={tinaField(data, 'facts')}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid gap-4 self-start sm:grid-cols-3 lg:sticky lg:top-28 lg:col-span-5 lg:grid-cols-1"
        >
          {facts.map((fact, i) => (
            <li key={i} data-tina-field={tinaField(fact)} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
                <MapPin className="h-4 w-4 text-[var(--color-gold)]" />
                {fact.label}
              </span>
              <p className="mt-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-black)]">{fact.value}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}
