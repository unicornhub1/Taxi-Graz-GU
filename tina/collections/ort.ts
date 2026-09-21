import type { Collection, TinaField } from 'tinacms'
import { ortSlug, REGIONS } from '../../src/lib/ort'

const str = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description,
})
const textarea = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description, ui: { component: 'textarea' },
})
const PLATZHALTER = 'Platzhalter erlaubt: {phone}, {email}, {rating}, {reviews}'

export const ort: Collection = {
  name: 'ort',
  label: 'Ortsseiten',
  path: 'content/orte',
  format: 'json',
  ui: {
    // Adresse der Seite = Dateiname, automatisch aus dem Ortsnamen (nur beim Anlegen).
    filename: { readonly: true, slugify: (values) => ortSlug(String(values?.name ?? '')) },
    router: ({ document }) => `/${document._sys.filename}`,
  },
  fields: [
    {
      type: 'string', name: 'name', label: 'Ortsname', required: true, isTitle: true,
      description: 'z. B. „Gratkorn“ – daraus entsteht beim Anlegen die Adresse /taxi-gratkorn.',
    },
    {
      type: 'string', name: 'region', label: 'Region', required: true,
      options: REGIONS.map((r) => ({ value: r.value, label: r.label })),
    },
    {
      type: 'object', name: 'seo', label: 'SEO', required: true,
      fields: [
        str('title', 'Seitentitel', 'max. 40 Zeichen – „ | Taxi Graz GU“ wird automatisch angehängt'),
        textarea('description', 'Beschreibung (Google-Snippet)', `100–140 Zeichen. ${PLATZHALTER}`),
      ],
    },
    {
      type: 'object', name: 'hero', label: 'Hero (oberster Bereich)', required: true,
      description: 'Button-Texte und Kontaktkarte kommen von der Startseite.',
      fields: [
        str('badge', 'Badge-Text'),
        str('headline', 'Überschrift (Teil 1)', 'z. B. „Ihr Taxi in“ – das letzte Wort steht in der zweiten Zeile'),
        str('headlineHighlight', 'Überschrift (hervorgehoben)', 'z. B. „Gratkorn“'),
        str('subline', 'Unterzeile'),
        {
          type: 'rich-text', name: 'description', label: 'Beschreibung', required: true,
          overrides: { toolbar: ['bold'], showFloatingToolbar: false },
        },
      ],
    },
    { type: 'image', name: 'heroImage', label: 'Hintergrundbild (optional – sonst das Bild der Startseite)' },
    {
      type: 'object', name: 'local', label: 'Lokaler Inhalt', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        {
          type: 'rich-text', name: 'body', label: 'Text', required: true,
          description: '300–500 Wörter über den Ort – kein Text, in dem nur der Ortsname getauscht ist.',
          overrides: { toolbar: ['heading', 'bold', 'link', 'ul', 'ol'], headingLevels: ['h3'] },
        },
        {
          type: 'object', name: 'facts', label: 'Fakten-Kacheln', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [str('label', 'Beschriftung', 'z. B. „Graz Hauptplatz“'), str('value', 'Wert', 'z. B. „14 km · ca. 20 Min.“')],
        },
      ],
    },
    {
      type: 'object', name: 'order', label: 'So bestellen Sie (Schritte)', required: true,
      description: 'Zahlungsarten und Zusatzleistungen darunter kommen aus den Einstellungen.',
      fields: [
        str('heading', 'Überschrift', 'z. B. „So bestellen Sie Ihr Taxi in Gratkorn“'),
        textarea('intro', 'Einleitung', PLATZHALTER),
        {
          type: 'object', name: 'steps', label: 'Schritte (3)', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [str('title', 'Titel'), textarea('text', 'Text', PLATZHALTER)],
        },
      ],
    },
    {
      type: 'object', name: 'prices', label: 'Richtpreise (optional – Bereich erscheint nur mit Einträgen)',
      fields: [
        { type: 'string', name: 'heading', label: 'Überschrift' },
        {
          type: 'object', name: 'items', label: 'Strecken', list: true,
          ui: { itemProps: (item) => ({ label: item?.route }) },
          fields: [
            { type: 'string', name: 'route', label: 'Strecke', required: true, description: 'z. B. „Gratkorn → Flughafen Graz“' },
            { type: 'string', name: 'price', label: 'Preis', required: true, description: 'z. B. „ca. 45 €“' },
          ],
        },
        { type: 'string', name: 'note', label: 'Hinweis', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'faq', label: 'Häufige Fragen', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        {
          type: 'object', name: 'items', label: 'Fragen', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.question }) },
          fields: [str('question', 'Frage'), textarea('answer', 'Antwort', PLATZHALTER)],
        },
      ],
    },
    {
      type: 'string', name: 'nearbyIntro', label: 'Text über den Nachbarorten', ui: { component: 'textarea' },
      description: 'z. B. „Auch in Graz-Gösting und Graz-Andritz sind wir für Sie unterwegs.“',
    },
    {
      type: 'object', name: 'nearby', label: 'Nachbarorte', list: true,
      ui: { itemProps: (item) => ({ label: item?.ort }) },
      fields: [{ type: 'reference', name: 'ort', label: 'Ortsseite', collections: ['ort'], required: true }],
    },
  ],
}
