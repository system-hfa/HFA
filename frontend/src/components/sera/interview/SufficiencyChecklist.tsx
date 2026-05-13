'use client'

import { useMemo } from 'react'
import type { SufficiencyGate, EvidenceMap } from '@/lib/sera/interview/types'

type Props = {
  gates: SufficiencyGate[]
  evidenceMap: EvidenceMap
  onToggle: (dimension: keyof EvidenceMap, key: string, value: boolean) => void
}

const DIMENSION_LABELS: Record<string, string> = {
  perception: 'Percepção',
  objective: 'Objetivo',
  action: 'Ação',
  preconditions: 'Pré-condições',
}

const DIMENSION_ORDER = ['perception', 'objective', 'action', 'preconditions'] as const

export function SufficiencyChecklist({ gates, evidenceMap, onToggle }: Props) {
  const grouped = useMemo(() => {
    const map: Record<string, SufficiencyGate[]> = {}
    for (const gate of gates) {
      if (!map[gate.dimension]) map[gate.dimension] = []
      map[gate.dimension].push(gate)
    }
    return map
  }, [gates])

  return (
    <div className="space-y-6">
      {DIMENSION_ORDER.map((dimension) => {
        const dimensionGates = grouped[dimension]
        if (!dimensionGates) return null
        const dimMap = evidenceMap[dimension] ?? {}
        const checkedCount = dimensionGates.filter((g) => !!dimMap[g.evidence_keys[0]]).length

        return (
          <div key={dimension}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">{DIMENSION_LABELS[dimension]}</h3>
              <span className="text-xs text-slate-500">
                {checkedCount}/{dimensionGates.length} coletados
              </span>
            </div>

            <div className="space-y-2">
              {dimensionGates.map((gate) => {
                const key = gate.evidence_keys[0]
                const checked = !!dimMap[key]
                return (
                  <label
                    key={gate.id}
                    className={`flex items-start gap-3 cursor-pointer rounded-lg border p-3 transition ${
                      checked
                        ? 'bg-slate-800/60 border-slate-700'
                        : gate.minimum === 'required'
                          ? 'bg-slate-900 border-slate-700 hover:border-slate-600'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        onToggle(dimension as keyof EvidenceMap, key, e.target.checked)
                      }
                      className="mt-0.5 size-4 accent-blue-500 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <span className="text-sm text-slate-200 leading-snug flex-1">
                          {gate.description}
                        </span>
                        {gate.minimum === 'required' && (
                          <span className="text-[10px] font-medium text-red-400 shrink-0 mt-0.5">
                            obrigatório
                          </span>
                        )}
                      </div>
                      {!checked && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {gate.missing_prompt}
                        </p>
                      )}
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
