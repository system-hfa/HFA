import { runStep6_7 } from '@/lib/sera/all-steps'
import type { Step2Result, StepFlowResult } from '@/lib/sera/types'

/** Etapa 6 — recomendações (texto derivado do bloco LLM 6/7). */
export async function runStep6(
  relato: string,
  ponto: Step2Result,
  s3: StepFlowResult,
  s4: StepFlowResult,
  s5: StepFlowResult
): Promise<string> {
  const r = await runStep6_7(relato, ponto, s3, s4, s5)
  return JSON.stringify(r.recomendacoes ?? [])
}
