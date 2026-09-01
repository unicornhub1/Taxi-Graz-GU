import type { Collection, TinaField } from 'tinacms'

const str = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description,
})
const textarea = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description, ui: { component: 'textarea' },
})
const PLATZHALTER = 'Platzhalter erlaubt: {phone}, {email}, {rating}, {reviews}'

export const kontakt: Collection = {
  name: 'kontakt',
  label: 'Kontaktseite',
  path: 'content/pages',
  format: 'json',
  match: { include: 'kontakt' },
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => '/kontakt',
  },
  fields: [
    {
      type: 'object', name: 'seo', label: 'SEO', required: true,
      fields: [str('title', 'Seitentitel'), textarea('description', 'Beschreibung (Google-Snippet)', PLATZHALTER)],
    },
    {
      type: 'object', name: 'hero', label: 'Kopfbereich', required: true,
      fields: [str('eyebrow', 'Kleine Überschrift'), str('heading', 'Überschrift'), textarea('text', 'Text', PLATZHALTER)],
    },
    {
      type: 'object', name: 'cards', label: 'Kontaktkarten', required: true,
      fields: [
        str('phoneSub', 'Zusatz unter Telefon'),
        str('whatsappSub', 'Zusatz unter WhatsApp'),
        str('hoursTitle', 'Titel Öffnungszeiten'),
        str('hoursValue', 'Öffnungszeiten'),
        str('hoursSub', 'Zusatz Öffnungszeiten'),
      ],
    },
    {
      type: 'object', name: 'form', label: 'Formular', required: true,
      fields: [str('heading', 'Überschrift'), textarea('text', 'Text', PLATZHALTER)],
    },
  ],
}
