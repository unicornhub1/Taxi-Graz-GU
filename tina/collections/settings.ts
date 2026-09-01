import type { Collection } from 'tinacms'

export const settings: Collection = {
  name: 'settings',
  label: 'Einstellungen',
  path: 'content/settings',
  format: 'json',
  match: { include: 'site' },
  ui: {
    global: true,
    allowedActions: { create: false, delete: false },
    router: () => '/',
  },
  fields: [
    {
      type: 'object', name: 'contact', label: 'Kontakt', required: true,
      fields: [
        { type: 'string', name: 'phone', label: 'Telefonnummer (Anzeige)', required: true, description: 'z. B. +43 660 1083003' },
        { type: 'string', name: 'whatsapp', label: 'WhatsApp-Nummer (nur Ziffern inkl. Ländervorwahl)', required: true, description: 'z. B. 436601083003' },
        { type: 'string', name: 'email', label: 'E-Mail-Adresse', required: true },
      ],
    },
    {
      type: 'object', name: 'address', label: 'Adresse', required: true,
      fields: [
        { type: 'string', name: 'street', label: 'Straße & Hausnummer', required: true },
        { type: 'string', name: 'zip', label: 'PLZ', required: true },
        { type: 'string', name: 'city', label: 'Ort', required: true },
        { type: 'string', name: 'country', label: 'Land', required: true },
      ],
    },
    {
      type: 'object', name: 'company', label: 'Firmendaten', required: true,
      fields: [
        { type: 'string', name: 'legal', label: 'Firmenname (rechtlich)', required: true },
        { type: 'string', name: 'owner', label: 'Inhaber/in', required: true },
        { type: 'string', name: 'uid', label: 'UID-Nummer (leer lassen, wenn keine)' },
        { type: 'string', name: 'register', label: 'Firmenbuchnummer', required: true },
        { type: 'string', name: 'court', label: 'Firmenbuchgericht', required: true },
      ],
    },
    {
      type: 'object', name: 'google', label: 'Google-Bewertungen', required: true,
      fields: [
        { type: 'number', name: 'rating', label: 'Durchschnittsbewertung (z. B. 4.9)', required: true },
        { type: 'number', name: 'reviews', label: 'Anzahl Bewertungen', required: true },
        { type: 'string', name: 'mapsUrl', label: 'Link zum Google-Profil', required: true },
      ],
    },
    {
      type: 'object', name: 'seo', label: 'SEO', required: true,
      fields: [
        { type: 'string', name: 'siteName', label: 'Seitenname', required: true },
        { type: 'string', name: 'url', label: 'Website-URL (ohne Slash am Ende)', required: true },
        { type: 'string', name: 'defaultTitle', label: 'Titel der Startseite (Browser-Tab / Google)', required: true },
        { type: 'string', name: 'description', label: 'Beschreibung (Google-Snippet)', required: true, ui: { component: 'textarea' }, description: 'Platzhalter erlaubt: {phone}, {email}, {rating}, {reviews}' },
        { type: 'string', name: 'keywords', label: 'Keywords', list: true },
      ],
    },
    {
      type: 'object', name: 'footer', label: 'Footer', required: true,
      fields: [
        { type: 'string', name: 'description', label: 'Kurztext im Footer', required: true, ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'design', label: 'Design', required: true,
      fields: [
        { type: 'string', name: 'accentColor', label: 'Akzentfarbe', required: true, ui: { component: 'color', colorFormat: 'hex' } },
        { type: 'image', name: 'logo', label: 'Logo (optional – ersetzt das Standard-Logo)' },
        { type: 'image', name: 'heroImage', label: 'Hintergrundbild Startseite', required: true },
      ],
    },
  ],
}
