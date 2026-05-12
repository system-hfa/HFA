import { NextResponse } from 'next/server'
import { requireBearerUser } from '@/lib/server/api-auth'
import { getSupabaseAdmin } from '@/lib/server/supabase-admin'
import { applyUserAiSettingsToEnv } from '@/lib/server/apply-user-ai-settings-to-env'
import { ask, safeParse, getModelName, assertLlmEnvConfigured } from '@/lib/sera/llm'

export const maxDuration = 60

const SYSTEM_PROMPT = `Você é um especialista em segurança operacional e fatores humanos, \
com profundo conhecimento da metodologia SERA (Systematic Error and Risk Analysis) de K.C. Hendy. \
Você analisa padrões organizacionais de falha humana e produz diagnósticos acionáveis para gestores de \
segurança. Seja direto, específico e prático. Nunca use linguagem vaga. Sempre conecte os dados a causas \
organizacionais concretas e recomendações específicas.`

function jsonError(message: string, status: number) {
  return NextResponse.json({ detail: message }, { status })
}

function logError(error: unknown, stage: string, userId?: string) {
  const e = error instanceof Error ? error : new Error(String(error))
  console.error('[org/ai-insight]', { stage, userId, message: e.message, stack: e.stack })
}

export async function POST(req: Request) {
  let userId: string | undefined

  try {
    const user = await requireBearerUser(req)
    userId = user.userId
    const admin = getSupabaseAdmin()

    await applyUserAiSettingsToEnv(admin, user.userId)
    assertLlmEnvConfigured()
    console.log('[ai-insight] usando provider:', process.env.AI_PROVIDER ?? 'default')

    let body: { intelligence_data?: unknown }
    try {
      body = await req.json()
    } catch {
      return jsonError('Body JSON inválido', 400)
    }

    if (!body.intelligence_data) {
      return jsonError('Campo intelligence_data é obrigatório', 400)
    }

    const userMsg = `Analise os seguintes dados de segurança operacional da organização \
e produza um diagnóstico organizacional completo em português.

DADOS:
${JSON.stringify(body.intelligence_data, null, 2)}

Produza um JSON com exatamente esta estrutura:
{
  "diagnostico_principal": "2-3 frases descrevendo o padrão dominante de falha humana desta organização",
  "causa_raiz_provavel": "1-2 frases sobre a causa organizacional mais provável que explica o padrão observado",
  "nivel_risco": "crítico|elevado|moderado|baixo",
  "recomendacoes_prioritarias": [
    {
      "prioridade": 1,
      "acao": "Ação específica e concreta",
      "justificativa": "Por que esta ação é prioritária",
      "prazo_sugerido": "imediato|30 dias|90 dias|6 meses",
      "responsavel_sugerido": "Quem deve executar"
    }
  ],
  "padrao_combinacao": "Explicação da combinação de falhas mais frequente e o que ela revela sobre a organização",
  "pontos_positivos": "O que os dados indicam de positivo (se houver — ex: taxa de resolução de ações)",
  "proximo_passo_imediato": "Uma única ação que o gestor deve fazer ainda hoje"
}

Retorne APENAS o JSON, sem texto adicional.`

    const raw = await ask(SYSTEM_PROMPT, userMsg)
    const insight = safeParse(raw, 'ai-insight')

    return NextResponse.json({
      insight,
      generated_at: new Date().toISOString(),
      model_used: getModelName(),
    })
  } catch (e) {
    if (e instanceof Response) return e
    logError(e, 'top-level', userId)
    return jsonError(String(e), 500)
  }
}
