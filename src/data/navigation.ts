import type { NavItem } from '@/types'

export const navigation: { main: NavItem[]; legal: NavItem[] } = {
  main: [
    { label: 'Leistungen', href: '/#leistungen' },
    { label: 'Service-Gebiete', href: '/#gebiete' },
    { label: 'Bewertungen', href: '/#bewertungen' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
}
