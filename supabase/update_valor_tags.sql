-- Actualizar valorTag de promos de alitas: de "X alitas extra" a cuánto ahorra el cliente en dinero
-- Ejecutar en el SQL Editor de Supabase: https://supabase.com/dashboard/project/dgacqokpfwrizgcivsbr/sql

UPDATE menu_items SET valor_tag = 'AHORRÁS L.20' WHERE nombre ILIKE '%14 Alitas%';
UPDATE menu_items SET valor_tag = 'AHORRÁS L.30' WHERE nombre ILIKE '%7 Alitas%';

-- Actualizar nombres de bebidas para que sean descriptivos
UPDATE menu_items SET nombre = 'Portátil Coca Cola / Pepsi / Mirinda / Sabores' WHERE nombre = 'Portátil';
UPDATE menu_items SET nombre = 'Lata Pepsi / Otros Sabores / Mountain Dew' WHERE nombre = 'Lata Pepsi / Mountain Dew';
