import Image from 'next/image'
import dashboardLight from '@/public/screenshots/dashboard_light.webp'
import { ENTRY_PRICE } from '@/lib/pricing'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-28 md:pt-40 bg-primary-50 dark:bg-night-900 overflow-hidden">
      <div className="container-custom text-center">
        <h1 className="max-w-5xl mx-auto text-[2.25rem] leading-[1.15] sm:text-5xl lg:text-6xl lg:leading-[1.12] font-extrabold">
          Un sistema que funciona desde el primer día, y se adapta a cómo trabaja tu negocio.
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-pretty text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Facturación electrónica, punto de venta, inventario y clientes, listos desde el primer día. Si tu operación necesita algo más, o que algo funcione distinto, lo desarrollamos nosotros.
        </p>

        <a href="#precios" className="btn-primary mt-10 inline-flex items-center gap-2">
          Ver planes desde {ENTRY_PRICE}/mes
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>

        <div className="mt-14 md:mt-16 -mb-px rounded-t-2xl border border-b-0 border-primary-200 dark:border-night-700 shadow-[0_-12px_48px_-12px_rgba(18,28,140,0.18)] dark:shadow-none overflow-hidden lg:mx-12">
          {/* ponytail: solo existe la variante clara; la oscura se agrega con ThemeImage cuando haya captura */}
          <Image
            src={dashboardLight}
            alt="Dashboard de Apex ERP con ventas del día, ritmo por hora, métodos de pago y efectivo esperado en caja"
            sizes="(max-width: 1024px) 100vw, 1180px"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  )
}
