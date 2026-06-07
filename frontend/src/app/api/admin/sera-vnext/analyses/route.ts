import { handleCreateSeraVNextAnalysisRequest, handleListSeraVNextAnalysesRequest } from '@/lib/sera-vnext-product/api-handlers'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  return handleListSeraVNextAnalysesRequest(req)
}

export async function POST(req: Request) {
  return handleCreateSeraVNextAnalysisRequest(req)
}
