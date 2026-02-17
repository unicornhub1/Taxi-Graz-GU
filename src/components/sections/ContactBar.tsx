import { Phone, MessageCircle, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function ContactBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 hidden text-white border-b border-white/[0.06] lg:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2.5 text-xs sm:text-sm">
        <a
          href={`tel:${SITE_CONFIG.phoneRaw}`}
          className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-gold)]"
        >
          <Phone className="h-3.5 w-3.5" />
          <span className="font-medium">{SITE_CONFIG.phone}</span>
        </a>

        <span className="hidden text-[var(--color-gray-600)] sm:inline">|</span>

        <a
          href={SITE_CONFIG.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-green-400"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="font-medium">WhatsApp</span>
        </a>

        <span className="hidden text-[var(--color-gray-600)] sm:inline">|</span>

        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-gold)]"
        >
          <Mail className="h-3.5 w-3.5" />
          <span className="font-medium">{SITE_CONFIG.email}</span>
        </a>
      </div>
    </div>
  )
}
