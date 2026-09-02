import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const SCRIPT = resolve('scripts/vercel-ignore-build.sh')

function repo() {
  const dir = mkdtempSync(join(tmpdir(), 'ignore-build-'))
  const git = (...args: string[]) => execFileSync('git', args, { cwd: dir, stdio: 'pipe' })
  const commit = (files: Record<string, string>, msg: string) => {
    for (const [rel, body] of Object.entries(files)) {
      mkdirSync(join(dir, rel, '..'), { recursive: true })
      writeFileSync(join(dir, rel), body)
    }
    git('add', '-A')
    git('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '-m', msg)
  }
  git('init', '-q')
  commit({ 'content/pages/home.json': '{"a":1}', 'public/uploads/x.jpg': 'img', 'src/app/page.tsx': 'v1' }, 'init')
  return { commit, exitCode: () => spawnSync('bash', [SCRIPT], { cwd: dir }).status }
}

describe('scripts/vercel-ignore-build.sh (Exit 0 = Build überspringen, 1 = bauen)', () => {
  it('überspringt den Build, wenn nur content/ geändert wurde', () => {
    const r = repo()
    r.commit({ 'content/pages/home.json': '{"a":2}' }, 'TinaCMS content update')
    expect(r.exitCode()).toBe(0)
  })

  it('überspringt den Build, wenn nur ein Bild unter public/uploads/ hinzukam', () => {
    const r = repo()
    r.commit({ 'public/uploads/neu.jpg': 'img2' }, 'TinaCMS content update')
    expect(r.exitCode()).toBe(0)
  })

  it('baut, wenn Code geändert wurde – auch zusammen mit Inhalten', () => {
    const r = repo()
    r.commit({ 'src/app/page.tsx': 'v2', 'content/pages/home.json': '{"a":3}' }, 'feat: x')
    expect(r.exitCode()).toBe(1)
  })
})
