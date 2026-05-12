import fs from 'fs'
import path from 'path'
import { runSeraPipeline as runRealSeraPipeline } from '../../frontend/src/lib/sera/pipeline'

type AdapterInput = { rawText: string }
type AdapterOutput = {
  perception_code: string
  objective_code: string
  action_code: string
  erc_level: number
  preconditions: string[]
}

function loadDotEnvTest() {
  const envCandidates = [
    path.resolve(process.cwd(), '.env.test'),
    path.resolve(process.cwd(), 'frontend/.env.test'),
  ]

  const file = envCandidates.find((f) => fs.existsSync(f))
  if (!file) return

  const lines = fs.readFileSync(file, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const match = trimmed.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (!match) continue
    const key = match[1]
    const value = match[2].replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

loadDotEnvTest()

export async function runSeraPipeline({ rawText }: AdapterInput): Promise<AdapterOutput> {
  const tenant_id = 'test-tenant'
  void tenant_id

  const steps = await runRealSeraPipeline(rawText)
  const preconditionsRaw = (steps.step6_7?.precondicoes ?? []) as Array<{
    etapa?: string
    code?: string
    codigo?: string
  }>

  return {
    perception_code: String(steps.step3?.codigo ?? ''),
    objective_code: String(steps.step4?.codigo ?? ''),
    action_code: String(steps.step5?.codigo ?? ''),
    erc_level:
      typeof steps.step6_7?.erc_level === 'number'
        ? steps.step6_7.erc_level
        : 0,
    preconditions: preconditionsRaw
      .map((p) => String(p.codigo ?? p.code ?? '').trim())
      .filter(Boolean),
  }
}
