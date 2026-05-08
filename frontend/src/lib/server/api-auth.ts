import { createClient } from '@supabase/supabase-js'

export type ApiUserContext = {
  userId: string
  email: string | undefined
  tenantId: string
  role: string
  accessToken: string
}

export async function requireBearerUser(req: Request): Promise<ApiUserContext> {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) {
    throw new Response(JSON.stringify({ detail: 'Não autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const token = auth.slice(7)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Response(JSON.stringify({ detail: 'Supabase não configurado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const supabase = createClient(url, anon)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)
  if (error || !user) {
    throw new Response(JSON.stringify({ detail: 'Não autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const tenantId = user.user_metadata?.tenant_id as string | undefined
  if (!tenantId) {
    throw new Response(JSON.stringify({ detail: 'tenant_id ausente no perfil' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const role = String(user.user_metadata?.role ?? 'admin')
  return { userId: user.id, email: user.email, tenantId, role, accessToken: token }
}
