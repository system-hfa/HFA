import { NextRequest, NextResponse } from 'next/server'

function decodeBase64Json(input: string): unknown {
  if (!input.startsWith('base64-')) return null
  try {
    const raw = atob(input.slice('base64-'.length))
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function extractAccessToken(rawCookieValue: string): string | null {
  const tryValues = [rawCookieValue]
  try {
    tryValues.push(decodeURIComponent(rawCookieValue))
  } catch {
    // ignore
  }

  for (const candidate of tryValues) {
    if (!candidate) continue

    const decodedBase64 = decodeBase64Json(candidate)
    if (decodedBase64) {
      if (typeof decodedBase64 === 'object' && decodedBase64 && 'access_token' in decodedBase64) {
        const token = (decodedBase64 as Record<string, unknown>).access_token
        if (typeof token === 'string' && token.split('.').length === 3) return token
      }
      if (Array.isArray(decodedBase64)) {
        const first = decodedBase64[0]
        if (typeof first === 'string' && first.split('.').length === 3) return first
      }
    }

    try {
      const parsed = JSON.parse(candidate) as unknown
      if (Array.isArray(parsed)) {
        const first = parsed[0]
        if (typeof first === 'string' && first.split('.').length === 3) return first
        if (typeof first === 'object' && first && 'access_token' in first) {
          const t = (first as Record<string, unknown>).access_token
          if (typeof t === 'string' && t.split('.').length === 3) return t
        }
      } else if (typeof parsed === 'object' && parsed && 'access_token' in parsed) {
        const token = (parsed as Record<string, unknown>).access_token
        if (typeof token === 'string' && token.split('.').length === 3) return token
      } else if (typeof parsed === 'string' && parsed.split('.').length === 3) {
        return parsed
      }
    } catch {
      // Not JSON, continue.
    }

    if (candidate.split('.').length === 3) return candidate
  }

  return null
}

function getTokenFromCookies(req: NextRequest): string | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\./)?.[1] || ''
  const cookieName = `sb-${projectRef}-auth-token`

  const direct = req.cookies.get(cookieName)?.value
  if (direct) {
    const token = extractAccessToken(direct)
    if (token) return token
  }

  const chunks = req.cookies
    .getAll()
    .filter((c) => c.name === cookieName || c.name.startsWith(`${cookieName}.`))
    .sort((a, b) => {
      const ai = Number(a.name.split('.').pop() || 0)
      const bi = Number(b.name.split('.').pop() || 0)
      return ai - bi
    })

  if (!chunks.length) return null
  const joined = chunks.map((c) => c.value).join('')
  return extractAccessToken(joined)
}

async function querySupabaseRows(path: string): Promise<Record<string, unknown>[] | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRole) return null

  const url = `${supabaseUrl}/rest/v1/${path}`
  const res = await fetch(url, {
    headers: {
      apikey: serviceRole,
      Authorization: `Bearer ${serviceRole}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) return null
  const rows = (await res.json()) as unknown
  return Array.isArray(rows) ? (rows as Record<string, unknown>[]) : null
}

async function resolveRoleAndPlanFromSupabase(args: {
  tenantId?: string
  userId?: string
  email?: string
}): Promise<{ role: string | null; plan: string | null }> {
  let tenantId = args.tenantId || ''
  let role: string | null = null

  if (args.userId) {
    const byId = await querySupabaseRows(`users?id=eq.${encodeURIComponent(args.userId)}&select=tenant_id,role&limit=1`)
    if (byId?.[0]) {
      tenantId = String(byId[0].tenant_id ?? tenantId)
      role = String(byId[0].role ?? '')
    }
  }

  if (!role && args.email) {
    const byEmail = await querySupabaseRows(`users?email=eq.${encodeURIComponent(args.email)}&select=tenant_id,role&limit=1`)
    if (byEmail?.[0]) {
      tenantId = String(byEmail[0].tenant_id ?? tenantId)
      role = String(byEmail[0].role ?? '')
    }
  }

  if (!tenantId) return { role: role ? role.toLowerCase() : null, plan: null }

  const tenantRows = await querySupabaseRows(`tenants?id=eq.${encodeURIComponent(tenantId)}&select=plan&limit=1`)
  const plan = tenantRows?.[0]?.plan ? String(tenantRows[0].plan) : null

  return {
    role: role ? role.toLowerCase() : null,
    plan: plan ? plan.toLowerCase() : null,
  }
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const token = getTokenFromCookies(req)
  if (!token) return NextResponse.next()

  const payload = decodeJwtPayload(token)
  const meta = (payload?.user_metadata as Record<string, unknown>) ?? {}
  let role = String(meta.role ?? '').toLowerCase()
  const userId = typeof payload?.sub === 'string' ? payload.sub : ''
  const email = typeof payload?.email === 'string' ? payload.email : ''
  const tenantId = String(meta.tenant_id ?? '')

  if (role !== 'admin') {
    const db = await resolveRoleAndPlanFromSupabase({ tenantId, userId, email })
    role = db.role ?? role
  }

  if (role !== 'admin') return NextResponse.next()

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
