-- ═══════════════════════════════════════════════════════════════
-- Ejecutar en el SQL Editor de Supabase:
-- https://supabase.com/dashboard/project/dgacqokpfwrizgcivsbr/sql
-- ═══════════════════════════════════════════════════════════════

-- 1. valorTag: de "X alitas extra" a cuánto ahorra el cliente
UPDATE menu_items SET valor_tag = 'AHORRÁS L.20' WHERE nombre ILIKE '%14 Alitas%';
UPDATE menu_items SET valor_tag = 'AHORRÁS L.30' WHERE nombre ILIKE '%7 Alitas%';

-- 2. BB → BBQ en nombres de promos de alitas
UPDATE menu_items SET nombre = '14 Alitas BBQ o Búfalo' WHERE nombre = '14 Alitas BB o Búfalo';
UPDATE menu_items SET nombre = '7 Alitas BBQ o Búfalo'  WHERE nombre = '7 Alitas BB o Búfalo';

-- 3. Nombres de bebidas con nombre completo
UPDATE menu_items SET nombre = 'Portátil Coca Cola / Pepsi / Mirinda / Sabores'
  WHERE nombre = 'Portátil';
UPDATE menu_items SET nombre = 'Lata Pepsi / Otros Sabores / Mountain Dew'
  WHERE nombre = 'Lata Pepsi / Mountain Dew';

-- 4. Descripciones limpias y directas (informativas, no publicitarias)
UPDATE menu_items SET descripcion = 'BBQ o Búfalo — a elegir'
  WHERE nombre ILIKE '%6 Alitas%' AND categoria = 'alitas';
UPDATE menu_items SET descripcion = 'BBQ o Búfalo — a elegir'
  WHERE nombre ILIKE '%12 Alitas%' AND categoria = 'alitas';
UPDATE menu_items SET descripcion = 'Asada a las brasas'
  WHERE nombre = 'Carne Asada de Cerdo';
UPDATE menu_items SET descripcion = 'Asada a las brasas'
  WHERE nombre = 'Chuleta Asada de Cerdo';
UPDATE menu_items SET descripcion = 'Asada a las brasas con chorizo'
  WHERE nombre = 'Chuleta con Chorizo';
UPDATE menu_items SET descripcion = 'Asada a las brasas con chorizo'
  WHERE nombre = 'Carne de Cerdo con Chorizo';
UPDATE menu_items SET descripcion = 'Fritas y preparadas'
  WHERE nombre = '1 Orden de Tajadas';
UPDATE menu_items SET descripcion = 'Doble porción · fritas y preparadas'
  WHERE nombre = '2 Órdenes de Tajadas';
UPDATE menu_items SET descripcion = 'Rellenas de quesillo'
  WHERE nombre = '3 Pupusas de Quesillo';
UPDATE menu_items SET descripcion = 'Rellenas de chicharrón'
  WHERE nombre = '3 Pupusas de Chicharrón';
UPDATE menu_items SET descripcion = 'Dos platos de carne asada de cerdo'
  WHERE nombre = '2 Platos: Carne Asada de Cerdo';
UPDATE menu_items SET descripcion = 'Dos chuletas asadas de cerdo'
  WHERE nombre = '2 Platos: Chuleta Asada de Cerdo';
UPDATE menu_items SET descripcion = 'BBQ o Búfalo · con galleta de regalo'
  WHERE nombre = '14 Alitas BBQ o Búfalo';
UPDATE menu_items SET descripcion = 'BBQ o Búfalo · con galleta de regalo'
  WHERE nombre = '7 Alitas BBQ o Búfalo';
