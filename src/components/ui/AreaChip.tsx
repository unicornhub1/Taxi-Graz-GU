import Link from 'next/link'
import { MapPin } from 'lucide-react'

const chipClass =
  'group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-gray-600)] transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 hover:text-[var(--color-black)]'

/** Orts-Chip aus der Gebietsliste – als Link, sobald eine Ortsseite verknüpft ist. */
export function AreaChip({ label, href, tinaFieldId }: { label: string; href?: string; tinaFieldId?: string }) {
  const content = (
    <>
      <MapPin className="h-3.5 w-3.5 text-[var(--color-gold)] transition-transform group-hover:scale-110" />
      {label}
    </>
  )
  return href ? (
    <Link href={href} className={chipClass} data-tina-field={tinaFieldId}>
      {content}
    </Link>
  ) : (
    <span className={chipClass} data-tina-field={tinaFieldId}>
      {content}
    </span>
  )
}
