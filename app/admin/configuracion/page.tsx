import { getSupabase } from '@/lib/supabase';
import { ConfiguracionAdmin } from './ConfiguracionAdmin';

const DEFAULTS = {
  mandaditosTel:        '50489010135',
  horaApertura:         '11:00',
  horaCierre:           '00:00',
  mostrarPreciosBebidas: true,
  compraBebidas:         false,
};

async function getConfig() {
  const supabase = getSupabase();
  if (!supabase) return DEFAULTS;

  const { data } = await supabase.from('configuracion').select('clave, valor');
  if (!data) return DEFAULTS;

  const cfg: Record<string, string> = Object.fromEntries(data.map(r => [r.clave, r.valor]));

  return {
    mandaditosTel:        cfg.mandaditos_telefono   ?? DEFAULTS.mandaditosTel,
    horaApertura:         cfg.hora_apertura         ?? DEFAULTS.horaApertura,
    horaCierre:           cfg.hora_cierre           ?? DEFAULTS.horaCierre,
    mostrarPreciosBebidas: cfg.mostrar_precios_bebidas !== 'false',
    compraBebidas:        cfg.compra_bebidas === 'true',
  };
}

export default async function ConfiguracionPage() {
  const config = await getConfig();
  return <ConfiguracionAdmin {...config} />;
}
