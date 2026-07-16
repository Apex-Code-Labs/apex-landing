# Apex ERP — Landing

One-page de producto para **Apex ERP** (POS + inventario + comandas +
facturación electrónica DTE para El Salvador), con la línea gráfica de
Apex Code Labs.

## Stack

- **Next.js 15** (App Router) · React 19 · TypeScript
- **TailwindCSS 3** — dark mode por clase (`next-themes`, toggle manual en el header)
- **Poppins** vía `next/font` · iconografía **Lucide**
- Formulario de contacto → **Resend** (+ webhook opcional a N8N)
- Deploy: **Cloudflare Workers** vía `@opennextjs/cloudflare`

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000 (usa -- -p 3001 si el puerto está ocupado)
```

No se necesitan variables de entorno para trabajar la UI — solo el envío
real de emails las usa (ver tabla abajo).

> ⚠️ No corras `npm run build` con el dev server activo: comparten `.next/`
> y el build pisa los artefactos del server (la página queda sin estilos).
> Si pasa: matar el server, `rm -rf .next`, relanzar.

## Estructura

```
app/
  page.tsx                 # composición de la one-page
  layout.tsx               # metadata SEO + JSON-LD + Poppins + ThemeProvider
  api/contact/route.ts     # endpoint del formulario (Resend → N8N)
  gracias/ · politica-privacidad/
components/
  Header · Hero · ProblemSolution · Modules · DteSection ·
  RestaurantFlow · Pricing · Comparison · FAQ · ContactForm ·
  Footer · WhatsAppFloat                    # secciones (en orden de página)
  Logo · ThemeToggle · ThemeImage · Providers  # infraestructura de UI
lib/
  pricing.ts               # ÚNICA fuente de precios (literales del brochure)
  faqs.ts                  # preguntas del FAQ (también alimenta el JSON-LD)
  contact.ts · cta.ts      # datos de contacto y CTA de registro
  email.ts · schema.ts     # envío de email · schemas JSON-LD
public/
  brand/                   # isotipo SVG + lockups PNG
  screenshots/             # pos_{light,dark}.png · comandas_{light,dark}.png
  ERP-Brochure-Comercial-v4.pdf   # linkeado desde Precios y Footer
docs/
  DEPLOY-CLOUDFLARE.md     # guía de deploy completa
  brand/                   # PDF de línea gráfica (interno, NO publicar en public/)
```

## Reglas de marca y diseño

- **Paleta**: Galactic Cruise `#121C8C` (primary) · Turquoise Topaz `#13C6AB`
  (accent) · Teal Deer `#96E5AC` (mint). Ramps en `tailwind.config.ts`.
- **Accesibilidad (no negociable)**: `#13C6AB`/`#96E5AC` nunca como texto
  pequeño sobre blanco ni como fondo con texto blanco. Botón primario:
  `#121C8C` + blanco; botón acento: gradiente turquesa→menta + texto `#121C8C`.
- **Theming**: SIEMPRE con la clase `.dark` (hay switcher manual) — nunca
  `@media (prefers-color-scheme)`. Imágenes por tema: componente `ThemeImage`.
- La clase `.eyebrow` está reservada para marcar secciones — no usarla
  dentro del contenido.
- Prohibidas las clases Tailwind interpoladas (`bg-${x}`); ternarias con
  strings completos sí.

## Contenido

- **Precios**: editar solo `lib/pricing.ts` (cifras literales del brochure,
  IVA incluido — nunca calcular).
- **Screenshots**: reemplazar los archivos en `public/screenshots/` con el
  mismo nombre; las dimensiones se infieren en build (static import).
- **CTA "Prueba gratis"**: apunta a `NEXT_PUBLIC_SIGNUP_URL` si existe;
  sin definir, cae al formulario de contacto.

## Variables de entorno

| Variable | Uso |
|---|---|
| `RESEND_API_KEY` | Envío del formulario (obligatoria en producción) |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Destinatario / remitente |
| `N8N_WEBHOOK_URL` | Webhook opcional post-envío |
| `NEXT_PUBLIC_WA_NUMBER` / `NEXT_PUBLIC_WA_MSG` | WhatsApp (hay defaults reales) |
| `NEXT_PUBLIC_SIGNUP_URL` | Registro self-service (cuando exista) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics opcional |

En Cloudflare: `RESEND_API_KEY` como **secret**; las `NEXT_PUBLIC_*` como
**build variables** (se inlinean en build). SMTP/nodemailer no funciona en
Workers — Resend es el proveedor de email.

## Deploy

```bash
npm run preview   # worker real en local (workerd, localhost:8787)
npm run deploy    # build + deploy a Cloudflare (requiere wrangler login)
```

CI: cada push a `main` despliega vía Workers Builds — build command
`npx opennextjs-cloudflare build`, deploy command
`npx opennextjs-cloudflare deploy`. Guía completa: [docs/DEPLOY-CLOUDFLARE.md](docs/DEPLOY-CLOUDFLARE.md).

## Verificación

```bash
npm run lint && npm run build
```

© Apex Code Labs. Todos los derechos reservados.
