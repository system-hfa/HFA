// Demo data only. Do not use for operational analysis.

export type DemoAnalysis = {
  id: string
  title: string
  context: string
  perception_code: string
  objective_code: string
  action_code: string
  hfa_erc_category: 1 | 2 | 3 | 4 | 5
  summary: string
  recommendation: string
}

export type DemoRecurringPattern = {
  id: string
  label: string
  count: number
  note: string
}

export type DemoSafetyIssueCandidate = {
  id: string
  label: string
  count: number
  share: number
  confidence: 'preliminary' | 'moderate'
  caveat: string
}

export type DemoCorrectiveAction = {
  id: string
  title: string
  status: 'pending' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  due_label: string
}

export type DemoQualityTrendPoint = {
  month: string
  dominant_hfa_erc_category: 1 | 2 | 3 | 4 | 5
  critical_or_high_share: number
  note: string
}

export type DemoDataConfidence = {
  level: 'insufficient' | 'limited' | 'moderate' | 'strong'
  total_analyses: number
  minimum_recommended: number
  valid_erc_count: number
  valid_erc_share: number
  messages: string[]
  caveat: string
}

const SAFETY_ISSUE_CAVEAT =
  'Candidato ficticio para treinamento. Safety Issue formal exige revisao humana, contexto, exposicao e barreiras.'

export const demoAnalyses: DemoAnalysis[] = [
  {
    id: 'demo-001',
    title: 'Atraso na identificacao de condicao anormal',
    context: 'Operacao offshore generica em aproximacao final com informacao ambiental degradada.',
    perception_code: 'P-B',
    objective_code: 'O-D',
    action_code: 'A-G',
    hfa_erc_category: 5,
    summary: 'A equipe detectou tarde uma condicao anormal e manteve uma intencao operacional pouco conservativa.',
    recommendation: 'Reforcar criterios de descontinuacao e checkpoints verbais para condicoes anormais.',
  },
  {
    id: 'demo-002',
    title: 'Execucao incompleta de checklist',
    context: 'Troca de turno em ambiente industrial com transferencia verbal abreviada.',
    perception_code: 'P-G',
    objective_code: 'O-A',
    action_code: 'A-B',
    hfa_erc_category: 3,
    summary: 'Itens criticos do checklist foram omitidos por atencao fragmentada durante a transicao.',
    recommendation: 'Padronizar pausa operacional curta antes da liberacao final da tarefa.',
  },
  {
    id: 'demo-003',
    title: 'Comunicacao tardia entre funcoes',
    context: 'Coordenacao entre sala de controle e equipe de campo durante resposta a desvio operacional.',
    perception_code: 'P-H',
    objective_code: 'O-A',
    action_code: 'A-C',
    hfa_erc_category: 2,
    summary: 'A informacao correta existia, mas chegou tarde e sem confirmacao de entendimento.',
    recommendation: 'Implantar confirmacao fechada de mensagens em eventos fora da rotina.',
  },
  {
    id: 'demo-004',
    title: 'Decisao operacional sob pressao de tempo',
    context: 'Janela curta para completar tarefa critica antes de restricao de agenda operacional.',
    perception_code: 'P-D',
    objective_code: 'O-D',
    action_code: 'A-I',
    hfa_erc_category: 4,
    summary: 'A pressao de tempo influenciou a escolha de uma alternativa menos conservativa.',
    recommendation: 'Definir gatilhos formais para escalonamento quando houver compressao de tempo.',
  },
  {
    id: 'demo-005',
    title: 'Acao corretiva apos desvio de procedimento',
    context: 'Equipe executou atividade prevista, mas sem confirmar efeito apos intervencao.',
    perception_code: 'P-A',
    objective_code: 'O-A',
    action_code: 'A-G',
    hfa_erc_category: 2,
    summary: 'O objetivo era adequado, mas faltou monitoramento do resultado da acao aplicada.',
    recommendation: 'Incluir verificacao obrigatoria de efeito antes de encerrar a resposta.',
  },
  {
    id: 'demo-006',
    title: 'Nova ocorrencia de condicao anormal nao percebida',
    context: 'Operacao offshore generica com atencao concentrada em meta secundaria.',
    perception_code: 'P-B',
    objective_code: 'O-D',
    action_code: 'A-F',
    hfa_erc_category: 5,
    summary: 'A situacao critica voltou a ser detectada tarde e a equipe insistiu em alternativa com menor margem.',
    recommendation: 'Treinar reconhecimento de sinais precoces e reforcar criterios de abandono da tarefa.',
  },
  {
    id: 'demo-007',
    title: 'Informacao ambigua em interface operacional',
    context: 'Painel apresentava indicacoes pouco discriminaveis durante ajuste de configuracao.',
    perception_code: 'P-F',
    objective_code: 'O-A',
    action_code: 'A-G',
    hfa_erc_category: 4,
    summary: 'A equipe interpretou uma indicacao ambigua como normal e nao verificou o efeito da acao subsequente.',
    recommendation: 'Revisar padrao de sinalizacao e incluir dupla confirmacao em mudancas sensiveis.',
  },
  {
    id: 'demo-008',
    title: 'Recorrencia de feedback insuficiente apos ajuste',
    context: 'Rotina de reconfiguracao com comunicacao minima entre supervisor e executor.',
    perception_code: 'P-F',
    objective_code: 'O-A',
    action_code: 'A-G',
    hfa_erc_category: 4,
    summary: 'A ambiguidade de indicacao foi seguida de acao sem checagem robusta do resultado obtido.',
    recommendation: 'Padronizar etapa de validacao independente apos cada ajuste de configuracao.',
  },
  {
    id: 'demo-009',
    title: 'Terceira recorrencia de sinal ambigua sem verificacao',
    context: 'Operacao de rotina com equipe experiente e elevada confianca na leitura do sistema.',
    perception_code: 'P-F',
    objective_code: 'O-A',
    action_code: 'A-G',
    hfa_erc_category: 4,
    summary: 'O padrao se repetiu com interpretacao ambigua seguida de ausencia de feedback estruturado.',
    recommendation: 'Criar revisao de interface e reforco de treinamento para reconhecimento de ambiguidade.',
  },
  {
    id: 'demo-010',
    title: 'Terceira ocorrencia de intencao pouco conservativa',
    context: 'Equipe pressionada por agenda operacional e variacao ambiental na fase final da tarefa.',
    perception_code: 'P-B',
    objective_code: 'O-D',
    action_code: 'A-H',
    hfa_erc_category: 5,
    summary: 'Novamente houve atraso na percepcao da condicao anormal combinado com objetivo menos conservativo.',
    recommendation: 'Reforcar pausa decisoria e autoridade para interromper a operacao sem penalidade cultural.',
  },
]

export const demoRecurringPatterns: DemoRecurringPattern[] = [
  {
    id: 'pattern-001',
    label: 'P-B + O-D',
    count: 3,
    note: 'Atraso de percepcao combinado com intencao nao conservativa em cenarios de pressao operacional.',
  },
  {
    id: 'pattern-002',
    label: 'P-F + A-G',
    count: 3,
    note: 'Informacao ambigua seguida de baixa verificacao do efeito da acao adotada.',
  },
  {
    id: 'pattern-003',
    label: 'Pressao operacional e de tempo',
    count: 4,
    note: 'Precondicao recorrente em tarefas com janela operacional comprimida.',
  },
]

export const demoSafetyIssueCandidates: DemoSafetyIssueCandidate[] = [
  {
    id: 'candidate-001',
    label: 'P-B + O-D',
    count: 3,
    share: 0.3,
    confidence: 'moderate',
    caveat: SAFETY_ISSUE_CAVEAT,
  },
  {
    id: 'candidate-002',
    label: 'P-F + A-G',
    count: 3,
    share: 0.3,
    confidence: 'moderate',
    caveat: SAFETY_ISSUE_CAVEAT,
  },
]

export const demoCorrectiveActions: DemoCorrectiveAction[] = [
  {
    id: 'action-001',
    title: 'Padronizar criterios de interrupcao em condicao anormal',
    status: 'in_progress',
    priority: 'high',
    due_label: 'Revisao em 15 dias',
  },
  {
    id: 'action-002',
    title: 'Revisar checklist de transferencia entre funcoes',
    status: 'pending',
    priority: 'medium',
    due_label: 'Planejada para o proximo ciclo de treinamento',
  },
  {
    id: 'action-003',
    title: 'Atualizar validacao de feedback apos ajuste sensivel',
    status: 'pending',
    priority: 'high',
    due_label: 'Aprovacao tecnica em 7 dias',
  },
  {
    id: 'action-004',
    title: 'Concluir reforco de comunicacao fechada',
    status: 'closed',
    priority: 'medium',
    due_label: 'Concluida no ultimo mes',
  },
]

export const demoQualityTrend: DemoQualityTrendPoint[] = [
  {
    month: '2026-01',
    dominant_hfa_erc_category: 3,
    critical_or_high_share: 0.33,
    note: 'Base inicial com sinais moderados e um evento de maior severidade relativa.',
  },
  {
    month: '2026-02',
    dominant_hfa_erc_category: 4,
    critical_or_high_share: 0.67,
    note: 'A recorrencia de informacao ambigua elevou a proporcao de categorias 4 e 5.',
  },
  {
    month: '2026-03',
    dominant_hfa_erc_category: 5,
    critical_or_high_share: 0.75,
    note: 'Persistencia de pressao operacional e intencao pouco conservativa no fechamento do periodo.',
  },
]

export const demoDataConfidence: DemoDataConfidence = {
  level: 'strong',
  total_analyses: 10,
  minimum_recommended: 10,
  valid_erc_count: 10,
  valid_erc_share: 1,
  messages: [
    'A base ficticia contem 10 analises para demonstrar sinais organizacionais iniciais.',
    'Os candidatos a Safety Issue indicam recorrencia observada em um conjunto de treinamento.',
    'Mesmo nesta demonstracao, o perfil deve ser lido como exemplo pedagogico e nao como operacao real.',
  ],
  caveat:
    'Dados ficticios para treinamento. Esta demonstracao ilustra a leitura do produto, nao um diagnostico operacional valido.',
}
