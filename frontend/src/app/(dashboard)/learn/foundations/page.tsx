'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { LearnNav } from '@/components/learn/LearnNav'
import { CodeBadge } from '@/components/learn/CodeBadge'

/* ── Navegação interna ─────────────────────────────────────── */
const anchors = [
  { id: 'problema',   label: '1. O problema com a investigação tradicional' },
  { id: 'ip',         label: '2. Teoria do Processamento da Informação' },
  { id: 'pct',        label: '3. Teoria do Controle Perceptual' },
  { id: 'integracao', label: '4. Como as teorias se integram no SERA' },
  { id: 'hfacs',      label: '5. SERA vs. HFACS' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ── Componentes visuais ───────────────────────────────────── */
function SectionBadge({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
      {text}
    </span>
  )
}

function PressureFormula() {
  return (
    <div className="my-6 flex justify-center">
      <div className="bg-slate-800 border border-slate-600 rounded-xl px-8 py-6 text-center">
        <p className="text-slate-400 text-sm mb-3 font-medium">Fórmula da Pressão de Tempo</p>
        <p className="text-white text-lg font-semibold mb-2">Pressão de Tempo =</p>
        <div className="flex flex-col items-center gap-1">
          <p className="text-blue-300 text-base font-medium">Quantidade de Informação</p>
          <div className="w-48 h-px bg-slate-500 my-1" />
          <p className="text-slate-300 text-base font-medium">Tempo Disponível</p>
        </div>
      </div>
    </div>
  )
}

function IPPrinciple({
  n, title, body, codes,
}: {
  n: number; title: string; body: string; codes: string[]
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="flex items-start gap-3 mb-2">
        <span className="size-6 rounded-full bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          {n}
        </span>
        <p className="text-white font-semibold">{title}</p>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed ml-9 mb-3">{body}</p>
      <div className="ml-9 flex flex-wrap gap-1.5 items-center">
        <span className="text-slate-500 text-xs">Relevância SERA:</span>
        {codes.map((c) => <CodeBadge key={c} code={c} size="sm" />)}
      </div>
    </div>
  )
}

function ClosedLoopSVG() {
  return (
    <div className="my-6 flex justify-center overflow-x-auto">
      <svg
        viewBox="0 0 560 160"
        className="w-full max-w-xl"
        aria-label="Diagrama do laço fechado PCT"
      >
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Boxes */}
        {[
          { x: 10,  y: 60, w: 80,  label: 'META',      sub: 'estado desejado' },
          { x: 140, y: 60, w: 100, label: 'COMPARADOR', sub: 'discrepância?' },
          { x: 290, y: 60, w: 80,  label: 'AÇÃO',       sub: 'comportamento' },
          { x: 420, y: 60, w: 120, label: 'AMBIENTE',   sub: 'estado do mundo' },
        ].map((b) => (
          <g key={b.label}>
            <rect x={b.x} y={b.y} width={b.w} height={40} rx={6}
              fill="#1e293b" stroke="#334155" strokeWidth={1.5} />
            <text x={b.x + b.w / 2} y={b.y + 15} textAnchor="middle"
              fill="white" fontSize={10} fontWeight="600">{b.label}</text>
            <text x={b.x + b.w / 2} y={b.y + 28} textAnchor="middle"
              fill="#94a3b8" fontSize={8}>{b.sub}</text>
          </g>
        ))}

        {/* PERCEPÇÃO box — bottom */}
        <rect x={280} y={118} width={100} height={34} rx={6}
          fill="#1e2d3d" stroke="#3b82f6" strokeWidth={1.5} />
        <text x={330} y={133} textAnchor="middle" fill="#93c5fd" fontSize={10} fontWeight="600">PERCEPÇÃO</text>
        <text x={330} y={145} textAnchor="middle" fill="#64748b" fontSize={8}>estado percebido</text>

        {/* Arrows: META → COMPARADOR */}
        <line x1={90} y1={80} x2={138} y2={80} stroke="#64748b" strokeWidth={1.5} markerEnd="url(#arrow)" />
        {/* COMPARADOR → AÇÃO */}
        <line x1={240} y1={80} x2={288} y2={80} stroke="#64748b" strokeWidth={1.5} markerEnd="url(#arrow)" />
        {/* AÇÃO → AMBIENTE */}
        <line x1={370} y1={80} x2={418} y2={80} stroke="#64748b" strokeWidth={1.5} markerEnd="url(#arrow)" />
        {/* AMBIENTE → PERCEPÇÃO (down then left) */}
        <polyline points="480,100 480,135 382,135" fill="none" stroke="#3b82f6" strokeWidth={1.5} markerEnd="url(#arrow)" />
        {/* PERCEPÇÃO → COMPARADOR (up) */}
        <polyline points="280,135 190,135 190,102" fill="none" stroke="#3b82f6" strokeWidth={1.5} markerEnd="url(#arrow)" />
      </svg>
    </div>
  )
}

/* ── Tabela de integração ──────────────────────────────────── */
const integrationRows = [
  { etapa: 'Etapa 3 — Percepção', teoria: 'IP + PCT', pergunta: 'O que o operador percebia?', mecanismo: 'Processamento da informação' },
  { etapa: 'Etapa 4 — Objetivo',  teoria: 'PCT',      pergunta: 'O que o operador buscava?',  mecanismo: 'Controle perceptual' },
  { etapa: 'Etapa 5 — Ação',      teoria: 'IP',       pergunta: 'Como o operador agiu?',       mecanismo: 'Execução cognitiva' },
]

/* ── Tabela SERA vs HFACS ──────────────────────────────────── */
const comparisonRows = [
  { dim: 'Abordagem',         hfacs: 'Taxonomia de causas',           sera: 'Análise de processo cognitivo' },
  { dim: 'Pergunta central',  hfacs: 'O que causou?',                 sera: 'Por que o operador agiu assim?' },
  { dim: 'Base teórica',      hfacs: 'Queijo suíço (Reason)',         sera: 'IP + PCT (Hendy)' },
  { dim: 'Resultado',         hfacs: 'Categoria de falha',            sera: 'Mecanismo cognitivo específico' },
  { dim: 'Ação preventiva',   hfacs: 'Genérica por categoria',        sera: 'Específica ao mecanismo' },
  { dim: 'Determinismo',      hfacs: 'Múltiplas classificações possíveis', sera: 'Fluxo lógico único' },
  { dim: 'Uso em IA',         hfacs: 'Difícil (subjetivo)',           sera: 'Natural (fluxo de decisão)' },
  { dim: 'Granularidade P',   hfacs: '4 níveis (Unsafe Acts…)',       sera: '8 códigos + pré-condições' },
  { dim: 'Granularidade A',   hfacs: 'Limitada',                     sera: '10 códigos específicos' },
  { dim: 'Previsibilidade',   hfacs: 'Baixa (depende do analista)',   sera: 'Alta (processo estruturado)' },
]

const references = [
  'Hendy, K.C. (2003). A tool for human factors accident investigation, classification and risk management. Defence R&D Canada — Toronto. Technical Report.',
  'Daumas, F.P. (2018). Análise de Fatores Humanos em Incidentes na Aviação Offshore. Dissertação de Mestrado. Universidade Federal do Rio de Janeiro.',
  'Powers, W.T. (1973). Behavior: The Control of Perception. Aldine de Gruyter.',
  'Reason, J. (1990). Human Error. Cambridge University Press.',
  'Wiegmann, D.A., & Shappell, S.A. (2003). A Human Error Approach to Aviation Accident Analysis: The Human Factors Analysis and Classification System. Ashgate Publishing.',
]

/* ── Página ────────────────────────────────────────────────── */
export default function FoundationsPage() {
  return (
    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
      <LearnNav />

      <div className="flex-1 min-w-0 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/learn" className="hover:text-slate-300 transition">Metodologia SERA</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-300">Bases Científicas</span>
        </nav>

        {/* Hero */}
        <div>
          <h1 className="text-3xl font-bold text-white">Bases Científicas do SERA</h1>
          <p className="text-slate-400 mt-2">
            Por que esta metodologia funciona — e por que é superior às alternativas.
          </p>
        </div>

        {/* Navegação interna */}
        <nav className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Nesta página</p>
          <ol className="space-y-1.5">
            {anchors.map((a) => (
              <li key={a.id}>
                <button
                  onClick={() => scrollTo(a.id)}
                  className="text-slate-400 hover:text-white text-sm transition text-left"
                >
                  {a.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Seção 1 ─────────────────────────────────────── */}
        <section id="problema" className="scroll-mt-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
            <h2 className="text-white text-xl font-bold">Por que &quot;erro humano&quot; não é uma resposta</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Durante décadas, investigações de acidentes encerravam-se com a conclusão &quot;erro humano&quot; — como se
              isso explicasse alguma coisa. Mas dizer que um acidente foi causado por erro humano é como dizer que
              uma queda foi causada pela gravidade: tecnicamente verdadeiro, completamente inútil para prevenir o
              próximo acidente.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              O problema é que &quot;erro humano&quot; é uma descrição, não uma explicação. Ela não responde: por que o
              operador errou? Quais condições tornaram o erro provável? O que a organização poderia ter feito diferente?
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              A investigação eficaz precisa ir além da descrição e identificar os mecanismos cognitivos que produziram
              o erro — e é exatamente aí que entra a ciência do processamento de informação e o controle perceptual.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 mt-4">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                &quot;Labeling an event as &apos;human error&apos; provides no useful information about why the error
                occurred or how to prevent it from occurring again.&quot;
              </p>
              <p className="text-slate-500 text-xs mt-2">— K.C. Hendy, SERA (2003)</p>
            </blockquote>
          </div>
        </section>

        {/* ── Seção 2 ─────────────────────────────────────── */}
        <section id="ip" className="scroll-mt-6 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-xl font-bold">Teoria do Processamento da Informação</h2>
            <SectionBadge text="Fundamento 1" />
          </div>
          <p className="text-slate-400 text-sm font-medium">
            Como o cérebro humano processa informações sob pressão operacional
          </p>

          <p className="text-slate-400 text-sm leading-relaxed">
            O modelo de Processamento da Informação (Information Processing — IP) descreve como operadores humanos
            coletam, interpretam e respondem a informações do ambiente. É a base científica que explica por que
            operadores erram mesmo quando são experientes, treinados e motivados.
          </p>

          <div>
            <h3 className="text-white font-semibold mb-2">A fórmula da pressão de tempo</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              O insight central do modelo IP é surpreendentemente elegante: a produção de erros é uma função direta
              da pressão de tempo percebida pelo operador. E a pressão de tempo é determinada por uma relação simples:
            </p>
            <PressureFormula />
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Quando a quantidade de informação que precisa ser processada supera o tempo disponível para
              processá-la, o operador entra em um estado de sobrecarga cognitiva. Nesse estado, ocorrem erros — não
              por falta de competência, mas por uma limitação física do sistema cognitivo humano.
            </p>
            <p className="text-slate-400 text-sm mb-2">Esta fórmula explica por que:</p>
            <ul className="space-y-1 ml-4">
              {[
                'Pilotos experientes cometem erros em situações de emergência',
                'Controladores de tráfego aéreo erram em picos de movimento',
                'Médicos fazem diagnósticos incorretos em prontos-socorros lotados',
              ].map((item) => (
                <li key={item} className="text-slate-400 text-sm flex items-start gap-2">
                  <span className="text-slate-600 mt-1 shrink-0">—</span>{item}
                </li>
              ))}
            </ul>
            <p className="text-slate-400 text-sm mt-3 italic">
              Não é falha moral ou incompetência — é física cognitiva.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Os cinco princípios IP relevantes para o SERA</h3>
            <div className="space-y-3">
              <IPPrinciple
                n={1}
                title="Equilíbrio Velocidade-Precisão"
                body="Velocidade e precisão estão em equilíbrio dinâmico. Quando um operador precisa agir rápido, a precisão diminui. Quando precisa ser preciso, a velocidade diminui. Em situações de emergência, o operador instintivamente sacrifica precisão por velocidade — com consequências previsíveis."
                codes={['P-D', 'P-E', 'A-H', 'A-I']}
              />
              <IPPrinciple
                n={2}
                title="Degradação Sob Pressão"
                body="Sob alta pressão de tempo, o desempenho cognitivo se degrada de forma sistemática e previsível. O operador passa a usar heurísticas (atalhos mentais) em vez de análise cuidadosa. Essas heurísticas funcionam na maioria das situações — mas falham exatamente nas situações anômalas, que são exatamente as que geram acidentes."
                codes={['O-B', 'O-D', 'A-F']}
              />
              <IPPrinciple
                n={3}
                title="A Ignorância Não é Uma Benção"
                body="A falta de conhecimento é invisível ao próprio operador. Um piloto que não conhece um sistema não sabe que não conhece — sua percepção da situação parece completa e coerente mesmo quando é fundamentalmente errada. Este fenômeno é conhecido como 'incompetência inconsciente'."
                codes={['P-C', 'A-E']}
              />
              <IPPrinciple
                n={4}
                title="Gestão de Recursos Atencionais"
                body="A atenção humana é um recurso finito. Em situações complexas, o operador prioriza inconscientemente certos estímulos em detrimento de outros. Esta priorização é influenciada por treinamento, experiência e estado emocional — e pode desviar a atenção de informações críticas."
                codes={['P-G', 'A-C', 'A-G']}
              />
              <IPPrinciple
                n={5}
                title="Feedback como Mecanismo de Correção"
                body="O aprendizado e a correção de erros dependem de feedback imediato e claro. Quando o feedback está ausente, atrasado ou ambíguo, o operador não consegue detectar que está cometendo um erro — e o erro se propaga."
                codes={['A-C', 'A-G', 'A-J', 'P-H']}
              />
            </div>
          </div>
        </section>

        {/* ── Seção 3 ─────────────────────────────────────── */}
        <section id="pct" className="scroll-mt-6 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-xl font-bold">Teoria do Controle Perceptual</h2>
            <SectionBadge text="Fundamento 2" />
          </div>
          <p className="text-slate-400 text-sm font-medium">
            Por que operadores agem da forma como agem — mesmo quando está &quot;obviamente&quot; errado para o
            observador externo
          </p>

          <p className="text-slate-400 text-sm leading-relaxed">
            A Teoria do Controle Perceptual (Perceptual Control Theory — PCT), desenvolvida por W.T. Powers, propõe
            um modelo radicalmente diferente de como organismos vivos se comportam. Ao contrário das teorias
            behavioristas que viam o comportamento como resposta a estímulos externos, a PCT afirma que o
            comportamento é dirigido por estados internos perceptuais — metas que o organismo está ativamente
            tentando alcançar.
          </p>

          <div>
            <h3 className="text-white font-semibold mb-3">O modelo do laço fechado</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-2">
              Na PCT, operadores humanos funcionam como sistemas de controle em laço fechado:
            </p>
            <ol className="space-y-1.5 ml-4 mb-2">
              {[
                'O operador tem uma META PERCEPTUAL — como quer que a situação pareça',
                'O operador PERCEBE o estado atual do mundo',
                'O operador COMPARA percepção com meta',
                'Se há DISCREPÂNCIA, o operador age para reduzi-la',
                'A ação muda o estado do mundo',
                'O ciclo se repete continuamente',
              ].map((step, i) => (
                <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                  <span className="text-blue-400 font-mono text-xs shrink-0 mt-0.5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              Este modelo tem uma implicação profunda: o operador não está &quot;reagindo ao ambiente&quot; — está
              controlando ativamente sua percepção do ambiente para corresponder às suas metas internas.
            </p>
            <ClosedLoopSVG />
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">A implicação para investigação de acidentes</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              A PCT explica um fenômeno que intriga investigadores: como operadores experientes cometem erros que
              parecem &quot;óbvios&quot; para quem observa de fora?
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              A resposta: o observador externo e o operador têm percepções diferentes da situação. O operador está
              agindo de forma perfeitamente racional — dado o que ele percebe. O problema não é a lógica da ação,
              mas a percepção que a fundamentou.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Isso tem uma consequência direta para investigação: culpar o operador pela &quot;má decisão&quot; é inútil.
              A pergunta correta é: por que o operador percebeu a situação dessa forma? Que condições produziram
              essa percepção incorreta?
            </p>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                Esta pergunta — &quot;o que o operador acreditava estar acontecendo?&quot; — é exatamente a pergunta
                central da <strong>Etapa 3 do SERA</strong>.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">PCT e a Etapa 4 do SERA</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              A PCT também fundamenta a análise de objetivo (Etapa 4). Segundo a teoria, operadores não perseguem
              objetivos abstratos — perseguem estados perceptuais específicos. Um piloto que viola procedimentos não
              está &quot;sendo irresponsável&quot; de forma abstrata — está buscando um estado perceptual específico:
              &quot;chegar a tempo&quot;, &quot;não decepcionar o chefe&quot;, &quot;provar que pode fazer&quot;.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Isso explica a distinção crítica do SERA entre{' '}
              <CodeBadge code="O-B" size="sm" /> (violação rotineira — &quot;fazemos assim normalmente&quot;) e{' '}
              <CodeBadge code="O-C" size="sm" /> (violação excepcional/circunstancial — &quot;fiz diferente desta vez&quot;):
              na violação rotineira, o estado perceptual buscado é normalizado e reforçado pela organização — o desvio
              é habitual e tolerado. Na excepcional, o operador desviou conscientemente de regra ou procedimento
              de forma pontual e não rotineira — não é seu comportamento habitual nem prática da equipe.
            </p>
          </div>
        </section>

        {/* ── Seção 4 ─────────────────────────────────────── */}
        <section id="integracao" className="scroll-mt-6 space-y-6">
          <h2 className="text-white text-xl font-bold">IP + PCT: a fundação do SERA</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            A genialidade metodológica do SERA está em integrar IP e PCT em um único framework de investigação.
            Cada etapa do pipeline corresponde a uma dimensão específica dessas teorias:
          </p>
          <div className="text-slate-400 text-sm space-y-3">
            {[
              {
                stage: 'Etapa 3 (Percepção)',
                base: 'IP + PCT',
                body: 'A PCT define o que perguntar ("o que o operador percebia?") e o IP explica por que a percepção pode ter falhado (sobrecarga, ausência de conhecimento, informação ambígua).',
              },
              {
                stage: 'Etapa 4 (Objetivo)',
                base: 'PCT',
                body: 'O objetivo é a "meta perceptual" que o operador estava controlando. A análise de se essa meta era consistente com normas é uma análise de se as metas perceptuais do operador estavam alinhadas com as expectativas organizacionais.',
              },
              {
                stage: 'Etapa 5 (Ação)',
                base: 'IP',
                body: 'A execução da ação é onde o modelo IP é mais diretamente aplicável — deslizes, lapsos, erros de seleção e falhas de feedback são todos mecanismos descritos pelo modelo IP.',
              },
            ].map((r) => (
              <div key={r.stage} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-semibold text-sm">{r.stage}</span>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">{r.base}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium">Etapa SERA</th>
                  <th className="text-left px-4 py-3 font-medium">Base teórica</th>
                  <th className="text-left px-4 py-3 font-medium">Pergunta central</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Mecanismo</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {integrationRows.map((r, i) => (
                  <tr key={i} className="border-b border-slate-800/50 last:border-0">
                    <td className="px-4 py-3 text-slate-300 font-medium">{r.etapa}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">{r.teoria}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 italic">{r.pergunta}</td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{r.mecanismo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Seção 5 ─────────────────────────────────────── */}
        <section id="hfacs" className="scroll-mt-6 space-y-6">
          <div>
            <h2 className="text-white text-xl font-bold">SERA vs. HFACS</h2>
            <p className="text-slate-400 text-sm mt-1">
              Por que o SERA é superior para investigação e gestão de risco organizacional
            </p>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            O HFACS (Human Factors Analysis and Classification System), desenvolvido por Wiegmann e Shappell (2001)
            a partir do modelo &quot;queijo suíço&quot; de Reason (1990), é amplamente utilizado em investigações militares
            e civis nos EUA. É provavelmente a metodologia de fatores humanos mais conhecida no mundo.
          </p>

          {/* Tabela comparativa */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-500 text-xs uppercase tracking-wide bg-slate-800/50">
                  <th className="text-left px-4 py-3 font-medium">Dimensão</th>
                  <th className="text-left px-4 py-3 font-medium text-red-400/80">HFACS</th>
                  <th className="text-left px-4 py-3 font-medium text-green-400/80">SERA</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900 border border-slate-800 rounded-xl">
                {comparisonRows.map((r, i) => (
                  <tr key={i} className="border-b border-slate-800/50 last:border-0">
                    <td className="px-4 py-3 text-slate-400 font-medium text-xs">{r.dim}</td>
                    <td className="px-4 py-3 text-red-400/80 text-sm bg-red-500/5">{r.hfacs}</td>
                    <td className="px-4 py-3 text-green-400/80 text-sm bg-green-500/5">{r.sera}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-white font-semibold">A limitação fundamental do HFACS</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              O HFACS classifica ONDE na organização ocorreu a falha (atos inseguros → precondições → supervisão →
              organização). Isso é útil para identificar camadas organizacionais, mas não responde à pergunta mais
              importante para prevenção: por qual mecanismo cognitivo específico o operador falhou?
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dois operadores podem ser classificados da mesma forma no HFACS (&quot;Skill-based Error&quot;) por razões
              completamente diferentes — um por falta de treinamento, outro por sobrecarga cognitiva, outro por
              informação ambígua. A ação preventiva para cada caso é radicalmente diferente.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              O SERA, ao seguir o mecanismo cognitivo (IP e PCT), garante que a classificação final reflita o
              processo que produziu o erro — não apenas a categoria do resultado.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-white font-semibold">Por que o SERA é ideal para sistemas de IA</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              O HFACS depende do julgamento subjetivo do analista para categorizar eventos. Dois analistas podem
              chegar a classificações diferentes para o mesmo evento — o que compromete a comparabilidade dos dados
              ao longo do tempo.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              O SERA usa um fluxo de decisão lógico com perguntas binárias (sim/não) em cada nó. Isso tem duas
              consequências:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-800/60 rounded-lg p-4">
                <p className="text-white text-sm font-semibold mb-1">1. Determinismo</p>
                <p className="text-slate-400 text-sm">O mesmo evento, analisado com os mesmos dados, deve sempre produzir o mesmo resultado — independente do analista ou do sistema de IA.</p>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-4">
                <p className="text-white text-sm font-semibold mb-1">2. Compatibilidade com sistemas assistidos</p>
                <p className="text-slate-400 text-sm">Um sistema de IA pode seguir o fluxo de decisão exatamente como um analista humano — o que é a base do pipeline HFA.</p>
              </div>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mt-2">
              <p className="text-blue-300 text-sm">
                Esta característica — determinismo via fluxo lógico — é o que torna o SERA fundamentalmente
                adequado para sistemas assistidos de análise e investigação.
              </p>
            </div>
          </div>

          {/* Quando usar cada um */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quando usar cada metodologia</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-red-500/20 rounded-xl p-5">
                <p className="text-red-400/80 font-semibold text-sm mb-3">USE HFACS quando:</p>
                <ul className="space-y-1.5">
                  {[
                    'A investigação precisa de resultado rápido',
                    'O objetivo é relatório regulatório (algumas autoridades exigem HFACS)',
                    'A equipe já tem treinamento HFACS consolidado',
                    'O foco é mapeamento organizacional por camadas',
                  ].map((item) => (
                    <li key={item} className="text-slate-400 text-sm flex items-start gap-2">
                      <span className="text-slate-600 shrink-0 mt-0.5">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-900 border border-green-500/20 rounded-xl p-5">
                <p className="text-green-400/80 font-semibold text-sm mb-3">USE SERA quando:</p>
                <ul className="space-y-1.5">
                  {[
                    'O objetivo é prevenção eficaz (não apenas compliance)',
                    'Precisa identificar o mecanismo cognitivo específico',
                    'Vai usar os dados para gestão de risco longitudinal',
                    'Está implementando análise automatizada por IA',
                    'Quer comparabilidade de dados ao longo do tempo',
                  ].map((item) => (
                    <li key={item} className="text-slate-400 text-sm flex items-start gap-2">
                      <span className="text-slate-600 shrink-0 mt-0.5">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Referências ─────────────────────────────────── */}
        <section className="border-t border-slate-800 pt-8">
          <h2 className="text-white font-semibold mb-4">Referências</h2>
          <ol className="space-y-2">
            {references.map((ref, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-500 text-xs leading-relaxed">
                <span className="shrink-0 text-slate-600">{i + 1}.</span>
                <span>{ref}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
