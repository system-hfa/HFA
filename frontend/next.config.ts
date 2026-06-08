import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  serverExternalPackages: ['pdf-parse-fork', 'mammoth', 'canvas', 'jsdom'],
  turbopack: {
    resolveAlias: {
      canvas: { browser: './empty-module.ts' },
      jsdom: { browser: './empty-module.ts' },
    },
  },
}

export default nextConfig
