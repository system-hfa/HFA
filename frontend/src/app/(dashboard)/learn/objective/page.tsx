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
    criterion: 'O-B: comportamento recorrente, tolerado pela cultura. O-C: episódio isolado, circunstancial.',
    yes: 'O-B',
    no: 'O-C',
  },
]

const results: Record<string, FlowResult> = {
  'O-A': { label: 'Nenhuma falha de objetivo', description: 'O operador estava tentando fazer a coisa certa da forma correta. A falha está em outro nível (percepção ou ação).' },
  'O-B': { label: 'Violação rotineira', description: 'O operador violou normas de forma habitual — comportamento recorrente, tolerado pela cultura organizacional.' },
  'O-C': { label: 'Violação excepcional', description: 'O operador violou normas em circunstâncias específicas e incomuns — não é seu comportamento habitual.' },
  'O-D': { label: 'Intenção não conservativa', description: 'O objetivo era formalmente consistente com as normas, mas o operador escolheu intencionalmente uma opção mais arriscada quando havia alternativa mais segura.' },
}

const glossary = [
  {
    code: 'O-A',
    name: 'Nenhuma falha de objetivo',
    when: 'Intenção legítima, consistente com normas e conservativa. A falha está em P ou A.',
    example: 'Piloto tentou arremeter corretamente mas teve dificuldade na execução — a falha é A-E, não O-A.',
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
    name: 'Violação excepcional',
    when: 'Operador geralmente cumpre as normas mas neste caso específico fez uma exceção.',
    example: 'Piloto experiente e cumpridor das normas que, surpreendido pela situação, soltou os comandos para pegar documentos — comportamento nunca antes repetido.',
    preconditions: 'P2 (psicológico), P5 (prontidão)',
  },
  {
    code: 'O-D',
    name: 'Intenção não conservativa',
    when: 'Não houve violação de regra, mas houve escolha consciente de maior risco quando havia alternativa mais segura.',
    example: 'Piloto que escolheu pousar pelo lado mais difícil da plataforma (tecnicamente permitido) por necessidade de validar uma afirmação anterior.',
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

        {/* Distinção crítica O-B vs O-C */}
        <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-amber-400 font-semibold mb-4">A Diferença Crítica: O-B vs O-C</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            A distinção entre violação rotineira e excepcional é a mais importante e mais difícil da
            Etapa 4.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CodeBadge code="O-B" size="sm" />
                <span className="text-white text-sm font-medium">Rotineira</span>
              </div>
              <p className="text-slate-400 text-sm">O comportamento era esperado, normalizado, parte da cultura. Outros na organização fazem o mesmo. A organização, implicitamente, tolerava.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CodeBadge code="O-C" size="sm" />
                <span className="text-white text-sm font-medium">Excepcional</span>
              </div>
              <p className="text-slate-400 text-sm">O operador normalmente cumpre as regras. Este foi um episódio isolado, geralmente motivado por uma circunstância específica (pressão pontual, surpresa, distração).</p>
            </div>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-4">
            <p className="text-slate-300 text-sm font-medium mb-1">Pergunta-chave:</p>
            <p className="text-slate-400 text-sm italic">
              &quot;Se entrevistarmos colegas e supervisores, eles dirão que isso é comum nesta operação?&quot;
              — Se SIM: O-B.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
