import type { NextConfig } from 'next'
import fs from 'fs'
import path from 'path'
import { config as loadEnvFile } from 'dotenv'

const cwd = process.cwd()

/**
 * Monorepo: variáveis em `frontend/.env` e em `../.env` na raiz do repo.
 * `override: false` — não sobrepõe o que o Next.js já carregou (.env.local, etc.).
 */
const envCandidates = [path.resolve(cwd, '.env'), path.resolve(cwd, '..', '.env')]
for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    loadEnvFile({ path: envPath, override: false })
  }
}

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse', 'canvas'],
}

export default nextConfig
