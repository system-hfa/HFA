'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  ClipboardList,
  BarChart2,
  BookOpen,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ensureOAuthTenant } from '@/lib/ensure-tenant'

/* ── Nav config ─────────────────────────────────────────────── */
type NavItem = {
  href: string
  label: string
  icon: React.ElementType
  cta?: boolean
}

const mainNav: NavItem[] = [
  { href: '/dashboard',   label: 'Dashboard',        icon: LayoutDashboard },
  { href: '/events',      label: 'Eventos',           icon: FileText },
  { href: '/actions',     label: 'Ações Corretivas',  icon: ClipboardList },
  { href: '/risk-profile',label: 'Perfil de Risco',   icon: BarChart2 },
  { href: '/learn',       label: 'Metodologia SERA',  icon: BookOpen },
]

const bottomNav: NavItem[] = [
  { href: '/settings/ai', label: 'Configurações IA',  icon: Settings },
  { href: '/credits',     label: 'Créditos',           icon: CreditCard },
]

/* ── Breadcrumb map ─────────────────────────────────────────── */
const ROUTE_LABELS: Record<string, string> = {
  '/dashboard':    'Dashboard',
  '/events':       'Eventos',
  '/events/new':   'Novo Evento',
  '/actions':      'Ações Corretivas',
  '/risk-profile': 'Perfil de Risco',
  '/settings/ai':       'Configurações › IA',
  '/credits':           'Créditos',
  '/learn':             'Metodologia SERA',
  '/learn/pipeline':    'Metodologia SERA › Pipeline',
  '/learn/perception':  'Metodologia SERA › Percepção',
  '/learn/objective':   'Metodologia SERA › Objetivo',
  '/learn/action':      'Metodologia SERA › Ação',
  '/learn/codes':       'Metodologia SERA › Glossário',
}

function useBreadcrumb(pathname: string): { label: string; href?: string }[] {
  if (ROUTE_LABELS[pathname]) {
    return [{ label: ROUTE_LABELS[pathname] }]
  }
  if (pathname.startsWith('/events/new')) {
    return [{ label: 'Eventos', href: '/events' }, { label: 'Novo Evento' }]
  }
  if (pathname.match(/^\/events\/[^/]+$/)) {
    const id = pathname.split('/').pop()!
    return [{ label: 'Eventos', href: '/events' }, { label: `Evento ${id.slice(0, 8)}…` }]
  }
  const segments = pathname.split('/').filter(Boolean)
  return segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1),
    href: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
  }))
}

/* ── Sidebar nav item ───────────────────────────────────────── */
function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={[
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
        active
          ? 'bg-hfa-accent-subtle text-hfa-accent border-r-2 border-hfa-accent'
          : 'text-hfa-text-muted hover:bg-hfa-bg-muted hover:text-hfa-text',
      ].join(' ')}
    >
      <Icon className="size-4 shrink-0" />
      {item.label}
    </Link>
  )
}

/* ── Sidebar ────────────────────────────────────────────────── */
function Sidebar({
  pathname,
  userEmail,
  onLogout,
  onNav,
}: {
  pathname: string
  userEmail: string
  onLogout: () => void
  onNav?: () => void
}) {
  const initials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : 'US'

  return (
    <aside className="flex h-full w-60 flex-col bg-hfa-bg-subtle border-r border-hfa-border">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-hfa-border">
        <Link href="/dashboard" onClick={onNav} className="block">
          <div className="text-xl font-bold text-hfa-text tracking-tight">HFA</div>
          <div className="text-[10px] text-hfa-text-subtle uppercase tracking-widest mt-0.5">
            SERA Analysis
          </div>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {mainNav.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
            onClick={onNav}
          />
        ))}

        {/* New Event CTA */}
        <div className="pt-2 pb-1">
          <Link
            href="/events/new"
            onClick={onNav}
            className="flex items-center justify-center gap-2 mx-0 px-4 py-2.5 bg-hfa-accent hover:bg-hfa-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            <FilePlus className="size-4" />
            Nova Análise
          </Link>
        </div>
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-3 border-t border-hfa-border space-y-0.5">
        {bottomNav.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href}
            onClick={onNav}
          />
        ))}
      </div>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-hfa-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-8 rounded-full bg-hfa-accent text-white text-xs font-bold flex items-center justify-center shrink-0">
            {initials}
          </div>
          <p className="text-xs text-hfa-text-muted truncate">{userEmail}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 w-full text-xs text-hfa-text-subtle hover:text-hfa-text transition py-1"
        >
          <LogOut className="size-3.5" />
          Sair da conta
        </button>
      </div>
    </aside>
  )
}

/* ── Topbar ─────────────────────────────────────────────────── */
function Topbar({
  pathname,
  userEmail,
  onMenuClick,
}: {
  pathname: string
  userEmail: string
  onMenuClick: () => void
}) {
  const crumbs = useBreadcrumb(pathname)
  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : 'US'

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-hfa-border bg-hfa-bg/95 backdrop-blur-sm px-4 gap-3">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden rounded-lg p-1.5 text-hfa-text-muted hover:bg-hfa-bg-muted hover:text-hfa-text transition"
        aria-label="Abrir menu"
      >
        <Menu className="size-5" />
      </button>

      {/* Breadcrumb */}
      <nav className="flex-1 flex items-center gap-1.5 text-sm min-w-0">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <ChevronRight className="size-3.5 text-hfa-text-subtle shrink-0" />}
            {crumb.href ? (
              <Link href={crumb.href} className="text-hfa-text-muted hover:text-hfa-text transition truncate">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-hfa-text font-medium truncate">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* User avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="size-8 rounded-full bg-hfa-accent text-white text-xs font-bold flex items-center justify-center"
          title={userEmail}
        >
          {initials}
        </div>
      </div>
    </header>
  )
}

/* ── Root layout ────────────────────────────────────────────── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.push('/login')
      } else {
        setUserEmail(data.session.user.email ?? '')
        await ensureOAuthTenant()
      }
    })
  }, [router])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-hfa-bg flex">
      {/* ── Desktop sidebar ──────────────────────────── */}
      <div className="hidden md:flex md:w-60 md:shrink-0">
        <Sidebar
          pathname={pathname}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      </div>

      {/* ── Mobile drawer overlay ─────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-hfa-bg/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute inset-y-0 left-0 flex w-60 animate-slide-down">
            <Sidebar
              pathname={pathname}
              userEmail={userEmail}
              onLogout={handleLogout}
              onNav={() => setMobileOpen(false)}
            />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-3 rounded-lg p-1 text-hfa-text-muted hover:text-hfa-text"
              aria-label="Fechar menu"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Main content area ─────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar
          pathname={pathname}
          userEmail={userEmail}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
