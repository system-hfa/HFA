'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { apiCall } from '@/lib/api'

interface RiskProfile {
  total_analyses: number
  perception_failures: Record<string, number>
  objective_failures: Record<string, number>
  action_failures: Record<string, number>
  top_preconditions: Record<string, number>
}

export default function DashboardPage() {
  const [risk, setRisk] = useState<RiskProfile | null>(null)
  const [credits, setCredits] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const token = session.access_token
      try {
        const [riskData, tenantRow] = await Promise.all([
          apiCall('/analyses/risk-profile', {}, token),
          supabase.from('tenants').select('credits_balance, name').maybeSingle(),
        ])
        setRisk(riskData)
        setCredits(tenantRow.data?.credits_balance ?? 0)
      } catch {
        setRisk(null)
        setCredits(0)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-full text-slate-400">
      Carregando...
    </div>
  )

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-slate-400 mb-8">Perfil de risco de fator humano da sua operação</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Análises Realizadas', value: risk?.total_analyses || 0, color: 'blue' },
          { label: 'Créditos Disponíveis', value: credits, color: 'green' },
          { label: 'Falha + Frequente (P)', value: Object.keys(risk?.perception_failures || {})[0] || '—', color: 'orange' },
          { label: 'Falha + Frequente (A)', value: Object.keys(risk?.action_failures || {})[0] || '—', color: 'red' },
        ].map(card => (
          <div key={card.label} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Falhas de Percepção</h3>
          {Object.entries(risk?.perception_failures || {}).map(([code, count]) => (
            <div key={code} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
              <span className="text-blue-400 font-mono text-sm">{code}</span>
              <span className="text-white font-semibold">{count}x</span>
            </div>
          ))}
          {!Object.keys(risk?.perception_failures || {}).length && (
            <p className="text-slate-500 text-sm">Nenhuma análise ainda</p>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Falhas de Ação</h3>
          {Object.entries(risk?.action_failures || {}).map(([code, count]) => (
            <div key={code} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
              <span className="text-red-400 font-mono text-sm">{code}</span>
              <span className="text-white font-semibold">{count}x</span>
            </div>
          ))}
          {!Object.keys(risk?.action_failures || {}).length && (
            <p className="text-slate-500 text-sm">Nenhuma análise ainda</p>
          )}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl col-span-2 p-6">
          <h3 className="font-semibold text-white mb-4">Pré-condições Mais Frequentes</h3>
          <div className="grid grid-cols-5 gap-3">
            {Object.entries(risk?.top_preconditions || {}).map(([code, count]) => (
              <div key={code} className="bg-slate-800 rounded-lg p-3 text-center">
                <p className="text-yellow-400 font-mono font-bold">{code}</p>
                <p className="text-slate-300 text-sm">{count}x</p>
              </div>
            ))}
            {!Object.keys(risk?.top_preconditions || {}).length && (
              <p className="text-slate-500 text-sm col-span-5">Nenhuma análise ainda</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
