import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { findViolations, sourceFiles } from './content-rules.mjs'

test('findViolations marca cada muestra mala y deja pasar la buena', () => {
  const malas = [
    'Escribinos hoy',
    'si tenés dudas',
    'Sin instalación y sin compromiso',
    'sin costo de implementación',
    'cobramos por hitos',
    'somos el único',
    'Café Fulanos',
    'hecho en Laravel',
  ]
  for (const m of malas) assert.notDeepEqual(findViolations(m), [], m)
  assert.deepEqual(findViolations('Escríbenos, no pagas nada por el desarrollo. Más después.'), [])
})

// Los comentarios no los ve el visitante (p. ej. notas de infraestructura).
// ponytail: solo comentarios de bloque y de línea entera; un `//` al final de una línea de código sigue contando.
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

test('ningún archivo fuente rompe las reglas', () => {
  for (const f of sourceFiles()) {
    assert.deepEqual(findViolations(stripComments(readFileSync(f, 'utf8'))), [], f)
  }
})
