import type { Metadata } from 'next'
import Header from '@/components/Header'
import OrbitHero, { type OrbitCard } from '@/components/OrbitHero'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { PRICING_GROUPS, ENTRY_PRICE, RESTAURANT_FROM } from '@/lib/pricing'
import { TRUST } from '@/lib/dte'
import dashboardLight from '@/public/screenshots/dashboard_light.webp'

const TITLE = 'Precios de Apex — Facturación electrónica y ERP en El Salvador'
const DESCRIPTION = `Planes de Apex Factura y Apex ERP con IVA incluido y sin permanencia forzada. Facturación electrónica desde ${ENTRY_PRICE}/mes.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['precio facturación electrónica', 'precio ERP El Salvador', 'DTE', 'punto de venta', 'planes'],
  alternates: { canonical: '/precios' },
  // openGraph del page REEMPLAZA al del layout (no se fusiona): se repiten imagen, locale y siteName.
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    siteName: 'Apex Code Labs',
    url: 'https://apexcodelabs.com/precios',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Precios de Apex' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.png'] },
}

const [factura, erp] = PRICING_GROUPS
const HERO_CARDS: OrbitCard[] = [
  { kind: 'Facturación electrónica', name: `${factura.label} ${factura.plans[0].name}`, detail: factura.plans[0].dtes, price: `desde ${factura.plans[0].monthly}/mes`, href: '/facturacion' },
  { kind: 'Negocio completo', name: `${erp.label} ${erp.plans[0].name}`, detail: 'POS, caja e inventario', price: `desde ${erp.plans[0].monthly}/mes`, href: '/erp' },
  { kind: 'Restaurantes', name: 'Apex Restaurante', detail: 'Comandas, mesas, cocina y caja', price: `desde ${RESTAURANT_FROM}/mes`, href: '/restaurantes' },
]

export default function Precios() {
  return (
    <main className="min-h-screen">
      <Header />
      <OrbitHero
        title={['Un precio al mes.', 'IVA incluido.', 'Sin permanencia.']}
        lede="Empieza facturando con Apex Factura y suma punto de venta, inventario y caja con Apex ERP cuando lo necesites, sin cambiar de sistema."
        cta={{ href: '#contacto', label: 'Agenda tu demo de 30 minutos' }}
        note={<>Facturación desde <strong className="text-white tabular-nums">{ENTRY_PRICE}/mes</strong>, IVA incluido.</>}
        trust={TRUST}
        image={dashboardLight}
        imageAlt="Dashboard de Apex ERP con ventas del día, ritmo por hora, métodos de pago y efectivo esperado en caja"
        cards={HERO_CARDS}
        cardsLabel="Planes de Apex"
      />
      <Pricing />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
