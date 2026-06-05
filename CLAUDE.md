
# Alas Bravas — Bitácora del Proyecto

## Regla de oro
Un hito no está completo hasta que su criterio de éxito está **verificado visualmente o funcionalmente**. No se avanza sin el tag de git correspondiente.

## Estado actual
- **Hito activo:** — (todos los hitos completados ✅)
- **Última sesión:** Menú definitivo, Ruta C Mandaditos, configuración dinámica desde admin (ver sección abajo)

---

## Hitos y su estado

| # | Nombre | Estado | Tag git |
|---|--------|--------|---------|
| 0 | El Terreno | ✅ Completo | `hito-0` |
| 1 | La Fachada y Estructura | ✅ Completo | `hito-1` |
| 2 | Las Habitaciones | ✅ Completo | `hito-2` |
| 3 | Las Tuberías (Base de datos) | ✅ Completo | `hito-3` |
| 4 | El Panel de Control (Admin) | ✅ Completo | `hito-4` |
| 5 | Los Acabados Finales | ✅ Completo | `hito-5` |
| 6 | La Mudanza (Launch) | ✅ Completo | `hito-6` |

---

## Hito 0 — El Terreno ✅

**Criterio de éxito cumplido:** Build de producción limpio + screenshots verificados en desktop (1280px) y mobile (390px).

### Qué se construyó
- Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion
- Design System base: tokens de color (`brand-primary`, `brand-secondary`, `brand-accent`, `brand-dark`, `brand-cream`), tipografías (Bebas Neue + Inter)
- Componentes UI: `Button` (variantes: primary, secondary, ghost), `SpiceBadge`, `CategoryBadge`
- Layout: `Header` (con navegación responsive y menú móvil), `Footer`
- Estructura de carpetas: `components/{ui,sections,layout}`, `lib/`, `types/`

### Paleta de colores activa
| Token | HEX | Uso |
|-------|-----|-----|
| `brand-primary` | `#C1121F` | Rojo Brasas — CTAs, énfasis |
| `brand-secondary` | `#E85D04` | Naranja Fuego — secundario |
| `brand-accent` | `#FFB703` | Dorado Crujiente — acentos, labels |
| `brand-dark` | `#0D0602` | Negro Ahumado — fondo base |
| `brand-cream` | `#FFF8F0` | Crema Cálida — texto principal |

### Archivos clave
- `app/globals.css` — tokens @theme de Tailwind 4
- `app/layout.tsx` — fuentes Google (Bebas Neue + Inter), metadata, lang="es"
- `components/ui/Button.tsx` — botón con variantes
- `components/ui/Badge.tsx` — SpiceBadge (mild/medium/hot/inferno), CategoryBadge
- `components/layout/Header.tsx` — navegación fija, responsive
- `components/layout/Footer.tsx` — footer con redes y contacto placeholder

---

## Hito 1 — La Fachada y Estructura ✅

**Criterio de éxito cumplido:** Build limpio + screenshots aprobados en desktop (1280px) y mobile (390px). Un visitante en 3 segundos ya quiere comer alitas.

### Qué se construyó
- `HeroSection` — gradiente ember animado (Framer Motion), tipografía Bebas Neue masiva, slot de video listo para MP4, scroll indicator
- `UrgencyTicker` — banda roja `brand-primary` con 6 mensajes en loop continuo (CSS keyframes)
- `MenuPreview` — grid 3 cols desktop / 1 col mobile, 6 platos con gradientes de calor, `SpiceBadge`, precios en `brand-accent`
- `app/page.tsx` limpiado — design system showcase eliminado
- `globals.css` — `@keyframes marquee` añadido

### Archivos clave
- `components/sections/HeroSection.tsx`
- `components/sections/UrgencyTicker.tsx`
- `components/sections/MenuPreview.tsx`

### Pendiente para cuando haya activos
- **Video del hero**: descomentar el slot en `HeroSection.tsx` y colocar MP4 en `public/video/hero.mp4`
- **Fotos de platos**: reemplazar gradientes/emoji por imágenes reales en Hito 3 (Cloudinary)

---

## Hito 2 — Las Habitaciones ✅

**Criterio de éxito cumplido:** Build limpio + 3 páginas nuevas con navegación funcional, datos reales del menú y fotos del restaurante integradas.

### Qué se construyó
- `app/menu/page.tsx` — menú completo con hero, tabs de categoría y grid filtrable (client-side)
- `app/nosotros/page.tsx` — historia del restaurante, valores y datos de contacto con logo real
- `app/galeria/page.tsx` — galería con fotos promocionales reales
- `components/sections/MenuPageClient.tsx` — lógica de filtrado por categoría con AnimatePresence
- `lib/menu-data.ts` — datos reales del menú extraídos del Súper Menú oficial
- Header actualizado con logo real (`/logo.jpg`)
- `MenuPreview` y `UrgencyTicker` actualizados con precios y datos reales

### Datos reales del menú
| Ítem | Precio |
|------|--------|
| 6 Alitas BB o Búfalo | L.180 |
| 12 Alitas BB o Búfalo | L.320 |
| Carne de Cerdo con Chorizo | L.160 |
| Chuleta Asada con Chorizo | L.160 |
| Tajadas Preparadas | L.90 |
| 3 Pupusas de Quesillo (Mié/Jue) | L.100 |
| 3 Pupusas de Chicharrón (Mié/Jue) | L.110 |
| Refresco portátil | L.30 |
| Promo Viernes: 2 platos | L.300 |
| Promo Mié/Jue: 14 alitas | L.300 |
| Promo Mié/Jue: 7 alitas | L.180 |

### Info del restaurante (confirmada)
- **Ubicación:** La Cabaña, San Lorenzo
- **Horario:** 1 PM — 11 PM
- **Delivery:** Mandaditos

### Imágenes integradas
- `public/logo.jpg` — logotipo oficial
- `public/galeria/promo-alitas-miercoles.jpg`
- `public/galeria/super-menu.jpg`
- `public/galeria/promo-pupusas.jpg`

### Pendiente para Hito 3
- Fotos individuales de platos → Cloudinary
- Formulario de reservaciones con backend → Supabase
- Datos del menú desde base de datos → reemplazar `lib/menu-data.ts`

---

## Hito 6 — La Mudanza ✅

**Criterio de éxito cumplido:** Sitio live en `alasbravashn.com` con fotos reales, ubicación en Maps, datos estructurados para Google, y dominio + SSL activos.

### Qué se construyó
- `public/galeria/restaurante-noche.jpg` + `restaurante-exterior.jpg` — fotos reales del local integradas
- `app/galeria/page.tsx` — galería actualizada con 5 fotos (2 reales + 3 de menú)
- `app/nosotros/page.tsx` — foto real del restaurante reemplaza el logo en la sección historia
- `app/nosotros/page.tsx` — Google Maps embebido con ubicación exacta (Playa La Cabaña, 13.4148563, -87.4450208)
- `components/layout/RestaurantJsonLd.tsx` — Schema.org Restaurant: nombre, dirección, coordenadas, horario, teléfono, Instagram
- `components/layout/Footer.tsx` — link directo a Google Maps
- OG image actualizada a la foto del restaurante de noche

### Post-launch completado
- Google Analytics GA4 configurado y activo ✅
- Post de lanzamiento en Instagram `@alasbravas1709` — pendiente

---

## Hito 5 — Los Acabados Finales ✅

**Criterio de éxito cumplido:** Lighthouse móvil — Performance 97, Accessibility 96, Best Practices 100, SEO 100. LCP 2.5s, TBT 60ms.

### Qué se construyó
- SEO completo: `metadataBase`, `openGraph` y `twitter` en todas las páginas públicas
- `sitemap.xml` y `robots.txt` generados automáticamente por Next.js
- PWA manifest (`/manifest.webmanifest`) — instalable en home screen
- Google Analytics: componente listo, se activa con `NEXT_PUBLIC_GA_ID` en Vercel
- Botón flotante de WhatsApp (+504 3246-2305), oculto en rutas `/admin` y `/menu`
- Footer actualizado: datos reales (La Cabaña, 1–11 PM, Mandaditos) + Instagram `@alasbravas1709`
- **Fix de LCP crítico:** HeroSection convertido a Server Component con CSS `@keyframes` puros — elimina Framer Motion del hero, LCP bajó de 4.0s a 2.5s, TBT de 160ms a 60ms

### Pendiente
- Google Analytics: crear propiedad GA4 en analytics.google.com y agregar `NEXT_PUBLIC_GA_ID` en Vercel

---

## Hito 4 — El Panel de Control ✅

**Criterio de éxito cumplido:** Login con Supabase Auth en `/admin`. Dashboard con stats en vivo. Reservaciones gestionables. Menú con toggles activos en producción.

### Qué se construyó
- `proxy.ts` — protección de rutas `/admin/*` con Web Crypto API (HMAC, sin dependencias externas)
- `lib/admin-auth.ts` — firma y verificación de sesión, compatible con Edge Runtime
- `app/admin/login/page.tsx` — formulario de login con Supabase Auth
- `app/admin/page.tsx` — dashboard: reservas hoy / últimos 7 días / pendientes + últimas 8 reservas
- `app/admin/reservaciones/page.tsx` + `ReservacionesTable.tsx` — tabla filtrable con botones confirmar/cancelar
- `app/admin/menu/page.tsx` + `MenuToggleList.tsx` — toggles on/off por plato (refleja en el menú público)
- `app/api/auth/login` + `logout` — gestión de cookie segura HTTP-only
- `app/api/admin/reservaciones/[id]` + `menu/[id]` — PATCH protegido por cookie verificada

### Variables de entorno nuevas
- `ADMIN_SESSION_SECRET` — secreto HMAC de 32+ chars (en Vercel + .env.local)

---

## Hito 3 — Las Tuberías ✅

**Criterio de éxito cumplido:** Menú cargando desde Supabase en producción. Reservaciones guardándose en DB. Verificado en `alasbravashn.com`.

### Qué se construyó
- `lib/supabase.ts` — clientes público y admin con fallback graceful si no hay env vars
- `app/menu/page.tsx` — Server Component que fetcha `menu_items` desde Supabase
- `app/reservaciones/page.tsx` + `components/sections/ReservacionForm.tsx` — formulario completo con validación y estado de éxito
- `app/api/reservaciones/route.ts` — API route POST que guarda en Supabase con service role
- `supabase/schema.sql` — schema completo con RLS + seed de los 12 items del menú real
- Header RESERVAR linkea a `/reservaciones`

### Base de datos Supabase
- **Proyecto:** `dgacqokpfwrizgcivsbr` (us-east-1)
- **Tablas:** `menu_items` (12 registros), `reservaciones`
- **RLS:** `menu_items` → SELECT público · `reservaciones` → INSERT público, lectura solo service role

### Variables de entorno configuradas
- Vercel: Production + Preview + Development ✅
- `.env.local`: configurado localmente ✅ (en `.gitignore`, nunca al repo)

---

## Sesión Menú Interactivo — Auditoría UX y Conversión ✅

**Objetivo:** Convertir el menú de vitrina pasiva a sistema de pedidos interactivo. Auditoría completa de la sección `/menu` con criterio de restaurante app profesional.

### Arquitectura: `MenuOrden` — componente unificado

`MenuPageClient` + `OrderBuilder` fusionados en `components/sections/MenuOrden.tsx`.

**Flujo del cliente:**
1. Abre `/menu` (vía QR o directo) → ve el grid de tarjetas
2. Tap en tarjeta → **detail sheet** con info completa + customización
3. Tap en `+` de la tarjeta → agregar rápido sin abrir detalle
4. Al agregar ítems → **barra flotante** aparece con llamas y total
5. Tap en la barra → **drawer de checkout** (resumen + tipo + datos)
6. CTA "Pedir ahora" → abre WhatsApp con el pedido pre-armado

### Detail sheet (`ItemDetailSheet`)
- Imagen a todo ancho, nombre sin truncar, descripción completa
- Acompañamientos como chips con emoji (`🍌 Tajadas`, `🫘 Frijoles fritos`, etc.)
- Precio tachado + "Ahorrás L.XX" para promos con `precioRegular`
- Selector de salsa BB / Búfalo con validación (error visual si intentás agregar sin elegir)
- Cross-sell: 2 ítems complementarios por categoría — tap = abre su detalle, `+` = quick-add

### Cards uniformes
- Altura fija `h-[290px] sm:h-[340px]` en todos los ítems — sin deformación por contenido
- Imagen: `h-28 sm:h-36` (regular) / `h-36 sm:h-40` (promos)
- Burbuja de cantidad: **dorada** (`brand-accent`) cuando falta salsa, **roja** cuando completa
- Selector de salsa eliminado de la tarjeta — vive en el detail sheet y en el drawer

### Sticky bar con animación de llamas
- Fondo `#1A0400` con los mismos `glow-left` / `glow-right` del hero (7s, ease-in-out)
- Texto en `font-display` — es un elemento de marca, no de WhatsApp
- El verde queda reservado exclusivamente para "Pedir ahora" (acción real de WA)

### Drawer de checkout
- Resumen del pedido con `−` cantidad `+` por ítem (editar sin salir)
- **Salsa inline**: si falta elegir, aparecen [BB] [Búfalo] directo en la fila
- Upsell contextual: tajadas si hay proteínas sin acompañamiento; refresco si no hay bebida; nada si el pedido tiene 5+ ítems
- Aviso de pago: *"Sin cobro online · pagás al recibir tu pedido"* al pie
- Campo de teléfono obligatorio para delivery

### Promos por día
- Tab "Promos ⚡" muestra **solo las promos del día actual** (resto ocultas, no solo dimmed)
- Estado vacío: mensaje "VOLVÉ EL MIÉRCOLES" cuando no hay promos activas
- Banner superior dinámico por día:
  - Mié / Jue → rojo (`brand-primary`), urgencia de hoy
  - Viernes → rojo, urgencia de hoy
  - Martes → naranja (`brand-secondary`), "Mañana: 14 alitas por L.300 — ¿volvés?"
  - Dom / Lun / Sáb → naranja, "El miércoles: 14 alitas por L.300 — ¿lo anotás?"

### Persuasión implementada
| Técnica | Implementación |
|---|---|
| Anclaje de precio | `precioRegular` tachado en promos de viernes (`~~L.320~~` → L.300) |
| `valorTag` en cards | "AHORRÁS L.20", "1 ALITA GRATIS", "2 ALITAS EXTRA" |
| Cross-sell contextual | 2 ítems complementarios en el detail sheet |
| Upsell inteligente | Sugerencia relevante según composición del carrito |
| Urgencia temporal | Banner rojo en días de promo activa |
| Anticipación | Banner naranja en días previos a promo |
| Claridad de proceso | Aviso de pago presencial + aclara el rol de Mandaditos |

### Cambios en tipos y datos (`lib/menu-data.ts`)
```ts
interface ItemMenu {
  // Campos nuevos:
  valorTag?: string;      // Badge en la card ("AHORRÁS L.20", "1 ALITA GRATIS"...)
  precioRegular?: number; // Para mostrar precio tachado en el detail sheet
}
```
- `precioRegular: 320` en `promo-viernes-chuleta` y `promo-viernes-carne`
- `valorTag` en todas las promos

### Otros cambios
- `WhatsAppButton` oculto en `/menu` (era redundante y se superponía visualmente)
- Timezone Honduras (`America/Tegucigalpa`) en todos los cálculos de cliente
- `getBannerData()` computa el banner client-side — independiente del server prop `promoDia`

---

## Sesión Post-Launch — UX & Conversión ✅

**Objetivo:** Convertir el sitio de "bonito" a "que vende". Menú optimizado para QR, header con identidad de marca, ticker fluido en iOS, constructor de pedidos completo.

### UrgencyTicker — fix iOS Safari
- **Problema:** CSS `animation-duration` mutada en JS reiniciaba la animación. iOS Safari pausa animaciones al hacer scroll.
- **Fix:** Reescrito con `requestAnimationFrame` — posición fijada frame a frame, inmune a pausa del browser.
- **Velocidad dinámica:** 90px/s móvil · 65px/s tablet · 45px/s desktop.
- **Archivo:** `components/sections/UrgencyTicker.tsx`

### Header — rediseño completo
- Logo + "ALAS BRAVAS" en Boogaloo visible en todos los viewports.
- Estado activo en nav desktop con underline en `brand-accent`.
- Hamburger animado → X con CSS transforms.
- Menú móvil como overlay full-screen: links en Boogaloo 5xl táctiles, CTA reservar, horario y ubicación al pie.
- Borde inferior `brand-primary/30` para calidez de marca.
- **Archivo:** `components/layout/Header.tsx`

### Página de Menú — optimización para QR
- **Hero eliminado** — se va directo a los platos al abrir el QR.
- **Banner contextual del día** — detectado en servidor (zona horaria Honduras). Mié/Jue muestra promo de alitas, Viernes la promo de 2 platos.
- **CATEGORIAS reordenadas:** Promos ⚡ primero, Ver todo al final. Default: "promos" en días de promo, "alitas" el resto.
- **Grid 2 columnas en móvil** — mitad del scroll. Promos a ancho completo para jerarquía.
- **Campo `destacado`** en `ItemMenu` — badge ⭐ Top en los ítems más pedidos.
- **CTA WhatsApp** al final del grid — cierra el loop de conversión.
- **Archivos:** `app/menu/page.tsx`, `components/sections/MenuPageClient.tsx`, `lib/menu-data.ts`

### OrderBuilder — constructor de pedido completo
Reemplaza al `WingCalculator`. El cliente:
1. Elige tipo de orden: **Delivery** (vía Mandaditos) / **Para recoger** / **Comer aquí**
2. Agrega cualquier combinación de platos del menú con +/−
3. Elige salsa **BB o Búfalo** por cada orden de alitas (aparece animado al agregar)
4. Llena datos contextualmente: nombre siempre, dirección+referencia solo si delivery, personas solo si dine-in, notas opcionales siempre
5. El CTA se habilita solo cuando el pedido está completo — muestra el motivo de bloqueo progresivamente
6. WhatsApp se abre con el pedido completo pre-armado incluyendo tipo de orden, ítems con sabores, total, dirección y notas

**Lógica de disponibilidad por día:** Ítems con `dia` field aparecen deshabilitados si el día actual no corresponde (pupusas solo mié/jue, promos de viernes solo viernes).

**Aviso de Mandaditos:** Aclara explícitamente que el costo del delivery lo cobra Mandaditos según distancia — no está incluido en el subtotal del pedido.

**Detección de horario:** Si el restaurante está cerrado (antes de 1 PM o después de 11 PM), muestra aviso y cambia el CTA a "Pre-ordenar".

- **Archivo:** `components/sections/OrderBuilder.tsx` (elimina `WingCalculator.tsx`)

---

## Sesión Checkout Wizard — Rediseño del flujo de pedido ✅

**Objetivo:** Convertir el checkout de formulario estático a experiencia conversacional de 3 pasos con identidad visual de fuego.

### Cambios en la barra flotante (`MenuOrden.tsx`)

**Dos zonas separadas:**
- **Zona superior (ítems):** panel `bg-black/80` con nombres completos de ítems + cantidad `×N` en dorado. El cliente sabe exactamente qué tiene sin abrir nada.
- **Zona inferior (CTA):** gradiente `#C1121F → #E85D04`, brasas doradas (`EmberParticles mini` con `colors=['#FFD700'...]`) flotando sobre fuego real. Aura roja exterior `boxShadow: 0 8px 32px rgba(193,18,31,0.45)`.

**Gradientes corregidos:** opacidades igualadas al hero (0.38 / 0.22) + overlay `bg-brand-dark/45` para profundidad.

### Checkout wizard (3 pasos)

Reemplaza el drawer de formulario único. Estructura fija:
- **Header:** título animado por paso + back button `←` + `itemCount · L.total` siempre visible
- **Progress dots:** `● ● ○` — dot activo: pill dorado `w-5 h-1.5` con `boxShadow` glow; completados: `brand-primary`; próximos: `white/15`
- **Contenido animado:** slide horizontal (Framer Motion `custom={direction}` + `mode="wait"`)

**Paso 1 — ¿Cómo lo querés?**
- "Comer aquí" eliminado del drawer (unificado con `/reservaciones`)
- Dos cards grandes con emoji `text-5xl` + label `font-display`
- Sin seleccionar: gradiente tenue `rgba(193,18,31,0.12) → rgba(232,93,4,0.07)` + borde `rgba(193,18,31,0.25)`
- Seleccionada: `linear-gradient(135deg, #C1121F, #E85D04)` completo + `boxShadow: 0 0 30px rgba(232,93,4,0.40)`
- Auto-avanza 250ms tras selección (con `useRef` para evitar double-advance)

**Paso 2 — Tus datos**
- `FloatingInput`: label flota arriba al escribir (animación CSS), fondo `#1A0600`, borde `brand-primary/25` → `brand-primary` en focus + `boxShadow: 0 0 0 3px rgba(193,18,31,0.22)`
- Para recoger: solo nombre + notas. Delivery: + teléfono + dirección + referencia
- Botón "Confirmar pedido →": gradiente `#C1121F → #E85D04` cuando habilitado, muestra motivo de bloqueo cuando no

**Paso 3 — Confirmá tu pedido**
- Resumen de ítems con emoji + nombre + salsa + precio por ítem
- Salsa inline si falta elegir (igual que antes)
- Card tipo+nombre de confirmación
- Aviso de pago visible (card con borde dorado)
- CTA verde WhatsApp con `boxShadow: 0 0 24px rgba(37,211,102,0.35)`

### Cambios visuales del drawer

- Fondo: `radial-gradient(ellipse 100% 30% at 50% 0%, rgba(193,18,31,0.18)...) + linear-gradient(#1A0400 → #0D0602)` — continuidad cálida con el menú
- Separador header: `border-brand-primary/15` (cálido)
- Cards paso 3: `background: #1A0400` + `border border-brand-primary/20`

### EmberParticles — prop `colors`

`components/ui/EmberParticles.tsx` acepta `colors?: string[]` para paleta custom. La barra flotante usa `["#FFD700", "#FFED4A", "#FFF176", "#FFB703"]` — brasas doradas sobre fuego rojo-naranja.

### Deploy

Solo `git push origin main` — el auto-deploy GitHub→Vercel está activo. **No usar la CLI** (`vercel --prod`): genera deployments duplicados en el dashboard de Vercel.

### "Comer aquí" → Reservaciones

La opción "Comer aquí" fue eliminada del drawer de checkout. El flujo de reservación vive en `/reservaciones` (ya existente con campos: nombre, teléfono, fecha, hora, personas, notas). Pendiente: mejoras visuales a esa página para consistencia con la marca.

---

## Sesión Pulido Visual del Menú ✅

**Objetivo:** Cohesión visual completa de `/menu` — header con identidad de fuego, banner persuasivo, cards legibles, tabs profesionales.

### Header scroll-aware (`components/layout/Header.tsx`)
- Al top de página: fondo `linear-gradient(to right, #C1121F → #E85D04)` + `EmberParticles mini` con brasas doradas `["#FFD700","#FFED4A","#FFF176","#FFB703"]`
- Al scrollear 60px: transición `opacity 500ms` a fondo `#0D0602` oscuro
- Texto siempre blanco con `textShadow: "0 1px 4px rgba(0,0,0,0.55)"` — legible en ambos estados
- Botón "Reservar": pill crema (`bg-brand-cream text-brand-dark`) sobre fuego → pill rojo (`bg-brand-primary`) sobre oscuro
- Hamburger: líneas blancas en todos los estados
- Menú móvil overlay: sigue en `bg-brand-dark` (sin fuego)

### Banner ticket físico (`MenuOrden.tsx` — `getBannerData`)
- **Patrón *pattern interrupt*:** fondo crema `#FFF8F0` — único elemento luminoso en una página oscura. Máximo contraste contra header de fuego y fondo oscuro.
- Muescas semicirculares `w-9 h-9` en bordes laterales — ilusión de boleto perforado
- Bordes punteados `2px dashed rgba(193,18,31,0.5)` arriba y abajo
- Llamas en bordes: gradientes `rgba(193,18,31,0.22)` izq / `rgba(232,93,4,0.22)` der, ancho `w-28`
- Sello "VÁLIDO HOY" rotado `−10deg` en esquina superior derecha (solo tipo "hoy")
- **Ofertas separadas:** `getBannerData()` retorna `ofertas: {label, precio}[]` — cada promo es un bloque independiente con precio grande en `#C1121F`
  - Mié/Jue: dos bloques → "14 ALITAS BB O BÚFALO L.300" + "7 ALITAS BB O BÚFALO L.180"
  - Viernes: un bloque → "2 PLATOS A ELEGIR L.300"

### Background sección `/menu`
- `#160500` — negro cálido en lugar de `#0D0602` frío. Conecta visualmente el ticket crema con el contenido sin gradientes adicionales.
- El sticky de tabs usa `rgba(22,5,0,0.96)` para consistencia al hacer scroll.

### Cards — layout dinámico (`MenuCard`)
- Contenedor texto: `flex flex-col justify-between` — nombre, descripción y precio se distribuyen en todo el espacio disponible automáticamente
- Fuentes subidas: nombre `text-base sm:text-lg`, descripción `text-xs sm:text-sm`, acompañamientos `text-[11px] sm:text-xs`
- Área de imagen sin cambios (`h-28 sm:h-36` / `h-36 sm:h-40`) — reservada para fotos reales

### Botón `+` — animación de respiración
- Reemplaza el `animate-ping` agresivo
- Clase `.btn-breathe` en `globals.css`: `@keyframes btn-breathe` cicla el `box-shadow` entre intensidad baja y alta cada 3.5s
- Presente y vivo, sin ser invasivo

### Tabs de categoría — rediseño
- Ícono + texto en cada tab: `CAT_ICONS` mapeado localmente (`🍗 Alitas`, `🥩 Carnes`, `🍌 Tajadas`, `🫓 Pupusas`, `🥤 Bebidas`, `⚡ Promos`, `◈ Ver todo`)
- "Promos" siempre en `text-brand-accent` dorado aunque inactivo — mayor jerarquía visual
- Tab activo: `bg-brand-primary` + `boxShadow: 0 0 12px 3px rgba(193,18,31,0.45)` glow rojo
- Fade gradient en borde derecho `w-10` — indica scroll horizontal disponible
- `lib/menu-data.ts`: label de promos limpiado de "⚡" (el ícono viene de `CAT_ICONS`)

---

## Sesión Menú Definitivo, Ruta C y Configuración Dinámica ✅

**Objetivo:** Implementar el menú completo real del restaurante, redirigir delivery a Mandaditos (Ruta C) y hacer el sistema configurable desde el panel admin sin tocar código.

### Ruta C — Delivery vía Mandaditos

El botón "Pedir ahora" ahora bifurca según el tipo de orden:
- **Para recoger** → WhatsApp directo al restaurante (`+50432462305`)
- **Delivery** → WhatsApp a Mandaditos con el pedido pre-armado, mencionando explícitamente "Alas Bravas (La Cabaña, San Lorenzo)"

El número de Mandaditos actual es `+50489010135`. El mensaje para Mandaditos incluye: ítems, subtotal, dirección, teléfono y nombre del cliente.

**Razón de la bifurcación:** El restaurante no tiene moto propia. Mandaditos opera con call center; el flujo establecido es cliente → Mandaditos → restaurante. La web respeta ese flujo en lugar de crear un canal paralelo que el restaurante no puede operar.

### Tabla `configuracion` en Supabase

Nueva tabla para ajustes dinámicos que el admin puede cambiar sin deploy:

| Clave | Valor por defecto | Descripción |
|---|---|---|
| `mandaditos_telefono` | `50489010135` | Destino del WhatsApp de delivery |
| `hora_apertura` | `11:00` | Hora de apertura (HH:MM) |
| `hora_cierre` | `00:00` | Hora de cierre — `00:00` = medianoche |
| `mostrar_precios_bebidas` | `true` | Oculta/muestra precios en la sección de bebidas |
| `compra_bebidas` | `false` | Habilita agregar bebidas al pedido de WhatsApp |

RLS: SELECT público (menú lo lee con anon key), escritura solo vía service role.

### Admin → Configuración (`/admin/configuracion`)

Página con cuatro bloques:
1. **Número de Mandaditos** — input con validación de número hondureño (8 dígitos, empieza en 3/7/8/9)
2. **Horario del restaurante** — dos `<input type="time">` (apertura + cierre), guarda en `configuracion`
3. **Días activos** — UI lista (checkboxes deshabilitados), conectar cuando se definan los días
4. **Bebidas** — dos toggles con auto-save: mostrar precios / habilitar compra

### Menú completo — 32 ítems en Supabase

| Categoría | Ítems |
|---|---|
| Alitas | 6 Alitas (L.180), 12 Alitas (L.320) |
| Carnes | Carne Asada de Cerdo, Chuleta Asada de Cerdo, Chuleta con Chorizo, Carne de Cerdo con Chorizo (todas L.160) |
| Tajadas | 1 Orden (L.90), 2 Órdenes (L.170, `AHORRÁS L.10`) |
| Pupusas | Quesillo (L.100), Chicharrón (L.110) — Mié/Jue, `🍪 GALLETA GRATIS` |
| Bebidas refrescos | 12 ítems: Portátil L.30 → Botella Agua L.13 |
| Bebidas cervezas | 6 ítems: Corona L.55 → Barena L.30 |
| Promos | 14 Alitas L.300, 7 Alitas L.180 (Mié/Jue/Dom); 2 Platos Carne Asada L.300, 2 Platos Chuleta Asada L.300 (Viernes) |

**Columnas nuevas en `menu_items`:** `subcategoria TEXT` (para `refrescos`/`cervezas`), `destacado BOOLEAN`, `valor_tag TEXT`, `precio_regular INTEGER`, `image_url TEXT`.

### Bebidas — lista de precios, no cards

Cuando `categoriaActiva === "bebidas"`, el grid de cards es reemplazado por `BebidaLista`: dos grupos (`BebidaGrupo`) apilados con separador — Refrescos y Cervezas. Cada ítem muestra emoji + nombre + descripción + precio (si `mostrarPreciosBebidas`) + stepper (si `compraBebidas`).

### Promos de domingo

`isDisponible()` actualizado: `item.dia.includes("Dom") && d === 0`. `getBannerData()` muestra banner rojo en domingo y anticipación el sábado. `PromoDia` incluye `"dom"`.

### Horario configurable

`estaAbierto(horaApertura, horaCierre)` recibe los strings del servidor en lugar de valores hardcodeados. Manejo especial de medianoche: `hora_cierre = "00:00"` se interpreta como 24:00 (fin del día). Horario actual: **11:00 AM – 12:00 AM**.

### Fix snake_case → camelCase

Supabase devuelve campos en `snake_case` (`gradient_from`, `valor_tag`, `precio_regular`). `fetchMenuItems()` ahora mapea explícitamente a los campos camelCase que usa `ItemMenu`. Sin este fix, badges y gradientes de DB eran ignorados.

### `/menu` forzado a renderizado dinámico

`export const dynamic = "force-dynamic"` en `app/menu/page.tsx`. El build muestra `ƒ` en lugar de `○`. Necesario porque sin esto Next.js sirve una versión cacheada al momento del build — los cambios en Supabase no se reflejan hasta el próximo deploy.

### Archivos clave de esta sesión
- `lib/menu-data.ts` — menú completo con tipo `Subcategoria`
- `components/sections/MenuOrden.tsx` — `BebidaLista`, `BebidaGrupo`, `estaAbierto()` dinámica, `buildWaMsgMandaditos()`
- `app/menu/page.tsx` — `fetchConfig()` unificado, mapeo snake→camelCase, `force-dynamic`
- `app/admin/configuracion/ConfiguracionAdmin.tsx` — 4 secciones de config
- `app/api/admin/configuracion/route.ts` — PATCH genérico por clave/valor
- `supabase/schema.sql` — tabla `configuracion` + columnas nuevas en `menu_items`

---

## Sesión Fix Responsiveness Mobile ✅

**Objetivo:** Corregir el header y la barra flotante que se "pegaban a la mitad" en smartphones durante el scroll inercial (momentum scroll) de iOS Safari.

### Causas raíz identificadas

**1. `position: fixed` sin GPU compositing**
iOS Safari no actualiza la posición de elementos `fixed` en tiempo real durante momentum scroll — solo cuando el scroll se detiene. Resultado: el header y la barra flotante aparecen "congelados" en la pantalla fuera de lugar.

**Fix:** `transform: translateZ(0)` en el `<header>` y `willChange: 'transform'` en la barra flotante. Fuerzan al browser a crear una capa GPU propia para cada elemento, donde sí se actualizan durante scroll inercial.

**2. Transición de fuego congelada a mitad de camino**
iOS Safari pausa CSS transitions durante momentum scroll. La transición `opacity 1→0` de la capa de fuego quedaba congelada al 50% de opacidad ("pegada a la mitad").

**Fix:** `willChange: 'opacity'` en la capa de fuego del header — el browser la mantiene en GPU y no pausa su transición.

**3. Scroll lock del menú móvil no funcionaba en iOS**
`document.body.style.overflow = "hidden"` no detiene el scroll en iOS Safari. La página scrolleaba por debajo del overlay; al cerrar el menú el header aparecía en posición incorrecta.

**Fix:** Patrón correcto para iOS — `body { position: fixed; top: -${scrollY}px; width: 100% }` al abrir, con restauración exacta de `window.scrollTo(0, scrollY)` al cerrar.

**4. Footer tapado por la barra flotante**
La barra flotante `fixed bottom-0` en `/menu` cubría el footer. 

**Fix:** `pb-44` en el `<main>` de `app/menu/page.tsx` — empuja el contenido suficiente para que el footer sea accesible incluso con la barra visible.

### Archivos modificados
- `components/layout/Header.tsx` — GPU layer + scroll lock iOS
- `components/sections/MenuOrden.tsx` — GPU layer en barra flotante
- `app/menu/page.tsx` — padding bottom para proteger footer

---



```
Frontend:    Next.js 16 (App Router) + TypeScript
Estilos:     Tailwind CSS 4 + Framer Motion
Backend:     Next.js API Routes
Base datos:  PostgreSQL vía Supabase (configurar en Hito 3)
Imágenes:    Cloudinary (configurar en Hito 3)
Deploy:      Vercel → alasbravashn.com
Control:     Git local → GitHub (venomouzvyper/alas-bravas) → Vercel auto-deploy
```

## URLs del proyecto
| Entorno | URL |
|---------|-----|
| Producción | https://www.alasbravashn.com ✅ |
| Alias | https://alas-bravas.vercel.app ✅ |
| Repositorio | https://github.com/venomouzvyper/alas-bravas |

## Variables de entorno necesarias (aún no configuradas)
```env
# Supabase — configurar en Hito 3
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Cloudinary — configurar en Hito 3
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Convenciones del proyecto
- **Idioma:** Todo el sitio en español. `lang="es"` en el HTML.
- **Commits:** Un commit al completar cada tarea significativa. Tag al completar un hito.
- **OrderBuilder (no carrito formal):** El `OrderBuilder` arma pedidos y los envía por WhatsApp — no hay carrito persistente ni pagos en línea. Los pagos en línea van en v2.
- **Mobile-first:** Todo componente nuevo se diseña primero en 390px.
- **QR-first para el menú:** La página `/menu` es el destino principal de los códigos QR del restaurante. Decisiones de UX priorizan la experiencia de un cliente en el local con el teléfono en la mano.
- **Persuasión sobre información:** Los componentes del menú deben vender, no solo mostrar datos. Anclaje de precio, urgencia temporal, prueba social y CTAs claros son requisitos, no opcionales.
