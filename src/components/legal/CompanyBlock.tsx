'use client'

import { tinaField } from 'tinacms/dist/react'
import { useSettings } from '@/components/SettingsProvider'
import { phoneRaw } from '@/lib/site'

const link = 'text-[var(--color-gold-dark)] hover:underline'
const h2 = 'text-xl font-bold text-[var(--color-black)]'

/** Pflichtangaben aus den Einstellungen – bisher „Informationspflicht", „Kontakt", „UID", „Firmenbuch" im Impressum. */
export function CompanyBlock() {
  const s = useSettings()
  const host = s.seo.url.replace(/^https?:\/\//, '')

  return (
    <div className="space-y-8">
      <div data-tina-field={tinaField(s, 'company')}>
        <h2 className={h2}>Informationspflicht laut § 5 ECG</h2>
        <div className="mt-3 space-y-1">
          <p className="font-semibold text-[var(--color-black)]">{s.company.legal}</p>
          <p>Inhaber: {s.company.owner}</p>
          <p>{s.address.street}</p>
          <p>
            {s.address.zip} {s.address.city}, {s.address.country}
          </p>
        </div>
      </div>

      <div data-tina-field={tinaField(s, 'contact')}>
        <h2 className={h2}>Kontakt</h2>
        <div className="mt-3 space-y-1">
          <p>
            Telefon:{' '}
            <a href={`tel:${phoneRaw(s.contact.phone)}`} className={link}>{s.contact.phone}</a>
          </p>
          <p>
            E-Mail:{' '}
            <a href={`mailto:${s.contact.email}`} className={link}>{s.contact.email}</a>
          </p>
          <p>
            Web:{' '}
            <a href={s.seo.url} className={link}>{host}</a>
          </p>
        </div>
      </div>

      {s.company.uid && (
        <div data-tina-field={tinaField(s.company, 'uid')}>
          <h2 className={h2}>UID-Nummer</h2>
          <p className="mt-3">{s.company.uid}</p>
        </div>
      )}

      <div data-tina-field={tinaField(s.company, 'register')}>
        <h2 className={h2}>Firmenbuchnummer &amp; Firmenbuchgericht</h2>
        <div className="mt-3 space-y-1">
          <p>Firmenbuchnummer: {s.company.register}</p>
          <p>Firmenbuchgericht: {s.company.court}</p>
        </div>
      </div>
    </div>
  )
}
