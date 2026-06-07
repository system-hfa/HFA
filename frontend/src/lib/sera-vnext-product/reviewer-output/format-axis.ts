import type { SeraAxisCandidate } from '@/lib/sera-vnext/engine-contract'
import type { SeraReviewerAxisCard } from './types'
import { summarizeEvidence, confidenceLabel } from './format-evidence'
import { perceptionReviewerQuestion, objectiveReviewerQuestion, actionReviewerQuestion, axisReviewerMustDecide } from './format-review-prompts'

const SERA_CODE_MEANINGS: Record<string, string> = {
  'P-A': 'Informação ausente — a informação necessária para perceber corretamente o estado não estava disponível no ponto de fuga',
  'P-B': 'Informação presente mas não percebida — a informação estava acessível mas o ator não a detectou ou processou',
  'P-C': 'Percepção incorreta ou distorcida — o ator percebeu a situação de forma diferente da realidade',
  'P-D': 'Ambiguidade perceptual — sinais conflitantes ou ambíguos tornaram a percepção correta improvável',
  'P-E': 'Informação enganosa fornecida pelo sistema ou ambiente — a fonte de informação induziu percepção incorreta',
  'P-F': 'Limitação sensorial — limitação física ou fisiológica impediu a percepção correta',
  'P-G': 'Sobrecarga de informação — excesso de estímulos simultaneamente prejudicou a percepção adequada',
  'P-H': 'Percepção correta mas tardemente — o ator percebeu corretamente mas não havia tempo suficiente para responder',
  'O-A': 'Objetivo seguro estabelecido e mantido — o ator tinha intenção compatível com operação segura no ponto de fuga',
  'O-B': 'Objetivo ambíguo ou mal definido — a intenção do ator não estava claramente orientada para um resultado seguro ou inseguro',
  'O-C': 'Objetivo inseguro ou violação consciente — há evidência de que o ator aceitou ou buscou um resultado inseguro',
  'O-D': 'Objetivo ausente ou não estabelecido — não há evidência de que o ator tinha objetivo claro no ponto de fuga',
  'A-A': 'Ação correta executada — a ação realizada foi apropriada para a situação no ponto de fuga',
  'A-B': 'Ação incorreta com intenção — o ator intencionalmente executou uma ação incompatível com a operação segura',
  'A-C': 'Ação incorreta sem intenção — o ator executou uma ação incorreta sem perceber que estava fazendo algo errado',
  'A-D': 'Omissão de ação necessária — o ator deixou de executar uma ação que era necessária no ponto de fuga',
  'A-E': 'Ação fora de sequência — a ação foi executada em ordem incorreta dentro do procedimento ou fluxo operacional',
  'A-F': 'Ação no momento errado — a ação foi executada cedo demais ou tarde demais em relação ao ponto de fuga',
  'A-G': 'Ação com magnitude ou força incorreta — a ação foi executada mas com intensidade, amplitude ou quantidade errada',
  'A-H': 'Ação aplicada ao controle ou objeto errado — o ator executou a ação correta no elemento errado',
  'A-I': 'Ação iniciada mas não completada — o ator iniciou a ação necessária mas não a concluiu no ponto de fuga',
  'A-J': 'Ação baseada em regra ou procedimento incorreto — o ator seguiu uma norma, regra ou heurística que resultou em ação inadequada',
}

function codeMeaning(code: string | null): string | null {
  if (!code) return null
  return SERA_CODE_MEANINGS[code.toUpperCase()] ?? `Código ${code} — significado não mapeado`
}

function plainLanguageQuestion(axis: 'P' | 'O' | 'A'): string {
  if (axis === 'P') return perceptionReviewerQuestion()
  if (axis === 'O') return objectiveReviewerQuestion()
  return actionReviewerQuestion()
}

function formatCandidateStatus(status: string): string {
  const map: Record<string, string> = {
    CANDIDATE: 'Candidato — código sugerido com base na evidência disponível',
    NO_FAILURE: 'Sem falha neste eixo — evidência indica operação dentro do esperado',
    INSUFFICIENT_EVIDENCE: 'Evidência insuficiente — análise não pôde determinar código candidato',
    UNRESOLVED: 'Não resolvido — eixo permanece em revisão humana',
  }
  return map[status] ?? status
}

export function buildAxisReviewerCard(
  axis: 'P' | 'O' | 'A',
  candidate: SeraAxisCandidate,
): SeraReviewerAxisCard {
  const supporting = summarizeEvidence(candidate.supportingEvidence)
  const counter = summarizeEvidence(candidate.counterEvidence)
  const excluded = summarizeEvidence(candidate.excludedPostEscapeEvidence)

  const whySuggested: string[] =
    supporting.length > 0
      ? supporting
      : ['Nenhuma evidência explícita positiva registrada — análise baseada em ausência de contraindicicação.']

  const whyMayBeWrong: string[] =
    counter.length > 0
      ? counter
      : ['Nenhuma evidência contrária explícita registrada.']

  const alternatives =
    candidate.alternativesConsidered.length > 0
      ? candidate.alternativesConsidered
      : ['Nenhuma alternativa explicitamente registrada pelo motor neste eixo.']

  return {
    axis,
    plainLanguageQuestion: plainLanguageQuestion(axis),
    candidateStatus: formatCandidateStatus(candidate.status),
    candidateCode: candidate.proposedCode,
    candidateMeaning: codeMeaning(candidate.proposedCode),
    statementAtEscapePoint: candidate.statementAtEscapePoint,
    whyCandidateWasSuggested: whySuggested,
    whyItMayBeWrong: whyMayBeWrong,
    alternativesConsidered: alternatives,
    evidenceUsed: supporting,
    evidenceExcluded: excluded,
    confidence: confidenceLabel(candidate.confidence),
    reviewerMustDecide: axisReviewerMustDecide(axis),
  }
}
