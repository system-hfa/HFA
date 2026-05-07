'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/events', label: 'Eventos', icon: '📋' },
  { href: '/events/new', label: 'Nova Análise', icon: '➕' },
  { href: '/actions', label: 'Ações Corretivas', icon: '✅' },
  { href: '/credits', label: 'Créditos', icon: '💳' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/login')
      else setUserEmail(data.session.user.email || '')
    })
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <span className="text-lg font-bold text-blue-400">HFA Platform</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-2 truncate">{userEmail}</p>
          <button onClick={handleLogout}
            className="w-full text-sm text-slate-400 hover:text-white py-2 transition text-left">
            Sair →
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
