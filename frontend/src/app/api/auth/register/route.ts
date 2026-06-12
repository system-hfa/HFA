import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
    const { email, password, company_name, slug } = (await req.json()) as {
      email?: string
      password?: string
      company_name?: string
      slug?: string
    }

    if (!email || !password || !company_name) {
      return NextResponse.json(
        { detail: 'Email, senha e nome da empresa são obrigatórios' },
        { status: 400 }
      )
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    const service = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

    if (!url || !anon || !service) {
      return NextResponse.json(
        { detail: 'Serviço temporariamente indisponível' },
        { status: 503 }
      )
    }

    const client = createClient(url, anon)
    const admin = createClient(url, service)

    const { data: signUpData, error: signUpErr } = await client.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${req.headers.get('origin') || ''}/login` },
    })

    if (signUpErr) {
      return NextResponse.json(
        { detail: signUpErr.message || 'Erro ao criar conta' },
        { status: 400 }
      )
    }

    if (!signUpData.user?.id) {
      return NextResponse.json(
        { detail: 'Falha ao criar usuário' },
        { status: 500 }
      )
    }

    const userId = signUpData.user.id
    const finalSlug = slug || randomSlug(company_name)

    const { data: tenantData, error: tenantErr } = await admin
      .from('tenants')
      .insert({
        name: company_name.slice(0, 255),
        slug: finalSlug,
        plan: 'trial',
        credits_balance: 3,
      })
      .select('id')
      .single()

    if (tenantErr || !tenantData?.id) {
      console.error('[auth/register] tenant creation failed', tenantErr)
      return NextResponse.json(
        { detail: 'Conta criada mas falha ao configurar empresa. Entre em contato com suporte.' },
        { status: 500 }
      )
    }

    const tenantId = String(tenantData.id)

    const { error: userInsErr } = await admin.from('users').insert({
      id: userId,
      tenant_id: tenantId,
      email,
      full_name: company_name.slice(0, 255),
      role: 'admin',
      is_active: true,
    })

    if (userInsErr) {
      console.error('[auth/register] user insert failed', userInsErr)
    }

    const { error: metaErr } = await admin.auth.admin.updateUserById(userId, {
      user_metadata: { tenant_id: tenantId, role: 'admin' },
    })

    if (metaErr) {
      console.error('[auth/register] metadata update failed', metaErr)
    }

    return NextResponse.json({ ok: true, tenant_id: tenantId })
  } catch (e) {
    console.error('[auth/register] unexpected error', e)
    return NextResponse.json(
      { detail: 'Erro interno ao criar conta' },
      { status: 500 }
    )
  }
}
