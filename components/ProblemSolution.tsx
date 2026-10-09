import { Store, UtensilsCrossed, Building2, Calculator } from 'lucide-react'

const AUDIENCES = [
  { icon: Store, title: 'PYMES', text: 'Que quieren dejar atrás el papel y cumplir con Hacienda sin gastar de más.' },
  { icon: UtensilsCrossed, title: 'Restaurantes y cafés', text: 'Comandas, mesas, cocina y recetas con descuento de insumos en tiempo real.' },
  { icon: Building2, title: 'Retail multi-sucursal', text: 'Control centralizado de inventario y ventas en cada punto, con POS móvil.' },
  { icon: Calculator, title: 'Contadores', text: 'Facturación de múltiples clientes o emisión de honorarios desde un solo lugar.' },
]

export default function ProblemSolution() {
  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-20 md:mb-28">
          <h2 className="lg:col-span-7 text-3xl md:text-5xl md:leading-[1.1] font-bold">
            ¿Todavía controlas tu negocio con Excel, cuadernos y WhatsApp?
          </h2>
          <div className="lg:col-span-5 space-y-6 text-lg leading-relaxed">
            <p className="text-gray-600 dark:text-gray-300">
              Eso significa errores frecuentes, horas perdidas en procesos manuales,
              cero visibilidad del negocio en tiempo real — y un riesgo real de multas.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Desde 2023, el Ministerio de Hacienda exige la facturación
              electrónica (DTE) de forma progresiva en El Salvador.{' '}
              <strong className="font-semibold text-primary dark:text-white">
                Con Apex ERP, cumplir no tiene que ser complicado ni caro.
              </strong>
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8">Un solo sistema para todo tu negocio</h2>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-gray-200 dark:border-gray-800">
          {AUDIENCES.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="py-6 sm:pr-8 lg:border-l lg:first:border-l-0 lg:pl-6 lg:first:pl-0 border-b lg:border-b-0 border-gray-200 dark:border-gray-800"
            >
              <Icon className="w-6 h-6 text-accent-700 dark:text-accent-300 mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
