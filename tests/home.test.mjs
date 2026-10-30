import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = (f) => readFileSync(f, 'utf8').replace(/\s+/g, ' ')

test('orden de la home', () => {
  const page = read('app/page.tsx')
  const pos = ['<Hero', '<ProblemSolution', '<DteSection', '<Modules', '<Pricing', '<DevTeaser', '<FAQ', '<ContactForm'].map((t) => page.indexOf(t))
  assert.ok(pos.every((p, i) => p >= 0 && (i === 0 || p > pos[i - 1])), String(pos))
  assert.ok(!page.includes('Comparison') && !page.includes('RestaurantFlow'))
})

test('Comparison borrado', () => {
  assert.equal(existsSync('components/Comparison.tsx'), false)
  assert.equal(existsSync('lib/cta.ts'), false)
})

test('hero fijado', () => {
  const hero = read('components/Hero.tsx')
  for (const t of [
    'Un sistema que funciona desde el primer día, y se adapta a cómo trabaja tu negocio.',
    'no pagas nada por el desarrollo',
    'Escríbenos por WhatsApp',
    'ENTRY_PRICE',
  ]) assert.ok(hero.includes(t), t)
  assert.ok(!hero.includes('$5.63'))
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
