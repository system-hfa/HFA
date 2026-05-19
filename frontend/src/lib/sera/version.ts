/**
 * Versão do motor SERA.
 *
 * Formato: sera-{versão-semântica}+{commit-hash-curto-do-motor}
 *   - Versão semântica: segue as fases de correção documentadas em docs/SERA_*.md
 *   - Hash curto: commit do último release do motor (all-steps.ts / pipeline.ts / rules/)
 *
 * Como atualizar:
 *   1. Após cada alteração no motor SERA (all-steps.ts, pipeline.ts, rules/),
 *      atualizar SERA_MOTOR_VERSION com a nova fase e o hash do commit correspondente.
 *   2. Em CI/CD, sobrescrever via variável de ambiente NEXT_PUBLIC_SERA_MOTOR_VERSION
 *      para injetar o hash automaticamente no build.
 *
 * Histórico:
 *   sera-v0.1.3-c+5c1a502 → Gate causal v0.1.3-C + fix P-A/P-G supervision (2026-05-19)
 */
export const SERA_MOTOR_VERSION: string =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SERA_MOTOR_VERSION) ||
  'sera-v0.1.3-c+5c1a502'
