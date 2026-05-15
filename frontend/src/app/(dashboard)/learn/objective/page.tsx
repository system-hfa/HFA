'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { LearnNav } from '@/components/learn/LearnNav'
import { CodeBadge } from '@/components/learn/CodeBadge'
import { DecisionFlow, type FlowNode, type FlowResult } from '@/components/learn/DecisionFlow'

const nodes: FlowNode[] = [
  {
    id: 'n1',
    question: 'O objetivo era CONSISTENTE com normas e regulamentos?',
    yes: 'n2',
    no: 'n3',
  },
  {
    id: 'n2',
    question: 'Era CONSERVATIVO e com risco adequadamente gerenciado?',
    yes: 'O-A',
    no: 'O-D',
  },
  {
    id: 'n3',
    question: 'Era uma VIOLAÇÃO DE ROTINA — habitual e normalizada na organização?',
    criterion: 'O-B: desvio normalizado e rotineiro, tolerado pela cultura. O-C: desvio consciente, pontual e não rotineiro de regra, procedimento ou expectativa operacional.',
    yes: 'O-B',
    no: 'O-C',
  },
]

const results: Record<string, FlowResult> = {
  'O-A': { label: 'Nenhuma falha de objetivo', description: 'O operador estava tentando cumprir a tarefa de forma legítima — inclusive quando há restrição externa (prazo, ferramenta indisponível) sem objetivo desviante explícito. A falha está em outro nível (percepção ou ação).' },
  'O-B': { label: 'Violação rotineira', description: 'O operador violou normas de forma habitual — comportamento recorrente, normalizado e tolerado pela cultura organizacional.' },
  'O-C': { label: 'Violação excepcional/circunstancial', description: 'O operador desviou conscientemente de regra, procedimento ou expectativa operacional de forma pontual e não rotineira. O desvio não faz parte da cultura da equipe. A motivação pode ser conveniência, improviso, pressão situacional ou proteção humana — proteção humana é um exemplo possível, não um requisito. O que define O-C é o desvio consciente e excepcional.' },
  'O-D': { label: 'Intenção não conservativa', description: 'O objetivo era formalmente consistente com as normas, mas o operador escolheu intencionalmente uma opção mais arriscada por eficiência, economia ou ganho operacional proativo — não por simples pressão externa de prazo.' },
}

const glossary = [
  {
    code: 'O-A',
    name: 'Nenhuma falha de objetivo',
    when: 'Intenção legítima, consistente com normas e conservativa. Inclui operador que age sob restrição externa (prazo, ferramenta indisponível, omissão administrativa) sem objetivo desviante explícito. A falha está em P ou A.',
    example: 'Piloto tentou arremeter corretamente mas teve dificuldade na execução — a falha é A-E, não O-A. Médico que administra dose errada por desconhecer protocolo — a falha é de conhecimento (A-E), o objetivo era nominal.',
    preconditions: null,
  },
  {
    code: 'O-B',
    name: 'Violação rotineira',
    when: 'Há evidência de que o desvio era comum, esperado ou normalizado no ambiente de trabalho.',
    example: 'Piloto que habitualmente decolava com condições abaixo dos mínimos e era conhecido por isso na empresa.',
    preconditions: 'O2 (clima organizacional), S1',
  },
  {
    code: 'O-C',
    name: 'Violação excepcional/circunstancial',
    when: 'O operador decide conscientemente desviar de regra, procedimento ou expectativa operacional de forma pontual e não rotineira. O desvio não é normalizado pela equipe ou organização. A motivação pode ser conveniência, atalho situacional, improviso, economia de esforço, pressão circunstancial ou proteção humana — proteção humana é um exemplo possível, não um requisito.',
    example: 'Atalho isolado por conveniência — operador que decide pular uma etapa de verificação uma única vez por achar que não haveria problema. Improviso pontual não normalizado — profissional que descumpre protocolo isoladamente. Descumprimento excepcional sob pressão situacional — improviso fora do procedimento em situação atípica. Desvio para proteger passageiro/colega/paciente (exemplo possível, não requisito) — tripulante que desvia da sequência padrão para atender passageiro em colapso.',
    preconditions: 'P2 (psicológico), P5 (prontidão)',
  },
  {
    code: 'O-D',
    name: 'Intenção não conservativa',
    when: 'Não houve violação de regra, mas houve escolha consciente de maior risco motivada por eficiência, economia de tempo ou ganho operacional proativo. Não confundir com ação sob pressão de prazo imposta externamente sem escolha deliberada de risco adicional.',
    example: 'Piloto que escolheu pousar pelo lado mais difícil da plataforma (tecnicamente permitido) por necessidade de validar uma afirmação anterior — decisão proativa de maior risco sem violação formal.',
    preconditions: 'P2 (viés de confirmação), P3',
  },
]

export default function ObjectivePage() {
  return (
    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
      <LearnNav />

      <div className="flex-1 min-w-0 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/learn" className="hover:text-slate-300 transition">Metodologia SERA</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-300">Falhas de Objetivo</span>
        </nav>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white">Falhas de Objetivo</h1>
            <span className="text-sm text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded">Etapa 4</span>
          </div>
          <p className="text-slate-400 mt-1">O que o operador estava tentando alcançar.</p>
        </div>

        {/* Introdução */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            O objetivo é a intenção operacionalizada do operador — não sua meta abstrata, mas como ele
            escolheu concretamente atingi-la. A análise foca no objetivo NO MOMENTO DA DECISÃO do
            Ponto de Fuga, não no objetivo geral do voo ou da missão.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            A Etapa 4 responde: <span className="text-white">&quot;O operador estava tentando fazer a coisa certa?&quot;</span> Se a
            resposta for sim, a falha está na percepção ou na ação. Se for não, classifica-se o tipo
            de violação.
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
          <h2 className="text-white font-semibold mb-4">Glossário dos Códigos</h2>
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

        {/* Distinção crítica O-A / O-B / O-C / O-D */}
        <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-amber-400 font-semibold mb-4">A Distinção Crítica entre os Códigos</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            A fronteira mais importante da Etapa 4 é entre{' '}
            <span className="text-white font-medium">desvio consciente</span> e{' '}
            <span className="text-white font-medium">ausência de desvio de objetivo</span>. O operador
            pode errar sem ter tido objetivo desviante — e pode ter objetivo desviante por razões muito
            diferentes entre si.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-800/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CodeBadge code="O-A" size="sm" />
                <span className="text-white text-sm font-medium">Objetivo nominal</span>
              </div>
              <p className="text-slate-500 text-xs italic mb-1">&quot;objetivo era nominal; a falha está em outro eixo ou nas precondições&quot;</p>
              <p className="text-slate-400 text-sm">O operador não teve objetivo desviante. Tentou cumprir a tarefa de forma legítima — mesmo sob restrição externa (prazo imposto, ferramenta indisponível). A falha está em percepção ou ação, não no objetivo.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CodeBadge code="O-B" size="sm" />
                <span className="text-white text-sm font-medium">Desvio normalizado/rotineiro</span>
              </div>
              <p className="text-slate-500 text-xs italic mb-1">&quot;fazemos assim normalmente&quot;</p>
              <p className="text-slate-400 text-sm">O operador desviou de forma habitual, esperada, normalizada pelo ambiente. Outros fazem o mesmo. A organização, implicitamente, tolerava o comportamento.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CodeBadge code="O-C" size="sm" />
                <span className="text-white text-sm font-medium">Desvio excepcional/circunstancial</span>
              </div>
              <p className="text-slate-500 text-xs italic mb-1">&quot;fiz diferente desta vez&quot;</p>
              <p className="text-slate-400 text-sm">O operador decidiu <span className="text-white">conscientemente</span> desviar de regra, procedimento ou expectativa operacional de forma pontual e não rotineira. O desvio não faz parte da cultura. A motivação pode ser conveniência, improviso, atalho situacional, pressão circunstancial ou proteção humana — proteção humana é um exemplo possível, não um requisito.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CodeBadge code="O-D" size="sm" />
                <span className="text-white text-sm font-medium">Eficiência/economia como objetivo</span>
              </div>
              <p className="text-slate-500 text-xs italic mb-1">&quot;fiz para ganhar tempo/economizar/aumentar produtividade/otimizar&quot;</p>
              <p className="text-slate-400 text-sm">O operador não violou regra formal, mas escolheu conscientemente a opção mais arriscada por eficiência, economia de tempo ou ganho operacional. A escolha de risco foi proativa, não imposta externamente.</p>
            </div>
          </div>

          <div className="bg-slate-800/40 rounded-lg p-4 mb-4">
            <p className="text-slate-300 text-sm font-medium mb-2">Perguntas-chave para O-C:</p>
            <ul className="text-slate-400 text-sm space-y-1 list-none">
              <li>— <span className="text-slate-300 italic">&quot;O operador sabia que estava desviando de um procedimento ou regra?&quot;</span> Se não sabia, é O-A ou P-C.</li>
              <li>— <span className="text-slate-300 italic">&quot;Colegas e supervisores dirão que esse comportamento é comum nesta operação?&quot;</span> Se SIM: O-B.</li>
              <li>— <span className="text-slate-300 italic">&quot;A escolha foi motivada por eficiência, economia de tempo ou ganho operacional proativo?&quot;</span> Se SIM: considerar O-D.</li>
            </ul>
          </div>

          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm font-medium mb-2">O que NÃO é O-C:</p>
            <ul className="text-slate-400 text-sm space-y-1 list-disc list-inside">
              <li>Erro por desconhecimento de protocolo ou falta de treinamento → <span className="text-white">O-A</span> (sem desvio consciente de objetivo)</li>
              <li>Restrição de ferramenta ou prazo imposta externamente, sem decisão de desviar → <span className="text-white">O-A</span></li>
              <li>Prática repetida e normalizada pela equipe ou organização → <span className="text-white">O-B</span></li>
              <li>Eficiência, economia de tempo ou ganho operacional como objetivo dominante → <span className="text-white">O-D</span></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
