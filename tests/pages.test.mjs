import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (f) => readFileSync(f, 'utf8').replace(/\s+/g, ' ')

test('página /restaurantes', () => {
  const p = read('app/restaurantes/page.tsx')
  assert.ok(p.includes('export const metadata'))
  const seo = (p.match(/title: '[^']*'/)?.[0] ?? '') + (p.match(/keywords: \[[^\]]*\]/)?.[0] ?? '')
  assert.ok(seo.includes('POS') && seo.toLowerCase().includes('restaurante'), seo)
  for (const t of ['desde {RESTAURANT_FROM}/mes</span>', 'waLink(WA_MESSAGE_RESTAURANT)', '<RestaurantFlow']) assert.ok(p.includes(t), t)
  for (const t of ['comandas', 'mesas', 'KDS', 'recetas', 'corte Z']) assert.ok(p.includes(t), t)
})

test('página /desarrollo', () => {
  const p = read('app/desarrollo/page.tsx')
  const low = p.toLowerCase()
  assert.ok(p.includes('export const metadata'))
  for (const t of [
    'Construimos el sistema que tu empresa va a vender o a usar, con la tecnología que elijas.',
    'Cuéntanos tu proyecto', 'WA_MESSAGE_DEV', 'Lo que construimos', 'Cómo trabajamos',
    'const CASES', 'CASES.length > 0 &&',
  ]) assert.ok(p.includes(t), t)
  for (const t of [
    'conocemos la operación hablando con quien hace el trabajo',
    'propuesta escrita con alcance, etapas, tiempos y precio',
    'entregamos por etapas y se usa lo construido antes de seguir',
  ]) assert.ok(low.includes(t), t)
})

test('SEO de la home', () => {
  assert.ok(!read('app/layout.tsx').includes('POS restaurante'))
  // Organization y WebSite van antes de SoftwareApplication en lib/schema.ts
  const orgAndSite = read('lib/schema.ts').split('SoftwareApplication')[0]
  assert.ok(!orgAndSite.includes('comandas'), 'comandas en Organization/WebSite')
  assert.ok(orgAndSite.includes('facturación electrónica'))
})

test('ningún hero lleva label arriba del título', () => {
  for (const f of ['components/Hero.tsx', 'app/restaurantes/page.tsx', 'app/desarrollo/page.tsx']) {
    assert.ok(!read(f).includes('uppercase tracking-[0.08em]'), f)
  }
})

test('twitter propio en /restaurantes y /desarrollo', () => {
  // Sin esto, X hereda el título y la descripción de la home.
  for (const f of ['app/restaurantes/page.tsx', 'app/desarrollo/page.tsx']) {
    const p = read(f)
    for (const t of ["card: 'summary_large_image'", 'title: TITLE', 'description: DESCRIPTION', "images: ['/og.png']"]) {
      assert.ok(p.includes(`twitter: {`) && p.slice(p.indexOf('twitter: {')).includes(t), `${f}: ${t}`)
    }
  }
})

test('header y burbuja mandan el mensaje de la página', () => {
  for (const f of ['components/Header.tsx', 'components/WhatsAppFloat.tsx']) {
    const p = read(f)
    assert.ok(p.includes('waLink(waMessageFor(pathname))'), f)
    assert.ok(!p.includes('waLink()'), f)
  }
})
