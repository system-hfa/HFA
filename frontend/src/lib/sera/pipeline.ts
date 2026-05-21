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
import { SERA_MOTOR_VERSION } from '@/lib/sera/version'
import {
  normPrecondition,
  normRecommendation,
  sanitizePreconditions,
} from '@/lib/sera/preconditions'
import { selectDeterministicPreconditions } from '@/lib/sera/rules/preconditions'
import type {
  RawFlowNode,
  SeraActorLevel,
  SeraAxisDecisionTrace,
  SeraDecisionSource,
  SeraDecisionTrace,
  SeraEvidenceQuality,
  SeraPreconditionsTrace,
  SeraQuestionTraceItem,
  SeraStep1Step2ExplicitTrace,
  SeraUnsafeEventType,
  Step1Result,
  Step2Result,
  StepFlowResult,
} from '@/lib/sera/types'

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

function containsInsufficientEvidence(step: StepFlowResult | null | undefined): boolean {
  if (!step) return false
  const chunks: string[] = [String(step.falhas_descartadas || '')]
  for (const node of step.nos_percorridos || []) {
    chunks.push(String(node.justificativa || ''))
    chunks.push(String(node.pergunta || ''))
  }
  return normalizeText(chunks.join(' ')).includes('dado insuficiente')
}

function nodeSummary(node: RawFlowNode | undefined): string {
  if (!node) return ''
  const no = String(node.no || '').trim()
  const pergunta = String(node.pergunta || '').trim()
  const justificativa = String(node.justificativa || '').trim()
  return [no, pergunta, justificativa].filter(Boolean).join(' | ')
}

function detectDecisionSource(step: StepFlowResult | null | undefined, inferred: boolean): SeraDecisionSource {
  if (inferred) return 'infer_function'
  if (!step || !Array.isArray(step.nos_percorridos) || step.nos_percorridos.length === 0) return 'unknown'

  const isDeterministic = step.nos_percorridos.some((node) => {
    const txt = normalizeText(`${String(node.justificativa || '')} ${String(node.pergunta || '')}`)
    return txt.includes('gate determin')
  })
  if (isDeterministic) return 'deterministic_gate'
  return 'llm_node'
}

function buildAxisDecisionTrace(input: {
  stepNumber: 3 | 4 | 5
  axis: 'perception' | 'objective' | 'action'
  step: StepFlowResult
  code: string
  inferred: boolean
  inferName: 'inferPerceptionCode' | 'inferObjectiveCode' | 'inferActionCode'
}): SeraAxisDecisionTrace {
  const source = detectDecisionSource(input.step, input.inferred)
  const firstNode = input.step.nos_percorridos?.[0]
  const sourceName =
    source === 'infer_function'
      ? input.inferName
      : source === 'deterministic_gate'
        ? nodeSummary(firstNode) || 'deterministic_gate'
        : source === 'llm_node'
          ? String(firstNode?.no || firstNode?.pergunta || 'llm_node').trim()
          : undefined

  return {
    step: input.stepNumber,
    axis: input.axis,
    code: input.code,
    source,
    source_name: sourceName || undefined,
    nodes_count: (input.step.nos_percorridos || []).length,
    discarded: String(input.step.falhas_descartadas || ''),
    insufficient_evidence_detected: containsInsufficientEvidence(input.step),
  }
}

function buildPreconditionsTrace(
  preconditions: Array<Record<string, unknown>> | undefined | null
): SeraPreconditionsTrace {
  const rows = Array.isArray(preconditions) ? preconditions : []
  const total = rows.length
  const sourceRuleIds = [...new Set(
    rows
      .map((row) => String(row.sourceRuleId ?? row.source_rule_id ?? '').trim())
      .filter(Boolean)
  )]

  const hasDeterministicTag = rows.some((row) =>
    normalizeText(String(row.etapa || '')).includes('deterministicpreconditions')
  )
  const hasDeterministic = hasDeterministicTag || sourceRuleIds.length > 0
  const hasLlm = rows.some((row) => !String(row.sourceRuleId ?? row.source_rule_id ?? '').trim())

  let mechanism: SeraPreconditionsTrace['mechanism'] = 'unknown'
  if (total === 0) mechanism = 'none'
  else if (hasDeterministic && hasLlm) mechanism = 'mixed'
  else if (hasDeterministic) mechanism = 'deterministic_matrix'
  else if (hasLlm) mechanism = 'llm'

  return {
    mechanism,
    total,
    ...(sourceRuleIds.length > 0 ? { source_rule_ids: sourceRuleIds } : {}),
  }
}

function cleanText(value: unknown): string {
  return String(value ?? '').trim()
}

type StatementSource = 'raw_input' | 'step2' | 'step_nodes' | 'none'

type DerivedStatement = {
  statement: string | null
  evidence: string | null
  source: StatementSource
}

type DerivedActorTrace = {
  directActor: string | null
  actorLevel: SeraActorLevel
  actorEvidence: string | null
  actorLevelEvidence: string | null
  actorUncertainty: string | null
  multipleActorLevelsPossible: boolean
  contextMayBePrecondition: boolean
}

function sanitizeStatementChunk(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/^gate determin[íi]stico:\s*/i, '')
    .replace(/^n[oó]\s*\d+[a-z\-]?:?\s*/i, '')
    .trim()
}

function splitIntoSentences(text: string): string[] {
  return text
    .split(/[.!?;\n]+/)
    .map((chunk) => sanitizeStatementChunk(chunk))
    .filter((chunk) => chunk.length >= 20)
}

function dedupeStrings(values: string[]): string[] {
  return [...new Set(values.map((value) => cleanText(value)).filter(Boolean))]
}

function collectStepNodeText(step: StepFlowResult): string[] {
  const chunks: string[] = []
  chunks.push(String(step.falhas_descartadas || ''))
  for (const node of step.nos_percorridos || []) {
    chunks.push(String(node.justificativa || ''))
    chunks.push(String(node.pergunta || ''))
    chunks.push(String(node.objetivo_identificado || ''))
  }
  return chunks
}

function isMetaNarrative(text: string): boolean {
  const t = normalizeText(text)
  return hasAny(t, [
    'pergunta local',
    'responda apenas com json',
    'gate determin',
    'descartad',
    'allowedcodes',
    'violacao metodologica',
  ])
}

function hasCue(text: string, cues: string[]): boolean {
  const t = normalizeText(text)
  return cues.some((cue) => t.includes(normalizeText(cue)))
}

function extractStatementByCues(
  sources: Array<{ source: StatementSource; chunks: string[] }>,
  cues: string[]
): DerivedStatement {
  for (const source of sources) {
    for (const chunk of source.chunks) {
      const cleanChunk = sanitizeStatementChunk(chunk)
      if (!cleanChunk || isMetaNarrative(cleanChunk)) continue
      if (!hasCue(cleanChunk, cues)) continue
      return {
        statement: cleanChunk,
        evidence: cleanChunk,
        source: source.source,
      }
    }
  }
  return { statement: null, evidence: null, source: 'none' }
}

function tokenizeForOverlap(text: string): string[] {
  const stop = new Set([
    'de', 'da', 'do', 'das', 'dos', 'para', 'com', 'sem', 'por', 'uma', 'um', 'que', 'na', 'no',
    'nas', 'nos', 'foi', 'era', 'ser', 'ter', 'em', 'ao', 'aos', 'as', 'os', 'e', 'o', 'a',
  ])
  return normalizeText(text)
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 4 && !stop.has(token))
}

function findSentenceByOverlap(base: string, candidates: string[]): string | null {
  const tokens = tokenizeForOverlap(base)
  if (tokens.length === 0) return null

  let bestSentence = ''
  let bestScore = 0
  for (const candidate of candidates) {
    const c = normalizeText(candidate)
    let score = 0
    for (const token of tokens) {
      if (c.includes(token)) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      bestSentence = sanitizeStatementChunk(candidate)
    }
  }
  return bestScore >= 2 ? bestSentence : null
}

function actorLevelMatches(text: string): Array<{ level: SeraActorLevel; cue: string }> {
  const t = normalizeText(text)
  if (!t) return []

  const groups: Array<{ level: SeraActorLevel; cues: string[] }> = [
    { level: 'crew', cues: ['piloto', 'comandante', 'copiloto', 'tripulacao', 'crew', 'pf', 'pm'] },
    { level: 'maintenance', cues: ['manutencao', 'mecanico', 'equipe de manutencao', 'tecnico de manutencao', 'maintenance'] },
    { level: 'supervision', cues: ['supervisor', 'supervisao', 'coordenador', 'lideranca operacional', 'gestor direto'] },
    { level: 'organization', cues: ['empresa', 'organizacao', 'gestao', 'processo organizacional', 'politica', 'planejamento organizacional', 'management'] },
    { level: 'frontline_operator', cues: ['operador', 'operator', 'tecnico'] },
  ]

  const found: Array<{ level: SeraActorLevel; cue: string }> = []
  for (const group of groups) {
    for (const cue of group.cues) {
      if (t.includes(normalizeText(cue))) {
        found.push({ level: group.level, cue })
        break
      }
    }
  }
  return found
}

function detectDirectActorFromContext(input: {
  directActorFromStep2: string
  rawSentences: string[]
  step2Sentences: string[]
}): { actor: string | null; evidence: string | null; contextMayBePrecondition: boolean } {
  const actor = cleanText(input.directActorFromStep2)
  if (actor) return { actor, evidence: actor, contextMayBePrecondition: false }

  const candidates = dedupeStrings([...input.step2Sentences, ...input.rawSentences])
  for (const sentence of candidates) {
    if (!sentence || isMetaNarrative(sentence)) continue
    const matches = actorLevelMatches(sentence)
    if (matches.length === 0) continue

    const contextMayBePrecondition = hasCue(sentence, [
      'organizacao',
      'organização',
      'gestao',
      'gestão',
      'treinamento',
      'cultura',
      'fator latente',
      'precondicao',
      'pré-condição',
      'supervisao',
      'supervisão',
      'manutencao',
      'manutenção',
    ])

    if (contextMayBePrecondition) {
      return { actor: null, evidence: sentence, contextMayBePrecondition: true }
    }

    return { actor: sentence, evidence: sentence, contextMayBePrecondition: false }
  }

  return { actor: null, evidence: null, contextMayBePrecondition: false }
}

function deriveActorTrace(input: {
  rawInput: string
  step2Agente: string
  step2Ato: string
  step2Justificativa: string
  step3: StepFlowResult
  step4: StepFlowResult
  step5: StepFlowResult
}): DerivedActorTrace {
  const rawSentences = splitIntoSentences(input.rawInput)
  const step2Sentences = splitIntoSentences(
    [input.step2Agente, input.step2Ato, input.step2Justificativa].filter(Boolean).join('. ')
  )
  const ctxActor = detectDirectActorFromContext({
    directActorFromStep2: input.step2Agente,
    rawSentences,
    step2Sentences,
  })

  const directActor = ctxActor.actor
  const actorEvidence = ctxActor.evidence
  const directActorText = directActor || ''

  const levelMatchesFromActor = actorLevelMatches(directActorText)
  const contextMatches = actorLevelMatches(
    dedupeStrings([
      ...splitIntoSentences(collectStepNodeText(input.step3).join('. ')),
      ...splitIntoSentences(collectStepNodeText(input.step4).join('. ')),
      ...splitIntoSentences(collectStepNodeText(input.step5).join('. ')),
      ...rawSentences,
    ]).join('. ')
  )

  const uniqueActorLevels = [...new Set(levelMatchesFromActor.map((item) => item.level))]
  const uniqueContextLevels = [...new Set(contextMatches.map((item) => item.level))]
  const multipleActorLevelsPossible = uniqueActorLevels.length > 1

  let actorLevel: SeraActorLevel = 'unknown'
  let actorLevelEvidence: string | null = null
  let actorUncertainty: string | null = null

  if (!directActor) {
    actorUncertainty = ctxActor.contextMayBePrecondition
      ? 'actor mencionado apenas em contexto potencial de precondition, sem ator direto explícito.'
      : 'ator direto não explícito no ponto de fuga.'
  } else if (multipleActorLevelsPossible) {
    actorLevel = 'unknown'
    actorLevelEvidence = levelMatchesFromActor.map((m) => `${m.level}:${m.cue}`).join(', ')
    actorUncertainty = 'múltiplos níveis possíveis no texto do ator direto.'
  } else if (uniqueActorLevels.length === 1) {
    actorLevel = uniqueActorLevels[0]
    actorLevelEvidence = `step2.agente lexical cue: ${levelMatchesFromActor[0].cue}`
  } else {
    actorLevel = 'unknown'
    actorUncertainty = 'nível do ator direto não identificado com segurança.'
  }

  if (
    actorLevel !== 'unknown' &&
    uniqueContextLevels.length > 0 &&
    !uniqueContextLevels.includes(actorLevel)
  ) {
    actorUncertainty = actorUncertainty
      ? `${actorUncertainty} contexto também menciona outros níveis possivelmente latentes.`
      : 'contexto menciona outros níveis possivelmente latentes.'
  }

  return {
    directActor: directActor || null,
    actorLevel,
    actorEvidence: actorEvidence || null,
    actorLevelEvidence,
    actorUncertainty,
    multipleActorLevelsPossible,
    contextMayBePrecondition: ctxActor.contextMayBePrecondition,
  }
}

function detectUnsafeConditionStatement(step2: Step2Result, rawInput: string): string | null {
  const justificativa = cleanText(step2.justificativa)
  const sourceText = normalizeText(`${rawInput} ${justificativa}`)
  const hasConditionSignal = hasAny(sourceText, [
    'unsafe condition',
    'condicao insegura',
    'condicao latente',
    'falha latente',
    'ambiente inseguro',
    'sistema inseguro',
  ])
  if (!hasConditionSignal) return null
  return justificativa || null
}

function inferEvidenceQuality(input: {
  safeOperationEscapePoint: string | null
  directActor: string | null
  goalStatement: string | null
  goalEvidence: string | null
  perceptionStatement: string | null
  perceptionEvidence: string | null
  actionStatement: string | null
  actionEvidence: string | null
}): SeraEvidenceQuality {
  const hasEscape = Boolean(input.safeOperationEscapePoint)
  const hasActor = Boolean(input.directActor)
  const hasAction = Boolean(input.actionStatement && input.actionEvidence)
  if (!hasEscape || !hasActor || !hasAction) return 'insufficient'

  const hasGoalWithEvidence = Boolean(input.goalStatement && input.goalEvidence)
  const hasPerceptionWithEvidence = Boolean(input.perceptionStatement && input.perceptionEvidence)
  if (hasGoalWithEvidence || hasPerceptionWithEvidence) return 'sufficient'
  if (hasEscape && hasActor && hasAction) return 'partial'
  return 'unknown'
}

function buildStep1Step2ExplicitTrace(
  rawInput: string,
  step2: Step2Result,
  step3: StepFlowResult,
  step4: StepFlowResult,
  step5: StepFlowResult
): SeraStep1Step2ExplicitTrace {
  const momento = cleanText(step2.momento)
  const unsafeAct = cleanText(step2.ato_inseguro_factual)
  const justificativa = cleanText(step2.justificativa)
  const actorTrace = deriveActorTrace({
    rawInput,
    step2Agente: cleanText(step2.agente),
    step2Ato: unsafeAct,
    step2Justificativa: justificativa,
    step3,
    step4,
    step5,
  })
  const directActor = actorTrace.directActor

  const safeOperationEscapePointParts = [momento, unsafeAct, justificativa].filter(Boolean)
  const safeOperationEscapePoint =
    safeOperationEscapePointParts.length > 0 ? safeOperationEscapePointParts.join(' | ') : null

  const unsafeConditionStatement = detectUnsafeConditionStatement(step2, rawInput)
  const hasUnsafeAct = Boolean(unsafeAct)
  const hasUnsafeCondition = Boolean(unsafeConditionStatement)

  const unsafeEventType: SeraUnsafeEventType = hasUnsafeAct && hasUnsafeCondition
    ? 'mixed'
    : hasUnsafeAct
      ? 'unsafe_act'
      : hasUnsafeCondition
        ? 'unsafe_condition'
        : 'unknown'

  const rawSentences = splitIntoSentences(rawInput)
  const step2Sentences = splitIntoSentences([momento, justificativa, unsafeAct].filter(Boolean).join('. '))
  const step3Sentences = splitIntoSentences(collectStepNodeText(step3).join('. '))
  const step4Sentences = splitIntoSentences(collectStepNodeText(step4).join('. '))
  const step5Sentences = splitIntoSentences(collectStepNodeText(step5).join('. '))

  const goalDerived = extractStatementByCues(
    [
      { source: 'raw_input', chunks: rawSentences },
      { source: 'step2', chunks: step2Sentences },
      { source: 'step_nodes', chunks: step4Sentences },
    ],
    [
      'pretendia',
      'tentava',
      'objetivo era',
      'com a intenção de',
      'com a intencao de',
      'decidiu prosseguir para',
      'buscava',
      'planejava',
      'intenção era',
      'intencao era',
    ]
  )

  const perceptionDerived = extractStatementByCues(
    [
      { source: 'raw_input', chunks: rawSentences },
      { source: 'step2', chunks: step2Sentences },
      { source: 'step_nodes', chunks: step3Sentences },
    ],
    [
      'percebeu',
      'nao percebeu',
      'não percebeu',
      'entendeu que',
      'interpretou',
      'observou',
      'viu',
      'ouviu',
      'acreditou que',
      'indicava',
      'radar mostrava',
      'gps',
      'fms',
      'radio informava',
      'rádio informava',
    ]
  )

  let actionDerived: DerivedStatement
  if (unsafeAct) {
    const actionEvidence =
      findSentenceByOverlap(unsafeAct, dedupeStrings([...rawSentences, ...step5Sentences, ...step2Sentences])) ||
      unsafeAct
    actionDerived = {
      statement: unsafeAct,
      evidence: actionEvidence,
      source: actionEvidence === unsafeAct ? 'step2' : 'raw_input',
    }
  } else {
    actionDerived = extractStatementByCues(
      [
        { source: 'raw_input', chunks: rawSentences },
        { source: 'step_nodes', chunks: step5Sentences },
      ],
      [
        'acionou',
        'executou',
        'omitiu',
        'nao realizou',
        'não realizou',
        'prosseguiu',
        'manteve',
        'selecionou',
        'aplicou',
      ]
    )
  }

  const goalStatement = goalDerived.statement
  const goalEvidence = goalDerived.evidence
  const perceptionStatement = perceptionDerived.statement
  const perceptionEvidence = perceptionDerived.evidence
  const actionStatement = actionDerived.statement
  const actionEvidence = actionDerived.evidence
  const actorLevel = actorTrace.actorLevel

  const unansweredQuestions: string[] = []
  if (!directActor) unansweredQuestions.push('direct_actor_not_explicit')
  if (!goalStatement) unansweredQuestions.push('goal_statement_not_explicit')
  if (!perceptionStatement) unansweredQuestions.push('perception_statement_not_explicit')
  if (!unsafeConditionStatement) unansweredQuestions.push('unsafe_condition_not_separated')
  if (!actionStatement) unansweredQuestions.push('action_statement_not_explicit')
  if (actorLevel === 'unknown') unansweredQuestions.push('actor_level_uncertain')
  if (actorTrace.multipleActorLevelsPossible) unansweredQuestions.push('multiple_actor_levels_possible')
  if (actorTrace.contextMayBePrecondition) unansweredQuestions.push('actor_context_may_be_precondition_not_direct_actor')
  if (
    goalDerived.source === 'step_nodes' ||
    perceptionDerived.source === 'step_nodes' ||
    actionDerived.source === 'step_nodes'
  ) {
    unansweredQuestions.push('statement_evidence_partial')
  }

  return {
    safe_operation_escape_point: safeOperationEscapePoint,
    unsafe_event_type: unsafeEventType,
    unsafe_act_statement: unsafeAct || null,
    unsafe_condition_statement: unsafeConditionStatement,
    direct_actor: directActor,
    actor_level: actorLevel,
    actor_evidence: actorTrace.actorEvidence,
    actor_level_evidence: actorTrace.actorLevelEvidence,
    actor_uncertainty: actorTrace.actorUncertainty,
    goal_statement: goalStatement,
    goal_evidence: goalEvidence,
    perception_statement: perceptionStatement,
    perception_evidence: perceptionEvidence,
    action_statement: actionStatement,
    action_evidence: actionEvidence,
    evidence_quality: inferEvidenceQuality({
      safeOperationEscapePoint,
      directActor,
      goalStatement,
      goalEvidence,
      perceptionStatement,
      perceptionEvidence,
      actionStatement,
      actionEvidence,
    }),
    unanswered_questions: dedupeStrings(unansweredQuestions),
    source: 'derived_from_existing_steps',
    limitations: [
      'A3-d4: actor trace experimental derivado em pos-processamento read-only.',
      'Actor_level e heuristica conservadora e nao altera classificacao.',
      'Supervisao/manutencao/organizacao podem ser preconditions e nao necessariamente direct_actor.',
      'Identificacao definitiva de ator direto exige question_trace futuro e Step 1 explicito.',
      'A3-d2: statements experimentais derivados de dados existentes do pipeline.',
      'Extracao heuristica conservadora sem nova chamada LLM.',
      'Statements nao influenciam classificacao P/O/A/ERC e podem permanecer nulos sem evidencia textual suficiente.',
    ],
  }
}

type TraceContext = {
  perception_inferred: boolean
  objective_inferred: boolean
  action_inferred: boolean
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
  const objectiveInferred = !OBJECTIVE_CODES.has(objectiveFromFlow)
  const actionInferred = !ACTION_CODES.has(actionFromFlow)
  const perceptionInferred = !PERCEPTION_CODES.has(perceptionFromFlow)

  const objective_code = !objectiveInferred
    ? objectiveFromFlow
    : inferObjectiveCode(rawInput, objectiveFromFlow)

  const action_code = !actionInferred
    ? actionFromFlow
    : inferActionCode(rawInput, String(step2.ato_inseguro_factual || ''), actionFromFlow)

  const perception_code = !perceptionInferred
    ? perceptionFromFlow
    : inferPerceptionCode(rawInput, objective_code, action_code, perceptionFromFlow)

  step3.codigo = perception_code
  step4.codigo = objective_code
  step5.codigo = action_code

  const step6_7 = await runStep6_7(rawInput, step2, step3, step4, step5)
  if (typeof step6_7.erc_level !== 'number') {
    step6_7.erc_level = inferErcLevel(rawInput, step3.codigo, step4.codigo, step5.codigo)
  }
  const deterministicPreconditions = selectDeterministicPreconditions(
    {
      perception_code: step3.codigo,
      objective_code: step4.codigo,
      action_code: step5.codigo,
      erc_level: step6_7.erc_level,
    },
    rawInput
  )
  if (deterministicPreconditions.length > 0) {
    step6_7.precondicoes = deterministicPreconditions.map((item) => ({
      codigo: item.code,
      etapa: 'DeterministicPreconditions',
      evidencia_no_relato: item.matchedEvidence.join(', '),
      descricao: '',
      sourceRuleId: item.sourceRuleId,
    }))
  }
  step6_7.precondicoes = sanitizePreconditions(
    (step6_7.precondicoes || []) as Array<Record<string, unknown>>,
    5
  ) as typeof step6_7.precondicoes

  return {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6_7,
    trace_context: {
      perception_inferred: perceptionInferred,
      objective_inferred: objectiveInferred,
      action_inferred: actionInferred,
    } as TraceContext,
  }
}

export type SourceMeta = {
  sourceType?: 'text' | 'pdf' | 'docx'
  sourceFileName?: string
  sourceWordCount?: number
  sourceFileUrl?: string | null
}

const VALID_PERCEPTION_CODES = new Set(['P-A', 'P-B', 'P-C', 'P-D', 'P-E', 'P-F', 'P-G', 'P-H'])
const VALID_OBJECTIVE_CODES = new Set(['O-A', 'O-B', 'O-C', 'O-D'])
const VALID_ACTION_CODES = new Set(['A-A', 'A-B', 'A-C', 'A-D', 'A-E', 'A-F', 'A-G', 'A-H', 'A-I', 'A-J'])

function computeCompleteness(
  p3: string,
  p4: string,
  p5: string,
  ercLevel: unknown
): { completeness: 'complete' | 'partial'; reason: string | null } {
  const missing: string[] = []
  if (!VALID_PERCEPTION_CODES.has(p3)) missing.push('perception_code')
  if (!VALID_OBJECTIVE_CODES.has(p4)) missing.push('objective_code')
  if (!VALID_ACTION_CODES.has(p5)) missing.push('action_code')
  const ercOk = typeof ercLevel === 'number' && ercLevel >= 1 && ercLevel <= 5
  if (!ercOk) missing.push('erc_level')
  if (missing.length === 0) return { completeness: 'complete', reason: null }
  return {
    completeness: 'partial',
    reason: `Campos ausentes ou inválidos: ${missing.join(', ')}`,
  }
}

export function buildAnalysisUpsertPayload(
  eventId: string,
  tenantId: string,
  rawInput: string,
  steps: Awaited<ReturnType<typeof runSeraPipeline>>,
  sourceMeta?: SourceMeta
): Record<string, unknown> {
  const { step1, step2, step3, step4, step5, step6_7 } = steps
  const traceContext = (steps as { trace_context?: TraceContext }).trace_context
  const step1Summary =
    typeof step1.summary === 'string' ? step1.summary : String(step1.summary ?? '')

  const p3 = step3.codigo
  const p4 = step4.codigo
  const p5 = step5.codigo

  const { completeness, reason } = computeCompleteness(p3, p4, p5, step6_7.erc_level)
  const st = sourceMeta?.sourceType ?? 'text'
  const decision_trace: SeraDecisionTrace = {
    perception: buildAxisDecisionTrace({
      stepNumber: 3,
      axis: 'perception',
      step: step3,
      code: p3,
      inferred: Boolean(traceContext?.perception_inferred),
      inferName: 'inferPerceptionCode',
    }),
    objective: buildAxisDecisionTrace({
      stepNumber: 4,
      axis: 'objective',
      step: step4,
      code: p4,
      inferred: Boolean(traceContext?.objective_inferred),
      inferName: 'inferObjectiveCode',
    }),
    action: buildAxisDecisionTrace({
      stepNumber: 5,
      axis: 'action',
      step: step5,
      code: p5,
      inferred: Boolean(traceContext?.action_inferred),
      inferName: 'inferActionCode',
    }),
  }
  const preconditions_trace = buildPreconditionsTrace(
    (step6_7.precondicoes || []) as Array<Record<string, unknown>>
  )
  const step1_step2_explicit_trace = buildStep1Step2ExplicitTrace(
    rawInput,
    step2,
    step3,
    step4,
    step5
  )
  const question_trace: SeraQuestionTraceItem[] = []

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
    preconditions: (step6_7.precondicoes || []).map((p) => {
      const normalized = normPrecondition(p as Record<string, unknown>)
      const sourceRuleId = String((p as Record<string, unknown>).sourceRuleId ?? (p as Record<string, unknown>).source_rule_id ?? '').trim()
      return sourceRuleId ? { ...normalized, sourceRuleId } : normalized
    }),
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
      decision_trace,
      preconditions_trace,
      step1_step2_explicit_trace,
      question_trace,
    },
    source_type: st,
    source_file_name: sourceMeta?.sourceFileName ?? null,
    source_word_count: sourceMeta?.sourceWordCount ?? null,
    source_file_url: sourceMeta?.sourceFileUrl ?? null,
    motor_version: SERA_MOTOR_VERSION,
    analysis_completeness: completeness,
    completeness_reason: reason,
  }
}
