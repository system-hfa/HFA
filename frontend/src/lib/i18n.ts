'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import ptBR from '@/messages/pt-BR.json'
import en from '@/messages/en.json'

type Locale = 'pt-BR' | 'en'

interface I18nStore {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useI18n = create<I18nStore>()(
  persist(
    (set) => ({
      locale: 'pt-BR',
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'hfa-locale' }
  )
)

// Hook de tradução
export function useT() {
  const { locale } = useI18n()
  const messages = locale === 'pt-BR'
    ? ptBR
    : en

  return function t(key: string): string {
    const keys = key.split('.')
    let value: unknown = messages
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    return typeof value === 'string' ? value : key
  }
}
