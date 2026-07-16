# Apex ERP Product Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir apex-landing (agencia, marca vieja) en una one-page de producto que vende Apex ERP con la nueva línea gráfica (Galactic Cruise / Turquoise Topaz / Teal Deer + Poppins).

**Architecture:** Se conserva el esqueleto Next.js 14 App Router + Tailwind. Se reemplaza la paleta en `tailwind.config.ts`, se reescriben Hero/Services→secciones de producto, se agregan 6 componentes nuevos alimentados por data tipada en `lib/`, y se actualiza SEO/JSON-LD. Spec: `docs/superpowers/specs/2026-07-15-erp-product-landing-design.md`.

**Tech Stack:** Next.js 14.2, React 18, Tailwind 3, TypeScript, `next/font` (Poppins), `lucide-react` (única dependencia nueva; `next.config.js` ya la esperaba en `optimizePackageImports`).

## Global Constraints

- Idioma: español (es-SV), trato de "tú" (nunca "usted", nunca voseo). Sin emoji en UI; iconografía Lucide.
- Accesibilidad AA: `#13C6AB` y `#96E5AC` NUNCA como color de texto sobre blanco ni como fondo con texto blanco. Botón primario: fondo `#121C8C` texto blanco. Botón acento: gradiente `135deg #13C6AB→#96E5AC` con texto `#121C8C`.
- Precios: copiar LITERALES del brochure (nunca calcular). Todos incluyen IVA 13%.
- Prohibido: clases Tailwind dinámicas interpoladas (`bg-${x}`).
- Verificación por tarea: `npm run lint` + `npm run build` exit 0 (no hay framework de tests y NO se agrega — YAGNI). Verificación visual al final.
- Commits: conventional commits, SIN "Co-Authored-By" ni atribución de IA.
- Dev server: `npm run dev` (el puerto 3000 está ocupado por otra app; Next usa 3001).
- Rama de trabajo: `feature/erp-product-landing` (ya existe).

---

### Task 1: Fundaciones visuales (paleta, tipografía, utilities)

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` (solo fuente; la metadata se cambia en Task 10)
- Modify: `package.json` (via npm install)

**Interfaces:**
- Produces: tokens Tailwind `primary` (50–950, DEFAULT `#121C8C`), `accent` (50–900, DEFAULT `#13C6AB`), `mint` (DEFAULT `#96E5AC`), `navy` (`#0A0F3D`); clases `.btn-primary`, `.btn-accent`, `.btn-outline`, `.card`, `.section-padding`, `.container-custom`, `.brand-gradient`, `.eyebrow`; fuente Poppins como default sans.

- [ ] **Step 1: Instalar lucide-react**

Run: `npm install lucide-react`
Expected: exit 0, aparece en `package.json` dependencies.

- [ ] **Step 2: Reemplazar la paleta en `tailwind.config.ts`**

Reemplazar el objeto `colors` completo dentro de `theme.extend` por:

```ts
      colors: {
        primary: {
          DEFAULT: '#121C8C',
          50: '#EBEDFA',
          100: '#D3D7F4',
          200: '#A7AFE9',
          300: '#7B87DE',
          400: '#4F5FD3',
          500: '#2A3BB8',
          600: '#121C8C',
          700: '#0E1670',
          800: '#0B1154',
          900: '#070B38',
          950: '#0A0F3D',
        },
        accent: {
          DEFAULT: '#13C6AB',
          50: '#E7FAF6',
          100: '#CFF5EE',
          200: '#9FEBDC',
          300: '#6FE0CB',
          400: '#3FD6B9',
          500: '#13C6AB',
          600: '#0FA38D',
          700: '#0C7F6E',
          800: '#085C4F',
          900: '#053830',
        },
        mint: {
          DEFAULT: '#96E5AC',
          100: '#EAFAEF',
          300: '#C0F0CE',
          500: '#96E5AC',
          700: '#5FCB80',
        },
        navy: '#0A0F3D',
      },
```

Nota: `primary.DEFAULT` y `primary.600` son ambos `#121C8C` a propósito (el hover de `.btn-primary` usa `primary-700`). `navy` debe igualar el fondo del PNG `public/brand/lockup-navy.png` — si al verlo difiere notablemente de `#0A0F3D`, ajustar el hex aquí (única fuente).

Y reemplazar `fontFamily` por:

```ts
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
```

Eliminar el bloque `background: { light, dark }` (se reemplaza por grises estándar de Tailwind). `darkMode: 'media'` se queda.

- [ ] **Step 3: Cargar Poppins en `app/layout.tsx`**

Agregar arriba del archivo:

```tsx
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})
```

Y cambiar `<html lang="es-SV" className="scroll-smooth">` a:

```tsx
<html lang="es-SV" className={`scroll-smooth ${poppins.variable}`}>
```

- [ ] **Step 4: Reescribir `app/globals.css`**

Contenido completo del archivo:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  h1, h2, h3, h4 {
    @apply text-primary dark:text-white;
    letter-spacing: -0.01em;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg;
  }

  .btn-accent {
    @apply text-primary font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:brightness-105;
    background-image: linear-gradient(135deg, #13C6AB 0%, #96E5AC 100%);
  }

  .btn-outline {
    @apply border-2 border-primary text-primary dark:border-white dark:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-primary hover:text-white;
  }

  .card {
    @apply bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-800;
  }

  .section-padding {
    @apply py-16 md:py-24;
  }

  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .brand-gradient {
    background-image: linear-gradient(135deg, #13C6AB 0%, #96E5AC 100%);
  }

  .eyebrow {
    @apply text-xs font-bold uppercase tracking-widest text-accent-700 dark:text-accent-300;
  }
}
```

Nota: `.btn-secondary` desaparece — los usos actuales (Hero/Services viejos) se reescriben en tareas posteriores; el build de ESTA tarea seguirá pasando porque Tailwind no valida clases inexistentes en runtime, pero el botón WhatsApp del Hero viejo quedará sin estilo hasta Task 5. Aceptable: es un estado intermedio de la rama.

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: exit 0. (Warnings de clases viejas no existen — Tailwind ignora clases no definidas.)

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx package.json package-lock.json
git commit -m "feat: apply new brand palette and Poppins typography"
```

---

### Task 2: Assets de marca (isotipo SVG, Logo, favicon, OG, screenshots)

**Files:**
- Create: `public/brand/isotipo.svg`, `components/Logo.tsx`, `app/icon.svg`, `public/og.png`, `public/screenshots/pos.png`, `public/screenshots/comandas.jpeg`
- Rename: `public/Code_Generated_Image (1).png` → `public/brand/lockup-navy.png`; `public/Code_Generated_Image.png` → `public/brand/brand-board.png`
- Delete: `public/logo.svg`, `public/logov2.png`, `public/logov3.svg`, `public/logov5.svg`, `public/logowh.svg`, `public/ChatGPT Image 7 abr 2025, 21_07_03.png`, `public/Code_Generated_Image (2).png`

**Interfaces:**
- Produces: `Logo({ variant }: { variant?: 'light' | 'dark' })` — lockup isotipo+wordmark; `variant='dark'` para fondos navy (wordmark blanco), `'light'` para fondos claros (wordmark primary). Default `'light'`.

- [ ] **Step 1: Reorganizar assets**

```bash
mkdir -p public/brand public/screenshots
git mv "public/Code_Generated_Image (1).png" public/brand/lockup-navy.png
git mv "public/Code_Generated_Image.png" public/brand/brand-board.png
git rm "public/Code_Generated_Image (2).png" public/logo.svg public/logov2.png public/logov3.svg public/logov5.svg public/logowh.svg "public/ChatGPT Image 7 abr 2025, 21_07_03.png"
cp /Users/ksorto/projects/apex/ed1032-pos-grid.png public/screenshots/pos.png
cp /Users/ksorto/projects/apex/comanda-desktop.jpeg public/screenshots/comandas.jpeg
```

Nota: los screenshots son PROVISIONALES; Kevin los reemplazará (mismo path) con versiones mejoradas por Gemini. `next/image` ya los sirve como WebP/AVIF (config existente).

- [ ] **Step 2: Crear `public/brand/isotipo.svg`**

Recreación vectorial de los chevrones del brand board. Punto de partida:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="g1" x1="10" y1="10" x2="70" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#96E5AC"/>
      <stop offset="0.55" stop-color="#13C6AB"/>
      <stop offset="1" stop-color="#121C8C"/>
    </linearGradient>
    <linearGradient id="g2" x1="90" y1="40" x2="30" y2="95" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#121C8C"/>
      <stop offset="0.45" stop-color="#13C6AB"/>
      <stop offset="1" stop-color="#96E5AC"/>
    </linearGradient>
  </defs>
  <path d="M22 14 L58 39 L22 64" stroke="url(#g1)" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M78 36 L42 61 L78 86" stroke="url(#g2)" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

- [ ] **Step 3: Ajustar el isotipo comparándolo con la referencia**

Abrir `public/brand/lockup-navy.png` (Read tool, es imagen) y el SVG renderizado (via dev server o abriendo el archivo). Ajustar coordenadas/gradientes del SVG hasta que la silueta y dirección de los gradientes se parezcan razonablemente al original (chevron superior apunta a la derecha, inferior a la izquierda, solapados al centro). No buscar perfección de píxel: es la versión web del isotipo; los SVG oficiales del diseñador podrán reemplazarlo después (mismo path).

- [ ] **Step 4: Crear `components/Logo.tsx`**

```tsx
import Image from 'next/image'

export default function Logo({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/brand/isotipo.svg"
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 md:h-10 md:w-10"
      />
      <span
        className={`text-lg md:text-xl font-bold leading-none tracking-tight ${
          variant === 'dark' ? 'text-white' : 'text-primary dark:text-white'
        }`}
      >
        apex code labs
      </span>
    </span>
  )
}
```

- [ ] **Step 5: Favicon — crear `app/icon.svg`**

```bash
cp public/brand/isotipo.svg app/icon.svg
```

Next lo sirve automáticamente como favicon. En Task 10 se elimina el `<link rel="icon">` manual del layout.

- [ ] **Step 6: Generar OG image 1200×630**

```bash
cp public/brand/lockup-navy.png /tmp/og-work.png
sips -c 840 1600 /tmp/og-work.png --out /tmp/og-crop.png
sips -z 630 1200 /tmp/og-crop.png --out public/og.png
```

Expected: `public/og.png` de 1200×630 con el lockup centrado sobre navy. Verificar con `sips -g pixelWidth -g pixelHeight public/og.png`.

- [ ] **Step 7: Verificar build y commit**

Run: `npm run build` → exit 0. Nota: `Header.tsx`/`Footer.tsx` aún referencian `/logov5.svg` y `/logowh.svg` (ya borrados) — eso NO rompe el build (rutas runtime), se corrige en Task 4.

```bash
git add -A
git commit -m "feat: add new brand assets (isotipo, logo lockup, favicon, og image)"
```

---

### Task 3: Capa de datos (`lib/contact.ts`, `lib/cta.ts`, `lib/pricing.ts`, `lib/faqs.ts`)

**Files:**
- Create: `lib/contact.ts`, `lib/cta.ts`, `lib/pricing.ts`, `lib/faqs.ts`

**Interfaces:**
- Produces:
  - `contact.ts`: `WA_NUMBER: string` (`'50379312064'`), `WA_MESSAGE: string`, `CONTACT_EMAIL: string`, `waLink(): string`
  - `cta.ts`: `getSignupHref(): string` — `NEXT_PUBLIC_SIGNUP_URL` o `'#contacto'`
  - `pricing.ts`: `PlanGroup`, `Plan` types; `PRICING_GROUPS: PlanGroup[]`; `EARLY_ADOPTER_NOTE: string`
  - `faqs.ts`: `FAQS: { question: string; answer: string }[]`

- [ ] **Step 1: Crear `lib/contact.ts`**

```ts
export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '50379312064'
export const WA_MESSAGE =
  process.env.NEXT_PUBLIC_WA_MSG || 'Hola Apex Code Labs, quiero información sobre Apex ERP.'
export const CONTACT_EMAIL = 'contacto@apexcodelabs.com'

export function waLink(): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`
}
```

- [ ] **Step 2: Crear `lib/cta.ts`**

```ts
// CTA "Prueba gratis": cuando exista el signup público, definir
// NEXT_PUBLIC_SIGNUP_URL en Vercel y los CTAs apuntarán allí sin tocar código.
export function getSignupHref(): string {
  return process.env.NEXT_PUBLIC_SIGNUP_URL || '#contacto'
}
```

- [ ] **Step 3: Crear `lib/pricing.ts`**

Cifras literales del brochure v4 (IVA incluido). NO calcular nada.

```ts
export interface Plan {
  name: string
  monthly: string
  annual: string
  dtes: string
  recommended?: boolean
  features: string[]
}

export interface PlanGroup {
  id: string
  label: string
  tagline: string
  plans: Plan[]
}

export const EARLY_ADOPTER_NOTE =
  'Early adopter: 30% de descuento los primeros 3 meses para los primeros 50 clientes.'

export const PRICING_GROUPS: PlanGroup[] = [
  {
    id: 'dte',
    label: 'Solo Facturación (DTE)',
    tagline: 'Ideal si ya tienes un sistema de ventas y solo necesitas cumplir con Hacienda.',
    plans: [
      {
        name: 'Starter', monthly: '$5.63', annual: '$54.12', dtes: '300 DTEs/mes',
        features: ['2 usuarios', 'Todos los tipos de DTE', 'Firma digital incluida', 'Transmisión automática al MH', 'PDF profesional', 'Soporte por email'],
      },
      {
        name: 'Negocio', monthly: '$11.28', annual: '$108.36', dtes: '800 DTEs/mes', recommended: true,
        features: ['3 usuarios', 'Todo lo del Starter', 'Envío por correo electrónico', 'Dashboard de facturación', 'Modo contingencia', 'Soporte prioritario'],
      },
      {
        name: 'Profesional', monthly: '$22.58', annual: '$216.84', dtes: '2,000 DTEs/mes',
        features: ['5 usuarios', 'Todo lo del Negocio', 'Reportes avanzados', 'Anulación de DTEs', 'Multi-sucursal'],
      },
      {
        name: 'Corporativo', monthly: '$39.53', annual: '$379.56', dtes: '3,000 DTEs/mes',
        features: ['10 usuarios', 'Todo lo del Profesional', 'API de integración', 'Soporte dedicado', 'Capacitación incluida'],
      },
    ],
  },
  {
    id: 'erp',
    label: 'ERP completo',
    tagline: 'Todos los módulos + DTE incluido. La solución integral para gestionar todo tu negocio.',
    plans: [
      {
        name: 'PYME', monthly: '$16.93', annual: '$162.60', dtes: '500 DTEs/mes',
        features: ['Ventas + Inventario + DTE', '3 usuarios', '1 bodega', 'Dashboard', 'Soporte email'],
      },
      {
        name: 'Business', monthly: '$28.23', annual: '$271.08', dtes: '1,500 DTEs/mes', recommended: true,
        features: ['Todos los módulos', '8 usuarios', 'Multi-bodega', 'Reportes avanzados', 'Soporte prioritario', '1 sesión de capacitación'],
      },
      {
        name: 'Enterprise', monthly: '$56.48', annual: '$542.28', dtes: '3,000 DTEs/mes',
        features: ['Todos los módulos', '20 usuarios', 'Multi-bodega ilimitada', 'Reportes avanzados', 'Capacitación incluida', 'Soporte dedicado 24/7'],
      },
    ],
  },
  {
    id: 'orquestador',
    label: 'Transmisión DTE (Orquestador)',
    tagline: '¿Ya tienes tu propio sistema? Nosotros firmamos, transmitimos al MH y almacenamos por ti.',
    plans: [
      { name: 'Básico', monthly: '$11.28', annual: '$108.36', dtes: '300 DTEs/mes', features: ['Importación de JSON externo', 'Firma digital', 'Transmisión al MH', 'Almacenamiento 10 años'] },
      { name: 'Avanzado', monthly: '$22.58', annual: '$216.84', dtes: '1,000 DTEs/mes', recommended: true, features: ['Todo lo del Básico', 'Dashboard de estado de DTEs', 'Soporte prioritario'] },
      { name: 'Ilimitado', monthly: '$39.53', annual: '$379.56', dtes: '3,000 DTEs/mes', features: ['Todo lo del Avanzado', 'API de integración', 'Soporte dedicado'] },
    ],
  },
]
```

- [ ] **Step 4: Crear `lib/faqs.ts`**

```ts
export const FAQS = [
  {
    question: '¿Qué es la facturación electrónica (DTE) y estoy obligado a usarla?',
    answer:
      'Desde 2023, el Ministerio de Hacienda de El Salvador exige la facturación electrónica (Documentos Tributarios Electrónicos) de forma progresiva para los contribuyentes. Apex ERP genera, firma y transmite tus DTEs directamente al MH, de forma automática al cerrar cada venta.',
  },
  {
    question: '¿Cuánto tarda la activación?',
    answer:
      'Tu sistema queda activo dentro de las 24 a 48 horas siguientes al primer pago confirmado. La certificación ante el MH (emisión de los DTEs de prueba requeridos) la hacemos nosotros de forma automatizada: horas en lugar de semanas.',
  },
  {
    question: '¿Pueden migrar los datos de mi sistema anterior?',
    answer:
      'Sí. Ofrecemos migración de datos desde tu sistema anterior como servicio adicional ($56.50, pago único): productos, clientes e inventario quedan listos en tu cuenta.',
  },
  {
    question: '¿Cómo obtengo el certificado digital del Ministerio de Hacienda?',
    answer:
      'El certificado digital para firmar DTEs se gestiona directamente con el MH. Si lo prefieres, te asistimos en todo el trámite como servicio adicional ($33.90, pago único).',
  },
  {
    question: '¿Qué pasa con mis datos si cancelo?',
    answer:
      'Nada que temer: no hay penalización por cancelación anticipada y al cancelar te entregamos un respaldo completo de tus datos en formato estándar. Todos los datos ingresados son 100% de tu propiedad.',
  },
  {
    question: '¿Funciona en tablets y teléfonos?',
    answer:
      'Sí. El sistema es una Progressive Web App (PWA): se instala como aplicación nativa en Android e iOS, sin pasar por las tiendas de aplicaciones. Puedes vender, ver caja, gestionar comandas y emitir DTEs desde cualquier dispositivo.',
  },
  {
    question: '¿Qué soporte incluye mi plan?',
    answer:
      'Todos los planes incluyen soporte por email. Los planes superiores incluyen soporte prioritario, y el soporte por WhatsApp está disponible como servicio adicional ($11.30/mes). Todas las actualizaciones y mejoras están incluidas sin costo extra.',
  },
  {
    question: '¿Los precios incluyen IVA?',
    answer:
      'Sí, todos los precios publicados ya incluyen el IVA (13%). Además, si pagas anual obtienes un 20% de descuento — equivale a pagar 10 meses en lugar de 12, con precio fijo garantizado todo el año.',
  },
]
```

- [ ] **Step 5: Verificar y commit**

Run: `npm run build` → exit 0.

```bash
git add lib/contact.ts lib/cta.ts lib/pricing.ts lib/faqs.ts
git commit -m "feat: add pricing, contact, cta and faq data layer"
```

---

### Task 4: Header y Footer con marca nueva

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: `Logo` (Task 2), `waLink`, `WA_NUMBER`, `CONTACT_EMAIL` (Task 3), `getSignupHref` (Task 3).
- Produces: ids de anclas usados por toda la página: `#modulos`, `#facturacion`, `#restaurantes`, `#precios`, `#faq`, `#contacto`.

- [ ] **Step 1: Reescribir `components/Header.tsx`**

Mantener `'use client'` y el estado del menú móvil. Cambios: logo → `<Logo />` con altura contenida (nada de 192px), nav con `<a href="#...">` (el scroll suave ya lo da `html.scroll-smooth`), items nuevos, CTA "Prueba gratis" con `getSignupHref()`.

```tsx
'use client'

import { useState } from 'react'
import Logo from './Logo'
import { getSignupHref } from '@/lib/cta'

const NAV = [
  { href: '#modulos', label: 'Módulos' },
  { href: '#facturacion', label: 'Facturación DTE' },
  { href: '#restaurantes', label: 'Restaurantes' },
  { href: '#precios', label: 'Precios' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" aria-label="Apex Code Labs — inicio">
            <Logo />
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <a href={getSignupHref()} className="btn-primary !py-2.5">
              Prueba gratis
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
              <a href={getSignupHref()} onClick={() => setIsMenuOpen(false)} className="btn-primary w-full text-center">
                Prueba gratis
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Reescribir `components/Footer.tsx`**

Server component (quitar `'use client'`; sin `new Date()` en cliente no hay problema de hidratación). Fondo `bg-navy`, `<Logo variant="dark" />`, descripción de producto, columnas "Producto" (anclas) y "Contacto" (email + WhatsApp reales), sin Twitter, LinkedIn se mantiene. Copy de descripción:

"Apex ERP: la plataforma salvadoreña que integra POS, inventario, comandas y facturación electrónica DTE con transmisión directa al Ministerio de Hacienda."

Columna Producto: Módulos → `#modulos`, Facturación DTE → `#facturacion`, Restaurantes y cafés → `#restaurantes`, Precios → `#precios`. Columna Contacto: `CONTACT_EMAIL` (mailto), WhatsApp `+503 7931-2064` (via `waLink()`), "San Salvador, El Salvador". Bottom bar: © año + "Política de Privacidad" (`/politica-privacidad`) + "Descargar brochure (PDF)" → `/ERP-Brochure-Comercial-v4.pdf`. Links sobre navy: `text-gray-300 hover:text-mint` (mint sobre navy pasa AA para texto de link ≥14px bold; usar `font-medium`).

```tsx
import Logo from './Logo'
import { CONTACT_EMAIL, waLink } from '@/lib/contact'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="container-custom">
        <div className="py-12 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-5"><Logo variant="dark" /></div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Apex ERP: la plataforma salvadoreña que integra POS, inventario,
              comandas y facturación electrónica DTE con transmisión directa al
              Ministerio de Hacienda.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Producto</h3>
            <ul className="space-y-2">
              <li><a href="#modulos" className="text-gray-300 hover:text-mint font-medium transition-colors">Módulos</a></li>
              <li><a href="#facturacion" className="text-gray-300 hover:text-mint font-medium transition-colors">Facturación DTE</a></li>
              <li><a href="#restaurantes" className="text-gray-300 hover:text-mint font-medium transition-colors">Restaurantes y cafés</a></li>
              <li><a href="#precios" className="text-gray-300 hover:text-mint font-medium transition-colors">Precios</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-mint font-medium transition-colors">{CONTACT_EMAIL}</a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-mint font-medium transition-colors">
                  WhatsApp: +503 7931-2064
                </a>
              </li>
              <li>San Salvador, El Salvador</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {year} Apex Code Labs. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="/politica-privacidad" className="text-gray-400 hover:text-mint text-sm transition-colors">Política de Privacidad</a>
            <a href="/ERP-Brochure-Comercial-v4.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-mint text-sm transition-colors">
              Descargar brochure (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Verificar y commit**

Run: `npm run build` → exit 0.

```bash
git add components/Header.tsx components/Footer.tsx
git commit -m "feat: rebrand header and footer with new logo and product nav"
```

---

### Task 5: Hero y ProblemSolution

**Files:**
- Modify: `components/Hero.tsx` (reescritura completa)
- Create: `components/ProblemSolution.tsx`

**Interfaces:**
- Consumes: `getSignupHref`, `waLink`.
- Produces: componentes default-export sin props, usados por `app/page.tsx` en Task 10.

- [ ] **Step 1: Reescribir `components/Hero.tsx`**

Server component (sin `'use client'`, sin `window.open` — CTAs son `<a>`).

```tsx
import Image from 'next/image'
import { getSignupHref } from '@/lib/cta'
import { waLink } from '@/lib/contact'
import { FileCheck2, Smartphone, BadgeDollarSign, MessageCircle } from 'lucide-react'

const PROPS = [
  { icon: FileCheck2, title: 'Transmisión directa al MH', text: 'DTE generado y transmitido al cobrar. Sin pasos extra.' },
  { icon: Smartphone, title: 'En cualquier dispositivo', text: 'PWA instalable en tablets y teléfonos, Android e iOS.' },
  { icon: BadgeDollarSign, title: 'Desde $5.63/mes', text: 'IVA incluido. Sin cargos ocultos ni permanencia.' },
]

export default function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900 text-accent-800 dark:text-accent-100 text-sm font-semibold">
            Facturación electrónica DTE · El Salvador
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Sistema ERP con{' '}
            <span className="text-transparent bg-clip-text brand-gradient">Facturación Electrónica</span>{' '}
            y POS
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Gestiona tu negocio completo desde una sola plataforma: ventas, POS,
            inventario, comandas, recetas y multi-sucursal — con DTE transmitido
            directamente al Ministerio de Hacienda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <a href={getSignupHref()} className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              Prueba gratis
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Hablar por WhatsApp
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-primary-100 dark:shadow-none overflow-hidden">
            <Image
              src="/screenshots/pos.png"
              alt="Punto de venta de Apex ERP con catálogo de productos y cobro con DTE"
              width={2400}
              height={1500}
              priority
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            {PROPS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg brand-gradient flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary dark:text-white mb-1">{title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

Nota gradiente en texto del H1: `text-transparent bg-clip-text` sobre el gradiente turquesa→menta en un H1 de 36–60px extrabold cumple AA para texto grande sobre los fondos claros usados (`primary-50`/blanco). No replicar este patrón en texto pequeño.

- [ ] **Step 2: Crear `components/ProblemSolution.tsx`**

```tsx
import { Store, UtensilsCrossed, Building2, Calculator, AlertTriangle } from 'lucide-react'

const AUDIENCES = [
  { icon: Store, title: 'PYMES', text: 'Que quieren dejar atrás el papel y cumplir con Hacienda sin gastar de más.' },
  { icon: UtensilsCrossed, title: 'Restaurantes y cafés', text: 'Comandas, mesas, cocina y recetas con descuento de insumos en tiempo real.' },
  { icon: Building2, title: 'Retail multi-sucursal', text: 'Control centralizado de inventario y ventas en cada punto, con POS móvil.' },
  { icon: Calculator, title: 'Contadores', text: 'Facturación de múltiples clientes o emisión de honorarios desde un solo lugar.' },
]

export default function ProblemSolution() {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="eyebrow mb-3">El problema</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Todavía controlas tu negocio con Excel, cuadernos y WhatsApp?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Eso significa errores frecuentes, horas perdidas en procesos manuales,
            cero visibilidad del negocio en tiempo real — y un riesgo real de multas.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16 p-6 rounded-2xl bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-900 dark:text-amber-100">
            <strong>Dato importante:</strong> desde 2023, el Ministerio de Hacienda
            exige la facturación electrónica (DTE) de forma progresiva en El Salvador.
            Con Apex ERP, cumplir no tiene que ser complicado ni caro.
          </p>
        </div>

        <div className="text-center mb-10">
          <p className="eyebrow mb-3">La solución</p>
          <h2 className="text-3xl md:text-4xl font-bold">Un solo sistema para todo tu negocio</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <div className="w-11 h-11 rounded-lg bg-primary-50 dark:bg-primary-800 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary dark:text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verificar y commit**

Run: `npm run build` → exit 0.

```bash
git add components/Hero.tsx components/ProblemSolution.tsx
git commit -m "feat: rewrite hero and add problem/solution section for ERP product"
```

---

### Task 6: Modules y DteSection

**Files:**
- Create: `components/Modules.tsx`
- Create: `components/DteSection.tsx`

**Interfaces:**
- Consumes: tokens/utilities de Task 1.
- Produces: secciones con ids `#modulos` y `#facturacion`.

- [ ] **Step 1: Crear `components/Modules.tsx`**

```tsx
import {
  ShoppingCart, FileCheck2, Package, Users, Truck, Warehouse,
  BarChart3, ShieldCheck, ChefHat, Utensils, Banknote, Smartphone, Zap,
} from 'lucide-react'

const MODULES = [
  { icon: ShoppingCart, title: 'Ventas y POS', text: 'Punto de venta completo: descuentos, múltiples formas de pago y factura automática al cerrar cada venta.' },
  { icon: FileCheck2, title: 'Facturación Electrónica (DTE)', text: 'Todos los tipos de DTE con transmisión directa y automática al Ministerio de Hacienda.' },
  { icon: Package, title: 'Inventario y Kardex', text: 'Stock en tiempo real con Kardex automático, alertas de stock bajo e historial por producto.' },
  { icon: Users, title: 'Gestión de Clientes', text: 'Base completa con historial de compras, datos fiscales (NIT, NRC, DUI) y seguimiento.' },
  { icon: Truck, title: 'Proveedores', text: 'Directorio centralizado con historial de compras, condiciones de pago y documentos.' },
  { icon: Warehouse, title: 'Almacenes Multi-bodega', text: 'Múltiples bodegas o sucursales desde una sola cuenta, con transferencias trazables.' },
  { icon: BarChart3, title: 'Dashboard en Tiempo Real', text: 'Ventas del día, productos más vendidos, estado de DTEs y alertas — al instante.' },
  { icon: ShieldCheck, title: 'Roles y Seguridad', text: 'Permisos granulares por módulo: administrador, supervisor, contador, cajero, mesero, cocinero.' },
  { icon: ChefHat, title: 'Comandas y Cocina', text: 'Mesas, áreas y comandas con timer en tiempo real, sincronizadas entre cocina y salón.' },
  { icon: Utensils, title: 'Recetas e Insumos', text: 'Al vender, el sistema descuenta automáticamente los insumos. Sub-recetas y costeo incluidos.' },
  { icon: Banknote, title: 'Caja con Arqueo', text: 'Apertura y cierre por sesión, corte X y corte Z con cálculo automático de diferencias.' },
  { icon: Smartphone, title: 'App Móvil (PWA)', text: 'Se instala como app nativa en tablets y teléfonos, Android e iOS, sin tiendas.' },
]

export default function Modules() {
  return (
    <section id="modulos" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Módulos del sistema</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas, en un solo lugar</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Módulos especializados que trabajan de forma integrada. Contrata solo lo
            que necesitas o el paquete completo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <div className="w-11 h-11 rounded-lg bg-accent-50 dark:bg-accent-900 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-accent-700 dark:text-accent-300" />
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto p-8 rounded-2xl bg-primary text-white flex gap-4 items-start">
          <Zap className="w-8 h-8 text-mint flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Integración nativa POS → Inventario → DTE</h3>
            <p className="text-gray-200 leading-relaxed">
              Cuando tu cajero cierra una venta, el sistema descuenta inventario
              (incluidos los insumos vía recetas), registra la transacción en caja,
              genera y transmite el DTE al MH, e imprime el ticket térmico. Todo en
              un solo paso, sin duplicar datos. Somos la única plataforma salvadoreña
              con esta integración completa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Crear `components/DteSection.tsx`**

Sección oscura (navy) — el momento de mayor impacto visual de la página.

```tsx
import { ShieldCheck, Clock, RefreshCw, Plug } from 'lucide-react'

const DOC_TYPES = [
  { code: '01', name: 'Factura de Consumidor Final' },
  { code: '03', name: 'Comprobante de Crédito Fiscal' },
  { code: '05', name: 'Nota de Crédito' },
  { code: '06', name: 'Nota de Débito' },
  { code: '07', name: 'Comprobante de Retención' },
  { code: '11', name: 'Factura de Exportación' },
  { code: '14', name: 'Factura de Sujeto Excluido' },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Firma digital integrada', text: 'PKCS#12, RSA-SHA256 y almacenamiento por 10 años, como exige la ley.' },
  { icon: Clock, title: 'Certificación MH automatizada', text: 'Nosotros te certificamos: los DTEs de prueba requeridos se generan y transmiten en horas, no semanas. 98%+ de aceptación.' },
  { icon: RefreshCw, title: 'Modo contingencia', text: 'Si el MH no está disponible, sigues vendiendo; el sistema retransmite automáticamente.' },
  { icon: Plug, title: 'Orquestador para tu sistema', text: '¿Ya tienes tu propio software? Envíanos el JSON: firmamos, transmitimos y almacenamos por ti.' },
]

export default function DteSection() {
  return (
    <section id="facturacion" className="section-padding bg-navy text-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3 !text-accent">Facturación electrónica</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 !text-white">
            Cumple con Hacienda sin complicaciones
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Integración completa con el Ministerio de Hacienda de El Salvador:
            todos los requerimientos técnicos y legales vigentes para transmitir DTEs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="font-bold !text-white">Tipos de documentos soportados</h3>
            </div>
            <ul className="divide-y divide-white/10">
              {DOC_TYPES.map(({ code, name }) => (
                <li key={code} className="px-6 py-3 flex items-center gap-4">
                  <span className="font-bold text-mint tabular-nums w-8">{code}</span>
                  <span className="text-gray-200">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <Icon className="w-7 h-7 text-accent mb-3" />
                <h3 className="font-bold mb-2 !text-white">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verificar y commit**

Run: `npm run build` → exit 0.

```bash
git add components/Modules.tsx components/DteSection.tsx
git commit -m "feat: add modules grid and DTE section"
```

---

### Task 7: RestaurantFlow

**Files:**
- Create: `components/RestaurantFlow.tsx`

**Interfaces:**
- Produces: sección con id `#restaurantes`.

- [ ] **Step 1: Crear `components/RestaurantFlow.tsx`**

```tsx
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const STEPS = [
  { n: '1', title: 'El mesero toma la orden', text: 'Desde tablet o teléfono, con login por PIN. Selecciona mesa y agrega ítems.' },
  { n: '2', title: 'Cocina la recibe al instante', text: 'Pantalla de cocina (KDS) con timer configurable. Cada cambio de estado se sincroniza con el salón.' },
  { n: '3', title: 'Cobro + DTE + ticket', text: 'El cajero cobra en el POS: se descuentan insumos, se genera el DTE y se imprime el ticket térmico Bluetooth.' },
  { n: '4', title: 'Cierre de caja con corte Z', text: 'Corte X de lectura y corte Z fiscal al final del turno, con reporte automático al administrador.' },
]

const FEATURES = [
  'Mesas con disposición gráfica y áreas (terraza, salón, barra)',
  'Recetas con múltiples insumos, sub-recetas y costo CMV por venta',
  'Roles preconfigurados: mesero, cocinero, cajero, supervisor',
  'Impresoras térmicas Bluetooth de 58mm portátiles',
  'Multi-sucursal con consolidación de reportes',
  'Auditoría por empleado en cada acción crítica',
]

export default function RestaurantFlow() {
  return (
    <section id="restaurantes" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Solución para restaurantes y cafés</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            De la mesa a Hacienda, sin fricción
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            POS especializado con comandas, mesas, cocina y recetas — validado en
            producción con clientes reales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {STEPS.map(({ n, title, text }) => (
            <div key={n} className="card p-6 relative">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center tabular-nums">
                {n}
              </span>
              <h3 className="text-lg font-bold mb-2 mt-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/screenshots/comandas.jpeg"
              alt="Vista de comandas de Apex ERP con mesas y estados de cocina en tiempo real"
              width={2000}
              height={1250}
              className="w-full h-auto"
            />
          </div>
          <ul className="space-y-4 order-1 lg:order-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-700 dark:text-accent-300 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar y commit**

Run: `npm run build` → exit 0.

```bash
git add components/RestaurantFlow.tsx
git commit -m "feat: add restaurant flow section"
```

---

### Task 8: Pricing y Comparison

**Files:**
- Create: `components/Pricing.tsx`
- Create: `components/Comparison.tsx`

**Interfaces:**
- Consumes: `PRICING_GROUPS`, `EARLY_ADOPTER_NOTE`, `Plan`, `PlanGroup` (Task 3); `getSignupHref` (Task 3).
- Produces: secciones con ids `#precios` y `#comparativa`.

- [ ] **Step 1: Crear `components/Pricing.tsx`**

Client component: dos estados (grupo activo, ciclo mensual/anual).

```tsx
'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { PRICING_GROUPS, EARLY_ADOPTER_NOTE } from '@/lib/pricing'
import { getSignupHref } from '@/lib/cta'

export default function Pricing() {
  const [groupId, setGroupId] = useState('erp')
  const [annual, setAnnual] = useState(false)
  const group = PRICING_GROUPS.find((g) => g.id === groupId)!

  return (
    <section id="precios" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Planes y precios</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Elige el plan para tu negocio</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Todos los precios incluyen IVA (13%). Sin permanencia forzada.
          </p>
        </div>

        <div className="mb-6 max-w-2xl mx-auto p-4 rounded-xl bg-accent-50 dark:bg-accent-900 text-accent-800 dark:text-accent-100 text-center text-sm font-semibold">
          {EARLY_ADOPTER_NOTE}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {PRICING_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setGroupId(g.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-colors ${
                g.id === groupId
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{group.tagline}</p>

        <div className="flex justify-center items-center gap-3 mb-12">
          <span className={`text-sm font-medium ${!annual ? 'text-primary dark:text-white' : 'text-gray-500'}`}>Mensual</span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="Cambiar a facturación anual"
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
          >
            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${annual ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-primary dark:text-white' : 'text-gray-500'}`}>
            Anual <span className="text-accent-700 dark:text-accent-300 font-bold">(−20%)</span>
          </span>
        </div>

        <div className={`grid gap-6 max-w-6xl mx-auto ${group.plans.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {group.plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-6 flex flex-col ${plan.recommended ? 'ring-2 ring-accent relative' : ''}`}
            >
              {plan.recommended && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient text-primary text-xs font-bold uppercase tracking-wide">
                  Recomendado
                </span>
              )}
              <h3 className="text-lg font-bold mb-1 mt-1">{plan.name}</h3>
              <p className="mb-1">
                <span className="text-4xl font-extrabold text-primary dark:text-white tabular-nums">
                  {annual ? plan.annual : plan.monthly}
                </span>
                <span className="text-gray-500 text-sm">{annual ? '/año' : '/mes'}</span>
              </p>
              <p className="text-sm text-gray-500 mb-5">{plan.dtes}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-accent-700 dark:text-accent-300 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={getSignupHref()}
                className={`text-center ${plan.recommended ? 'btn-accent' : 'btn-outline'}`}
              >
                Empezar
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-gray-500">
          ¿Necesitas más detalle?{' '}
          <a href="/ERP-Brochure-Comercial-v4.pdf" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-accent-300 font-semibold underline">
            Descarga el brochure completo (PDF)
          </a>{' '}
          con add-ons y condiciones.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Crear `components/Comparison.tsx`**

```tsx
import { Check, X } from 'lucide-react'

type Cell = boolean | string

const ROWS: { label: string; apex: Cell; facxi: Cell; n1co: Cell; acatha: Cell; facturaya: Cell }[] = [
  { label: 'Precio desde', apex: '$5.63/mes', facxi: '$4.99/mes', n1co: '$15/mes', acatha: '$250/año', facturaya: '$5.90/mes' },
  { label: 'ERP integrado', apex: true, facxi: 'Parcial', n1co: false, acatha: 'Parcial', facturaya: false },
  { label: 'Ventas integradas con DTE', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
  { label: 'Comandas, mesas y cocina', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
  { label: 'Recetas con descuento de insumos', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
  { label: 'Caja registradora con corte X/Z', apex: true, facxi: false, n1co: false, acatha: 'Parcial', facturaya: false },
  { label: 'App móvil PWA (iOS + Android)', apex: true, facxi: 'Web', n1co: true, acatha: false, facturaya: 'Web' },
  { label: 'Certificación MH automática', apex: true, facxi: false, n1co: false, acatha: false, facturaya: false },
]

function CellValue({ value, highlight = false }: { value: Cell; highlight?: boolean }) {
  if (value === true) return <Check className={`w-5 h-5 mx-auto ${highlight ? 'text-accent-700 dark:text-accent-300' : 'text-gray-400'}`} aria-label="Sí" />
  if (value === false) return <X className="w-5 h-5 mx-auto text-red-400" aria-label="No" />
  return <span className={highlight ? 'font-bold text-primary dark:text-white' : 'text-gray-600 dark:text-gray-400'}>{value}</span>
}

export default function Comparison() {
  return (
    <section id="comparativa" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">¿Por qué elegirnos?</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comparativa con otras soluciones</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Somos el único sistema salvadoreño que integra nativamente las ventas
            con la facturación electrónica.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm text-center min-w-[720px]">
            <thead>
              <tr className="bg-navy text-white">
                <th className="px-4 py-4 text-left font-semibold">Característica</th>
                <th className="px-4 py-4 font-bold bg-primary">Apex ERP</th>
                <th className="px-4 py-4 font-semibold">Facxi</th>
                <th className="px-4 py-4 font-semibold">N1co</th>
                <th className="px-4 py-4 font-semibold">Acatha</th>
                <th className="px-4 py-4 font-semibold">FacturaYa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {ROWS.map((row) => (
                <tr key={row.label} className="bg-white dark:bg-gray-950">
                  <td className="px-4 py-3.5 text-left font-medium text-gray-700 dark:text-gray-300">{row.label}</td>
                  <td className="px-4 py-3.5 bg-accent-50/60 dark:bg-accent-900/30"><CellValue value={row.apex} highlight /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.facxi} /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.n1co} /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.acatha} /></td>
                  <td className="px-4 py-3.5"><CellValue value={row.facturaya} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verificar y commit**

Run: `npm run build` → exit 0.

```bash
git add components/Pricing.tsx components/Comparison.tsx
git commit -m "feat: add pricing plans with billing toggle and competitor comparison"
```

---

### Task 9: FAQ y ContactForm (contenido nuevo)

**Files:**
- Modify: `components/FAQ.tsx`
- Modify: `components/ContactForm.tsx`

**Interfaces:**
- Consumes: `FAQS` (Task 3).

- [ ] **Step 1: Actualizar `components/FAQ.tsx`**

Eliminar el array `faqs` local (líneas 8–41) e importar la data compartida:

```tsx
import { FAQS } from '@/lib/faqs'
```

Reemplazar `faqs.map(...)` por `FAQS.map(...)` (dos usos). Actualizar el subtítulo de la sección a: "Resolvemos las dudas más comunes sobre Apex ERP y la facturación electrónica". El CTA final de la sección queda igual (scroll a contacto).

- [ ] **Step 2: Actualizar `components/ContactForm.tsx`**

Reemplazar el array `services` (líneas 34–41) por:

```tsx
  const services = [
    'Solo Facturación Electrónica (DTE)',
    'ERP completo',
    'Transmisión DTE (Orquestador)',
    'Aún no lo sé — quiero una demo',
  ]
```

Localizar el `<h2>` de la sección (dentro de `<section id="contacto">`) y cambiar el título a "Agenda tu demo gratuita de 30 minutos" y el subtítulo (el `<p>` inmediato) a "Te mostramos el sistema en vivo y resolvemos todas tus dudas. Sin instalación y sin compromiso." Localizar el `<label>` del select de servicio y cambiarlo a "¿Qué te interesa? *". No tocar `handleSubmit`, la API ni el honeypot.

- [ ] **Step 3: Verificar y commit**

Run: `npm run build` → exit 0.

```bash
git add components/FAQ.tsx components/ContactForm.tsx
git commit -m "feat: rewrite FAQ content and contact form for ERP demo requests"
```

---

### Task 10: Composición, SEO y limpieza final

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (metadata)
- Modify: `lib/schema.ts`
- Modify: `components/WhatsAppFloat.tsx` (solo fallback del número)
- Delete: `components/Services.tsx`, `components/Process.tsx`

**Interfaces:**
- Consumes: todos los componentes de Tasks 4–9; `FAQS` (Task 3).

- [ ] **Step 1: Reescribir `app/page.tsx`**

```tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSolution from '@/components/ProblemSolution'
import Modules from '@/components/Modules'
import DteSection from '@/components/DteSection'
import RestaurantFlow from '@/components/RestaurantFlow'
import Pricing from '@/components/Pricing'
import Comparison from '@/components/Comparison'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSolution />
      <Modules />
      <DteSection />
      <RestaurantFlow />
      <Pricing />
      <Comparison />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
```

- [ ] **Step 2: Eliminar componentes de agencia**

```bash
git rm components/Services.tsx components/Process.tsx
```

- [ ] **Step 3: Actualizar fallback de WhatsApp en `components/WhatsAppFloat.tsx`**

Buscar `'503XXXXXXXX'` y reemplazar por `'50379312064'` (mismo cambio de fallback que ya hace `lib/contact.ts`; este componente mantiene su propia lectura de env — si usa un mensaje por defecto, actualizarlo a "Hola Apex Code Labs, quiero información sobre Apex ERP.").

- [ ] **Step 4: Metadata nueva en `app/layout.tsx`**

Reemplazar el objeto `metadata` completo:

```tsx
export const metadata: Metadata = {
  title: 'Apex ERP — Sistema ERP con Facturación Electrónica y POS en El Salvador',
  description:
    'Gestiona tu negocio completo desde una sola plataforma: ventas, POS, inventario, comandas, recetas, multi-sucursal y facturación electrónica DTE con transmisión directa al Ministerio de Hacienda. Desde $5.63/mes con IVA incluido.',
  keywords:
    'facturación electrónica El Salvador, DTE, sistema ERP, punto de venta, POS restaurante, Ministerio de Hacienda, inventario, comandas, El Salvador',
  authors: [{ name: 'Apex Code Labs' }],
  creator: 'Apex Code Labs',
  publisher: 'Apex Code Labs',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    url: 'https://apexcodelabs.com',
    siteName: 'Apex Code Labs',
    title: 'Apex ERP — Sistema ERP con Facturación Electrónica y POS en El Salvador',
    description:
      'Ventas, POS, inventario, comandas y facturación electrónica DTE transmitida directamente al Ministerio de Hacienda. Desde $5.63/mes.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Apex Code Labs — Apex ERP' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex ERP — ERP con Facturación Electrónica y POS en El Salvador',
    description:
      'Ventas, POS, inventario, comandas y DTE transmitido directamente al Ministerio de Hacienda. Desde $5.63/mes.',
    images: ['/og.png'],
  },
  alternates: { canonical: 'https://apexcodelabs.com' },
}
```

En el `<head>`: eliminar `<link rel="icon" href="/favicon.ico" />` y `<link rel="apple-touch-icon" ...>` (los sirve `app/icon.svg`; si existe `public/apple-touch-icon.png` viejo, borrarlo), cambiar `theme-color` a `#121C8C`, y agregar el script JSON-LD de los schemas nuevos (ver Step 5).

- [ ] **Step 5: Reescribir `lib/schema.ts`**

Mantener `generateOrganizationSchema` y `generateWebSiteSchema` (actualizar descripciones al copy de producto) y agregar:

```ts
import { FAQS } from './faqs'

export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Apex ERP',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Android, iOS (PWA)',
    description:
      'Sistema ERP con punto de venta, inventario, comandas y facturación electrónica DTE integrada con el Ministerio de Hacienda de El Salvador.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '5.63',
      highPrice: '56.48',
      offerCount: 10,
    },
    provider: { '@type': 'Organization', name: 'Apex Code Labs', url: 'https://apexcodelabs.com' },
  }
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
```

En `app/layout.tsx`, generar e insertar ambos schemas nuevos igual que los existentes (dos `<script type="application/ld+json">` más).

- [ ] **Step 6: Build final**

Run: `npm run lint && npm run build`
Expected: ambos exit 0, sin errores TS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: compose ERP product landing, update SEO metadata and JSON-LD"
```

---

### Task 11: Verificación visual y de contraste

**Files:** ninguno nuevo (fixes puntuales si aparecen).

- [ ] **Step 1: Levantar dev server**

Run: `npm run dev` (background). Expected: "Ready" en `http://localhost:3001`.

- [ ] **Step 2: Revisión visual desktop (1440px)**

Con browser tooling (chrome-devtools o Playwright MCP), navegar a `http://localhost:3001` y capturar screenshot full-page. Verificar contra checklist:
- Header: logo nuevo ~40px de alto, nav completa, CTA "Prueba gratis".
- Hero: H1 con gradiente solo en "Facturación Electrónica", screenshot visible, 2 CTAs.
- Secciones en orden: problema → módulos (12 cards) → DTE (fondo navy) → restaurantes → precios → comparativa → FAQ → contacto → footer navy.
- Pricing: tabs cambian de grupo; toggle anual cambia cifras (Business $28.23 → $271.08).
- Sin texto turquesa/menta pequeño sobre blanco; sin texto blanco sobre turquesa/menta.

- [ ] **Step 3: Revisión móvil (390px)**

Redimensionar viewport a 390×844. Verificar: menú hamburguesa abre/cierra, tabla comparativa scrollea horizontal sin desbordar la página, cards de pricing apiladas, imágenes no desbordan.

- [ ] **Step 4: FAQ y formulario**

Abrir/cerrar 2 preguntas del FAQ. Llenar el formulario con datos de prueba y enviar; Expected: sin `RESEND_API_KEY` el API responde error controlado — verificar que la UI muestra el mensaje de error correctamente (el flujo completo con email se prueba en producción con las env vars de Vercel).

- [ ] **Step 5: Páginas secundarias**

Visitar `/gracias` y `/politica-privacidad`: sin referencias a logos borrados ni copy de agencia flagrante. Corregir si aparece (mismo patrón de branding).

- [ ] **Step 6: Fixes y commit final**

Corregir cualquier hallazgo de los pasos 2–5.

```bash
git add -A
git commit -m "fix: visual polish from responsive and contrast review"
```

(Si no hubo hallazgos, omitir el commit.)
