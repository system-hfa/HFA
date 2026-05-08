/** Normalização de pré-condições / recomendações para o formato da tabela analyses (inglês). */

export function normPrecondition(p: Record<string, unknown>) {
  return {
    code: String(p.codigo ?? p.code ?? ''),
    name: String(p.descricao ?? p.name ?? ''),
    justification: String(p.evidencia_no_relato ?? p.justification ?? ''),
    etapa: String(p.etapa ?? ''),
  }
}

export function normRecommendation(r: Record<string, unknown>) {
  return {
    title: String(r.acao ?? r.title ?? ''),
    related_code: String(r.falha_relacionada ?? r.related_code ?? ''),
    description: String(r.justificativa ?? r.description ?? ''),
  }
}
