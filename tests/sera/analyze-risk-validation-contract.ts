// tests/sera/analyze-risk-validation-contract.ts
//
// Risk contract validator — report-only, no LLM, no pipeline calls.
//
// Loads all tests/sera/fixtures/TEST-RISK-*.json and validates that each
// fixture satisfies the risk-layer contract defined in
// docs/RISK_VALIDATION_CONTRACT_v0.3.md.
//
// This script does NOT validate P/O/A classification. It does NOT call
// the SERA motor. It does NOT compare against runner output. It only
// validates the structural and methodological correctness of the
// `sera_context` and `risk_expected` blocks.
//
// Usage:
//   npx tsx tests/sera/analyze-risk-validation-contract.ts
//   npx tsx tests/sera/analyze-risk-validation-contract.ts --strict
//   npx tsx tests/sera/analyze-risk-validation-contract.ts --help
//
// Exit codes:
//   0  — no FAIL (default mode: WARNs are allowed)
//   1  — at least one FAIL found
//   1  — --strict: at least one WARN or FAIL found

import fs from 'fs'
import path from 'path'

// ─── Types ────────────────────────────────────────────────────────────────────

type EventType = 'historical_event' | 'safety_issue' | 'future_change'
type TraditionalMatrixApplicable = 'agreed' | 'limited' | 'not_applicable'
type BarrierEffectiveness = 'effective' | 'limited' | 'minimal' | 'not_effective'
type ArmsColor = 'GREEN' | 'YELLOW' | 'RED' | 'N/A'
type RiskProfileUse = 'allowed' | 'limited' | 'not_allowed'

interface SeraExpectedFrozen {
  perception_code: string
  objective_code: string
  action_code: string
}

interface SeraContext {
  focal_actor?: string
  focal_event_for_risk?: string
  sera_expected_frozen?: SeraExpectedFrozen
  acceptable_sera_variants?: string[]
  risk_scope_note?: string
}

interface RiskExpected {
  event_type?: EventType
  arms_applicable?: boolean
  sira_applicable?: boolean
  traditional_matrix_applicable?: TraditionalMatrixApplicable
  most_credible_accident_outcome?: string
  remaining_barrier_effectiveness?: BarrierEffectiveness
  arms_risk_index_range?: string
  arms_color?: ArmsColor
  hfa_visual_category?: string
  probability_claim_allowed?: boolean
  probability_limitation_note?: string
  risk_profile_use?: RiskProfileUse
  anti_pattern?: string
  sira_note?: string
}

interface RiskFixture {
  id: string
  title: string
  domain: string
  description: string
  expected: {
    perception_code: string
    objective_code: string
    action_code: string
    erc_level: number
  }
  rationale: string
  discriminators: string[]
  methodology_notes?: string
  sera_context?: SeraContext
  risk_expected?: RiskExpected
  future_expected?: Record<string, unknown>
}

// ─── Validation result types ──────────────────────────────────────────────────

type IssueLevel = 'FAIL' | 'WARN'

interface Issue {
  level: IssueLevel
  field: string
  message: string
}

type FixtureStatus = 'OK' | 'WARN' | 'FAIL'

interface FixtureResult {
  id: string
  title: string
  event_type: string
  arms: string
  sira: string
  traditional: string
  prob_allowed: string
  risk_profile: string
  status: FixtureStatus
  issues: Issue[]
  sera_frozen: string
  sera_variants: string
}

// ─── Enum sets ────────────────────────────────────────────────────────────────

const VALID_EVENT_TYPES: EventType[] = ['historical_event', 'safety_issue', 'future_change']
const VALID_TRADITIONAL: TraditionalMatrixApplicable[] = ['agreed', 'limited', 'not_applicable']
const VALID_BARRIER: BarrierEffectiveness[] = ['effective', 'limited', 'minimal', 'not_effective']
const VALID_ARMS_COLOR: ArmsColor[] = ['GREEN', 'YELLOW', 'RED', 'N/A']
const VALID_RISK_PROFILE: RiskProfileUse[] = ['allowed', 'limited', 'not_allowed']

// ─── Helpers ──────────────────────────────────────────────────────────────────

const HELP = `
RISK Contract Validator — report-only, sem LLM, sem pipeline

Valida que cada fixture TEST-RISK-* satisfaz o contrato de risco definido em
docs/RISK_VALIDATION_CONTRACT_v0.3.md.

NÃO valida P/O/A. NÃO chama o motor SERA. NÃO compara com output do runner.

Uso:
  npx tsx tests/sera/analyze-risk-validation-contract.ts
  npx tsx tests/sera/analyze-risk-validation-contract.ts --strict
  npx tsx tests/sera/analyze-risk-validation-contract.ts --prefix TEST-RISK-ERC-

Opções:
  --strict          Exit code 1 se houver WARN ou FAIL (default: só FAIL)
  --prefix <str>    Prefixo de arquivo (default: TEST-RISK-)
  --help            Exibe esta ajuda

Exit codes:
  0  sem FAIL (default) / sem WARN ou FAIL (--strict)
  1  ao menos um FAIL (default) / ao menos um WARN ou FAIL (--strict)

Este script é report-only: não altera runner, motor, baseline, fixtures ou UI.
`

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help') { console.log(HELP); process.exit(0) }
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) { args[key] = next; i++ }
      else args[key] = true
    }
  }
  return args
}

function pad(s: string, n: number) {
  return s.length >= n ? s : s + ' '.repeat(n - s.length)
}

function hr(char = '─', len = 80) { return char.repeat(len) }

function bool(v: unknown) {
  if (v === true) return 'true'
  if (v === false) return 'false'
  return '—'
}

// ─── Field presence checks ────────────────────────────────────────────────────

const SERA_CONTEXT_REQUIRED = [
  'focal_actor',
  'focal_event_for_risk',
  'sera_expected_frozen',
  'acceptable_sera_variants',
  'risk_scope_note',
] as const

const RISK_EXPECTED_REQUIRED = [
  'event_type',
  'arms_applicable',
  'sira_applicable',
  'traditional_matrix_applicable',
  'most_credible_accident_outcome',
  'remaining_barrier_effectiveness',
  'arms_risk_index_range',
  'arms_color',
  'hfa_visual_category',
  'probability_claim_allowed',
  'probability_limitation_note',
  'risk_profile_use',
  'anti_pattern',
] as const

// ─── Core validator ───────────────────────────────────────────────────────────

function validateFixture(fx: RiskFixture): FixtureResult {
  const issues: Issue[] = []

  function fail(field: string, msg: string) {
    issues.push({ level: 'FAIL', field, message: msg })
  }
  function warn(field: string, msg: string) {
    issues.push({ level: 'WARN', field, message: msg })
  }

  // ── 1. sera_context presence ──────────────────────────────────────────────

  if (!fx.sera_context) {
    fail('sera_context', 'Campo sera_context ausente')
  } else {
    for (const field of SERA_CONTEXT_REQUIRED) {
      const val = fx.sera_context[field]
      if (val === undefined || val === null || val === '') {
        fail(`sera_context.${field}`, `Campo obrigatório ausente ou vazio`)
      }
    }
    // acceptable_sera_variants must be an array with at least one entry
    const variants = fx.sera_context.acceptable_sera_variants
    if (Array.isArray(variants) && variants.length === 0) {
      fail('sera_context.acceptable_sera_variants', 'Deve conter ao menos uma variante aceita')
    }
  }

  // ── 2. risk_expected presence ──────────────────────────────────────────────

  if (!fx.risk_expected) {
    fail('risk_expected', 'Campo risk_expected ausente')
    // Can't validate sub-fields without the parent
    const status: FixtureStatus = 'FAIL'
    return { id: fx.id, title: fx.title, event_type: '—', arms: '—', sira: '—', traditional: '—', prob_allowed: '—', risk_profile: '—', status, issues, sera_frozen: '—', sera_variants: '—' }
  }

  const re = fx.risk_expected

  for (const field of RISK_EXPECTED_REQUIRED) {
    const val = re[field]
    if (val === undefined || val === null || val === '') {
      fail(`risk_expected.${field}`, 'Campo obrigatório ausente ou vazio')
    }
  }

  // ── 3. Enum validation ─────────────────────────────────────────────────────

  if (re.event_type !== undefined && !VALID_EVENT_TYPES.includes(re.event_type as EventType)) {
    fail('risk_expected.event_type', `Valor inválido: "${re.event_type}". Válidos: ${VALID_EVENT_TYPES.join(' | ')}`)
  }

  if (re.traditional_matrix_applicable !== undefined &&
      !VALID_TRADITIONAL.includes(re.traditional_matrix_applicable as TraditionalMatrixApplicable)) {
    fail('risk_expected.traditional_matrix_applicable', `Valor inválido: "${re.traditional_matrix_applicable}". Válidos: ${VALID_TRADITIONAL.join(' | ')}`)
  }

  if (re.remaining_barrier_effectiveness !== undefined &&
      !VALID_BARRIER.includes(re.remaining_barrier_effectiveness as BarrierEffectiveness)) {
    fail('risk_expected.remaining_barrier_effectiveness', `Valor inválido: "${re.remaining_barrier_effectiveness}". Válidos: ${VALID_BARRIER.join(' | ')}`)
  }

  if (re.arms_color !== undefined && !VALID_ARMS_COLOR.includes(re.arms_color as ArmsColor)) {
    fail('risk_expected.arms_color', `Valor inválido: "${re.arms_color}". Válidos: ${VALID_ARMS_COLOR.join(' | ')}`)
  }

  if (re.risk_profile_use !== undefined && !VALID_RISK_PROFILE.includes(re.risk_profile_use as RiskProfileUse)) {
    fail('risk_expected.risk_profile_use', `Valor inválido: "${re.risk_profile_use}". Válidos: ${VALID_RISK_PROFILE.join(' | ')}`)
  }

  if (re.arms_applicable !== undefined && typeof re.arms_applicable !== 'boolean') {
    fail('risk_expected.arms_applicable', 'Deve ser boolean')
  }
  if (re.sira_applicable !== undefined && typeof re.sira_applicable !== 'boolean') {
    fail('risk_expected.sira_applicable', 'Deve ser boolean')
  }
  if (re.probability_claim_allowed !== undefined && typeof re.probability_claim_allowed !== 'boolean') {
    fail('risk_expected.probability_claim_allowed', 'Deve ser boolean')
  }

  // ── 4. Methodological rules ────────────────────────────────────────────────

  const eventType = re.event_type

  // Rule 4.1 — historical_event
  if (eventType === 'historical_event') {
    if (re.arms_applicable === false) {
      warn('risk_expected.arms_applicable', 'historical_event: arms_applicable=false incomum — justificativa esperada no anti_pattern ou risk_scope_note')
    }
    if (re.probability_claim_allowed === true) {
      fail('risk_expected.probability_claim_allowed', 'historical_event: afirmar probabilidade de recorrência para evento histórico individual é erro metodológico ARMS. Deve ser false.')
    }
    if (re.sira_applicable === true && !re.sira_note) {
      warn('risk_expected.sira_applicable', 'historical_event com sira_applicable=true deve ter sira_note explicando evidência de padrão recorrente')
    }
  }

  // Rule 4.2 — safety_issue
  if (eventType === 'safety_issue') {
    if (re.sira_applicable !== true) {
      fail('risk_expected.sira_applicable', 'safety_issue: sira_applicable deve ser true')
    }
    if (!re.probability_limitation_note || re.probability_limitation_note.trim() === '') {
      warn('risk_expected.probability_limitation_note', 'safety_issue: deve explicar a base de frequência/exposição usada para SIRA')
    }
  }

  // Rule 4.3 — future_change
  if (eventType === 'future_change') {
    if (re.sira_applicable !== true) {
      fail('risk_expected.sira_applicable', 'future_change: sira_applicable deve ser true — mudanças prospectivas requerem SIRA')
    }
    if (re.arms_applicable === true) {
      warn('risk_expected.arms_applicable', 'future_change: arms_applicable=true é incomum — ERC é reativo/histórico. Verificar se não é SIRA prospectivo disfarçado de ERC.')
    }
  }

  // Rule 4.4 — arms_applicable=true requires index/color/category
  if (re.arms_applicable === true) {
    if (!re.arms_risk_index_range || re.arms_risk_index_range.trim() === '') {
      fail('risk_expected.arms_risk_index_range', 'arms_applicable=true: arms_risk_index_range deve estar preenchido')
    }
    if (!re.arms_color || re.arms_color === 'N/A') {
      fail('risk_expected.arms_color', 'arms_applicable=true: arms_color deve ser GREEN, YELLOW ou RED')
    }
    if (!re.hfa_visual_category || re.hfa_visual_category.trim() === '') {
      fail('risk_expected.hfa_visual_category', 'arms_applicable=true: hfa_visual_category deve estar preenchido')
    }
  }

  // Rule 4.5 — probability_claim_allowed=false requires note
  if (re.probability_claim_allowed === false) {
    if (!re.probability_limitation_note || re.probability_limitation_note.trim() === '') {
      fail('risk_expected.probability_limitation_note', 'probability_claim_allowed=false: deve explicar por que probabilidade de recorrência não pode ser afirmada')
    }
  }

  // Rule 4.6 — anti_pattern must be substantive (>20 chars)
  if (re.anti_pattern !== undefined && re.anti_pattern.trim().length < 20) {
    warn('risk_expected.anti_pattern', 'anti_pattern parece muito curto — deve descrever um erro metodológico concreto')
  }

  // Rule 4.7 — risk_profile_use=allowed: warn if event is historical_event isolated
  if (re.risk_profile_use === 'allowed' && eventType === 'historical_event' && re.sira_applicable === false) {
    warn('risk_expected.risk_profile_use', 'risk_profile_use=allowed em evento histórico isolado (sira_applicable=false): considerar "limited" para evitar super-peso de evento único no perfil organizacional')
  }

  // Rule 4.8 — sira_applicable=true should have sira_note
  if (re.sira_applicable === true && !re.sira_note) {
    warn('risk_expected.sira_note', 'sira_applicable=true sem sira_note — adicionar orientação de SIRA específica')
  }

  // ── 5. Compute status ──────────────────────────────────────────────────────

  const hasFail = issues.some(i => i.level === 'FAIL')
  const hasWarn = issues.some(i => i.level === 'WARN')
  const status: FixtureStatus = hasFail ? 'FAIL' : hasWarn ? 'WARN' : 'OK'

  // ── 6. Build display strings ───────────────────────────────────────────────

  const sera_frozen = fx.sera_context?.sera_expected_frozen
    ? `${fx.sera_context.sera_expected_frozen.perception_code}/${fx.sera_context.sera_expected_frozen.objective_code}/${fx.sera_context.sera_expected_frozen.action_code}`
    : '—'

  const sera_variants = fx.sera_context?.acceptable_sera_variants?.join(', ') ?? '—'

  return {
    id: fx.id,
    title: fx.title,
    event_type: re.event_type ?? '—',
    arms: bool(re.arms_applicable),
    sira: bool(re.sira_applicable),
    traditional: re.traditional_matrix_applicable ?? '—',
    prob_allowed: bool(re.probability_claim_allowed),
    risk_profile: re.risk_profile_use ?? '—',
    status,
    issues,
    sera_frozen,
    sera_variants,
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv.slice(2))
  const strict = Boolean(args['strict'])

  const fixturesDir = path.resolve('tests/sera/fixtures')
  const prefix = String(args['prefix'] ?? 'TEST-RISK-')

  let fixtureFiles: string[]
  try {
    fixtureFiles = fs.readdirSync(fixturesDir)
      .filter(f => f.startsWith(prefix) && f.endsWith('.json'))
      .sort()
      .map(f => path.join(fixturesDir, f))
  } catch {
    console.error(`Diretório de fixtures não encontrado: ${fixturesDir}`)
    process.exit(1)
  }

  if (fixtureFiles.length === 0) {
    console.error(`Nenhum fixture encontrado com prefixo "${prefix}" em ${fixturesDir}`)
    process.exit(1)
  }

  const fixtures: RiskFixture[] = fixtureFiles.map(f => {
    const raw = fs.readFileSync(f, 'utf8')
    return JSON.parse(raw) as RiskFixture
  })

  const results = fixtures.map(validateFixture)

  // ─── Print header ─────────────────────────────────────────────────────────

  const LINE = 90
  console.log('━'.repeat(LINE))
  console.log('  RISK Contract Validator — report-only')
  console.log('  Valida risk_expected e sera_context. NÃO valida P/O/A.')
  console.log('━'.repeat(LINE))
  console.log()
  console.log(`  Fixtures: ${fixturesDir}/${prefix}*.json  (${fixtures.length} encontrados)`)
  console.log(`  Modo:     ${strict ? '--strict (WARN = FAIL)' : 'default (apenas FAIL bloqueia)'}`)
  console.log()

  // ─── Summary table ────────────────────────────────────────────────────────

  console.log('TABELA DE FIXTURES')
  console.log(hr('─', LINE))
  console.log(
    `  ${pad('ID', 26)} ${pad('event_type', 16)} ${pad('ARMS', 5)} ${pad('SIRA', 5)} ` +
    `${pad('Trad.', 13)} ${pad('P.allow', 7)} ${pad('RiskProf', 10)} STATUS`
  )
  console.log(hr('─', LINE))

  for (const r of results) {
    const statusLabel = r.status === 'OK' ? '✓ OK'
      : r.status === 'WARN' ? '⚠ WARN'
      : '✗ FAIL'
    console.log(
      `  ${pad(r.id, 26)} ${pad(r.event_type, 16)} ${pad(r.arms, 5)} ${pad(r.sira, 5)} ` +
      `${pad(r.traditional, 13)} ${pad(r.prob_allowed, 7)} ${pad(r.risk_profile, 10)} ${statusLabel}`
    )
  }
  console.log()

  // ─── SERA context summary ─────────────────────────────────────────────────

  console.log('SERA CONTEXT (referência — não é critério de risco)')
  console.log(hr('─', LINE))
  console.log(`  ${pad('ID', 26)} ${pad('Frozen P/O/A', 18)} Variantes aceitas`)
  console.log(hr('─', LINE))
  for (const r of results) {
    const varStr = r.sera_variants.length > 50 ? r.sera_variants.slice(0, 47) + '...' : r.sera_variants
    console.log(`  ${pad(r.id, 26)} ${pad(r.sera_frozen, 18)} ${varStr}`)
  }
  console.log()

  // ─── Issues detail ────────────────────────────────────────────────────────

  const withIssues = results.filter(r => r.issues.length > 0)
  if (withIssues.length > 0) {
    console.log('ISSUES DETALHADAS')
    console.log(hr('─', LINE))
    for (const r of withIssues) {
      const statusLabel = r.status === 'FAIL' ? '✗ FAIL' : '⚠ WARN'
      console.log(`  ${r.id}  [${statusLabel}]`)
      for (const issue of r.issues) {
        const prefix = issue.level === 'FAIL' ? '    ✗ FAIL' : '    ⚠ WARN'
        console.log(`${prefix}  ${issue.field}`)
        console.log(`          ${issue.message}`)
      }
      console.log()
    }
  }

  // ─── Summary ──────────────────────────────────────────────────────────────

  const total = results.length
  const ok = results.filter(r => r.status === 'OK').length
  const warn = results.filter(r => r.status === 'WARN').length
  const fail = results.filter(r => r.status === 'FAIL').length

  const failFixtures = results.filter(r => r.status === 'FAIL').map(r => r.id)
  const warnFixtures = results.filter(r => r.status === 'WARN').map(r => r.id)

  console.log('RESUMO')
  console.log(hr('─', LINE))
  console.log(`  Total fixtures:  ${total}`)
  console.log(`  OK:              ${ok}`)
  console.log(`  WARN:            ${warn}${warn > 0 ? '  (' + warnFixtures.join(', ') + ')' : ''}`)
  console.log(`  FAIL:            ${fail}${fail > 0 ? '  (' + failFixtures.join(', ') + ')' : ''}`)
  console.log()

  const hasFail = fail > 0
  const hasWarnOrFail = warn > 0 || fail > 0

  console.log('━'.repeat(LINE))
  console.log('  report-only — não altera runner, motor, baseline, fixtures ou UI')

  if (hasFail) {
    console.log(`  ✗ ${fail} fixture(s) com FAIL — contrato de risco incompleto ou inválido`)
    console.log('━'.repeat(LINE))
    process.exit(1)
  }

  if (strict && hasWarnOrFail) {
    console.log(`  --strict: ${warn} WARN(s) tratado(s) como falha`)
    console.log('━'.repeat(LINE))
    process.exit(1)
  }

  if (warn > 0) {
    console.log(`  ⚠ ${warn} WARN(s) — revisar antes de RISK v0.5`)
  } else {
    console.log('  ✓ Todos os fixtures satisfazem o contrato de risco')
  }

  console.log('  exit code: 0')
  console.log('━'.repeat(LINE))
  process.exit(0)
}

main()
