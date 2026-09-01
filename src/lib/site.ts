import type { SettingsQuery } from '@tina/__generated__/types'

export type SiteSettings = SettingsQuery['settings']

/** "+43 660 1083003" → "+436601083003" (für tel:-Links) */
export function phoneRaw(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

/** WhatsApp-Nummer → https://wa.me/<nur Ziffern> */
export function whatsappLink(whatsapp: string): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, '')}`
}

/** Ersetzt {phone}, {email}, {rating}, {reviews} in CMS-Texten. */
export function interpolate(text: string, settings: SiteSettings): string {
  const values: Record<string, string> = {
    phone: settings.contact.phone,
    email: settings.contact.email,
    rating: String(settings.google.rating),
    reviews: String(settings.google.reviews),
  }
  return text.replace(/\{(phone|email|rating|reviews)\}/g, (_match, key: string) => values[key])
}

/** Entfernt null/undefined aus Tina-Listen (GraphQL liefert Maybe<Array<Maybe<T>>>). */
export function compact<T>(list: ReadonlyArray<T | null | undefined> | null | undefined): T[] {
  return (list ?? []).filter((item): item is T => item !== null && item !== undefined)
}
