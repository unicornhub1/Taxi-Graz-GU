import { createMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/lib/constants'
import { Section } from '@/components/layout/Section'

export const metadata = createMetadata({
  title: 'Impressum',
  description: `Impressum von ${SITE_CONFIG.name}`,
  path: '/impressum',
  noIndex: true,
})

export default function ImpressumPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-gray-900)] pt-44 pb-20">
        <div className="absolute -left-[20%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-gradient-to-br from-[var(--color-gold)]/12 via-[var(--color-gold)]/3 to-transparent blur-3xl" />
        <div className="absolute -right-[15%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-[var(--color-gold)]/[0.05] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-gray-900)] via-[var(--color-gray-900)]/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Rechtliches
          </span>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Impressum
          </h1>
          <p className="mt-3 text-[var(--color-gray-400)]">
            Angaben gemäß § 5 ECG und Offenlegung gemäß § 25 MedienG.
          </p>
        </div>
      </section>
    <Section className="bg-[var(--color-cream)]" narrow>

      <div className="space-y-8 text-[var(--color-gray-600)] leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Angaben gemäß § 5 ECG
          </h2>
          <div className="mt-3 space-y-1">
            <p className="font-semibold text-[var(--color-black)]">{SITE_CONFIG.company.legal}</p>
            <p>{SITE_CONFIG.address.street}</p>
            <p>
              {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">Kontakt</h2>
          <div className="mt-3 space-y-1">
            <p>
              Telefon:{' '}
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-[var(--color-gold-dark)] hover:underline">
                {SITE_CONFIG.phone}
              </a>
            </p>
            <p>
              E-Mail:{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--color-gold-dark)] hover:underline">
                {SITE_CONFIG.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">Unternehmensgegenstand</h2>
          <p className="mt-3">Taxigewerbe</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Firmenbuchnummer &amp; Firmenbuchgericht
          </h2>
          <div className="mt-3 space-y-1">
            <p>Firmenbuchnummer: {SITE_CONFIG.company.register}</p>
            <p>Firmenbuchgericht: {SITE_CONFIG.company.court}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">UID-Nummer</h2>
          <p className="mt-3">{SITE_CONFIG.company.uid}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">Haftungsausschluss</h2>
          <div className="mt-3 space-y-3">
            <p>
              <strong className="text-[var(--color-black)]">Haftung für Inhalte:</strong> Die
              Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p>
              <strong className="text-[var(--color-black)]">Haftung für Links:</strong> Unser
              Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">Webdesign</h2>
          <p className="mt-3">
            <a
              href="https://www.unicorn-factory.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gold-dark)] hover:underline"
            >
              Unicorn Factory
            </a>
          </p>
        </div>
      </div>
    </Section>
    </>
  )
}
