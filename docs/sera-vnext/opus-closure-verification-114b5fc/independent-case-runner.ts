import { createHash } from 'node:crypto'
import { runSeraVNextEngineV0 } from '../../../frontend/src/lib/sera-vnext/engine-v0/run-engine'
import type { SeraVNextEngineOutput } from '../../../frontend/src/lib/sera-vnext/engine-contract'

// Independent Opus closure-verification cases.
// Expected outcomes are PRE-REGISTERED (defined before execution) and hashed.
// Narratives are written as naturalistic prose, NOT copied from the engine's
// own concept regexes, to probe real generalization vs lexical-keyword matching.

type Expected =
  | { kind: 'code'; axis: 'perception' | 'objective' | 'action'; code: string }
  | { kind: 'abstention' }
  | { kind: 'notViolation' } // O axis must not emit O-B/O-C

type Case = {
  caseId: string
  locale: 'pt-BR' | 'en'
  category: string[]
  narrative: string
  expected: Expected
  rationale: string
}

const cases: Case[] = [
  {
    caseId: 'IND-01-PT-OFFSHORE-INSUFFICIENT',
    locale: 'pt-BR',
    category: ['pt', 'offshore-helicopter', 'evidence-insufficient'],
    narrative:
      'Durante um voo de transporte para uma plataforma marítima, a aeronave retornou à base. O relatório preliminar não detalha as ações da tripulação nem as condições no momento do retorno.',
    expected: { kind: 'abstention' },
    rationale: 'Vague preliminary report; no escape point, actor, or axis evidence. Expert would abstain.',
  },
  {
    caseId: 'IND-02-PT-OFFSHORE-PERCEPTION',
    locale: 'pt-BR',
    category: ['pt', 'offshore-helicopter', 'perception'],
    narrative:
      'Em aproximação noturna ao heliponto da plataforma, sob neblina densa, os pilotos não viram a estrutura a tempo. A tripulação era treinada e os instrumentos estavam disponíveis, mas o ambiente visual estava degradado.',
    expected: { kind: 'code', axis: 'perception', code: 'P-B' },
    rationale: 'Sensory/visual limitation (fog, night) with capability present -> P-B in SERA.',
  },
  {
    caseId: 'IND-03-PT-TECHNICAL-DOMINANT',
    locale: 'pt-BR',
    category: ['pt', 'technical-dominant'],
    narrative:
      'Uma falha na caixa de transmissão principal provocou perda de potência. Não há indício de erro humano; a equipe respondeu conforme o procedimento de emergência e pousou.',
    expected: { kind: 'abstention' },
    rationale: 'Purely technical/mechanical failure, crew responded correctly; human-factor axes should abstain.',
  },
  {
    caseId: 'IND-04-PT-VIOLATION-AWARE',
    locale: 'pt-BR',
    category: ['pt', 'violation-awareness-boundary'],
    narrative:
      'O comandante sabia que o procedimento exigia arremeter abaixo dos mínimos. Ciente da regra e do alerta, ele deliberadamente decidiu violar e continuou a aproximação como costumava fazer naquela rota.',
    expected: { kind: 'code', axis: 'objective', code: 'O-B' },
    rationale: 'Known rule + explicit awareness + conscious + routine deviation -> O-B.',
  },
  {
    caseId: 'IND-05-PT-CONTINUATION-NOAWARE',
    locale: 'pt-BR',
    category: ['pt', 'violation-awareness-boundary', 'post-escape-trap'],
    narrative:
      'A tripulação continuou a aproximação instável e desceu abaixo do perfil. Nada indica que percebeu o desvio ou que tenha conscientemente decidido descumprir qualquer regra.',
    expected: { kind: 'notViolation' },
    rationale: 'Continuation without awareness must NOT be classified as O-B/O-C violation.',
  },
  {
    caseId: 'IND-06-PT-NO-FAILURE',
    locale: 'pt-BR',
    category: ['pt', 'no-failure'],
    narrative:
      'Ao notar a tendência de instabilidade a tempo, a tripulação reconheceu o desvio, descontinuou a aproximação e executou uma arremetida, preservando a separação segura.',
    expected: { kind: 'code', axis: 'objective', code: 'O-A' },
    rationale: 'Safe conservative goal (go-around, risk managed) -> O-A.',
  },
  {
    caseId: 'IND-07-EN-OFFSHORE-MULTIACTOR',
    locale: 'en',
    category: ['en', 'offshore-helicopter', 'multi-actor'],
    narrative:
      'On approach to the offshore deck, the pilot flying continued the descent while the pilot monitoring called out an unstable approach. The crew did not cross-check the readback and the callout was missed before the hard landing.',
    expected: { kind: 'code', axis: 'action', code: 'A-B' },
    rationale: 'Feedback/verification failure during implementation (callout missed, readback not cross-checked) -> A-B.',
  },
  {
    caseId: 'IND-08-EN-TECHNICAL-DOMINANT',
    locale: 'en',
    category: ['en', 'technical-dominant'],
    narrative:
      'An uncontained engine failure due to a manufacturing defect led to a precautionary landing. Investigators found no crew error; the crew followed the checklist correctly.',
    expected: { kind: 'abstention' },
    rationale: 'Technical defect, correct crew response; human-factor axes should abstain.',
  },
  {
    caseId: 'IND-09-EN-AA-AC-BOUNDARY',
    locale: 'en',
    category: ['en', 'A-A/A-C-boundary'],
    narrative:
      'The captain executed a prompt go-around and the aircraft achieved safe separation. The recovery was correct and timely with no slip or lapse.',
    expected: { kind: 'code', axis: 'action', code: 'A-A' },
    rationale: 'Implemented + correct action (go-around, safe separation) -> A-A.',
  },
  {
    caseId: 'IND-10-EN-VIOLATION-AWARE',
    locale: 'en',
    category: ['en', 'violation-awareness'],
    narrative:
      'The crew knew the SOP required a stabilized approach and were warned by the system. Despite knowing the rule, they intentionally chose to deviate and continued, a deviation they routinely made on this leg.',
    expected: { kind: 'code', axis: 'objective', code: 'O-B' },
    rationale: 'Known rule + awareness + conscious + routine -> O-B.',
  },
  {
    caseId: 'IND-11-EN-POST-ESCAPE-TRAP',
    locale: 'en',
    category: ['en', 'post-escape-trap'],
    narrative:
      'The aircraft crashed and there was a fatal post-impact fire with major damage. The subsequent collision sequence destroyed the fuselage.',
    expected: { kind: 'abstention' },
    rationale: 'Only post-escape consequences described; no pre-escape causal evidence -> abstain (consequence must not be used as cause).',
  },
  {
    caseId: 'IND-12-EN-EVIDENCE-INSUFFICIENT',
    locale: 'en',
    category: ['en', 'evidence-insufficient'],
    narrative:
      'The flight departed and later an occurrence was reported. Few operational details are currently available pending further investigation.',
    expected: { kind: 'abstention' },
    rationale: 'Vague; no usable evidence -> abstain.',
  },
]

function caseHash(): string {
  const payload = cases.map((c) => ({ caseId: c.caseId, narrative: c.narrative, expected: c.expected }))
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex')
}

function run(c: Case): SeraVNextEngineOutput {
  return runSeraVNextEngineV0({
    inputId: c.caseId,
    narrative: c.narrative,
    locale: c.locale,
    sourceType: 'real_event',
    requestId: c.caseId,
    mode: 'CANDIDATE_ONLY',
    options: { allowLlm: false, requireHumanReview: true, includeDebugTrace: false },
  })
}

function classify(c: Case, out: SeraVNextEngineOutput): string {
  const codes = {
    perception: out.axes.perception.proposedCode,
    objective: out.axes.objective.proposedCode,
    action: out.axes.action.proposedCode,
  }
  const anyCode = Object.values(codes).filter(Boolean)
  if (c.expected.kind === 'abstention') {
    return anyCode.length === 0 ? 'CORRECT_ABSTENTION' : 'INCORRECT_CODE'
  }
  if (c.expected.kind === 'notViolation') {
    const o = codes.objective
    if (o === 'O-B' || o === 'O-C') return 'INCORRECT_CODE'
    return 'CORRECT_ABSTENTION'
  }
  const actual = codes[c.expected.axis]
  if (actual === c.expected.code) return 'CORRECT_CODE'
  if (actual == null) return 'INCORRECT_ABSTENTION'
  return 'INCORRECT_CODE'
}

console.log('CASE_SET_SHA256=' + caseHash())
console.log('n_cases=' + cases.length)
console.log('caseId,locale,categories,expected,P,O,A,guardrailViolations,finalBlocked,outcome')
const tally: Record<string, number> = {}
for (const c of cases) {
  let out: SeraVNextEngineOutput
  let outcome: string
  try {
    out = run(c)
    outcome = classify(c, out)
  } catch (e) {
    outcome = 'ENGINE_ERROR'
    tally[outcome] = (tally[outcome] ?? 0) + 1
    console.log(`${c.caseId},${c.locale},"${c.category.join('|')}",${JSON.stringify(c.expected)},ERR,ERR,ERR,ERR,ERR,${outcome} (${e instanceof Error ? e.message : String(e)})`)
    continue
  }
  const gv = Object.entries(out.guardrails).filter(([, v]) => v).map(([k]) => k)
  const finalBlocked =
    out.humanReviewRequired === true && out.selectedCode === null && out.releasedCode === null &&
    out.finalConclusion === null && out.classifiedOutput === false && out.downstreamAllowed === false
  tally[outcome] = (tally[outcome] ?? 0) + 1
  console.log(
    `${c.caseId},${c.locale},"${c.category.join('|')}",${JSON.stringify(JSON.stringify(c.expected))},` +
    `${out.axes.perception.proposedCode ?? 'null'},${out.axes.objective.proposedCode ?? 'null'},${out.axes.action.proposedCode ?? 'null'},` +
    `"${gv.join('|')}",${finalBlocked},${outcome}`,
  )
}
console.log('TALLY=' + JSON.stringify(tally))
