import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { VERTICALES, ENTRY_PRICE, RESTAURANT_FROM } from '../lib/pricing.ts'
import { FAQS } from '../lib/faqs.ts'
import { waLink, waMessageFor, WA_MESSAGE, WA_MESSAGE_DEV, WA_MESSAGE_RESTAURANT } from '../lib/contact.ts'

test('precios de verticales', () => {
  assert.deepEqual(Object.fromEntries(VERTICALES.map((v) => [v.name, v.price])), {
    Restaurante: '+$5.63/mes',
    Farmacia: '+$5.63/mes',
    Turismo: '+$5.63/mes',
    Gimnasio: '+$5.63/mes',
    'Proyectos y talleres': '+$56.48/mes',
    Servicios: '+$4.50/mes',
  })
})

test('solo Restaurante enlaza', () => {
  for (const v of VERTICALES) {
    assert.equal(v.href, v.name === 'Restaurante' ? '/restaurantes' : undefined, v.name)
  }
})

test('precios de entrada', () => {
  assert.equal(ENTRY_PRICE, '$5.63')
  assert.equal(RESTAURANT_FROM, '$28.22')
})

test('FAQ sin precios de servicios', () => {
  for (const { answer } of FAQS) {
    assert.ok(!answer.includes('$56.50') && !answer.includes('$33.90'), answer)
  }
})

test('WhatsApp', () => {
  assert.ok(waLink().includes(encodeURIComponent(WA_MESSAGE)))
  assert.ok(waLink(WA_MESSAGE_DEV).includes(encodeURIComponent(WA_MESSAGE_DEV)))
  assert.ok(!WA_MESSAGE.includes('Apex ERP'))
  assert.ok(!readFileSync('lib/contact.ts', 'utf8').includes('NEXT_PUBLIC_WA_MSG'))
})

test('mensaje de WhatsApp según la página', () => {
  assert.equal(waMessageFor('/desarrollo'), WA_MESSAGE_DEV)
  assert.equal(waMessageFor('/restaurantes'), WA_MESSAGE_RESTAURANT)
  for (const p of ['/', '/gracias', null]) assert.equal(waMessageFor(p), WA_MESSAGE)
})
