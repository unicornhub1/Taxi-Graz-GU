'use client'

import { motion } from 'framer-motion'
import { MapPin, Building2, Trees, type LucideIcon } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import type { HomeQuery } from '@tina/__generated__/types'
import { Section } from '@/components/layout/Section'
import { compact } from '@/lib/site'

export type ServiceAreasData = NonNullable<HomeQuery['home']['serviceAreas']>
type AreaGroupData = NonNullable<NonNullable<ServiceAreasData['groups']>[number]>

const iconMap: Record<string, LucideIcon> = { Building2, Trees, MapPin }

function AreaGroup({ group, delay }: { group: AreaGroupData; delay: number }) {
  const Icon = iconMap[group.icon] ?? MapPin
  const areas = compact(group.areas)
  return (
    <motion.div
      data-tina-field={tinaField(group)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <div className="mb-4 flex items-center justify-center gap-2">
        <Icon className="h-4 w-4 text-[var(--color-gold-dark)]" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-500)]">
          {group.title}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {areas.map((area, i) => (
          <span
            key={i}
            className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-gray-600)] transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 hover:text-[var(--color-black)]"
          >
            <MapPin className="h-3.5 w-3.5 text-[var(--color-gold)] transition-transform group-hover:scale-110" />
            {area}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function ServiceAreas({ data }: { data: ServiceAreasData }) {
  const groups = compact(data.groups)
  return (
    <Section id="gebiete" className="bg-[var(--color-gray-50)]">
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
        <motion.p
          data-tina-field={tinaField(data, 'intro')}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-[var(--color-gray-500)]"
        >
          {data.intro}
        </motion.p>
      </div>

      <div className="mt-12 space-y-10">
        {groups.map((group, i) => (
          <AreaGroup key={i} group={group} delay={0.3 + i * 0.1} />
        ))}
      </div>
    </Section>
  )
}
