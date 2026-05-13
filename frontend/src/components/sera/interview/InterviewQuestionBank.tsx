'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react'
import type { InterviewSection } from '@/lib/sera/interview/types'

type QuestionState = { asked: boolean; notes: string }

type Props = {
  sections: InterviewSection[]
  questionStates: Record<string, QuestionState>
  onUpdateQuestion: (id: string, patch: Partial<QuestionState>) => void
}

const DIMENSION_COLORS: Record<string, string> = {
  perception: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  objective: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  action: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  preconditions: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  narrative: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  closing: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
}

const SECTION_LABELS: Record<string, string> = {
  narrative: 'Bloco A — Narrativa livre',
  perception: 'Bloco B — Percepção',
  objective: 'Bloco C — Objetivo e intenção',
  action: 'Bloco D — Ação',
  preconditions: 'Bloco E — Pré-condições',
  closing: 'Bloco F — Fechamento',
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button
      onClick={handleCopy}
      title="Copiar pergunta"
      className="shrink-0 p-1 rounded text-slate-500 hover:text-slate-300 transition"
    >
      {copied ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
    </button>
  )
}

function SectionBlock({
  section,
  questionStates,
  onUpdateQuestion,
}: {
  section: InterviewSection
  questionStates: Record<string, QuestionState>
  onUpdateQuestion: (id: string, patch: Partial<QuestionState>) => void
}) {
  const [open, setOpen] = useState(section.id === 'narrative')
  const askedCount = section.questions.filter((q) => questionStates[q.id]?.asked).length

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-800/50 transition"
      >
        <div className="flex items-center gap-3">
          {open ? (
            <ChevronDown className="size-4 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="size-4 text-slate-400 shrink-0" />
          )}
          <span className="text-white font-medium text-sm">
            {SECTION_LABELS[section.id] ?? section.title}
          </span>
          <span className="text-xs text-slate-500">{section.purpose}</span>
        </div>
        <span className="text-xs text-slate-500 shrink-0">
          {askedCount}/{section.questions.length} perguntadas
        </span>
      </button>

      {open && (
        <div className="border-t border-slate-800 divide-y divide-slate-800">
          {section.questions.map((q) => {
            const state = questionStates[q.id] ?? { asked: false, notes: '' }
            return (
              <div
                key={q.id}
                className={`px-5 py-4 transition ${state.asked ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={state.asked}
                    onChange={(e) => onUpdateQuestion(q.id, { asked: e.target.checked })}
                    className="mt-1 size-4 accent-blue-500 shrink-0"
                    title="Marcar como perguntada"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start gap-2">
                      <p className="text-sm text-slate-200 leading-relaxed flex-1">{q.text}</p>
                      <CopyButton text={q.text} />
                    </div>

                    {q.related_sera_dimensions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {q.related_sera_dimensions.map((dim) => (
                          <span
                            key={dim}
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${DIMENSION_COLORS[dim] ?? 'text-slate-400 bg-slate-700 border-slate-600'}`}
                          >
                            {dim}
                          </span>
                        ))}
                      </div>
                    )}

                    <textarea
                      value={state.notes}
                      onChange={(e) => onUpdateQuestion(q.id, { notes: e.target.value })}
                      placeholder="Notas / resumo da resposta…"
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-slate-600 resize-none"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function InterviewQuestionBank({ sections, questionStates, onUpdateQuestion }: Props) {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <SectionBlock
          key={section.id}
          section={section}
          questionStates={questionStates}
          onUpdateQuestion={onUpdateQuestion}
        />
      ))}
    </div>
  )
}
