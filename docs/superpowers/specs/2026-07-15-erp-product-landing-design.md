# Rediseño apex-landing — Landing de producto Apex ERP

**Fecha:** 2026-07-15 · **Estado:** aprobado por Kevin

## Contexto y objetivo

La landing actual (apexcodelabs.com) vende una agencia de servicios (CRM con
HubSpot, automatizaciones IA, desarrollo a medida) con la línea gráfica vieja
(azul petróleo `#0E3A4A`). El negocio real es **Apex ERP**: SaaS multi-tenant
para El Salvador con POS, inventario, comandas, recetas, multi-sucursal y
facturación electrónica DTE integrada con el Ministerio de Hacienda.

Objetivo: convertir la landing en una **one-page de producto** que venda
Apex ERP, con la **nueva línea gráfica** de marca.

Fuentes de verdad:

- Contenido comercial: `public/ERP-Brochure-Comercial-v4.pdf` (precios 2026, IVA incluido)
- Marca: `public/Apex Code Labs [Línea Gráfica].pdf` (paleta + logo + Gilroy→Poppins)

## Decisiones tomadas

1. **Posicionamiento:** 100% producto Apex ERP. Nada de servicios de agencia.
2. **CTA principal:** visión self-service ("Prueba gratis"), pero el signup
   público aún no existe → los CTAs leen `NEXT_PUBLIC_SIGNUP_URL`; si no está
   definida, hacen scroll al formulario de contacto. Cambio futuro = 1 env var.
3. **Pricing público:** sí, con los precios del brochure v4.
4. **Visuales de producto:** screenshots reales (Kevin las genera/mejora con
   Gemini). La landing define slots de dimensiones fijas; se usan capturas
   provisionales del monorepo hasta tener las finales.
5. **Estructura:** one-page (enfoque A). Multi-página queda como evolución futura.

## Sistema visual

### Paleta (reemplaza por completo la actual en `tailwind.config.ts`)

| Token | Valor | Uso |
|---|---|---|
| `primary` (Galactic Cruise) | `#121C8C` + ramp 50–950 | Color de marca: headings, botón primario, links |
| `primary-950` (navy lockup) | `#0A0F3D` aprox — igualar al fondo del PNG del brand board | Secciones oscuras, footer |
| `accent` (Turquoise Topaz) | `#13C6AB` + ramp | Acentos, iconos, gradiente inicio |
| `mint` (Teal Deer) | `#96E5AC` | Highlights, gradiente fin |
| Gradiente de marca | `linear-gradient(135deg, #13C6AB, #96E5AC)` | CTAs de acento, decoración |
| Neutrales | Escala gris fría de Tailwind (`slate`) | Texto secundario, bordes, fondos |

**Reglas de accesibilidad (WCAG AA, no negociables):**

- `#13C6AB` y `#96E5AC` nunca como color de texto sobre blanco, nunca como
  fondo con texto blanco.
- Botón primario: fondo `#121C8C`, texto blanco.
- Botón acento: fondo gradiente de marca, texto `#121C8C`.
- Sobre navy (`primary-950`): texto blanco o turquesa solo en tamaño grande/bold
  (el lockup de marca usa turquesa sobre navy — reservarlo para display, no body).

### Tipografía

- **Poppins** vía `next/font/google`, pesos 500/600/700/800 (reemplaza system
  fonts). Headings 700–800 con tracking `-0.01em`; body 400–500.
- Números de precios: bold + `tabular-nums`.

### Correcciones técnicas incluidas

- Eliminar clases dinámicas `bg-${color}` / `btn-${color}` (Services.tsx): el
  purge de Tailwind no las genera. Usar mapas de variantes explícitos.
- Dark mode: se mantiene `darkMode: 'media'` con la paleta nueva.

## Estructura de la página

Orden de secciones en `app/page.tsx`:

| # | Componente | Estado | Contenido |
|---|---|---|---|
| 1 | `Header` | modificar | Logo nuevo + nav: Módulos · Facturación DTE · Restaurantes · Precios · FAQ + CTA "Prueba gratis" |
| 2 | `Hero` | reescribir | H1 "Sistema ERP con Facturación Electrónica y POS", subtítulo del brochure ("Gestioná tu negocio completo desde una sola plataforma…"), screenshot del producto, CTA primario "Prueba gratis" + secundario WhatsApp. 3 badges: "Transmisión directa al MH" · "PWA en cualquier dispositivo" · "Desde $5.63/mes con IVA" |
| 3 | `ProblemSolution` | nuevo | Problema: Excel/cuadernos/WhatsApp → errores, cero visibilidad, riesgo de multas MH (DTE obligatorio desde 2023). Solución: todo integrado en una plataforma. 4 audiencias: PYMES, restaurantes/cafés, retail multi-sucursal, contadores |
| 4 | `Modules` | nuevo (reemplaza `Services`) | Grid 12 módulos con Lucide icons: Ventas y POS, Facturación DTE, Inventario y Kardex, Clientes, Proveedores, Multi-bodega, Dashboard, Roles y Seguridad, Comandas y Cocina, Recetas e Insumos, Caja con Arqueo, App Móvil PWA. Callout: integración nativa POS→inventario→DTE→ticket en un paso |
| 5 | `DteSection` | nuevo | 7 tipos de DTE (01, 03, 05, 06, 07, 11, 14), transmisión automática al MH, modo contingencia, certificación MH automatizada (98%+ aceptación, horas en vez de semanas), orquestador para sistemas externos |
| 6 | `RestaurantFlow` | nuevo | Flujo 4 pasos: mesero toma orden (PIN) → cocina en tiempo real (KDS + timer) → cobro + DTE + ticket térmico → corte Z. Screenshot de comandas. Nota "validado en producción con clientes reales" |
| 7 | `Pricing` | nuevo | 3 grupos: Solo DTE (Starter $5.63 / Negocio $11.28 ★ / Profesional $22.58 / Corporativo $39.53), ERP completo (PYME $16.93 / Business $28.23 ★ / Enterprise $56.48), Orquestador (Básico $11.28 / Avanzado $22.58 / Ilimitado $39.53). Toggle mensual/anual (−20%). "Todos los precios incluyen IVA (13%)". Banner early adopter: −30% primeros 3 meses, primeros 50 clientes. Link "Descargar brochure (PDF)" |
| 8 | `Comparison` | nuevo | Tabla vs Facxi, N1co, Acatha, FacturaYa — 8 filas clave (precio desde, ERP integrado, ventas+DTE nativo, comandas/cocina, recetas, corte X/Z, PWA, certificación MH automática). Cierre: "el único sistema salvadoreño que integra ventas y DTE nativamente" |
| 9 | `FAQ` | reescribir contenido | 8 preguntas SaaS (ver abajo) |
| 10 | `ContactForm` | modificar | Título "Agendá tu demo gratuita de 30 minutos". Campo servicio → "¿Qué te interesa?": Solo Facturación DTE / ERP completo / Orquestador / Aún no sé. Backend (API, email, N8N) no cambia |
| 11 | `Footer` | modificar | Logo nuevo sobre navy, links por sección, contacto real, quitar Twitter si no existe |
| 12 | `WhatsAppFloat` | sin cambios | Número real vía env: `503 7931-2064` |

`Process.tsx` se **elimina** (proceso de agencia).

### FAQ (contenido nuevo)

1. ¿Qué es la facturación electrónica (DTE) y estoy obligado? → MH la exige
   progresivamente desde 2023; el sistema transmite directo.
2. ¿Cuánto tarda la activación? → 24–48 h tras el primer pago.
3. ¿Pueden migrar mis datos? → Sí, add-on de migración ($56.50 único).
4. ¿Cómo obtengo el certificado digital del MH? → Trámite directo con el MH;
   asistencia disponible ($33.90 único).
5. ¿Qué pasa con mis datos si cancelo? → Sin penalización; respaldo completo
   en formato estándar; los datos son 100% del cliente.
6. ¿Funciona en tablets y teléfonos? → PWA instalable, Android e iOS, sin stores.
7. ¿Qué soporte incluye? → Email en todos los planes; WhatsApp/teléfono en
   superiores o add-on ($11.30/mes).
8. ¿Los precios incluyen IVA? → Sí, 13% incluido; anual −20%.

## Marca y assets

- **Isotipo SVG** (`public/brand/isotipo.svg`): recrear los chevrones con
  gradiente turquesa→menta y acentos azules como vector (los PNG del brand
  board tienen fondo navy fijo). Variantes: color (fondos claros) y mono
  blanco/turquesa (fondos navy).
- **Lockup header:** isotipo SVG + wordmark "apex code labs" en Poppins
  (3 líneas o inline según breakpoint). Altura contenida (~40–48 px), no los
  192 px actuales.
- **Renombrar assets:** `Code_Generated_Image*.png` → `public/brand/lockup-navy.png`
  y `brand-board.png`; PDFs quedan (el brochure se linkea desde Pricing).
- **Eliminar:** `logo.svg`, `logov2.png`, `logov3.svg`, `logov5.svg`,
  `logowh.svg`, `ChatGPT Image 7 abr 2025….png`.
- **Favicon** nuevo (isotipo) + **OG image** 1200×630 (lockup sobre navy).
- **Slots de screenshots** (WebP, 2x retina): hero 16:10 (~2400×1500,
  dashboard o POS), restaurantes (comandas/KDS), DTE (dashboard de facturación).
  Rutas fijas en `public/screenshots/`; Kevin reemplaza los archivos con las
  versiones mejoradas por Gemini sin tocar código.

## Datos y comportamiento

- **`lib/pricing.ts`**: planes tipados del brochure (única fuente de verdad).
  El toggle mensual/anual calcula desde el dato, no duplica cifras.
- **`lib/cta.ts`** (o helper en componente): `getSignupHref()` → devuelve
  `NEXT_PUBLIC_SIGNUP_URL` si existe, si no `#contacto`.
- **SEO** (`app/layout.tsx` + `lib/schema.ts`):
  - Title: "Apex ERP — Sistema ERP con Facturación Electrónica y POS en El Salvador".
  - Description/keywords hacia: facturación electrónica El Salvador, DTE,
    POS, ERP, restaurantes, Ministerio de Hacienda.
  - JSON-LD: `SoftwareApplication` con `offers` (precios) + `FAQPage` +
    `Organization` actualizado.
- `/gracias` y `/politica-privacidad` se conservan (revisar branding).

## Verificación

1. `npm run lint` y `npm run build` sin errores.
2. Revisión visual en navegador (localhost:3001): desktop 1440, móvil 390.
3. Checklist de contraste AA sobre los pares de color nuevos.
4. Formulario de contacto: envío end-to-end sigue funcionando (API no cambia).
5. Lighthouse: sin regresión grave de Core Web Vitals (imágenes con
   `next/image`, Poppins con `next/font`).

## Fuera de alcance

Multi-página, blog, signup real en la app, cambios al ERP, i18n,
analytics adicionales.
