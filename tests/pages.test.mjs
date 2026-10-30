import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (f) => readFileSync(f, 'utf8').replace(/\s+/g, ' ')

test('página /restaurantes', () => {
  const p = read('app/restaurantes/page.tsx')
  assert.ok(p.includes('export const metadata'))
  const seo = (p.match(/title: '[^']*'/)?.[0] ?? '') + (p.match(/keywords: \[[^\]]*\]/)?.[0] ?? '')
  assert.ok(seo.includes('POS') && seo.toLowerCase().includes('restaurante'), seo)
  for (const t of ['RESTAURANT_FROM', 'WA_MESSAGE_RESTAURANT', '<RestaurantFlow']) assert.ok(p.includes(t), t)
  for (const t of ['comandas', 'mesas', 'KDS', 'recetas', 'corte Z']) assert.ok(p.includes(t), t)
})
