'use client'

import { Mic, FileText } from 'lucide-react'

type Props = {
  transcript: string
  setTranscript: (v: string) => void
  consentConfirmed: boolean
  setConsentConfirmed: (v: boolean) => void
  transcriptionReviewed: boolean
  setTranscriptionReviewed: (v: boolean) => void
}

export function TranscriptPanel({
  transcript,
  setTranscript,
  consentConfirmed,
  setConsentConfirmed,
  transcriptionReviewed,
  setTranscriptionReviewed,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
      <div className="flex items-start gap-3">
        <Mic className="size-5 text-blue-400 mt-0.5 shrink-0" />
        <div>
          <h2 className="text-white font-semibold">Áudio e transcrição</h2>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
            Recomenda-se gravar a entrevista em áudio, com consentimento, e transcrever antes de
            usar no HFA. A transcrição deve ser revisada por humano — erros automáticos podem alterar
            o sentido metodológico. Upload e transcrição automática serão funcionalidades futuras.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consentConfirmed}
            onChange={(e) => setConsentConfirmed(e.target.checked)}
            className="size-4 accent-blue-500"
          />
          <span className="text-sm text-slate-300 group-hover:text-white transition">
            Consentimento de gravação confirmado pelo entrevistado
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={transcriptionReviewed}
            onChange={(e) => setTranscriptionReviewed(e.target.checked)}
            className="size-4 accent-blue-500"
          />
          <span className="text-sm text-slate-300 group-hover:text-white transition">
            Transcrição revisada por humano antes do uso
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <FileText className="size-4" />
          Transcrição revisada
        </label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Cole aqui a transcrição revisada da entrevista. Separe as falas por E: (entrevistador) e R: (respondente) quando possível. Marque trechos inaudíveis como [inaudível] e dúvidas como [verificar termo]."
          rows={10}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 resize-y leading-relaxed"
        />
        {transcript.length > 0 && (
          <p className="text-xs text-slate-500">{transcript.length} caracteres</p>
        )}
      </div>
    </div>
  )
}
