# Ortsseiten für taxigraz-gu.at – Design

Stand: 2026-09-21 · Branch: `feat/ortsseiten` · Status: Entwurf, wartet auf Freigabe durch Felix

## Ziel

Der Kunde (Erol Aktas, Taxi Graz GU) will ohne zusätzliche Domains in der lokalen Suche für Grazer Bezirke und Umlandgemeinden auftauchen. Umgesetzt wird das über eigene Ortsseiten (`/taxi-<ort>`), die ins bestehende Design passen und im Footer, im Menü (über die Übersichtsseite) und auf der Startseite verlinkt sind. Jede Seite ist auf ihr Keyword optimiert. Der Kunde kann die Seiten im CMS pflegen und weitere Orte selbst anlegen.

## Ausgangslage (Daten vom 21.09.2026)

Search Console `sc-domain:taxigraz-gu.at`, Zeitraum 18.06.–18.09.2026:

- **„taxi graz“:** 36.279 Impressionen, Position 1,6. Die Startseite deckt das Keyword ab, deshalb bekommt es **keine eigene Seite**.
- **Die Startseite ist in Google auf zwei URLs aufgeteilt:** `http://www.taxigraz-gu.at/` (72.562 Impressionen, Pos. 2,3) und `https://taxigraz-gu.at/` (37.022 Impressionen, Pos. 21,0). Ursache: Canonical, Sitemap und og:url zeigen auf `https://taxigraz-gu.at`, und diese Adresse leitet per **307** auf `www` um.
- **Es ist keine Sitemap eingereicht.**
- **Ortssuchen landen heute auf der Startseite**, meist auf Position 5–17. Beispiele: taxi gratkorn 933 Impressionen / Pos. 9,5; taxi hart bei graz 379 / 9,3; taxi lassnitzhöhe 193 / 4,7; taxi graz flughafen und Varianten ≈ 350 / 7–25; taxi andritz ≈ 170 / 7–8; taxi graz mariatrost 80 / 6,3; taxi raaba grambach 137 / 25,3.

## Entscheidungen

| Frage | Entscheidung |
|---|---|
| Seitenliste | **Nur die Orte aus der Kundenliste** (Abschnitt 1). Taxi Graz, Taxi Graz Stadt und Taxi Graz 24h → Startseite. „Bezirke“ → Übersichtsseite. |
| Ansatz | CMS-Collection „Ortsseiten“ plus **eine** gemeinsame Vorlage. Keine hartcodierten Einzelseiten und keine automatisch erzeugten Seiten, bei denen nur der Name getauscht wird (Doorway-Risiko). |
| URLs | Flach und einheitlich `/taxi-<ort>`, auch der Flughafen: `/taxi-flughafen-graz`. Übersicht unter `/einsatzgebiete`. |
| Inhalte | Wir recherchieren selbst. Entfernungen und Fahrzeiten werden per Routing (OpenStreetMap/OSRM) berechnet, nicht geschätzt. Das Preisfeld ist optional, Erol kann es später füllen. |
| Menü | Der Menüpunkt „Service-Gebiete“ führt auf `/einsatzgebiete`. Kein Dropdown. |
| Footer | Eigene Zeile „Einsatzgebiete“ über dem Copyright, gefüllt automatisch aus allen Ortsseiten. |

## 1. Seitenliste

| Ortsseite | URL | Region | Anmerkung |
|---|---|---|---|
| Flughafen Graz | `/taxi-flughafen-graz` | Spezial | deckt „taxi graz flughafen“, „flughafen taxi graz“ und „airport taxi graz“ ab |
| Gratkorn | `/taxi-gratkorn` | Graz-Umgebung | |
| Hart bei Graz | `/taxi-hart-bei-graz` | Graz-Umgebung | **Pachern** wird im Text mit abgedeckt, keine eigene Seite |
| Laßnitzhöhe | `/taxi-lassnitzhoehe` | Graz-Umgebung | |
| Raaba-Grambach | `/taxi-raaba-grambach` | Graz-Umgebung | offizieller Gemeindename, so wird auch gesucht |
| Vasoldsberg | `/taxi-vasoldsberg` | Graz-Umgebung | |
| Hitzendorf | `/taxi-hitzendorf` | Graz-Umgebung | |
| Andritz | `/taxi-andritz` | Graz Stadt | Title/H1 mit „Graz-Andritz“ (beide Suchvarianten) |
| Eggenberg | `/taxi-eggenberg` | Graz Stadt | Title/H1 mit „Graz-Eggenberg“ |
| Gösting | `/taxi-goesting` | Graz Stadt | |
| Mariatrost | `/taxi-mariatrost` | Graz Stadt | |
| Ragnitz | `/taxi-ragnitz` | Graz Stadt | **offen:** Grazer Stadtteil gemeint (angenommen) oder die Gemeinde Ragnitz im Bezirk Leibnitz? |

Dazu kommt die Übersichtsseite `/einsatzgebiete`. Insgesamt sind das 12 Ortsseiten und eine Übersicht.

## 2. Inhaltsmodell (TinaCMS)

### 2.1 Collection `ort` – `content/orte/<slug>.json` (Anlegen und Löschen erlaubt)

- **Dateiname = URL:** Der Dateiname wird automatisch aus dem Ortsnamen erzeugt: `taxi-` + Slug, Umlaute als ae/oe/ue, ß als ss, Leerzeichen als `-`. Das Feld ist nicht editierbar (`ui.filename.readonly`). Das Präfix `taxi-` verhindert Kollisionen mit `/kontakt`, `/impressum` usw.
- `ui.router`: `/${document._sys.filename}` für Visual Editing.

| Feld | Typ | Hinweis im CMS |
|---|---|---|
| `name` | string (isTitle) | Ortsname, z. B. „Gratkorn“ |
| `region` | select | `graz-stadt` · `graz-umgebung` · `spezial` |
| `seo.title` | string | „max. 40 Zeichen – ‚ \| Taxi Graz GU‘ wird automatisch angehängt“ |
| `seo.description` | textarea | „max. 140 Zeichen“, Platzhalter erlaubt |
| `hero.badge`, `hero.headline`, `hero.headlineHighlight`, `hero.subline` | string | z. B. „Ihr Taxi in“ + „Gratkorn“ |
| `hero.description` | rich-text (nur fett) | wie auf der Startseite |
| `heroImage` | image (optional) | ohne eigenes Bild wird `settings.design.heroImage` verwendet |
| `local.eyebrow`, `local.heading` | string | |
| `local.body` | rich-text (h2/h3, fett, Listen, Links) | 300–500 Wörter Unique Content |
| `local.facts[]` | object {label, value} | z. B. „Graz Hauptplatz“ / „14 km · ca. 20 Min.“ |
| `prices` (optional) | object {heading, items[] {route, price}, note} | Die Sektion erscheint nur, wenn `items` nicht leer ist |
| `faq.heading`, `faq.items[]` | object {question, answer} | 3–5 lokale Fragen, Platzhalter erlaubt |
| `nearby[]` | object {ort: reference → `ort`} | Nachbarorte für die Querverlinkung |

Button-Beschriftungen, Bewertungskarte und Scroll-Hinweis des Hero kommen von der Startseite (`home.hero`). Auf jeder Ortsseite gepflegt werden nur Badge, Überschrift, Unterzeile und Beschreibung.

### 2.2 Collection `einsatzgebiete` – `content/pages/einsatzgebiete.json` (eine einzelne Seite)

`seo {title, description}`, `hero {eyebrow, heading, text}`, `groupLabels {grazStadt, grazUmgebung, spezial}`, `cardLinkLabel`. Die Liste der Orte wird nicht gepflegt, sondern kommt automatisch aus der Collection `ort`. **Title, H1 und Text der Übersicht zielen nicht auf „Taxi Graz“ oder „Taxi Graz Umgebung“**, damit sie der Startseite (Position 1,5 bzw. 1,6) keine Konkurrenz macht. Beispiel: „Einsatzgebiete – alle Orte im Überblick“.

### 2.3 Änderungen an bestehenden Collections

- **`home.serviceAreas.groups[].areas`:** Aus der String-Liste wird eine Objekt-Liste `{label, ort?: reference → ort}`. Ein Chip mit Verweis wird zum Link. Die bestehenden Einträge werden 1:1 als `{label}` migriert, danach werden die Verweise für die 12 Orte gesetzt.
- **`settings.areaLabels`** (neue Gruppe „Beschriftungen Einsatzgebiete“): `footerHeading`, `allAreas`, `nearbyEyebrow`, `nearbyHeading`, `breadcrumbHome`, `breadcrumbHub`. Die Texte liegen in den Einstellungen, weil diese auf jeder Seite verfügbar sind (Startseite, Ortsseite, Footer). Das ersetzt die ursprünglich geplanten Felder `home.serviceAreas.allAreasLabel` und `settings.footer.areasHeading`.
- **Inhaltsänderung in `settings.navigation.main`:** „Service-Gebiete“ `/#gebiete` → `/einsatzgebiete`.

## 3. Seitenaufbau

**Ortsseite:**
1. Hero (bestehende Komponente, Bild optional pro Ort)
2. TrustBar (Inhalt aus der Startseite)
3. ★ Breadcrumb, sichtbar (Start › Einsatzgebiete › Ort)
4. ★ `LocalInfo`: Text links, Fakten-Kacheln rechts
5. ★ `LocalPrices`: nur wenn ausgefüllt, optisch wie die Preisbox
6. Services und Testimonials (Inhalte aus der Startseite)
7. FAQ (bestehende Komponente, lokale Daten)
8. ★ `NearbyAreas`: Link-Chips im Stil der Gebietsliste plus „Alle Einsatzgebiete →“
9. CTA (Inhalt aus der Startseite)

**Übersicht `/einsatzgebiete`:** dunkler, kompakter Kopfbereich wie auf der Kontaktseite. Darunter Karten pro Region (Ortsname, erste Fakten-Kachel, Link). Am Ende die CTA.

**Startseite:** Die verknüpften Chips in der Gebietsliste werden zu `<Link>`, alles andere bleibt unverändert. Neu ist der Link „Alle Einsatzgebiete →“.

**Footer:** neue Zeile unter dem 4-Spalten-Raster und über dem Copyright: Überschrift plus Links in 2–4 Spalten, responsiv.

**Regel aus dem Tina-Projekt:** Markup, Klassen und framer-motion der bestehenden Sektionen bleiben unverändert. `Hero` und `FAQ` bekommen strukturelle Prop-Typen statt `HomeQuery`-Typen, damit sie auch Ortsdaten annehmen. `Hero` bekommt zusätzlich eine optionale Prop `imageSrc`.

## 4. Routing und Datenfluss

```
layout.tsx (Server)        settings + home + ortConnection (Name, Region, Slug)
                             → SiteShell (Footer-Zeile) · StructuredData (TaxiService, areaServed)
[slug]/page.tsx (Server)   Slug ohne Präfix taxi- → notFound(); sonst ort(<slug>.json) + home
                             → OrtClient (useTina auf ort; home-Sektionen als Props)
                             · generateStaticParams aus ortConnection, dynamicParams = true
                             · generateMetadata über createMetadata (self-canonical /<slug>)
einsatzgebiete/page.tsx    einsatzgebiete + ortConnection → EinsatzgebieteClient
sitemap.ts                 + /einsatzgebiete + alle Orte
```

- Feste Routen (`kontakt`, `impressum`, `datenschutz`, `sitemap.xml`, `robots.txt`, `opengraph-image`) haben Vorrang vor `[slug]`. Die Rewrite-Regel für `/admin` (afterFiles) greift ebenfalls vor dynamischen Routen, das prüfen wir im Test.
- Ein neuer Ort aus dem CMS ist ein reiner Inhalts-Commit. Der Build wird übersprungen, und die Seite wird beim ersten Aufruf erzeugt (ISR). Footer, Übersicht und Sitemap aktualisieren sich spätestens nach 60 Sekunden oder sofort per Webhook.
- Ist Tina Cloud nicht erreichbar, liefert Vercel die zuletzt gecachte Version aus. Das Verhalten ist unverändert.

## 5. SEO und strukturierte Daten

- **Title:** CMS-Feld höchstens 40 Zeichen plus „ | Taxi Graz GU“, also höchstens 57 Zeichen. **Meta-Description** höchstens 140 Zeichen. Genau eine H1 (im Hero). Self-Canonical. OG-Bild global wie bisher.
- **Interne Links:** Startseite (Chips) → Orte; Footer → alle Orte; Übersicht → alle Orte; Ort → Nachbarorte und Übersicht. Ankertexte lauten „Taxi <Ort>“.
- **Umbau der strukturierten Daten** (bisher geben alle Seiten FAQ und eine falsche Breadcrumb-Liste der Startseite aus):

| Seite | JSON-LD |
|---|---|
| alle (Layout) | `TaxiService` mit `@id` `<url>/#taxiservice`; `areaServed` = Graz, Graz-Umgebung, Flughafen Graz plus alle Orte |
| Startseite | `FAQPage` (FAQ der Startseite) |
| Ortsseite | `Service` (serviceType „Taxi“, `areaServed` = Ort, `provider` → `@id`), `FAQPage` (lokal), `BreadcrumbList` |
| Übersicht | `BreadcrumbList` |
| Kontakt, Impressum, Datenschutz | nur der globale `TaxiService` |

Die Schema-Bausteine werden reine Funktionen in `src/lib/schema.ts`, damit sie testbar sind.

## 6. Vorab-Fixes (eigener Commit, kann sofort live)

1. `content/settings/site.json`: `seo.url` → `https://www.taxigraz-gu.at`. Damit stimmen Canonical, Sitemap, Robots, og:url und `metadataBase`.
2. `content/settings/site.json`: `labels.phone` „Telefon!“ → „Telefon“ (Rest aus dem Webhook-Test).
3. **Felix, im Vercel-Dashboard:** Domains › `taxigraz-gu.at` › Weiterleitung auf www von 307 auf **308**.
4. **Felix, in der Search Console:** Sitemap `https://www.taxigraz-gu.at/sitemap.xml` einreichen. Unser API-Zugang ist nur lesend.

## 7. Verifikation

- **vitest:** Slug-Erzeugung (Laßnitzhöhe → `taxi-lassnitzhoehe`, Gösting → `taxi-goesting`, Hart bei Graz → `taxi-hart-bei-graz`); Schema-Bausteine; Sitemap enthält Übersicht und alle Orte; `[slug]` ohne Präfix oder unbekannt → `notFound`.
- `npm run lint`, `npm test`, `npm run build:local` fehlerfrei.
- **Screenshots** Desktop 1440 px und Mobil 390 px: Startseite vorher/nachher (Abweichung nur bei den Chip-Links und dem neuen Link), eine Ortsseite, Übersicht, Footer.
- **Lighthouse mobil** auf einer Ortsseite: LCP unter 2,5 s, CLS 0.
- **Lokaler Admin-Durchlauf:** Ortsseite bearbeiten (Live-Vorschau), neuen Test-Ort anlegen → URL, Footer und Sitemap prüfen → Test-Ort wieder löschen. `/admin` bleibt erreichbar.
- **Nach dem Deploy live:** alle URLs liefern 200, Title/Meta/Canonical/JSON-LD im echten HTML, Rich-Results-Test, `/sitemap.xml`.

## 8. Rollout

1. Vorab-Fixes (Abschnitt 6) sofort als Inhalts-Commit auf `main`.
2. Umsetzung auf `feat/ortsseiten`: zuerst Code, dann die 12 Ortsdateien und die Übersicht.
3. Push nach `origin` → Vercel-Preview. **Voraussetzung (Felix):** Der Branch ist in Tina Cloud indiziert (Project › Branches).
4. Felix prüft alle Texte auf der Preview. Danach Merge nach `main`, Push auf `origin` und `vercel`.
5. Live-Check (Abschnitt 7). Danach in der Search Console die URL-Prüfung für die Übersicht und die Top-Orte (Gratkorn, Hart, Flughafen, Laßnitzhöhe).
6. `docs/tina-cloud-setup.md`: Kundenanleitung um „Neue Ortsseite anlegen“ ergänzen.

## 9. Aufwand

| Schritt | Stunden |
|---|---|
| Vorab-Fixes | 0,5 |
| Umbau der strukturierten Daten | 1,5 |
| Collection, Vorlage und neue Bausteine | 4 |
| Übersicht, Verlinkung und Sitemap | 2 |
| Inhalte (Routing-Daten und 12 Texte plus Übersicht) | 6–8 |
| Prüfung und Launch | 2 |
| **Gesamt** | **≈ 16–18** |

Jeder weitere Ort kostet danach nur noch den Inhalt (etwa 30–45 Minuten), oder der Kunde legt ihn selbst an.

## 10. Offene Punkte

- **Ragnitz:** Ist der Grazer Stadtteil gemeint (angenommen) oder die Gemeinde im Bezirk Leibnitz?
- **Pachern:** Die Annahme „Ortsteil von Hart bei Graz, wird auf dieser Seite mit abgedeckt“ bitte bestätigen.
- **„GU-Taxi Gratkorn (das Original seit 2013)“:** In der Search Console gibt es rund 600 Impressionen für diesen Namen. Vermutlich ist das ein anderer Anbieter. Vor dem Gratkorn-Text klären, ob das unser Kunde ist, damit wir keine fremde Marke verwenden.

## Nicht im Umfang

Dropdown-/Mega-Menü, eigene Bilder pro Ort (das Feld gibt es, befüllt wird es nicht), Seiten für „Taxi Graz“, „Taxi Graz Stadt“ oder „Taxi Graz 24h“, Mehrsprachigkeit.

## Kandidaten für eine zweite Welle (Nachfrage laut Search Console, nicht beauftragt)

| Ort | Impressionen (3 Monate) | Position heute |
|---|---|---|
| Gratwein-Straßengel | 435 | 4–26 |
| Kalsdorf bei Graz | 361 | 11–17 |
| Feldkirchen bei Graz | 296 | 16,8 |
| Liebenau | 183 | 3,1 |
| Seiersberg(-Pirka) | 193 | 8–24 |
| Puntigam | 131 | 3–4,5 |
| Hausmannstätten | 100 | 7,4 |

Diese Orte haben mehr Nachfrage als Hitzendorf, Gösting und Ragnitz (dort 0 Impressionen). Wir bieten sie dem Kunden als Erweiterung an. Per CMS ist das reiner Inhaltsaufwand.

## Abweichungen in der Umsetzung (2026-09-21)

1. **Neue Sektion „So bestellen Sie Ihr Taxi in <Ort>“** (`OrderSteps`, Felix-Wunsch): drei Schritte als Route auf Anthrazit, H2 mit Keyword und Ort, `<ol>` mit H3, einmalig fahrendes Taxi-Dachschild (mit reduzierter Bewegung statisch). Pro Ort im CMS: `order { heading, intro, steps[3] }`. Zahlungsarten und Zusatzleistungen liegen zentral in `settings.orderLabels`. Reihenfolge der Ortsseite: … LocalInfo → **OrderSteps** → Richtpreise → Leistungen …
2. Der Satz zu den Nachbarorten ist als Feld `nearbyIntro` in die Sektion „Nachbarorte“ gewandert. Deshalb gilt die Textgrenze für den Fließtext jetzt mit **250–500 Wörtern** (statt 300–500), zusätzlich zur Bestell-Sektion und den FAQ.
3. Die **Fakten-Kacheln scrollen ab Desktop mit** (`lg:sticky lg:top-28`), bis der Text endet.
4. Die **Flughafen-Seite** hat als dritte Kachel „Erreichbar – 24/7, auch für Frühflüge“ statt einer Entfernung zum Flughafen.
5. **Nachbarorte** sind nicht strikt die drei nächsten laut Skript, sondern sinnvoll gegenseitig verknüpft (z. B. Eggenberg ↔ Hitzendorf, Gösting ↔ Gratkorn).
6. `CTA.tsx`: Der Kontakt-Link nutzt `next/link` statt `<a>`. Mit der neuen Route `[slug]` hätte ESLint sonst einen Fehler gemeldet.
7. Die **Startseiten-Chips** sind verknüpft. Neu dazugekommen sind „Taxi Graz Ragnitz“, „Taxi Vasoldsberg“ und „Taxi Hitzendorf“. „Taxi Raaba“ heißt jetzt „Taxi Raaba-Grambach“.
8. **Geklärte offene Punkte:** Ragnitz ist der Grazer Stadtteil (Katastralgemeinde Ragnitz, Bezirk Ries). „GU-Taxi Gratkorn (das Original seit 2013)“ ist gu-taxi.at, ein anderer Anbieter; ein Test schließt die Marke in den Inhalten aus. Pachern liegt in Hart bei Graz (dort ein eigener Abschnitt).
9. Der Screenshot-/Browser-Check lief über ein eigenes Playwright-Skript (lokales Chromium), weil das Playwright-MCP kein Chrome findet.
10. Vorab-Fix (Canonical auf www, Label) ist bereits am 21.09. live gegangen (Commit `5d51976`).
