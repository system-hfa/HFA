'use client'

import { AlertTriangle, CheckCircle, Eye, Shield, Zap, Users, BookOpen, MessageSquare, Brain } from 'lucide-react'

export type GuardrailDisplayItem = {
  id: string
  name: string
  description: string
  violated: boolean
  evidence: string[]
  impactOnReview: string
  category: 'methodology' | 'evidence' | 'boundary' | 'safety'
}

const GUARDRAIL_HUMAN_NAMES: Record<string, { name: string; description: string; category: GuardrailDisplayItem['category'] }> = {
  consequenceUsedAsCause: {
    name: 'Consequência usada como causa',
    description: 'O motor detectou que evidência pós-evento (consequência) foi usada como se fosse evidência pré-ponto de fuga. Isso pode distorcer a análise da cadeia causal.',
    category: 'methodology',
  },
  postEscapeHuntingDetected: {
    name: 'Busca de evidência pós-fuga',
    description: 'Evidência posterior ao ponto de fuga foi ativamente usada na análise. O ponto de fuga deve ser estabelecido com evidência disponível até aquele momento.',
    category: 'evidence',
  },
  postEscapeEvidenceUsed: {
    name: 'Evidência pós-fuga presente',
    description: 'Evidência de momento posterior ao ponto de fuga está presente na análise. Verifique se ela é realmente necessária ou se pode ser excluída.',
    category: 'evidence',
  },
  oeUsed: {
    name: 'Código O-E detectado',
    description: 'O código O-E (questão inexistente) apareceu na evidência. O motor não cria perguntas — isso pode indicar texto com pergunta reconstruída.',
    category: 'methodology',
  },
  inventedQuestionDetected: {
    name: 'Pergunta reconstruída',
    description: 'Uma pergunta genérica ou reconstruída foi detectada na evidência. O motor trabalha com perguntas canônicas fixas — perguntas inventadas comprometem a rastreabilidade.',
    category: 'methodology',
  },
  actorMigrationDetected: {
    name: 'Migração de ator',
    description: 'O ator direto do ponto de fuga pode ter mudado durante a análise. O ponto de fuga deve ter um ator consistente em toda a árvore canônica.',
    category: 'boundary',
  },
  preconditionUsedAsEscapePoint: {
    name: 'Precondição usada como ponto de fuga',
    description: 'Uma precondição (fator organizacional, de treinamento, etc.) foi usada como ponto de fuga. Precondições são contexto, não o ponto de escape em si.',
    category: 'boundary',
  },
  codeFirstPathDetected: {
    name: 'Caminho code-first',
    description: 'Indício de que um código de saída foi escolhido antes da evidência. A árvore canônica exige que a evidência determine o caminho, não o contrário.',
    category: 'methodology',
  },
  awarenessMissingForViolation: {
    name: 'Consciência faltante para violação',
    description: 'Um código de violação (O-B/O-C) foi proposto, mas a evidência de regra conhecida + consciência explícita + desvio consciente não foi plenamente estabelecida. O revisor precisa verificar se há awareness suficiente.',
    category: 'safety',
  },
}

const GUARDRAIL_IMPACT: Record<string, string> = {
  consequenceUsedAsCause: 'Revise se a evidência usada é realmente anterior ao ponto de fuga. Evidência de consequência não deve determinar o código do eixo.',
  postEscapeHuntingDetected: 'Verifique se há evidência pré-ponto de fuga suficiente. Evidência pós-fuga não deve ser usada para justificar o código.',
  postEscapeEvidenceUsed: 'Avalie se a mesma conclusão se sustentaria sem a evidência pós-fuga. Considere excluir ou marcar como pós-evento.',
  oeUsed: 'Confirme que nenhuma pergunta foi inventada. O motor usa perguntas canônicas fixas — texto com "O-E" pode indicar reconstrução.',
  inventedQuestionDetected: 'As perguntas da árvore canônica são fixas e imutáveis. Perguntas reconstruídas violam o contrato metodológico.',
  actorMigrationDetected: 'Identifique quem era o ator no momento do ponto de fuga. O ator não pode mudar entre os eixos.',
  preconditionUsedAsEscapePoint: 'Diferencie o ponto de fuga (onde a trajetória sai do envelope seguro) das precondições (contexto que existia antes).',
  codeFirstPathDetected: 'Refaça o caminho a partir da evidência, não do código desejado. O motor deve seguir evidência → pergunta → resposta → código.',
  awarenessMissingForViolation: 'Para confirmar O-B ou O-C, você precisa estabelecer: (1) regra conhecida, (2) consciência do desvio, (3) decisão consciente de desviar. Se faltar qualquer um, reclassifique.',
}

export function mapGuardrailsToDisplay(guardrails: Record<string, boolean>, guardrailEvidence: Record<string, string[]>): GuardrailDisplayItem[] {
  return Object.entries(guardrails)
    .filter(([, violated]) => violated)
    .map(([key]) => {
      const info = GUARDRAIL_HUMAN_NAMES[key] ?? { name: key, description: 'Salvaguarda metodológica ativada.', category: 'methodology' as const }
      return {
        id: key,
        name: info.name,
        description: info.description,
        violated: true,
        evidence: guardrailEvidence[key] ?? [],
        impactOnReview: GUARDRAIL_IMPACT[key] ?? 'Verifique a documentação metodológica para entender o impacto desta salvaguarda.',
        category: info.category,
      }
    })
}

const categoryIcons: Record<string, React.ReactNode> = {
  methodology: <BookOpen className="size-4" />,
  evidence: <Eye className="size-4" />,
  boundary: <Shield className="size-4" />,
  safety: <AlertTriangle className="size-4" />,
}

const categoryColors: Record<string, string> = {
  methodology: 'border-blue-800 bg-blue-950/20 text-blue-200',
  evidence: 'border-purple-800 bg-purple-950/20 text-purple-200',
  boundary: 'border-amber-800 bg-amber-950/20 text-amber-200',
  safety: 'border-red-800 bg-red-950/20 text-red-200',
}

export default function GuardrailPanel({ guardrails, guardrailEvidence }: { guardrails: Record<string, boolean>; guardrailEvidence: Record<string, string[]> }) {
  const items = mapGuardrailsToDisplay(guardrails, guardrailEvidence)
  const violatedCount = items.length

  if (violatedCount === 0) {
    return (
      <div className="rounded-xl border border-green-800 bg-green-950/20 p-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="size-4 text-green-400" />
          <span className="text-sm font-semibold text-green-200">Nenhuma salvaguarda violada</span>
        </div>
        <p className="mt-1 text-sm text-green-400/70">
          Todas as salvaguardas metodológicas estão preservadas nesta análise.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-amber-400" />
        <span className="text-sm font-semibold text-amber-200">
          {violatedCount} salvaguarda{violatedCount !== 1 ? 's' : ''} metodológica{violatedCount !== 1 ? 's' : ''} ativada{violatedCount !== 1 ? 's' : ''}
        </span>
      </div>

      {items.map((item) => (
        <div key={item.id} className={`rounded-xl border p-4 ${categoryColors[item.category]}`}>
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
              {categoryIcons[item.category]}
              {item.category === 'methodology' && 'Metodologia'}
              {item.category === 'evidence' && 'Evidência'}
              {item.category === 'boundary' && 'Fronteira'}
              {item.category === 'safety' && 'Segurança'}
            </span>
          </div>

          {/* Name and description */}
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="mt-1 text-sm opacity-80">{item.description}</p>

          {/* Evidence */}
          {item.evidence.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-1">Evidência relacionada</p>
              <ul className="space-y-1">
                {item.evidence.slice(0, 5).map((ev, i) => (
                  <li key={i} className="text-sm bg-black/20 rounded-lg px-3 py-1.5 font-mono break-words">
                    {ev}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Impact on review */}
          <div className="mt-3 rounded-lg bg-black/20 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-1">Impacto na revisão</p>
            <p className="text-sm">{item.impactOnReview}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
