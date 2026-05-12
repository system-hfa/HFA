'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

type CreditPackage = {
  id: string
  name: string
  credits: number
  price_cents: number
  stripe_price_id: string | null
  is_active: boolean
}

export default function PlansPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [packages, setPackages] = useState<CreditPackage[]>([])
  const [settings, setSettings] = useState({
    free_plan_credits: '5',
    free_plan_price_cents: '0',
    enterprise_plan_price_cents: '0',
    free_plan_features: '5 análises gratuitas',
    enterprise_plan_features: 'Análises ilimitadas',
  })

  const [editing, setEditing] = useState<CreditPackage | null>(null)
  const [pkgForm, setPkgForm] = useState({
    name: '',
    credits: 100,
    price_cents: 9900,
    stripe_price_id: '',
    is_active: true,
  })

  async function authHeaders() {
    const { data } = await supabase.auth.getSession()
    if (!data.session) throw new Error('Sessão inválida')
    return { Authorization: `Bearer ${data.session.access_token}` }
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const headers = await authHeaders()
      const [settingsRes, packagesRes] = await Promise.all([
        fetch('/api/admin/settings', { headers }),
        fetch('/api/admin/packages', { headers }),
      ])

      if (!settingsRes.ok) throw new Error((await settingsRes.json()).detail || 'Falha em settings')
      if (!packagesRes.ok) throw new Error((await packagesRes.json()).detail || 'Falha em pacotes')

      const s = await settingsRes.json() as Record<string, string>
      const p = await packagesRes.json() as CreditPackage[]

      setSettings(prev => ({
        ...prev,
        free_plan_credits: s.free_plan_credits ?? prev.free_plan_credits,
        free_plan_price_cents: s.free_plan_price_cents ?? prev.free_plan_price_cents,
        enterprise_plan_price_cents: s.enterprise_plan_price_cents ?? prev.enterprise_plan_price_cents,
        free_plan_features: s.free_plan_features ?? prev.free_plan_features,
        enterprise_plan_features: s.enterprise_plan_features ?? prev.enterprise_plan_features,
      }))
      setPackages(Array.isArray(p) ? p : [])
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao carregar')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => { void load() }, 0)
    return () => clearTimeout(timer)
  }, [load])

  async function savePlanSettings() {
    setSaving(true)
    try {
      const headers = await authHeaders()
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Falha ao salvar')
      toast.success('Configurações de plano salvas')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao salvar')
    } finally {
      setSaving(false)
    }
  }

  function openNewPackage() {
    setEditing(null)
    setPkgForm({ name: '', credits: 100, price_cents: 9900, stripe_price_id: '', is_active: true })
  }

  function openEditPackage(item: CreditPackage) {
    setEditing(item)
    setPkgForm({
      name: item.name,
      credits: item.credits,
      price_cents: item.price_cents,
      stripe_price_id: item.stripe_price_id ?? '',
      is_active: item.is_active,
    })
  }

  async function savePackage() {
    setSaving(true)
    try {
      const headers = await authHeaders()
      const endpoint = editing ? `/api/admin/packages/${editing.id}` : '/api/admin/packages'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(pkgForm),
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Falha ao salvar pacote')
      toast.success(editing ? 'Pacote atualizado' : 'Pacote criado')
      setEditing(null)
      setPkgForm({ name: '', credits: 100, price_cents: 9900, stripe_price_id: '', is_active: true })
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao salvar pacote')
    } finally {
      setSaving(false)
    }
  }

  async function deletePackage(item: CreditPackage) {
    const ok = window.confirm(`Remover o pacote "${item.name}"?`)
    if (!ok) return

    setSaving(true)
    try {
      const headers = await authHeaders()
      const res = await fetch(`/api/admin/packages/${item.id}`, {
        method: 'DELETE',
        headers,
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Falha ao remover pacote')
      toast.success('Pacote removido')
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao remover pacote')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Planos e Pacotes</h1>
        <p className="text-slate-400 text-sm mt-1">Gestão de planos base e pacotes avulsos de créditos.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-3">Plano Free</h2>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs text-slate-400">Créditos iniciais</span>
              <input
                value={settings.free_plan_credits}
                onChange={(e) => setSettings((s) => ({ ...s, free_plan_credits: e.target.value }))}
                className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400">Preço (centavos)</span>
              <input
                value={settings.free_plan_price_cents}
                onChange={(e) => setSettings((s) => ({ ...s, free_plan_price_cents: e.target.value }))}
                className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400">Features (uma por linha)</span>
              <textarea
                value={settings.free_plan_features}
                onChange={(e) => setSettings((s) => ({ ...s, free_plan_features: e.target.value }))}
                className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white min-h-24"
              />
            </label>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-white font-semibold mb-3">Plano Enterprise</h2>
          <div className="space-y-3">
            <label className="block">
              <span className="text-xs text-slate-400">Créditos iniciais</span>
              <input
                value="-1 (ilimitado)"
                disabled
                className="mt-1 w-full bg-slate-800/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-500"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400">Preço (centavos)</span>
              <input
                value={settings.enterprise_plan_price_cents}
                onChange={(e) => setSettings((s) => ({ ...s, enterprise_plan_price_cents: e.target.value }))}
                className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400">Features (uma por linha)</span>
              <textarea
                value={settings.enterprise_plan_features}
                onChange={(e) => setSettings((s) => ({ ...s, enterprise_plan_features: e.target.value }))}
                className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white min-h-24"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={savePlanSettings}
          disabled={saving}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-medium px-4 py-2 rounded-lg"
        >
          {saving ? 'Salvando...' : 'Salvar planos'}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Pacotes de crédito avulsos</h2>
          <button onClick={openNewPackage} className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-2 rounded-lg">
            Novo pacote
          </button>
        </div>

        {loading ? (
          <p className="text-slate-400 text-sm">Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-sm">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="text-left py-2">Nome</th>
                  <th className="text-left py-2">Créditos</th>
                  <th className="text-left py-2">Preço</th>
                  <th className="text-left py-2">Stripe Price ID</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-right py-2">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {packages.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 text-white">{item.name}</td>
                    <td className="py-3 text-slate-300">{item.credits}</td>
                    <td className="py-3 text-slate-300">R$ {(item.price_cents / 100).toFixed(2)}</td>
                    <td className="py-3 text-slate-400 text-xs">{item.stripe_price_id || '—'}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${item.is_active ? 'border-green-500/30 text-green-300 bg-green-500/10' : 'border-slate-600 text-slate-400 bg-slate-700/20'}`}>
                        {item.is_active ? 'ativo' : 'inativo'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-amber-400 hover:text-amber-300 text-xs mr-3" onClick={() => openEditPackage(item)}>Editar</button>
                      <button className="text-red-300 hover:text-red-200 text-xs" onClick={() => deletePackage(item)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">{editing ? 'Editar pacote' : 'Criar pacote'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-slate-400">Nome</span>
            <input value={pkgForm.name} onChange={(e) => setPkgForm((p) => ({ ...p, name: e.target.value }))} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
          </label>
          <label className="block">
            <span className="text-xs text-slate-400">Créditos</span>
            <input type="number" value={pkgForm.credits} onChange={(e) => setPkgForm((p) => ({ ...p, credits: Number(e.target.value) }))} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
          </label>
          <label className="block">
            <span className="text-xs text-slate-400">Preço (centavos)</span>
            <input type="number" value={pkgForm.price_cents} onChange={(e) => setPkgForm((p) => ({ ...p, price_cents: Number(e.target.value) }))} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
          </label>
          <label className="block">
            <span className="text-xs text-slate-400">Stripe Price ID</span>
            <input value={pkgForm.stripe_price_id} onChange={(e) => setPkgForm((p) => ({ ...p, stripe_price_id: e.target.value }))} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" />
          </label>
          <label className="inline-flex items-center gap-2 mt-1">
            <input type="checkbox" checked={pkgForm.is_active} onChange={(e) => setPkgForm((p) => ({ ...p, is_active: e.target.checked }))} />
            <span className="text-sm text-slate-300">Pacote ativo</span>
          </label>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={savePackage} disabled={saving} className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-medium px-4 py-2 rounded-lg">
            {saving ? 'Salvando...' : (editing ? 'Salvar pacote' : 'Criar pacote')}
          </button>
          {editing && (
            <button onClick={openNewPackage} className="border border-slate-700 text-slate-300 text-sm px-4 py-2 rounded-lg">
              Novo pacote
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
