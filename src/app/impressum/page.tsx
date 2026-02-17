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
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
    <Section className="bg-[var(--color-cream)]">

      <div className="space-y-8 text-[var(--color-gray-600)] leading-relaxed">

        {/* Informationspflicht laut § 5 ECG */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Informationspflicht laut § 5 ECG
          </h2>
          <div className="mt-3 space-y-1">
            <p className="font-semibold text-[var(--color-black)]">{SITE_CONFIG.company.legal}</p>
            <p>Inhaber: {SITE_CONFIG.company.owner}</p>
            <p>{SITE_CONFIG.address.street}</p>
            <p>
              {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
            </p>
          </div>
        </div>

        {/* Kontakt */}
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
            <p>
              Web:{' '}
              <a href={SITE_CONFIG.url} className="text-[var(--color-gold-dark)] hover:underline">
                {SITE_CONFIG.url.replace('https://', '')}
              </a>
            </p>
          </div>
        </div>

        {/* Unternehmensgegenstand */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">Unternehmensgegenstand</h2>
          <p className="mt-3">Personenbeförderung mit PKW (Taxigewerbe)</p>
        </div>

        {/* UID */}
        {SITE_CONFIG.company.uid && (
          <div>
            <h2 className="text-xl font-bold text-[var(--color-black)]">UID-Nummer</h2>
            <p className="mt-3">{SITE_CONFIG.company.uid}</p>
          </div>
        )}

        {/* Firmenbuch */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Firmenbuchnummer &amp; Firmenbuchgericht
          </h2>
          <div className="mt-3 space-y-1">
            <p>Firmenbuchnummer: {SITE_CONFIG.company.register}</p>
            <p>Firmenbuchgericht: {SITE_CONFIG.company.court}</p>
          </div>
        </div>

        {/* Gewerbebehörde & Berufsrecht */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Aufsichtsbehörde / Gewerbebehörde
          </h2>
          <div className="mt-3 space-y-1">
            <p>Bezirkshauptmannschaft Graz-Umgebung</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Berufsbezeichnung &amp; Berufsrecht
          </h2>
          <div className="mt-3 space-y-1">
            <p>Berufsbezeichnung: Taxiunternehmer</p>
            <p>Verleihungsstaat: Österreich</p>
            <p>
              Anwendbare Rechtsvorschriften: Gewerbeordnung 1994 (GewO), Gelegenheitsverkehrsgesetz (GelverkG),
              Betriebsordnung für den nichtlinienmäßigen Personenverkehr (BO 1994)
            </p>
            <p>
              Nachzulesen unter:{' '}
              <a
                href="https://www.ris.bka.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gold-dark)] hover:underline"
              >
                ris.bka.gv.at
              </a>
            </p>
          </div>
        </div>

        {/* WKO Mitgliedschaft */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Kammerzugehörigkeit
          </h2>
          <div className="mt-3 space-y-1">
            <p>Wirtschaftskammer Steiermark</p>
            <p>Fachgruppe für die Beförderungsgewerbe mit Personenkraftwagen</p>
          </div>
        </div>

        {/* Offenlegung gemäß § 25 MedienG */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            Offenlegung gemäß § 25 MedienG
          </h2>
          <div className="mt-3 space-y-1">
            <p>Medieninhaber: {SITE_CONFIG.company.legal}</p>
            <p>Anschrift: {SITE_CONFIG.address.street}, {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}</p>
            <p>Unternehmensgegenstand: Taxigewerbe</p>
            <p>
              Zweck der Website: Information über das Leistungsangebot des Unternehmens sowie
              Kontaktmöglichkeit für Kundinnen und Kunden.
            </p>
          </div>
        </div>

        {/* Haftungsausschluss */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">Haftungsausschluss</h2>
          <div className="mt-3 space-y-3">
            <div>
              <h3 className="font-semibold text-[var(--color-black)]">Haftung für Inhalte</h3>
              <p className="mt-1">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 ECG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-black)]">Haftung für Links</h3>
              <p className="mt-1">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
                übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
                der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
                zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-black)]">Urheberrecht</h3>
              <p className="mt-1">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>

        {/* Streitschlichtung */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            EU-Streitschlichtung
          </h2>
          <p className="mt-3">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gold-dark)] hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>.
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder
            verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </div>

        {/* Webdesign */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">Webdesign &amp; Umsetzung</h2>
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
