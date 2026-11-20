import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Header from '@/components/Header'
import OrbitHero, { type OrbitCard } from '@/components/OrbitHero'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { PRICING_GROUPS, ENTRY_PRICE } from '@/lib/pricing'
import { DTE_TYPES, TRUST } from '@/lib/dte'

const TITLE = 'Sistema de facturación electrónica (DTE) en El Salvador — Apex Factura'
const DESCRIPTION = `Emite todos los tipos de DTE del Ministerio de Hacienda, con transmisión, anulación y contingencia. Te certificamos ante el MH. Desde ${ENTRY_PRICE}/mes con IVA incluido.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['facturación electrónica', 'DTE', 'Ministerio de Hacienda', 'factura electrónica El Salvador', 'crédito fiscal'],
  alternates: { canonical: '/facturacion' },
  // openGraph del page REEMPLAZA al del layout (no se fusiona): se repiten imagen, locale y siteName.
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    siteName: 'Apex Code Labs',
    url: 'https://apexcodelabs.com/facturacion',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Apex Factura' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.png'] },
}

const [factura, erp] = PRICING_GROUPS
const HERO_CARDS: OrbitCard[] = [
  ...factura.plans.map((p) => ({ kind: factura.label, name: p.name, detail: p.dtes, price: `${p.monthly}/mes`, href: '#precios' })),
  { kind: 'Cuando crezcas', name: `${erp.label} ${erp.plans[0].name}`, detail: 'Factura incluida, más POS, caja e inventario', price: `desde ${erp.plans[0].monthly}/mes`, href: '/erp' },
]

// Salen de las features de los planes Factura (lib/pricing.ts).
const INCLUDES = [
  { name: 'Transmisión al MH', text: 'Cada DTE se transmite al Ministerio de Hacienda, con anulación y contingencia.' },
  { name: 'Envío al cliente', text: 'Envío y reenvío del DTE a tu cliente.' },
  { name: 'Libros de IVA', text: 'Libro de Ventas y Resumen de IVA.' },
  { name: 'Catálogo de productos', text: 'En el plan Profesional, sin inventario.' },
]

// Respaldo en erp-2025: NormativaVersion::forDate (corte 2026-12-01) y MhEventVersion (eventos por fecha del evento).
const NORMATIVA_2 = [
  { name: 'Cambio por fecha', text: 'Lo que emitas hasta el 30 de noviembre sale en la versión 1.2; desde el 1 de diciembre, en la 2.0, sin que configures nada.' },
  { name: 'Invalidación y contingencia', text: 'Los eventos de invalidación y de contingencia también pasan a la versión 2.0 el 1 de diciembre.' },
]

// ponytail: no hay captura del módulo de facturación; la tarjeta de DTE la reemplaza en la órbita
function DteCard() {
  return (
    <div className="w-72 max-lg:w-full rounded-xl bg-white p-5 shadow-2xl shadow-black/40 ring-1 ring-white/20">
      <p className="text-xs font-semibold text-accent-700">Tipos de DTE del MH</p>
      <ul className="mt-3 space-y-2 text-sm">
        {DTE_TYPES.map(([code, name]) => (
          <li key={code} className="flex items-center gap-3">
            <span className="font-bold text-primary tabular-nums">{code}</span>
            <span className="text-primary-900">{name}</span>
            <Check className="ml-auto w-4 h-4 text-accent-700" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Facturacion() {
  return (
    <main className="min-h-screen">
      <Header />
      <OrbitHero
        title={['Facturación electrónica', 'en El Salvador.', `Desde ${ENTRY_PRICE} al mes.`]}
        lede="Un sistema de facturación electrónica con todos los tipos de DTE del Ministerio de Hacienda. Activamos tu cuenta y te certificamos ante el MH; tú solo facturas."
        cta={{ href: '#contacto', label: 'Agenda tu demo de 30 minutos' }}
        note="IVA incluido."
        trust={TRUST}
        center={<DteCard />}
        cards={HERO_CARDS}
        cardsLabel="Planes de Apex Factura"
      />

      <section id="incluye" className="section-padding bg-white dark:bg-night-950">
        <div className="container-custom">
          <div className="section-head">
            <h2>Lo que incluye</h2>
            <p>{factura.tagline}</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-12 border-t border-gray-200 dark:border-night-800">
            {INCLUDES.map(({ name, text }) => (
              <li key={name} className="py-6 border-b border-gray-200 dark:border-night-800">
                <h3 className="font-bold mb-1">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fuente: comunicado del MH del 25-may-2026. El corte por fecha es NormativaVersion::forDate en erp-2025. */}
      <section id="normativa-2" className="section-padding bg-primary-50 dark:bg-night-900">
        <div className="container-custom">
          <div className="section-head">
            <h2>Listo para la Normativa DTE 2.0</h2>
            <p>
              Desde el 1 de diciembre de 2026, el Ministerio de Hacienda exige la versión 2.0 a quienes facturan con un
              sistema propio o de un proveedor. Con Apex Factura no tienes que hacer nada: el cambio es automático.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-12 border-t border-gray-200 dark:border-night-800">
            {NORMATIVA_2.map(({ name, text }) => (
              <li key={name} className="py-6 border-b border-gray-200 dark:border-night-800">
                <h3 className="font-bold mb-1">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link href="/guia-facturacion-electronica#normativa-2-0" className="font-semibold text-primary dark:text-accent-300 underline">
              Qué cambia con la Normativa 2.0
            </Link>
          </p>
        </div>
      </section>

      <Pricing only="factura" />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
