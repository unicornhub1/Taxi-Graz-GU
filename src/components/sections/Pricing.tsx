'use client'

import { motion } from 'framer-motion'
import { Phone, Check, MessageCircle } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import type { HomeQuery } from '@tina/__generated__/types'
import { Section } from '@/components/layout/Section'
import { useSettings } from '@/components/SettingsProvider'
import { compact, interpolate, phoneRaw, whatsappLink } from '@/lib/site'

export type PricingData = NonNullable<HomeQuery['home']['pricing']>

export function Pricing({ data }: { data: PricingData }) {
  const settings = useSettings()
  const benefits = compact(data.benefits)
  const tel = `tel:${phoneRaw(settings.contact.phone)}`

  return (
    <Section id="preise" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]"
            data-tina-field={tinaField(data, 'eyebrow')}
          >
            {data.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
            data-tina-field={tinaField(data, 'heading')}
          >
            {data.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[var(--color-gray-500)] leading-relaxed"
            data-tina-field={tinaField(data, 'text')}
          >
            {interpolate(data.text, settings)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href={tel}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-bold text-[var(--color-black)] transition-all duration-300 hover:bg-[var(--color-gold-dark)] hover:shadow-lg hover:shadow-[var(--color-gold)]/20"
            >
              <Phone className="h-4 w-4" />
              <span data-tina-field={tinaField(data, 'ctaCall')}>{data.ctaCall}</span>
            </a>
            <a
              href={whatsappLink(settings.contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-green-500/30 px-6 py-3 text-sm font-bold text-green-600 transition-all duration-300 hover:bg-green-500/5 hover:border-green-500/50"
            >
              <MessageCircle className="h-4 w-4" />
              <span data-tina-field={tinaField(data, 'ctaWhatsapp')}>{data.ctaWhatsapp}</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-gray-50)] p-6 md:p-8"
        >
          <h3 className="text-lg font-bold text-[var(--color-black)]" data-tina-field={tinaField(data, 'boxTitle')}>
            {data.boxTitle}
          </h3>
          <div className="mt-6 space-y-4" data-tina-field={tinaField(data, 'benefits')}>
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/15">
                  <Check className="h-3.5 w-3.5 text-[var(--color-gold-dark)]" />
                </div>
                <span className="text-sm font-medium text-[var(--color-gray-700)]">{benefit}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-[var(--color-gold)]/10 px-5 py-4 text-center">
            <p className="text-sm font-bold text-[var(--color-gold-dark)]" data-tina-field={tinaField(data, 'boxCtaText')}>
              {interpolate(data.boxCtaText, settings)}
            </p>
            <a
              href={tel}
              className="mt-1 block text-2xl font-bold text-[var(--color-black)] hover:text-[var(--color-gold-dark)] transition-colors"
            >
              {settings.contact.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
