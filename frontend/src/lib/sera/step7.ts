import { runStep6_7 } from '@/lib/sera/all-steps'
import type { Step2Result, StepFlowResult } from '@/lib/sera/types'

/** Etapa 7 — conclusões (bloco LLM 6/7). Nota: chama o mesmo LLM que step6; use runPipeline for uma única chamada. */
export async function runStep7(
  relato: string,
  ponto: Step2Result,
  s3: StepFlowResult,
  s4: StepFlowResult,
  s5: StepFlowResult
): Promise<string> {
  const r = await runStep6_7(relato, ponto, s3, s4, s5)
  return r.conclusoes || ''
}
