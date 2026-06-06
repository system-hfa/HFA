import { NextResponse } from 'next/server'
import { requireAdmin, jsonError } from '@/lib/server/admin-auth'
import { isSeraVNextReadOnlyEnabled } from '@/lib/sera-vnext-runtime/feature-flags'
import { getSeraVNextRuntimeStatus } from '@/lib/sera-vnext-runtime/runtime-service'

export const dynamic = 'force-dynamic'

const noStoreHeaders = {
  'Cache-Control': 'no-store',
}

export async function GET(req: Request) {
  if (!isSeraVNextReadOnlyEnabled()) {
    return NextResponse.json({ detail: 'Not found' }, { status: 404, headers: noStoreHeaders })
  }

  try {
    await requireAdmin(req)
    const status = getSeraVNextRuntimeStatus()
    const httpStatus = status.status === 'ERROR' ? 503 : 200
    return NextResponse.json(status, { status: httpStatus, headers: noStoreHeaders })
  } catch (error) {
    if (error instanceof Response) return error
    return jsonError('Erro ao consultar status SERA vNext', 500)
  }
}
