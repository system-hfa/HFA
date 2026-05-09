'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { LearnNav } from '@/components/learn/LearnNav'

const stages = [
  {
    n: 1,
    name: 'Resumo do Evento',
    short: 'Organiza o relato bruto',
    detail:
      'A IA lê o relato bruto e produz um resumo estruturado identificando: data, local, fase da operação, agente principal e sequência cronológica dos fatos. Esta etapa não classifica nada — apenas organiza a informação para as etapas seguintes.',
  },
  {
    n: 2,
    name: 'Ponto de Fuga',
    short: 'Identifica a decisão crítica',
    detail:
      'Identifica o momento exato em que a operação se desviou dos procedimentos seguros. É sempre uma DECISÃO — nunca o ato físico em si. A pergunta central é: qual decisão iniciou a trajetória em direção ao evento indesejado?\n\nAtenção: o Ponto de Fuga é sempre de UM único agente (pessoa ou equipe). Se houver múltiplos agentes, identifica-se o que tinha controle das variáveis críticas naquele momento.\n\nExemplo correto: "O piloto DECIDIU decolar com visibilidade abaixo dos mínimos"\nExemplo incorreto: "O piloto decolou com visibilidade baixa" (isso é consequência, não decisão)',
  },
  {
    n: 3,
    name: 'Falha de Percepção',
    short: 'O que o operador acreditava',
    parallel: true,
    detail:
      'Analisa o que o operador ACREDITAVA estar acontecendo no momento da decisão. A pergunta não é o que realmente estava acontecendo, mas o que o operador percebeu.\nResultado: um código P-A (sem falha) até P-H (falha de comunicação).',
  },
  {
    n: 4,
    name: 'Falha de Objetivo',
    short: 'O que o operador pretendia',
    parallel: true,
    detail:
      'Analisa o que o operador ESTAVA TENTANDO FAZER — qual era sua intenção ao tomar a decisão do Ponto de Fuga.\nResultado: O-A (sem falha) até O-D (intenção não conservativa).',
  },
  {
    n: 5,
    name: 'Falha de Ação',
    short: 'Como o operador executou',
    parallel: true,
    detail:
      'Analisa COMO o operador tentou atingir seu objetivo — a execução em si da decisão.\nResultado: A-A (sem falha) até A-J (falha de feedback por pressão de tempo).',
  },
  {
    n: 6,
    name: 'Conclusão',
    short: 'Integra P + O + A + pré-condições',
    detail:
      'Integra os resultados das etapas 3, 4 e 5 junto com as pré-condições identificadas para produzir uma narrativa explicativa do evento. A conclusão conecta as falhas individuais ao contexto organizacional.',
  },
  {
    n: 7,
    name: 'Recomendações',
    short: 'Ações preventivas vinculadas',
    detail:
      'Com base nos códigos classificados e nas pré-condições, a IA gera recomendações específicas e vinculadas a cada falha identificada. Cada recomendação indica qual código de falha está endereçando.',
  },
]

function PipelineDiagram() {
  const sequential = stages.filter((s) => !s.parallel)
  const parallel = stages.filter((s) => s.parallel)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-max">
        {/* Etapa 1 */}
        <StageBox n={1} name="Resumo" sub="Organiza o relato" />
        <Arrow />
        {/* Etapa 2 */}
        <StageBox n={2} name="Ponto de Fuga" sub="Decisão crítica" />
        <Arrow />

        {/* Etapas 3/4/5 em paralelo */}
        <div className="flex flex-col gap-2">
          <p className="text-slate-500 text-[10px] text-center mb-1">paralelo</p>
          <div className="flex flex-col gap-2">
            <StageBox n={3} name="Percepção" sub="P-A a P-H" color="blue" />
            <StageBox n={4} name="Objetivo" sub="O-A a O-D" color="purple" />
            <StageBox n={5} name="Ação" sub="A-A a A-J" color="orange" />
          </div>
        </div>

        <Arrow />
        {/* Etapa 6 */}
        <StageBox n={6} name="Conclusão" sub="Integração" />
        <Arrow />
        {/* Etapa 7 */}
        <StageBox n={7} name="Recomendações" sub="Ações preventivas" />
      </div>
    </div>
  )
}

function Arrow() {
  return <div className="text-slate-600 text-xl shrink-0">→</div>
}

const colorBorderMap: Record<string, string> = {
  blue: 'border-blue-500/40',
  purple: 'border-purple-500/40',
  orange: 'border-orange-500/40',
  default: 'border-slate-700',
}
const colorTextMap: Record<string, string> = {
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  default: 'text-slate-300',
}

function StageBox({ n, name, sub, color = 'default' }: { n: number; name: string; sub: string; color?: string }) {
  const border = colorBorderMap[color] ?? colorBorderMap.default
  const text = colorTextMap[color] ?? colorTextMap.default
  return (
    <div className={`bg-slate-800 border rounded-lg p-3 w-32 shrink-0 ${border}`}>
      <div className={`text-xs font-bold font-mono mb-1 ${text}`}>Etapa {n}</div>
      <div className="text-white text-xs font-semibold leading-tight">{name}</div>
      <div className="text-slate-500 text-[10px] mt-1 leading-tight">{sub}</div>
    </div>
  )
}

function StageCard({ stage }: { stage: typeof stages[0] }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 bg-slate-900 hover:bg-slate-800/60 transition text-left"
      >
        <span className="size-7 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
          {stage.n}
        </span>
        <div className="flex-1">
          <span className="text-white font-medium">{stage.name}</span>
          <span className="text-slate-500 text-sm ml-2">— {stage.short}</span>
        </div>
        {open ? (
          <ChevronDown className="size-4 text-slate-500 shrink-0" />
        ) : (
          <ChevronRight className="size-4 text-slate-500 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 bg-slate-900/50 border-t border-slate-800">
          {stage.detail.split('\n').map((line, i) => (
            <p key={i} className={`text-slate-400 text-sm leading-relaxed ${i > 0 ? 'mt-2' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PipelinePage() {
  return (
    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
      <LearnNav />

      <div className="flex-1 min-w-0 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/learn" className="hover:text-slate-300 transition">Metodologia SERA</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-300">O Pipeline</span>
        </nav>

        <div>
          <h1 className="text-3xl font-bold text-white">O Pipeline de Análise SERA</h1>
          <p className="text-slate-400 mt-2">
            Como um relato de evento se transforma em diagnóstico estruturado em 7 etapas.
          </p>
        </div>

        {/* O que é */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">O que é o Pipeline</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            O pipeline SERA é uma sequência de 7 etapas de análise que transforma o relato bruto de
            um evento em uma classificação estruturada de falhas humanas. Cada etapa faz uma pergunta
            específica sobre o evento e produz um resultado que alimenta a etapa seguinte.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            O processo é determinístico: o mesmo evento, analisado com os mesmos dados, deve sempre
            produzir o mesmo resultado. Isso garante que diferentes analistas — ou a mesma IA em
            momentos diferentes — cheguem às mesmas conclusões.
          </p>
        </section>

        {/* Diagrama */}
        <section>
          <h2 className="text-white font-semibold mb-3">Fluxo Visual</h2>
          <PipelineDiagram />
        </section>

        {/* Cards por etapa */}
        <section>
          <h2 className="text-white font-semibold mb-4">Detalhes de cada etapa</h2>
          <div className="space-y-3">
            {stages.map((stage) => (
              <StageCard key={stage.n} stage={stage} />
            ))}
          </div>
        </section>

        {/* Pré-condições */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">Pré-condições</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Além das falhas P/O/A, cada análise identifica pré-condições — fatores que tornaram o
            ambiente propício para o erro. Elas não causam o evento diretamente, mas criam as
            condições para que a falha ocorra.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Exemplos: P2 (condição psicológica adversa), T1 (treinamento insuficiente), W3 (condições
            ambientais adversas).
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            As pré-condições são importantes porque revelam o que a organização precisa corrigir
            sistematicamente — não apenas nos indivíduos, mas nos processos e no ambiente de trabalho.
          </p>
        </section>
      </div>
    </div>
  )
}
