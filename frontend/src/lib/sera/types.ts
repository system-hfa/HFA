/** Tipos públicos do módulo SERA (API + UI). */

export type FlowAnswer = 'SIM' | 'NAO'

export interface FlowPath {
  no: string
  pergunta: string
  resposta: FlowAnswer | string
  justificativa: string
}

export interface Precondition {
  codigo: string
  nome: string
  justificativa: string
  sourceRuleId?: string
}

export interface SeraStepResult {
  codigo: string
  nome: string
  justificativa: string
  fluxoPercorrido: FlowPath[]
  preconditions: Precondition[]
}

export interface PontoFuga {
  agente: string
  atoInseguroFactual: string
  momento: string
  justificativa: string
}

export interface SeraInput {
  eventoNarrativa: string
  userId: string
  analysisId?: string
  sourceType?: 'text' | 'pdf' | 'docx'
  sourceFileName?: string
  sourceWordCount?: number
}

export interface EditHistory {
  stepAlterado: 2 | 3 | 4 | 5 | 'precondition'
  campo: string
  valorAnterior: string
  valorNovo: string
  stepsRecalculados: number[]
  stepsPreservados: number[]
  timestamp: Date
  motivo?: string
}

export interface SeraAnalysis {
  analysisId: string
  userId: string
  input: SeraInput
  step2: PontoFuga
  step3: SeraStepResult
  step4: SeraStepResult
  step5: SeraStepResult
  step6: string
  step7: string
  editHistory: EditHistory[]
  createdAt: Date
  updatedAt: Date
}

/** Formato bruto dos nós LLM (Steps 3–5), espelha o Python. */
export interface RawFlowNode {
  resposta?: string
  justificativa?: string
  tipo?: string
  objetivo_identificado?: string
  capacidade?: string
  codigo_se_nao?: string | null
  pressao_tempo?: string
  codigo?: string
  [key: string]: unknown
}

export interface StepFlowResult {
  codigo: string
  nos_percorridos: RawFlowNode[]
  falhas_descartadas: string
  _manual_justification?: string
}

export type SeraDecisionSource =
  | 'deterministic_gate'
  | 'llm_node'
  | 'infer_function'
  | 'unknown'

export interface SeraAxisDecisionTrace {
  step: 3 | 4 | 5
  axis: 'perception' | 'objective' | 'action'
  code?: string
  source: SeraDecisionSource
  source_name?: string
  nodes_count?: number
  discarded?: string
  insufficient_evidence_detected?: boolean
}

export interface SeraDecisionTrace {
  perception?: SeraAxisDecisionTrace
  objective?: SeraAxisDecisionTrace
  action?: SeraAxisDecisionTrace
}

export interface SeraPreconditionsTrace {
  mechanism: 'deterministic_matrix' | 'llm' | 'mixed' | 'none' | 'unknown'
  total: number
  source_rule_ids?: string[]
}

export type SeraEvidenceQuality = 'sufficient' | 'partial' | 'insufficient' | 'unknown'
export type SeraUnsafeEventType = 'unsafe_act' | 'unsafe_condition' | 'mixed' | 'unknown'
export type SeraActorLevel =
  | 'frontline_operator'
  | 'crew'
  | 'maintenance'
  | 'supervision'
  | 'organization'
  | 'unknown'

export interface SeraStep1Step2ExplicitTrace {
  safe_operation_escape_point?: string | null
  unsafe_event_type?: SeraUnsafeEventType
  unsafe_act_statement?: string | null
  unsafe_condition_statement?: string | null
  direct_actor?: string | null
  actor_level?: SeraActorLevel
  actor_evidence?: string | null
  actor_level_evidence?: string | null
  actor_uncertainty?: string | null
  goal_statement?: string | null
  goal_evidence?: string | null
  perception_statement?: string | null
  perception_evidence?: string | null
  action_statement?: string | null
  action_evidence?: string | null
  evidence_quality?: SeraEvidenceQuality
  unanswered_questions?: string[]
  source?: 'derived_from_existing_steps'
  limitations?: string[]
}

export interface Step1Result {
  summary?: string
  event_date?: string | null
  event_location?: string | null
  operation_type?: string | null
  occupants_count?: string | null
  flight_phase?: string | null
  weather_conditions?: string | null
  systems_involved?: string | null
  error?: string
}

export interface Step2Result {
  agente?: string
  ato_inseguro_factual?: string
  momento?: string
  justificativa?: string
  error?: string
}

export interface Step67Result {
  precondicoes: Array<{
    codigo?: string
    descricao?: string
    etapa?: string
    evidencia_no_relato?: string
    sourceRuleId?: string
    source_rule_id?: string
  }>
  conclusoes: string
  recomendacoes: Array<{
    acao?: string
    falha_relacionada?: string
    justificativa?: string
  }>
  erc_level?: number
}
