-- ═══════════════════════════════════════════════════════════════
-- EJECUTADO ✅ — Sesión La Carta QR (antes de Jun 2026)
-- Los cambios de esta sección ya fueron aplicados en producción.
-- ═══════════════════════════════════════════════════════════════

-- 1. valorTag: de "X alitas extra" a cuánto ahorra el cliente
-- UPDATE menu_items SET valor_tag = 'AHORRÁS L.20' WHERE nombre ILIKE '%14 Alitas%';
-- UPDATE menu_items SET valor_tag = 'AHORRÁS L.30' WHERE nombre ILIKE '%7 Alitas%';

-- 2. BB → BBQ en nombres de promos de alitas
-- UPDATE menu_items SET nombre = '14 Alitas BBQ o Búfalo' WHERE nombre = '14 Alitas BB o Búfalo';
-- UPDATE menu_items SET nombre = '7 Alitas BBQ o Búfalo'  WHERE nombre = '7 Alitas BB o Búfalo';

-- 3. Nombres de bebidas con nombre completo
-- UPDATE menu_items SET nombre = 'Portátil Coca Cola / Pepsi / Mirinda / Sabores' WHERE nombre = 'Portátil';
-- UPDATE menu_items SET nombre = 'Lata Pepsi / Otros Sabores / Mountain Dew' WHERE nombre = 'Lata Pepsi / Mountain Dew';

-- 4. Descripciones limpias y directas (ya ejecutadas)


-- ═══════════════════════════════════════════════════════════════
-- PENDIENTE DE EJECUTAR — Sesión Jun 2026
-- https://supabase.com/dashboard/project/dgacqokpfwrizgcivsbr/sql/new
-- ═══════════════════════════════════════════════════════════════

-- 1. Nuevo ítem: Alitas Bravas (especialidad de la casa)
--    ⚠️  Verificar precio con Mario antes de activar
INSERT INTO menu_items (categoria, nombre, descripcion, precio, acompanamientos, spice, destacado, valor_tag, emoji, gradient_from, gradient_to, activo, orden)
VALUES ('alitas', 'Alitas Bravas', 'Sazón propia · picantes', 180,
        ARRAY['Papas fritas', 'Aderezo de la casa'],
        'hot', true, '🏆 ESPECIALIDAD', '🔥', '#3D0000', '#C1121F', true, 0)
ON CONFLICT DO NOTHING;

-- Reordenar alitas: Alitas Bravas (0) → 6 Alitas (1) → 12 Alitas (2)
UPDATE menu_items SET orden = 1 WHERE nombre = '6 Alitas'  AND categoria = 'alitas';
UPDATE menu_items SET orden = 2 WHERE nombre = '12 Alitas' AND categoria = 'alitas';

-- 2. "Asada a las brasas" → "Asada a la plancha"
UPDATE menu_items SET descripcion = 'Asada a la plancha'             WHERE descripcion = 'Asada a las brasas';
UPDATE menu_items SET descripcion = 'Asada a la plancha con chorizo' WHERE descripcion = 'Asada a las brasas con chorizo';

-- 3. Chuleta Asada de Cerdo → Chuleta Barbacoa
UPDATE menu_items SET nombre = 'Chuleta Barbacoa' WHERE nombre = 'Chuleta Asada de Cerdo';

-- Promo viernes: misma actualización
UPDATE menu_items SET
  nombre      = '2 Platos: Chuleta Barbacoa',
  descripcion = 'Dos chuletas barbacoa'
WHERE nombre = '2 Platos: Chuleta Asada de Cerdo';

-- 4. Precios: Chuleta con Chorizo y Carne de Cerdo con Chorizo → L.170
UPDATE menu_items SET precio = 170 WHERE nombre IN ('Chuleta con Chorizo', 'Carne de Cerdo con Chorizo');

-- 5. Reordenar carnes: carne asada (3), carne con chorizo (4), chuleta barbacoa (5), chuleta con chorizo (6)
UPDATE menu_items SET orden = 3 WHERE nombre = 'Carne Asada de Cerdo'       AND categoria = 'carnes';
UPDATE menu_items SET orden = 4 WHERE nombre = 'Carne de Cerdo con Chorizo' AND categoria = 'carnes';
UPDATE menu_items SET orden = 5 WHERE nombre = 'Chuleta Barbacoa'           AND categoria = 'carnes';
UPDATE menu_items SET orden = 6 WHERE nombre = 'Chuleta con Chorizo'        AND categoria = 'carnes';

-- 6. Eliminar galletas gratis de pupusas y promos
UPDATE menu_items SET valor_tag = NULL WHERE valor_tag = '🍪 GALLETA GRATIS';
UPDATE menu_items SET descripcion = 'BBQ o Búfalo — a elegir'
  WHERE nombre IN ('14 Alitas BBQ o Búfalo', '7 Alitas BBQ o Búfalo');

-- 7. Nuevas pupusas (Mié / Jue)
INSERT INTO menu_items (categoria, nombre, descripcion, precio, acompanamientos, dia, emoji, gradient_from, gradient_to, activo, orden)
VALUES
  ('pupusas', '2 Pupusas de Quesillo', 'Rellenas de quesillo', 90,
   ARRAY['Salsa', 'Ensalada', 'Encurtido'], 'Mié / Jue', '🫓', '#1A1200', '#6B4C00', true, 60),
  ('pupusas', '2 Pupusas Mixtas', 'Quesillo y chicharrón', 95,
   ARRAY['Salsa', 'Ensalada', 'Encurtido'], 'Mié / Jue', '🫓', '#200E00', '#7A3800', true, 61),
  ('pupusas', '3 Pupusas Mixtas', 'Quesillo y chicharrón', 110,
   ARRAY['Salsa', 'Ensalada', 'Encurtido'], 'Mié / Jue', '🫓', '#200E00', '#7A3800', true, 64)
ON CONFLICT DO NOTHING;

-- Reordenar pupusas existentes: 2 quesillo (60), 2 mixtas (61), 3 quesillo (62), 3 chicharrón (63), 3 mixtas (64)
UPDATE menu_items SET orden = 62 WHERE nombre = '3 Pupusas de Quesillo'   AND categoria = 'pupusas';
UPDATE menu_items SET orden = 63 WHERE nombre = '3 Pupusas de Chicharrón' AND categoria = 'pupusas';

-- 8. Promos de alitas: quitar domingo (solo mié y jue)
UPDATE menu_items SET dia = 'Mié / Jue'
  WHERE nombre IN ('14 Alitas BBQ o Búfalo', '7 Alitas BBQ o Búfalo');

-- 9. Tajadas doble: agregar ensalada en acompañamientos
UPDATE menu_items
  SET acompanamientos = ARRAY['Carne molida', 'Ensalada', 'Encurtido', 'Aderezo']
  WHERE nombre = '2 Órdenes de Tajadas';
