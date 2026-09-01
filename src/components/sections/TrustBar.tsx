'use client'

import { motion } from 'framer-motion'
import { tinaField } from 'tinacms/dist/react'
import type { HomeQuery } from '@tina/__generated__/types'
import { useSettings } from '@/components/SettingsProvider'
import { compact, interpolate } from '@/lib/site'

export type TrustBarData = NonNullable<HomeQuery['home']['trustBar']>

export function TrustBar({ data }: { data: TrustBarData }) {
  const settings = useSettings()
  const items = compact(data.items)

  return (
    <section className="relative border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[var(--color-border)] lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            data-tina-field={tinaField(item)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1 px-4 py-8 text-center md:py-10"
          >
            <span className="text-2xl font-bold tracking-tight text-[var(--color-black)] md:text-3xl">
              {interpolate(item.value, settings)}
            </span>
            <span className="text-xs font-medium text-[var(--color-gray-400)] md:text-sm">
              {interpolate(item.label, settings)}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
