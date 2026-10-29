# Landing de Apex como consultora: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que apexcodelabs.com presente a Apex como consultora. La home entra por Apex Factura, con Apex ERP como el paso siguiente. Se agregan dos páginas nuevas: `/restaurantes` (Apex Restaurante) y `/desarrollo`.

**Architecture:** Next 16 App Router con páginas estáticas. Las páginas nuevas son `app/<ruta>/page.tsx` con su propio `metadata` y reutilizan `Header`, `Footer` y `WhatsAppFloat`. Precios y textos fijos viven en `lib/` y no se escriben a mano en los componentes. Las reglas de contenido se hacen cumplir con un test que recorre el código fuente.

**Tech Stack:** Next 16, React 19, Tailwind 3, lucide-react, `node --test` (Node 24, sin dependencias nuevas).

**Spec:** `docs/superpowers/specs/2026-10-29-landing-consultora-design.md`. Lee el spec entero antes de empezar: el texto exacto de hero y `/desarrollo` está ahí y manda sobre los mockups.

## Global Constraints

- **Todo en tuteo, nada de voseo:** «Escríbenos», «pagas», «necesitas».
- **Nunca** aparecen: «sin costo de instalación», «sin costo de implementación» ni «sin instalación».
- **Nunca** aparecen: forma de cobro (ni «por hitos»), stack tecnológico, ni el nombre, las capturas o una descripción del cliente del desarrollo de restaurantes.
- **Sin comparaciones** con nadie, tampoco en tablas, y sin «el único».
- **Sí se dice:** «no pagas nada por el desarrollo; se suma a tu mensualidad cuando empiezas a usarlo».
- **Precios publicados = lo que se cobra**, con el IVA truncado a 2 decimales. Ningún precio se calcula sumando precios que ya traen IVA.
- **Node:** no está en el PATH. Se usa `~/.nvm/versions/node/v24.14.1/bin/node` (y su `npx`). Cada comando de abajo lo antepone como `$NODE`/`$NPX`:
  - `NODE=~/.nvm/versions/node/v24.14.1/bin/node`
  - `NPX=~/.nvm/versions/node/v24.14.1/bin/npx`
- **No correr `next build`** ni hacer deploy. Para verificar se usan `tsc`, `eslint`, `node --test` y `next dev` con el navegador.
- Commits en conventional commits, **sin** «Co-Authored-By» ni atribución de IA.
- **No hacer push ni abrir el PR** sin que Kevin lo pida.

## Review Focus

1. **El mensaje de WhatsApp se puede pisar con una variable de entorno.** Si `NEXT_PUBLIC_WA_MSG` está definida en el build de Cloudflare, el sitio seguiría diciendo «Apex ERP» en todas las páginas. Lo esperable es que cada página use su propio mensaje. Por eso la Task 1 elimina esa variable y prueba que el mensaje ya no la lee.
2. **Navegar desde `/desarrollo` o `/restaurantes`.** «Precios» tiene que llevar a la sección de precios de la home, y el logo a `/`. Un `href="#..."` relativo no lleva a ningún lado. La Task 2 lo prueba en el test de contenido, que rechaza cualquier `href="#` en el Header y el Footer.
3. **Modo oscuro y móvil en las dos páginas nuevas.** Lo esperable es que se vean igual de bien que la home. La Task 7 revisa las 3 páginas en 375 px y en 1280 px, en claro y oscuro.
4. **El menú móvil con 5 entradas más WhatsApp.** Tiene que cerrarse al tocar cualquier entrada, también la que lleva a otra página. Se prueba en el navegador en la Task 7.
5. **El FAQ que ve Google (`generateFAQSchema`).** Sale de `FAQS`, así que si en el JSON-LD sigue apareciendo $56.50 o $33.90, algo quedó mal. El test de la Task 1 recorre `lib/faqs.ts`.

---

### Task 0: Rama y arnés de tests

**Files:**
- Modify: `.gitignore` (al final)
- Modify: `package.json` (`scripts`)
- Create: `tests/content-rules.mjs`, `tests/content-rules.test.mjs`

**Interfaces:**
- Produces:
  - `findViolations(text: string): string[]` en `tests/content-rules.mjs`. Devuelve una entrada por cada regla rota, con el patrón y la palabra encontrada.
  - `sourceFiles(): string[]`, que devuelve los `.ts`/`.tsx` de `app/`, `components/` y `lib/`.
  - El script `npm test`, que corre `node --test tests/`.

- [ ] **Step 1: Crear la rama.** Correr `git switch -c feat/landing-consultora` sobre `main` (hoy en f86b0a3). Si existe la rama local `chore/next-16`, borrarla con `git branch -d chore/next-16`. Con `-d` y nunca con `-D`: si se niega a borrarla, avisar en vez de forzar.
- [ ] **Step 2: Ignorar el brainstorming.** Agregar `.superpowers/` al final de `.gitignore`.
- [ ] **Step 3: Escribir el test que falla** en `tests/content-rules.test.mjs`. Son dos casos:
  - `findViolations` marca cada muestra mala y deja pasar la buena:
    - Malas: `'Escribinos hoy'`, `'si tenés dudas'`, `'Sin instalación y sin compromiso'`, `'sin costo de implementación'`, `'cobramos por hitos'`, `'somos el único'`, `'Café Fulanos'`, `'hecho en Laravel'`.
    - Buena: `'Escríbenos, no pagas nada por el desarrollo. Más después.'`, que debe devolver `[]`.
  - `ningún archivo fuente rompe las reglas`: para cada archivo de `sourceFiles()`, `findViolations(readFileSync(f,'utf8'))` debe ser `[]`. El mensaje del assert incluye la ruta del archivo.
- [ ] **Step 4: Implementar `tests/content-rules.mjs`.** Las reglas son regex con `i` y `u`, y la palabra va entre límites `(?<![\p{L}])…(?![\p{L}])`, porque `\b` no reconoce letras acentuadas.
  - Voseo: `tenés|querés|podés|sabés|pagás|necesitás|sumás|empezás|vendés|usás|cobrás|facturás|escribinos|contanos|decinos|mirá|elegí|probá|agendá|descargá|registrate|sos`.
  - Cobro: `sin instalación`, `sin costo de (instalación|implementación)`, `por hitos`.
  - Comparaciones: `el único`, `la única`.
  - Cliente: `fulanos`.
  - Stack: `laravel|postgres|railway|cloudflare`.
  - `sourceFiles` recorre con `readdirSync(dir, { recursive: true })`.
- [ ] **Step 5: Agregar el script.** En `package.json`, dentro de `scripts`: `"test": "node --test tests/"`.
- [ ] **Step 6: Correr y verificar el rojo.** `PATH=$(dirname $NODE):$PATH npm test`. Lo esperado: el primer caso pasa y el segundo falla nombrando `components/ContactForm.tsx` («Sin instalación»). Ese rojo prueba que el arnés sabe fallar. Queda rojo hasta la Task 3.
- [ ] **Step 7: Commit.** `git add .gitignore package.json tests docs/superpowers` y luego `git commit -m "test: guardia de reglas de contenido de la landing"`. El commit incluye el spec y este plan.

### Task 1: Catálogo, FAQ y WhatsApp en `lib/`

**Files:**
- Modify: `lib/pricing.ts`, `lib/faqs.ts:15,20`, `lib/contact.ts`
- Test: `tests/catalog.test.mjs`

**Interfaces:**
- Produces:
  - `Vertical` gana `price: string` y `href?: string`.
  - `ENTRY_PRICE: string`, igual a `PRICING_GROUPS[0].plans[0].monthly`.
  - `RESTAURANT_FROM = '$28.22'`.
  - `waLink(message?: string): string`.
  - Los mensajes `WA_MESSAGE`, `WA_MESSAGE_DEV` y `WA_MESSAGE_RESTAURANT`.

- [ ] **Step 1: Escribir el test que falla** en `tests/catalog.test.mjs`. Importa `../lib/pricing.ts`, `../lib/faqs.ts` y `../lib/contact.ts`. Tiene cinco casos:
  - `precios de verticales`: los pares `name → price` son, exactamente:
    - Restaurante `'+$5.63/mes'`, Farmacia `'+$5.63/mes'`, Turismo `'+$5.63/mes'` y Gimnasio `'+$5.63/mes'`.
    - Proyectos y talleres `'+$56.48/mes'`.
    - Servicios `'+$4.50/mes'`.
  - `solo Restaurante enlaza`: el `href` de Restaurante es `'/restaurantes'` y ningún otro vertical tiene `href`.
  - `precios de entrada`: `ENTRY_PRICE === '$5.63'` y `RESTAURANT_FROM === '$28.22'`.
  - `FAQ sin precios de servicios`: ninguna `answer` de `FAQS` contiene `'$56.50'` ni `'$33.90'`.
  - `WhatsApp`:
    - `waLink()` contiene `encodeURIComponent(WA_MESSAGE)`.
    - `waLink(WA_MESSAGE_DEV)` contiene el mensaje de desarrollo.
    - `WA_MESSAGE` no contiene `'Apex ERP'`.
    - `lib/contact.ts`, leído como texto, no contiene `NEXT_PUBLIC_WA_MSG`.
- [ ] **Step 2: Correr y verificar que falla.** `$NODE --test tests/catalog.test.mjs`. Lo esperado: FAIL, porque no existen `price` ni `ENTRY_PRICE`.
- [ ] **Step 3: Implementar.**
  - `lib/pricing.ts`:
    - Agregar `price` y `href` según el test.
    - El `scope` de Gimnasio queda «Sobre cualquier plan ERP».
    - Agregar `ENTRY_PRICE` derivado del Esencial y `RESTAURANT_FROM`, con el comentario `// Comercio + Restaurante según el brochure 2026-10; el IVA va sobre el total, no se suma`.
  - `lib/faqs.ts:15`: «Sí. Si quieres conservar el historial de tu sistema anterior, lo vemos al cotizar: revisamos qué datos traes y te decimos si aplica la migración.»
  - `lib/faqs.ts:20`: «El certificado digital para firmar DTEs se gestiona con el MH. Si prefieres que te acompañemos en el trámite, lo vemos al cotizar.»
  - `lib/faqs.ts:4` (FAQ 1): «Apex ERP genera» pasa a «Apex genera», porque la entrada es Factura.
  - `lib/contact.ts`:
    - `WA_MESSAGE = 'Hola Apex Code Labs, quiero información.'`.
    - `WA_MESSAGE_DEV = 'Hola Apex Code Labs, mi empresa necesita un desarrollo y quiero contarles el proyecto.'`.
    - `WA_MESSAGE_RESTAURANT = 'Hola Apex Code Labs, quiero información sobre Apex Restaurante.'`.
    - `waLink(message = WA_MESSAGE)`.
    - Se quita la lectura de `NEXT_PUBLIC_WA_MSG`; `NEXT_PUBLIC_WA_NUMBER` se queda.
    - En `README.md:89`, quitar `NEXT_PUBLIC_WA_MSG` de la tabla.
- [ ] **Step 4: Correr y verificar que pasa.** `$NODE --test tests/catalog.test.mjs`. Lo esperado: PASS (5/5).
- [ ] **Step 5: Commit.** `git add tests/catalog.test.mjs README.md` y luego `git commit -am "feat: precios desde de verticales y mensajes de WhatsApp por página"`.

### Task 2: Shell compartido (Header, Footer y logo)

**Files:**
- Modify: `components/Header.tsx`, `components/Footer.tsx`
- Test: `tests/content-rules.test.mjs`, donde se agrega el caso del paso 1

**Interfaces:**
- Consumes: `waLink()` de la Task 1.
- Produces: el `Header` y el `Footer` que montan las tres páginas, sin props.

- [ ] **Step 1: Agregar el test que falla.** Caso `enlaces del shell son absolutos`: en el texto de `components/Header.tsx` y de `components/Footer.tsx` no hay ninguna coincidencia de `href="#` ni de `href: '#`. El Header contiene `'/restaurantes'` y `'/desarrollo'`.
- [ ] **Step 2: Verificar que falla.** `$NODE --test tests/content-rules.test.mjs`. Lo esperado: FAIL en el caso nuevo.
- [ ] **Step 3: Implementar.**
  - `NAV`: Factura `/#facturacion`, ERP `/#modulos`, Restaurantes `/restaurantes`, Desarrollo `/desarrollo` y Precios `/#precios`. FAQ sale del menú (decisión del plan: el spec define 5 entradas).
  - El logo enlaza a `/`.
  - El CTA del desktop y el del móvil pasan a ser `<a href={waLink()} target="_blank" rel="noopener noreferrer">` con el texto «Escríbenos por WhatsApp» (en móvil, «WhatsApp» si no cabe). Se quita el import de `lib/cta`.
  - Footer:
    - Columna «Producto»: los mismos 5 destinos absolutos.
    - Texto de la marca: «Apex Code Labs: facturación electrónica, Apex ERP y desarrollo a la medida para empresas en El Salvador.»
    - El enlace al brochure se queda.
- [ ] **Step 4: Verificar que pasa** el caso nuevo (`$NODE --test tests/content-rules.test.mjs`). El caso del repo sigue rojo solo por `ContactForm.tsx`.
- [ ] **Step 5: Commit.** `git commit -am "feat: menú con rutas absolutas y WhatsApp como acción principal"`.

### Task 3: La home

**Files:**
- Modify: `app/page.tsx`, `components/Hero.tsx`, `components/ProblemSolution.tsx`, `components/Modules.tsx`, `components/Pricing.tsx` y `components/ContactForm.tsx:127`
- Create: `components/DevTeaser.tsx`, `components/GrowthExample.tsx`
- Delete: `components/Comparison.tsx`, `lib/cta.ts`
- Test: `tests/home.test.mjs`

**Interfaces:**
- Consumes: `ENTRY_PRICE`, `VERTICALES` (con `price` y `href`) y `waLink()`.
- Produces:
  - `DevTeaser()`, sin props, que enlaza a `/desarrollo`.
  - `GrowthExample()`, sin props.

- [ ] **Step 1: Escribir el test que falla** en `tests/home.test.mjs`. Lee los archivos como texto y colapsa los espacios con `.replace(/\s+/g,' ')`. El texto fijo va siempre en un solo literal o nodo de texto JSX, nunca partido con `{' '}`.
  - `orden de la home`: en `app/page.tsx`, las posiciones de `<Hero`, `<ProblemSolution`, `<DteSection`, `<Modules`, `<Pricing`, `<DevTeaser`, `<FAQ` y `<ContactForm` son estrictamente crecientes, y no aparecen `Comparison` ni `RestaurantFlow`.
  - `Comparison borrado`: `existsSync('components/Comparison.tsx') === false` y `existsSync('lib/cta.ts') === false`.
  - `hero fijado`: `components/Hero.tsx` contiene:
    - «Un sistema que funciona desde el primer día, y se adapta a cómo trabaja tu negocio.»
    - «no pagas nada por el desarrollo».
    - «Escríbenos por WhatsApp».
    - `ENTRY_PRICE`.
    - Y no contiene `'$5.63'` escrito a mano.
  - `ejemplo de mensualidad`: `components/GrowthExample.tsx` contiene `'$5.63'`, `'$4.99'`, `'$10.62'` y «Ejemplo ilustrativo.». Es texto escrito completo a propósito (spec, decisiones: no se suma).
  - `verticales con precio`: `components/Pricing.tsx` contiene `price`, `href`, «desde» y «sobre tu plan», y no contiene «te lo cotizamos».
- [ ] **Step 2: Verificar que falla.** `$NODE --test tests/home.test.mjs`. Lo esperado: FAIL.
- [ ] **Step 3: Implementar.** El texto exacto sale del spec (secciones «Hero» y «Home: orden aprobado»).
  - `app/page.tsx`: el orden del test. Se quitan los imports borrados y se monta `GrowthExample` dentro de `Pricing` (decisión del plan: justo después de los planes de Factura y ERP, antes de los verticales).
  - `Hero.tsx`:
    - Antetítulo, título, bajada y los dos datos del spec. «Desde {ENTRY_PRICE}/mes · IVA incluido, sin permanencia».
    - CTA principal a `waLink()` y secundario «Ver precios» a `#precios`.
    - La captura del POS se queda.
  - `ProblemSolution.tsx`: se quita la tarjeta «Restaurantes y cafés» de `AUDIENCES` y se acorta el bloque superior para no repetir el hero. El texto final lo decide el builder dentro de las reglas.
  - `Modules.tsx`: el encabezado presenta a Apex ERP como el paso siguiente («cuando tu negocio crece, sumas inventario, caja y comandas sin cambiar de sistema»). La grilla se queda.
  - `Pricing.tsx`:
    - Cada vertical muestra «desde {price} sobre tu plan» junto al `scope`. Si tiene `href`, el nombre es un enlace.
    - El párrafo «Su precio depende… te lo cotizamos» pasa a decir que es un adicional mensual que se suma a tu plan.
    - Los botones de los planes pasan de `getSignupHref` a `waLink()`, con el texto «Escríbenos por WhatsApp». Decisión del plan: el formulario no funciona en prod mientras falte el token, y WhatsApp es el canal real de los clientes.
  - `DevTeaser.tsx`: el título «También desarrollamos para otras empresas», una línea de bajada y un enlace «Conoce cómo trabajamos» a `/desarrollo`. El layout lo decide el builder.
  - `ContactForm.tsx:127`: «…y resolvemos todas tus dudas, sin compromiso.»
  - Borrar `components/Comparison.tsx` y `lib/cta.ts`. Confirmar con `grep -rn "lib/cta\|Comparison" app components lib` que no queda nada.
- [ ] **Step 4: Verificar que pasa.** `PATH=$(dirname $NODE):$PATH npm test`. Lo esperado: todo PASS, incluida la guardia del repo, que se pone verde ahora.
- [ ] **Step 5: Commit.** `git add -A components app lib tests` y luego `git commit -m "feat: home entra por Apex Factura y suma el bloque de desarrollo"`.

### Task 4: Página `/restaurantes` (Apex Restaurante)

**Files:**
- Create: `app/restaurantes/page.tsx`
- Modify: `components/RestaurantFlow.tsx`, para quitarle `id="restaurantes"`
- Test: `tests/pages.test.mjs`

**Interfaces:**
- Consumes: `RESTAURANT_FROM`, `waLink(WA_MESSAGE_RESTAURANT)`, `Header`, `Footer`, `WhatsAppFloat` y `RestaurantFlow`.

- [ ] **Step 1: Escribir el test que falla** en `tests/pages.test.mjs`. En `app/restaurantes/page.tsx`, con los espacios colapsados:
  - Exporta `metadata`.
  - Contiene `'POS'` y `'restaurante'` en `title` o `keywords`.
  - Contiene `RESTAURANT_FROM`, `WA_MESSAGE_RESTAURANT` y `<RestaurantFlow`.
  - Contiene las palabras comandas, mesas, KDS, recetas y «corte Z».
- [ ] **Step 2: Verificar que falla.** `$NODE --test tests/pages.test.mjs`. Lo esperado: FAIL, porque el archivo no existe.
- [ ] **Step 3: Implementar.**
  - `metadata`:
    - `title`: «Apex Restaurante — POS para restaurantes con facturación electrónica en El Salvador».
    - `description` dentro de las reglas, con «desde {RESTAURANT_FROM}/mes».
    - `keywords`: incluye «POS restaurante» y «comandas».
    - `alternates.canonical`: `'/restaurantes'`.
    - `openGraph.url`.
  - La página: `Header`, un hero corto («Apex Restaurante»: el mismo Apex ERP con el paquete Restaurante, desde {RESTAURANT_FROM}/mes con IVA), la lista de módulos del spec, `<RestaurantFlow />`, un CTA a WhatsApp con `WA_MESSAGE_RESTAURANT`, `Footer` y `WhatsAppFloat`.
  - Prohibido nombrar o describir a ningún cliente.
- [ ] **Step 4: Verificar que pasa.** `PATH=$(dirname $NODE):$PATH npm test`. Lo esperado: todo PASS.
- [ ] **Step 5: Commit.** `git add app/restaurantes components/RestaurantFlow.tsx tests` y luego `git commit -m "feat: página Apex Restaurante"`.

### Task 5: Página `/desarrollo`

**Files:**
- Create: `app/desarrollo/page.tsx`
- Test: `tests/pages.test.mjs`, donde se agrega el caso del paso 1

**Interfaces:**
- Consumes: `waLink(WA_MESSAGE_DEV)`, `Header`, `Footer` y `WhatsAppFloat`.

- [ ] **Step 1: Agregar el test que falla.** `app/desarrollo/page.tsx` exporta `metadata` y contiene:
  - El título del spec, «Construimos el sistema que tu empresa va a vender o a usar, con la tecnología que elijas.»
  - «Cuéntanos tu proyecto», `WA_MESSAGE_DEV`, «Lo que construimos» y «Cómo trabajamos».
  - Las cadenas de los tres pasos del spec.
  - `const CASES` junto con un render condicionado a `CASES.length`.
- [ ] **Step 2: Verificar que falla.** `$NODE --test tests/pages.test.mjs`. Lo esperado: FAIL en el caso nuevo.
- [ ] **Step 3: Implementar.**
  - El texto, tal cual la sección «Página `/desarrollo`» del spec.
  - El lugar reservado para casos: `const CASES: { name: string; logo: string; summary: string }[] = []`, con la sección envuelta en `{CASES.length > 0 && …}`. Lleva el comentario `// ponytail: sin casos publicables todavía; se llena cuando haya partners que se puedan mostrar`.
  - `metadata`:
    - `title` «Desarrollo de software para empresas — Apex Code Labs».
    - `description` dentro de las reglas: sin stack y sin forma de cobro.
    - `alternates.canonical` `'/desarrollo'`.
- [ ] **Step 4: Verificar que pasa.** `PATH=$(dirname $NODE):$PATH npm test`. Lo esperado: todo PASS.
- [ ] **Step 5: Commit.** `git add app/desarrollo tests` y luego `git commit -m "feat: página de desarrollo para empresas"`.

### Task 6: SEO de la home

**Files:**
- Modify: `app/layout.tsx:21-38`, `lib/schema.ts`
- Test: `tests/pages.test.mjs`, donde se agrega el caso del paso 1

- [ ] **Step 1: Agregar el test que falla.**
  - `app/layout.tsx` no contiene «POS restaurante».
  - `lib/schema.ts` no contiene «comandas» en las descripciones de Organization ni de WebSite, y sí contiene «facturación electrónica».
- [ ] **Step 2: Verificar que falla.** Correr `$NODE --test tests/pages.test.mjs`.
- [ ] **Step 3: Implementar.** Reescribir el `title`, la `description`, las `keywords` y el `openGraph` de la home: la entrada es por Apex Factura, Apex ERP es el paso siguiente y Apex Code Labs también desarrolla. Alinear las descripciones de `lib/schema.ts`. `SoftwareApplication` se queda con `lowPrice` y `highPrice`. Decisión del plan: no se crea `app/sitemap.ts`, porque hoy no existe un sitemap y el spec lo pide solo «si existe».
- [ ] **Step 4: Verificar que pasa.** `PATH=$(dirname $NODE):$PATH npm test`.
- [ ] **Step 5: Commit.** `git commit -am "feat: SEO de la home alineado a la consultora"`.

### Task 7: Verificación final

- [ ] **Step 1: Tipos y lint.** Correr `$NPX tsc --noEmit; echo "tsc=$?"` y `PATH=$(dirname $NODE):$PATH npm run lint; echo "lint=$?"`. Lo esperado: los dos en `0`. Nunca encadenar con `| tail`: el exit code tiene que ser el del comando.
- [ ] **Step 2: Tests.** `PATH=$(dirname $NODE):$PATH npm test; echo "test=$?"`. Lo esperado: `test=0`, y la salida muestra `fail 0` con más de 0 tests.
- [ ] **Step 3: Navegador.** Levantar `npm run dev` en segundo plano. Con Playwright, abrir `/`, `/restaurantes` y `/desarrollo` en 375 px y en 1280 px, en tema claro y oscuro:
  - Tomar una captura de cada combinación.
  - Clicar cada entrada del menú desde `/desarrollo` y confirmar que llega a su destino.
  - Confirmar que el menú móvil se cierra.
  - Leer el `href` del botón de WhatsApp en cada página y confirmar que lleva su mensaje.
  - Revisar que la consola no tenga errores.
- [ ] **Step 4: Limpiar.** Matar el `next dev` que levantaste y confirmar con `lsof -i :3000` que no queda nada escuchando.
- [ ] **Step 5: Reportar a Kevin** las capturas y el resultado de cada paso. No hacer push ni abrir el PR sin su pedido.
