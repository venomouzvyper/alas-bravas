import { getSupabase } from '@/lib/supabase';
import { ConfiguracionAdmin } from './ConfiguracionAdmin';

const MANDADITOS_DEFAULT = '50489010135';

async function getMandaditosTel(): Promise<string> {
  const supabase = getSupabase();
  if (!supabase) return MANDADITOS_DEFAULT;

  const { data } = await supabase
    .from('configuracion')
    .select('valor')
    .eq('clave', 'mandaditos_telefono')
    .single();

  return data?.valor ?? MANDADITOS_DEFAULT;
}

export default async function ConfiguracionPage() {
  const mandaditosTel = await getMandaditosTel();
  return <ConfiguracionAdmin mandaditosTel={mandaditosTel} />;
}
