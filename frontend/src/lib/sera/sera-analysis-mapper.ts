import type {
  EditHistory,
  FlowPath,
  PontoFuga,
  SeraAnalysis,
  SeraInput,
  SeraStepResult,
  RawFlowNode,
  Step2Result,
  StepFlowResult,
  Step67Result,
} from '@/lib/sera/types'
import { FAILURE_NAMES } from '@/lib/sera/failure-names'
import type { SupabaseClient } from '@supabase/supabase-js'

function simNaoToFlowAnswer(s: string): 'SIM' | 'NAO' {
  const l = s.toLowerCase()
  if (l.startsWith('n') || l === 'não' || l === 'nao') return 'NAO'
  return 'SIM'
}

function nodesToFlowPath(nos: RawFlowNode[] | undefined): FlowPath[] {
  if (!nos?.length) return []
  return nos.map((n, i) => ({
    no: `Nó ${i + 1}`,
    pergunta: '',
    resposta: simNaoToFlowAnswer(String(n.resposta ?? '')),
    justificativa: String(n.justificativa ?? ''),
  }))
}

function stepFromFlowAndColumns(
  codigo: string,
  nome: string,
  justification: string,
  discarded: { nos_percorridos?: RawFlowNode[] } | null | undefined,
  rawStep: StepFlowResult | undefined
): SeraStepResult {
  const nos = rawStep?.nos_percorridos ?? discarded?.nos_percorridos
  return {
    codigo,
    nome: nome || FAILURE_NAMES[codigo] || codigo,
    justificativa: rawStep?._manual_justification || justification || '',
    fluxoPercorrido: nodesToFlowPath(nos),
    preconditions: [],
  }
}

function pontoFromRow(rawLlm: Record<string, unknown> | undefined, row: Record<string, unknown>): PontoFuga {
  const s2 = rawLlm?.step2 as Step2Result | undefined
  if (s2 && !s2.error) {
    return {
      agente: String(s2.agente ?? ''),
      atoInseguroFactual: String(s2.ato_inseguro_factual ?? ''),
      momento: String(s2.momento ?? ''),
      justificativa: String(s2.justificativa ?? ''),
    }
  }
  return {
    agente: String(row.unsafe_agent ?? ''),
    atoInseguroFactual: String(row.unsafe_act ?? ''),
    momento: '',
    justificativa: String(row.escape_point ?? ''),
  }
}

function parseStepAltered(step: unknown): EditHistory['stepAlterado'] {
  if (step === 'precondition') return 'precondition'
  if (step === '2') return 2
  if (step === '3') return 3
  if (step === '4') return 4
  if (step === '5') return 5
  return 'precondition'
}

export function mapAnalysisEditsToHistory(rows: Record<string, unknown>[] | null): EditHistory[] {
  if (!rows?.length) return []
  return rows.map((r) => {
    let valorAnterior = ''
    if (r.value_before != null) {
      valorAnterior =
        typeof r.value_before === 'string' ? r.value_before : JSON.stringify(r.value_before)
    }
    let valorNovo = ''
    if (r.value_after != null) {
      valorNovo = typeof r.value_after === 'string' ? r.value_after : JSON.stringify(r.value_after)
    }

    const h: EditHistory = {
      stepAlterado: parseStepAltered(r.step_altered),
      campo: String(r.field_changed ?? ''),
      valorAnterior,
      valorNovo,
      stepsRecalculados: (r.steps_recalculated as number[]) ?? [],
      stepsPreservados: (r.steps_preserved as number[]) ?? [],
      timestamp: new Date(String(r.created_at)),
    }
    if (r.reason) h.motivo = String(r.reason)
    return h
  })
}

export async function fetchEditHistoryForAnalysis(
  admin: SupabaseClient,
  analysisId: string,
  tenantId: string
): Promise<EditHistory[]> {
  const { data } = await admin
    .from('analysis_edits')
    .select('*')
    .eq('analysis_id', analysisId)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: true })

  return mapAnalysisEditsToHistory(data ?? [])
}

export function buildSeraAnalysisFromDbRow(
  row: Record<string, unknown>,
  userId: string,
  narrativeForInput: string,
  editHistory: EditHistory[]
): SeraAnalysis {
  const rawLlm = (row.raw_llm_output as Record<string, unknown> | undefined) ?? undefined
  const s3r = rawLlm?.step3 as StepFlowResult | undefined
  const s4r = rawLlm?.step4 as StepFlowResult | undefined
  const s5r = rawLlm?.step5 as StepFlowResult | undefined
  const s67 = rawLlm?.step6_7 as Step67Result | undefined

  const p3 = String(row.perception_code ?? s3r?.codigo ?? '')
  const p4 = String(row.objective_code ?? s4r?.codigo ?? '')
  const p5 = String(row.action_code ?? s5r?.codigo ?? '')

  const disc3 = row.perception_discarded as { nos_percorridos?: RawFlowNode[] } | undefined
  const disc4 = row.objective_discarded as { nos_percorridos?: RawFlowNode[] } | undefined
  const disc5 = row.action_discarded as { nos_percorridos?: RawFlowNode[] } | undefined

  const recs = row.recommendations
  const step6 = typeof recs === 'string' ? recs : JSON.stringify(recs ?? [])

  const st = row.source_type as SeraInput['sourceType'] | undefined
  const input: SeraInput = {
    eventoNarrativa: narrativeForInput,
    userId,
    analysisId: String(row.id ?? ''),
    sourceType: st || 'text',
    sourceFileName: row.source_file_name ? String(row.source_file_name) : undefined,
    sourceWordCount:
      row.source_word_count != null ? Number(row.source_word_count) : undefined,
  }

  return {
    analysisId: String(row.id ?? ''),
    userId,
    input,
    step2: pontoFromRow(rawLlm, row),
    step3: stepFromFlowAndColumns(
      p3,
      String(row.perception_name ?? ''),
      String(row.perception_justification ?? ''),
      disc3,
      s3r
    ),
    step4: stepFromFlowAndColumns(
      p4,
      String(row.objective_name ?? ''),
      String(row.objective_justification ?? ''),
      disc4,
      s4r
    ),
    step5: stepFromFlowAndColumns(
      p5,
      String(row.action_name ?? ''),
      String(row.action_justification ?? ''),
      disc5,
      s5r
    ),
    step6,
    step7: String(row.conclusions ?? s67?.conclusoes ?? ''),
    editHistory,
    createdAt: new Date(String(row.created_at ?? Date.now())),
    updatedAt: new Date(String(row.updated_at ?? Date.now())),
  }
}

export function seraAnalysisToJson(s: SeraAnalysis) {
  return {
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    editHistory: s.editHistory.map((h) => ({
      ...h,
      timestamp: h.timestamp.toISOString(),
    })),
  }
}
