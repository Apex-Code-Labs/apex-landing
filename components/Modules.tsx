import {
  ShoppingCart, FileCheck2, Package, Users, Truck, Warehouse,
  BarChart3, ShieldCheck, ChefHat, Utensils, Banknote, Smartphone, ArrowRight,
} from 'lucide-react'

const MODULES = [
  { icon: ShoppingCart, title: 'Ventas y POS', text: 'Punto de venta completo: descuentos, múltiples formas de pago y factura automática al cerrar cada venta.' },
  { icon: FileCheck2, title: 'Facturación Electrónica (DTE)', text: 'Todos los tipos de DTE con transmisión directa y automática al Ministerio de Hacienda.' },
  { icon: Package, title: 'Inventario y Kardex', text: 'Stock en tiempo real con Kardex automático, alertas de stock bajo e historial por producto.' },
  { icon: Users, title: 'Gestión de Clientes', text: 'Base completa con historial de compras, datos fiscales (NIT, NRC, DUI) y seguimiento.' },
  { icon: Truck, title: 'Proveedores', text: 'Directorio centralizado con historial de compras, condiciones de pago y documentos.' },
  { icon: Warehouse, title: 'Almacenes Multi-bodega', text: 'Múltiples bodegas o sucursales desde una sola cuenta, con transferencias trazables.' },
  { icon: BarChart3, title: 'Dashboard en Tiempo Real', text: 'Ventas del día, productos más vendidos, estado de DTEs y alertas — al instante.' },
  { icon: ShieldCheck, title: 'Roles y Seguridad', text: 'Permisos granulares por módulo: administrador, supervisor, contador, cajero, mesero, cocinero.' },
  { icon: ChefHat, title: 'Comandas y Cocina', text: 'Mesas, áreas y comandas con timer en tiempo real, sincronizadas entre cocina y salón.' },
  { icon: Utensils, title: 'Recetas e Insumos', text: 'Al vender, el sistema descuenta automáticamente los insumos. Sub-recetas y costeo incluidos.' },
  { icon: Banknote, title: 'Caja con Arqueo', text: 'Apertura y cierre por sesión, corte X y corte Z con cálculo automático de diferencias.' },
  { icon: Smartphone, title: 'App Móvil (PWA)', text: 'Se instala como app nativa en tablets y teléfonos, Android e iOS, sin tiendas.' },
]

const FLOW = ['Venta en POS', 'Inventario e insumos', 'Caja', 'DTE al MH', 'Ticket térmico']

export default function Modules() {
  return (
    <section id="modulos" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="section-head">
          <h2>Todo lo que necesitas, en un solo lugar</h2>
          <p>
            Módulos especializados que trabajan de forma integrada. Contrata solo lo
            que necesitas o el paquete completo.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 border-t border-gray-200 dark:border-gray-800">
          {MODULES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
              <Icon className="w-5 h-5 mt-1 flex-shrink-0 text-accent-700 dark:text-accent-300" aria-hidden="true" />
              <div>
                <h3 className="font-bold mb-1.5">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-20 p-8 md:p-12 rounded-2xl bg-primary text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 !text-white">Integración nativa POS → Inventario → DTE</h3>
          <p className="text-primary-100 leading-relaxed max-w-3xl">
            Cuando tu cajero cierra una venta, el sistema descuenta inventario
            (incluidos los insumos vía recetas), registra la transacción en caja,
            genera y transmite el DTE al MH, e imprime el ticket térmico. Todo en
            un solo paso: nadie vuelve a teclear la venta en otro programa, y el
            inventario, la caja y Hacienda quedan cuadrados con el mismo dato.
          </p>
          <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm font-semibold" aria-label="Lo que ocurre al cerrar una venta">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className={`px-3.5 py-2 rounded-full ${i === 0 ? 'bg-mint text-primary-900' : 'bg-white/10 text-white'}`}>{step}</span>
                {i < FLOW.length - 1 && <ArrowRight className="w-4 h-4 text-mint" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
