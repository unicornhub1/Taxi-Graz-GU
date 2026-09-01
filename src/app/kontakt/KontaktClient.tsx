'use client'

import { useTina, tinaField } from 'tinacms/dist/react'
import type { KontaktQuery } from '@tina/__generated__/types'
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { ContactForm } from '@/components/sections/ContactForm'
import { useSettings } from '@/components/SettingsProvider'
import { interpolate, phoneRaw, whatsappLink } from '@/lib/site'
import { goldGridStyle } from '@/lib/styles'
import { GoogleMap } from './GoogleMap'

export interface KontaktClientProps {
  data: KontaktQuery
  query: string
  variables: { relativePath: string }
}

export function KontaktClient(props: KontaktClientProps) {
  const { data } = useTina(props)
  const page = data.kontakt
  const settings = useSettings()
  const { labels } = settings

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-gray-900)] pt-40 pb-16">
        {/* Gold ellipses */}
        <div className="absolute -left-[20%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/15 via-[var(--color-gold)]/5 to-transparent blur-3xl" />
        <div className="absolute -right-[15%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-[var(--color-gold)]/[0.06] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={goldGridStyle} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-gray-900)] via-[var(--color-gray-900)]/60 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
          <span
            className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]"
            data-tina-field={tinaField(page.hero, 'eyebrow')}
          >
            {page.hero.eyebrow}
          </span>
          <h1
            className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl"
            data-tina-field={tinaField(page.hero, 'heading')}
          >
            {page.hero.heading}
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-[var(--color-gray-400)] md:text-lg"
            data-tina-field={tinaField(page.hero, 'text')}
          >
            {interpolate(page.hero.text, settings)}
          </p>
        </div>
      </section>

      <Section className="pt-0 bg-[var(--color-cream)]">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <a
              href={`tel:${phoneRaw(settings.contact.phone)}`}
              className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-[var(--color-gold)]/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]/10">
                <Phone className="h-5 w-5 text-[var(--color-gold-dark)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]" data-tina-field={tinaField(labels, 'phone')}>{labels.phone}</h3>
                <p className="mt-0.5 text-lg font-bold text-[var(--color-gold-dark)]">
                  <span data-tina-field={tinaField(settings.contact, 'phone')}>{settings.contact.phone}</span>
                </p>
                <p
                  className="text-xs text-[var(--color-gray-400)]"
                  data-tina-field={tinaField(page.cards, 'phoneSub')}
                >
                  {page.cards.phoneSub}
                </p>
              </div>
            </a>

            <a
              href={whatsappLink(settings.contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-green-500/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]" data-tina-field={tinaField(labels, 'whatsapp')}>{labels.whatsapp}</h3>
                <p className="mt-0.5 font-bold text-green-600" data-tina-field={tinaField(labels, 'whatsappSub')}>{labels.whatsappSub}</p>
                <p
                  className="text-xs text-[var(--color-gray-400)]"
                  data-tina-field={tinaField(page.cards, 'whatsappSub')}
                >
                  {page.cards.whatsappSub}
                </p>
              </div>
            </a>

            <a
              href={`mailto:${settings.contact.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-[var(--color-gold)]/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gray-100)]">
                <Mail className="h-5 w-5 text-[var(--color-gray-600)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]" data-tina-field={tinaField(labels, 'email')}>{labels.email}</h3>
                <p className="mt-0.5 font-medium text-[var(--color-gray-600)]">{settings.contact.email}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gray-100)]">
                <MapPin className="h-5 w-5 text-[var(--color-gray-600)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]" data-tina-field={tinaField(labels, 'address')}>{labels.address}</h3>
                <p className="mt-0.5 text-[var(--color-gray-600)]">
                  {settings.address.street}
                  <br />
                  {settings.address.zip} {settings.address.city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gray-100)]">
                <Clock className="h-5 w-5 text-[var(--color-gray-600)]" />
              </div>
              <div>
                <h3
                  className="font-semibold text-[var(--color-black)]"
                  data-tina-field={tinaField(page.cards, 'hoursTitle')}
                >
                  {page.cards.hoursTitle}
                </h3>
                <p
                  className="mt-0.5 font-bold text-[var(--color-gold-dark)]"
                  data-tina-field={tinaField(page.cards, 'hoursValue')}
                >
                  {page.cards.hoursValue}
                </p>
                <p
                  className="text-xs text-[var(--color-gray-400)]"
                  data-tina-field={tinaField(page.cards, 'hoursSub')}
                >
                  {page.cards.hoursSub}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8">
              <h2
                className="text-2xl font-bold text-[var(--color-black)]"
                data-tina-field={tinaField(page.form, 'heading')}
              >
                {page.form.heading}
              </h2>
              <p
                className="mt-2 text-[var(--color-gray-500)]"
                data-tina-field={tinaField(page.form, 'text')}
              >
                {interpolate(page.form.text, settings)}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section className="h-[400px] w-full">
        <GoogleMap />
      </section>
    </>
  )
}
