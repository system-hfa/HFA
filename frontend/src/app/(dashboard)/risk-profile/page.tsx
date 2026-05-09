'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RiskProfilePage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { setLoading(false); return }
      fetch('/api/analyses/risk-profile', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
        .then(r => r.json())
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false))
    })
  }, [])

  if (loading) return <div className="p-6">Carregando perfil de risco...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Perfil de Risco Organizacional</h1>
      <p className="text-hfa-text-muted mb-6">
        Baseado nas análises SERA realizadas pela sua organização.
      </p>
      <pre className="text-xs bg-hfa-surface p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
