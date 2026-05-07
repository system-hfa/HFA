/**
 * OAuth redirect after Google (and other providers). Must match an entry in
 * Supabase Dashboard → Authentication → URL Configuration → Redirect URLs.
 *
 * Set NEXT_PUBLIC_SITE_URL in Vercel to your canonical frontend URL, e.g.
 * https://hfa-omega.vercel.app — avoids falling back to localhost when Supabase
 * rejects redirectTo (if production URL is missing from the allowlist).
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
