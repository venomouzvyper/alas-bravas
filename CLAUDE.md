
# Alas Bravas — Bitácora del Proyecto

## Regla de oro
Un hito no está completo hasta que su criterio de éxito está **verificado visualmente o funcionalmente**. No se avanza sin el tag de git correspondiente.

## Estado actual
- **Hito activo:** Hito 6 — La Mudanza (Launch)
- **Última sesión:** Hito 5 completado y taggeado (`hito-5`)

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
| 6 | La Mudanza (Launch) | 🔲 Pendiente | — |

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

## Hito 5 — Los Acabados Finales ✅

**Criterio de éxito cumplido:** Lighthouse móvil — Performance 97, Accessibility 96, Best Practices 100, SEO 100. LCP 2.5s, TBT 60ms.

### Qué se construyó
- SEO completo: `metadataBase`, `openGraph` y `twitter` en todas las páginas públicas
- `sitemap.xml` y `robots.txt` generados automáticamente por Next.js
- PWA manifest (`/manifest.webmanifest`) — instalable en home screen
- Google Analytics: componente listo, se activa con `NEXT_PUBLIC_GA_ID` en Vercel
- Botón flotante de WhatsApp (+504 3246-2305), oculto en rutas `/admin`
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

## Stack técnico

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
- **Sin delivery/carrito en v1:** El carrito y pagos online van en v2.
- **Mobile-first:** Todo componente nuevo se diseña primero en 390px.
