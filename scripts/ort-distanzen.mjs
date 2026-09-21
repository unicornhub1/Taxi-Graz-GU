// Recherche-Hilfe für die Fakten-Kacheln der Ortsseiten: Entfernung und Fahrzeit (ohne Verkehr)
// per OpenStreetMap (Nominatim + OSRM) sowie die drei nächstgelegenen Orte (Luftlinie).
// Aufruf: node scripts/ort-distanzen.mjs "Gratkorn=Gratkorn, Steiermark" "Andritz=Andritz, Graz" …
const ZIELE = [
  { label: 'Graz Hauptplatz', query: 'Hauptplatz, 8010 Graz' },
  { label: 'Graz Hauptbahnhof', query: 'Graz Hauptbahnhof' },
  { label: 'Flughafen Graz', query: 'Flughafen Graz' },
]
const UA = 'taxigraz-gu.at Ortsseiten-Recherche (https://www.unicorn-factory.net)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=at&q=${encodeURIComponent(query)}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  const [hit] = await res.json()
  await sleep(1100) // Nominatim erlaubt max. 1 Anfrage pro Sekunde
  if (!hit) throw new Error(`Nicht gefunden: ${query}`)
  return { lat: Number(hit.lat), lon: Number(hit.lon), gefunden: hit.display_name }
}

async function route(a, b) {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`
  const json = await (await fetch(url)).json()
  if (json.code !== 'Ok') throw new Error(`Routing fehlgeschlagen: ${json.code}`)
  const km = Math.round(json.routes[0].distance / 100) / 10
  const min = Math.ceil(json.routes[0].duration / 60 / 5) * 5 // auf 5 Minuten aufgerundet
  return { km, min, text: `${km.toLocaleString('de-AT')} km · ca. ${min} Min.` }
}

function luftlinie(a, b) {
  const rad = (d) => (d * Math.PI) / 180
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

;(async () => {
  const args = process.argv.slice(2)
  if (!args.length) throw new Error('Aufruf: node scripts/ort-distanzen.mjs "Name=Suchbegriff" …')
  const ziele = []
  for (const z of ZIELE) ziele.push({ ...z, ...(await geocode(z.query)) })
  const orte = []
  for (const arg of args) {
    const [name, query = name] = arg.split('=')
    orte.push({ name, ...(await geocode(query)) })
  }
  const out = {}
  for (const ort of orte) {
    const fahrten = {}
    for (const z of ziele) fahrten[z.label] = await route(ort, z)
    const nachbarn = orte
      .filter((o) => o !== ort)
      .map((o) => ({ name: o.name, km: Math.round(luftlinie(ort, o) * 10) / 10 }))
      .sort((a, b) => a.km - b.km)
      .slice(0, 3)
    out[ort.name] = { gefunden: ort.gefunden, fahrten, nachbarn }
  }
  console.log(JSON.stringify(out, null, 2))
})().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
