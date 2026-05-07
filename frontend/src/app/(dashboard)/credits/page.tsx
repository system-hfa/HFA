'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const PACKAGES = [
  { id: 'starter',      name: 'Starter',      credits: 10,  price: 'R$ 97',  per: 'R$ 9,70/análise' },
  { id: 'professional', name: 'Professional',  credits: 30,  price: 'R$ 247', per: 'R$ 8,23/análise', highlight: true },
  { id: 'enterprise',   name: 'Enterprise',    credits: 100, price: 'R$ 697', per: 'R$ 6,97/análise' },
]

export default function CreditsPage() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: tenant } = await supabase
        .from('tenants').select('credits_balance').single()
      const { data: txs } = await supabase
        .from('credit_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      setBalance(tenant?.credits_balance || 0)
      setTransactions(txs || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Créditos</h1>
        <p className="text-slate-400">Cada análise SERA completa consome 1 crédito</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">Saldo atual</p>
          <p className="text-4xl font-bold text-white">{balance} <span className="text-slate-400 text-xl font-normal">créditos</span></p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">Equivale a</p>
          <p className="text-2xl font-semibold text-blue-400">{balance} análises</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-white mb-4">Comprar créditos</h2>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {PACKAGES.map(pkg => (
          <div key={pkg.id}
            className={`bg-slate-900 border rounded-xl p-6 relative ${
              pkg.highlight ? 'border-blue-500' : 'border-slate-800'
            }`}>
            {pkg.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                Mais popular
              </span>
            )}
            <h3 className="font-semibold text-white mb-1">{pkg.name}</h3>
            <p className="text-3xl font-bold text-white mb-1">{pkg.credits} <span className="text-slate-400 text-base font-normal">créditos</span></p>
            <p className="text-2xl font-semibold text-blue-400 mb-1">{pkg.price}</p>
            <p className="text-slate-500 text-xs mb-4">{pkg.per}</p>
            <button className={`w-full py-2 rounded-lg text-sm font-medium transition ${
              pkg.highlight
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}>
              Comprar
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-white mb-4">Histórico</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? <p className="p-6 text-slate-400">Carregando...</p> : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs text-slate-400 px-6 py-3">Data</th>
                <th className="text-left text-xs text-slate-400 px-6 py-3">Descrição</th>
                <th className="text-right text-xs text-slate-400 px-6 py-3">Créditos</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx: any) => (
                <tr key={tx.id} className="border-b border-slate-800 last:border-0">
                  <td className="px-6 py-3 text-slate-400 text-sm">
                    {new Date(tx.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-3 text-slate-300 text-sm">{tx.description}</td>
                  <td className={`px-6 py-3 text-right font-mono font-semibold ${
                    tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400 text-sm">Nenhuma transação ainda</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
