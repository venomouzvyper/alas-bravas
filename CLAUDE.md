
# Alas Bravas — Bitácora del Proyecto

## Regla de oro
Un hito no está completo hasta que su criterio de éxito está **verificado visualmente o funcionalmente**. No se avanza sin el tag de git correspondiente.

## Estado actual
- **Hito activo:** Hito 2 — Las Habitaciones
- **Última sesión:** Hito 1 completado y taggeado (`hito-1`)

---

## Hitos y su estado

| # | Nombre | Estado | Tag git |
|---|--------|--------|---------|
| 0 | El Terreno | ✅ Completo | `hito-0` |
| 1 | La Fachada y Estructura | ✅ Completo | `hito-1` |
| 2 | Las Habitaciones | 🔲 Pendiente | — |
| 3 | Las Tuberías (Base de datos) | 🔲 Pendiente | — |
| 4 | El Panel de Control (Admin) | 🔲 Pendiente | — |
| 5 | Los Acabados Finales | 🔲 Pendiente | — |
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
