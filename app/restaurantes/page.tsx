import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import RestaurantFlow from '@/components/RestaurantFlow'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { waLink, WA_MESSAGE_RESTAURANT } from '@/lib/contact'
import { RESTAURANT_FROM } from '@/lib/pricing'

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

export default function Restaurantes() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-28 md:pt-40 pb-16 md:pb-20 bg-primary-50 dark:bg-gray-900">
        <div className="container-custom">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-400 mb-4">
            Apex Restaurante
          </p>
          <h1 className="max-w-4xl text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Tu restaurante, de la mesa a Hacienda, en un solo sistema.
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Es Apex ERP con el paquete Restaurante: comandas, mesas, cocina, recetas, caja y facturación electrónica trabajando juntas.
          </p>
          <p className="mt-8 text-xl font-bold text-primary dark:text-white">
            Desde {RESTAURANT_FROM}/mes <span className="text-sm font-normal text-gray-600 dark:text-gray-400">IVA incluido, sin permanencia</span>
          </p>
          <a
            href={waLink(WA_MESSAGE_RESTAURANT)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 btn-primary text-lg px-7 py-4 inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="section-head">
            <h2>Lo que incluye</h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 border-t border-gray-200 dark:border-gray-800">
            {MODULES.map(({ name, text }) => (
              <li key={name} className="py-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold mb-1">{name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RestaurantFlow />

      <section className="section-padding bg-primary-50 dark:bg-gray-900">
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
