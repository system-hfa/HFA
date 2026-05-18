/**
 * ERC presentation helpers — RISK v0.8-C
 *
 * Converts HFA ERC Category (1=acceptable, 5=critical) to the ARMS barrier
 * effectiveness column used in the 4×4 ARMS-ERC matrix (1–4).
 *
 * The ARMS matrix barrier column reflects how recoverable (detectable) the
 * failure mode was. HFA ERC 5 (critical = hard to detect) maps to barrier
 * column 1 (no effective barriers). HFA ERC 1 (acceptable = easy to detect)
 * maps to barrier column 4 (strong barriers). HFA ERC 2 is also capped at 4
 * because the ARMS matrix has no column 5.
 *
 * Reference: docs/RISK_ERC_CONSUMPTION_AUDIT_v0.8-C.md
 */

import { type HfaErcCategory } from '@/lib/sera/erc-conversion'

const HFA_TO_ARMS_BARRIER: Record<HfaErcCategory, 1 | 2 | 3 | 4> = {
  5: 1,
  4: 2,
  3: 3,
  2: 4,
  1: 4,
}

/**
 * Maps an HFA ERC Category to the ARMS barrier effectiveness column (1–4).
 *
 * HFA 5 (critical) → barrier 1 (no effective barriers)
 * HFA 1 (acceptable) → barrier 4 (strong barriers)
 */
export function hfaErcToArmsBarrier(category: HfaErcCategory): 1 | 2 | 3 | 4 {
  return HFA_TO_ARMS_BARRIER[category]
}
