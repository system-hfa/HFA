export function summarizeEvidence(items: string[]): string[] {
  if (!items || items.length === 0) return []
  return items.filter((s) => typeof s === 'string' && s.trim().length > 0)
}

export function evidenceAbsentLabel(): string {
  return 'Nenhuma evidência explícita disponível para este ponto.'
}

export function confidenceLabel(confidence: string | undefined): string {
  if (!confidence) return 'Não informado'
  const map: Record<string, string> = {
    LOW: 'Baixa — evidência limitada ou conflitante',
    MEDIUM: 'Média — evidência parcial, incertezas presentes',
    HIGH: 'Alta — evidência consistente e suficiente',
  }
  return map[confidence.toUpperCase()] ?? confidence
}
