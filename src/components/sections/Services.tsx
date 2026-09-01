'use client'

import { motion } from 'framer-motion'
import { Plane, Crown, Package, Car, CalendarClock, Accessibility, MapPin, Clock, Shield, Star, type LucideIcon } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import type { HomeQuery } from '@tina/__generated__/types'
import { Section } from '@/components/layout/Section'
import { Card } from '@/components/ui'
import { useSettings } from '@/components/SettingsProvider'
import { compact, interpolate } from '@/lib/site'

export type ServicesData = NonNullable<HomeQuery['home']['services']>

const iconMap: Record<string, LucideIcon> = { Plane, Crown, Package, Car, CalendarClock, Accessibility, MapPin, Clock, Shield, Star }

export function Services({ data }: { data: ServicesData }) {
  const settings = useSettings()
  const items = compact(data.items)

  return (
    <Section id="leistungen" className="bg-white">
      <div className="text-center">
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
          className="mt-3 font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl md:text-5xl"
          data-tina-field={tinaField(data, 'heading')}
        >
          {data.heading}{' '}
          <span className="text-[var(--color-gold-dark)]" data-tina-field={tinaField(data, 'headingHighlight')}>{data.headingHighlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-[var(--color-gray-500)] md:text-lg"
          data-tina-field={tinaField(data, 'intro')}
        >
          {interpolate(data.intro, settings)}
        </motion.p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Car
          return (
            <motion.div
              key={i}
              data-tina-field={tinaField(feature)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="group h-full relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-[var(--color-gold)]/[0.06] transition-all duration-500 group-hover:h-24 group-hover:w-24 group-hover:bg-[var(--color-gold)]/[0.1]" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-gold)]/10 transition-all duration-300 group-hover:bg-[var(--color-gold)]/20 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-[var(--color-gold-dark)]" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[var(--color-black)]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray-500)]">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
