import ThemeImage from './ThemeImage'
import posLight from '@/public/screenshots/pos_light.webp'
import posDark from '@/public/screenshots/pos_dark.webp'
import { waLink } from '@/lib/contact'
import { ENTRY_PRICE } from '@/lib/pricing'
import { MessageCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-28 md:pt-40 bg-primary-50 dark:bg-gray-900 overflow-hidden">
      <div className="container-custom">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-400 mb-4">
          Apex Code Labs · El Salvador
        </p>
        <h1 className="max-w-4xl text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Un sistema que funciona desde el primer día, y se adapta a cómo trabaja tu negocio.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Facturación electrónica, punto de venta, inventario y clientes, listos desde el primer día. Si tu operación necesita algo más, o que algo funcione distinto, lo desarrollamos nosotros.
        </p>

        <dl className="mt-10 grid sm:grid-cols-2 gap-6 max-w-3xl">
          <div>
            <dt className="text-xl font-bold text-primary dark:text-white">Desde {ENTRY_PRICE}/mes</dt>
            <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">IVA incluido, sin permanencia</dd>
          </div>
          <div>
            <dt className="text-xl font-bold text-primary dark:text-white">Lo que desarrollamos para ti</dt>
            <dd className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              se suma a tu mensualidad cuando empiezas a usarlo · <strong className="font-semibold text-primary dark:text-white">no pagas nada por el desarrollo</strong>
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-7 py-4 inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Escríbenos por WhatsApp
          </a>
          <a href="#precios" className="text-center font-semibold text-primary dark:text-accent-300 underline underline-offset-4">
            Ver precios
          </a>
        </div>

        <div className="mt-14 md:mt-16 -mb-px rounded-t-2xl border border-b-0 border-primary-200 dark:border-gray-700 shadow-[0_-12px_48px_-12px_rgba(18,28,140,0.18)] dark:shadow-none overflow-hidden lg:mx-12">
          <ThemeImage
            srcLight={posLight}
            srcDark={posDark}
            alt="Punto de venta de Apex con catálogo de productos y cobro con DTE"
            sizes="(max-width: 1024px) 100vw, 1180px"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}
