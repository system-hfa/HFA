import crypto from 'crypto'

function getEncryptionKey(): Buffer {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!secret?.trim()) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY não configurada (necessária para criptografar ai_settings).'
    )
  }
  // Deriva uma chave fixa de 32 bytes para AES-256-GCM.
  return crypto.createHash('sha256').update(secret, 'utf8').digest()
}

export function encryptString(plain: string): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(12) // recommended size for GCM

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  // Mantemos tudo como base64 para armazenar num TEXT.
  return JSON.stringify({
    v: 1,
    iv: iv.toString('base64'),
    ct: ciphertext.toString('base64'),
    tag: tag.toString('base64'),
  })
}

export function decryptString(enc: string): string {
  const parsed = JSON.parse(enc) as { v?: number; iv: string; ct: string; tag: string }
  if (!parsed?.iv || !parsed?.ct || !parsed?.tag) throw new Error('ai_settings: payload inválido')

  const key = getEncryptionKey()
  const iv = Buffer.from(parsed.iv, 'base64')
  const ciphertext = Buffer.from(parsed.ct, 'base64')
  const tag = Buffer.from(parsed.tag, 'base64')

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)

  const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')
  return plain
}

export function maskKeySuffix(plain: string): string {
  const s = plain.trim()
  if (!s) return ''
  // Mostra só os últimos 3 caracteres (como solicitado).
  return s.slice(-3)
}

