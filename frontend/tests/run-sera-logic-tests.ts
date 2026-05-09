import * as fs from 'fs'
import * as path from 'path'
import { callAi, getActiveProvider, getModelName } from '../src/lib/sera/llm'

// Load .env.local before any API call
;(() => {
  const f = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(f)) return
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.trim().match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
})()

// ── SERA classification rules embedded in prompts ─────────────────────────
const STEP_RULES: Record<number, string> = {
  3: `
SERA Step 3 — Perception failure classification (apply in exact order):

1. avaliacao_correta=true → P-A (no perception failure)
2. avaliacao_correta=false:
   a. capacidade_sensorial=false → P-B (sensory/perceptual incapacity)
   b. capacidade_sensorial=true AND conhecimento_adequado=false → P-C (knowledge failure to interpret)
   c. capacidade_sensorial=true AND conhecimento_adequado=true:
      i.  pressao_tempo_excessiva=true:
            pressao_autoimposta=true  → P-E (self-imposed time pressure / time management)
            pressao_autoimposta=false → P-D (externally imposed time pressure / attention capture)
      ii. pressao_tempo_excessiva=false:
            informacao_ilusoria_ambigua=true  → P-F (illusory or ambiguous information)
            informacao_ilusoria_ambigua=false:
              informacao_disponivel_correta=true  → P-G (attention failure; info was available but missed)
              informacao_disponivel_correta=false → P-H (communication/information unavailability failure)
`,
  4: `
SERA Step 4 — Objective failure classification (apply in exact order):

1. objetivo_consistente_normas=true:
   a. objetivo_conservativo=true  → O-A (no objective failure)
   b. objetivo_conservativo=false → O-D (non-conservative intent, not a rule violation)
2. objetivo_consistente_normas=false:
   a. violacao_rotina=true → O-B (routine/habitual violation; evidence of repeated behaviour)
   b. violacao_rotina=false:
        acreditava_ser_correto=true → O-D (operator sincerely believed they complied with rules;
                                            classify as non-violation intent, NOT a real violation)
        acreditava_ser_correto=false or absent → O-C (exceptional, isolated, one-off violation)
`,
  5: `
SERA Step 5 — Action failure classification (apply in exact order):

1. acao_implementada_como_pretendida=false → A-B (slip/lapse: body/system did not match operator's intention)
2. acao_implementada_como_pretendida=true:
   a. acao_correta_adequada=true  → A-A (no action failure)
   b. acao_correta_adequada=false:
        capacidade_conhecimento=false → A-E (lacked knowledge or decision skill to choose correctly)
        capacidade_conhecimento=true:
          pressao_tempo_excessiva=false → A-F (wrong action selection without time pressure)
          pressao_tempo_excessiva=true  → A-H (time management failure under excessive time pressure)
`,
}

function buildPrompts(etapa: number, inputs: Record<string, unknown>): [string, string] {
  const system = `You are a SERA (Systematic Error and Risk Analysis) classification engine.
Given boolean input values that describe the state at each decision node, output the exact SERA failure code.
Do NOT reason about real events or text descriptions. Apply ONLY the decision tree rules below.
Return ONLY valid JSON with a single field: {"codigo": "X-Y"}

${STEP_RULES[etapa]}`

  const user = `Inputs: ${JSON.stringify(inputs, null, 2)}

Apply the SERA Step ${etapa} decision tree to these inputs and return the failure code.
Return ONLY JSON: {"codigo": "X-Y"}`

  return [system, user]
}

async function classifyStep(etapa: number, inputs: Record<string, unknown>): Promise<string> {
  const [system, user] = buildPrompts(etapa, inputs)
  const raw = await callAi(system, user, 256)
  const parsed = JSON.parse(raw) as Record<string, string>
  return String(parsed.codigo ?? parsed.code ?? '')
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}

// Evaluate conditions like: "codigo != 'O-C'" or "codigo != 'P-D' && codigo != 'P-G'"
function evalProperty(condition: string, code: string): boolean {
  return condition.split('&&').map(p => p.trim()).every(part => {
    const m = part.match(/codigo\s*(!=|==)\s*'([^']+)'/)
    if (!m) return true
    return m[1] === '!=' ? code !== m[2] : code === m[2]
  })
}

// Evaluate relations like: "resultado_base == 'P-G' && resultado_modificado == 'P-D'"
function evalRelation(condition: string, base: string, modified: string): boolean {
  return condition.split('&&').map(p => p.trim()).every(part => {
    const m = part.match(/(resultado_base|resultado_modificado)\s*(!=|==)\s*'([^']+)'/)
    if (!m) return true
    const actual = m[1] === 'resultado_base' ? base : modified
    return m[2] === '!=' ? actual !== m[3] : actual === m[3]
  })
}

interface UnitTest {
  nome: string
  etapa: number
  descricao: string
  inputs: Record<string, unknown>
  esperado: { codigo: string }
}

interface PropertyTest {
  nome: string
  tipo: 'invariante' | 'metamorfico'
  descricao: string
  etapa: number
  input?: Record<string, unknown>
  input_base?: Record<string, unknown>
  input_modificado?: Record<string, unknown>
  propriedade?: string
  relacao?: string
}

interface IntegrationTest {
  nome: string
  descricao: string
  inputs: { PER: Record<string, unknown>; OBJ: Record<string, unknown>; ACO: Record<string, unknown> }
  esperado: { P: string; O: string; A: string }
}

interface TestSuite {
  unit_tests: UnitTest[]
  property_tests: PropertyTest[]
  integration_tests: IntegrationTest[]
}

async function main() {
  const testsPath = path.join(process.cwd(), 'tests', 'sera-logic-tests.json')
  const suite = JSON.parse(fs.readFileSync(testsPath, 'utf8')) as TestSuite

  const provider = getActiveProvider()
  const model = getModelName()

  console.log(`\n╔══ SERA Logic Test Suite ══════════════════════════╗`)
  console.log(`  Provider : ${provider}`)
  console.log(`  Model    : ${model}`)
  console.log(`  Note     : callAi() does not expose temperature;`)
  console.log(`             tests run at provider default (not 0)`)
  console.log(`╚═══════════════════════════════════════════════════╝\n`)

  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    provider,
    model,
    temperature_note: 'callAi() does not expose a temperature parameter. Tests run at provider default, not temperature=0.',
    unit_test_results: [],
    step4_determinism: [],
    property_test_results: [],
    integration_test_results: [],
    summary: {},
  }

  // ── UNIT TESTS ────────────────────────────────────────────────────────────
  console.log('=== UNIT TESTS ===')
  let uPass = 0, uFail = 0
  for (const t of suite.unit_tests) {
    process.stdout.write(`  [step${t.etapa}] ${t.nome.padEnd(40)} `)
    try {
      const got = await classifyStep(t.etapa, t.inputs)
      const ok = got === t.esperado.codigo
      if (ok) { uPass++; console.log(`PASS  (${got})`) }
      else     { uFail++; console.log(`FAIL  expected=${t.esperado.codigo} got=${got}`) }
      ;(results.unit_test_results as unknown[]).push({
        nome: t.nome, etapa: t.etapa, descricao: t.descricao,
        status: ok ? 'PASS' : 'FAIL', esperado: t.esperado.codigo, obtido: got,
      })
    } catch (e) {
      uFail++
      console.log(`ERROR ${String(e)}`)
      ;(results.unit_test_results as unknown[]).push({
        nome: t.nome, etapa: t.etapa, status: 'ERROR', error: String(e),
      })
    }
    await sleep(450)
  }

  // ── STEP 4 DETERMINISM ────────────────────────────────────────────────────
  console.log('\n=== STEP 4 DETERMINISM (3 runs each) ===')
  for (const t of suite.unit_tests.filter(x => x.etapa === 4)) {
    process.stdout.write(`  ${t.nome.padEnd(40)} `)
    const runs: string[] = []
    try {
      for (let i = 0; i < 3; i++) {
        runs.push(await classifyStep(4, t.inputs))
        if (i < 2) await sleep(450)
      }
      const verdict = runs.every(r => r === runs[0]) ? 'DETERMINISTIC' : 'NON_DETERMINISTIC'
      console.log(`${verdict}  [${runs.join(', ')}]`)
      ;(results.step4_determinism as unknown[]).push({
        nome: t.nome, runs, verdict, esperado: t.esperado.codigo,
      })
    } catch (e) {
      console.log(`ERROR ${String(e)}`)
      ;(results.step4_determinism as unknown[]).push({ nome: t.nome, error: String(e) })
    }
    await sleep(450)
  }

  // ── PROPERTY TESTS ────────────────────────────────────────────────────────
  console.log('\n=== PROPERTY TESTS ===')
  let pPass = 0, pFail = 0
  for (const t of suite.property_tests) {
    process.stdout.write(`  [${t.tipo}] ${t.nome.padEnd(45)} `)
    try {
      if (t.tipo === 'invariante' && t.input && t.propriedade) {
        const code = await classifyStep(t.etapa, t.input)
        const ok = evalProperty(t.propriedade, code)
        if (ok) { pPass++; console.log(`PASS  (${code})`) }
        else     { pFail++; console.log(`FAIL  code=${code} property="${t.propriedade}"`) }
        ;(results.property_test_results as unknown[]).push({
          nome: t.nome, tipo: t.tipo, status: ok ? 'PASS' : 'FAIL',
          obtido: code, propriedade: t.propriedade,
        })
        await sleep(450)

      } else if (t.tipo === 'metamorfico' && t.input_base && t.input_modificado && t.relacao) {
        const base = await classifyStep(t.etapa, t.input_base)
        await sleep(450)
        const mod = await classifyStep(t.etapa, t.input_modificado)
        const ok = evalRelation(t.relacao, base, mod)
        if (ok) { pPass++; console.log(`PASS  (base=${base}, mod=${mod})`) }
        else     { pFail++; console.log(`FAIL  base=${base} mod=${mod} relacao="${t.relacao}"`) }
        ;(results.property_test_results as unknown[]).push({
          nome: t.nome, tipo: t.tipo, status: ok ? 'PASS' : 'FAIL',
          resultado_base: base, resultado_modificado: mod, relacao: t.relacao,
        })
        await sleep(450)
      }
    } catch (e) {
      pFail++
      console.log(`ERROR ${String(e)}`)
      ;(results.property_test_results as unknown[]).push({ nome: t.nome, status: 'ERROR', error: String(e) })
    }
  }

  // ── INTEGRATION TESTS ─────────────────────────────────────────────────────
  console.log('\n=== INTEGRATION TESTS ===')
  let iPass = 0, iFail = 0
  for (const t of suite.integration_tests) {
    console.log(`  ${t.nome}:`)
    const got: Record<string, string> = {}
    const errs: Record<string, string> = {}

    for (const [key, etapa, slot] of [['P', 3, 'PER'], ['O', 4, 'OBJ'], ['A', 5, 'ACO']] as [string, number, string][]) {
      process.stdout.write(`    ${slot} (step${etapa}) → `)
      try {
        got[key] = await classifyStep(etapa, t.inputs[slot as keyof typeof t.inputs])
        const exp = t.esperado[key as keyof typeof t.esperado]
        const ok = got[key] === exp
        console.log(ok ? `PASS  ${got[key]}` : `FAIL  expected=${exp} got=${got[key]}`)
      } catch (e) {
        errs[key] = String(e)
        console.log(`ERROR ${String(e)}`)
      }
      await sleep(450)
    }

    const allOk = (['P', 'O', 'A'] as const).every(k => got[k] === t.esperado[k])
    if (allOk) iPass++ else iFail++
    ;(results.integration_test_results as unknown[]).push({
      nome: t.nome, descricao: t.descricao,
      status: allOk ? 'PASS' : 'FAIL',
      resultados: got, esperado: t.esperado,
      ...(Object.keys(errs).length ? { erros: errs } : {}),
    })
  }

  // ── SUMMARY ───────────────────────────────────────────────────────────────
  results.summary = {
    unit_tests:        { total: suite.unit_tests.length,        passed: uPass, failed: uFail },
    property_tests:    { total: suite.property_tests.length,    passed: pPass, failed: pFail },
    integration_tests: { total: suite.integration_tests.length, passed: iPass, failed: iFail },
  }

  const outPath = path.join(process.cwd(), 'tests', 'sera-logic-results.json')
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2))

  console.log('\n╔══ SUMMARY ══════════════════════════════════════╗')
  console.log(`  Unit Tests        : ${uPass}/${suite.unit_tests.length} passed`)
  console.log(`  Property Tests    : ${pPass}/${suite.property_tests.length} passed`)
  console.log(`  Integration Tests : ${iPass}/${suite.integration_tests.length} passed`)
  console.log(`  Results → ${outPath}`)
  console.log('╚═════════════════════════════════════════════════╝')
}

main().catch(e => { console.error('Fatal:', e); process.exit(1) })
