import { createHash } from 'node:crypto'

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, entry]) => [key, stable(entry)]),
  )
}

export function stableJson(value: unknown): string {
  return JSON.stringify(stable(value))
}

export function sha256Hex(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

export function hashJson(value: unknown): string {
  return sha256Hex(stableJson(value))
}
