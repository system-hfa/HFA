export class SeraVNextProductError extends Error {
  code: string
  status: number

  constructor(code: string, message: string, status = 400) {
    super(message)
    this.name = 'SeraVNextProductError'
    this.code = code
    this.status = status
  }
}

export function conflict(message: string): SeraVNextProductError {
  return new SeraVNextProductError('SERA_VNEXT_PRODUCT_BETA_IDEMPOTENCY_CONFLICT', message, 409)
}

export function notFound(message = 'Análise não encontrada.'): SeraVNextProductError {
  return new SeraVNextProductError('SERA_VNEXT_PRODUCT_BETA_NOT_FOUND', message, 404)
}

export function forbiddenTransition(message: string): SeraVNextProductError {
  return new SeraVNextProductError('SERA_VNEXT_PRODUCT_BETA_INVALID_TRANSITION', message, 409)
}
