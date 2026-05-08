/**
 * OAuth redirect after Google (and other providers). Must match an entry in
 * Supabase Dashboard → Authentication → URL Configuration → Redirect URLs.
 *
 * Prefer current origin in runtime; use NEXT_PUBLIC_SITE_URL only when
 * you intentionally need a fixed canonical host.
 */
export function getOAuthRedirectUrl(): string {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '').trim()
  if (envBase) {
    return `${envBase}/auth/callback`
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback`
  }
  return '/auth/callback'
}
