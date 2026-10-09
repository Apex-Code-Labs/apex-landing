# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

PYMES salvadoreñas de cualquier nicho que necesitan cumplir con la facturación
electrónica (DTE) y, de paso, ordenar la operación del negocio. No hay un nicho
prioritario: el objetivo es abarcar la mayoría. Hoy ya hay clientes en:

- restaurantes y cafés;
- contadores (facturan para varios clientes o emiten honorarios);
- talleres de aceros;
- ingenieros y servicios profesionales;
- retail, incluido multi-sucursal.

Quien decide suele ser el dueño u operador del negocio, que hoy controla todo con
Excel, cuadernos y WhatsApp, o con varios programas sueltos.

## Product Purpose

Apex ERP es un SaaS multi-tenant de Apex Code Labs que integra en una sola
plataforma ventas/POS, inventario, caja, comandas, recetas, multi-sucursal y
facturación electrónica DTE transmitida directamente al Ministerio de Hacienda
(MH).

La landing (apexcodelabs.com) existe para vender Apex ERP, no servicios de agencia.
**La conversión que importa en esta etapa es la demo agendada**: formulario de
contacto o WhatsApp, y luego una venta asistida. No hay signup público. Cuando
exista, `NEXT_PUBLIC_SIGNUP_URL` cambia el destino y la etiqueta del CTA sin tocar
código.

## Positioning

La venta es el dato único: al cerrar una venta en el POS, el mismo dato descuenta
inventario (incluidos los insumos vía recetas), registra la caja, genera y
transmite el DTE e imprime el ticket. Nadie vuelve a digitar la venta en otro
programa.

Los facturadores DTE, los POS genéricos y los sistemas contables resuelven cada uno
sólo una parte. Además, Apex acompaña la certificación ante el MH y puede
desarrollar a la medida sobre la misma plataforma.

## Operating Context

- **Mercado:** El Salvador. Precios en USD con IVA (13%) incluido.
- **Obligación legal:** el MH exige el DTE de forma progresiva desde 2023.
- **Uso en piso:** tablets y teléfonos (PWA instalable, Android e iOS, sin tiendas),
  impresoras térmicas Bluetooth de 58 mm, login por PIN para meseros y pantalla de
  cocina (KDS).
- **Tipos de DTE soportados:** 01, 03, 05, 06, 07, 11 y 14. Incluye firma digital,
  modo contingencia y almacenamiento por 10 años.
- **Orquestador:** para quien ya tiene su propio sistema. Recibe el JSON; Apex lo
  firma, lo transmite y lo almacena.

## Capabilities and Constraints

- **Fuente única de precios:** `lib/pricing.ts`, tomado del brochure comercial
  (`public/ERP-Brochure-Comercial-v6.1.pdf`). Hay tres grupos: Solo DTE, ERP completo
  y Orquestador. El plan anual tiene −20%. Hay una promoción early adopter del −30%
  por 3 meses para los primeros 50 clientes.
- **Formulario:** `/api/contact` reenvía al endpoint de prospectos del ERP. El
  contrato de campos no se cambia desde la landing.
- **Stack:** Next.js 15 en Cloudflare Workers vía OpenNext. Hay un workaround de
  `__name` en `app/layout.tsx` que no se debe quitar.
- **Open decision:** hacer configurables desde el admin-dashboard del ERP las
  secciones de prueba social (testimonios y métricas), en lugar de tenerlas en el
  código. No está decidido ni implementado.

## Brand Commitments

- **Marca:** Apex Code Labs. **Producto:** Apex ERP. Isotipo oficial en
  `public/brand/isotipo.svg`.
- **Línea gráfica:** `docs/brand/Apex Code Labs [Línea Gráfica].pdf`.
- **Voz:** español neutro con tuteo («Gestiona», «Agenda»), sin voseo ni regionalismos.
- **Comparativas:** siempre por **categoría** de solución, nunca contra proveedores
  nombrados.
- **Claims:** sólo afirmaciones verificables. La PR #4 retiró las que no lo eran.

## Evidence on Hand

- **Capturas reales del producto:** `public/screenshots/` (POS y comandas, en claro y
  oscuro).
- **Brochure comercial v6.1:** precios, add-ons y condiciones.
- **Testimonios reales y métricas verificables:** existen, pero todavía no están en
  el repo. Hay que pedirlos a Kevin con el texto exacto y el permiso; no se
  parafrasean ni se estiman.
- **No hay autorización para nombrar clientes ni mostrar sus logos.** No se puede
  inventar ningún cliente, cifra, porcentaje de aceptación del MH ni benchmark.

## Product Principles

1. **El cumplimiento es la puerta; la operación es el valor.** El DTE trae al
   cliente; el sistema integrado lo retiene.
2. **Un dato, un paso.** Toda explicación del producto vuelve a la venta que cuadra
   inventario, caja y Hacienda a la vez.
3. **Para cualquier PYME, no para un solo nicho.** Los ejemplos verticales (como
   restaurantes) ilustran; no excluyen.
4. **Sólo lo verificable.** Una promesa que la página no puede cumplir (como
   «Prueba gratis» sin signup) o una cifra sin fuente resta confianza.
5. **Una venta asistida es el camino actual.** Toda superficie lleva a agendar una
   demo o a escribir por WhatsApp.

## Accessibility & Inclusion

Contraste WCAG AA, que la spec de julio de 2026 declara no negociable:

- `#13C6AB` y `#96E5AC` nunca como texto sobre blanco.
- Los botones mantienen sus pares validados de color de fondo y de texto.
