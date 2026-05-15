'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { LearnNav } from '@/components/learn/LearnNav'
import { CodeBadge } from '@/components/learn/CodeBadge'

type CodeEntry = {
  code: string
  name: string
  category: 'perception' | 'objective' | 'action'
  when: string
}

const allCodes: CodeEntry[] = [
  { code: 'P-A', name: 'Sem falha de percepção',          category: 'perception', when: 'Percepção correta' },
  { code: 'P-B', name: 'Falha sensorial',                  category: 'perception', when: 'Limitação física ou ambiental' },
  { code: 'P-C', name: 'Falha de conhecimento',            category: 'perception', when: 'Não interpretou o sinal' },
  { code: 'P-D', name: 'Atenção (pressão externa)',        category: 'perception', when: 'Tempo insuficiente imposto' },
  { code: 'P-E', name: 'Gerenciamento de tempo',           category: 'perception', when: 'Urgência autoimposta' },
  { code: 'P-F', name: 'Informação ilusória',              category: 'perception', when: 'Dados enganosos ou ambíguos' },
  { code: 'P-G', name: 'Atenção (info disponível)',        category: 'perception', when: 'Ignorou info acessível' },
  { code: 'P-H', name: 'Falha de comunicação',             category: 'perception', when: 'Info não chegou ou chegou errada' },
  { code: 'O-A', name: 'Sem falha de objetivo',            category: 'objective',  when: 'Intenção correta e conservativa' },
  { code: 'O-B', name: 'Violação rotineira',               category: 'objective',  when: 'Desvio habitual e normalizado' },
  { code: 'O-C', name: 'Violação excepcional/circunstancial', category: 'objective',  when: 'Desvio consciente, pontual e não rotineiro' },
  { code: 'O-D', name: 'Intenção não conservativa',        category: 'objective',  when: 'Escolha de opção mais arriscada' },
  { code: 'A-A', name: 'Sem falha de ação',                category: 'action',     when: 'Execução correta' },
  { code: 'A-B', name: 'Deslize/lapso/omissão',            category: 'action',     when: 'Erro involuntário de execução' },
  { code: 'A-C', name: 'Feedback na execução',             category: 'action',     when: 'Sem confirmação durante execução' },
  { code: 'A-D', name: 'Inabilidade física',               category: 'action',     when: 'Limitação física ou motora' },
  { code: 'A-E', name: 'Falha de conhecimento',            category: 'action',     when: 'Não sabia qual ação executar' },
  { code: 'A-F', name: 'Seleção errada (sem pressão)',     category: 'action',     when: 'Escolha incorreta sem urgência' },
  { code: 'A-G', name: 'Feedback na decisão',              category: 'action',     when: 'Não monitorou resultado da ação' },
  { code: 'A-H', name: 'Gerenciamento de tempo',           category: 'action',     when: 'Priorização inadequada sob pressão' },
  { code: 'A-I', name: 'Seleção errada (com pressão)',     category: 'action',     when: 'Escolha incorreta sob urgência' },
  { code: 'A-J', name: 'Feedback por pressão',             category: 'action',     when: 'Sem tempo para verificar resultado' },
]

const categoryLabel: Record<string, string> = {
  perception: 'Percepção',
  objective: 'Objetivo',
  action: 'Ação',
}

const filterOptions = [
  { key: 'all', label: 'Todos' },
  { key: 'perception', label: 'Percepção (P)' },
  { key: 'objective', label: 'Objetivo (O)' },
  { key: 'action', label: 'Ação (A)' },
]

export default function CodesPage() {
  const [filter, setFilter] = useState<'all' | 'perception' | 'objective' | 'action'>('all')
  const [search, setSearch] = useState('')

  const visible = allCodes.filter((c) => {
    const matchesFilter = filter === 'all' || c.category === filter
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.when.toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex gap-8 p-8 max-w-7xl mx-auto">
      <LearnNav />

      <div className="flex-1 min-w-0 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/learn" className="hover:text-slate-300 transition">Metodologia SERA</Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-300">Glossário</span>
        </nav>

        <div>
          <h1 className="text-3xl font-bold text-white">Glossário de Códigos SERA</h1>
          <p className="text-slate-400 mt-2">Referência rápida para todos os 22 códigos de falha.</p>
        </div>

        {/* Filtros e busca */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-1.5">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key as typeof filter)}
                className={[
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                  filter === opt.key
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Buscar código ou nome…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
          />
        </div>

        {/* Tabela */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="text-left px-4 py-3 font-medium w-20">Código</th>
                <th className="text-left px-4 py-3 font-medium">Nome</th>
                <th className="text-left px-4 py-3 font-medium w-28 hidden sm:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Quando usar</th>
                <th className="text-left px-4 py-3 font-medium w-20 hidden lg:table-cell">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    Nenhum código encontrado para esta busca.
                  </td>
                </tr>
              ) : (
                visible.map((c) => (
                  <tr key={c.code} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition">
                    <td className="px-4 py-3">
                      <CodeBadge code={c.code} size="sm" />
                    </td>
                    <td className="px-4 py-3 text-slate-300">{c.name}</td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{categoryLabel[c.category]}</td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{c.when}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Link
                        href={`/learn/${c.category}`}
                        className="text-slate-600 hover:text-slate-400 text-xs transition"
                      >
                        Ver →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-slate-600 text-xs">{visible.length} de {allCodes.length} códigos exibidos</p>
      </div>
    </div>
  )
}
