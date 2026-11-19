import type { Metadata } from 'next'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import OrbitHero, { type OrbitCard } from '@/components/OrbitHero'
import RestaurantFlow from '@/components/RestaurantFlow'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { waLink, WA_MESSAGE_RESTAURANT } from '@/lib/contact'
import { RESTAURANT_FROM } from '@/lib/pricing'
import posCobroLight from '@/public/screenshots/pos_cobro_light.webp'
import mesasLight from '@/public/screenshots/mesas_light.webp'

const TITLE = 'Apex Restaurante — POS para restaurantes con facturación electrónica en El Salvador'
const DESCRIPTION = `Comandas, mesas, pantalla de cocina (KDS), recetas que descuentan insumos, caja con corte Z y DTE en un solo sistema. Desde ${RESTAURANT_FROM}/mes con IVA incluido.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['POS restaurante', 'comandas', 'sistema para restaurantes', 'pantalla de cocina', 'facturación electrónica El Salvador', 'DTE'],
  alternates: { canonical: '/restaurantes' },
  // openGraph del page REEMPLAZA al del layout (no se fusiona): se repiten imagen, locale y siteName.
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    siteName: 'Apex Code Labs',
    url: 'https://apexcodelabs.com/restaurantes',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Apex Restaurante' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
}

const MODULES = [
  { name: 'Comandas', text: 'El mesero toma la orden desde la tablet o el teléfono.' },
  { name: 'Mesas y áreas', text: 'Terraza, salón y barra, con el estado de cada mesa.' },
  { name: 'Pantalla de cocina (KDS)', text: 'La cocina recibe cada orden al instante.' },
  { name: 'Recetas', text: 'Cada venta descuenta los insumos que lleva el plato.' },
  { name: 'POS', text: 'El cajero cobra y emite el ticket desde la misma pantalla.' },
  { name: 'Caja', text: 'Corte X de lectura y corte Z al cerrar el turno.' },
  { name: 'DTE', text: 'Cada cobro genera su documento y se transmite a Hacienda.' },
]

const HERO_CARDS: OrbitCard[] = [
  { kind: 'Salón', name: 'Comandas y mesas', detail: 'El mesero toma la orden desde la tablet o el teléfono.', href: '#incluye' },
  { kind: 'Caja', name: 'Corte X y corte Z', detail: 'Cada cobro genera su DTE y se transmite a Hacienda.', href: '#incluye' },
  { kind: 'Cocina', name: 'Pantalla de cocina (KDS)', detail: 'La cocina recibe cada orden al instante.', href: '#incluye' },
]

export default function Restaurantes() {
  return (
    <main className="min-h-screen">
      <Header />
      <OrbitHero
        title={['De la mesa a la cocina.', 'De la caja a Hacienda.', 'Un solo sistema.']}
        lede="Es Apex ERP con el paquete Restaurante: comandas, mesas, cocina, recetas, caja y facturación electrónica trabajando juntas."
        cta={{ href: waLink(WA_MESSAGE_RESTAURANT), label: 'Escríbenos por WhatsApp', whatsapp: true }}
        note={<>Desde <strong className="text-white tabular-nums">{RESTAURANT_FROM}/mes</strong>, IVA incluido.</>}
        trust={['Sin permanencia', 'Un DTE por cada cobro', 'Corte X y corte Z']}
        image={posCobroLight}
        imageAlt="Punto de venta de Apex con un pedido de bebidas listo para cobrar, IVA incluido"
        cards={HERO_CARDS}
        cardsLabel="Lo que incluye"
      />

      <section id="incluye" className="section-padding bg-white dark:bg-night-950">
        <div className="container-custom">
          <div className="section-head">
            <h2>Lo que incluye</h2>
          </div>
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            <ul className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-x-8 border-t border-gray-200 dark:border-night-800">
              {MODULES.map(({ name, text }) => (
                <li key={name} className="py-5 border-b border-gray-200 dark:border-night-800">
                  <h3 className="font-bold mb-1">{name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 lg:mt-0 lg:col-span-7 rounded-2xl border border-gray-200 dark:border-night-800 shadow-xl overflow-hidden">
              <Image
                src={mesasLight}
                alt="Mapa de mesas de Apex por áreas, con las mesas ocupadas, el tiempo de cada orden y una mesa unida"
                sizes="(max-width: 1024px) 100vw, 700px"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <RestaurantFlow />

      <section className="section-padding bg-primary-50 dark:bg-night-900">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Quieres verlo funcionando en tu restaurante?</h2>
          <a
            href={waLink(WA_MESSAGE_RESTAURANT)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-7 py-4 inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
