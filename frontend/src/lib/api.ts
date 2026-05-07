const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function apiCall(
  endpoint: string,
  options: RequestInit = {},
  token?: string
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
  } catch {
    throw new Error(
      'Não foi possível conectar ao servidor da API. Confirme que o serviço Render está ativo e que NEXT_PUBLIC_API_URL na Vercel aponta para a URL correta (ex.: https://seu-serviço.onrender.com, sem barra no final).'
    )
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
    const detail =
      typeof error.detail === 'string'
        ? error.detail
        : Array.isArray(error.detail)
          ? error.detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(', ')
          : error.message
    throw new Error(detail || `Erro na requisição (${res.status})`)
  }
  return res.json()
}
