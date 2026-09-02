import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidatePath } = vi.hoisted(() => ({ revalidatePath: vi.fn() }))
vi.mock('next/cache', () => ({ revalidatePath }))

import { GET, POST } from '../route'

const URL_BASE = 'https://www.taxigraz-gu.at/api/revalidate'

describe('/api/revalidate', () => {
  beforeEach(() => {
    revalidatePath.mockClear()
    process.env.REVALIDATE_SECRET = 'geheim'
  })

  it('leert den Cache aller Seiten bei korrektem Secret im Header (POST, Tina-Webhook)', async () => {
    const res = await POST(new Request(URL_BASE, { method: 'POST', headers: { 'x-revalidate-secret': 'geheim' } }))
    expect(res.status).toBe(200)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
    await expect(res.json()).resolves.toMatchObject({ revalidated: true })
  })

  it('akzeptiert das Secret auch als Query-Parameter (GET, manueller Test)', async () => {
    const res = await GET(new Request(`${URL_BASE}?secret=geheim`))
    expect(res.status).toBe(200)
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
  })

  it('lehnt ein falsches Secret mit 401 ab und leert nichts', async () => {
    const res = await POST(new Request(URL_BASE, { method: 'POST', headers: { 'x-revalidate-secret': 'falsch' } }))
    expect(res.status).toBe(401)
    expect(revalidatePath).not.toHaveBeenCalled()
  })

  it('lehnt alles ab, wenn serverseitig kein Secret konfiguriert ist', async () => {
    delete process.env.REVALIDATE_SECRET
    const res = await POST(new Request(URL_BASE, { method: 'POST', headers: { 'x-revalidate-secret': '' } }))
    expect(res.status).toBe(401)
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
