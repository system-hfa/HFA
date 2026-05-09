'use client'

const colorMap: Record<string, string> = {
  P: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  O: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  A: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
}

const sizeMap = {
  sm: 'text-xs px-1.5 py-0.5 rounded',
  md: 'text-sm px-2 py-1 rounded-md',
  lg: 'text-base px-3 py-1.5 rounded-lg font-bold',
}

export function CodeBadge({ code, size = 'md' }: { code: string; size?: 'sm' | 'md' | 'lg' }) {
  const cat = code[0]?.toUpperCase() ?? 'P'
  const color = colorMap[cat] ?? colorMap.P
  return (
    <span className={`font-mono font-semibold inline-block ${color} ${sizeMap[size]}`}>
      {code}
    </span>
  )
}
