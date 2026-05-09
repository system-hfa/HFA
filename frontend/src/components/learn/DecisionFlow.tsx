'use client'

import { useState } from 'react'
import { CodeBadge } from './CodeBadge'

export type FlowNode = {
  id: string
  question: string
  criterion?: string
  yes: string
  no: string
  yesLabel?: string
  noLabel?: string
}

export type FlowResult = {
  label: string
  description: string
}

function isResultCode(s: string) {
  return /^[POA]-[A-J]$/.test(s)
}

function getActivePath(nodes: FlowNode[], answers: Record<string, 'yes' | 'no'>): string[] {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const path: string[] = [nodes[0].id]
  for (;;) {
    const last = path[path.length - 1]
    if (isResultCode(last)) break
    const node = nodeMap[last]
    if (!node) break
    const ans = answers[last]
    if (!ans) break
    path.push(ans === 'yes' ? node.yes : node.no)
  }
  return path
}

export function DecisionFlow({
  nodes,
  results,
}: {
  nodes: FlowNode[]
  results: Record<string, FlowResult>
}) {
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no'>>({})
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const path = getActivePath(nodes, answers)
  const lastId = path[path.length - 1]
  const resultCode = isResultCode(lastId) ? lastId : null
  const result = resultCode ? results[resultCode] : null

  function answer(nodeId: string, pathIdx: number, ans: 'yes' | 'no') {
    const newAnswers = { ...answers }
    for (let i = pathIdx + 1; i < path.length; i++) {
      delete newAnswers[path[i]]
    }
    newAnswers[nodeId] = ans
    setAnswers(newAnswers)
  }

  return (
    <div className="space-y-3">
      {path.map((id, idx) => {
        if (isResultCode(id)) return null
        const node = nodeMap[id]
        if (!node) return null
        const ans = answers[id]
        const isActive = !ans

        return (
          <div
            key={id}
            className={[
              'border rounded-xl p-4 transition-all',
              isActive ? 'border-blue-500/40 bg-blue-500/5' : 'border-slate-800 bg-slate-900/60',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              <span className="text-slate-600 text-xs font-mono shrink-0 pt-1">{idx + 1}</span>
              <div className="flex-1">
                <p className={`font-medium text-sm mb-2 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {node.question}
                </p>
                {node.criterion && (
                  <p className="text-slate-500 text-xs mb-3 italic leading-relaxed">{node.criterion}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => answer(id, idx, 'yes')}
                    className={[
                      'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                      ans === 'yes'
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
                    ].join(' ')}
                  >
                    {node.yesLabel ?? 'SIM'}
                  </button>
                  <button
                    onClick={() => answer(id, idx, 'no')}
                    className={[
                      'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                      ans === 'no'
                        ? 'bg-red-600/80 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
                    ].join(' ')}
                  >
                    {node.noLabel ?? 'NÃO'}
                  </button>
                  {ans && (
                    <button
                      onClick={() => {
                        const newAnswers = { ...answers }
                        for (let i = idx; i < path.length; i++) delete newAnswers[path[i]]
                        setAnswers(newAnswers)
                      }}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-400 transition"
                    >
                      ↩ alterar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {result && resultCode && (
        <div className="border border-slate-600 rounded-xl p-5 bg-slate-800/40 mt-2">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-slate-400 text-sm">Resultado:</span>
            <CodeBadge code={resultCode} size="lg" />
            <span className="text-white font-semibold">{result.label}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{result.description}</p>
          <button
            onClick={() => setAnswers({})}
            className="mt-3 text-xs text-slate-600 hover:text-slate-400 transition"
          >
            ↩ Reiniciar fluxo
          </button>
        </div>
      )}
    </div>
  )
}
