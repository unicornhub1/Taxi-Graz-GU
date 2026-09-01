import type { Collection, TinaField } from 'tinacms'

const SERVICE_ICONS = ['Plane', 'Crown', 'Package', 'Car', 'CalendarClock', 'Accessibility', 'MapPin', 'Clock', 'Shield', 'Star']
const AREA_ICONS = ['Building2', 'Trees', 'MapPin']

const str = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description,
})
const textarea = (name: string, label: string, description?: string): TinaField => ({
  type: 'string', name, label, required: true, description, ui: { component: 'textarea' },
})
const PLATZHALTER = 'Platzhalter erlaubt: {phone}, {email}, {rating}, {reviews}'

export const home: Collection = {
  name: 'home',
  label: 'Startseite',
  path: 'content/pages',
  format: 'json',
  match: { include: 'home' },
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => '/',
  },
  fields: [
    {
      type: 'object', name: 'hero', label: 'Hero (oberster Bereich)', required: true,
      fields: [
        str('badge', 'Badge-Text', 'z. B. „Jetzt verfügbar"'),
        str('headline', 'Überschrift (Teil 1)', 'z. B. „Ihr Taxi in"'),
        str('headlineHighlight', 'Überschrift (hervorgehoben)', 'z. B. „Graz"'),
        str('subline', 'Unterzeile'),
        {
          type: 'rich-text', name: 'description', label: 'Beschreibung', required: true,
          overrides: { toolbar: ['bold'], showFloatingToolbar: false },
        },
        str('ctaCall', 'Button „Anrufen"'),
        str('ctaWhatsapp', 'Button „WhatsApp"'),
        str('cardTitle', 'Titel der Kontaktkarte'),
        str('scrollHint', 'Scroll-Hinweis'),
      ],
    },
    {
      type: 'object', name: 'trustBar', label: 'Vertrauensleiste', required: true,
      fields: [
        {
          type: 'object', name: 'items', label: 'Kacheln', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.value }) },
          fields: [str('value', 'Wert (groß)', PLATZHALTER), str('label', 'Beschriftung', PLATZHALTER)],
        },
      ],
    },
    {
      type: 'object', name: 'marquee', label: 'Laufband', required: true,
      fields: [{ type: 'string', name: 'items', label: 'Begriffe', list: true, required: true }],
    },
    {
      type: 'object', name: 'services', label: 'Leistungen', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift (Teil 1)'),
        str('headingHighlight', 'Überschrift (hervorgehoben)'),
        textarea('intro', 'Einleitungstext'),
        {
          type: 'object', name: 'items', label: 'Leistungen', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: 'string', name: 'icon', label: 'Icon', required: true, options: SERVICE_ICONS },
            str('title', 'Titel'),
            textarea('description', 'Beschreibung'),
          ],
        },
      ],
    },
    {
      type: 'object', name: 'whyUs', label: 'Warum wir (Zahlen)', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift (Teil 1)'),
        str('headingHighlight', 'Überschrift (hervorgehoben)'),
        {
          type: 'object', name: 'stats', label: 'Zahlen', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.label }) },
          fields: [
            { type: 'number', name: 'value', label: 'Zahl (wird hochgezählt)', required: true },
            { type: 'string', name: 'suffix', label: 'Anhang (z. B. „/7", „+", „ Min")' },
            str('label', 'Beschriftung'),
            str('sub', 'Zusatz', PLATZHALTER),
          ],
        },
        str('ctaLabel', 'Button-Text'),
        str('ctaWhatsappLabel', 'WhatsApp-Linktext'),
      ],
    },
    {
      type: 'object', name: 'pricing', label: 'Preise', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        textarea('text', 'Text'),
        str('ctaCall', 'Button „Anrufen"'),
        str('ctaWhatsapp', 'Button „WhatsApp"'),
        str('boxTitle', 'Titel der Vorteile-Box'),
        { type: 'string', name: 'benefits', label: 'Vorteile', list: true, required: true },
        str('boxCtaText', 'Text über der Telefonnummer'),
      ],
    },
    {
      type: 'object', name: 'serviceAreas', label: 'Service-Gebiete', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        textarea('intro', 'Einleitungstext'),
        {
          type: 'object', name: 'groups', label: 'Gebietsgruppen', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            str('title', 'Gruppentitel'),
            { type: 'string', name: 'icon', label: 'Icon', required: true, options: AREA_ICONS },
            { type: 'string', name: 'areas', label: 'Orte / Routen', list: true, required: true },
          ],
        },
      ],
    },
    {
      type: 'object', name: 'testimonials', label: 'Kundenstimmen', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift (Teil 1)'),
        str('headingHighlight', 'Überschrift (hervorgehoben)'),
        textarea('intro', 'Einleitungstext', PLATZHALTER),
        {
          type: 'object', name: 'items', label: 'Bewertungen', list: true, required: true,
          ui: { itemProps: (item) => ({ label: item?.name }) },
          fields: [
            str('name', 'Name'),
            { type: 'number', name: 'rating', label: 'Sterne (1–5)', required: true },
            textarea('text', 'Text'),
            str('date', 'Datum (z. B. „vor 2 Monaten")'),
          ],
        },
        str('googleLinkLabel', 'Linktext zu Google', PLATZHALTER),
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
      type: 'object', name: 'cta', label: 'Abschluss-Aufruf', required: true,
      fields: [
        str('eyebrow', 'Kleine Überschrift'),
        str('heading', 'Überschrift'),
        textarea('text', 'Text'),
        str('formLinkLabel', 'Linktext zum Kontaktformular'),
      ],
    },
  ],
}
