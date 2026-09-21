'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { tinaField } from 'tinacms/dist/react'
import { Container } from '@/components/layout/Container'
import { useSettings } from '@/components/SettingsProvider'
import { compact, interpolate, phoneRaw, whatsappLink } from '@/lib/site'
import { goldGridStyle } from '@/lib/styles'

export type OrderStepsData = {
  heading: string
  intro: string
  steps?: ReadonlyArray<{ title: string; text: string } | null> | null
}

// Mittelstreifen der „Straße“ – Strichlänge wie Fahrbahnmarkierung
const laneMarking = (direction: 'right' | 'bottom') => ({
  backgroundImage: `repeating-linear-gradient(to ${direction}, color-mix(in srgb, var(--color-gold) 75%, transparent) 0 16px, transparent 16px 30px)`,
})

/** „So bestellen Sie …“: drei Schritte als Route. Ein Taxi-Dachschild fährt einmal über die Straße. */
export function OrderSteps({ data }: { data: OrderStepsData }) {
  const settings = useSettings()
  const { labels, orderLabels } = settings
  const steps = compact(data.steps)
  const reduceMotion = useReducedMotion()

  return (
    <section id="bestellen" className="relative overflow-hidden bg-[var(--color-gray-900)] py-20 text-white md:py-28">
      <div className="absolute inset-0 opacity-[0.03]" style={goldGridStyle} aria-hidden />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              data-tina-field={tinaField(data, 'heading')}
              className="font-[var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
            >
              {data.heading}
            </h2>
            <p data-tina-field={tinaField(data, 'intro')} className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-gray-400)]">
              {interpolate(data.intro, settings)}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <a
              href={`tel:${phoneRaw(settings.contact.phone)}`}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--color-gold)] px-7 py-4 text-lg font-bold text-[var(--color-black)] transition-colors hover:bg-[var(--color-gold-light)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
            >
              <Phone className="h-5 w-5" />
              {settings.contact.phone}
            </a>
            <a
              href={whatsappLink(settings.contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/20 px-7 py-4 text-lg font-bold transition-colors hover:border-green-400/50 hover:text-green-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
            >
              <MessageCircle className="h-5 w-5" />
              <span data-tina-field={tinaField(labels, 'whatsapp')}>{labels.whatsapp}</span>
            </a>
          </div>
        </div>

        <div className="relative mt-16 md:mt-20">
          {/* Straße: Desktop waagrecht mit fahrendem Dachschild, mobil senkrecht */}
          <div aria-hidden className="absolute inset-x-0 top-[27px] hidden h-3 rounded-full bg-white/[0.07] md:block">
            <div className="absolute inset-x-6 top-1/2 h-0.5 -translate-y-1/2" style={laneMarking('right')} />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 rounded-md bg-[var(--color-gold)] px-2.5 py-1 font-[var(--font-display)] text-[11px] font-bold tracking-[0.2em] text-[var(--color-black)] shadow-[0_0_24px_color-mix(in_srgb,var(--color-gold)_55%,transparent)]"
              initial={reduceMotion ? { left: '100%', x: '-100%' } : { left: '0%', x: '0%' }}
              whileInView={{ left: '100%', x: '-100%' }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: reduceMotion ? 0 : 2.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            >
              {orderLabels.taxiSign}
            </motion.div>
          </div>
          <div aria-hidden className="absolute bottom-10 left-[27px] top-10 w-3 rounded-full bg-white/[0.07] md:hidden">
            <div className="absolute inset-y-2 left-1/2 w-0.5 -translate-x-1/2" style={laneMarking('bottom')} />
          </div>

          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((step, i) => (
              <li key={i} data-tina-field={tinaField(step)} className="relative pl-24 md:pl-0">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[var(--color-gold)] font-[var(--font-display)] text-3xl font-bold text-[var(--color-black)] ring-8 ring-[var(--color-gray-900)] md:relative"
                >
                  {i + 1}
                </span>
                <h3 className="pt-3 font-[var(--font-display)] text-2xl font-bold md:mt-7 md:pt-0">{step.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-[var(--color-gray-400)]">{interpolate(step.text, settings)}</p>
              </li>
            ))}
          </ol>
        </div>

        <dl className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:mt-20 md:grid-cols-2">
          {[
            { heading: orderLabels.paymentsHeading, field: 'paymentsHeading' as const, items: compact(orderLabels.payments), list: 'payments' as const },
            { heading: orderLabels.extrasHeading, field: 'extrasHeading' as const, items: compact(orderLabels.extras), list: 'extras' as const },
          ].map((group) => (
            <div key={group.field}>
              <dt data-tina-field={tinaField(orderLabels, group.field)} className="text-sm font-semibold text-[var(--color-gray-400)]">
                {group.heading}
              </dt>
              <dd data-tina-field={tinaField(orderLabels, group.list)} className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/90">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
