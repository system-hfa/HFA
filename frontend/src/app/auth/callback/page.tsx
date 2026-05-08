'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureOAuthTenant } from '@/lib/ensure-tenant'

export default function AuthCallbackPage() {
  const router = useRouter()
  const hasHandledCallback = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      if (hasHandledCallback.current) return
      hasHandledCallback.current = true

      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')
      const err = url.searchParams.get('error') || url.searchParams.get('error_description')

      if (err) {
        console.error('[auth/callback] provider returned error', { err, href: window.location.href })
        router.replace('/login?error=auth')
        return
      }

      // Em PKCE, o supabase-js pode não fazer auto-exchange em alguns cenários.
      // Fazemos o exchange explicitamente quando existir `code`.
      if (code) {
        const { error: exErr } = await supabase.auth.exchangeCodeForSession(code)
        if (exErr) {
          console.error('[auth/callback] exchangeCodeForSession failed', {
            message: exErr.message,
          })
          router.replace('/login?error=auth')
          return
        }
      }

      const { data, error: sessionErr } = await supabase.auth.getSession()
      if (sessionErr) {
        console.error('[auth/callback] getSession failed', { message: sessionErr.message })
      }
      if (data.session) {
        await ensureOAuthTenant()
        router.replace('/dashboard')
        return
      }

      // fallback: evita loop infinito no callback
      console.error('[auth/callback] session missing after callback', { href: window.location.href })
      router.replace('/login?error=auth')
    }

    void handleCallback()
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
