'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ensureOAuthTenant } from '@/lib/ensure-tenant'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        await ensureOAuthTenant()
        router.replace('/dashboard')
      } else if (error) {
        router.replace('/login?error=auth')
      } else {
        // In PKCE flow, supabase-js auto-exchanges the code from URL
        // Wait a tick and try again
        setTimeout(async () => {
          const { data: d2 } = await supabase.auth.getSession()
          if (d2.session) {
            await ensureOAuthTenant()
            router.replace('/dashboard')
          } else {
            router.replace('/login?error=auth')
          }
        }, 1500)
      }
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
