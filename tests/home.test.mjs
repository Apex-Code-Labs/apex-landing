import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = (f) => readFileSync(f, 'utf8').replace(/\s+/g, ' ')

test('orden de la home', () => {
  const page = read('app/page.tsx')
  const pos = ['<OrbitHero', 'id="facturacion"', '<Modules', '<FAQ', '<ContactForm'].map((t) => page.indexOf(t))
  assert.ok(pos.every((p, i) => p >= 0 && (i === 0 || p > pos[i - 1])), String(pos))
  // Precios vive en /precios: la home no repite la tabla.
  assert.ok(!page.includes('<Pricing'))
  assert.ok(!page.includes('Comparison') && !page.includes('RestaurantFlow'))
  assert.ok(!page.includes('DevTeaser'))
  assert.equal(existsSync('components/DevTeaser.tsx'), false)
  for (const f of ['components/Hero.tsx', 'components/ProblemSolution.tsx', 'components/DteSection.tsx']) assert.equal(existsSync(f), false, f)
})

test('los tres caminos se eligen en el hero', () => {
  const s = read('app/page.tsx')
  const cards = s.slice(s.indexOf('const PATH_CARDS'), s.indexOf('const STEPS'))
  for (const t of ["href: '/facturacion'", "href: '/erp'", "href: '/desarrollo'"]) assert.ok(cards.includes(t), t)
  for (const t of ['href="/precios"', 'href="/restaurantes"']) assert.ok(s.includes(t), t)
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
  const page = read('app/page.tsx')
  const hero = page.slice(page.indexOf('<OrbitHero'), page.indexOf('/>', page.indexOf('cardsLabel')))
  for (const t of [
    "title={['Facturas a Hacienda.', 'Vendes en tu POS.', 'Un solo precio al mes.']}",
    '{ENTRY_PRICE}/mes</strong>, IVA incluido.',
    "href: '#contacto'",
  ]) assert.ok(hero.includes(t), t)
  assert.ok(!page.includes('$5.63'))
  // El WhatsApp ya está en el header y en la burbuja: el hero de la home no lo repite.
  for (const t of ['waLink', 'whatsapp: true', '<dl']) assert.ok(!hero.includes(t), t)
})

test('rutas sin anclas: cada entrada del menú es una página', () => {
  for (const f of ['components/Header.tsx', 'components/Footer.tsx']) {
    const p = read(f)
    assert.ok(!p.includes("'/#") && !p.includes('"/#'), f)
    assert.ok(p.includes('/precios'), f)
  }
  const precios = read('app/precios/page.tsx')
  assert.ok(precios.includes('<Pricing />'), 'precios muestra todos los grupos')
  assert.ok(precios.includes("canonical: '/precios'"))
  // Cada producto muestra sólo sus planes y verticales.
  assert.ok(read('app/facturacion/page.tsx').includes('<Pricing only="factura" />'))
  assert.ok(read('app/erp/page.tsx').includes('<Pricing only="erp" />'))
  const p = read('components/Pricing.tsx')
  assert.ok(p.includes('VERTICALES.filter((v) => !only || v.group === only)') && p.includes('{!only && <div'))
})

test('ejemplo de mensualidad', () => {
  const g = read('components/GrowthExample.tsx')
  for (const t of ['$5.63', '$4.99', '$10.62', 'Ejemplo ilustrativo.']) assert.ok(g.includes(t), t)
  // Spec «dos lectores»: no se describe el cobro del desarrollo más allá de la frase aprobada.
  assert.ok(g.includes('se suma a tu mensualidad'))
  assert.ok(!/no pag/i.test(g), 'GrowthExample no habla de lo que no se pagó')
})

test('verticales con precio', () => {
  const p = read('components/Pricing.tsx')
  for (const t of ['desde {price}', 'href={href}', 'sobre tu plan']) assert.ok(p.includes(t), t)
  assert.ok(!p.includes('te lo cotizamos'))
})
