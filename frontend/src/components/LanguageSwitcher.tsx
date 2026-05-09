'use client'
import { useI18n } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <button
      onClick={() => setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR')}
      className="flex items-center gap-1.5 text-xs text-slate-400
        hover:text-white transition-colors px-2 py-1 rounded
        hover:bg-slate-800"
      title={locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className="text-base">
        {locale === 'pt-BR' ? '🇧🇷' : '🇺🇸'}
      </span>
      <span className="font-mono uppercase">
        {locale === 'pt-BR' ? 'PT' : 'EN'}
      </span>
    </button>
  )
}
