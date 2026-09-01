# TinaCMS-Integration für taxigraz-gu.at – Design

Stand: 2026-09-01 · Branch: `feat/tina-cms` · Status: freigegeben (Felix, 2026-09-01)

## Ziel

Der Kunde (Taxi Graz GU) soll alle Inhalte und ausgewählte Design-Einstellungen der Website selbst pflegen können, ohne dass das bestehende Design (Layout, Typografie, Animationen) verändert werden kann. Bearbeitung mit Live-Vorschau (Visual Editing) unter `/admin`. Keine laufenden Kosten (Tina Cloud Free, Vercel wie bisher).

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| CMS | TinaCMS 3.x (Git-basiert, Tina Cloud für Auth/Content-API, Inhalte als JSON/MDX im Repo) |
| Content-Modell | **Feste Sektionen** – Reihenfolge/Layout bleiben im Code, Kunde pflegt nur Inhalte darin. Kein Block-Builder. |
| Design-Einstellungen | Akzentfarbe, Logo-Upload (optional), Hero-Bild. Fonts bleiben fix (DM Serif Display / Outfit via `next/font`). |
| Rechtstexte | Impressum und Datenschutz als **Rich-Text** editierbar. Impressum zusätzlich mit automatischem Firmenblock aus den Einstellungen. |
| Vorschau | **Visual Editing** (Klick-to-Edit im Admin, `useTina` + `tinaField`). |
| Datenquelle | Generierter Tina-GraphQL-Client (`client.queries.*`), lokal gegen `tinacms dev`, auf Vercel gegen Tina Cloud zur Build-Zeit. |
| Hosting | Unverändert Vercel, Repo `Felixzink96/taxi-graz-gu` (Remote `vercel`), Spiegel auf `unicornhub1/Taxi-Graz-GU` (`origin`). |

## 1. Content-Modell

Alle Inhalte liegen unter `content/`. `src/data/*.ts` und `src/lib/constants.ts` (`SITE_CONFIG`) entfallen vollständig.

### 1.1 Einstellungen – `content/settings/site.json` (Single, `global: true`, kein Anlegen/Löschen)

```
contact:  { phone, whatsapp, email }
address:  { street, zip, city, country }
company:  { legal, owner, uid, register, court }
google:   { rating (number), reviews (number), mapsUrl }
seo:      { siteName, url, defaultTitle, description, keywords[] }
design:   { accentColor (color, Default #E8B931), logo (image, optional), heroImage (image) }
```

Abgeleitete Werte (nicht im CMS, Helfer in `src/lib/site.ts`):
- `phoneRaw` = `phone` ohne Leerzeichen/Sonderzeichen außer `+`
- `whatsappLink` = `https://wa.me/<whatsapp nur Ziffern>`
- Akzent-Varianten `--color-gold-light` / `--color-gold-dark` per HSL-Shift aus `accentColor` (`src/lib/color.ts`)

**Platzhalter in Texten:** `{phone}`, `{email}`, `{rating}`, `{reviews}` werden in allen CMS-Textfeldern durch die Einstellungen ersetzt (`interpolate()` in `src/lib/site.ts`). Damit bleiben Telefonnummer und Bewertungszahlen an einer Stelle gepflegt (FAQ-Antworten, TrustBar, Testimonials-Intro).

### 1.2 Startseite – `content/pages/home.json` (Single)

Eine Objekt-Gruppe pro Sektion. Verbindungswörter („oder", „&") bleiben im Code; jede sichtbare Überschrift / jeder Satz / jede Liste ist editierbar.

| Gruppe | Felder |
|---|---|
| `hero` | `badge`, `headline` („Ihr Taxi in"), `headlineHighlight` („Graz"), `subline`, `description` (Rich-Text, nur fett erlaubt), `ctaCall`, `ctaWhatsapp`, `cardTitle`, `scrollHint` |
| `trustBar` | `items[]` { `icon` (Select: Clock, Star, Shield, Accessibility, Car, MapPin), `value`, `label` } – Platzhalter erlaubt |
| `marquee` | `items[]` (string) |
| `services` | `eyebrow`, `heading`, `headingHighlight`, `intro`, `items[]` { `icon` (Select: Plane, Crown, Package, Car, CalendarClock, Accessibility, MapPin, Clock, Shield, Star), `title`, `description` } |
| `whyUs` | `eyebrow`, `heading`, `headingHighlight`, `stats[]` { `value` (number), `suffix`, `label`, `sub` }, `ctaLabel`, `ctaWhatsappLabel` |
| `pricing` | `eyebrow`, `heading`, `text`, `ctaCall`, `ctaWhatsapp`, `boxTitle`, `benefits[]` (string), `boxCtaText` |
| `serviceAreas` | `eyebrow`, `heading`, `intro`, `groups[]` { `title`, `icon` (Select: Building2, Trees, MapPin), `areas[]` (string) } – ersetzt das Index-Slicing (0–15 / 15–25 / 25+) in `ServiceAreas.tsx` |
| `testimonials` | `eyebrow`, `heading`, `headingHighlight`, `intro`, `items[]` { `name`, `rating` (1–5), `text`, `date` }, `googleLinkLabel` |
| `faq` | `eyebrow`, `heading`, `items[]` { `question`, `answer` } |
| `cta` | `eyebrow`, `heading`, `text`, `formLinkLabel` |
| `footer` | `description` |

### 1.3 Kontaktseite – `content/pages/kontakt.json` (Single)

```
seo:   { title, description }
hero:  { eyebrow, heading, text }
cards: { phoneSub, whatsappSub, hoursTitle, hoursValue, hoursSub }
form:  { heading, text }
```

### 1.4 Rechtliches – `content/legal/impressum.mdx`, `content/legal/datenschutz.mdx`

Frontmatter: `title`, `seoDescription`. Body: Rich-Text (Überschriften h2/h3, Absätze, Listen, Links, fett).
- **Impressum:** Seite rendert oben einen festen Firmenblock aus `settings` (Firma, Inhaber, Adresse, Telefon, E-Mail, UID, FN, Gericht), darunter den Rich-Text-Body.
- **Datenschutz:** nur Rich-Text-Body.
- Rendering über `TinaMarkdown` mit eigenen Komponenten (h2, h3, p, ul/ol, a, strong), die die heutigen Tailwind-Klassen der Rechtsseiten übernehmen.

## 2. Tina-Konfiguration

- `tina/config.ts`: Collections `settings`, `home`, `kontakt`, `legal`. Für Single-Dokumente `ui.allowedActions: { create: false, delete: false }`. `ui.router` je Collection → `/`, `/kontakt`, `/impressum` bzw. `/datenschutz`, damit der Admin die passende Seite in der Vorschau öffnet.
- Branch: `process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main'`.
- Media: repo-basiert, `publicFolder: 'public'`, `mediaRoot: 'uploads'`. `public/images/hero-taxi.jpg` wird nach `public/uploads/hero-taxi.jpg` verschoben.
- Frontend-Queries in `tina/queries/frontend.gql`: `homePage` (home + settings), `kontaktPage` (kontakt + settings), `legalPage($relativePath)` (legal + settings), `siteSettings`. Pro Seite genau ein `useTina`.
- `tsconfig.json`: Pfad-Alias `@tina/*` → `./tina/*` für den generierten Client.
- Gitignore/Commit-Regeln für `tina/__generated__` und `public/admin` folgen dem, was `tinacms init` anlegt; `tina-lock.json` wird committet.

## 3. Frontend-Architektur (Visual Editing)

```
layout.tsx (Server)      client.queries.siteSettings()  → <SiteShell data query variables> (Client, useTina)
                                                             ├ ContactBar · Header · Footer · FloatingContact (live Settings)
                                                             └ {children}
page.tsx (Server)        client.queries.homePage()      → <HomeClient …> (Client, useTina)
                                                             └ Hero · TrustBar · Marquee · Services · WhyUs · Pricing
                                                               · ServiceAreas · Testimonials · FAQ · CTA (Props)
kontakt/page.tsx         client.queries.kontaktPage()   → <KontaktClient …>
impressum/page.tsx       client.queries.legalPage()     → <LegalClient …> (Firmenblock + TinaMarkdown)
datenschutz/page.tsx     client.queries.legalPage()     → <LegalClient …> (TinaMarkdown)
```

Regeln:
- Sektions-Komponenten behalten Markup, Klassen und framer-motion **unverändert**. Änderung ausschließlich: Daten kommen als Props statt aus Imports; sichtbare Textelemente erhalten `data-tina-field={tinaField(obj, 'feld')}`.
- `layout.tsx` setzt die Design-Variablen als Inline-Style auf `<html>`: `--color-gold`, `--color-gold-light`, `--color-gold-dark`, `--accent`.
- `Logo.tsx`: alle `#E8B931` → `var(--color-gold)`; bekommt optional `logoSrc` – wenn gesetzt `next/image`, sonst Inline-SVG.
- Grid-Pattern `rgba(232,185,49,0.3)` in Hero, WhyUs, Kontakt → `color-mix(in srgb, var(--color-gold) 30%, transparent)`.
- `StructuredData.tsx` bekommt `settings`, `faq`, `services` als Props (kein direkter Datenimport mehr); wird in `layout.tsx` gerendert.
- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `generateMetadata` lesen Einstellungen über den Tina-Client (Server, Build-Zeit). OG-Image erhält Akzentfarbe/Rating/Reviews aus den Einstellungen.
- `api/contact/route.ts` bleibt unverändert (nutzt nur Env-Variablen).

## 4. Build, Dev & Deployment

- `package.json` Scripts: `dev` → `tinacms dev -c "next dev"`, `build` → `tinacms build && next build`. Neue Deps: `tinacms`, `@tinacms/cli` (dev).
- Lokal: Admin unter `http://localhost:3000/admin`, GraphQL lokal auf Port 4001, kein Cloud-Account nötig.
- Vercel-Env (Production + Preview): `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN` (Read-only-Token). Ohne diese Variablen schlägt `tinacms build` fehl → Env muss vor dem Merge gesetzt sein.
- Checkliste für Felix in `docs/tina-cloud-setup.md`: Tina-Cloud-Projekt anlegen (GitHub-Login `Felixzink96`), Repo `Felixzink96/taxi-graz-gu` verbinden, Client-ID + Token nach Vercel, Site-URL `https://taxigraz-gu.at` eintragen, Kunden als Editor einladen, Admin-Kurzanleitung für den Kunden.

## 5. Verifikation (Design darf nicht brechen)

1. **Baseline vor Umbau:** Screenshots von `/`, `/kontakt`, `/impressum`, `/datenschutz` (Desktop 1440 px + Mobile 390 px) in den Session-Scratchpad.
2. **Nach Umbau:** identische Screenshots, visueller Vergleich Seite für Seite; Abweichungen nur bei bewusst geänderten Stellen (Hero-Bildpfad, Grid-Farbe optisch identisch).
3. `npm run lint` und `npm run build` (mit laufendem `tinacms dev` für den lokalen GraphQL-Server) fehlerfrei.
4. Admin-Durchlauf lokal: Text ändern → Vorschau aktualisiert live → speichern → JSON-Datei geändert; Akzentfarbe ändern → Seite färbt sich komplett um (inkl. Logo, Buttons, Grid); Hero-Bild tauschen.
5. Kontaktformular-Route unverändert funktionsfähig (Smoke-Test per `curl`).

Merge in `main` und Push auf beide Remotes erst nach Freigabe durch Felix.

## 6. Risiken

- **Tina 3 + Next 16 / React 19:** Peer-Deps passen (`react >=16.14`), aber die Kombination ist neu. Wenn Admin-Route oder `useTina` nicht sauber laufen → stoppen und Rücksprache, nicht basteln.
- **Build-Abhängigkeit von Tina Cloud:** Vercel-Build braucht die Content-API. Bei Ausfall schlägt der Build fehl, die bereits deployte Seite bleibt online.
- **Media-Limit 100 MB:** Bilder vor Upload komprimieren (< 1 MB).
- **Rich-Text-Migration der Rechtstexte:** Typografie wird über eigene `TinaMarkdown`-Komponenten nachgebaut; Screenshot-Vergleich deckt Abweichungen auf.

## Nicht im Umfang

Block-Builder / Sektionen umsortieren, Font-Auswahl, mehrsprachige Inhalte, weitere Seiten, Self-Hosting von Tina.

## Abweichungen in der Umsetzung (2026-09-01)

1. `footer.description` liegt in den Einstellungen (`content/settings/site.json`), nicht in `home.json`.
2. Keine Custom-GraphQL-Queries: Die Einstellungen werden per React-Context aus `SiteShell` an die Komponenten weitergereicht statt clientseitig nachgeladen.
3. Die TrustBar wurde ohne Icons umgesetzt (nur Zahlen/Labels), abweichend vom ursprünglich skizzierten Icon-Layout.
4. Der Firmenblock im Impressum wird über ein Frontmatter-Flag `showCompanyBlock` gesteuert statt fest im Markup verdrahtet zu sein.
5. Impressum-Reihenfolge geändert: Der Firmenblock (§ 5 ECG, Kontakt, UID/Firmenbuchnummer, Firmenbuchgericht) steht gesammelt oben; „Unternehmensgegenstand" folgt danach.
6. Rich-Text in den JSON-Collections wird als Markdown-String gespeichert (Tina-Standard für `type: rich-text` in JSON-Format); die GraphQL-Query liefert daraus den AST, den `TinaMarkdown` rendert.
7. Die Screenshot-Verifikation (vorher/nachher) lief über ein eigenes Playwright-Skript statt über eine Headless-CLI, da die Playwright-MCP-Tools in der Ausführungsumgebung nicht verfügbar waren.
8. Title-Fix: Unterseiten (`kontakt`, `impressum`, `datenschutz`) setzen `title: { absolute: fullTitle }` (in `src/lib/metadata.ts`, `createMetadata`) statt eines einfachen Strings, damit das `template: '%s | Taxi Graz GU'` aus dem Root-Layout den Seitennamen nicht ein zweites Mal anhängt.
9. ESLint ignoriert generierte/Tina-eigene Verzeichnisse (`tina/__generated__`, `public/admin`), damit deren Auto-Code nicht gegen die Projekt-Lint-Regeln verstößt.
10. Nachforderung als eigener Task 11: Navigation, Kontakt-Beschriftungen (Telefon/WhatsApp/E-Mail) und die Footer-Texte wurden zusätzlich in die Einstellungen verschoben; der Footer-Credit („Design by Unicorn Factory") bleibt fest im Code.
11. Datenschutz-Typografie: `space-y-1`-Blöcke → harte Zeilenumbrüche, `space-y-10` → `space-y-8`, Listen `space-y-2` → `space-y-1` (Seitenhöhe −164 px); Impressum h3→p `mt-1` → `mt-3`.
12. `runtime = 'edge'` aus `opengraph-image.tsx` entfernt (Bild wird beim Build statisch erzeugt).
13. Legal-Collection hat zusätzlich das Frontmatter-Feld `intro` (Untertitel im Kopfbereich).
14. `robots.ts` verbietet zusätzlich `/admin`.
15. JSON-LD: Service-Beschreibungen kommen aus den sichtbaren Leistungstexten, die LocalBusiness-`description` ist die Meta-Description (mit Platzhaltern aufgelöst).
16. Akzent-Palette: für die Standardfarbe `#E8B931` exakt die Originaltöne `#F5D668`/`#C99B1D`; für andere Farben Ableitung per HSL (Sättigung + Helligkeit verschoben).
