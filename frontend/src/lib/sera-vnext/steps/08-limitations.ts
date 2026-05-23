import type { Limitation, SeraVNextInput } from '../types'

export function runStep08Limitations(_input: SeraVNextInput): Limitation[] {
  // TODO(A4+R-33): derive limitations from evidence sufficiency and missing data.
  return [
    {
      id: 'LIM-SKELETON-001',
      statement: 'SERA Engine vNext skeleton: methodological logic not implemented yet.',
      impact: 'high',
    },
  ]
}
