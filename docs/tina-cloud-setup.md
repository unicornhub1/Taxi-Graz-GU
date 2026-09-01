# Tina Cloud – Einrichtung für taxigraz-gu.at

Stand: 2026-09-01. Lokal läuft das CMS ohne Cloud (`npm run dev` → http://localhost:3000/admin). Für die Live-Seite braucht es einmalig Tina Cloud (Free-Plan: 2 Nutzer, 1 Projekt, 0 €).

## 1. Projekt in Tina Cloud anlegen (Felix)

1. https://app.tina.io → „Sign in with GitHub" (Account `Felixzink96`).
2. „New Project" → „Import your site" → Repository `Felixzink96/taxi-graz-gu`, Branch `main`.
3. **Site URL(s):** `https://taxigraz-gu.at` und `http://localhost:3000` (für lokales Visual Editing gegen die Cloud).
4. Nach dem Anlegen: **Overview → Client ID** kopieren. **Tokens → „Content (Read-only)"** erstellen und kopieren.

## 2. Vercel-Umgebungsvariablen

Vercel → Projekt `taxi-graz-gu` → Settings → Environment Variables (Production **und** Preview):

| Name | Wert |
|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID aus Schritt 1 |
| `TINA_TOKEN` | Read-only-Token aus Schritt 1 |

Build Command bleibt `npm run build` (= `tinacms build && next build`).

## 3. Branch mergen und deployen

**Zuerst Preview-Deploy:** Branch `feat/tina-cms` nach `vercel` pushen (`git push vercel feat/tina-cms`) → Vercel baut ein Preview; dort `/`, `/kontakt`, `/impressum`, `/datenschutz`, `/opengraph-image` (★-Glyphen prüfen) und `/admin` testen. Tina Cloud muss den Branch indiziert haben (Project → Branches), sonst schlägt `tinacms build` fehl; `branch` kommt aus `VERCEL_GIT_COMMIT_REF`. Erst danach mergen.

```bash
git checkout main && git merge --no-ff feat/tina-cms
git push vercel main && git push origin main
```
Vercel baut; im Build-Log muss „tinacms build" ohne Fehler durchlaufen. Danach https://taxigraz-gu.at/admin öffnen → Login mit dem Tina-Account.

## 4. Kunden einladen

Tina Cloud → Projekt → **Collaborators → Invite** → E-Mail des Kunden, Rolle „Editor". Der Kunde bekommt eine Einladung und legt sein Passwort fest.

## 5. Wichtig für den laufenden Betrieb

- Jede Änderung im Admin = ein Commit auf `main` im Repo `Felixzink96/taxi-graz-gu` → Vercel deployt in 1–2 Minuten.
- Das Spiegel-Repo `unicornhub1/Taxi-Graz-GU` (`origin`) läuft dadurch hinterher. Vor eigenen Änderungen: `git pull vercel main && git push origin main`.
- Bilder: unter 1 MB halten (Media-Limit 100 MB im Free-Plan). Ordner im Repo: `public/uploads/`.
- Neue Felder/Sektionen = Schema-Änderung in `tina/collections/*.ts` → committen, Vercel-Build aktualisiert das Schema automatisch in Tina Cloud.
- **Rechtstexte:** Impressum-Body (§ 25 MedienG) und Datenschutz (Verantwortliche Stelle, E-Mail bei den Betroffenenrechten) enthalten Firmen-/Kontaktdaten als Text – bei Änderungen in den Einstellungen dort mitpflegen.
- **Bekannte Grenzen:** Favicon (`src/app/icon.svg`) bleibt goldfarben (statisches SVG); die E-Mail-Vorlagen des Kontaktformulars (`src/app/api/contact/route.ts`) enthalten Telefonnummer/URL fest – bei Änderung im Code nachziehen.

## 6. Kurzanleitung für den Kunden

1. https://taxigraz-gu.at/admin öffnen und anmelden.
2. Links „Startseite", „Kontaktseite" oder „Rechtliches" wählen – die Seite erscheint als Vorschau, rechts die Felder. Text in der Vorschau anklicken springt zum passenden Feld.
3. „Einstellungen" (Globus-Symbol): Telefonnummer, E-Mail, Adresse, Google-Bewertung, **Akzentfarbe**, Logo und Hintergrundbild.
4. Platzhalter `{phone}`, `{email}`, `{rating}`, `{reviews}` funktionieren in: SEO-Beschreibung, Vertrauensleiste, Zahlen-Zusatz (Warum wir), Leistungen-Einleitung, Preise-Text und -Hinweis, Kundenstimmen-Einleitung und Google-Linktext, FAQ-Antworten, Abschluss-Aufruf-Text, Kontaktseite (Kopftext, Formulartext, SEO-Beschreibung). Nicht in Rich-Text (Hero-Beschreibung, Rechtstexte).
5. „Save" klicken – nach 1–2 Minuten ist die Änderung online. Nichts kaputtmachen können: Layout und Design sind fest, nur Inhalte ändern sich.
6. Navigation, Beschriftungen neben Telefon/WhatsApp/E-Mail und die Footer-Überschriften stehen ebenfalls unter „Einstellungen".
