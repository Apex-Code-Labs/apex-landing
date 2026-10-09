import ThemeImage from './ThemeImage'
import posLight from '@/public/screenshots/pos_light.webp'
import posDark from '@/public/screenshots/pos_dark.webp'
import { getSignupHref, getSignupLabel } from '@/lib/cta'
import { waLink } from '@/lib/contact'
import { ArrowRight, MessageCircle } from 'lucide-react'

const PROPS = [
  { title: 'Transmisión directa al MH', text: 'DTE generado y transmitido al cobrar. Sin pasos extra.' },
  { title: 'En cualquier dispositivo', text: 'PWA instalable en tablets y teléfonos, Android e iOS.' },
  { title: 'Desde $5.63/mes', text: 'IVA incluido. Sin cargos ocultos ni permanencia.' },
]

export default function Hero() {
  return (
    <section className="pt-28 md:pt-40 bg-primary-50 dark:bg-gray-900 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <h1 className="lg:col-span-7 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Sistema ERP con{' '}
            <span className="text-accent-700 dark:text-accent-300">Facturación Electrónica</span>{' '}
            y POS
          </h1>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Gestiona tu negocio completo desde una sola plataforma: ventas, POS,
              inventario, comandas, recetas y multi-sucursal — con DTE transmitido
              directamente al Ministerio de Hacienda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={getSignupHref()} className="btn-primary text-lg px-7 py-4 inline-flex items-center justify-center gap-2 group">
                {getSignupLabel()}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-7 py-4 inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <dl className="mt-14 md:mt-16 grid sm:grid-cols-3 border-t border-primary-200 dark:border-gray-700">
          {PROPS.map(({ title, text }) => (
            <div key={title} className="py-5 sm:pr-6 border-b sm:border-b-0 border-primary-100 dark:border-gray-800">
              <dt className="font-semibold text-primary dark:text-white">{title}</dt>
              <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">{text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 md:mt-10 -mb-px rounded-t-2xl border border-b-0 border-primary-200 dark:border-gray-700 shadow-[0_-12px_48px_-12px_rgba(18,28,140,0.18)] dark:shadow-none overflow-hidden lg:mx-12">
          <ThemeImage
            srcLight={posLight}
            srcDark={posDark}
            alt="Punto de venta de Apex ERP con catálogo de productos y cobro con DTE"
            sizes="(max-width: 1024px) 100vw, 1180px"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}
