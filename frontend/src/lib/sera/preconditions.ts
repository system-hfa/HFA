/** Normalização de pré-condições / recomendações para o formato da tabela analyses (inglês). */

export const PRECONDITION_VOCAB_ORDER = [
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7',
  'T1', 'T2',
  'W1', 'W2', 'W3',
  'S1', 'S2', 'S3',
  'O1', 'O2', 'O3', 'O4', 'O5', 'O6',
] as const

const PRECONDITION_SET = new Set<string>(PRECONDITION_VOCAB_ORDER)
const PRECONDITION_INDEX = new Map<string, number>(
  PRECONDITION_VOCAB_ORDER.map((code, idx) => [code, idx])
)

function toNumber(v: unknown): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function normalizeCode(v: unknown): string {
  return String(v ?? '')
    .trim()
    .toUpperCase()
}

function getScore(v: Record<string, unknown>): number {
  return Math.max(
    toNumber(v.score),
    toNumber(v.peso),
    toNumber(v.weight),
    toNumber(v.rank),
    toNumber(v.ranking)
  )
}

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

export function sanitizePreconditions(
  raw: Array<Record<string, unknown>>,
  max = 5
): Array<Record<string, unknown>> {
  const bestByCode = new Map<string, { row: Record<string, unknown>; score: number }>()

  for (const row of raw) {
    const code = normalizeCode(row.codigo ?? row.code)
    if (!PRECONDITION_SET.has(code)) continue
    if (code.startsWith('A')) continue
    const score = getScore(row)
    const previous = bestByCode.get(code)
    if (!previous || score > previous.score) {
      bestByCode.set(code, { row, score })
    }
  }

  return [...bestByCode.entries()]
    .sort((a, b) => {
      if (b[1].score !== a[1].score) return b[1].score - a[1].score
      return (PRECONDITION_INDEX.get(a[0]) ?? 999) - (PRECONDITION_INDEX.get(b[0]) ?? 999)
    })
    .slice(0, max)
    .map(([code, v]) => ({
      ...v.row,
      codigo: code,
      code,
    }))
}
