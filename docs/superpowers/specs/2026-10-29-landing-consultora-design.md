# Landing de Apex como consultora — diseño

Fecha: 2026-10-29 · Repo: `apex-landing` (Next 16 + OpenNext en Cloudflare Workers) · Aprobación: Kevin, 29-oct («por lo demás está perfecto»).

## Intención

Kevin pidió que apexcodelabs.com «sea una página de una verdadera consultora». Hoy la home vende un producto (Apex ERP) y le habla a restaurantes. Los últimos tres clientes llegaron porque su contador los recomendó, y escribieron por WhatsApp. Dos no tenían ningún sistema; el tercero venía quemado por un software a la medida caro e incompleto.

La primera pantalla tiene que decir tres cosas: quién somos, que lo que ofrecemos le va a funcionar, y cuánto cuesta. Sin clichés del tipo «Sistema de facturación…» o «Gestiona tu negocio…».

## Dos lectores, sin mezclarlos

1. **El dueño de negocio** (lector principal): es la home. Entra por **Apex Factura** (cumplir con Hacienda) y descubre **Apex ERP** como el paso siguiente cuando el negocio crece, no como una alternativa que tiene que comparar desde el inicio.
2. **La empresa que necesita un equipo de desarrollo**: un bloque corto en la home la lleva a una página propia, `/desarrollo`.

## Reglas de contenido (no negociables)

- **Se dice lo que el cliente GANA, nunca CÓMO trabajamos por dentro.** No hay filosofía modular, ni piezas, ni legos.
- **Modelo de cobro:** sí se dice «no pagas nada por el desarrollo; se suma a tu mensualidad cuando empiezas a usarlo». **No** se dice «sin costo de instalación» ni «sin costo de implementación»: a los clientes lejanos se les cobra la instalación.
- **En ninguna página aparece:** modelo de cobro del desarrollo más allá de la frase anterior, forma de cobro (ni «por hitos»), stack tecnológico, ni información sensible de un cliente. El cliente del desarrollo de restaurantes **jamás se nombra**: ni nombre, ni capturas, ni descripción que lo identifique.
- **Todo el sitio en tuteo, nada de voseo** (Kevin, 29-oct): «Escríbenos», «pagas», «necesitas». Los mockups aprobados estaban en voseo; su texto ya está pasado a tuteo en este documento. Al implementar, revisar que ningún componente quede en voseo.
- **Los verticales llevan precio, siempre como «desde»** (Kevin, 29-oct; revierte la decisión del 28-oct de publicarlos sin precio). Así la landing no contradice al brochure. El «desde» tiene que leerse sin ambigüedad: es un adicional mensual sobre un plan, no un precio cerrado.
- **Fortalezas propias, sin comparaciones:** la landing no se compara con nadie, ni siquiera en una tabla. Kevin: «que ellos traten de compararse con nosotros». Tampoco se usa «el único».

## Home: orden aprobado

Mockup de referencia: `.superpowers/brainstorm/11420-1793310203/content/home-orden.html`.

| # | Sección | Qué cambia |
|---|---|---|
| 1 | **Hero «Directo»** (`Hero.tsx`) | Se reemplaza entero por el mockup aprobado `hero-directo-v7.html` (ver abajo). |
| 2 | **ProblemSolution** | Se acorta para no repetir el hero. Hoy tiene una tarjeta «Restaurantes y cafés»: deja de presentar el rubro restaurante como protagonista. |
| 3 | **DteSection** = la puerta de Apex Factura | **Sube** del 4.º al 3.er lugar. |
| 4 | **Modules** = Apex ERP | Se presenta como «cuando el negocio crece»: facturas con nosotros y, cuando quieras, sumas inventario, caja, comandas. |
| 5 | **Pricing** | Factura primero (ya es así), ERP después. Los verticales **recuperan el precio «desde»** (tabla abajo). |
| 6 | ~~Comparison~~ | **Sale** (Kevin, 29-oct). Se borra `components/Comparison.tsx`. |
| 7 | **NUEVO: «También desarrollamos para otras empresas»** | Bloque corto con un CTA hacia `/desarrollo`. |
| 8 | **FAQ** | Se queda. |
| 9 | **ContactForm** | Se queda. |
| — | **RestaurantFlow** | **Sale** de la home y se muda a `/restaurantes`. |

**Menú:** Factura · ERP · Restaurantes · Desarrollo · Precios, más WhatsApp como acción principal. «Restaurantes» entra al menú **(decisión de Claude)**: hoy el menú ya tiene ese enlace, y una página que existe por SEO necesita enlaces internos. Desde la home también se llega por la fila Restaurante de los verticales en Pricing, que enlaza a `/restaurantes` **(decisión de Claude)**.

### Hero «Directo» (texto aprobado, mockup v7)

- Antetítulo: «Apex Code Labs · El Salvador».
- Título: «Un sistema que funciona desde el primer día, y se adapta a cómo trabaja tu negocio.»
- Bajada: «Facturación electrónica, punto de venta, inventario y clientes, listos desde el primer día. Si tu operación necesita algo más, o que algo funcione distinto, lo desarrollamos nosotros.»
- Dos datos: «Desde $5.63/mes · IVA incluido, sin permanencia» y «Lo que desarrollamos para ti se suma a tu mensualidad cuando empiezas a usarlo · no pagas nada por el desarrollo».
- CTA principal: «Escríbenos por WhatsApp». CTA secundario: «Ver precios» (ancla a Pricing).
- Bloque «cómo crece tu mensualidad» (va más abajo en la página): Mes 1, plan Esencial de Apex Factura, $5.63 · Mes 2, el módulo pedido empieza a usarse, + $4.99 · Desde ahí, una sola mensualidad, $10.62. Disclaimer: «Ejemplo ilustrativo. El precio de lo que desarrollamos se cotiza según lo que tu negocio quiera agregar o personalizar, y te lo damos por escrito antes de empezar. Precios con IVA incluido.»

$5.63 es el Esencial de Apex Factura (`lib/pricing.ts:36`). El hero ya apunta a la entrada por Factura. Si el precio cambia en `lib/pricing.ts`, el hero tiene que leerlo de ahí, no repetir el número escrito a mano.

## Precios de los verticales (fuente: `public/Apex-Brochure-2026-10.pdf`, sección 5)

| Vertical | Precio en la landing | Sobre qué plan |
|---|---|---|
| Farmacia | desde +$5.63/mes | cualquier plan ERP (recomendado Operación) |
| Restaurante | desde +$5.63/mes | cualquier plan ERP |
| Turismo | desde +$5.63/mes | cualquier plan ERP |
| Proyectos y talleres | desde +$56.48/mes | Operación o Empresa |
| Servicios | desde +$4.50/mes | cualquier plan Factura |
| Gimnasio | desde +$5.63/mes | cualquier plan ERP (Kevin, 29-oct; no figura en el brochure) |

**Por qué $5.63 y no $5.64:** el neto es $4.99 y $4.99 × 1.13 = $5.6387. erp-2025 **trunca** el IVA a 2 decimales (`InvoiceService.php:114`, `bcdiv(..., 2)`), así que cobra $5.63. La landing publica lo que se cobra (`lib/pricing.ts:2` ya lo documenta).

Los precios viven en `lib/pricing.ts`, como el resto del catálogo, no escritos a mano en el componente. Kevin los había sacado porque «visualmente no se veían bien y no estaban bien definidos». El builder tiene que resolver las dos cosas: el precio se lee como un adicional sobre un plan («+$5.63/mes sobre tu plan ERP»), nunca como el precio total del vertical.

## FAQ de servicios adicionales

Ambas respuestas dicen que el servicio existe y que se ve en la cotización, donde Apex decide si aplica.

- `lib/faqs.ts:15`, migración: se refiere a conservar los datos históricos que el cliente trae de otra plataforma. **Sale el precio ($56.50).**
- `lib/faqs.ts:20`, asistencia con el certificado digital: **sale el precio ($33.90).**

## Página `/restaurantes`: «Apex Restaurante» (Kevin, 29-oct)

Es **el mismo Apex ERP con el paquete Restaurante**, no un producto aparte. Existe porque los restaurantes son buena parte de los clientes y la palabra clave «POS restaurante» no se puede perder.

- **Módulos que muestra:** comandas, mesas y áreas, pantalla de cocina (KDS), recetas que descuentan insumos, POS, caja con corte X y corte Z, y DTE.
- **Precio de entrada:** «desde $28.22/mes», que corresponde a Comercio + Restaurante según el brochure (`public/Apex-Brochure-2026-10.pdf`, «Ejemplos de cuánto paga»). Se toma ese número, no la suma $22.58 + $5.63 (ver la nota del IVA en decisiones).
- **Contenido:** RestaurantFlow (los 4 pasos, de la mesa a Hacienda) con sus capturas, que hoy está en la home.
- Rigen las mismas reglas de contenido que en el resto del sitio: tuteo, sin comparaciones, sin stack, y sin nombrar al cliente del desarrollo de restaurantes. Ese cliente es otro proyecto y no tiene nada que ver con esta página.

## Página `/desarrollo` (mockup aprobado `servicios-v3.html`)

- Antetítulo: «Apex Code Labs · Desarrollo para empresas».
- Título: «Construimos el sistema que tu empresa va a vender o a usar, con la tecnología que elijas.»
- Bajada: «Apps móviles, plataformas con pagos, sistemas para operar un negocio y productos que se venden a otras empresas. Nuestro propio ERP es la prueba de que lo sabemos sostener en producción.»
- CTA: «Cuéntanos tu proyecto».
- **Lo que construimos:** apps móviles para iOS y Android · plataformas donde el cliente compra y paga desde su teléfono · sistemas para operar un negocio de punta a punta · productos que tu empresa vende a otras empresas, cada una con sus datos separados.
- **Lugar reservado** para casos con nombre, logo y capturas, para cuando haya partners que se puedan mostrar. En esta entrega **no se muestra ningún caso**: el lugar queda preparado en el código, pero no se renderiza.
- **Cómo trabajamos:** (1) conocemos la operación hablando con quien hace el trabajo · (2) propuesta escrita con alcance, etapas, tiempos y precio · (3) entregamos por etapas y se usa lo construido antes de seguir. Los pasos 1 y 2 salen del brochure. El 3 lo propuse yo y Kevin no lo corrigió.

## Lo que hoy contradice las reglas (inventario para el builder)

- `ContactForm.tsx:127`: «Sin instalación» choca con la regla de cobro («sin compromiso» es real y se queda).
- `Header.tsx:11` y `Footer.tsx:38` enlazan `#restaurantes`, un ancla que deja de existir al sacar RestaurantFlow de la home. Pasan a enlazar `/restaurantes`.
- `Hero.tsx:28` y `Footer.tsx:15` describen el producto con «comandas» como protagonista.
- `lib/schema.ts` (SEO): las descripciones hablan solo de Apex ERP. Hay que alinearlas con la entrada por Factura y con la consultora.
- `Pricing.tsx:105` y `Footer.tsx:63` enlazan `/Apex-Brochure-2026-10.pdf`. Se siguen enlazando: con los precios «desde» en la landing, ya no hay contradicción.
- `lib/faqs.ts:15` publica $56.50 por la migración. Sale el precio (ver decisiones).
- `lib/faqs.ts:20` publica $33.90 por el certificado. Sale el precio, igual que en la migración (Kevin, 29-oct).

## Fuera de alcance

- El formulario de contacto en producción (token del Worker): está bloqueado por `railway ssh` y va por separado.
- Rediseño visual: se usan el sistema de diseño y los tokens actuales (`DESIGN.md`, `tailwind.config.ts`).
- Páginas para los demás verticales (Farmacia, Turismo, etc.). Solo se hace la de restaurantes.

## Decisiones tomadas después de la revisión del builder

Las marcadas **(decisión de Claude)** no las confirmó Kevin; él las revisa al leer este documento.

- **Fuente de verdad del texto:** manda el texto de este documento. Los mockups sirven para ver el layout y están en `.superpowers/brainstorm/30649-1793308651/content/` (`hero-directo-v7.html`, `servicios-v3.html`). El orden de la home está en `11420-1793310203/content/home-orden.html`. **(decisión de Claude)**
- **$4.99 y $10.62:** son cifras ilustrativas fijas del ejemplo de Kevin; no corresponden a ningún módulo del catálogo. **No se calculan sumando:** en el catálogo el IVA se aplica sobre el total, así que la suma de dos precios con IVA puede diferir en un centavo (el brochure da Comercio + Restaurante = $28.22, no $22.58 + $5.63 = $28.21). El ejemplo se escribe completo como texto ilustrativo. **(decisión de Claude)**
- **Paso 3 de «Cómo trabajamos»:** se publica. «Entrega por etapas» habla de cómo se entrega, no de cómo se cobra. Además figura entre las fortalezas de consultora de la regla de posicionamiento.
- **WhatsApp:** el mensaje precargado deja de decir «Apex ERP» y pasa a ser genérico. El CTA «Cuéntanos tu proyecto» de `/desarrollo` abre WhatsApp con su propio mensaje (empresa que necesita un desarrollo). El CTA del menú (`getSignupHref`) se reemplaza por WhatsApp, como el hero. **(decisión de Claude)**
- **Menú:** Factura → `/#facturacion`, ERP → `/#modulos`, Restaurantes → `/restaurantes`, Desarrollo → `/desarrollo`, Precios → `/#precios`. Se usan rutas absolutas para que funcione desde `/desarrollo`, y el mismo `Header` sirve en las dos páginas. **(decisión de Claude)**
- **SEO:** `/desarrollo` y `/restaurantes` tienen su propio `metadata` (title, description, OG) y entran al sitemap si existe. El copy SEO lo redacta el builder dentro de las reglas de contenido. La keyword «POS restaurante» **se queda**, pero se mueve de la home a `/restaurantes` (Kevin, 29-oct).
- **RestaurantFlow:** sale de la home y **se muda a `/restaurantes`**, con sus dos capturas (`public/screenshots/comandas_{light,dark}.webp`). No se borra.
- **`ContactForm.tsx:127`:** sale «Sin instalación» y **queda «sin compromiso»**, que es real (Kevin, 29-oct).

## Lo que queda al builder

- El texto final de ProblemSolution, DteSection y Modules dentro de las reglas.
- La ubicación exacta del bloque «cómo crece tu mensualidad».
- El layout del bloque de desarrollo en la home.
- Agregar `.superpowers/` a `.gitignore`.
