/**
 * Orquestrador do pipeline SERA (TypeScript) — espelha backend/app/sera/pipeline.run_analysis
 * sem atualizar Supabase (quem grava é a rota /api/events ou /api/analyze).
 *
 * FASE 2 — PDF INPUT
 * Quando implementado, o fluxo será:
 * 1. POST /api/extract-pdf.py recebe o arquivo PDF
 * 2. Python extrai o texto com pdfplumber
 * 3. Texto extraído é passado como SeraInput.eventoNarrativa
 * 4. Pipeline TypeScript processa normalmente a partir daí
 * A qualidade da análise LLM não é afetada — o PDF é apenas uma forma alternativa de entrada de texto.
 */
import {
  runStep1,
  runStep2,
  runStep3,
  runStep4,
  runStep5,
  runStep6_7,
} from '@/lib/sera/all-steps'
import { FAILURE_NAMES } from '@/lib/sera/failure-names'
import {
  normPrecondition,
  normRecommendation,
  sanitizePreconditions,
} from '@/lib/sera/preconditions'
import type { RawFlowNode, Step1Result, StepFlowResult } from '@/lib/sera/types'

function joinNodes(step: StepFlowResult): string {
  const nos = step.nos_percorridos || []
  return nos
    .map((n: RawFlowNode) => String(n.justificativa || ''))
    .filter(Boolean)
    .join('; ')
}

function step1Get(step1: Step1Result, key: keyof Step1Result) {
  return step1[key] ?? null
}

const PERCEPTION_CODES = new Set(['P-A', 'P-B', 'P-C', 'P-D', 'P-E', 'P-F', 'P-G', 'P-H'])
const OBJECTIVE_CODES = new Set(['O-A', 'O-B', 'O-C', 'O-D'])
const ACTION_CODES = new Set(['A-A', 'A-B', 'A-C', 'A-D', 'A-E', 'A-F', 'A-G', 'A-H', 'A-I', 'A-J'])

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((t) => text.includes(t))
}

function inferObjectiveCode(rawInput: string, llmCode: string): string {
  const t = normalizeText(rawInput)
  const oC = hasAny(t, [
    'proteger passageiro',
    'proteger paciente',
    'suspeita de infarto',
    'evitar dano imediato',
    'proteger colega',
    'socorro',
    'humanitaria',
  ])
  if (oC) return 'O-C'

  const oD = hasAny(t, [
    'ganhar tempo',
    'economizar combustivel',
    'reduzir custo',
    'eficiencia',
    'produtividade',
    'otimizacao operacional',
    'janela meteorologica',
  ])
  if (oD) return 'O-D'

  const oB = hasAny(t, [
    'todos fazem assim',
    'pratica comum',
    'habito estabelecido',
    'atalho',
    'burocracia',
    'normalizado',
    'cultura',
    'rotina informal',
  ])
  if (oB) return 'O-B'

  return OBJECTIVE_CODES.has(llmCode) ? llmCode : 'O-A'
}

function inferActionCode(rawInput: string, unsafeAct: string, llmCode: string): string {
  const t = normalizeText(`${rawInput} ${unsafeAct}`)

  const commCues = hasAny(t, [
    'readback',
    'confirmacao de leitura',
    'frequencia congestionada',
    'frequencia',
    'transmissao',
    'comunicacao incompleta',
    'instrucao atc',
    'coordena',
  ])
  if (commCues) return 'A-J'

  const supervisionCues = hasAny(t, [
    'supervisor',
    'deleg',
    'instruiu um tecnico',
    'nao retornou',
    'nao confirmou se',
    'nao acompanhou',
  ])
  if (supervisionCues) return 'A-G'

  const physicalCues = hasAny(t, [
    'torque',
    'luvas',
    'forca',
    'alcance',
    'ergonom',
    'fisic',
    'incapaz de fechar',
  ])
  if (physicalCues) return 'A-D'

  const knowledgeCues = hasAny(t, [
    'nao havia recebido treinamento',
    'type-specific',
    'modelo recem-incorporado',
    'protocolo desconhecido',
    'desconhecia',
    'incapacidade tecnica',
  ])
  if (knowledgeCues) return 'A-E'

  const feedbackCues = hasAny(t, [
    'nao verificou se',
    'nao monitorou',
    'nao confirmou o resultado',
    'sem confirmar',
    'apos acionar',
  ])
  if (feedbackCues) return 'A-C'

  const omissionCues = hasAny(t, [
    'esqueceu de',
    'nao inseriu',
    'pino de travamento',
    'nao realizou o checklist',
    'omitiu',
    'nao executou',
    'sem realizar a verificacao',
  ])
  if (omissionCues) return 'A-B'

  const timeCues = hasAny(t, [
    'tempo insuficiente',
    'interrup',
    'nao concluiu',
    'atrasado',
    'slot de decolagem',
    'estimou que teria',
    'subestim',
  ])
  if (timeCues) return 'A-H'

  const aiOnlyCues = hasAny(t, [
    'conflito iminente',
    'menos de 60 segundos',
    'alta demanda',
    'multiplas opcoes',
    'multiplas comunicacoes',
    'emitiu instrucao de',
    'deveria ser',
    'deveria descer',
  ])
  if (aiOnlyCues) return 'A-I'

  const wrongSelectionCues = hasAny(t, [
    'procedimento adjacente',
    'layout visual similar',
    'confusao entre alternativas',
    'qrh',
    'escolheu procedimento errado',
    'rota errada',
    'modo errado',
  ])
  if (wrongSelectionCues) return 'A-F'

  if (llmCode === 'A-I') return 'A-A'
  return ACTION_CODES.has(llmCode) ? llmCode : 'A-A'
}

function inferPerceptionCode(rawInput: string, objectiveCode: string, actionCode: string, llmCode: string): string {
  const t = normalizeText(rawInput)

  if (hasAny(t, ['protetores auriculares', 'nao ouviu', 'nao enxergou', 'visao obstruida', 'ruido elevado'])) {
    return 'P-B'
  }
  if (hasAny(t, ['nao havia recebido treinamento', 'nunca havia operado', 'desconhecia', 'confundiu a escala'])) {
    return 'P-C'
  }
  if (hasAny(t, ['ilusao vestibular', 'forte sensacao de estar nivelado', 'imc', 'nuvem inesperadamente', 'distorcao sensorial'])) {
    return 'P-F'
  }

  const phCues = hasAny(t, [
    'briefing confuso',
    'comunicacao incompleta',
    'ordem de servico',
    'entendeu',
    'numeração dos sistemas',
    'handoff',
    'instrucao contraditoria',
    'ambigua',
  ])
  if (phCues) return 'P-H'

  if (hasAny(t, ['estimou que teria', 'subestim', 'janela de tempo', 'previsao de tempo', 'calculo temporal'])) {
    return 'P-E'
  }
  if (hasAny(t, ['pico operacional', 'alarmes simultaneos', 'multiplos estimulos', 'sobrecarga atencional'])) {
    return 'P-D'
  }
  if (hasAny(t, ['complacencia', 'familiaridade', 'nao verificou', 'nao conferiu', 'excesso de confianca'])) {
    return 'P-G'
  }

  if (objectiveCode === 'O-B' || objectiveCode === 'O-C' || objectiveCode === 'O-D') return 'P-A'
  if (['A-D', 'A-E', 'A-F', 'A-G', 'A-H', 'A-J'].includes(actionCode)) return 'P-A'

  if (llmCode === 'P-H' && !phCues) return hasAny(t, ['nao verificou', 'complacencia']) ? 'P-G' : 'P-A'
  return PERCEPTION_CODES.has(llmCode) ? llmCode : 'P-A'
}

function inferErcLevel(rawInput: string, perception: string, objective: string, action: string): number {
  const t = normalizeText(rawInput)
  if (objective === 'O-B') return 1
  if (action === 'A-I' || action === 'A-J') return 1
  if (hasAny(t, ['conflito iminente', 'violacao de altitude minima', 'frequencia congestionada'])) return 1

  if (action === 'A-B' || action === 'A-D' || action === 'A-G') return 3
  if (action === 'A-C' || action === 'A-E' || action === 'A-F' || action === 'A-H') return 2

  if (action === 'A-A') {
    if (['P-B', 'P-C', 'P-D', 'P-G', 'P-H'].includes(perception)) return 3
    if (objective === 'O-C' || objective === 'O-D') return 2
    return 2
  }

  return 2
}

export async function runSeraPipeline(rawInput: string) {
  const step1 = await runStep1(rawInput)
  if (step1.error) throw new Error(step1.error)

  const step2 = await runStep2(rawInput)
  if (step2.error) throw new Error(String(step2.error))

  // Steps 3/4/5 depend apenas do Step 2 (ponto de fuga) e podem rodar em paralelo.
  const [step3, step4, step5] = await Promise.all([
    runStep3(rawInput, step2),
    runStep4(rawInput, step2),
    runStep5(rawInput, step2),
  ])
  const objectiveFromFlow = String(step4.codigo || '')
  const actionFromFlow = String(step5.codigo || '')
  const perceptionFromFlow = String(step3.codigo || '')

  const objective_code = OBJECTIVE_CODES.has(objectiveFromFlow)
    ? objectiveFromFlow
    : inferObjectiveCode(rawInput, objectiveFromFlow)

  const action_code = ACTION_CODES.has(actionFromFlow)
    ? actionFromFlow
    : inferActionCode(rawInput, String(step2.ato_inseguro_factual || ''), actionFromFlow)

  let perception_code = PERCEPTION_CODES.has(perceptionFromFlow)
    ? perceptionFromFlow
    : inferPerceptionCode(rawInput, objective_code, action_code, perceptionFromFlow)

  if (action_code === 'A-G') {
    perception_code = 'P-A'
  }

  step3.codigo = perception_code
  step4.codigo = objective_code
  step5.codigo = action_code

  const step6_7 = await runStep6_7(rawInput, step2, step3, step4, step5)
  if (typeof step6_7.erc_level !== 'number') {
    step6_7.erc_level = inferErcLevel(rawInput, step3.codigo, step4.codigo, step5.codigo)
  }
  step6_7.precondicoes = sanitizePreconditions(
    (step6_7.precondicoes || []) as Array<Record<string, unknown>>,
    5
  ) as typeof step6_7.precondicoes

  return { step1, step2, step3, step4, step5, step6_7 }
}

export type SourceMeta = {
  sourceType?: 'text' | 'pdf' | 'docx'
  sourceFileName?: string
  sourceWordCount?: number
  sourceFileUrl?: string | null
}

export function buildAnalysisUpsertPayload(
  eventId: string,
  tenantId: string,
  rawInput: string,
  steps: Awaited<ReturnType<typeof runSeraPipeline>>,
  sourceMeta?: SourceMeta
): Record<string, unknown> {
  const { step1, step2, step3, step4, step5, step6_7 } = steps
  const step1Summary =
    typeof step1.summary === 'string' ? step1.summary : String(step1.summary ?? '')

  const p3 = step3.codigo
  const p4 = step4.codigo
  const p5 = step5.codigo

  const st = sourceMeta?.sourceType ?? 'text'

  return {
    event_id: eventId,
    tenant_id: tenantId,
    summary: step1Summary,
    event_date: step1Get(step1, 'event_date'),
    event_location: step1Get(step1, 'event_location'),
    occupants_count: step1Get(step1, 'occupants_count'),
    flight_phase: step1Get(step1, 'flight_phase'),
    weather_conditions: step1Get(step1, 'weather_conditions'),
    systems_involved: step1Get(step1, 'systems_involved'),
    event_summary: rawInput.trim().slice(0, 1000),
    escape_point: step2.justificativa || '',
    unsafe_agent: step2.agente || '',
    unsafe_act: step2.ato_inseguro_factual || '',
    perception_code: p3,
    perception_name: FAILURE_NAMES[p3] || p3,
    perception_justification: joinNodes(step3),
    perception_discarded: {
      falhas_descartadas: step3.falhas_descartadas,
      nos_percorridos: step3.nos_percorridos,
    },
    objective_code: p4,
    objective_name: FAILURE_NAMES[p4] || p4,
    objective_justification: joinNodes(step4),
    objective_discarded: {
      falhas_descartadas: step4.falhas_descartadas,
      nos_percorridos: step4.nos_percorridos,
    },
    action_code: p5,
    action_name: FAILURE_NAMES[p5] || p5,
    action_justification: joinNodes(step5),
    action_discarded: {
      falhas_descartadas: step5.falhas_descartadas,
      nos_percorridos: step5.nos_percorridos,
    },
    preconditions: (step6_7.precondicoes || []).map((p) =>
      normPrecondition(p as Record<string, unknown>)
    ),
    conclusions: step6_7.conclusoes || '',
    recommendations: (step6_7.recomendacoes || []).map((r) =>
      normRecommendation(r as Record<string, unknown>)
    ),
    raw_llm_output: {
      step1,
      step2,
      step3,
      step4,
      step5,
      step6_7,
    },
    source_type: st,
    source_file_name: sourceMeta?.sourceFileName ?? null,
    source_word_count: sourceMeta?.sourceWordCount ?? null,
    source_file_url: sourceMeta?.sourceFileUrl ?? null,
  }
}
