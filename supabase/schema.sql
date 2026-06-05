-- ============================================================
-- Alas Bravas — Schema Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Tabla de items del menú
CREATE TABLE IF NOT EXISTS menu_items (
  id            UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria     TEXT      NOT NULL CHECK (categoria IN ('alitas','carnes','tajadas','pupusas','bebidas','promos')),
  nombre        TEXT      NOT NULL,
  descripcion   TEXT,
  precio        INTEGER   NOT NULL,
  acompanamientos TEXT[],
  dia           TEXT,
  spice         TEXT      CHECK (spice IN ('mild','medium','hot','inferno')),
  emoji         TEXT      NOT NULL DEFAULT '🍗',
  gradient_from TEXT      DEFAULT '#1A0600',
  gradient_to   TEXT      DEFAULT '#C1121F',
  activo        BOOLEAN   DEFAULT true,
  orden         INTEGER   DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- RLS: solo lectura pública
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "menu_items_public_read" ON menu_items
  FOR SELECT USING (activo = true);

-- 2. Tabla de reservaciones
CREATE TABLE IF NOT EXISTS reservaciones (
  id        UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre    TEXT      NOT NULL,
  telefono  TEXT      NOT NULL,
  fecha     DATE      NOT NULL,
  hora      TEXT      NOT NULL,
  personas  INTEGER   NOT NULL CHECK (personas >= 1 AND personas <= 20),
  notas     TEXT,
  estado    TEXT      DEFAULT 'pendiente' CHECK (estado IN ('pendiente','confirmada','cancelada')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: solo inserción pública (lectura solo desde admin/service role)
ALTER TABLE reservaciones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reservaciones_public_insert" ON reservaciones
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- SEED: datos del menú real
-- ============================================================
INSERT INTO menu_items (categoria, nombre, descripcion, precio, acompanamientos, dia, spice, emoji, gradient_from, gradient_to, orden) VALUES
  ('alitas',   '6 Alitas',                        'Crujientes y jugosas. BB o Búfalo a tu elección.',            180,  NULL,                                              NULL,      'medium', '🍗', '#2A1400', '#E85D04', 1),
  ('alitas',   '12 Alitas',                       'La porción grande para compartir. BB o Búfalo.',              320,  NULL,                                              NULL,      'medium', '🍗', '#1A0A00', '#C1121F', 2),
  ('carnes',   'Carne de Cerdo con Chorizo',       'Carne de asada de cerdo y chorizo a la parrilla.',            160,  ARRAY['Tajadas','Frijoles fritos','Encurtido','Aderezos'], NULL, 'mild',   '🥩', '#1A0800', '#8B3A0F', 3),
  ('carnes',   'Chuleta Asada con Chorizo',        'Chuleta asada a la perfección con chorizo artesanal.',        160,  ARRAY['Tajadas','Frijoles fritos','Encurtido','Aderezos'], NULL, 'mild',   '🍖', '#200A00', '#7A2B00', 4),
  ('tajadas',  'Tajadas Preparadas',               'Tajadas fritas servidas con todos los extras de la casa.',    90,   ARRAY['Carne molida','Ensalada','Encurtido','Aderezo'],   NULL, 'mild',   '🍌', '#1A1400', '#856404', 5),
  ('pupusas',  '3 Pupusas de Quesillo',            'Rellenas de quesillo derretido. Especial Mié y Jue.',         100,  ARRAY['Salsa','Ensalada','Encurtido'],                    'Mié / Jue', NULL, '🫓', '#1A1200', '#6B4C00', 6),
  ('pupusas',  '3 Pupusas de Chicharrón',          'Rellenas de chicharrón crujiente. Especial Mié y Jue.',       110,  ARRAY['Salsa','Ensalada','Encurtido'],                    'Mié / Jue', NULL, '🫓', '#200E00', '#7A3800', 7),
  ('bebidas',  'Refresco Portátil',                'Refrescos bien fríos para acompañar tu comida.',              30,   NULL,                                              NULL,      NULL,     '🥤', '#001A12', '#00572E', 8),
  ('promos',   '2 Platos: Chuleta con Chorizo',    'Dos chuletas asadas con chorizo. ¡Solo los viernes!',         300,  ARRAY['Tajadas','Frijoles fritos','Encurtido','Aderezos'], 'Viernes', NULL, '🎉', '#1A0400', '#8B0000', 9),
  ('promos',   '2 Platos: Carne de Cerdo con Chorizo', 'Dos platos de carne de cerdo + chorizo. Solo los viernes.', 300, ARRAY['Tajadas','Frijoles fritos','Encurtido','Aderezos'], 'Viernes', NULL, '🎉', '#1A0600', '#7A1F00', 10),
  ('promos',   '14 Alitas BB o Búfalo',            'La promo del miércoles y jueves para compartir.',             300,  ARRAY['Papas','Kétchup','Aderezo de la casa'],           'Mié / Jue', 'medium', '🔥', '#200800', '#C1121F', 11),
  ('promos',   '7 Alitas BB o Búfalo',             'Promo personal de miércoles y jueves.',                       180,  ARRAY['Papas','Kétchup','Aderezo de la casa'],           'Mié / Jue', 'medium', '🔥', '#1A0600', '#E85D04', 12);

-- ============================================================
-- 3. Tabla de configuración general
-- ============================================================
CREATE TABLE IF NOT EXISTS configuracion (
  clave       TEXT PRIMARY KEY,
  valor       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
CREATE POLICY "configuracion_public_read" ON configuracion
  FOR SELECT USING (true);

INSERT INTO configuracion (clave, valor) VALUES
  ('mandaditos_telefono',     '50489010135'),
  ('hora_apertura',           '11:00'),
  ('hora_cierre',             '00:00'),
  ('mostrar_precios_bebidas', 'true'),
  ('compra_bebidas',          'false')
ON CONFLICT (clave) DO NOTHING;

-- Agregar subcategoria a menu_items (ejecutar si ya existe la tabla)
-- ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS subcategoria TEXT;
