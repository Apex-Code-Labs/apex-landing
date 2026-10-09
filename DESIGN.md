---
name: Apex ERP
description: Landing de producto de Apex ERP — POS, inventario y facturación electrónica DTE para PYMES de El Salvador.
colors:
  galactic-cruise: "#121C8C"
  galactic-cruise-deep: "#0E1670"
  galactic-cruise-wash: "#EBEDFA"
  galactic-cruise-line: "#D3D7F4"
  navy: "#0A0F3D"
  turquoise-topaz: "#13C6AB"
  turquoise-topaz-ink: "#0C7F6E"
  turquoise-topaz-wash: "#E7FAF6"
  teal-deer: "#96E5AC"
  paper: "#FFFFFF"
  counter: "#F9FAFB"
  rule: "#E5E7EB"
  ink-muted: "#4B5563"
  ink: "#374151"
  night: "#030712"
  night-raised: "#111827"
typography:
  display:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  lede:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  price:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.1
    fontFeature: "tnum"
rounded:
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  section-sm: "64px"
  section-lg: "96px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.galactic-cruise}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.galactic-cruise-deep}"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.galactic-cruise}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.galactic-cruise}"
    textColor: "{colors.paper}"
  button-accent:
    backgroundColor: "{colors.turquoise-topaz}"
    textColor: "{colors.galactic-cruise}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  chip-selected:
    backgroundColor: "{colors.galactic-cruise}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  card-price:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: Apex ERP

## Overview

**Creative North Star: "El Mostrador"**

Apex ERP se diseña como el mostrador de una PYME salvadoreña: un lugar de trabajo
diario, práctico y cercano, donde todo está a la vista y nada sobra. Se habla
directo y sin jerga. La interfaz no presume tecnología. Muestra el producto real
(capturas del POS y de comandas) y lo ordena para que el dueño del negocio entienda
en segundos qué resuelve y cuánto cuesta.

La estructura la dan las **líneas, no las cajas**. Las secciones se apoyan en
divisores finos y en cambios de fondo: blanco, el gris «mostrador» y el navy para
el momento fiscal. Los títulos son grandes y seguros, alineados a la izquierda, con
la bajada al costado como quien explica de frente. El color de marca aparece con
intención: Galactic Cruise para la voz y la acción, Turquoise Topaz para el dato
que importa.

Se rechaza explícitamente el look de plantilla SaaS: hero centrado con badge y tres
íconos, etiquetas en mayúsculas sobre cada título, texto con gradiente y grillas de
tarjetas idénticas de ícono + título + texto.

**Key Characteristics:**
- Plano por defecto: profundidad por fondo y divisor, no por sombra.
- Títulos alineados a la izquierda con la bajada a la derecha en desktop.
- El producto real es la imagen; no hay ilustraciones decorativas.
- Modo claro y oscuro de primera clase, con toggle manual.
- Español neutro con tuteo, directo y sin jerga.

## Colors

Una marca de dos voces —un azul profundo que habla y un turquesa que confirma— sobre
neutrales grises de mostrador.

### Primary
- **Galactic Cruise** (`galactic-cruise`): la voz de la marca. Títulos en modo claro,
  botón primario, chip seleccionado, links y el bloque de integración. Su variante
  profunda (`galactic-cruise-deep`) es el hover del botón; `galactic-cruise-wash` es
  el fondo del hero y `galactic-cruise-line` es su divisor.
- **Navy** (`navy`): el fondo de los momentos fiscales y de cierre, es decir, la
  sección DTE, el encabezado de la tabla comparativa y el footer. Igualado al fondo
  del lockup oficial.

### Secondary
- **Turquoise Topaz** (`turquoise-topaz`): el «sello de transmitido». Íconos sobre
  navy, el anillo del plan recomendado, el anillo de foco y el inicio del gradiente
  del botón de acento. Como texto sobre fondos claros se usa sólo su tinta
  (`turquoise-topaz-ink`): en el acento del H1, los íconos de listas, los checks y
  la etiqueta «Paso N».
- **Teal Deer** (`teal-deer`): el destello. Sirve para los códigos de DTE sobre
  navy, las flechas del flujo de integración, el hover de los links del footer y el
  final del gradiente de acento.

### Neutral
- **Paper** (`paper`): fondo base en modo claro.
- **Counter** (`counter`): el gris del mostrador. Alterna con Paper para dar ritmo
  a las secciones (Módulos, Precios, Contacto).
- **Rule** (`rule`): todos los divisores finos y bordes de tarjeta.
- **Ink** (`ink`) e **Ink Muted** (`ink-muted`): el texto de cuerpo y la bajada o el
  texto secundario.
- **Night** (`night`) y **Night Raised** (`night-raised`): el fondo y la superficie
  elevada en modo oscuro, donde los títulos pasan a blanco.

### Named Rules
**The Sello Rule.** Turquoise Topaz y Teal Deer nunca son texto sobre blanco ni
fondo de texto blanco (no pasan AA). En fondos claros, el turquesa se escribe con su
tinta `turquoise-topaz-ink`; en navy y en modo oscuro va puro.

**The Two Voices Rule.** El azul habla (títulos, acción) y el turquesa confirma
(dato, check, sello). No se intercambian los roles ni se introduce un tercer color
de marca.

## Typography

**Display Font:** Poppins (con system-ui, sans-serif)
**Body Font:** Poppins (con system-ui, sans-serif)

**Character:** Una sola familia geométrica en todo el rango. El contraste lo pone el
peso: 800 en display, 700 en títulos, 400 en el cuerpo. Es directa y amable, como un
rótulo bien pintado.

### Hierarchy
- **Display** (800, de 2.5rem a 4.5rem, line-height 1.05, tracking −0.025em): sólo el
  H1 del hero. Una frase del producto, con el acento en `turquoise-topaz-ink`.
- **Headline** (700, de 1.875rem a 2.75rem, line-height 1.1): los títulos de sección,
  alineados a la izquierda.
- **Title** (700, 1.125rem): ítems de lista, pasos, preguntas de la FAQ y nombres de
  plan.
- **Lede** (400, 1.125rem, line-height 1.625): la bajada de cada sección, en
  `ink-muted`, en la columna derecha en desktop.
- **Body** (400, 1rem, line-height 1.625): texto de ítems y respuestas. En listas se
  baja a 0.875rem.
- **Label** (600, 0.875rem): botones, chips y la etiqueta «Paso N».
- **Price** (800, 2.25rem, cifras tabulares): los precios. Nunca se alinean con
  cifras proporcionales.

### Named Rules
**The No Kicker Rule.** No hay etiquetas en mayúsculas sobre los títulos. El título
carga su propio peso.

**The Solid Emphasis Rule.** El énfasis es por peso, tamaño o color sólido. Nunca se
usa texto con gradiente.

## Layout

El contenedor tiene un máximo de 1280px, con gutters de 16px, 24px y 32px según el
breakpoint (sm 640px y lg 1024px). Las secciones respiran con 64px de padding
vertical en mobile y 96px desde md.

La firma estructural es la **cabecera dividida**: en una grilla de 12 columnas
(desde lg) el título ocupa las columnas 1–6 y la bajada las 8–12, alineadas por
abajo. En mobile se apilan. El hero repite la misma lógica con el H1 en 7 columnas
y la bajada con los CTA en 5. La FAQ y el contacto usan 4/8 y 5/7: la columna
izquierda explica y la derecha trabaja; en el contacto la izquierda es sticky.

El contenido repetido va en **listas con divisor**, no en tarjetas:

- un índice de 3 columnas para los módulos;
- 4 columnas con divisor vertical para las audiencias;
- una línea de tiempo con trazo superior para los pasos.

El espacio es generoso entre grupos y ajustado dentro de cada uno.

### Named Rules
**The Lines Not Boxes Rule.** Si el contenido es una enumeración, va como lista
separada por divisores `rule`. La tarjeta se reserva para lo que se compara o se
elige (planes de precio) y para el formulario.

## Elevation & Depth

El sistema es plano. La profundidad la dan el cambio de fondo (Paper → Counter →
Navy) y el divisor de 1px. Hay muy pocas sombras, y cada una tiene un trabajo:

- la captura del producto en el hero se levanta sobre su fondo con una sombra
  ascendente teñida de azul;
- los botones tienen una sombra media que crece al hover;
- el botón flotante de WhatsApp lleva una sombra difusa para separarse del
  contenido.

En modo oscuro la sombra de la captura desaparece.

### Shadow Vocabulary
- **Product lift** (`box-shadow: 0 -12px 48px -12px rgba(18,28,140,0.18)`): sólo el
  marco de la captura del hero.
- **Button rest / hover** (Tailwind `shadow-md` → `shadow-lg`): botones primario y de
  acento.
- **Float** (`box-shadow: 0 6px 20px -4px rgba(0,0,0,0.3)`): el botón flotante de
  WhatsApp.

### Named Rules
**The Flat Counter Rule.** Una superficie nueva no lleva sombra salvo que sea el
producto, una acción o algo flotante. Si no es ninguna de las tres, se separa con
fondo o divisor.

## Shapes

Las esquinas son suaves y consistentes:

- **8px:** controles (botones e inputs).
- **12px:** avisos.
- **16px:** contenedores (tarjeta de precio, bloque de integración, tabla
  comparativa y marco de la captura, que sólo redondea arriba porque «sale» del
  hero).
- **Píldora:** chips de filtro, la etiqueta «Recomendado» y los pasos del flujo de
  integración.

Los bordes son de 1px en `rule`. El único trazo de 2px es la línea de tiempo de los
pasos, con su segmento turquesa de 48px.

## Components

### Buttons
Son seguros y concretos; nombran la acción.
- **Shape:** esquina suave (8px).
- **Primary:** Galactic Cruise con texto blanco, peso 600, padding de 12px × 24px
  (16px × 28px en el hero). Si lleva flecha, esta se desplaza 2px al hover.
- **Hover / Focus:** el fondo pasa a `galactic-cruise-deep` y la sombra crece. El
  foco es un anillo de 2px en turquesa con 2px de separación.
- **Outline:** borde de 2px en Galactic Cruise y texto azul; al hover se rellena de
  azul. En modo oscuro, borde y texto son blancos.
- **Accent:** gradiente 135° de Turquoise Topaz a Teal Deer con texto Galactic
  Cruise, peso 700. Se usa sólo en el CTA del plan recomendado.
- **Etiqueta del CTA:** sigue al destino. Dice «Agenda tu demo» mientras no haya
  signup público y «Prueba gratis» cuando lo haya.

### Chips
- **Style:** píldora con padding de 10px × 20px y peso 600 en 0.875rem. La no
  seleccionada es blanca con borde `rule`; la seleccionada es Galactic Cruise con
  texto blanco.
- **State:** se usa en el selector de grupo de precios con `aria-pressed`. Al hover,
  el borde de la no seleccionada pasa a azul.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Paper, o Night Raised en modo oscuro.
- **Shadow Strategy:** `shadow-sm` en reposo y `shadow-md` al hover. Es la única
  superficie elevada en reposo.
- **Border:** 1px `rule`. El plan recomendado suma un anillo de 2px en Turquoise
  Topaz y la píldora «Recomendado» con el gradiente de acento.
- **Internal Padding:** 24px (32px en el formulario desde md).

### Inputs / Fields
- **Style:** borde de 1px gris (`#D1D5DB`), esquina de 8px, padding de 12px × 16px,
  fondo blanco (gris oscuro en modo oscuro).
- **Focus:** anillo de 2px en Galactic Cruise y el borde se vuelve transparente.
- **Error / Success:** un aviso de bloque en rojo o verde suave con borde de 1px.
  Envío deshabilitado con 50% de opacidad.

### Navigation
- **Style:** header fijo blanco al 95% con backdrop-blur y divisor inferior. Mide
  64px de alto y 80px desde md. Los links van en peso 500 y `ink`; al hover pasan a
  azul (turquesa en modo oscuro). A la derecha están el toggle de tema y el CTA
  primario.
- **Mobile:** menú hamburguesa que despliega los links apilados y el CTA a lo ancho.
- Los anclajes compensan el header con un `scroll-margin-top` de 80px.

### Divider List (Signature Component)
Es la firma de «El Mostrador»: un ícono Lucide de 20–24px en
`turquoise-topaz-ink`, un título (Title) y un cuerpo (0.875rem, `ink-muted`),
separados del siguiente ítem por un divisor `rule`. No llevan fondo, borde de caja
ni sombra. Se usa en módulos, audiencias, capacidades DTE y la FAQ (con
`<details>` nativo y un chevron que rota 180°).

### Integration Flow (Signature Component)
Es un bloque Galactic Cruise de 16px de radio. Lleva un título blanco, una bajada en
`galactic-cruise-line` y una secuencia de píldoras unidas por flechas Teal Deer: la
primera en Teal Deer sólido y el resto en blanco al 10%. Expresa el principio
«un dato, un paso».

## Do's and Don'ts

### Do:
- **Do** alinear los títulos de sección a la izquierda con la cabecera dividida
  (título en 6 columnas y bajada en 5 desde lg).
- **Do** listar con divisores de 1px `rule` y reservar la tarjeta para planes de
  precio y formularios.
- **Do** escribir el turquesa sobre fondo claro siempre como `turquoise-topaz-ink`.
- **Do** usar capturas reales del producto en variante clara y oscura (ThemeImage)
  como única imagen.
- **Do** usar cifras tabulares en precios y códigos de DTE.
- **Do** tematizar la selección de texto (`::selection` en turquesa claro con tinta
  azul) y el foco (anillo turquesa de 2px).

### Don't:
- **Don't** poner etiquetas en mayúsculas (eyebrows) sobre los títulos.
- **Don't** usar texto con gradiente. El gradiente de marca vive sólo en el botón de
  acento y en la píldora «Recomendado».
- **Don't** armar grillas de tarjetas idénticas de ícono + título + texto.
- **Don't** centrar el hero con una píldora arriba y tres íconos abajo.
- **Don't** poner bordes laterales de color de más de 1px en callouts o tarjetas.
- **Don't** animar con `ping` ni con pulsos de atención. La única transición es la
  de estado (200ms).
- **Don't** usar Turquoise Topaz ni Teal Deer como texto sobre blanco.
