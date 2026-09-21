'use client'

import { tinaField } from 'tinacms/dist/react'
import { Section } from '@/components/layout/Section'
import { compact } from '@/lib/site'

export type LocalPricesData = {
  heading?: string | null
  note?: string | null
  items?: ReadonlyArray<{ route: string; price: string } | null> | null
}

/** Richtpreise – nur sichtbar, wenn im CMS Strecken eingetragen sind. */
export function LocalPrices({ data }: { data: LocalPricesData }) {
  const items = compact(data.items)
  if (items.length === 0) return null
  return (
    <Section className="bg-[var(--color-gray-50)]" narrow>
      {data.heading && (
        <h2
          data-tina-field={tinaField(data, 'heading')}
          className="text-center font-[var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-4xl"
        >
          {data.heading}
        </h2>
      )}
      <ul className="mt-8 divide-y divide-[var(--color-border)] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
        {items.map((item, i) => (
          <li key={i} data-tina-field={tinaField(item)} className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="text-[var(--color-gray-600)]">{item.route}</span>
            <span className="font-bold text-[var(--color-gold-dark)]">{item.price}</span>
          </li>
        ))}
      </ul>
      {data.note && (
        <p data-tina-field={tinaField(data, 'note')} className="mt-4 text-center text-sm text-[var(--color-gray-500)]">
          {data.note}
        </p>
      )}
    </Section>
  )
}
