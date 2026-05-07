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

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Erro desconhecido' }))
    throw new Error(error.detail || error.message || 'Erro na requisição')
  }
  return res.json()
}
