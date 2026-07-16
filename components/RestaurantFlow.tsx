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
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Solución para restaurantes y cafés</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            De la mesa a Hacienda, sin fricción
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            POS especializado con comandas, mesas, cocina y recetas — validado en
            producción con clientes reales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {STEPS.map(({ n, title, text }) => (
            <div key={n} className="card p-6 relative">
              <span className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center tabular-nums">
                {n}
              </span>
              <h3 className="text-lg font-bold mb-2 mt-3">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

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
