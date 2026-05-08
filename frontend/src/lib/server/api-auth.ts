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
  let tenantId = user.user_metadata?.tenant_id as string | undefined
  let role = String(user.user_metadata?.role ?? 'admin')

  // Fallback para contas OAuth com metadata ainda não bootstrapado.
  if (!tenantId) {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (serviceKey) {
      const admin = createClient(url, serviceKey)
      let foundTenant: string | null = null

      // Primeiro por id no espelho público; depois por email.
      const byId = await admin.from('users').select('tenant_id, role').eq('id', user.id).maybeSingle()
      if (!byId.error && byId.data?.tenant_id) {
        foundTenant = String(byId.data.tenant_id)
        if (byId.data.role) role = String(byId.data.role)
      } else if (user.email) {
        const byEmail = await admin
          .from('users')
          .select('tenant_id, role')
          .eq('email', user.email)
          .maybeSingle()
        if (!byEmail.error && byEmail.data?.tenant_id) {
          foundTenant = String(byEmail.data.tenant_id)
          if (byEmail.data.role) role = String(byEmail.data.role)
        }
      }

      if (foundTenant) {
        tenantId = foundTenant
        // Mantém JWT consistente nas próximas requisições.
        await admin.auth.admin.updateUserById(user.id, {
          user_metadata: {
            ...(user.user_metadata ?? {}),
            tenant_id: tenantId,
            role,
          },
        })
      }
    }
  }

  if (!tenantId) {
    throw new Response(JSON.stringify({ detail: 'tenant_id ausente no perfil' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return { userId: user.id, email: user.email, tenantId, role, accessToken: token }
}
