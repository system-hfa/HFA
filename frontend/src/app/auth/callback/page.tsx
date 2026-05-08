'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureOAuthTenant } from '@/lib/ensure-tenant'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')
      const err = url.searchParams.get('error') || url.searchParams.get('error_description')

      if (err) {
        router.replace('/login?error=auth')
        return
      }

      // Em PKCE, o supabase-js pode não fazer auto-exchange em alguns cenários.
      // Fazemos o exchange explicitamente quando existir `code`.
      if (code) {
        const { error: exErr } = await supabase.auth.exchangeCodeForSession(window.location.href)
        if (exErr) {
          router.replace('/login?error=auth')
          return
        }
      }

      const { data } = await supabase.auth.getSession()
      if (data.session) {
        await ensureOAuthTenant()
        router.replace('/dashboard')
        return
      }

      // fallback: evita loop infinito no callback
      router.replace('/login?error=auth')
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Autenticando com Google...</p>
      </div>
    </div>
  )
}
