import { createMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/lib/constants'
import { Section } from '@/components/layout/Section'
import { ContactForm } from '@/components/sections/ContactForm'
import { GoogleMap } from './GoogleMap'
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = createMetadata({
  title: 'Kontakt',
  description:
    'Kontaktieren Sie Taxi Graz GU – per Telefon, WhatsApp oder Kontaktformular. 24/7 erreichbar für Ihre Taxifahrt in Graz.',
  path: '/kontakt',
})

export default function KontaktPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-gray-900)] pt-40 pb-16">
        {/* Gold ellipses */}
        <div className="absolute -left-[20%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/15 via-[var(--color-gold)]/5 to-transparent blur-3xl" />
        <div className="absolute -right-[15%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-[var(--color-gold)]/[0.06] blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(232,185,49,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,185,49,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-gray-900)] via-[var(--color-gray-900)]/60 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Kontakt
          </span>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Sprechen Sie uns an
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-gray-400)] md:text-lg">
            Ob per Telefon, WhatsApp oder Kontaktformular – wir sind 24 Stunden am Tag für Sie
            erreichbar.
          </p>
        </div>
      </section>

      <Section className="pt-0 bg-[var(--color-cream)]">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-[var(--color-gold)]/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]/10">
                <Phone className="h-5 w-5 text-[var(--color-gold-dark)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]">Telefon</h3>
                <p className="mt-0.5 text-lg font-bold text-[var(--color-gold-dark)]">
                  {SITE_CONFIG.phone}
                </p>
                <p className="text-xs text-[var(--color-gray-400)]">24/7 erreichbar</p>
              </div>
            </a>

            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-green-500/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]">WhatsApp</h3>
                <p className="mt-0.5 font-bold text-green-600">Nachricht senden</p>
                <p className="text-xs text-[var(--color-gray-400)]">Schnell & unkompliziert</p>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 transition-all hover:border-[var(--color-gold)]/30 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gray-100)]">
                <Mail className="h-5 w-5 text-[var(--color-gray-600)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]">E-Mail</h3>
                <p className="mt-0.5 font-medium text-[var(--color-gray-600)]">
                  {SITE_CONFIG.email}
                </p>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gray-100)]">
                <MapPin className="h-5 w-5 text-[var(--color-gray-600)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]">Adresse</h3>
                <p className="mt-0.5 text-[var(--color-gray-600)]">
                  {SITE_CONFIG.address.street}
                  <br />
                  {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gray-100)]">
                <Clock className="h-5 w-5 text-[var(--color-gray-600)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-black)]">Öffnungszeiten</h3>
                <p className="mt-0.5 font-bold text-[var(--color-gold-dark)]">
                  24 Stunden / 7 Tage
                </p>
                <p className="text-xs text-[var(--color-gray-400)]">
                  Auch an Feiertagen erreichbar
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[var(--color-black)]">
                Schreiben Sie uns
              </h2>
              <p className="mt-2 text-[var(--color-gray-500)]">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
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
