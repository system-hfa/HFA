import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse-fork', 'mammoth', 'canvas', 'jsdom'],
  turbopack: {
    resolveAlias: {
      canvas: { browser: './empty-module.ts' },
      jsdom: { browser: './empty-module.ts' },
    },
  },
}

export default nextConfig
