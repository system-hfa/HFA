interface FlowNode {
  resposta: string
  justificativa: string
}

interface FlowStepProps {
  nos: FlowNode[]
  codigo: string
  falhasDescartadas: string
}

export default function FlowStep({ nos, codigo, falhasDescartadas }: FlowStepProps) {
  if (!nos || nos.length === 0) {
    return (
      <div className="mt-4 text-slate-400 text-sm">
        Nenhum nó percorrido disponível.
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {nos.map((no, i) => (
          <div
            key={i}
            className={`rounded-lg border p-4 ${
              no.resposta?.toLowerCase() === 'sim'
                ? 'border-green-700 bg-green-950'
                : 'border-red-700 bg-red-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  no.resposta?.toLowerCase() === 'sim' ? 'bg-green-700' : 'bg-red-700'
                }`}
              >
                {no.resposta?.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400">Nó {i + 1}</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{no.justificativa}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-emerald-500 bg-emerald-950 p-5 text-center">
        <span className="text-3xl font-bold text-emerald-400">{codigo}</span>
        <p className="text-xs text-slate-400 mt-1">Código final identificado</p>
        {falhasDescartadas && (
          <p className="text-xs text-slate-500 mt-2 border-t border-emerald-900 pt-2">
            Descartadas: {falhasDescartadas}
          </p>
        )}
      </div>
    </div>
  )
}
