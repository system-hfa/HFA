import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

function randomSlug(base: string): string {
  const clean = base
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  const suffix = Math.random().toString(36).slice(2, 10)
  return `${clean || 'org'}-${suffix}`
}

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization')
    if (!auth?.startsWith('Bearer ')) return jsonError('Não autorizado', 401)
    const token = auth.slice(7)

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    const service = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if (!url || !anon || !service) return jsonError('Supabase não configurado', 503)

    const client = createClient(url, anon)
    const admin = createClient(url, service)

    const {
      data: { user },
      error: userErr,
    } = await client.auth.getUser(token)
    if (userErr || !user) return jsonError('Não autorizado', 401)

    const currentTenant = user.user_metadata?.tenant_id as string | undefined
    if (currentTenant) return NextResponse.json({ ok: true, tenant_id: currentTenant, created: false })

    const email = (user.email || `${user.id}@oauth.placeholder`).trim()
    const local = email.split('@')[0] || 'user'

    const existing = await admin
      .from('users')
      .select('tenant_id, role')
      .eq('email', email)
      .maybeSingle()

    let tenantId: string
    let role = 'admin'

    if (!existing.error && existing.data?.tenant_id) {
      tenantId = String(existing.data.tenant_id)
      role = String(existing.data.role ?? 'admin')
    } else {
      const tenantIns = await admin
        .from('tenants')
        .insert({
          name: local.slice(0, 255),
          slug: randomSlug(local),
          plan: 'trial',
          credits_balance: 3,
        })
        .select('id')
        .single()
      if (tenantIns.error || !tenantIns.data?.id) {
        return jsonError(`Falha ao criar tenant: ${tenantIns.error?.message || 'unknown'}`, 500)
      }
      tenantId = String(tenantIns.data.id)

      const userIns = await admin.from('users').insert({
        id: user.id,
        tenant_id: tenantId,
        email,
        full_name: local.slice(0, 255),
        role,
        is_active: true,
      })
      if (userIns.error) {
        return jsonError(`Falha ao criar user público: ${userIns.error.message}`, 500)
      }
    }

    const metaRes = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...(user.user_metadata ?? {}),
        tenant_id: tenantId,
        role,
      },
    })
    if (metaRes.error) {
      return jsonError(`Falha ao atualizar metadata do usuário: ${metaRes.error.message}`, 500)
    }

    return NextResponse.json({ ok: true, tenant_id: tenantId, created: !existing.data })
  } catch (e) {
    return jsonError(String(e), 500)
  }
}

