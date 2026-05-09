'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { LearnNav } from '@/components/learn/LearnNav'
import { CodeBadge } from '@/components/learn/CodeBadge'
import { DecisionFlow, type FlowNode, type FlowResult } from '@/components/learn/DecisionFlow'

const nodes: FlowNode[] = [
  {
    id: 'n1',
    question: 'A ação foi implementada COMO PRETENDIDA?',
    yes: 'n2',
    no: 'n1b',
  },
  {
    id: 'n1b',
    question: 'O operador percebeu o desvio durante a execução?',
    criterion: 'A-B: deslize/lapso involuntário (percebeu o desvio). A-C: falta de feedback na execução (não percebeu).',
    yes: 'A-B',
    no: 'A-C',
  },
  {
    id: 'n2',
    question: 'A ação foi CORRETA e ADEQUADA para a situação?',
    yes: 'A-A',
    no: 'n3',
  },
  {
    id: 'n3',
    question: 'O operador tinha CAPACIDADE para executar a ação correta?',
    yes: 'n4',
    no: 'n3b',
  },
  {
    id: 'n3b',
    question: 'A incapacidade era FÍSICA ou MOTORA?',
    criterion: 'A-D: limitação física/motora impediu a execução. A-E: falta de conhecimento sobre qual ação executar.',
    yes: 'A-D',
    no: 'A-E',
  },
  {
    id: 'n4',
    question: 'A PRESSÃO DO TEMPO era excessiva?',
    yes: 'n4b',
    no: 'n5',
  },
  {
    id: 'n4b',
    question: 'O problema foi principalmente na SELEÇÃO da ação (não no feedback)?',
    criterion: 'A-I: escolha errada de ação sob pressão. A-J: falta de feedback por pressão. A-H: priorização inadequada geral.',
    yes: 'A-I',
    no: 'n4c',
  },
  {
    id: 'n4c',
    question: 'Houve falta de FEEDBACK — não deu tempo de verificar o resultado?',
    yes: 'A-J',
    no: 'A-H',
  },
  {
    id: 'n5',
    question: 'Houve falta de FEEDBACK sobre o resultado da decisão?',
    criterion: 'A-G: não monitorou o resultado da ação. A-F: selecionou plano de ação incorreto sem pressão de tempo.',
    yes: 'A-G',
    no: 'A-F',
  },
]

const results: Record<string, FlowResult> = {
  'A-A': { label: 'Nenhuma falha de ação', description: 'A execução foi correta. Se há falha, está em P ou O.' },
  'A-B': { label: 'Deslize, lapso ou omissão', description: 'A ação não foi executada como planejada por um erro involuntário — momento de distração ou confusão entre rotinas automatizadas.' },
  'A-C': { label: 'Falha de feedback na execução', description: 'A ação foi executada como planejada mas o operador não recebeu feedback confirmatório e não percebeu o desvio.' },
  'A-D': { label: 'Inabilidade física para a resposta', description: 'O operador sabia o que fazer mas fisicamente não conseguiu executar — limitação física, motora ou de força.' },
  'A-E': { label: 'Falha de conhecimento — decisão', description: 'O operador não tinha o conhecimento necessário para saber QUAL ação executar. Tentou agir baseado em analogia com outra situação.' },
  'A-F': { label: 'Seleção errada da ação (sem pressão)', description: 'O operador tinha capacidade mas escolheu um plano de ação incorreto quando havia opção melhor disponível, sem pressão de tempo excessiva.' },
  'A-G': { label: 'Falha de feedback na decisão', description: 'O operador selecionou uma ação mas não monitorou o resultado para verificar se estava produzindo o efeito esperado.' },
  'A-H': { label: 'Gerenciamento de tempo inadequado', description: 'Sob pressão de tempo real, o operador priorizou incorretamente suas atenções e executou a ação errada.' },
  'A-I': { label: 'Seleção errada da ação (com pressão)', description: 'Semelhante a A-F, mas a pressão de tempo foi determinante na escolha incorreta. Sem a urgência, o operador provavelmente teria escolhido certo.' },
  'A-J': { label: 'Falha de feedback por pressão de tempo', description: 'A pressão de tempo impediu que o operador buscasse ou processasse o feedback necessário para confirmar se a ação estava correta.' },
}

const glossary = [
  { code: 'A-A', name: 'Nenhuma falha', when: 'Execução correta. Falha está em P ou A.', example: 'Piloto executou arremeter perfeitamente mas o objetivo estava errado (O-D).', preconditions: null },
  { code: 'A-B', name: 'Deslize/lapso/omissão', when: 'Sabia o que fazer mas executou diferente involuntariamente.', example: 'Piloto planejava acionar sistema A mas acionou B por confusão entre controles similares.', preconditions: 'P1 (fisiológico), P5' },
  { code: 'A-C', name: 'Falha de feedback na execução', when: 'Ação começou corretamente mas operador não percebeu que estava desviando.', example: 'Piloto não percebeu que a manobra estava produzindo resultado diferente do esperado.', preconditions: 'W1 (tecnológico)' },
  { code: 'A-D', name: 'Inabilidade física', when: 'Limitação física, motora ou de força impediu a execução correta.', example: 'Piloto tentou corrigir a aeronave mas a força necessária superava sua capacidade física no momento.', preconditions: 'P1 (fisiológico)' },
  { code: 'A-E', name: 'Falha de conhecimento (decisão)', when: 'Não sabia qual ação executar — escolheu por analogia com situação diferente.', example: 'Piloto em adaptação executou manobra da aeronave anterior porque não conhecia o procedimento correto.', preconditions: 'P6 (treinamento), T1, P7' },
  { code: 'A-F', name: 'Seleção errada (sem pressão)', when: 'Capacidade ok, sem urgência, mas escolheu alternativa errada por viés, hábito ou cálculo inadequado.', example: 'Piloto que escolheu pousar pelo lado mais arriscado sem pressão de tempo, para validar afirmação anterior.', preconditions: 'P2 (psicológico), P3' },
  { code: 'A-G', name: 'Falha de feedback na decisão', when: 'Não monitorou o resultado da ação após a decisão.', example: 'Operador ajustou parâmetro e não verificou se o ajuste produziu o efeito pretendido.', preconditions: 'P5, W1' },
  { code: 'A-H', name: 'Gerenciamento de tempo', when: 'Urgência genuína + alocou atenção inadequadamente. Com melhor treinamento, poderia ter gerenciado melhor.', example: 'Piloto preocupado em localizar plataforma não monitorou instrumentos e desacoplou o automatismo incorretamente.', preconditions: 'T1 (CRM), S3, P5' },
  { code: 'A-I', name: 'Seleção errada (com pressão)', when: 'Sem a pressão de tempo, o operador provavelmente teria escolhido a ação correta.', example: 'Piloto que, na urgência, selecionou o procedimento de emergência errado.', preconditions: 'P5, T1' },
  { code: 'A-J', name: 'Feedback por pressão de tempo', when: 'Havia tempo para agir mas não para verificar o resultado antes do próximo evento.', example: 'Operador executou correção mas não teve tempo de confirmar se o sistema respondeu antes do próximo evento.', preconditions: 'P5, W1' },
]

export default function ActionPage() {
  return (
    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
      <LearnNav />

      <div className="flex-1 min-w-0 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/learn" className="hover:text-slate-300 transition">Metodologia SERA</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-300">Falhas de Ação</span>
        </nav>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white">Falhas de Ação</h1>
            <span className="text-sm text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded">Etapa 5</span>
          </div>
          <p className="text-slate-400 mt-1">Como o operador tentou atingir seu objetivo.</p>
        </div>

        {/* Introdução */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            A Etapa 5 analisa a EXECUÇÃO — como o operador concretamente tentou alcançar seu objetivo.
            Mesmo que percepção e objetivo estejam corretos, a execução pode falhar de múltiplas formas.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            A ação é analisada em relação ao que o operador <span className="text-white">PLANEJAVA</span> fazer, não ao que deveria
            ter feito. A primeira pergunta é sempre: a ação foi executada como o operador pretendia?
          </p>
        </section>

        {/* Fluxo interativo */}
        <section>
          <h2 className="text-white font-semibold mb-1">Fluxo de Decisão Interativo</h2>
          <p className="text-slate-500 text-sm mb-4">Responda cada pergunta para identificar o código correto.</p>
          <DecisionFlow nodes={nodes} results={results} />
        </section>

        {/* Glossário */}
        <section>
          <h2 className="text-white font-semibold mb-4">Glossário dos 10 Códigos</h2>
          <div className="space-y-3">
            {glossary.map((g) => (
              <div key={g.code} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <CodeBadge code={g.code} size="md" />
                  <div>
                    <p className="text-white font-medium">{g.name}</p>
                    {g.preconditions && (
                      <p className="text-slate-500 text-xs mt-0.5">Pré-condições típicas: {g.preconditions}</p>
                    )}
                  </div>
                </div>
                <p className="text-slate-400 text-sm"><span className="text-slate-300 font-medium">Quando usar:</span> {g.when}</p>
                <p className="text-slate-500 text-xs mt-2 italic">Exemplo: {g.example}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
