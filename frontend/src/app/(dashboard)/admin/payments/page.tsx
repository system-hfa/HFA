'use client'

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

type Transaction = {
  id: string
  type: string
  amount: number
  description: string | null
  stripe_payment_id: string | null
  created_at: string
  tenant_name: string
  user_email: string
}

type TransactionsResponse = {
  items: Transaction[]
  total: number
  page: number
  limit: number
}

export default function AdminPaymentsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    stripe_publishable_key: '',
    stripe_secret_key: '',
    stripe_webhook_secret: '',
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const webhookActive = settings.stripe_webhook_secret.trim().length > 0

  async function authHeaders() {
    const { data } = await supabase.auth.getSession()
    if (!data.session) throw new Error('Sessão inválida')
    return { Authorization: `Bearer ${data.session.access_token}` }
  }

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const headers = await authHeaders()
      const [settingsRes, txRes] = await Promise.all([
        fetch('/api/admin/settings', { headers }),
        fetch('/api/admin/payments/transactions', { headers }),
      ])

      if (!settingsRes.ok) throw new Error((await settingsRes.json()).detail || 'Falha em settings')
      if (!txRes.ok) throw new Error((await txRes.json()).detail || 'Falha ao carregar transações')

      const s = await settingsRes.json() as Record<string, string>
      const tx = await txRes.json() as TransactionsResponse

      setSettings({
        stripe_publishable_key: s.stripe_publishable_key ?? '',
        stripe_secret_key: s.stripe_secret_key ?? '',
        stripe_webhook_secret: s.stripe_webhook_secret ?? '',
      })
      setTransactions(tx.items ?? [])
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao carregar pagamentos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => { void load() }, 0)
    return () => clearTimeout(timer)
  }, [load])

  async function save() {
    setSaving(true)
    try {
      const headers = await authHeaders()
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Falha ao salvar')
      toast.success('Configurações de Stripe salvas')
      await load()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Falha ao salvar pagamentos')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-5 md:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Pagamentos</h1>
        <p className="text-slate-400 text-sm mt-1">Configuração Stripe e histórico de transações.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-white font-semibold">Stripe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs text-slate-400">Publishable key</span>
            <input
              type="password"
              value={settings.stripe_publishable_key}
              onChange={(e) => setSettings((s) => ({ ...s, stripe_publishable_key: e.target.value }))}
              placeholder="pk_...****"
              className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-400">Secret key</span>
            <input
              type="password"
              value={settings.stripe_secret_key}
              onChange={(e) => setSettings((s) => ({ ...s, stripe_secret_key: e.target.value }))}
              placeholder="sk_...****"
              className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs text-slate-400">Webhook secret</span>
          <input
            type="password"
            value={settings.stripe_webhook_secret}
            onChange={(e) => setSettings((s) => ({ ...s, stripe_webhook_secret: e.target.value }))}
            placeholder="whsec_...****"
            className="mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
          />
        </label>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-400">Webhook status:</span>
          <span className={`px-2 py-0.5 rounded-full border text-xs ${webhookActive ? 'border-green-500/30 text-green-300 bg-green-500/10' : 'border-red-500/30 text-red-300 bg-red-500/10'}`}>
            {webhookActive ? 'ativo' : 'inativo'}
          </span>
        </div>

        <button onClick={save} disabled={saving} className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-medium px-4 py-2 rounded-lg">
          {saving ? 'Salvando...' : 'Salvar pagamentos'}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Transações recentes</h2>
        {loading ? (
          <p className="text-slate-400 text-sm">Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-sm">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="text-left py-2">Data</th>
                  <th className="text-left py-2">Tenant</th>
                  <th className="text-left py-2">Usuário</th>
                  <th className="text-left py-2">Tipo</th>
                  <th className="text-left py-2">Valor</th>
                  <th className="text-left py-2">Stripe ID</th>
                  <th className="text-left py-2">Descrição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-3 text-slate-400 text-xs">{new Date(tx.created_at).toLocaleString('pt-BR')}</td>
                    <td className="py-3 text-white">{tx.tenant_name || '—'}</td>
                    <td className="py-3 text-slate-300">{tx.user_email || '—'}</td>
                    <td className="py-3 text-slate-300">{tx.type}</td>
                    <td className={`py-3 font-medium ${tx.amount >= 0 ? 'text-green-300' : 'text-red-300'}`}>{tx.amount}</td>
                    <td className="py-3 text-slate-400 text-xs">{tx.stripe_payment_id || '—'}</td>
                    <td className="py-3 text-slate-400">{tx.description || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
