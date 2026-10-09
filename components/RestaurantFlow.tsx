import { CheckCircle2 } from 'lucide-react'
import ThemeImage from './ThemeImage'
import comandasLight from '@/public/screenshots/comandas_light.webp'
import comandasDark from '@/public/screenshots/comandas_dark.webp'

const STEPS = [
  { n: '1', title: 'El mesero toma la orden', text: 'Desde tablet o teléfono, con login por PIN. Selecciona mesa y agrega ítems.' },
  { n: '2', title: 'Cocina la recibe al instante', text: 'Pantalla de cocina (KDS) con timer configurable. Cada cambio de estado se sincroniza con el salón.' },
  { n: '3', title: 'Cobro + DTE + ticket', text: 'El cajero cobra en el POS: se descuentan insumos, se genera el DTE y se imprime el ticket térmico Bluetooth.' },
  { n: '4', title: 'Cierre de caja con corte Z', text: 'Corte X de lectura y corte Z fiscal al final del turno, con reporte automático al administrador.' },
]

const FEATURES = [
  'Mesas con disposición gráfica y áreas (terraza, salón, barra)',
  'Recetas con múltiples insumos, sub-recetas y costo CMV por venta',
  'Roles preconfigurados: mesero, cocinero, cajero, supervisor',
  'Impresoras térmicas Bluetooth de 58mm portátiles',
  'Multi-sucursal con consolidación de reportes',
  'Auditoría por empleado en cada acción crítica',
]

export default function RestaurantFlow() {
  return (
    <section id="restaurantes" className="section-padding bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="section-head">
          <h2>De la mesa a Hacienda, sin fricción</h2>
          <p>
            POS especializado con comandas, mesas, cocina y recetas — validado en
            producción con clientes reales.
          </p>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 mb-16 md:mb-20">
          {STEPS.map(({ n, title, text }) => (
            <li key={n} className="relative pt-6 pb-8 border-t-2 border-gray-200 dark:border-gray-800">
              <span className="absolute -top-0.5 left-0 w-12 h-0.5 bg-accent-600" aria-hidden="true" />
              <span className="block text-sm font-bold text-accent-700 dark:text-accent-300 tabular-nums mb-3">
                Paso {n}
              </span>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden order-2 lg:order-1">
            <ThemeImage
              srcLight={comandasLight}
              srcDark={comandasDark}
              alt="Vista de comandas de Apex ERP con mesas y estados de cocina en tiempo real"
              sizes="(max-width: 1024px) 100vw, 640px"
              className="w-full h-auto"
            />
          </div>
          <ul className="space-y-4 order-1 lg:order-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-700 dark:text-accent-300 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
