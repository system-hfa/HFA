'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, FlaskConical, GitBranch, Eye, Target, Hand, List } from 'lucide-react'

const navItems = [
  { href: '/learn',             label: 'Visão Geral',      icon: BookOpen,    badge: null },
  { href: '/learn/foundations', label: 'Bases Científicas', icon: FlaskConical, badge: 'Por que funciona' },
  { href: '/learn/pipeline',    label: 'O Pipeline',        icon: GitBranch,   badge: null },
  { href: '/learn/perception', label: 'Percepção',    icon: Eye,       badge: '8 códigos' },
  { href: '/learn/objective',  label: 'Objetivo',     icon: Target,    badge: '4 códigos' },
  { href: '/learn/action',     label: 'Ação',         icon: Hand,      badge: '10 códigos' },
  { href: '/learn/codes',      label: 'Glossário',    icon: List,      badge: null },
]

export function LearnNav() {
  const pathname = usePathname()

  return (
    <aside className="w-52 shrink-0">
      <nav className="sticky top-6 space-y-0.5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-3">
          Metodologia SERA
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all',
                isActive
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50',
              ].join(' ')}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
