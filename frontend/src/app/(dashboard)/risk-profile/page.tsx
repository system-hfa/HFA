'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { OrgScoreCard } from '@/components/sera/OrgScoreCard'
import { AiInsightPanel } from '@/components/sera/AiInsightPanel'

interface Intelligence {
  score: { value: number; level: 'critical' | 'warning' | 'ok'; label: string }
  distribution: {
    perception: { count: number; pct: number; top_code: string | null; top_codes: { code: string; count: number }[] }
    objective: { count: number; pct: number; top_code: string | null; top_codes: { code: string; count: number }[] }
    action: { count: number; pct: number; top_code: string | null; top_codes: { code: string; count: number }[] }
    total: number
  }
  top_preconditions: { code: string; count: number; pct: number; name: string }[]
  top_combinations: { pair: string; count: number; pct: number }[]
  actions: {
    open_total: number
    open_overdue: number
    open_no_owner: number
    closed_last_30d: number
    resolution_rate: number
  }
  trend: { month: string; count: number }[]
  alerts: string[]
  total_analyses: number
  total_events_90d: number
}

// ── Shared mapping constants ──────────────────────────────────────────────────

interface SeverityDef {
  level: number
  label: string
  justificativa: string
  base_cientifica: string
  fonte: string
}

const SEVERITY_MAP: Record<string, SeverityDef> = {
  'P-B': {
    level: 4,
    label: 'Grave',
    justificativa: 'Falha Sensorial (P-B) é classificada como Grave porque o operador não detectou estímulos físicos essenciais — visuais, auditivos ou táteis. Esta ausência de percepção sensorial básica elimina qualquer possibilidade de correção antes da ação, criando trajetória direta para o evento adverso.',
    base_cientifica: 'Segundo Hendy (2003), falhas sensoriais representam o nível mais fundamental de quebra no ciclo perceptual. Quando o input sensorial falha, nenhum processamento cognitivo posterior pode compensar — o operador age sobre uma representação completamente ausente da realidade.',
    fonte: 'Daumas (2018), Tabela 2; Hendy (2003), Annex A'
  },
  'P-C': {
    level: 3,
    label: 'Moderada',
    justificativa: 'Falha de Conhecimento (P-C) é classificada como Moderada porque o operador detectou os estímulos mas não tinha base cognitiva para interpretá-los. Existe potencial de correção via treinamento e experiência acumulada.',
    base_cientifica: 'O modelo de Processamento da Informação (Hendy, 2003) distingue entre falhas de detecção (sensoriais) e falhas de interpretação (conhecimento). Falhas de conhecimento são recuperáveis com intervenção organizacional — treinamento adequado pode eliminar a causa raiz.',
    fonte: 'Daumas (2018), Tabela 5; Hendy (2003), Annex A'
  },
  'P-D': {
    level: 3,
    label: 'Moderada',
    justificativa: 'Falha de Atenção com Pressão de Tempo (P-D) é Moderada porque a pressão temporal foi imposta externamente — a organização pode intervir reduzindo a demanda de processamento ou aumentando o tempo disponível.',
    base_cientifica: 'Hendy (2003) estabelece que Pressão de Tempo = Informação / Tempo. P-D ocorre quando o denominador (tempo) é insuficiente para o numerador (informação). Intervenções organizacionais podem aumentar o tempo disponível ou reduzir a quantidade de informação simultânea.',
    fonte: 'Hendy (2003), Figure 3; Daumas (2018), Tabela 2'
  },
  'P-E': {
    level: 3,
    label: 'Moderada',
    justificativa: 'Gerenciamento de Tempo (P-E) é Moderada porque a pressão foi autoimposta pelo operador. Embora reflita fatores psicológicos individuais, é tratável via avaliação comportamental e cultura organizacional de segurança.',
    base_cientifica: 'Na Teoria do Controle Perceptual (Powers, 1973; Hendy, 2003), P-E revela que o operador priorizou uma meta perceptual (velocidade, eficiência) sobre a meta de segurança. É corrigível mudando as metas organizacionais percebidas.',
    fonte: 'Hendy (2003), Figure 5; Daumas (2018)'
  },
  'P-F': {
    level: 4,
    label: 'Grave',
    justificativa: 'Informação Ilusória (P-F) é classificada como Grave porque o operador agiu racionalmente sobre uma percepção incorreta — o erro era invisível ao próprio operador. Não há mecanismo interno de detecção ou autocorreção.',
    base_cientifica: 'Segundo Hendy (2003) e a Teoria do Controle Perceptual, o operador em P-F compara sua percepção com sua meta e a ação parece correta — porque a percepção está corrompida. Isso torna P-F particularmente perigoso: o operador não tem como saber que está errado. Ilusões sensoriais (como desorientação espacial) eliminam qualquer feedback corretivo interno.',
    fonte: 'Hendy (2003), Annex A; Daumas (2018), Tabela 2'
  },
  'P-G': {
    level: 3,
    label: 'Moderada',
    justificativa: 'Falha de Atenção (P-G) é Moderada porque a informação estava disponível e correta — o operador falhou em selecioná-la. Intervenções de CRM, checklists e design de interface podem mitigar efetivamente.',
    base_cientifica: 'O modelo IP de Hendy (2003) inclui gestão de recursos atencionais como princípio central. P-G reflete má alocação de atenção em ambiente com múltiplos estímulos concorrentes — corrigível via treinamento CRM e redesign de procedimentos.',
    fonte: 'Hendy (2003), Annex A; Daumas (2018)'
  },
  'P-H': {
    level: 2,
    label: 'Menor',
    justificativa: 'Falha de Comunicação (P-H) é classificada como Menor porque a falha está no sistema de transferência de informação — não na capacidade do operador. O problema é externo ao indivíduo e corrigível via procedimentos de comunicação.',
    base_cientifica: 'Hendy (2003) posiciona falhas de comunicação como falhas latentes do sistema, não falhas ativas do operador. A informação necessária existia mas não chegou adequadamente — o operador não poderia ter agido diferente dado o que recebeu.',
    fonte: 'Hendy (2003), Annex A; Daumas (2018), Tabela 2'
  },
  'P-A': {
    level: 1,
    label: 'Negligível',
    justificativa: 'Sem falha de percepção — a contribuição desta etapa para o risco é mínima.',
    base_cientifica: 'A ausência de falha de percepção indica que o ciclo perceptual funcionou adequadamente. O risco deve ser avaliado nas etapas de Objetivo e Ação.',
    fonte: 'Hendy (2003), Annex A'
  },
}

const P_SEVERITY: Record<string, number> = Object.fromEntries(
  Object.entries(SEVERITY_MAP).map(([k, v]) => [k, v.level])
)

const ARMS_SEV_ROW: Record<string, 'A' | 'B' | 'C' | 'D'> = {
  'P-B': 'B', 'P-F': 'B',
  'P-A': 'D',
}

const ARMS_ERC: Record<string, number> = {
  A1: 5, A2: 5, A3: 4, A4: 3,
  B1: 4, B2: 4, B3: 3, B4: 2,
  C1: 3, C2: 3, C3: 2, C4: 1,
  D1: 2, D2: 2, D3: 1, D4: 1,
}

const ERC_COLOR: Record<number, string> = {
  5: '#DC2626', 4: '#EA580C', 3: '#D97706', 2: '#84CC16', 1: '#16A34A',
}

function tCellColor(score: number): string {
  if (score >= 17) return '#7F1D1D'
  if (score >= 10) return '#9A3412'
  if (score >= 5)  return '#854D0E'
  return '#166534'
}

function colorBg(hex: string, alpha = 0.2): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function riskLevelName(score: number): string {
  if (score >= 17) return 'Inaceitável'
  if (score >= 10) return 'Elevado'
  if (score >= 5)  return 'Tolerável'
  return 'Aceitável'
}

function riskMeaning(score: number): string {
  if (score >= 17) return 'Risco Inaceitável — Ação imediata obrigatória. Operação deve ser revista antes de continuar.'
  if (score >= 10) return 'Risco Elevado — Ação corretiva necessária em curto prazo. Priorizar intervenções preventivas.'
  if (score >= 5)  return 'Risco Tolerável — Requer atenção e plano de ação, mas não é urgente. Acompanhar evolução.'
  return 'Risco Aceitável — O risco está dentro dos limites toleráveis. Monitoramento periódico é suficiente.'
}

function acaoRecomendada(score: number): string {
  if (score >= 17) return 'intervenção imediata obrigatória'
  if (score >= 10) return 'ação corretiva prioritária em curto prazo'
  if (score >= 5)  return 'plano de ação planejado em médio prazo'
  return 'monitoramento periódico sem ação imediata'
}

function sevJustification(sev: number): string {
  if (sev === 4) return 'falhas sensoriais e ilusórias com alto potencial de dano'
  if (sev === 3) return 'falhas cognitivas com severidade controlável'
  if (sev === 2) return 'falhas de comunicação com menor impacto direto'
  return 'impacto mínimo na operação'
}

function barrierLevel(score: number): 1 | 2 | 3 | 4 {
  if (score >= 70) return 1
  if (score >= 40) return 2
  if (score >= 20) return 3
  return 4
}

// ── Traditional 5×5 Matrix ───────────────────────────────────────────────────

const CELL_SIZE = 56

const SEV_LABELS = [
  { num: '5', name: 'Catastrófica', desc: 'Fatalidades múltiplas ou perda total do equipamento' },
  { num: '4', name: 'Grave', desc: 'Fatalidade ou incapacidade permanente, dano grave' },
  { num: '3', name: 'Moderada', desc: 'Lesão grave ou dano significativo ao equipamento' },
  { num: '2', name: 'Menor', desc: 'Lesão leve, dano menor, impacto operacional limitado' },
  { num: '1', name: 'Negligível', desc: 'Sem lesão ou dano significativo, impacto mínimo' },
]

const PROB_LABELS = [
  { num: '1', name: 'Improvável', short: 'Impr.', desc: '< 10% das análises com este padrão' },
  { num: '2', name: 'Remoto',     short: 'Rem.',  desc: '10–25% das análises' },
  { num: '3', name: 'Ocasional',  short: 'Ocas.', desc: '25–50% das análises' },
  { num: '4', name: 'Provável',   short: 'Prov.', desc: '50–75% das análises' },
  { num: '5', name: 'Frequente',  short: 'Freq.', desc: '> 75% das análises' },
]

function countToProb(count: number, total: number): number {
  if (total === 0) return 1
  const pct = (count / total) * 100
  if (pct > 75) return 5
  if (pct > 50) return 4
  if (pct > 25) return 3
  if (pct > 10) return 2
  return 1
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function CellModal({ title, onClose, children }: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex items-start justify-between mb-5">
          <h2 className="text-white font-semibold text-lg leading-tight">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white ml-4 flex-shrink-0 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  )
}

// ── Traditional 5×5 component ─────────────────────────────────────────────────

interface TradCellInfo {
  prob: number
  sev: number
  score: number
  cell: { count: number; codes: string[] } | null
}

function TraditionalMatrix({ data }: { data: Intelligence }) {
  const [selected, setSelected] = useState<TradCellInfo | null>(null)

  const topCodes = data.distribution.perception.top_codes ?? []
  const cellMap: Record<string, { count: number; codes: string[] }> = {}
  for (const tc of topCodes) {
    const sev = P_SEVERITY[tc.code] ?? 3
    const prob = countToProb(tc.count, data.total_analyses)
    const key = `${prob}-${sev}`
    if (!cellMap[key]) cellMap[key] = { count: 0, codes: [] }
    cellMap[key].count += tc.count
    cellMap[key].codes.push(tc.code)
  }

  return (
    <div>
      {selected && (
        <CellModal
          title={`Risco ${riskLevelName(selected.score)} — Score ${selected.score}`}
          onClose={() => setSelected(null)}
        >
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">O que significa esta célula</p>
            <p className="text-slate-300 text-sm">{riskMeaning(selected.score)}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Como esta avaliação foi calculada</p>
            <div className="bg-slate-800 rounded-lg p-3 space-y-3">
              <p className="text-xs text-slate-400">
                Os eventos nesta célula foram classificados aqui pelo seguinte raciocínio:
              </p>

              <div>
                <p className="text-xs font-semibold text-white">
                  1. SEVERIDADE {selected.sev} ({SEV_LABELS.find((l) => l.num === String(selected.sev))?.name})
                </p>
                {selected.cell ? (
                  <p className="text-xs text-slate-400 mt-1">
                    Os códigos SERA {selected.cell.codes.join(', ')} indicam {sevJustification(selected.sev)}{' '}
                    segundo o mapeamento SERA → ISO 31000.
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-1">
                    {SEV_LABELS.find((l) => l.num === String(selected.sev))?.desc}
                  </p>
                )}
                {selected.cell && selected.cell.codes.map(code => {
                  const sevDef = SEVERITY_MAP[code]
                  if (!sevDef) return null
                  return (
                    <div key={code}
                      className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                          {code}
                        </span>
                        <span className="text-xs text-slate-300 font-medium">
                          Severidade {sevDef.level} — {sevDef.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">
                        {sevDef.justificativa}
                      </p>
                      <div className="border-t border-slate-700 pt-2 mt-2">
                        <p className="text-xs text-slate-500 leading-relaxed italic">
                          {sevDef.base_cientifica}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          Fonte: {sevDef.fonte}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  2. PROBABILIDADE {selected.prob} ({PROB_LABELS[selected.prob - 1].name})
                </p>
                {selected.cell ? (
                  <p className="text-xs text-slate-400 mt-1">
                    Foram encontrados {selected.cell.count} evento{selected.cell.count !== 1 ? 's' : ''} com este
                    padrão de falha nos dados analisados. A frequência observada corresponde ao nível {selected.prob} —{' '}
                    {PROB_LABELS[selected.prob - 1].name} — da escala ISO 31000.
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-1">
                    {PROB_LABELS[selected.prob - 1].desc}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  3. SCORE {selected.score} = {selected.prob} × {selected.sev}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Este valor coloca o risco na zona{' '}
                  <strong style={{ color: tCellColor(selected.score) }}>{riskLevelName(selected.score)}</strong>,
                  que requer {acaoRecomendada(selected.score)}.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Eventos nesta célula</p>
            {selected.cell ? (
              <div className="space-y-1">
                {selected.cell.codes.map((code) => (
                  <div key={code} className="flex items-center justify-between bg-slate-800 rounded px-3 py-2">
                    <span className="font-mono text-yellow-400 text-sm font-bold">{code}</span>
                    <span className="text-slate-400 text-xs">código SERA</span>
                  </div>
                ))}
                <p className="text-slate-500 text-xs mt-1">
                  Total: {selected.cell.count} análise{selected.cell.count !== 1 ? 's' : ''}
                </p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Nenhum evento foi classificado nesta célula.</p>
            )}
          </div>

          <div className="border-t border-slate-800 pt-4">
            <p className="text-slate-500 text-xs">
              Referência metodológica: Matriz de risco baseada em ISO 31000:2018 e ICAO Doc 9859 (Safety Management Manual), 4ª edição.
            </p>
          </div>
        </CellModal>
      )}

      <div className="overflow-x-auto">
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* SEVERIDADE vertical label + Y labels */}
          <div style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
            <div style={{
              width: 20,
              height: CELL_SIZE * 5 + 4 * 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: 10,
                letterSpacing: '0.15em',
                color: '#64748B',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transform: 'rotate(-90deg)',
                display: 'block',
              }}>SEVERIDADE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 8, flexShrink: 0 }}>
              {SEV_LABELS.map((l) => (
                <div key={l.num} style={{
                  height: CELL_SIZE,
                  width: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8' }}>{l.num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid + X labels */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(5, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(5, ${CELL_SIZE}px)`,
              gap: 2,
            }}>
              {SEV_LABELS.map((_, row) =>
                PROB_LABELS.map((_, col) => {
                  const prob = col + 1
                  const sev = 5 - row
                  const score = prob * sev
                  const color = tCellColor(score)
                  const key = `${prob}-${sev}`
                  const cell = cellMap[key]
                  return (
                    <div
                      key={`${row}-${col}`}
                      onClick={() => setSelected({ prob, sev, score, cell: cell ?? null })}
                      title={`Score ${score} — clique para detalhes`}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        background: colorBg(color, 0.2),
                        border: '1px solid #1E293B',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'filter 0.15s',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.filter = 'brightness(1.3)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.filter = '' }}
                    >
                      <span style={{ position: 'absolute', top: 3, right: 4, fontSize: 8, color, opacity: 0.55 }}>
                        {score}
                      </span>
                      {cell && (
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: color,
                          border: '2px solid white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'white' }}>{cell.count}</span>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* X labels */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, ${CELL_SIZE}px)`, gap: 2, marginTop: 4 }}>
              {PROB_LABELS.map((l) => (
                <div key={l.num} style={{
                  height: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: 4,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', lineHeight: 1.3 }}>{l.num}</span>
                  <span style={{ fontSize: 9, color: '#64748B', textAlign: 'center' }}>{l.short}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.15em', color: '#64748B', fontWeight: 600, marginTop: 4 }}>
              PROBABILIDADE
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4" style={{ fontSize: 11 }}>
        {[
          { color: '#166534', label: 'Aceitável (1–4)' },
          { color: '#854D0E', label: 'Tolerável (5–9)' },
          { color: '#9A3412', label: 'Elevado (10–16)' },
          { color: '#7F1D1D', label: 'Inaceitável (17–25)' },
        ].map((item) => (
          <div key={item.color} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="text-slate-600 text-xs mt-2">Referência: ISO 31000:2018 · ICAO Doc 9859 SMM</p>
      <div className="mt-3 bg-amber-500/8 border border-amber-500/20 rounded-lg p-3">
        <p className="text-amber-400 text-xs font-semibold mb-1">⚠️ Limitação metodológica</p>
        <p className="text-slate-400 text-xs leading-relaxed">
          A probabilidade nesta matriz é inferida da frequência relativa dos padrões de falha dentro do banco
          de eventos investigados — não da frequência operacional real. Eventos não investigados ou não
          reportados não estão incluídos, o que pode subestimar o risco real. Para maior precisão, combine
          estes dados com indicadores operacionais da sua organização.
        </p>
      </div>
    </div>
  )
}

// ── ARMS-ERC 4×4 Matrix ──────────────────────────────────────────────────────

const ARMS_SEV_LABELS = [
  { key: 'A' as const, name: 'Catastrófico', sub: 'fatalidades múltiplas' },
  { key: 'B' as const, name: 'Grave', sub: 'fatalidade ou lesão grave' },
  { key: 'C' as const, name: 'Significativo', sub: 'lesão leve, dano sério' },
  { key: 'D' as const, name: 'Menor', sub: 'sem lesão, dano menor' },
]

const ARMS_BARRIER_LABELS = [
  { key: 1 as const, name: 'Nenhuma', sub: 'dependeu de sorte' },
  { key: 2 as const, name: 'Mínima', sub: 'barreiras mínimas' },
  { key: 3 as const, name: 'Limitada', sub: 'efetividade limitada' },
  { key: 4 as const, name: 'Efetiva', sub: 'barreiras robustas' },
]

interface ARMSCellInfo {
  cellKey: string
  erc: number
  sevLabel: typeof ARMS_SEV_LABELS[0]
  barLabel: typeof ARMS_BARRIER_LABELS[0]
  cell: { count: number; codes: string[] } | null
  barrierScore: number
}

function ercMeaning(erc: number): string {
  switch (erc) {
    case 5: return 'Risco Inaceitável — ação imediata obrigatória'
    case 4: return 'Risco Urgente — ação corretiva em 24-48h'
    case 3: return 'Ação Requerida — plano de intervenção necessário'
    case 2: return 'Monitorar — acompanhar sem ação imediata'
    default: return 'Aceitável — risco dentro dos parâmetros normais'
  }
}

function ARMSMatrix({ data }: { data: Intelligence }) {
  const [selected, setSelected] = useState<ARMSCellInfo | null>(null)

  const topCodes = data.distribution.perception.top_codes ?? []
  const barrier = barrierLevel(data.score.value)

  const cellMap: Record<string, { count: number; codes: string[] }> = {}
  for (const tc of topCodes) {
    const row = ARMS_SEV_ROW[tc.code] ?? 'C'
    const col = barrier
    const key = `${row}${col}`
    if (!cellMap[key]) cellMap[key] = { count: 0, codes: [] }
    cellMap[key].count += tc.count
    cellMap[key].codes.push(tc.code)
  }

  return (
    <div>
      {selected && (
        <CellModal
          title={`ERC ${selected.erc} — ${selected.sevLabel.name} × ${selected.barLabel.name}`}
          onClose={() => setSelected(null)}
        >
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              O que significa ERC {selected.erc}
            </p>
            <p className="text-slate-300 text-sm">{ercMeaning(selected.erc)}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Como esta avaliação foi calculada</p>
            <div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-300 space-y-2">
              <p>
                Severidade (eixo Y): <strong className="text-white">{selected.sevLabel.key}</strong> — {selected.sevLabel.name}
              </p>
              <p className="text-slate-400 text-xs">Avaliação: {selected.sevLabel.sub}</p>
              <p className="mt-2">
                Efetividade das barreiras (eixo X): <strong className="text-white">{selected.barLabel.key}</strong> — {selected.barLabel.name}
              </p>
              <p className="text-slate-400 text-xs">
                Avaliação: {selected.barLabel.sub}. Score de risco HFA: {selected.barrierScore}
              </p>
              <p className="text-slate-400 text-xs mt-2">
                Na metodologia ARMS-ERC (EASA, 2010), a pergunta não é &quot;qual a probabilidade histórica?&quot; mas sim
                &quot;quão efetivas eram as barreiras de segurança presentes no evento?&quot; Esta abordagem reflete melhor
                o risco real no momento.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Eventos nesta célula</p>
            {selected.cell ? (
              <div className="space-y-1">
                {selected.cell.codes.map((code) => (
                  <div key={code} className="flex items-center justify-between bg-slate-800 rounded px-3 py-2">
                    <span className="font-mono text-yellow-400 text-sm font-bold">{code}</span>
                    <span className="text-slate-400 text-xs">código SERA</span>
                  </div>
                ))}
                <p className="text-slate-500 text-xs mt-1">
                  Total: {selected.cell.count} análise{selected.cell.count !== 1 ? 's' : ''}
                </p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Nenhum evento foi classificado nesta célula.</p>
            )}
          </div>

          <div className="border-t border-slate-800 pt-4">
            <p className="text-slate-500 text-xs">
              Referência: ARMS Working Group (EASA/Eurocontrol/IATA, 2010). Aviation Risk Management Solutions.
            </p>
          </div>
        </CellModal>
      )}

      <div className="overflow-x-auto">
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* SEVERIDADE label + Y labels */}
          <div style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
            <div style={{
              width: 20,
              height: CELL_SIZE * 4 + 3 * 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontSize: 10,
                letterSpacing: '0.15em',
                color: '#64748B',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                transform: 'rotate(-90deg)',
                display: 'block',
              }}>SEVERIDADE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 8, flexShrink: 0 }}>
              {ARMS_SEV_LABELS.map((l) => (
                <div key={l.key} style={{
                  height: CELL_SIZE,
                  width: 110,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', lineHeight: 1.3 }}>
                    {l.key} — {l.name}
                  </span>
                  <span style={{ fontSize: 9, color: '#64748B' }}>{l.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid + X labels */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(4, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(4, ${CELL_SIZE}px)`,
              gap: 2,
            }}>
              {ARMS_SEV_LABELS.map((sevL) =>
                ARMS_BARRIER_LABELS.map((barL) => {
                  const cellKey = `${sevL.key}${barL.key}`
                  const erc = ARMS_ERC[cellKey] ?? 2
                  const color = ERC_COLOR[erc]
                  const cell = cellMap[cellKey]
                  return (
                    <div
                      key={cellKey}
                      onClick={() => setSelected({
                        cellKey,
                        erc,
                        sevLabel: sevL,
                        barLabel: barL,
                        cell: cell ?? null,
                        barrierScore: data.score.value,
                      })}
                      title={`ERC ${erc} — clique para detalhes`}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        background: colorBg(color, 0.2),
                        border: '1px solid #1E293B',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'filter 0.15s',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.filter = 'brightness(1.3)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.filter = '' }}
                    >
                      <span style={{ position: 'absolute', top: 3, right: 4, fontSize: 8, color, opacity: 0.6 }}>
                        ERC{erc}
                      </span>
                      {cell && (
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: color,
                          border: '2px solid white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'white' }}>{cell.count}</span>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* X labels */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(4, ${CELL_SIZE}px)`, gap: 2, marginTop: 4 }}>
              {ARMS_BARRIER_LABELS.map((l) => (
                <div key={l.key} style={{
                  height: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: 4,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', lineHeight: 1.3 }}>{l.key}</span>
                  <span style={{ fontSize: 9, color: '#64748B', textAlign: 'center' }}>{l.name}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.15em', color: '#64748B', fontWeight: 600, marginTop: 4 }}>
              EFETIVIDADE DAS BARREIRAS REMANESCENTES
            </div>
          </div>
        </div>
      </div>

      {/* ERC Legend */}
      <div className="flex flex-wrap gap-4 mt-4" style={{ fontSize: 11 }}>
        {[
          { erc: 5, label: 'ERC 5 — Ação imediata' },
          { erc: 4, label: 'ERC 4 — Urgente' },
          { erc: 3, label: 'ERC 3 — Ação requerida' },
          { erc: 2, label: 'ERC 2 — Monitorar' },
          { erc: 1, label: 'ERC 1 — Aceitável' },
        ].map((item) => (
          <div key={item.erc} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ERC_COLOR[item.erc] }} />
            <span className="text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ARMS explanation */}
      <div className="mt-5 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-xs text-slate-400 leading-relaxed space-y-2">
        <p>
          A matriz ARMS-ERC difere da matriz tradicional em um aspecto fundamental: em vez de usar probabilidade
          histórica (quantas vezes esse tipo de evento ocorreu no passado), ela avalia a efetividade das barreiras
          de segurança que estavam presentes no momento do evento.
        </p>
        <p>
          Esta abordagem é mais adequada para eventos de segurança operacional porque reflete o risco real que
          existia no momento — não uma estimativa estatística baseada em dados históricos que podem não refletir
          o contexto específico.
        </p>
        <p className="text-slate-500">
          Desenvolvida pelo ARMS Working Group (EASA, Eurocontrol, IATA, 2007–2010) e adotada pela regulação
          europeia de reporte de ocorrências (EU 376/2014).
        </p>
      </div>
    </div>
  )
}

// ── SERA Reasoning Panel ──────────────────────────────────────────────────────

function SeraReasoningPanel({ data }: { data: Intelligence }) {
  const topCodes = data.distribution.perception.top_codes ?? []
  if (topCodes.length === 0) return null

  const sevCount: Record<number, number> = {}
  for (const tc of topCodes) {
    const sev = P_SEVERITY[tc.code] ?? 3
    sevCount[sev] = (sevCount[sev] ?? 0) + tc.count
  }
  const dominantSev = Number(
    Object.entries(sevCount).sort((a, b) => Number(b[1]) - Number(a[1]))[0][0]
  )

  const topCode = topCodes[0]
  const prob = countToProb(topCode.count, data.total_analyses)
  const pct = data.total_analyses > 0 ? Math.round((topCode.count / data.total_analyses) * 100) : 0
  const score = prob * dominantSev

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-white font-semibold text-sm">Como a análise chegou aqui</h3>
        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full flex-shrink-0">
          Raciocínio SERA → Matriz
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Severidade inferida</p>
        <p className="text-slate-400 text-xs">
          Os {data.total_analyses} eventos analisados foram classificados com os seguintes códigos de percepção:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {topCodes.slice(0, 5).map((tc) => (
            <span
              key={tc.code}
              className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono px-2 py-0.5 rounded"
            >
              {tc.code} ×{tc.count}
            </span>
          ))}
        </div>
        <p className="text-slate-400 text-xs">
          Estes códigos mapeiam para severidade{' '}
          <strong className="text-white">{dominantSev}</strong> na matriz porque:
        </p>
        {topCodes.slice(0, 3).map(tc => {
          const sevDef = SEVERITY_MAP[tc.code]
          if (!sevDef) return null
          return (
            <div key={tc.code} className="bg-slate-800/40 rounded p-2 mb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-yellow-400">
                  {tc.code}
                </span>
                <span className="text-xs text-slate-400">
                  → Sev. {sevDef.level} ({sevDef.label})
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {sevDef.justificativa}
              </p>
            </div>
          )
        })}
        <p className="text-xs text-slate-600 mt-2 italic">
          Classificação baseada em Hendy (2003) e Daumas (2018).
          Critérios: capacidade de autocorreção, recuperabilidade
          organizacional e potencial de dano direto.
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Probabilidade inferida</p>
        <p className="text-slate-400 text-xs">
          A probabilidade foi estimada pela frequência relativa do padrão de falha dentro do banco de eventos
          analisados:{' '}
          <strong className="text-white font-mono">{topCode.code}</strong> apareceu{' '}
          <strong className="text-white">{topCode.count}</strong>{' '}
          {topCode.count === 1 ? 'vez' : 'vezes'} em{' '}
          <strong className="text-white">{data.total_analyses}</strong> análises (
          <strong className="text-white">{pct}%</strong>) → Probabilidade{' '}
          <strong className="text-white">{prob}</strong> ({PROB_LABELS[prob - 1].name})
        </p>
        <p className="text-amber-400/80 text-xs leading-relaxed">
          ⚠️ Nota: esta é uma aproximação baseada em eventos investigados. A frequência operacional real pode
          ser diferente dependendo da taxa de reporte da sua organização.
        </p>
      </div>

      <div className="space-y-2 border-t border-slate-800 pt-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Score resultante</p>
        <p className="text-slate-400 text-xs">
          Score = {prob} × {dominantSev} ={' '}
          <strong className="text-white text-sm">{score}</strong> — Classificação:{' '}
          <strong style={{ color: tCellColor(score) }}>{riskLevelName(score)}</strong>
        </p>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${(score / 25) * 100}%`, background: tCellColor(score) }}
          />
        </div>
      </div>

      <p className="text-blue-400 text-xs">
        Clique nas células da matriz para ver detalhes →
      </p>
    </div>
  )
}

// ── Top Preconditions Panel ───────────────────────────────────────────────────

function TopPreconditionsPanel({ preconditions }: { preconditions: Intelligence['top_preconditions'] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
      <h3 className="text-white font-semibold text-sm">Precondições mais frequentes</h3>
      <div className="space-y-3">
        {preconditions.map((p, i) => (
          <div key={p.code} className="flex items-center gap-3">
            <span className="text-slate-600 text-xs w-4 flex-shrink-0">#{i + 1}</span>
            <span className="font-mono text-yellow-400 text-xs font-bold w-10 flex-shrink-0">{p.code}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-slate-400 text-xs truncate">{p.name}</span>
                <span className="text-white text-xs font-semibold ml-2 flex-shrink-0">{p.pct}%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400/60 rounded-full" style={{ width: `${p.pct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Utility components ────────────────────────────────────────────────────────

const combinationMeaning: Record<string, string> = {
  'P-F': 'falha de percepção por foco',
  'P-M': 'falha de percepção por memória',
  'O-B': 'objetivo baseado em viés',
  'O-A': 'objetivo inadequado',
  'A-I': 'ação incorreta',
  'A-O': 'ação omitida',
}

function combinationDescription(pair: string): string {
  const parts = pair.split(' + ')
  const descriptions = parts.map((p) => combinationMeaning[p] ?? p)
  return descriptions.join(' associada a ')
}

function TrendLine({ trend }: { trend: { month: string; count: number }[] }) {
  if (trend.length < 2) return null
  const maxCount = Math.max(...trend.map((t) => t.count), 1)
  const w = 600
  const h = 100
  const padX = 30
  const padY = 10
  const innerW = w - padX * 2
  const innerH = h - padY * 2
  const points = trend.map((t, i) => {
    const x = padX + (i / (trend.length - 1)) * innerW
    const y = padY + innerH - (t.count / maxCount) * innerH
    return { x, y, ...t }
  })
  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ')

  const last3 = trend.slice(-3)
  const trendDir =
    last3.length >= 2
      ? last3[last3.length - 1].count > last3[0].count
        ? '↑ Crescente'
        : last3[last3.length - 1].count < last3[0].count
          ? '↓ Decrescente'
          : '→ Estável'
      : '—'

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-slate-400 text-xs uppercase tracking-wide">Distribuição temporal</h4>
        <span className="text-xs text-slate-400">{trendDir}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full overflow-visible">
        <polyline points={polyline} fill="none" className="stroke-blue-500" strokeWidth={2} strokeLinejoin="round" />
        {points.map((p) => (
          <g key={p.month}>
            <circle cx={p.x} cy={p.y} r={4} className="fill-blue-500" />
            <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize={9} className="fill-white">{p.count}</text>
            <text x={p.x} y={h + 18} textAnchor="middle" fontSize={9} className="fill-slate-400">
              {new Date(Number(p.month.split('-')[0]), Number(p.month.split('-')[1]) - 1)
                .toLocaleString('pt-BR', { month: 'short' })}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RiskProfilePage() {
  const [data, setData] = useState<Intelligence | null>(null)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)
  const [matrixTab, setMatrixTab] = useState<'traditional' | 'arms'>('traditional')
  const [showGuide, setShowGuide] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      const t = session.access_token
      setToken(t)
      try {
        const res = await fetch('/api/org/intelligence', {
          headers: { Authorization: `Bearer ${t}` },
        })
        if (res.ok) {
          const intel = await res.json()
          if (intel?.score) setData(intel)
        }
      } catch {
        // setData stays null → empty state
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Carregando perfil de risco...
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Perfil de Risco Organizacional</h1>
          <p className="text-slate-400 mt-1">
            Baseado em {data?.total_analyses ?? 0} análises SERA
          </p>
        </div>
        <button
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm rounded-lg px-4 py-2 transition-colors"
          onClick={() => alert('Exportação PDF em desenvolvimento')}
        >
          Exportar Relatório PDF
        </button>
      </div>

      {/* 2. Score card compacto */}
      {data?.score && (
        <OrgScoreCard
          score={data.score.value}
          level={data.score.level}
          label={data.score.label}
          actions={data.actions}
        />
      )}

      {/* 3. Grid 2 colunas: Matriz | Raciocínio + Precondições */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Esquerda: Matriz */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="text-white font-semibold">Matriz de Risco</h3>
                <div className="flex rounded-lg overflow-hidden border border-slate-700 text-sm">
                  <button
                    onClick={() => setMatrixTab('traditional')}
                    className={`px-4 py-1.5 transition-colors ${matrixTab === 'traditional' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    ISO 31000 / ICAO
                  </button>
                  <button
                    onClick={() => setMatrixTab('arms')}
                    className={`px-4 py-1.5 transition-colors ${matrixTab === 'arms' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    ARMS-ERC
                  </button>
                </div>
              </div>

              {matrixTab === 'traditional' ? (
                <p className="text-slate-500 text-xs">
                  Matriz 5×5 baseada em Probabilidade × Severidade — ISO 31000:2018 e ICAO Doc 9859
                </p>
              ) : (
                <p className="text-slate-500 text-xs">
                  Matriz 4×4 baseada em Severidade do resultado × Efetividade das barreiras — Aviation Risk Management Solutions (EASA, 2010)
                </p>
              )}

              {matrixTab === 'traditional' ? (
                <TraditionalMatrix data={data} />
              ) : (
                <ARMSMatrix data={data} />
              )}

              <div className="border-t border-slate-800 pt-4">
                <button
                  onClick={() => setShowGuide((v) => !v)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  <span className={`transition-transform ${showGuide ? 'rotate-90' : ''}`}>▶</span>
                  Qual matriz usar para cada situação?
                </button>
                {showGuide && (
                  <div className="mt-4 grid sm:grid-cols-2 gap-4 text-xs text-slate-400 leading-relaxed">
                    <div className="bg-slate-800/60 rounded-lg p-4 space-y-2">
                      <p className="text-white font-semibold text-sm mb-1">Use a Matriz Tradicional (ISO 31000) quando:</p>
                      <p>• Precisa de comparabilidade com outras organizações</p>
                      <p>• Está fazendo relatório para gestão ou auditoria</p>
                      <p>• Tem dados históricos suficientes para estimar probabilidade</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 space-y-2">
                      <p className="text-white font-semibold text-sm mb-1">Use a Matriz ARMS-ERC quando:</p>
                      <p>• Quer avaliar o risco real de um evento específico</p>
                      <p>• Está triando eventos para priorizar investigações</p>
                      <p>• Opera sob regulação europeia (EU 376/2014)</p>
                      <p>• Prefere uma abordagem baseada em barreiras de segurança</p>
                    </div>
                    <div className="sm:col-span-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-300 text-xs">
                        Na prática, organizações maduras usam as duas: a tradicional para comunicação executiva e
                        a ARMS-ERC para gestão operacional de riscos.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Direita: Raciocínio SERA + Top 5 Precondições */}
          <div className="lg:col-span-2 space-y-4">
            <SeraReasoningPanel data={data} />
            {data.top_preconditions.length > 0 && (
              <TopPreconditionsPanel preconditions={data.top_preconditions.slice(0, 5)} />
            )}
          </div>
        </div>
      )}

      {/* 4. Combinações de falha */}
      {(data?.top_combinations ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Combinações de Falha Mais Frequentes</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-left">
                <th className="pb-2 font-medium pr-4">Combinação</th>
                <th className="pb-2 font-medium pr-4">Ocorrências</th>
                <th className="pb-2 font-medium pr-4">%</th>
                <th className="pb-2 font-medium">Significado operacional</th>
              </tr>
            </thead>
            <tbody>
              {data!.top_combinations.map((c) => (
                <tr key={c.pair} className="border-b border-slate-800/50 last:border-0">
                  <td className="py-3 pr-4 font-mono text-blue-400 whitespace-nowrap">{c.pair}</td>
                  <td className="py-3 pr-4 text-white font-semibold">{c.count}</td>
                  <td className="py-3 pr-4 text-slate-400">{c.pct}%</td>
                  <td className="py-3 text-slate-400 text-xs">{combinationDescription(c.pair)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Ranking completo de precondições */}
      {(data?.top_preconditions ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Ranking de Precondições</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-left">
                <th className="pb-2 font-medium pr-4">Rank</th>
                <th className="pb-2 font-medium pr-4">Código</th>
                <th className="pb-2 font-medium pr-4">Nome</th>
                <th className="pb-2 font-medium pr-4">Freq.</th>
                <th className="pb-2 font-medium pr-4">%</th>
                <th className="pb-2 font-medium w-32">Visual</th>
              </tr>
            </thead>
            <tbody>
              {data!.top_preconditions.map((p, i) => (
                <tr key={p.code} className="border-b border-slate-800/50 last:border-0">
                  <td className="py-3 pr-4 text-slate-500">#{i + 1}</td>
                  <td className="py-3 pr-4 font-mono text-yellow-400 font-bold">{p.code}</td>
                  <td className="py-3 pr-4 text-slate-300">{p.name}</td>
                  <td className="py-3 pr-4 text-white font-semibold">{p.count}</td>
                  <td className="py-3 pr-4 text-slate-400">{p.pct}%</td>
                  <td className="py-3">
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${p.pct}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Análise por IA */}
      {data?.score && token && (
        <AiInsightPanel intelligenceData={data} token={token} />
      )}

      {/* 7. Distribuição temporal */}
      {(data?.trend ?? []).length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Distribuição Temporal</h3>
          <TrendLine trend={data!.trend} />
        </div>
      )}
    </div>
  )
}
