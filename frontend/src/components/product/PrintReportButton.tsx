'use client'

type PrintReportButtonProps = {
  label?: string
  className?: string
}

export function PrintReportButton({
  label = 'Imprimir / salvar PDF',
  className = '',
}: PrintReportButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors ${className}`.trim()}
    >
      {label}
    </button>
  )
}
