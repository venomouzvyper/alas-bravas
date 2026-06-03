# Alas Bravas — Bitácora del Proyecto

## Regla de oro
Un hito no está completo hasta que su criterio de éxito está **verificado visualmente o funcionalmente**. No se avanza sin el tag de git correspondiente.

## Estado actual
- **Hito activo:** Hito 1 — La Fachada y Estructura
- **Última sesión:** Hito 0 completado y taggeado (`hito-0`)

---

## Hitos y su estado

| # | Nombre | Estado | Tag git |
|---|--------|--------|---------|
| 0 | El Terreno | ✅ Completo | `hito-0` |
| 1 | La Fachada y Estructura | 🔲 Pendiente | — |
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

## Hito 1 — La Fachada y Estructura 🔲

### Tareas pendientes
- [ ] Hero section con video en loop, texto de impacto y CTA primario
- [ ] Ticker de urgencia animado (banda horizontal continua)
- [ ] Vista rápida del menú (4–6 platos destacados con foto y precio)
- [ ] Animaciones de entrada con Framer Motion
- [ ] Diseño 100% responsive verificado en mobile
- [ ] Eliminar el showcase de Design System de `app/page.tsx`

### Criterio de éxito
Un visitante que llega al sitio en 3 segundos ya quiere comer alitas.
Screenshots aprobados en desktop y mobile. Build limpio. Tag: `hito-1`.

### Bloqueantes conocidos
- **Video del hero**: el usuario debe proveer el archivo de video (MP4, ~10–30s, grabado en el restaurante o stock footage). Sin este archivo, el Hero se construye con fallback de imagen estática.

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
| Producción | https://alasbravashn.com (pendiente conectar DNS) |
| Preview Vercel | https://alas-bravas.vercel.app (disponible tras primer deploy) |
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
