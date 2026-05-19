import { NextResponse } from 'next/server'

/**
 * Caracteres permitidos num request_id externo (x-request-id header).
 * Rejeita tudo que não seja alfanumérico, hífen, underscore, ponto ou dois-pontos.
 */
const SAFE_ID_RE = /[^a-zA-Z0-9_\-.:]/g
const MAX_ID_LEN = 80

/**
 * Retorna o request_id desta requisição.
 * - Se o cliente enviou `x-request-id`, usa o valor sanitizado (caracteres seguros, max 80 chars).
 * - Caso contrário, gera um novo UUID via `crypto.randomUUID()` ou fallback timestamp+random.
 * Nunca retorna string vazia.
 */
export function getOrCreateRequestId(req: Request): string {
  const incoming = req.headers.get('x-request-id')
  if (incoming) {
    const sanitized = incoming.replace(SAFE_ID_RE, '').slice(0, MAX_ID_LEN)
    if (sanitized.length > 0) return sanitized
  }
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback seguro caso crypto.randomUUID não esteja disponível
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Constrói uma resposta de erro JSON com:
 * - corpo: `{ detail, request_id }`
 * - header `x-request-id`
 */
export function buildErrorResponse(detail: string, status: number, requestId: string): NextResponse {
  return NextResponse.json(
    { detail, request_id: requestId },
    { status, headers: { 'x-request-id': requestId } }
  )
}
