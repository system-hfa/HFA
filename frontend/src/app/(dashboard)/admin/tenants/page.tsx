'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

interface TenantUser {
  email: string
  role: string
}

interface Tenant {
  id: string
  name: string
  plan: string
  credits_balance: number
  created_at: string
  is_active: boolean
  users: TenantUser[]
  email?: string
  analysis_count: number
  status?: 'active' | 'suspended'
}

interface TenantsResponse {
  items: Tenant[]
  total: number
  page: number
  limit: number
}

const PLAN_BADGE: Record<string, string> = {
  enterprise: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  free: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  trial: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  suspended: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [query, setQuery] = useState('')

  const [editing, setEditing] = useState<Tenant | null>(null)
  const [form, setForm] = useState({
    plan: 'free',
    addCredits: 0,
    setStatus: 'active' as 'active' | 'suspended',
  })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await supabase.auth.getSession()
      if (!data.session) return
      const res = await fetch(`/api/admin/tenants?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
      })
      if (!res.ok) {
        throw new Error((await res.json()).detail || 'Falha ao carregar')
      }
      const payload = await res.json() as TenantsResponse
      setTenants(payload.items)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao carregar tenants')
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    const timer = setTimeout(() => { void load() }, 0)
    return () => clearTimeout(timer)
  }, [load])

  const total = useMemo(() => tenants.length, [tenants])

  function openEdit(t: Tenant) {
    setEditing(t)
    setForm({
      plan: t.plan,
      addCredits: 0,
      setStatus: t.is_active ? 'active' : 'suspended',
    })
  }

  async function save() {
    if (!editing) return

    if (form.setStatus === 'suspended') {
      const ok = window.confirm('Confirmar suspensão desta conta?')
      if (!ok) return
    }

    setSaving(true)
    try {
      const { data } = await supabase.auth.getSession()
      if (!data.session) throw new Error('Sessão inválida')

      const nextCredits = (editing.credits_balance ?? 0) + Number(form.addCredits || 0)
      const payload = {
        plan: form.plan,
        credits_balance: nextCredits,
        status: form.setStatus,
      }

      const res = await fetch(`/api/admin/tenants/${editing.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error((await res.json()).detail || 'Falha ao salvar')
      }

      toast.success('Tenant atualizado com sucesso')
      setEditing(null)
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao atualizar tenant')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-end gap-4 md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuários</h1>
          <p className="text-slate-400 text-sm mt-1">{total} tenants na listagem atual</p>
        </div>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por empresa ou email"
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white w-full md:w-72"
          />
          <button
            type="button"
            onClick={load}
            className="bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium px-4 py-2 rounded-lg"
          >
            Buscar
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          Carregando…
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[980px]">
            <thead className="border-b border-slate-800">
              <tr className="text-left">
                <th className="px-4 py-3 text-slate-400 font-medium">Empresa</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Email</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Plano</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Créditos</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Análises</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Cadastro</th>
                <th className="px-4 py-3 text-slate-400 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tenants.map((t) => {
                const suspended = !t.is_active || t.status === 'suspended'
                const planKey = suspended ? 'suspended' : t.plan
                return (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3 text-white font-medium">{t.name}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {t.users.map((u) => u.email).join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${PLAN_BADGE[planKey] ?? PLAN_BADGE.free}`}>
                        {suspended ? 'suspenso' : t.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 tabular-nums">
                      {t.credits_balance === -1 ? '∞' : t.credits_balance}
                    </td>
                    <td className="px-4 py-3 text-slate-300 tabular-nums">{t.analysis_count}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(t.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="flex items-center gap-3">
                        <button onClick={() => openEdit(t)} className="text-amber-400 hover:text-amber-300 transition">
                          Editar plano
                        </button>
                        <button onClick={() => openEdit(t)} className="text-blue-300 hover:text-blue-200 transition">
                          Adicionar créditos
                        </button>
                        <button
                          onClick={() => openEdit(t)}
                          className={suspended ? 'text-green-300 hover:text-green-200 transition' : 'text-red-300 hover:text-red-200 transition'}
                        >
                          {suspended ? 'Reativar' : 'Suspender'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={(e) => { if (e.target === e.currentTarget) setEditing(null) }}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-white font-semibold mb-1">{editing.name}</h2>
            <p className="text-slate-400 text-xs mb-4">{editing.email || editing.users[0]?.email || 'Sem email'}</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Plano</label>
                <select
                  value={form.plan}
                  onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="free">free</option>
                  <option value="enterprise">enterprise</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Adicionar créditos (pode ser negativo)</label>
                <input
                  type="number"
                  value={form.addCredits}
                  onChange={(e) => setForm((p) => ({ ...p, addCredits: Number(e.target.value) }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                />
                <p className="text-[11px] text-slate-500 mt-1">Saldo atual: {editing.credits_balance === -1 ? '∞' : editing.credits_balance}</p>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1 block">Status</label>
                <select
                  value={form.setStatus}
                  onChange={(e) => setForm((p) => ({ ...p, setStatus: e.target.value as 'active' | 'suspended' }))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="active">ativo</option>
                  <option value="suspended">suspenso</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-medium py-2 rounded-lg text-sm"
                >
                  {saving ? 'Salvando…' : 'Salvar'}
                </button>
                <button onClick={() => setEditing(null)} className="px-4 py-2 border border-slate-700 text-slate-400 rounded-lg text-sm hover:text-white transition">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
