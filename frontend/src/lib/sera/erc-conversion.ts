/**
 * ERC scale conversion — RISK v0.8-A
 *
 * Two incompatible ERC scales coexist in the system (F-001):
 *
 *   legacy_motor_erc_level  — produced by the SERA motor and stored in
 *                              analyses.erc_level.  1 = critical, 5 = minimal.
 *
 *   hfa_erc_category        — visual/operational category displayed to users.
 *                              5 = critical, 1 = acceptable.  Canonical per
 *                              Opção A (RISK_METHODOLOGY_GOVERNANCE_v0.1 §7.6).
 *
 * Neither scale is the ARMS Risk Index 1–2500.
 *
 * This module provides a pure, side-effect-free conversion between the two.
 * It does NOT import the motor, React, Supabase, or any browser API.
 * It does NOT modify analyses.erc_level or any stored data.
 *
 * Reference: docs/RISK_ERC_CANONICAL_DECISION_v0.7.md
 *            docs/RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md
 */

/** ERC level as produced by the SERA motor (1 = critical, 5 = minimal). */
export type LegacyMotorErcLevel = 1 | 2 | 3 | 4 | 5

/** HFA ERC category shown in the UI (5 = critical, 1 = acceptable). */
export type HfaErcCategory = 1 | 2 | 3 | 4 | 5

const MOTOR_TO_HFA: Record<LegacyMotorErcLevel, HfaErcCategory> = {
  1: 5, // motor critical  → UI critical
  2: 4, // motor high      → UI high
  3: 3, // motor moderate  → UI moderate (symmetric)
  4: 2, // motor low       → UI low
  5: 1, // motor minimal   → UI acceptable
}

export function isLegacyMotorErcLevel(value: unknown): value is LegacyMotorErcLevel {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5
}

export function isHfaErcCategory(value: unknown): value is HfaErcCategory {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5
}

/**
 * Converts a motor ERC level (legacy, 1=critical) to an HFA ERC category
 * (canonical Opção A, 5=critical).
 *
 * The mapping is its own inverse: applying the function twice returns the
 * original value.
 */
export function motorErcToHfaCategory(level: LegacyMotorErcLevel): HfaErcCategory {
  return MOTOR_TO_HFA[level]
}

/**
 * Converts an HFA ERC category (5=critical) back to the motor ERC level
 * (1=critical).  Identical mapping — the function is auto-inverse.
 */
export function hfaCategoryToMotorErc(category: HfaErcCategory): LegacyMotorErcLevel {
  return MOTOR_TO_HFA[category] as LegacyMotorErcLevel
}

/**
 * Safe coercion for untrusted inputs (API responses, DB reads).
 * Returns null for any value outside the valid range 1–5 integer, including
 * strings, floats, null, undefined, and out-of-range numbers.
 */
export function coerceMotorErcToHfaCategory(value: unknown): HfaErcCategory | null {
  if (!isLegacyMotorErcLevel(value)) return null
  return motorErcToHfaCategory(value)
}
