'use client'

import { motion } from 'framer-motion'
import { tinaField } from 'tinacms/dist/react'
import type { HomeQuery } from '@tina/__generated__/types'
import { Section } from '@/components/layout/Section'
import { Accordion } from '@/components/ui'
import { useSettings } from '@/components/SettingsProvider'
import { compact, interpolate } from '@/lib/site'

export type FaqData = NonNullable<HomeQuery['home']['faq']>

export function FAQ({ data }: { data: FaqData }) {
  const settings = useSettings()
  const items = compact(data.items).map((item) => ({
    question: item.question,
    answer: interpolate(item.answer, settings),
  }))

  return (
    <Section id="faq" className="bg-[var(--color-gray-50)]" narrow>
      <div className="text-center">
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
      </div>

      <motion.div
        data-tina-field={tinaField(data, 'items')}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 rounded-2xl border border-[var(--color-border)] bg-white px-6 md:px-8"
      >
        <Accordion items={items} />
      </motion.div>
    </Section>
  )
}
