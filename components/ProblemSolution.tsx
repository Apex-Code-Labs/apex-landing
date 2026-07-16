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
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="eyebrow mb-3">El problema</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Todavía controlas tu negocio con Excel, cuadernos y WhatsApp?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Eso significa errores frecuentes, horas perdidas en procesos manuales,
            cero visibilidad del negocio en tiempo real — y un riesgo real de multas.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16 border-l-2 border-primary-200 dark:border-primary-500 pl-6 py-1 text-left">
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            Desde 2023, el Ministerio de Hacienda exige la facturación
            electrónica (DTE) de forma progresiva en El Salvador.{' '}
            <span className="font-semibold text-primary dark:text-white">
              Con Apex ERP, cumplir no tiene que ser complicado ni caro.
            </span>
          </p>
        </div>

        <div className="text-center mb-10">
          <p className="eyebrow mb-3">La solución</p>
          <h2 className="text-3xl md:text-4xl font-bold">Un solo sistema para todo tu negocio</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <div className="w-11 h-11 rounded-lg bg-primary-50 dark:bg-primary-800 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary dark:text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
