export type TrialStatus = 'available' | 'near_limit' | 'limit_reached'

export type TrialUsage = {
  limit: number
  used: number
  remaining: number
  status: TrialStatus
  message: string
}

export const DEFAULT_TRIAL_LIMIT = 10

function normalizePositiveInteger(value: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback
  const normalized = Math.floor(value)
  return normalized > 0 ? normalized : fallback
}

export function buildTrialUsage(used: number, limit = DEFAULT_TRIAL_LIMIT): TrialUsage {
  const normalizedLimit = normalizePositiveInteger(limit, DEFAULT_TRIAL_LIMIT)
  const normalizedUsed = Math.max(0, Number.isFinite(used) ? Math.floor(used) : 0)
  const remaining = Math.max(normalizedLimit - normalizedUsed, 0)

  let status: TrialStatus = 'available'
  let message = `Voce ainda tem ${remaining} analises gratuitas para formar o primeiro perfil.`

  if (normalizedUsed >= normalizedLimit) {
    status = 'limit_reached'
    message = `Voce concluiu as ${normalizedLimit} analises iniciais. Fale conosco para continuar.`
  } else if (normalizedUsed >= normalizedLimit - 2) {
    status = 'near_limit'
    message = `Voce esta perto do limite inicial de ${normalizedLimit} analises gratuitas.`
  }

  return {
    limit: normalizedLimit,
    used: normalizedUsed,
    remaining,
    status,
    message,
  }
}
