'use client'

import Link from 'next/link'
import { LearnNav } from '@/components/learn/LearnNav'
import { GitBranch, Eye, Target, Hand } from 'lucide-react'

const cards = [
  {
    href: '/learn/pipeline',
    icon: GitBranch,
    title: 'O Pipeline SERA',
    description: 'Como um evento se transforma em análise estruturada em 7 etapas sequenciais.',
    color: 'text-slate-300',
    border: 'border-slate-700 hover:border-slate-500',
  },
  {
    href: '/learn/perception',
    icon: Eye,
    title: 'Falhas de Percepção',
    description: 'Por que operadores percebem situações de forma incorreta — 8 tipos de falha classificados.',
    color: 'text-blue-400',
    border: 'border-blue-500/20 hover:border-blue-500/50',
  },
  {
    href: '/learn/objective',
    icon: Target,
    title: 'Falhas de Objetivo',
    description: 'Como as intenções e objetivos dos operadores contribuem para eventos indesejados.',
    color: 'text-purple-400',
    border: 'border-purple-500/20 hover:border-purple-500/50',
  },
  {
    href: '/learn/action',
    icon: Hand,
    title: 'Falhas de Ação',
    description: 'Os 10 tipos de falha na execução — de lapsos simples a erros complexos de decisão.',
    color: 'text-orange-400',
    border: 'border-orange-500/20 hover:border-orange-500/50',
  },
]

export default function LearnPage() {
  return (
    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
      <LearnNav />

      <div className="flex-1 min-w-0 space-y-10">
        {/* Hero */}
        <div>
          <h1 className="text-3xl font-bold text-white">Centro de Aprendizado SERA</h1>
          <p className="text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Entenda como a análise de fatores humanos é realizada — da teoria à classificação
            assistida dos eventos.
          </p>
        </div>

        {/* Nav cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`bg-slate-900 border rounded-xl p-6 transition-all block group ${card.border}`}
              >
                <Icon className={`size-6 mb-3 ${card.color}`} />
                <h2 className="text-white font-semibold mb-1.5 group-hover:text-white">{card.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
              </Link>
            )
          })}
        </div>

        {/* Por que isso importa */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold text-lg mb-4">Por que isso importa</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Mais de 70% dos acidentes em operações de alto risco têm fatores humanos como causa
            principal ou contribuinte. Entender como e por que operadores cometem erros é o primeiro
            passo para preveni-los.
          </p>
          <p className="text-slate-400 leading-relaxed">
            A metodologia SERA (Systematic Error and Risk Analysis), desenvolvida por K.C. Hendy
            (2003), oferece um framework científico para classificar essas falhas de forma sistemática
            e replicável — permitindo que organizações identifiquem padrões e tomem ações preventivas
            antes que novos eventos ocorram.
          </p>
        </section>

        {/* Como usar */}
        <section>
          <h2 className="text-white font-semibold text-lg mb-4">Como usar este guia</h2>
          <div className="space-y-3">
            {[
              {
                n: 1,
                title: 'Comece pelo Pipeline',
                desc: 'Entenda o fluxo completo antes de mergulhar nos detalhes de cada etapa.',
              },
              {
                n: 2,
                title: 'Leia cada etapa',
                desc: 'Cada página explica os nós de decisão com exemplos de operações de alto risco.',
              },
              {
                n: 3,
                title: 'Consulte o Glossário',
                desc: 'Use os códigos como referência rápida durante a revisão de análises.',
              },
            ].map((step) => (
              <div
                key={step.n}
                className="flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4"
              >
                <span className="size-7 rounded-full bg-slate-700 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {step.n}
                </span>
                <div>
                  <p className="text-white font-medium">{step.title}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
