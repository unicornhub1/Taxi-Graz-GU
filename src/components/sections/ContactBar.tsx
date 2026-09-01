'use client'

import { Phone, MessageCircle, Mail } from 'lucide-react'
import { useSettings } from '@/components/SettingsProvider'
import { phoneRaw, whatsappLink } from '@/lib/site'
import { tinaField } from 'tinacms/dist/react'

export function ContactBar() {
  const settings = useSettings()
  const { labels } = settings
  return (
    <div className="fixed top-0 left-0 right-0 z-50 hidden text-white border-b border-white/[0.06] lg:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2.5 text-xs sm:text-sm">
        <a
          href={`tel:${phoneRaw(settings.contact.phone)}`}
          className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-gold)]"
        >
          <Phone className="h-3.5 w-3.5" />
          <span className="font-medium">{settings.contact.phone}</span>
        </a>

        <span className="hidden text-[var(--color-gray-600)] sm:inline">|</span>

        <a
          href={whatsappLink(settings.contact.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-green-400"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="font-medium" data-tina-field={tinaField(labels, 'whatsapp')}>{labels.whatsapp}</span>
        </a>

        <span className="hidden text-[var(--color-gray-600)] sm:inline">|</span>

        <a
          href={`mailto:${settings.contact.email}`}
          className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-gold)]"
        >
          <Mail className="h-3.5 w-3.5" />
          <span className="font-medium">{settings.contact.email}</span>
        </a>
      </div>
    </div>
  )
}
