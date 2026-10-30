import { Store, UtensilsCrossed, Code2, ArrowRight } from 'lucide-react'
import { ENTRY_PRICE, RESTAURANT_FROM } from '@/lib/pricing'

const PATHS = [
  {
    icon: Store,
    title: 'Facturar u operar tu negocio',
    text: 'Apex Factura para cumplir con Hacienda; Apex ERP cuando sumas inventario, caja y punto de venta.',
    meta: `Desde ${ENTRY_PRICE}/mes`,
    href: '#precios',
    cta: 'Ver planes',
  },
  {
    icon: UtensilsCrossed,
    title: 'Tienes un restaurante',
    text: 'Comandas, mesas, pantalla de cocina, recetas y caja, con la facturación electrónica incluida.',
    meta: `Desde ${RESTAURANT_FROM}/mes`,
    href: '/restaurantes',
    cta: 'Ver Apex Restaurante',
  },
  {
    icon: Code2,
    title: 'Necesitas un sistema a tu medida',
    text: 'Apps, plataformas con pagos o el sistema que tu empresa vende. Lo diseñamos y lo construimos contigo.',
    meta: 'Propuesta escrita con alcance y tiempos',
    href: '/desarrollo',
    cta: 'Conoce cómo trabajamos',
  },
]

export default function ProblemSolution() {
  return (
    <section className="section-padding bg-white dark:bg-night-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
          <h2 className="text-3xl md:text-5xl leading-tight md:leading-[1.2] font-bold">
            ¿Todavía controlas tu negocio con Excel, cuadernos y WhatsApp?
          </h2>
          <div className="mt-6 max-w-3xl mx-auto text-pretty text-lg leading-relaxed">
            <p className="text-gray-600 dark:text-gray-300">
              Desde 2023, el Ministerio de Hacienda exige la facturación
              electrónica (DTE) de forma progresiva en El Salvador.{' '}
              <strong className="font-semibold text-primary dark:text-white">
                Con Apex, cumplir no tiene que ser complicado ni caro.
              </strong>
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Elige por dónde empezar</h2>

        <ul className="grid md:grid-cols-3 gap-6">
          {PATHS.map(({ icon: Icon, title, text, meta, href, cta }) => (
            <li key={href}>
              <a href={href} className="card group h-full p-6 md:p-8 flex flex-col hover:border-primary dark:hover:border-accent-300">
                <Icon className="w-6 h-6 text-accent-700 dark:text-accent-300 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">{text}</p>
                <p className="mt-4 text-sm font-semibold text-primary dark:text-white">{meta}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-accent-300">
                  {cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
