import type { HfaErcCategory } from '@/lib/sera/erc-conversion'

const ARMS_SEVERITY_ROW: Record<string, 'A' | 'B' | 'C' | 'D'> = {
  'P-B': 'B',
  'P-F': 'B',
  'P-A': 'D',
}

const ARMS_ERC: Record<string, HfaErcCategory> = {
  A1: 5, A2: 5, A3: 4, A4: 3,
  B1: 4, B2: 4, B3: 3, B4: 2,
  C1: 3, C2: 3, C3: 2, C4: 1,
  D1: 2, D2: 2, D3: 1, D4: 1,
}

function barrierLevel(
  perceptionCode: string | null | undefined,
  objectiveCode: string | null | undefined,
  actionCode: string | null | undefined,
): 1 | 2 | 3 | 4 {
  const fails = [
    perceptionCode && perceptionCode !== 'P-A',
    objectiveCode && objectiveCode !== 'O-A',
    actionCode && actionCode !== 'A-A',
  ].filter(Boolean).length

  if (fails >= 3) return 1
  if (fails === 2) return 2
  if (fails === 1) return 3
  return 4
}

export function computeHfaErcCategoryFromCodes(
  perceptionCode: string | null | undefined,
  objectiveCode: string | null | undefined,
  actionCode: string | null | undefined,
): HfaErcCategory | null {
  if (!perceptionCode) return null
  const severity = ARMS_SEVERITY_ROW[perceptionCode] ?? 'C'
  const barrier = barrierLevel(perceptionCode, objectiveCode, actionCode)
  return ARMS_ERC[`${severity}${barrier}`] ?? null
}

export function describeHfaErcCategory(category: HfaErcCategory | null): {
  code: string | null
  label: string | null
  severity: string | null
} {
  switch (category) {
    case 5:
      return { code: 'ERC 5', label: 'Imediato', severity: 'critical' }
    case 4:
      return { code: 'ERC 4', label: 'Urgente', severity: 'high' }
    case 3:
      return { code: 'ERC 3', label: 'Ação requerida', severity: 'moderate' }
    case 2:
      return { code: 'ERC 2', label: 'Monitorar', severity: 'low' }
    case 1:
      return { code: 'ERC 1', label: 'Aceitável', severity: 'minimal' }
    default:
      return { code: null, label: null, severity: null }
  }
}
