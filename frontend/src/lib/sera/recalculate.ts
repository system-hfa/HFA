/**
 * Recálculo seletivo — espelha backend/app/sera/recalculate.py
 * + ramo `precondition` (especificação do produto).
 */
import { runStep2, runStep3, runStep4, runStep5, runStep6_7 } from '@/lib/sera/all-steps'
import { FAILURE_NAMES } from '@/lib/sera/failure-names'
import { normPrecondition, normRecommendation } from '@/lib/sera/preconditions'
import type { RawFlowNode, Step2Result, StepFlowResult, Step67Result } from '@/lib/sera/types'

export const DEPENDENCY_MAP: Record<string, { recalculate: number[]; preserve: number[] }> = {
  '2': { recalculate: [3, 4, 5, 6, 7], preserve: [] },
  '3': { recalculate: [6, 7], preserve: [4, 5] },
  '4': { recalculate: [6, 7], preserve: [3, 5] },
  '5': { recalculate: [6, 7], preserve: [3, 4] },
  precondition: { recalculate: [6, 7], preserve: [3, 4, 5] },
}

function makeFixedStep(code: string, justification = ''): StepFlowResult {
  return {
    codigo: code,
    nos_percorridos: [],
    falhas_descartadas: 'Preservado — não recalculado nesta edição',
    _manual_justification: justification,
  }
}

function joinJustification(step: StepFlowResult, override = ''): string {
  if (override) return override
  const nos = step.nos_percorridos || []
  return nos
    .map((n: RawFlowNode) => String(n.justificativa || ''))
    .filter(Boolean)
    .join('; ')
}

export async function recalculate(input: {
  analysis: Record<string, unknown>
  raw_input: string
  step_altered: string
  field: string
  new_value: string
  new_justification?: string
}): Promise<{
  updates: Record<string, unknown>
  steps_recalculated: number[]
  steps_preserved: number[]
}> {
  const { analysis, raw_input, step_altered, new_value, new_justification = '' } = input
  const dep = DEPENDENCY_MAP[step_altered]
  if (!dep) {
    throw new Error(`step_altered must be one of ${Object.keys(DEPENDENCY_MAP).join(', ')}`)
  }

  let raw_llm = (analysis.raw_llm_output as Record<string, unknown>) || {}
  if (typeof raw_llm === 'string') {
    try {
      raw_llm = JSON.parse(raw_llm) as Record<string, unknown>
    } catch {
      raw_llm = {}
    }
  }

  const stored_step2 = (raw_llm.step2 as Step2Result) || {}
  const stored_step3 = (raw_llm.step3 as StepFlowResult) || ({} as StepFlowResult)
  const stored_step4 = (raw_llm.step4 as StepFlowResult) || ({} as StepFlowResult)
  const stored_step5 = (raw_llm.step5 as StepFlowResult) || ({} as StepFlowResult)

  const updates: Record<string, unknown> = {}
  let new_step3: StepFlowResult | undefined
  let new_step4: StepFlowResult | undefined
  let new_step5: StepFlowResult | undefined
  let step6_7_result: Step67Result

  if (step_altered === 'precondition') {
    const step2 = stored_step2
    step6_7_result = await runStep6_7(
      raw_input,
      step2,
      stored_step3,
      stored_step4,
      stored_step5
    )
  } else if (step_altered === '2') {
    const step2 = await runStep2(raw_input)
    if (step2.error) throw new Error(String(step2.error))
    const step3 = await runStep3(raw_input, step2)
    const step4 = await runStep4(raw_input, step2, step3)
    const step5 = await runStep5(raw_input, step2, step3, step4)
    step6_7_result = await runStep6_7(raw_input, step2, step3, step4, step5)

    const p3 = step3.codigo
    const p4 = step4.codigo
    const p5 = step5.codigo

    Object.assign(updates, {
      escape_point: step2.justificativa || '',
      unsafe_agent: step2.agente || '',
      unsafe_act: step2.ato_inseguro_factual || '',
      perception_code: p3,
      perception_name: FAILURE_NAMES[p3] || p3,
      perception_justification: joinJustification(step3),
      perception_discarded: {
        falhas_descartadas: step3.falhas_descartadas,
        nos_percorridos: step3.nos_percorridos,
      },
      objective_code: p4,
      objective_name: FAILURE_NAMES[p4] || p4,
      objective_justification: joinJustification(step4),
      objective_discarded: {
        falhas_descartadas: step4.falhas_descartadas,
        nos_percorridos: step4.nos_percorridos,
      },
      action_code: p5,
      action_name: FAILURE_NAMES[p5] || p5,
      action_justification: joinJustification(step5),
      action_discarded: {
        falhas_descartadas: step5.falhas_descartadas,
        nos_percorridos: step5.nos_percorridos,
      },
    })
    new_step3 = step3
    new_step4 = step4
    new_step5 = step5
    raw_llm = { ...raw_llm, step2 }
  } else {
    const step2 = stored_step2

    if (step_altered === '3') {
      new_step3 = makeFixedStep(new_value, new_justification)
      new_step4 = stored_step4.codigo
        ? stored_step4
        : makeFixedStep(String(analysis.objective_code || ''), '')
      new_step5 = stored_step5.codigo
        ? stored_step5
        : makeFixedStep(String(analysis.action_code || ''), '')
      Object.assign(updates, {
        perception_code: new_value,
        perception_name: FAILURE_NAMES[new_value] || new_value,
        perception_justification:
          new_justification || String(analysis.perception_justification || ''),
        perception_discarded: {
          nos_percorridos: [],
          falhas_descartadas: 'Editado manualmente pelo usuário',
        },
      })
    } else if (step_altered === '4') {
      new_step3 = stored_step3.codigo
        ? stored_step3
        : makeFixedStep(String(analysis.perception_code || ''), '')
      new_step4 = makeFixedStep(new_value, new_justification)
      new_step5 = stored_step5.codigo
        ? stored_step5
        : makeFixedStep(String(analysis.action_code || ''), '')
      Object.assign(updates, {
        objective_code: new_value,
        objective_name: FAILURE_NAMES[new_value] || new_value,
        objective_justification:
          new_justification || String(analysis.objective_justification || ''),
        objective_discarded: {
          nos_percorridos: [],
          falhas_descartadas: 'Editado manualmente pelo usuário',
        },
      })
    } else if (step_altered === '5') {
      new_step3 = stored_step3.codigo
        ? stored_step3
        : makeFixedStep(String(analysis.perception_code || ''), '')
      new_step4 = stored_step4.codigo
        ? stored_step4
        : makeFixedStep(String(analysis.objective_code || ''), '')
      new_step5 = makeFixedStep(new_value, new_justification)
      Object.assign(updates, {
        action_code: new_value,
        action_name: FAILURE_NAMES[new_value] || new_value,
        action_justification: new_justification || String(analysis.action_justification || ''),
        action_discarded: {
          nos_percorridos: [],
          falhas_descartadas: 'Editado manualmente pelo usuário',
        },
      })
    } else {
      throw new Error(`step_altered não suportado: ${step_altered}`)
    }

    step6_7_result = await runStep6_7(raw_input, step2, new_step3, new_step4, new_step5)
  }

  Object.assign(updates, {
    preconditions: (step6_7_result.precondicoes || []).map((p) =>
      normPrecondition(p as Record<string, unknown>)
    ),
    conclusions: step6_7_result.conclusoes || '',
    recommendations: (step6_7_result.recomendacoes || []).map((r) =>
      normRecommendation(r as Record<string, unknown>)
    ),
  })

  const new_llm: Record<string, unknown> = { ...raw_llm, step6_7: step6_7_result }
  if (new_step3) new_llm.step3 = new_step3
  if (new_step4) new_llm.step4 = new_step4
  if (new_step5) new_llm.step5 = new_step5

  updates.raw_llm_output = new_llm

  return {
    updates,
    steps_recalculated: dep.recalculate,
    steps_preserved: dep.preserve,
  }
}
