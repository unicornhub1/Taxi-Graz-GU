import { createMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/lib/constants'
import { Section } from '@/components/layout/Section'
import Link from 'next/link'

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
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
    <Section className="bg-[var(--color-cream)]">

      <div className="space-y-10 text-[var(--color-gray-600)] leading-relaxed">

        {/* 1. Datenschutz auf einen Blick */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            1. Datenschutz auf einen Blick
          </h2>
          <div className="mt-3 space-y-3">
            <h3 className="font-semibold text-[var(--color-black)]">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
              werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
              Sie unserer nachfolgend aufgeführten Datenschutzerklärung.
            </p>
            <h3 className="font-semibold text-[var(--color-black)]">Datenerfassung auf dieser Website</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
              Dessen Kontaktdaten können Sie dem Abschnitt &bdquo;Verantwortliche Stelle&ldquo;
              in dieser Datenschutzerklärung entnehmen.
            </p>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen,
              z.&thinsp;B. durch Eingabe in das Kontaktformular. Andere Daten werden
              automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
              IT-Systeme erfasst. Das sind vor allem technische Daten (z.&thinsp;B. Internetbrowser,
              Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
              automatisch, sobald Sie diese Website betreten.
            </p>
          </div>
        </div>

        {/* 2. Verantwortliche Stelle */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            2. Verantwortliche Stelle
          </h2>
          <div className="mt-3 space-y-1">
            <p className="font-semibold text-[var(--color-black)]">{SITE_CONFIG.company.legal}</p>
            <p>Inhaber: {SITE_CONFIG.company.owner}</p>
            <p>{SITE_CONFIG.address.street}</p>
            <p>
              {SITE_CONFIG.address.zip} {SITE_CONFIG.address.city}, {SITE_CONFIG.address.country}
            </p>
            <p className="mt-2">
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
          <p className="mt-3">
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
            gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
            personenbezogenen Daten (z.&thinsp;B. Namen, E-Mail-Adressen o.&thinsp;Ä.) entscheidet.
          </p>
        </div>

        {/* 3. Widerruf Ihrer Einwilligung */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            3. Widerruf Ihrer Einwilligung zur Datenverarbeitung
          </h2>
          <p className="mt-3">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
            möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
            Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt
            vom Widerruf unberührt.
          </p>
        </div>

        {/* 4. Rechtsgrundlagen */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            4. Rechtsgrundlagen der Verarbeitung
          </h2>
          <div className="mt-3 space-y-3">
            <p>Soweit wir für Verarbeitungsvorgänge personenbezogener Daten Ihre Einwilligung einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage.</p>
            <p>Soweit die Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrages erforderlich ist (z.&thinsp;B. eine Taxifahrt), beruht dies auf Art. 6 Abs. 1 lit. b DSGVO.</p>
            <p>Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.</p>
            <p>Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens erforderlich (z.&thinsp;B. Betrieb der Website), stützt sich die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO.</p>
          </div>
        </div>

        {/* 5. SSL/TLS-Verschlüsselung */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            5. SSL- bzw. TLS-Verschlüsselung
          </h2>
          <p className="mt-3">
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
            vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
            Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von
            &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem
            Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </div>

        {/* 6. Hosting */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            6. Hosting
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die
              personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf
              den Servern des Hosters gespeichert. Hierbei kann es sich v.&thinsp;a. um
              IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
              Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine
              Website generiert werden, handeln.
            </p>
            <p>
              Unser Hoster ist:
            </p>
            <p className="font-semibold text-[var(--color-black)]">
              Vercel Inc.
            </p>
            <p>
              440 N Barranca Ave #4133, Covina, CA 91723, USA
            </p>
            <p>
              Datenschutzerklärung:{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gold-dark)] hover:underline"
              >
                vercel.com/legal/privacy-policy
              </a>
            </p>
            <p>
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung
              unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt
              die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
              Vercel kann Daten in die USA übertragen. Die Datenübertragung in die USA wird
              auf die Standardvertragsklauseln der EU-Kommission gestützt.
            </p>
          </div>
        </div>

        {/* 7. Server-Log-Dateien */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            7. Server-Log-Dateien
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in
              so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
              Dies sind:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
              vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse
              an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
            </p>
          </div>
        </div>

        {/* 8. Cookies */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            8. Cookies
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf
              Ihrem Endgerät gespeichert werden und die Ihr Browser speichert. Sie richten
              keinen Schaden an und enthalten keine Viren.
            </p>
            <h3 className="font-semibold text-[var(--color-black)]">Technisch notwendige Cookies</h3>
            <p>
              Diese Cookies sind für den Betrieb der Website erforderlich und können in
              unseren Systemen nicht deaktiviert werden. Sie werden in der Regel nur als
              Reaktion auf Ihre Aktionen gesetzt, wie z.&thinsp;B. das Speichern Ihrer
              Cookie-Einstellungen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse).
            </p>
            <h3 className="font-semibold text-[var(--color-black)]">Cookie-Einwilligung</h3>
            <p>
              Beim erstmaligen Besuch unserer Website werden Sie über einen Cookie-Banner
              über die Verwendung von Cookies informiert und können selbst entscheiden,
              welche Cookie-Kategorien Sie zulassen möchten. Ihre Einwilligung wird in
              einem Cookie auf Ihrem Endgerät gespeichert. Sie können Ihre
              Cookie-Einstellungen jederzeit über den Link &bdquo;Cookie-Einstellungen&ldquo;
              im Footer unserer Website ändern.
            </p>
            <h3 className="font-semibold text-[var(--color-black)]">Cookie-Kategorien auf dieser Website</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Notwendig:</strong> Speicherung Ihrer Cookie-Einstellungen. Können nicht deaktiviert werden.</li>
              <li><strong>Externe Dienste:</strong> Ermöglicht die Einbindung externer Inhalte wie Google Maps. Nur mit Ihrer Einwilligung.</li>
            </ul>
          </div>
        </div>

        {/* 9. Google Maps */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            9. Google Maps
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland
              Limited (&bdquo;Google&ldquo;), Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p>
              Google Maps wird erst geladen, nachdem Sie über unseren Cookie-Banner der
              Kategorie &bdquo;Externe Dienste&ldquo; zugestimmt haben. Ohne Ihre
              Einwilligung wird kein Kontakt zu Googles Servern hergestellt.
            </p>
            <p>
              Wenn Sie Google Maps aktivieren, wird eine Verbindung zu den Servern von
              Google hergestellt. Dabei wird dem Google-Server mitgeteilt, welche unserer
              Seiten Sie besucht haben. Zudem wird Ihre IP-Adresse an Google übermittelt.
              Google kann diese Daten in die USA übertragen.
            </p>
            <p>
              Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden
              Darstellung unserer Online-Angebote und einer leichten Auffindbarkeit der
              von uns auf der Website angegebenen Orte. Die Rechtsgrundlage ist Ihre
              Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p>
              Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der
              Datenschutzerklärung von Google:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gold-dark)] hover:underline"
              >
                policies.google.com/privacy
              </a>
            </p>
          </div>
        </div>

        {/* 10. Google Fonts */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            10. Google Fonts (lokales Hosting)
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte
              Google Fonts. Die Google Fonts sind lokal installiert. Eine Verbindung zu
              Servern von Google findet dabei nicht statt. Die Schriftarten werden beim
              Erstellen der Website heruntergeladen und von unserem eigenen Server
              ausgeliefert. Ihre IP-Adresse wird daher nicht an Google übermittelt.
            </p>
          </div>
        </div>

        {/* 11. Kontaktformular */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            11. Kontaktformular
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
              Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
              Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer, Betreff, Nachricht)
              zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei
              uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt
              oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen
              übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse
              an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1
              lit. f DSGVO).
            </p>
            <p>
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns,
              bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung
              widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende
              gesetzliche Bestimmungen &ndash; insbesondere Aufbewahrungsfristen &ndash;
              bleiben unberührt.
            </p>
          </div>
        </div>

        {/* 12. Kontaktaufnahme per Telefon / WhatsApp / E-Mail */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            12. Anfrage per Telefon, E-Mail oder WhatsApp
          </h2>
          <div className="mt-3 space-y-3">
            <p>
              Wenn Sie uns per Telefon, E-Mail oder WhatsApp kontaktieren, wird Ihre
              Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten
              (Name, Anfrage, Telefonnummer) zum Zwecke der Bearbeitung Ihres Anliegens
              bei uns gespeichert und verarbeitet.
            </p>
            <p>
              Bei der Nutzung von WhatsApp werden Daten an die Meta Platforms Ireland
              Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland
              übertragen. Details finden Sie in der Datenschutzerklärung von WhatsApp:{' '}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gold-dark)] hover:underline"
              >
                whatsapp.com/legal/privacy-policy
              </a>
            </p>
            <p>
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
              (Vertragserfüllung / vorvertragliche Maßnahmen) und Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an der effizienten Bearbeitung von Anfragen).
            </p>
          </div>
        </div>

        {/* 13. Speicherdauer */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            13. Speicherdauer
          </h2>
          <p className="mt-3">
            Sofern innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer
            genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck
            für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschungsersuchen
            geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden
            Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
            die Speicherung Ihrer personenbezogenen Daten haben (z.&thinsp;B. steuer- oder
            handelsrechtliche Aufbewahrungsfristen von bis zu 7 Jahren gemäß § 132 BAO).
          </p>
        </div>

        {/* 14. Ihre Rechte */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            14. Ihre Rechte als betroffene Person
          </h2>
          <div className="mt-3 space-y-3">
            <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit folgende Rechte:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Recht auf Auskunft</strong> (Art. 15 DSGVO): Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob personenbezogene Daten verarbeitet werden, und Auskunft über diese Daten zu erhalten.</li>
              <li><strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO): Sie haben das Recht, die unverzügliche Berichtigung unrichtiger Daten zu verlangen.</li>
              <li><strong>Recht auf Löschung</strong> (Art. 17 DSGVO): Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern keine gesetzliche Aufbewahrungspflicht besteht.</li>
              <li><strong>Recht auf Einschränkung</strong> (Art. 18 DSGVO): Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer Daten zu verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO): Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
              <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie haben das Recht, jederzeit Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen.</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--color-gold-dark)] hover:underline">
                {SITE_CONFIG.email}
              </a>
            </p>
          </div>
        </div>

        {/* 15. Beschwerderecht */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            15. Beschwerderecht bei der Aufsichtsbehörde
          </h2>
          <div className="mt-3 space-y-1">
            <p>
              Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen
              Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer
              Aufsichtsbehörde zu beschweren. Die für Österreich zuständige
              Aufsichtsbehörde ist:
            </p>
            <p className="mt-2 font-semibold text-[var(--color-black)]">
              Österreichische Datenschutzbehörde
            </p>
            <p>Barichgasse 40-42, 1030 Wien</p>
            <p>
              Telefon: +43 1 52 152-0
            </p>
            <p>
              Website:{' '}
              <a
                href="https://www.dsb.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-gold-dark)] hover:underline"
              >
                dsb.gv.at
              </a>
            </p>
          </div>
        </div>

        {/* 16. Aktualität */}
        <div>
          <h2 className="text-xl font-bold text-[var(--color-black)]">
            16. Aktualität und Änderung dieser Datenschutzerklärung
          </h2>
          <p className="mt-3">
            Diese Datenschutzerklärung ist aktuell gültig (Stand: Februar 2026). Durch die
            Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw.
            behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung
            zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf
            dieser Seite abgerufen werden.
          </p>
        </div>

      </div>
    </Section>
    </>
  )
}
