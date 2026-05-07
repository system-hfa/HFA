'use client'
import { useState } from 'react'
import { getTutorial, FAILURE_NAMES } from '@/data/tutorials'

interface FlowNode {
  justificativa?: string
  resposta?: string
  [key: string]: unknown
}

interface Props {
  code: string
  justification?: string
  flowPath?: FlowNode[]        // nos_percorridos from analysis
  onEdit?: () => void          // closes modal and activates inline edit
  onClose: () => void
}

export default function DidacticModal({ code, justification, flowPath, onEdit, onClose }: Props) {
  const tutorial = getTutorial(code)
  const name = FAILURE_NAMES[code] || code
  const [tab, setTab] = useState<'o-que'|'por-que'|'alterar'|'nao-confundir'|'exemplo'>('o-que')

  const tabs = [
    { id: 'o-que' as const,        label: 'O que é' },
    { id: 'por-que' as const,      label: 'Por que classificou' },
    { id: 'alterar' as const,      label: 'Para alterar' },
    { id: 'nao-confundir' as const,label: 'Não confundir' },
    { id: 'exemplo' as const,      label: '✈️ Exemplo' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-700">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-emerald-400 font-mono">{code}</span>
              <span className="text-lg font-semibold text-white">{name}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{tutorial?.fonte || 'SERA Methodology'}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl font-bold transition-colors">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'o-que' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">O QUE É</h3>
              <p className="text-slate-200 leading-relaxed">{tutorial?.oQueE || '—'}</p>
            </div>
          )}

          {tab === 'por-que' && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">POR QUE O SISTEMA CLASSIFICOU ASSIM</h3>

              {/* Decision path */}
              {flowPath && flowPath.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">Caminho percorrido no fluxo decisório:</p>
                  <div className="space-y-2">
                    {flowPath.map((node, i) => (
                      <div key={i} className="flex gap-3 items-start bg-slate-800 rounded-lg p-3">
                        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          node.resposta?.toLowerCase() === 'sim' ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {i + 1}
                        </span>
                        <div>
                          {node.resposta && (
                            <span className={`text-xs font-bold mr-2 ${
                              node.resposta.toLowerCase() === 'sim' ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {node.resposta.toUpperCase()}
                            </span>
                          )}
                          <span className="text-sm text-slate-300">{node.justificativa || '—'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center gap-2 bg-emerald-950 border border-emerald-800 rounded-lg p-3">
                    <span className="text-emerald-400 font-mono font-bold text-lg">{code}</span>
                    <span className="text-emerald-300 text-sm">← Classificação resultante</span>
                  </div>
                </div>
              ) : justification ? (
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-300 text-sm leading-relaxed">{justification}</p>
                </div>
              ) : (
                <p className="text-slate-500 italic text-sm">Caminho decisório não disponível para esta análise.</p>
              )}
            </div>
          )}

          {tab === 'alterar' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">O QUE CONSIDERAR PARA ALTERAR</h3>
              <div className="bg-amber-950 border border-amber-800 rounded-lg p-4">
                <p className="text-amber-200 leading-relaxed">{tutorial?.oQueConsiderarParaAlterar || '—'}</p>
              </div>
            </div>
          )}

          {tab === 'nao-confundir' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">⚠️ NÃO CONFUNDIR COM</h3>
              {tutorial?.naoConfundirCom && tutorial.naoConfundirCom.length > 0 ? (
                <div className="space-y-3">
                  {tutorial.naoConfundirCom.map(item => (
                    <div key={item.codigo} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono font-bold text-orange-400">{item.codigo}</span>
                        <span className="text-slate-400 text-xs">{FAILURE_NAMES[item.codigo]}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{item.diferenca}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic text-sm">Sem confusões frequentes para este código.</p>
              )}
            </div>
          )}

          {tab === 'exemplo' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">✈️ EXEMPLO EM AVIAÇÃO OFFSHORE</h3>
              <div className="bg-blue-950 border border-blue-800 rounded-lg p-4">
                <p className="text-blue-100 leading-relaxed">{tutorial?.exemplo || '—'}</p>
              </div>
              {tutorial?.fonte && (
                <p className="text-xs text-slate-500 mt-2">📚 {tutorial.fonte}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {onEdit && (
          <div className="p-6 pt-0 border-t border-slate-700 mt-2">
            <button
              onClick={() => { onClose(); onEdit() }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Editar classificação →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
