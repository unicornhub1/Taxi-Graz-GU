'use client'

import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { useSettings } from '@/components/SettingsProvider'
import { phoneRaw, compact } from '@/lib/site'
import { tinaField } from 'tinacms/dist/react'
import { Container } from './Container'
import { Logo } from '@/components/ui/Logo'
import { CookieSettingsButton } from '@/components/ui/CookieSettingsButton'

export function Footer() {
  const settings = useSettings()
  const { footer, navigation } = settings
  const mainNav = compact(navigation.main)
  const legalNav = compact(navigation.legal)
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-gray-900)] text-white">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Logo className="h-14 w-auto" />
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed text-[var(--color-gray-400)]"
              data-tina-field={tinaField(footer, 'description')}
            >
              {footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-400)]" data-tina-field={tinaField(footer, 'navHeading')}>
              {footer.navHeading}
            </h3>
            <ul className="mt-4 space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-gray-300)] transition-colors hover:text-[var(--color-gold)]"
                    data-tina-field={tinaField(item)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-400)]" data-tina-field={tinaField(footer, 'legalHeading')}>
              {footer.legalHeading}
            </h3>
            <ul className="mt-4 space-y-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-gray-300)] transition-colors hover:text-[var(--color-gold)]"
                    data-tina-field={tinaField(item)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gray-400)]" data-tina-field={tinaField(footer, 'hotlineHeading')}>
              {footer.hotlineHeading}
            </h3>
            <a
              href={`tel:${phoneRaw(settings.contact.phone)}`}
              className="mt-4 block text-2xl font-bold text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)]"
            >
              {settings.contact.phone}
            </a>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="flex items-center gap-2 text-sm text-[var(--color-gray-300)] transition-colors hover:text-[var(--color-gold)]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {settings.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={settings.google.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-[var(--color-gray-300)] transition-colors hover:text-[var(--color-gold)]"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {settings.address.street}
                    <br />
                    {settings.address.zip} {settings.address.city}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-gray-700)] py-6 text-xs text-[var(--color-gray-500)] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {settings.company.legal}. <span data-tina-field={tinaField(footer, 'copyright')}>{footer.copyright}</span></p>
          <p>
            Design by{' '}
            <a
              href="https://www.unicorn-factory.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-light)]"
            >
              Unicorn Factory
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
