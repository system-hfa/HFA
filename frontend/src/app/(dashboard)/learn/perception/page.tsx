'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { LearnNav } from '@/components/learn/LearnNav'
import { CodeBadge } from '@/components/learn/CodeBadge'
import { DecisionFlow, type FlowNode, type FlowResult } from '@/components/learn/DecisionFlow'

const nodes: FlowNode[] = [
  {
    id: 'n1',
    question: 'A avaliação da situação foi CORRETA?',
    yes: 'P-A',
    no: 'n2',
  },
  {
    id: 'n2',
    question: 'O operador tinha CAPACIDADE sensorial e perceptual?',
    yes: 'n3',
    no: 'n2b',
  },
  {
    id: 'n2b',
    question: 'A limitação era FÍSICA (visão, audição, sensação)?',
    criterion: 'P-B: limitação física ou ambiental. P-C: falta de conhecimento para interpretar o sinal.',
    yes: 'P-B',
    no: 'P-C',
  },
  {
    id: 'n3',
    question: 'A PRESSÃO DO TEMPO era excessiva?',
    yes: 'n3b',
    no: 'n4',
  },
  {
    id: 'n3b',
    question: 'A pressão foi EXTERNAMENTE imposta pela situação?',
    criterion: 'P-D: situação impôs urgência. P-E: operador criou a própria pressa.',
    yes: 'P-D',
    no: 'P-E',
  },
  {
    id: 'n4',
    question: 'A informação disponível era ILUSÓRIA ou AMBÍGUA?',
    yes: 'P-F',
    no: 'n5',
  },
  {
    id: 'n5',
    question: 'A informação estava DISPONÍVEL e CORRETA mas não foi assimilada?',
    criterion: 'SIM: operador ignorou info acessível (P-G). NÃO: a info simplesmente não chegou até ele (P-H).',
    yes: 'P-G',
    no: 'P-H',
  },
]

const results: Record<string, FlowResult> = {
  'P-A': { label: 'Nenhuma falha de percepção', description: 'O operador percebeu a situação corretamente. A falha está em outro nível (objetivo ou ação).' },
  'P-B': { label: 'Falha sensorial', description: 'O operador não conseguiu detectar estímulos essenciais por limitação física ou condição ambiental.' },
  'P-C': { label: 'Falha de conhecimento/percepção', description: 'O operador tinha os sentidos intactos mas não tinha o conhecimento para interpretar o que percebia.' },
  'P-D': { label: 'Falha de atenção — pressão externa', description: 'A pressão de tempo, imposta pela situação, capturou a atenção do operador impedindo que ele percebesse informações críticas.' },
  'P-E': { label: 'Gerenciamento de tempo', description: 'O operador CRIOU a pressão de tempo por suas próprias decisões e atitudes, impedindo percepção adequada.' },
  'P-F': { label: 'Informação ilusória', description: 'A informação disponível era enganosa, ambígua ou contraditória, levando a uma percepção incorreta mesmo com atenção adequada.' },
  'P-G': { label: 'Falha de atenção — info disponível', description: 'A informação estava disponível e correta, mas o operador não a assimilou por distração, viés ou negligência.' },
  'P-H': { label: 'Falha de comunicação', description: 'A informação necessária não estava disponível ou estava incorreta por falhas no processo de comunicação.' },
}

const glossary = [
  {
    code: 'P-A',
    name: 'Nenhuma falha',
    when: 'Percepção correta. A falha está em O ou A.',
    example: 'Piloto sabia que visibilidade estava abaixo dos mínimos e decidiu decolar mesmo assim.',
    preconditions: null,
  },
  {
    code: 'P-B',
    name: 'Falha sensorial',
    when: 'Limitação física ou ambiental impediu detecção do estímulo.',
    example: 'Piloto não viu obstáculo por névoa intensa.',
    preconditions: 'P1 (fisiológico), W3 (ambiente)',
  },
  {
    code: 'P-C',
    name: 'Falha de conhecimento',
    when: 'Detectou o sinal mas não soube interpretá-lo.',
    example: 'Piloto em adaptação não reconheceu comportamento normal do flight director acoplado.',
    preconditions: 'P6 (seleção/treinamento), T1',
  },
  {
    code: 'P-D',
    name: 'Falha de atenção (pressão externa)',
    when: 'Tempo objetivamente insuficiente imposto pela situação.',
    example: 'Piloto focado em localizar plataforma não monitorou instrumentos e não percebeu queda de velocidade.',
    preconditions: 'P5 (prontidão), S3 (supervisão)',
  },
  {
    code: 'P-E',
    name: 'Gerenciamento de tempo',
    when: 'A urgência foi autoimposta pelo próprio operador.',
    example: 'Piloto impaciente que criou urgência para decolar em condições adversas por ansiedade pessoal.',
    preconditions: 'P2 (psicológico), P5',
  },
  {
    code: 'P-F',
    name: 'Informação ilusória',
    when: 'Dados enganosos ou ambíguos induziram percepção errada.',
    example: 'Desorientação espacial — piloto percebeu estar em voo nivelado enquanto a aeronave curvava.',
    preconditions: 'W1 (tecnológico), W3 (ambiente)',
  },
  {
    code: 'P-G',
    name: 'Falha de atenção (info disponível)',
    when: 'Info acessível e correta, mas operador não a buscou ou ignorou.',
    example: 'Piloto ignorou indicadores contrários à sua avaliação inicial por viés de confirmação.',
    preconditions: 'P2 (psicológico), P5',
  },
  {
    code: 'P-H',
    name: 'Falha de comunicação',
    when: 'Info necessária não chegou ao operador ou chegou errada.',
    example: 'Piloto não recebeu atualização meteorológica correta e percebeu erroneamente as condições.',
    preconditions: 'S4 (comunicação), W4 (equipe)',
  },
]

export default function PerceptionPage() {
  return (
    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
      <LearnNav />

      <div className="flex-1 min-w-0 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/learn" className="hover:text-slate-300 transition">Metodologia SERA</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-300">Falhas de Percepção</span>
        </nav>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-white">Falhas de Percepção</h1>
            <span className="text-sm text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded">Etapa 3</span>
          </div>
          <p className="text-slate-400 mt-1">O que o operador acreditava estar acontecendo no momento da decisão.</p>
        </div>

        {/* Introdução */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            A percepção é o processo pelo qual o operador coleta e interpreta informações do ambiente
            para tomar decisões. Uma falha de percepção significa que o operador tinha uma
            representação mental incorreta ou incompleta da situação no momento em que tomou a
            decisão do Ponto de Fuga.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-white font-medium">Importante:</span> a análise parte da perspectiva
            do operador, não do observador externo. A pergunta não é &quot;o que estava realmente
            acontecendo&quot;, mas &quot;o que o operador acreditava estar acontecendo&quot;.
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

        {/* Armadilhas */}
        <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-amber-400 font-semibold mb-4">Armadilhas Comuns</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Confundir P-D com P-E',
                desc: 'A diferença está em QUEM criou a pressão de tempo. Se a situação impôs — P-D. Se o operador criou — P-E.',
              },
              {
                title: 'Usar P-G quando a info não estava disponível',
                desc: 'P-G só se aplica quando a informação ESTAVA acessível e o operador não a buscou. Se não estava disponível — P-H.',
              },
              {
                title: 'Classificar como P-B por ambiente ruim',
                desc: 'Se o operador tinha condição sensorial mas o ambiente dificultou — considere P-F (informação ilusória) ou P-D (pressão de tempo ambiental).',
              },
            ].map((trap, i) => (
              <div key={i}>
                <p className="text-white font-medium text-sm">{i + 1}. {trap.title}</p>
                <p className="text-slate-400 text-sm mt-1">{trap.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
