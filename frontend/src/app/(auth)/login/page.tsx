'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email ou senha incorretos')
      setLoading(false)
      return
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-blue-400">HFA Platform</span>
          <p className="text-slate-400 mt-2">Acesse sua conta</p>
        </div>
        <form onSubmit={handleLogin}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="seu@email.com" required />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-3 rounded-lg font-medium transition">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <p className="text-center text-slate-400 text-sm">
            Não tem conta?{' '}
            <Link href="/register" className="text-blue-400 hover:underline">Criar conta grátis</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
