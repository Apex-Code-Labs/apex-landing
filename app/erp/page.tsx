import type { Metadata } from 'next'
import Header from '@/components/Header'
import OrbitHero, { type OrbitCard } from '@/components/OrbitHero'
import Modules from '@/components/Modules'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { PRICING_GROUPS } from '@/lib/pricing'
import { TRUST } from '@/lib/dte'
import dashboardLight from '@/public/screenshots/dashboard_light.webp'

const erp = PRICING_GROUPS[1]
const FROM = erp.plans[0].monthly

const TITLE = 'Apex ERP — POS, inventario, caja y facturación electrónica en El Salvador'
const DESCRIPTION = `Punto de venta, inventario con kardex, caja y DTE en un solo sistema: cada venta descuenta inventario y se transmite a Hacienda. Desde ${FROM}/mes con IVA incluido.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['ERP El Salvador', 'punto de venta', 'POS', 'inventario', 'kardex', 'facturación electrónica', 'DTE'],
  alternates: { canonical: '/erp' },
  // openGraph del page REEMPLAZA al del layout (no se fusiona): se repiten imagen, locale y siteName.
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    siteName: 'Apex Code Labs',
    url: 'https://apexcodelabs.com/erp',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Apex ERP' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.png'] },
}

const HERO_CARDS: OrbitCard[] = erp.plans.map((p) => ({
  kind: erp.label,
  name: p.name,
  detail: p.features[0],
  price: `${p.monthly}/mes`,
  href: '#precios',
}))

export default function Erp() {
  return (
    <main className="min-h-screen">
      <Header />
      <OrbitHero
        title={['POS, inventario y caja.', 'Factura incluida.', 'Un solo sistema.']}
        lede="Cuando tu cajero cierra una venta, el sistema descuenta el inventario, la registra en caja y transmite el DTE al MH. Nadie vuelve a teclear la venta en otro programa."
        cta={{ href: '#contacto', label: 'Agenda tu demo de 30 minutos' }}
        note={<>Desde <strong className="text-white tabular-nums">{FROM}/mes</strong>, IVA incluido.</>}
        trust={TRUST}
        image={dashboardLight}
        imageAlt="Dashboard de Apex ERP con ventas del día, ritmo por hora, métodos de pago y efectivo esperado en caja"
        cards={HERO_CARDS}
        cardsLabel="Planes de Apex ERP"
      />
      <Modules />
      <Pricing only="erp" />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
