import { revalidatePath } from 'next/cache'

// Wird vom Tina-Cloud-Webhook nach jedem gespeicherten Inhalt aufgerufen (POST mit Header
// x-revalidate-secret). GET mit ?secret= dient dem manuellen Test. Leert den ISR-Cache aller
// Seiten, damit Inhaltsänderungen ohne Vercel-Build live gehen.
function isAuthorized(request: Request): boolean {
  const expected = process.env.REVALIDATE_SECRET
  if (!expected) return false
  const provided = request.headers.get('x-revalidate-secret') ?? new URL(request.url).searchParams.get('secret')
  return provided === expected
}

function handle(request: Request): Response {
  if (!isAuthorized(request)) {
    return Response.json({ revalidated: false, error: 'unauthorized' }, { status: 401 })
  }
  revalidatePath('/', 'layout')
  return Response.json({ revalidated: true, at: new Date().toISOString() })
}

export async function POST(request: Request) {
  return handle(request)
}

export async function GET(request: Request) {
  return handle(request)
}
