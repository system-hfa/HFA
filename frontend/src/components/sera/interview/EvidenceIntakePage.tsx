'use client'

import { useState, useCallback } from 'react'
import { AlertTriangle, ClipboardList, ListChecks, MessagesSquare, ShieldCheck } from 'lucide-react'
import { assessInterviewSufficiency } from '@/lib/sera/interview/assess-sufficiency'
import questionBankRaw from '@/lib/sera/interview/question-bank.json'
import sufficiencyGatesRaw from '@/lib/sera/interview/sufficiency-gates.json'
import type { EvidenceMap, InterviewSection, SufficiencyGate, SufficiencyResult } from '@/lib/sera/interview/types'

import { TranscriptPanel } from './TranscriptPanel'
import { InterviewQuestionBank } from './InterviewQuestionBank'
import { SufficiencyChecklist } from './SufficiencyChecklist'
import { SufficiencyResultPanel } from './SufficiencyResultPanel'

type QuestionState = { asked: boolean; notes: string }

const sections = questionBankRaw.sections as unknown as InterviewSection[]
const gates = sufficiencyGatesRaw.gates as unknown as SufficiencyGate[]

const HOW_TO_STEPS = [
  { n: 1, text: 'Comece pela narrativa livre antes de fazer perguntas específicas.' },
  { n: 2, text: 'Siga os blocos de percepção, objetivo, ação e pré-condições.' },
  { n: 3, text: 'Grave a entrevista em áudio quando houver consentimento.' },
  { n: 4, text: 'Transcreva e revise o texto antes de usar no HFA.' },
  { n: 5, text: 'Marque as evidências coletadas no checklist abaixo.' },
  { n: 6, text: 'Rode a verificação de suficiência.' },
  { n: 7, text: 'Use as perguntas complementares se houver lacunas críticas.' },
]

type Section = 'transcript' | 'questions' | 'checklist' | 'result'

const SECTION_ORDER: Section[] = ['transcript', 'questions', 'checklist', 'result']

const SECTION_META: Record<Section, { icon: React.ElementType; label: string }> = {
  transcript: { icon: MessagesSquare, label: 'Áudio e transcrição' },
  questions: { icon: ClipboardList, label: 'Roteiro de perguntas' },
  checklist: { icon: ListChecks, label: 'Evidências coletadas' },
  result: { icon: ShieldCheck, label: 'Suficiência' },
}

export function EvidenceIntakePage() {
  const [transcript, setTranscript] = useState('')
  const [consentConfirmed, setConsentConfirmed] = useState(false)
  const [transcriptionReviewed, setTranscriptionReviewed] = useState(false)
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({})
  const [evidenceMap, setEvidenceMap] = useState<EvidenceMap>({})
  const [sufficiencyResult, setSufficiencyResult] = useState<SufficiencyResult | null>(null)
  const [activeSection, setActiveSection] = useState<Section>('transcript')

  const handleUpdateQuestion = useCallback((id: string, patch: Partial<QuestionState>) => {
    setQuestionStates((prev) => {
      const existing = prev[id] ?? { asked: false, notes: '' }
      return { ...prev, [id]: { ...existing, ...patch } }
    })
  }, [])

  const handleToggleEvidence = useCallback(
    (dimension: keyof EvidenceMap, key: string, value: boolean) => {
      setEvidenceMap((prev) => ({
        ...prev,
        [dimension]: {
          ...((prev[dimension] as Record<string, boolean>) ?? {}),
          [key]: value,
        },
      }))
      setSufficiencyResult(null)
    },
    []
  )

  function handleRunSufficiency() {
    const result = assessInterviewSufficiency(evidenceMap)
    setSufficiencyResult(result)
    setActiveSection('result')
  }

  const askedCount = Object.values(questionStates).filter((s) => s.asked).length
  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0)
  const checkedGates = gates.filter((g) => {
    const dimMap = evidenceMap[g.dimension as keyof EvidenceMap] ?? {}
    return !!(dimMap as Record<string, boolean>)[g.evidence_keys[0]]
  }).length

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Coleta de Evidências SERA</h1>
          <p className="text-slate-400 mt-2 leading-relaxed max-w-2xl">
            Use este roteiro para coletar informações antes da análise. A entrevista não classifica
            o evento — ela reduz lacunas e ambiguidades metodológicas.
          </p>
        </div>

        <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
          <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-300/90">
            Evite perguntas acusatórias ou termos como <em>erro</em>, <em>culpa</em>,{' '}
            <em>violação</em>, <em>P-D</em> ou <em>A-C</em> durante a entrevista.
          </p>
        </div>
      </div>

      {/* How to use */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Como usar</h2>
        <div className="space-y-2">
          {HOW_TO_STEPS.map((step) => (
            <div key={step.n} className="flex items-start gap-3">
              <span className="size-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {step.n}
              </span>
              <p className="text-sm text-slate-400 pt-0.5">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Progress bar */}
      <div className="grid grid-cols-4 gap-2">
        {SECTION_ORDER.map((key) => {
          const meta = SECTION_META[key]
          const Icon = meta.icon
          const isActive = activeSection === key
          return (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition text-center ${
                isActive
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              <Icon className="size-4" />
              <span className="text-[11px] font-medium leading-tight">{meta.label}</span>
            </button>
          )
        })}
      </div>

      {/* Sections */}
      {activeSection === 'transcript' && (
        <TranscriptPanel
          transcript={transcript}
          setTranscript={setTranscript}
          consentConfirmed={consentConfirmed}
          setConsentConfirmed={setConsentConfirmed}
          transcriptionReviewed={transcriptionReviewed}
          setTranscriptionReviewed={setTranscriptionReviewed}
        />
      )}

      {activeSection === 'questions' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Roteiro de perguntas</h2>
            <span className="text-xs text-slate-500">
              {askedCount}/{totalQuestions} perguntadas
            </span>
          </div>
          <InterviewQuestionBank
            sections={sections}
            questionStates={questionStates}
            onUpdateQuestion={handleUpdateQuestion}
          />
        </section>
      )}

      {activeSection === 'checklist' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Evidências coletadas</h2>
            <span className="text-xs text-slate-500">
              {checkedGates}/{gates.length} marcadas
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Marque as evidências presentes na transcrição ou nas anotações. Os gates obrigatórios
            são pré-requisito para iniciar a análise SERA.
          </p>
          <SufficiencyChecklist
            gates={gates}
            evidenceMap={evidenceMap}
            onToggle={handleToggleEvidence}
          />

          <div className="flex justify-end pt-2">
            <button
              onClick={handleRunSufficiency}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition"
            >
              Verificar suficiência
            </button>
          </div>
        </section>
      )}

      {activeSection === 'result' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Resultado da verificação</h2>
            <button
              onClick={handleRunSufficiency}
              className="text-xs text-blue-400 hover:text-blue-300 transition"
            >
              Recalcular
            </button>
          </div>

          {sufficiencyResult ? (
            <>
              <SufficiencyResultPanel result={sufficiencyResult} />

              {/* Disabled CTA */}
              <div className="pt-2">
                <button
                  disabled
                  className="w-full bg-slate-700 text-slate-500 text-sm font-medium px-6 py-3 rounded-xl cursor-not-allowed"
                  title="Disponível após integração com o pipeline e revisão da transcrição."
                >
                  Enviar para análise SERA
                </button>
                <p className="text-xs text-slate-600 text-center mt-2">
                  Disponível após integração com o pipeline e revisão da transcrição.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center space-y-4">
              <p className="text-slate-400 text-sm">
                Nenhuma verificação rodada ainda.
              </p>
              <button
                onClick={() => setActiveSection('checklist')}
                className="text-blue-400 hover:text-blue-300 text-sm transition"
              >
                Ir para o checklist de evidências →
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
