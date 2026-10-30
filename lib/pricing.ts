// Catálogo V2 (docs/plans/PROPUESTA-PLANES-V2-2026-10-15.md), publicado con IVA.
// IVA truncado a 2 decimales, igual que lo cobra erp-2025 (InvoiceService: bcdiv trunca).
// Anual = mensual neto × 12 × 0.8.
import { UtensilsCrossed, Pill, BedDouble, Dumbbell, HardHat, Briefcase, type LucideIcon } from 'lucide-react'

export interface Plan {
  name: string
  monthly: string
  annual: string
  dtes: string
  recommended?: boolean
  features: string[]
}

export interface PlanGroup {
  id: string
  label: string
  tagline: string
  plans: Plan[]
}

export interface Vertical {
  icon: LucideIcon
  name: string
  scope: string
  text: string
  price: string
  href?: string
}

export const PRICING_GROUPS: PlanGroup[] = [
  {
    id: 'factura',
    label: 'Apex Factura',
    tagline: 'Para cumplir con Hacienda. Si ya tienes cómo vender, solo necesitas facturar.',
    plans: [
      {
        name: 'Esencial', monthly: '$5.63', annual: '$54.12', dtes: '300 DTE/mes',
        features: ['2 usuarios · 1 sucursal', 'Todos los tipos de DTE', 'Transmisión al MH, anulación y contingencia', 'Envío y reenvío del DTE al cliente', 'Libros de Ventas y Resumen IVA'],
      },
      {
        name: 'Profesional', monthly: '$11.28', annual: '$108.36', dtes: '2,000 DTE/mes', recommended: true,
        features: ['5 usuarios · 1 sucursal', 'Todo lo de Esencial', 'Catálogo de productos (sin inventario)'],
      },
    ],
  },
  {
    id: 'erp',
    label: 'Apex ERP',
    tagline: 'Opera tu negocio completo. La facturación electrónica viene incluida.',
    plans: [
      {
        name: 'Comercio', monthly: '$22.58', annual: '$216.84', dtes: '2,000 DTE/mes',
        features: ['5 usuarios · 2 sucursales · 1 bodega', 'Apex Factura Profesional incluido', 'POS y caja', 'Inventario y kardex', 'Reportes de ventas e inventario'],
      },
      {
        name: 'Operación', monthly: '$33.88', annual: '$325.32', dtes: '5,000 DTE/mes', recommended: true,
        features: ['10 usuarios · 3 sucursales · 3 bodegas', 'Todo lo de Comercio', 'Compras y proveedores', 'Libro de Compras', 'Lotes de inventario'],
      },
      {
        name: 'Empresa', monthly: '$45.18', annual: '$433.80', dtes: '10,000 DTE/mes',
        features: ['20 usuarios · sucursales y bodegas ilimitadas', 'Todo lo de Operación', 'Cotizaciones', 'Empleados', 'Todos los reportes'],
      },
    ],
  },
]

export const VERTICALES: Vertical[] = [
  { icon: UtensilsCrossed, name: 'Restaurante', scope: 'Sobre cualquier plan ERP', text: 'Comandas con mesas, áreas y cocina. Recetas que descuentan insumos.', price: '+$5.63/mes', href: '/restaurantes' },
  { icon: Pill, name: 'Farmacia', scope: 'Sobre cualquier plan ERP', text: 'Lotes con fecha de vencimiento y alertas, venta por caja, blíster o unidad, y compras cargadas desde el DTE de la droguería.', price: '+$5.63/mes' },
  { icon: BedDouble, name: 'Turismo', scope: 'Sobre cualquier plan ERP', text: 'Habitaciones y Day Pass desde el POS, con la contribución de turismo separada en el DTE.', price: '+$5.63/mes' },
  { icon: Dumbbell, name: 'Gimnasio', scope: 'Sobre cualquier plan ERP', text: 'Membresías con vencimiento, recordatorios de renovación y control corporal de cada cliente.', price: '+$5.63/mes' },
  { icon: HardHat, name: 'Proyectos y talleres', scope: 'Sobre Operación o Empresa', text: 'Órdenes de trabajo con el material cargado a cada una, seguimiento por enlace para tu cliente y control de herramientas.', price: '+$56.48/mes' },
  { icon: Briefcase, name: 'Servicios', scope: 'Sobre cualquier plan Factura', text: 'Cotizaciones que se convierten en factura.', price: '+$4.50/mes' },
]

export const ENTRY_PRICE = PRICING_GROUPS[0].plans[0].monthly

// Comercio + Restaurante según el brochure 2026-10; el IVA va sobre el total, no se suma
export const RESTAURANT_FROM = '$28.22'

export const ADDONS_NOTE = 'Usuario o bodega adicional $3.39/mes · sucursal adicional $5.65/mes · paquetes de DTE adicionales.'

