import type { Collection } from 'tinacms'

export const legal: Collection = {
  name: 'legal',
  label: 'Rechtliches',
  path: 'content/legal',
  format: 'mdx',
  ui: {
    allowedActions: { create: false, delete: false },
    router: ({ document }) => `/${document._sys.filename}`,
  },
  fields: [
    { type: 'string', name: 'title', label: 'Titel', isTitle: true, required: true },
    { type: 'string', name: 'intro', label: 'Untertitel im Kopfbereich', required: true },
    { type: 'string', name: 'seoDescription', label: 'SEO-Beschreibung', required: true },
    { type: 'boolean', name: 'showCompanyBlock', label: 'Firmenblock aus den Einstellungen oben anzeigen' },
    {
      type: 'rich-text', name: 'body', label: 'Inhalt', isBody: true,
      description: 'Achtung: Firmen- und Kontaktdaten im Text werden NICHT automatisch aus den Einstellungen übernommen – bei Änderungen (Telefon, E-Mail, Adresse) hier mitpflegen.',
      overrides: { toolbar: ['heading', 'bold', 'italic', 'link', 'ul', 'ol'], headingLevels: ['h2', 'h3'] },
    },
  ],
}
