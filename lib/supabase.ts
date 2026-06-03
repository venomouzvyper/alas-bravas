import { createClient, SupabaseClient } from '@supabase/supabase-js';

function makeClient(key: string | undefined): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !key) return null;
  return createClient(url, key);
}

/** Cliente público — lectura desde Server Components y API routes */
export function getSupabase(): SupabaseClient | null {
  return makeClient(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/** Cliente de servicio — escritura desde API routes (nunca en el browser) */
export function getSupabaseAdmin(): SupabaseClient | null {
  return makeClient(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
