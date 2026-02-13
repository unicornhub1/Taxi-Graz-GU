'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { Accordion } from '@/components/ui'
import { faq } from '@/data/faq'

export function FAQ() {
  return (
    <Section id="faq" className="bg-[var(--color-gray-50)]" narrow>
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
        >
          Häufige Fragen
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
        >
          Häufig gestellte Fragen
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 rounded-2xl border border-[var(--color-border)] bg-white px-6 md:px-8"
      >
        <Accordion items={faq} />
      </motion.div>
    </Section>
  )
}
