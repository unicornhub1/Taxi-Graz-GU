# Tina Cloud – Einrichtung für taxigraz-gu.at

Stand: 2026-09-02. Lokal läuft das CMS ohne Cloud (`npm run dev` → http://localhost:3000/admin). Für die Live-Seite braucht es einmalig Tina Cloud (Free-Plan: 2 Nutzer, 1 Projekt, 0 €).

## 0. Repos und Deploy-Quelle (wichtig)

| Remote | GitHub-Repo | Rolle |
|---|---|---|
| `origin` | `unicornhub1/Taxi-Graz-GU` | **Deploy-Quelle.** Vercel baut hieraus, Tina Cloud committet hierhin. |
| `vercel` | `Felixzink96/taxi-graz-gu` | Nur Spiegel (Name irreführend). |

Vor eigener Arbeit immer `git pull --ff-only origin main`, weil Tina Cloud Redaktionsänderungen als Commits „TinaCMS content update" auf `origin/main` schreibt.

## 1. Projekt in Tina Cloud anlegen (Felix)

1. https://app.tina.io → „Sign in with GitHub" (Account `Felixzink96`).
2. „New Project" → „Import your site" → Repository `unicornhub1/Taxi-Graz-GU`, Branch `main`.
3. **Site URLs:** `https://www.taxigraz-gu.at` (die Live-Seite läuft unter www, der Apex leitet dorthin um), `https://taxigraz-gu.at` und `http://localhost:3000` (für lokales Visual Editing gegen die Cloud). Fehlt die www-Variante, meldet der Admin „Your TinaCloud config is missing for domain".
4. Nach dem Anlegen: **Overview → Client ID** kopieren. **Tokens → „Content (Read-only)"** erstellen und kopieren.

## 2. Vercel-Umgebungsvariablen

Vercel → Projekt → Settings → Environment Variables (Production **und** Preview):

| Name | Wert |
|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID aus Schritt 1 |
| `TINA_TOKEN` | Read-only-Token aus Schritt 1 |
| `REVALIDATE_SECRET` | Zufallsstring (lokal in `.env.local`), siehe Abschnitt 7 |

Build Command bleibt `npm run build` (= `tinacms build && next build`).

## 3. Branch mergen und deployen

**Zuerst Preview-Deploy:** Feature-Branch nach `origin` pushen → Vercel baut ein Preview; dort `/`, `/kontakt`, `/impressum`, `/datenschutz`, `/opengraph-image` (★-Glyphen prüfen) und `/admin` testen. Tina Cloud muss den Branch indiziert haben (Project → Branches), sonst schlägt `tinacms build` fehl; `branch` kommt aus `VERCEL_GIT_COMMIT_REF`. Erst danach mergen.

```bash
git checkout main && git merge --no-ff feat/xyz
git push origin main && git push vercel main
```
Vercel baut; im Build-Log muss „tinacms build" ohne Fehler durchlaufen. Danach https://www.taxigraz-gu.at/admin öffnen → Login mit dem Tina-Account.

## 4. Kunden einladen

Tina Cloud → Projekt → **Collaborators → Invite** → E-Mail des Kunden, Rolle „Editor". Der Kunde bekommt eine Einladung und legt sein Passwort fest.

## 5. Wichtig für den laufenden Betrieb

- Jede Änderung im Admin = ein Commit auf `origin/main`. Dank ISR (Abschnitt 7) ist sie **ohne Vercel-Build** nach wenigen Sekunden live; der Build wird für reine Inhalts-Commits übersprungen.
- Bilder: unter 1 MB halten (Media-Limit 100 MB im Free-Plan). Ordner im Repo: `public/uploads/`. Live liefert Tina Cloud Bilder von `https://assets.tina.io/<clientId>/…` aus – deshalb steht `assets.tina.io` in `next.config.ts` unter `images.remotePatterns`. Ohne den Eintrag bleibt z. B. das Hero-Bild leer (400 `INVALID_IMAGE_OPTIMIZE_REQUEST`).
- Neue Felder/Sektionen = Schema-Änderung in `tina/collections/*.ts` → committen, Vercel-Build aktualisiert das Schema automatisch in Tina Cloud.
- **Rechtstexte:** Impressum-Body (§ 25 MedienG) und Datenschutz (Verantwortliche Stelle, E-Mail bei den Betroffenenrechten) enthalten Firmen-/Kontaktdaten als Text – bei Änderungen in den Einstellungen dort mitpflegen.
- **Bekannte Grenzen:** Favicon (`src/app/icon.svg`) bleibt goldfarben (statisches SVG); die E-Mail-Vorlagen des Kontaktformulars (`src/app/api/contact/route.ts`) enthalten Telefonnummer/URL fest – bei Änderung im Code nachziehen.

## 6. Kurzanleitung für den Kunden

1. https://www.taxigraz-gu.at/admin öffnen und anmelden.
2. Links „Startseite", „Kontaktseite" oder „Rechtliches" wählen – die Seite erscheint als Vorschau, rechts die Felder. Text in der Vorschau anklicken springt zum passenden Feld.
3. „Einstellungen" (Globus-Symbol): Telefonnummer, E-Mail, Adresse, Google-Bewertung, **Akzentfarbe**, Logo und Hintergrundbild.
4. Platzhalter `{phone}`, `{email}`, `{rating}`, `{reviews}` funktionieren in: SEO-Beschreibung, Vertrauensleiste, Zahlen-Zusatz (Warum wir), Leistungen-Einleitung, Preise-Text und -Hinweis, Kundenstimmen-Einleitung und Google-Linktext, FAQ-Antworten, Abschluss-Aufruf-Text, Kontaktseite (Kopftext, Formulartext, SEO-Beschreibung). Nicht in Rich-Text (Hero-Beschreibung, Rechtstexte).
5. „Save" klicken – nach wenigen Sekunden (spätestens einer Minute) ist die Änderung online. Nichts kaputtmachen können: Layout und Design sind fest, nur Inhalte ändern sich.
6. Navigation, Beschriftungen neben Telefon/WhatsApp/E-Mail und die Footer-Überschriften stehen ebenfalls unter „Einstellungen".

## 7. Inhalte ohne Vercel-Build live (ISR + Webhook)

Seit 2026-09-02 holen alle Seiten ihre Inhalte zur Laufzeit aus der Tina-Cloud-API und werden von Vercel gecacht (`export const revalidate = 60` im Root-Layout sowie in Sitemap, Robots und OG-Bild). Drei Bausteine:

1. **`/api/revalidate`** (`src/app/api/revalidate/route.ts`): leert bei korrektem Secret den Cache aller Seiten. POST mit Header `x-revalidate-secret` (Webhook) oder GET mit `?secret=` (manueller Test). Ohne oder mit falschem Secret → 401.
2. **Tina-Cloud-Webhook:** app.tina.io → Projekt → **Webhooks** → URL `https://www.taxigraz-gu.at/api/revalidate`, Header `x-revalidate-secret: <REVALIDATE_SECRET>`, Branch `main`. Tina ruft ihn nach jedem Save auf, sobald der Commit indexiert ist.
3. **Vercel Ignored Build Step:** Vercel → Settings → Git → „Ignored Build Step" → Custom: `bash scripts/vercel-ignore-build.sh`. Exit 0 überspringt den Build, wenn sich nur `content/` oder `public/uploads/` geändert hat. Code-Commits bauen weiterhin.

Ohne Webhook greift die Änderung trotzdem nach spätestens 60 s. Fällt Tina Cloud aus, liefert Vercel die zuletzt gecachte Version weiter aus. Manueller Test:

```bash
curl -X POST -H "x-revalidate-secret: $REVALIDATE_SECRET" https://www.taxigraz-gu.at/api/revalidate
# → {"revalidated":true,"at":"…"}
```
