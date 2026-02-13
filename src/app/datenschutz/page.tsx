import { createMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/lib/constants'
import { Section } from '@/components/layout/Section'

export const metadata = createMetadata({
  title: 'Datenschutzerklärung',
  description: `Datenschutzerklärung von ${SITE_CONFIG.name}`,
  path: '/datenschutz',
  noIndex: true,
})

export default function DatenschutzPage() {
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
            Datenschutzerklärung
          </h1>
          <p className="mt-3 text-[var(--color-gray-400)]">
            Informationen zum Schutz Ihrer personenbezogenen Daten gemäß DSGVO.
          </p>
        </div>
      </section>
    <Section className="bg-[var(--color-cream)]" narrow>

      <div className="space-y-8 text-[var(--color-gray-600)] leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            1. Datenschutz auf einen Blick
          </h2>
          <div className="mt-3 space-y-3">
            <h3 className="font-semibold text-[var(--color-black)]">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
              werden können.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            2. Verantwortliche Stelle
          </h2>
          <div className="mt-3 space-y-1">
            <p className="font-semibold text-[var(--color-black)]">{SITE_CONFIG.company.legal}</p>
            <p>{SITE_CONFIG.address.street}</p>
            <p>
              {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
            </p>
            <p className="mt-2">Telefon: {SITE_CONFIG.phone}</p>
            <p>E-Mail: {SITE_CONFIG.email}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            3. Datenerfassung auf unserer Website
          </h2>
          <div className="mt-3 space-y-3">
            <h3 className="font-semibold text-[var(--color-black)]">
              Wie erfassen wir Ihre Daten?
            </h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
              kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme
              erfasst.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">4. Hosting</h2>
          <p className="mt-3">
            Unsere Website wird bei Vercel Inc. gehostet. Details entnehmen Sie der
            Datenschutzerklärung von Vercel: https://vercel.com/legal/privacy-policy
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">5. Kontaktformular</h2>
          <p className="mt-3">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
            zwecks Bearbeitung der Anfrage bei uns gespeichert. Diese Daten geben wir nicht
            ohne Ihre Einwilligung weiter.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">6. Ihre Rechte</h2>
          <p className="mt-3">
            Sie haben gemäß DSGVO folgende Rechte: Recht auf Auskunft (Art. 15), Berichtigung
            (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
            Datenübertragbarkeit (Art. 20), Widerspruchsrecht (Art. 21). Zuständige
            Aufsichtsbehörde: Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Wien.
          </p>
        </div>
      </div>
    </Section>
    </>
  )
}
