import type { Collection, TinaField } from 'tinacms'

const str = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description,
})
const PLATZHALTER = 'Platzhalter erlaubt: {phone}, {email}, {rating}, {reviews}'

export const einsatzgebiete: Collection = {
  name: 'einsatzgebiete',
  label: 'Einsatzgebiete (Übersicht)',
  path: 'content/pages',
  format: 'json',
  match: { include: 'einsatzgebiete' },
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => '/einsatzgebiete',
  },
  fields: [
    {
      type: 'object', name: 'seo', label: 'SEO', required: true,
      fields: [
        str('title', 'Seitentitel', 'max. 40 Zeichen – nicht „Taxi Graz“ (das ist die Startseite)'),
        { type: 'string', name: 'description', label: 'Beschreibung (Google-Snippet)', required: true, ui: { component: 'textarea' }, description: PLATZHALTER },
      ],
    },
    {
      type: 'object', name: 'hero', label: 'Kopfbereich', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        { type: 'string', name: 'text', label: 'Text', required: true, ui: { component: 'textarea' }, description: PLATZHALTER },
      ],
    },
    {
      type: 'object', name: 'groupLabels', label: 'Gruppen-Überschriften', required: true,
      fields: [str('grazStadt', 'Graz Stadt'), str('grazUmgebung', 'Graz-Umgebung'), str('spezial', 'Spezial (Flughafen u. a.)')],
    },
    str('cardLinkLabel', 'Linktext auf den Karten', 'z. B. „Zur Ortsseite“'),
  ],
}
