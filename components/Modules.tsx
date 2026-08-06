import {
  ShoppingCart, FileCheck2, Package, Users, Truck, Warehouse,
  BarChart3, ShieldCheck, ChefHat, Utensils, Banknote, Smartphone, Zap,
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

export default function Modules() {
  return (
    <section id="modulos" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="eyebrow mb-3">Módulos del sistema</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas, en un solo lugar</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Módulos especializados que trabajan de forma integrada. Contrata solo lo
            que necesitas o el paquete completo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <div className="w-11 h-11 rounded-lg bg-accent-50 dark:bg-accent-900 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-accent-700 dark:text-accent-300" />
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto p-8 rounded-2xl bg-primary text-white flex gap-4 items-start">
          <Zap className="w-8 h-8 text-mint flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Integración nativa POS → Inventario → DTE</h3>
            <p className="text-gray-200 leading-relaxed">
              Cuando tu cajero cierra una venta, el sistema descuenta inventario
              (incluidos los insumos vía recetas), registra la transacción en caja,
              genera y transmite el DTE al MH, e imprime el ticket térmico. Todo en
              un solo paso: nadie vuelve a teclear la venta en otro programa, y el
              inventario, la caja y Hacienda quedan cuadrados con el mismo dato.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
