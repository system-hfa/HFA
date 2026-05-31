import type {
  CanonicalActionLeafCode,
  CanonicalObjectiveLeafCode,
  CanonicalPerceptionLeafCode,
  CanonicalSeraAxis,
  CanonicalSeraCodeAxis,
  CanonicalSeraLeafCode,
  CanonicalSeraNonExistentLeafCode,
  PoaAxis,
} from './types'

export const SERA_CANONICAL_CODE_MODEL_VERSION = 'A4R190-A_v0.2.0'

export const SERA_CANONICAL_PERCEPTION_LEAF_CODES: readonly CanonicalPerceptionLeafCode[] = [
  'P-A',
  'P-B',
  'P-C',
  'P-D',
  'P-E',
  'P-F',
  'P-G',
  'P-H',
]

export const SERA_CANONICAL_OBJECTIVE_LEAF_CODES: readonly CanonicalObjectiveLeafCode[] = [
  'O-A',
  'O-B',
  'O-C',
  'O-D',
]

export const SERA_CANONICAL_ACTION_LEAF_CODES: readonly CanonicalActionLeafCode[] = [
  'A-A',
  'A-B',
  'A-C',
  'A-D',
  'A-E',
  'A-F',
  'A-G',
  'A-H',
  'A-I',
  'A-J',
]

export const SERA_CANONICAL_NON_EXISTENT_CODES: readonly CanonicalSeraNonExistentLeafCode[] = ['O-E']

export const SERA_CANONICAL_FORBIDDEN_CODES: readonly string[] = [...SERA_CANONICAL_NON_EXISTENT_CODES]

export const SERA_CANONICAL_LEAF_CODE_ALLOWLIST: Readonly<Record<CanonicalSeraCodeAxis, readonly CanonicalSeraLeafCode[]>> = {
  P: SERA_CANONICAL_PERCEPTION_LEAF_CODES,
  O: SERA_CANONICAL_OBJECTIVE_LEAF_CODES,
  A: SERA_CANONICAL_ACTION_LEAF_CODES,
}

function toCanonicalAxis(axis: PoaAxis | CanonicalSeraAxis): CanonicalSeraCodeAxis {
  if (axis === 'perception') return 'P'
  if (axis === 'objective') return 'O'
  if (axis === 'action') return 'A'
  return axis
}

export function isCanonicalSeraLeafCode(axis: PoaAxis | CanonicalSeraAxis, code: string): code is CanonicalSeraLeafCode {
  const canonicalAxis = toCanonicalAxis(axis)
  const normalizedCode = code.trim().toUpperCase()
  return SERA_CANONICAL_LEAF_CODE_ALLOWLIST[canonicalAxis].includes(normalizedCode as CanonicalSeraLeafCode)
}

export function assertCanonicalSeraLeafCode(axis: PoaAxis | CanonicalSeraAxis, code: string): CanonicalSeraLeafCode {
  const canonicalAxis = toCanonicalAxis(axis)
  const normalizedCode = code.trim().toUpperCase()

  if (SERA_CANONICAL_NON_EXISTENT_CODES.includes(normalizedCode as CanonicalSeraNonExistentLeafCode)) {
    throw new Error(
      `Canonical SERA code ${normalizedCode} is NON_EXISTENT_IN_SERA_PT_V1 and forbidden for axis ${canonicalAxis}.`
    )
  }

  if (!isCanonicalSeraLeafCode(canonicalAxis, normalizedCode)) {
    throw new Error(
      `Canonical SERA code allowlist violation for axis ${canonicalAxis}: ${normalizedCode} is not an active canonical leaf code.`
    )
  }

  return normalizedCode
}
