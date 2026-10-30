import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = (f) => readFileSync(f, 'utf8').replace(/\s+/g, ' ')

test('orden de la home', () => {
  const page = read('app/page.tsx')
  const pos = ['<Hero', '<ProblemSolution', '<DteSection', '<Modules', '<Pricing', '<FAQ', '<ContactForm'].map((t) => page.indexOf(t))
  assert.ok(pos.every((p, i) => p >= 0 && (i === 0 || p > pos[i - 1])), String(pos))
  assert.ok(!page.includes('Comparison') && !page.includes('RestaurantFlow'))
  // El camino de Desarrollo vive en las tarjetas de ProblemSolution: el banner sobra.
  assert.ok(!page.includes('DevTeaser'))
  assert.equal(existsSync('components/DevTeaser.tsx'), false)
})

test('los tres caminos se eligen bajo el hero', () => {
  const s = read('components/ProblemSolution.tsx')
  for (const t of ["href: '#precios'", "href: '/restaurantes'", "href: '/desarrollo'"]) assert.ok(s.includes(t), t)
  assert.ok(!s.includes('AUDIENCES'))
})

test('pricing: contraste dark, WhatsApp por plan y plan a la medida sin precio', () => {
  const p = read('components/Pricing.tsx')
  const gray = p.match(/text-gray-500/g)?.length ?? 0
  const withDark = p.match(/text-gray-500 dark:text-gray-400/g)?.length ?? 0
  assert.ok(gray > 0 && gray === withDark, `${withDark}/${gray} text-gray-500 con variante dark`)
  assert.ok(!p.includes('waLink()'), 'cada tarjeta manda el nombre de su plan')
  assert.ok(p.includes('plan.name'))
  assert.ok(!p.includes('CUSTOM_PLAN_FROM') && !read('lib/pricing.ts').includes('CUSTOM_PLAN_FROM'))
})

test('Comparison borrado', () => {
  assert.equal(existsSync('components/Comparison.tsx'), false)
  assert.equal(existsSync('lib/cta.ts'), false)
})

test('hero fijado', () => {
  const hero = read('components/Hero.tsx')
  for (const t of [
    'Un sistema que funciona desde el primer día, y se adapta a cómo trabaja tu negocio.',
    'Ver planes desde {ENTRY_PRICE}/mes',
    'href="#precios"',
  ]) assert.ok(hero.includes(t), t)
  assert.ok(!hero.includes('$5.63'))
  // El WhatsApp ya está en el header y en la burbuja: el hero no lo repite.
  for (const t of ['waLink', 'El Salvador', '<dl']) assert.ok(!hero.includes(t), t)
})

test('ejemplo de mensualidad', () => {
  const g = read('components/GrowthExample.tsx')
  for (const t of ['$5.63', '$4.99', '$10.62', 'Ejemplo ilustrativo.']) assert.ok(g.includes(t), t)
})

test('verticales con precio', () => {
  const p = read('components/Pricing.tsx')
  for (const t of ['price', 'href', 'desde', 'sobre tu plan']) assert.ok(p.includes(t), t)
  assert.ok(!p.includes('te lo cotizamos'))
})
